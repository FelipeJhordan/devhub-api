import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaginationDto {
  itemsPerPage = 8;

  @ApiProperty({
    minimum: 1,
    maximum: 10000,
    title: 'Page',
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    format: 'int32',
    default: 1,
  })
  @Type(() => Number)
  @Transform(({ value }) => (value < 1 ? 1 : value))
  @IsNotEmpty()
  @IsNumber()
  page: number;
}
