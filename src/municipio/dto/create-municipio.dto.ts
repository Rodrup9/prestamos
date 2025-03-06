import { IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateMunicipioDto {

    @IsString()
    @Min(3)
    nombre: string;

    @IsNumber()
    @IsPositive()
    estado: number;
}
