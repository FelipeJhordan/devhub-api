import { FavoriteLanguageEnum } from '@/domain/enum/FavoriteLanguage.enum';
import { LoginUserDto } from '@/presentation/dtos/auth/LoginUser.dto';
import { RegisterUserDto } from '@/presentation/dtos/auth/RegisterUser.dto';
import { AuthUserResponseDto } from '@/presentation/dtos/auth/AuthUserResponse.dto';
import { DateStub, randomIdStub, tokenDummy } from '../shared';

export const registerUserDtoStub = (): RegisterUserDto => ({
  name: 'Dragoborn Silva',
  email: 'fushoda@uol.com',
  favoriteLanguages: [FavoriteLanguageEnum['C/C++'], FavoriteLanguageEnum.Python],
  password: 'senha12345',
  passwordConfirmation: 'senha12345',
  birth: DateStub(),
});

export const loginUserDtoStub = (): LoginUserDto => ({
  email: 'fushoda@uol.com',
  password: 'senha12345',
});

export const AuthUserResponseDtoStub = (): AuthUserResponseDto => ({
  email: 'fushoda@uol.com',
  id: randomIdStub(),
  profile: {
    name: 'Dragoborn Silva',
    favoriteLanguages: [FavoriteLanguageEnum['C/C++'], FavoriteLanguageEnum.Python],
    photo: undefined,
    birth: DateStub(),
  },
  token: tokenDummy(),
});

export const LoginUserDtoStub = (): LoginUserDto => ({
  email: 'fushoda@uol.com',
  password: 'password654321',
});
