import { IsString, IsOptional, IsDateString, IsEnum, IsUUID } from "class-validator"
import { estadoTarea } from "@prisma/client"

export class UpdateTareaDto {
    @IsString()
    @IsOptional()
    nombreTarea?: string

    @IsString()
    @IsOptional()
    descripcion?: string

    @IsDateString()
    @IsOptional()
    fechaLimite?: string

    @IsEnum(estadoTarea)
    @IsOptional()
    estado?: estadoTarea

    @IsUUID('4')
    @IsOptional()
    profesorId?: string
}
