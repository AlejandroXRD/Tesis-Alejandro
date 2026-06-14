import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
constructor(
private prisma: PrismaService,
private jwtAuthService: JwtService
) {}

async register(registerDto: RegisterDto) {
// Verificar si el usuario ya existe
const existUser = await this.prisma.user.findFirst({
where: { userName: registerDto.userName }
});

if (existUser) {
throw new ConflictException(`El usuario "${registerDto.userName}" ya existe`);
}

// Hashear contraseña
const hashedPassword = await hash(registerDto.password, 10);

// Crear usuario
const user = await this.prisma.user.create({
data: {
userName: registerDto.userName,
password: hashedPassword,
rol: registerDto.rol,
apellido: registerDto.apellido,
},
select: {
userId: true,
userName: true,
rol: true,
apellido: true,
createdAt: true,
},
});

// Generar token JWT
const payload = { id: user.userId, username: user.userName, rol: user.rol };
const token = this.jwtAuthService.sign(payload);

return { user, token };
}

async login(loginDto: LoginDto) {
  const existUser : any = await this.prisma.user.findFirst({
    where: { userName: loginDto.userName }
  });

  if (!existUser) {
    throw new BadRequestException(`El usuario ${loginDto.userName} no existe`);
  }

  const correctPassword = await compare(loginDto.password, existUser.password);
  
  if (!correctPassword) {
    throw new UnauthorizedException('Contraseña incorrecta');
  }

  const payload = { 
    id: existUser.userId, 
    username: existUser.userName, 
    rol: existUser.rol 
  };
  const token = this.jwtAuthService.sign(payload);  // ← DEBE generar el token

  const { password, ...userWithoutPassword } = existUser;
  
  // ✅ DEBE devolver esto
  return { 
    user: userWithoutPassword, 
    token 
  };
}
}