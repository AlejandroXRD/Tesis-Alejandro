import { IsString, IsOptional, IsEnum } from "class-validator"
import { Rol } from "@prisma/client"

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    userName?: string

    @IsString()
    @IsOptional()
    apellido?: string

    @IsEnum(Rol)
    @IsOptional()
    rol?: Rol
}
