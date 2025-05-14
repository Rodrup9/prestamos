import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsDate, IsIn, IsInt, IsOptional, IsPositive, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateDireccionDto } from 'src/direccion/dto/update-direccion.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {

    @IsOptional()
    @IsString()
    @MinLength(3)
    nombre?: string;

    @IsString()
    @MinLength(3)
    apellido_paterno?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    apellido_materno?: string;

    @IsOptional()
    @IsString()
    @MinLength(7)
    rfc?: string;

    @IsOptional()
    @IsString()
    ine?: string;

    @IsOptional()
    @IsString()
    comp_domicilio?: string;

    @IsOptional()
    @IsString()
    @MinLength(13)
    curp?: string;

    @IsOptional()
    @IsDate()
    fecha_nacimiento?: Date;

    @IsOptional()
    @IsInt()
    @IsPositive()
    usuario_asignado?: number;

    // @IsOptional()
    // direccion?: UpdateDireccionDto;
}
