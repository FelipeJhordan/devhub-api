import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, Validate } from 'class-validator';

import { CommentExists } from '@/infra/class-validator/comment-exists.validator';

export class CommentParamDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @Validate(CommentExists)
  id: number;
}
