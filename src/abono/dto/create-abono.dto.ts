import { IsDate, IsInt, IsNumber, IsPositive } from "class-validator";

export class CreateAbonoDto {

    @IsNumber()
    @IsPositive()
    abono: number;

    @IsDate()
    fecha_abono: Date;

    @IsInt()
    @IsPositive()
    prestamo: number;

    @IsInt()
    @IsPositive()
    metodo_pago: number;

}
