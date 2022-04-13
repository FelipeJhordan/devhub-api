import { tokenDummy } from 'test/unit/stubs/shared';

export const JwtService = {
  signAsync: jest.fn().mockResolvedValue(tokenDummy()),
  verify: jest.fn().mockResolvedValue(true),
  decode: jest.fn().mockResolvedValue(true),
};
