import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { Type } from 'class-transformer';

import { PostExists } from '@/infra/class-validator/post-exists.validator';

export class PostParamDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @Validate(PostExists)
  id: number;
}
