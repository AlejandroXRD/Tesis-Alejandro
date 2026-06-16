import { IsOptional, IsString, IsEnum } from 'class-validator';
import { estadoTarea } from '@prisma/client';

export class UpdateTareaDto {
  @IsOptional()
  @IsString()
  nombreTarea?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  fechaLimite?: string;

  @IsOptional()
  @IsEnum(estadoTarea)
  estado?: estadoTarea;

  @IsOptional()
  @IsString()
  profesorId?: string;

  @IsOptional()
  @IsString()
  comentario?: string;

  @IsOptional()
  @IsString()
  revisorNombre?: string;
}