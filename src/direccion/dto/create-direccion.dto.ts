import { IsInt, IsPositive, IsString, Min } from "class-validator";

export class CreateDireccionDto {

    @IsString()
    @Min(3)
    calle: string;

    @IsString()
    @Min(5)
    codigoPostal: string;

    @IsString()
    @Min(3)
    numeroInterior: string;

    @IsString()
    @Min(3)
    numeroExterior?: string;

    @IsInt()
    @IsPositive()
    idLocalidad: number;

}
