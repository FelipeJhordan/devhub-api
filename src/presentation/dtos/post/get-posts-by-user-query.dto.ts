import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationDto } from '../pagination/pagination.dto';

export class GetPostsByUserQueryDto extends PaginationDto {
  @ApiProperty()
  @Type(() => Number)
  userId?: number;
}
