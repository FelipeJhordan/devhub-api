import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  new_content: string;
}
