import { IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateLocalidadDto {

    @IsString()
    @Min(3)
    nombre: string;

    @IsNumber()
    @IsPositive()
    municipio: number;
}
