import { IsString, IsNotEmpty, IsEnum, MinLength } from 'class-validator';
import { Rol } from '@prisma/client';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsEnum(Rol)
  rol: Rol;
}
