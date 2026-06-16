import { IsInt, IsOptional, IsString, IsArray, IsUUID, ValidateNested, IsEnum } from "class-validator"
import { Type } from 'class-transformer';
import { Periodo } from "@prisma/client";

class ProfessorAsignmentDto {
    @IsUUID()
    profesorId: string

    @IsString()
    asignatura: string
}

export class UpdateColectivoDto {
    @IsString()
    @IsOptional()
    nombreColectivo?: string

    @IsInt()
    @IsOptional()
    year?: number

    @IsEnum(Periodo)
    @IsOptional()
    periodo? : Periodo

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProfessorAsignmentDto)
    @IsOptional()
    profesores?: ProfessorAsignmentDto[]
}