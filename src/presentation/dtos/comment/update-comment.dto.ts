import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCommentDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  new_content: string;
}
