import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {

    @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
    @IsPositive()
    @IsOptional()
    @Type(() => Number) // String a número
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Items per page', default: 10, minimum: 1 })
    @IsPositive()
    @IsOptional()
    @Type(() => Number) // String a número
    limit?: number = 10;
}
