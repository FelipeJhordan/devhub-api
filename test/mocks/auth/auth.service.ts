import { AuthUserResponseDtoStub } from 'test/stubs/auth';

export const AuthServiceMock = {
  register: jest.fn().mockResolvedValue(AuthUserResponseDtoStub()),
  login: jest.fn().mockResolvedValue(AuthUserResponseDtoStub()),
};
