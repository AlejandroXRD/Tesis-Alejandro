import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor( private prisma : PrismaService, private jwtAuthService : JwtService ){}
  
  async register(registerDto: RegisterDto) {
    const existUser = await this.prisma.user.findFirst({
      where: { userName: registerDto.userName }
    })
    if(existUser) return new HttpException('Este usuario ya existe', HttpStatus.CONFLICT);
    const { password } = registerDto;
    const crypto = await hash(password, 10);
    registerDto.password = crypto;
    return this.prisma.user.create({
      data: {
        userName: registerDto.userName,
        password: registerDto.password,
        rol: registerDto.rol,
        apellido: registerDto.apellido
      }
    })
}
  async login( loginDto : LoginDto){
    
    const existUser = await this.prisma.user.findFirst({
      where : { userName : loginDto.userName }
    })
    if(!existUser) return new NotFoundException(`Usuario '${loginDto.userName}' no existe`);
      const correctPassword = await compare( loginDto.password , existUser.password)
    if(!correctPassword) return new BadRequestException('Contraseña incorrecta');
    const payload = { id: existUser.userId, username: existUser.userName, rol: existUser.rol}
    const token = this.jwtAuthService.sign(payload)
    const data = {
      user : existUser,
      token,
    }
    return data;
}
}