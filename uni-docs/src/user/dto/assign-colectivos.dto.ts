import { IsArray, IsUUID, IsString, ValidateNested } from "class-validator"

class ColectivoAsignmentDto {
    @IsUUID()
    colectivoId: string

    @IsString()
    asignatura: string
}

export class AssignColectivosDto {
    @IsArray()
    @ValidateNested({ each: true })
    colectivos: ColectivoAsignmentDto[]
}
