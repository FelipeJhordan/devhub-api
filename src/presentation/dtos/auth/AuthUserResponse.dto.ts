import { FavoriteLanguageEnum } from '@/domain/enum/FavoriteLanguage.enum';

type IUser = {
  id: number;
  email: string;
  token: string;
};

type IProfile = {
  name: string;
  birth: Date;
  favoriteLanguages: string[] | FavoriteLanguageEnum[];
  photo?: string;
};

export class AuthUserResponseDto {
  id: number;
  email: string;
  token: string;
  profile: IProfile;

  static of(user: IUser, profile: IProfile) {
    return {
      id: user.id,
      email: user.email,
      token: user.token,
      profile: {
        birth: profile.birth,
        name: profile.name,
        photo: profile.photo,
        favoriteLanguages: profile.favoriteLanguages,
      },
    } as AuthUserResponseDto;
  }
}
