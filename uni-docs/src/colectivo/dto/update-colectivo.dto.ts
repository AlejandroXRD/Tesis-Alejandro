import { IsInt, IsOptional, IsString } from "class-validator"

export class UpdateColectivoDto {
    @IsString()
    @IsOptional()
    nombreColecivo? : string

    @IsInt()
    @IsOptional()
    year? : number

}
