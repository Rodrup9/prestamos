import { PartialType } from '@nestjs/mapped-types';
import { CreateDireccionDto } from './create-direccion.dto';
import { IsInt, IsPositive, IsString, Min } from 'class-validator';

export class UpdateDireccionDto extends PartialType(CreateDireccionDto) {

        @IsString()
        @Min(3)
        calle: string;
    
        @IsString()
        @Min(5)
        codigo_postal: string;
    
        @IsString()
        @Min(3)
        numero_interior?: string;
    
        @IsString()
        @Min(3)
        numero_exterior: string;
        
        @IsInt()
        @IsPositive()
        localidad: number;
}
