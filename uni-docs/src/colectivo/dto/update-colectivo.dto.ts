import { IsInt, IsOptional, IsString, IsArray, IsUUID, ValidateNested } from "class-validator"

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
    year? : number

    @IsArray()
    @ValidateNested({ each: true })
    @IsOptional()
    profesores?: ProfessorAsignmentDto[]
}
