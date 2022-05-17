import { FavoriteLanguageEnum } from '@/domain/enum/FavoriteLanguage.enum';
import { AuthUserResponseDto } from '@/presentation/dtos/auth/authUserResponse.dto';
import { LoginUserDto } from '@/presentation/dtos/auth/loginUser.dto';
import { RegisterUserDto } from '@/presentation/dtos/auth/registerUser.dto';
import { VerifyPasswordDto } from '@/presentation/dtos/auth/verifyPassword.dto';
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

export const authUserResponseDtoStub = (): AuthUserResponseDto => ({
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

export const verifyPasswordDtoStub = (): VerifyPasswordDto => ({
  password: 'senha12345',
});
