import { Type } from "class-transformer";
import { IsInt, IsPositive, IsString, Min, ValidateNested } from "class-validator";

export class CreateDireccionDto {

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

    // @ValidateNested()
    // @Type(() => )
    // idLocalidad: ;

}
