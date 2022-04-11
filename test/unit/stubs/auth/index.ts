import { FavoriteLanguageEnum } from '@/domain/enum/FavoriteLanguage.enum';
import { LoginUserDto } from '@/presentation/dtos/auth/loginUser.dto';
import { RegisterUserDto } from '@/presentation/dtos/auth/registerUser.dto';
import { AuthUserResponseDto } from '@/presentation/dtos/auth/AuthUserResponse.dto';
import { profileStub } from '../profile';
import { DateStub, randomIdStub } from '../shared';

export const registerUserDtoStub = (): RegisterUserDto => ({
  name: 'Dragoborn Silva',
  email: 'fushoda@uol.com',
  favoriteLanguages: [FavoriteLanguageEnum['C/C++'], FavoriteLanguageEnum.Python],
  password: 'senha12345',
  passwordConfirmation: 'senha12345',
  birthDate: DateStub(),
});

export const AuthUserResponseDtoStub = (): AuthUserResponseDto => ({
  email: 'fushoda@uol.com',
  id: randomIdStub(),
  profile: profileStub(),
  token: 'ey.fkfofkeofkeofkocxofjmeorkeofkeofkalgumacoisa',
});

export const LoginUserDtoStub = (): LoginUserDto => ({
  username: 'user1235',
  password: 'password654321',
});
