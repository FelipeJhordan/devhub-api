import { authUserResponseDtoStub, verifyPasswordDtoStub } from 'test/unit/stubs/auth';

export const AuthService = {
  register: jest.fn().mockResolvedValue(authUserResponseDtoStub()),
  login: jest.fn().mockResolvedValue(authUserResponseDtoStub()),
  verifyPassword: jest.fn().mockResolvedValue(verifyPasswordDtoStub()),
};
