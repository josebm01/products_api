import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ description: 'Product name', example: 'Keyboard' })
    @IsString()
    public name: string;

    @ApiProperty({ description: 'Product price', example: 49.99, minimum: 0 })
    @IsNumber({
        maxDecimalPlaces: 4,
    })
    @Min(0)
    public price: number;
}
