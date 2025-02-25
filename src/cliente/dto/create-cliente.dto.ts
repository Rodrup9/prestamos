import { IsDate, IsInt, IsPositive, IsString, Min } from "class-validator";

export class CreateClienteDto {

    @IsString()
    @Min(3)
    nombre: string;

    @IsString()
    @Min(3)
    apellidoPaterno: string;

    @IsString()
    @Min(3)
    apellidoMaterno?: string;

    @IsString()
    @Min(7)
    rfc: string;

    @IsString()
    ine: string;

    @IsString()
    compDomicilio: string;

    @IsString()
    @Min(13)
    curp: string;

    @IsDate()
    fechaNacimiento: Date;

    @IsInt()
    @IsPositive()
    idUsuarioAsignado: number;

    @IsInt()
    @IsPositive()
    idDireccion: number;
}
