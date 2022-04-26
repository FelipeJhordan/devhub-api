import { FileService } from '@/application/services/file.service';
import { PrismaService } from '@/application/services/prisma.service';
import { UserService } from '@/application/services/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { createUserDtoStub } from 'test/unit/stubs/user';
import { FileService as mockedFileService } from '../../mocks/file/file.service';
import { PrismaService as mockedPrisma } from '../../mocks/prisma/prisma.service';

describe('<UserService>', () => {
  let sut: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockedPrisma,
        },
        {
          provide: FileService,
          useValue: mockedFileService,
        },
      ],
    }).compile();

    sut = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('create User', () => {
    it('should call prismaService.user.create', async () => {
      const createUserSpy = jest.spyOn(prisma.user, 'create');

      await sut.createUser(createUserDtoStub());

      expect(createUserSpy).toBeCalled();
    });
  });
  describe('verifyEmail', () => {
    it('should call prismaService.user.create', async () => {
      const verifyUserSpy = jest.spyOn(prisma.user, 'findFirst');

      await sut.verifyEmail('fake-email@gmail.com');

      expect(verifyUserSpy).toBeCalled();
    });

    it('Should call verifyEmail with correct email email', async () => {
      const verifyEmail = jest.spyOn(sut, 'verifyEmail');
      await sut.verifyEmail(createUserDtoStub().email);
      expect(verifyEmail).toBeCalledWith(createUserDtoStub().email);
    });
  });
  describe('getUserByEmail', () => {
    it('Should call prisma.findFirst', async () => {
      const getUserUserSpy = jest.spyOn(prisma.user, 'findFirst');

      await sut.getUserByEmail('fake-email@gmail.com');

      expect(getUserUserSpy).toBeCalled();
    });
  });
  describe('updateUser', () => {
    it('Should be able a find a single user', async () => {
      console.log('teste');
    });
  });
});
