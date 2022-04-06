import { FavoriteLanguageEnum } from '@/domain/enum/FavoriteLanguage.enum';
import { LoginUserDto } from '@/presentation/dtos/auth/loginUser.dto';
import { RegisterUserDto } from '@/presentation/dtos/auth/registerUser.dto';
import { AuthUserResponseDto } from '@/presentation/dtos/auth/AuthUserResponse.dto';
import { mockProfile } from '../profile';
import { mockDate, randomId } from '../shared';

export const mockRegisterUserDto = (): RegisterUserDto => ({
  name: 'Dragoborn Silva',
  email: 'fushoda@uol.com',
  favoriteLanguages: [FavoriteLanguageEnum['C/C++'], FavoriteLanguageEnum.Python],
  password: 'senha12345',
  passwordConfirmation: 'senha12345',
  birthDate: mockDate(),
});

export const mockAuthUserResponseDto = (): AuthUserResponseDto => ({
  email: 'fushoda@uol.com',
  id: randomId(),
  profile: mockProfile(),
  token: 'ey.fkfofkeofkeofkocxofjmeorkeofkeofkalgumacoisa',
});

export const mockLoginUserDto = (): LoginUserDto => ({
  username: 'user1235',
  password: 'password654321',
});
