import { IsArray, IsEmail, IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";
import { Rol } from "src/rol/entities/rol.entity";
import { Usuario } from "../entities/usuario.entity";

export class CreateUsuarioDto {
    @IsString()
    @MinLength(3)    
    nombre: string;

    @IsString()
    @MinLength(8)    
    clave: string;

    @IsEmail()
    correo: string;

    @IsArray()
    roles?: number[];
}
