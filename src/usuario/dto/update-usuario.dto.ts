import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsArray, IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @IsString()
    @MinLength(3)    
    nombre?: string;

    @IsString()
    @MinLength(8)    
    clave?: string;

    @IsEmail()
    correo?: string;

    @IsArray()
    roles?: number[];
}
