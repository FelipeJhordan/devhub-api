import { AuthService } from '@/application/services/auth.service';
import { PrismaService } from '@/application/services/prisma.service';
import { HashingAdapter } from '@/application/services/protocols/hashing.adapter';
import { SessionService } from '@/application/services/session.service';
import { UserService } from '@/application/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { authUserResponseDtoStub, loginUserDtoStub, registerUserDtoStub } from 'test/unit/stubs/auth';
import { JwtService as mockedJwtService } from '../../mocks/infra/jwt/jwt.service';
import { PrismaService as mockedPrisma } from '../../mocks/prisma/prisma.service';
import { SessionService as mockedSessionService } from '../../mocks/session/session.service';
import { UserService as mockedUserService } from '../../mocks/user/user.service';

describe('AuthService', () => {
  let sut: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockedPrisma,
        },
        {
          provide: HashingAdapter,
          useFactory: () => ({
            compare: jest.fn(() => Promise.resolve(true)),
            hash: jest.fn(() => Promise.resolve('hashed_password')),
          }),
        },
        {
          provide: UserService,
          useValue: mockedUserService,
        },
        {
          provide: SessionService,
          useValue: mockedSessionService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
      ],
    }).compile();

    sut = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('register', () => {
    it('Should be called and receive the correct params', async () => {
      const registerSpy = jest.spyOn(sut, 'register');

      await sut.register(registerUserDtoStub());

      expect(registerSpy).toBeCalledWith(registerUserDtoStub());
    });

    it('Should return the correct data', async () => {
      const response = await sut.register(registerUserDtoStub());
      expect(response).toEqual(authUserResponseDtoStub());
    });
  });
  describe('login', () => {
    it('Should be called and receive the correct params', async () => {
      const loginSpy = jest.spyOn(sut, 'login');

      await sut.login(loginUserDtoStub());

      expect(loginSpy).toBeCalledWith(loginUserDtoStub());
    });

    it('Should return the correct data', async () => {
      const response = await sut.login(loginUserDtoStub());
      expect(response.id).toBe(authUserResponseDtoStub().id);
    });
  });
});
