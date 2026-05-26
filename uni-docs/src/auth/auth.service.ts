import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor( private prisma : PrismaService ){}
  
  async register(registerDto: RegisterDto) {
    const existUser = await this.prisma.user.findFirst({
      where: { userName: registerDto.userName }
    })
    if(existUser) return 'User already exists';
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
    return 'This action logs in a user';
}
}