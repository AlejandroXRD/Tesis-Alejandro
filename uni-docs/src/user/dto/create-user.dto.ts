// src/user/dto/create-user.dto.ts
import { IsString, IsNotEmpty, MinLength, IsOptional, IsEnum, MaxLength } from 'class-validator';
import { Rol } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  apellido: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsOptional()
  @IsEnum(Rol, { message: 'El rol debe ser ADMIN, USER o PROFESOR' })
  rol?: Rol;
}
