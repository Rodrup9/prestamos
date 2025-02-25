import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateRolDto {
    @IsString()
    @MinLength(3)    
    nombre: string;

    @IsInt()
    @IsPositive()
    usuario_creador: number;
}
