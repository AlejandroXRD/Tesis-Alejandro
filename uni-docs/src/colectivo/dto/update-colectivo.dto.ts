import { IsInt, IsOptional, IsString, IsArray, IsUUID, ValidateNested } from "class-validator"
import { Type } from 'class-transformer';

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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProfessorAsignmentDto)
    @IsOptional()
    profesores?: ProfessorAsignmentDto[]
}