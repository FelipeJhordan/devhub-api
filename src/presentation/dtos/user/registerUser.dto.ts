import { FavoriteLanguageEnum } from '@/domain/enum/FavoriteLanguage.enum';

export class registerUserDto {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  favoriteLanguages: FavoriteLanguageEnum[];
  birthDate: Date;
}
