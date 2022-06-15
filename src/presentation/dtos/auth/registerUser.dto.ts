import { FavoriteLanguageEnum } from '@/domain/enum/FavoriteLanguage.enum';
import { CustomMatchPasswords } from '@/infra/class-validator/custom-match-passwords';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString, Validate } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @Validate(CustomMatchPasswords, ['password'])
  @IsNotEmpty()
  @IsString()
  passwordConfirmation: string;

  @ApiProperty()
  @IsArray()
  @IsEnum(FavoriteLanguageEnum, { each: true })
  favoriteLanguages: FavoriteLanguageEnum[];

  @ApiProperty()
  @IsDateString()
  birth: Date;
}
