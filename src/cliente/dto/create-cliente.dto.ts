import { Type } from "class-transformer";
import { IsDate, IsInt, IsPositive, IsString, Min, ValidateNested } from "class-validator";
import { CreateDireccionDto } from "src/direccion/dto/create-direccion.dto";

export class CreateClienteDto {

    @IsString()
    @Min(3)
    nombre: string;

    @IsString()
    @Min(3)
    apellido_paterno: string;

    @IsString()
    @Min(3)
    apellido_materno?: string;

    @IsString()
    @Min(7)
    rfc?: string;

    @IsString()
    ine?: string;

    @IsString()
    comp_domicilio?: string;

    @IsString()
    @Min(13)
    curp?: string;

    @IsDate()
    fecha_nacimiento: Date;

    @IsInt()
    @IsPositive()
    usuario_asignado: number;

    @IsInt()
    @IsPositive()
    usuario_creador: number;

    @ValidateNested()
    @Type(() => CreateDireccionDto)
    direccion?: CreateDireccionDto;
}
