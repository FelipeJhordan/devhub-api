import { CustomMatchPasswords } from '@/infra/class-validator/custom-match-passwords';
import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @Validate(CustomMatchPasswords, ['password'])
  @IsNotEmpty()
  @IsString()
  passwordConfirmation: string;
}
