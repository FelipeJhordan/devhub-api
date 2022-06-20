import { CustomMatchPasswords } from '@/infra/class-validator/custom-match-passwords';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';

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
