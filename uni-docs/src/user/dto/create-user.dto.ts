import { IsString, IsNotEmpty, IsEnum } from "class-validator"
import { Rol } from "@prisma/client"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    userName: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsEnum(Rol)
    @IsNotEmpty()
    rol: Rol

    @IsString()
    @IsNotEmpty()
    apellido: string
}
