import { FavoriteLanguageEnum } from '@/domain/enum/FavoriteLanguage.enum';
import { CustomMatchPasswords } from '@/infra/class-validator/custom-match-passwords';
import { IsArray, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString, Validate } from 'class-validator';

export class RegisterUserDto {
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

  @IsArray()
  @IsEnum(FavoriteLanguageEnum, { each: true })
  favoriteLanguages: FavoriteLanguageEnum[];

  @IsDateString()
  birth: Date;
}
