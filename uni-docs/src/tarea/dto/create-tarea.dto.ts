import { IsString, IsNotEmpty, IsDateString, IsEnum, IsUUID } from "class-validator"
import { estadoTarea } from "@prisma/client"

export class CreateTareaDto {
    @IsString()
    @IsNotEmpty()
    nombreTarea: string

    @IsString()
    @IsNotEmpty()
    descripcion: string

    @IsDateString()
    @IsNotEmpty()
    fechaLimite: string

    @IsUUID()
    @IsNotEmpty()
    profesorId: string
}
