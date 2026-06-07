// src/auth/dto/login.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { Rol } from '@prisma/client';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
