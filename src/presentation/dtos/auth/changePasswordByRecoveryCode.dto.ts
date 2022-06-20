import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';

import { CustomMatchPasswords } from '@/infra/class-validator/custom-match-passwords';

export class ChangePasswordByRecoveryCodeDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Validate(CustomMatchPasswords, ['password'])
  @IsNotEmpty()
  @IsString()
  passwordConfirmation?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
