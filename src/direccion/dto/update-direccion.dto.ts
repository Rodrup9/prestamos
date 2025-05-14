import { PartialType } from '@nestjs/mapped-types';
import { CreateDireccionDto } from './create-direccion.dto';
import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class UpdateDireccionDto extends PartialType(CreateDireccionDto) {

        @IsString()
        @MinLength(3)
        calle?: string;
    
        @IsString()
        @MinLength(5)
        codigo_postal?: string;
    
        @IsString()
        @MinLength(3)
        numero_interior?: string;
    
        @IsString()
        @MinLength(3)
        numero_exterior?: string;
        
        @IsInt()
        @IsPositive()
        localidad?: number;

        @IsInt()
        @IsPositive()
        usuario_asignado?: number;
}
