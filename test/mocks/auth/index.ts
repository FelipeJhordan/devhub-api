import { FavoriteLanguageEnum } from '@/domain/enum/FavoriteLanguage.enum';
import { registerUserDto } from '@/presentation/dtos/auth/registerUser.dto';
import { RegisterUserResponseDto } from '@/presentation/dtos/auth/registerUserResponse.dto';
import { mockProfile } from '../profile';
import { mockDate, randomId } from '../shared';

export const mockRegisterUserDto = (): registerUserDto => ({
  name: 'Dragoborn Silva',
  email: 'fushoda@uol.com',
  favoriteLanguages: [FavoriteLanguageEnum['C/C++'], FavoriteLanguageEnum.Python],
  password: 'senha12345',
  passwordConfirmation: 'senha12345',
  birthDate: mockDate(),
});

export const mockRegisterUserResponseDto = (): RegisterUserResponseDto => ({
  email: 'fushoda@uol.com',
  id: randomId(),
  profile: mockProfile(),
  token: 'ey.fkfofkeofkeofkocxofjmeorkeofkeofkalgumacoisa',
});
