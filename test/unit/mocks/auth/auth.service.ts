import { AuthUserResponseDtoStub } from 'test/unit/stubs/auth';

export const AuthService = {
  register: jest.fn().mockResolvedValue(AuthUserResponseDtoStub()),
  login: jest.fn().mockResolvedValue(AuthUserResponseDtoStub()),
};
