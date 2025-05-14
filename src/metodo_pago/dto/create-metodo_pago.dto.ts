import { IsString, MinLength } from "class-validator";

export class CreateMetodoPagoDto {

    @IsString()
    @MinLength(3)
    nombre: string;

}
