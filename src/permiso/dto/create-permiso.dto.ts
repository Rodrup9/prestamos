import { IsString, Min, MinLength } from "class-validator";

export class CreatePermisoDto {

    @IsString()
    @MinLength(3)
    nombre: string;

}
