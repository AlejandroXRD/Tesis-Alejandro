import { Rol } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

export class RegisterDto {

    @IsNotEmpty()
    @IsString()
    userName : string

    @IsNotEmpty()
    @IsString()
    password : string

    @IsEnum(Rol)
    @IsNotEmpty()
    rol : Rol

    @IsString()
    @IsNotEmpty()
    apellido : string

}
