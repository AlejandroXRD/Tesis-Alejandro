import { IsInt, IsOptional, IsString, IsArray, IsUUID, ValidateNested, Type } from "class-validator"

class ProfessorAsignmentDto {
    @IsUUID()
    profesorId: string

    @IsString()
    asignatura: string
}

export class UpdateColectivoDto {
    @IsString()
    @IsOptional()
    nombreColecivo? : string

    @IsInt()
    @IsOptional()
    year? : number

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProfessorAsignmentDto)
    @IsOptional()
    profesores?: ProfessorAsignmentDto[]
}
