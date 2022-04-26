import { FavoriteLanguageEnum } from '@/domain/enum/FavoriteLanguage.enum';
import { IUpdateUser } from '@/domain/user/interfaces/IUpdateUser';
import { CreateUserDto } from '@/presentation/dtos/user/createUser.dto';
import { UpdateUserDto } from '@/presentation/dtos/user/updateUser.dto';
import { User } from '@prisma/client';
import { DateStub, imageStub, randomIdStub, tokenDummy } from '../shared';
import { IFindUserWithRelations } from './protocol';

export const createUserDtoStub = (): CreateUserDto => ({
  name: 'Dragoborn Silva',
  email: 'fushoda@uol.com',
  language: [FavoriteLanguageEnum['C/C++'], FavoriteLanguageEnum.Python],
  password: 'hashed_password',
  birth: DateStub(),
});

export const userEntityStub = (): User => ({
  id: randomIdStub(),
  email: 'fushoda@uol.com',
  password: 'hashed_password',
});

export const getUserWithRelations = (): IFindUserWithRelations => ({
  id: randomIdStub(),
  email: 'fushoda@uol.com',
  password: 'hashed_password',
  Profile: {
    language: [
      { id: randomIdStub(), name: 'C/C++' },
      { id: randomIdStub(), name: 'Python' },
    ],
    birth: DateStub(),
    id: randomIdStub(),
    name: 'Dragoborn Silva',
    user_id: randomIdStub(),
    photo: undefined,
  },
  Session: {
    id: randomIdStub(),
    token: tokenDummy(),
    user_id: randomIdStub(),
  },
});

export const updateUserDtoStub = (): UpdateUserDto => ({
  ...createUserDtoStub(),
  passwordConfirmation: 'hashed_password',
});

export const updateUserService = (): IUpdateUser => ({
  file: imageStub(),
  formData: { ...updateUserDtoStub() },
  id: randomIdStub(),
});
