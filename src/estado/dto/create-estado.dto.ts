import { IsString, Min } from "class-validator";

export class CreateEstadoDto {

    @IsString()
    @Min(3)
    nombre: string;

}
