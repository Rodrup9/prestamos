import { IsDate, IsInt, IsNumber, IsPositive, IsString } from "class-validator";

export class CreatePrestamoDto {
    @IsNumber()
    monto: number;
    
    @IsDate()
    fecha_inicio: Date;

    @IsDate()
    fecha_fin: Date;

    @IsNumber()
    intervalo_pago: number;

    @IsNumber()
    pago_minimo: number;

    @IsNumber()
    tasa: number;

    @IsString()
    contrato: string;
    
    @IsInt()
    @IsPositive()
    prestamista: number;

    @IsInt()
    @IsPositive()
    cliente: number;
}
