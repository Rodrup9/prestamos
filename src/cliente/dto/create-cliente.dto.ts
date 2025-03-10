import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsPositive, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateDireccionDto } from "src/direccion/dto/create-direccion.dto";

export class CreateClienteDto {

    @IsString()
    @MinLength(3)
    nombre: string;

    @IsString()
    @MinLength(3)
    apellido_paterno: string;

    @IsString()
    @MinLength(3)
    apellido_materno?: string;

    @IsString()
    @MinLength(7)
    rfc?: string;

    @IsString()
    ine?: string;

    @IsString()
    comp_domicilio?: string;

    @IsString()
    @MinLength(13)
    curp?: string;

    @IsDate()
    fecha_nacimiento: Date;

    @IsInt()
    @IsPositive()
    usuario_asignado: number;

    @IsInt()
    @IsPositive()
    usuario_creador: number;

    @IsOptional()
    direccion?: CreateDireccionDto;
}
