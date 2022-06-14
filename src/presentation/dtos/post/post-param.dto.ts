import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PostParamDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
