import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';

import { CustomMatchPasswords } from '@/infra/class-validator/custom-match-passwords';
import { ApiFile } from '@/infra/swagger/decorator/api-file.decorator';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @Validate(CustomMatchPasswords, ['password'])
  @IsString()
  passwordConfirmation: string;

  @ApiFile()
  file: Express.Multer.File;
}
