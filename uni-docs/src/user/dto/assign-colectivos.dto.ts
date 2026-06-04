import { IsArray, IsUUID, IsString, ValidateNested, Type } from "class-validator"

class ColectivoAsignmentDto {
    @IsUUID()
    colectivoId: string

    @IsString()
    asignatura: string
}

export class AssignColectivosDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ColectivoAsignmentDto)
    colectivos: ColectivoAsignmentDto[]
}
