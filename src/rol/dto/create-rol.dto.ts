import { IsArray, IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateRolDto {
    @IsString()
    @MinLength(3)    
    nombre: string;

    @IsArray()
    @IsInt({ each: true })
    @IsPositive({ each: true })
    permisos?: number[];
}
