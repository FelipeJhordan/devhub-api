import { FavoriteLanguageEnum } from '../../../domain/enum/FavoriteLanguage.enum';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  birth: Date;
  language: FavoriteLanguageEnum[];
}
