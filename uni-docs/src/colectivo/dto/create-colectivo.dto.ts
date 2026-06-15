import { Modalidad, Periodo } from '@prisma/client'
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateColectivoDto {

    @IsString()
    @IsNotEmpty()
    nombreColectivo : string

    @IsNotEmpty()
    @IsInt()
    year : number

    @IsEnum(Modalidad)
    @IsNotEmpty()
    modalidad : Modalidad

    @IsNotEmpty()
    @IsEnum(Periodo)
    periodo : Periodo
}
