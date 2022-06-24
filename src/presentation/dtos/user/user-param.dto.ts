import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UserParamDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
