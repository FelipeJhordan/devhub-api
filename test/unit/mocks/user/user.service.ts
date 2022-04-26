import { getUserWithRelations, userEntityStub } from 'test/unit/stubs/user';

export const UserService = {
  createUser: jest.fn().mockResolvedValue(userEntityStub()),
  verifyEmail: jest.fn().mockResolvedValue(Promise.resolve()),
  getUserByEmail: jest.fn().mockResolvedValue(getUserWithRelations()),
  updateUser: jest.fn().mockResolvedValue(Promise.resolve()),
};
