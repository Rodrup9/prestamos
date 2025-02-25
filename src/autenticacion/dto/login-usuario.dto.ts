import { IsString, MinLength } from "class-validator";

export class LoginUsuarioDto {
    @IsString()
    @MinLength(8)
    clave: string;

    @IsString()
    correo: string;
}
