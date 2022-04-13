import { PrismaService } from '@/application/services/prisma.service';
import { SessionService } from '@/application/services/session.service';
import { Test, TestingModule } from '@nestjs/testing';
import { createSessionDtoStub, sessionEntityStub } from 'test/unit/stubs/session';

import { PrismaService as mockedPrismaService } from '../../mocks/prisma/prisma.service';

describe('<SessionService>', () => {
  let sut: SessionService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: PrismaService,
          useValue: mockedPrismaService,
        },
      ],
    }).compile();

    sut = module.get<SessionService>(SessionService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  describe('create Session', () => {
    it('should create a session', async () => {
      prisma.session.create = jest.fn().mockResolvedValue(sessionEntityStub());
      const result = sut.createSession(createSessionDtoStub());

      expect(result).toEqual(Promise.resolve());
    });
  });
  describe('destroy Session', () => {
    it('should delete a session', async () => {
      const result = sut.destroySession(2);

      expect(result).toEqual(Promise.resolve());
    });
  });
});
