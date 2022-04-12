import { AuthUserResponseDtoStub } from 'test/unit/stubs/auth';

export const AuthServiceMock = {
  register: jest.fn().mockResolvedValue(AuthUserResponseDtoStub()),
  login: jest.fn().mockResolvedValue(AuthUserResponseDtoStub()),
};
