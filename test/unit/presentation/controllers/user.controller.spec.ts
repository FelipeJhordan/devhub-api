import { UserController } from '@/presentation/controllers/user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/application/services/user.service';
import { UserService as mockedService } from 'test/unit/mocks/user/user.service';
import { imageStub, randomIdStub } from 'test/unit/stubs/shared';
import { updateUserDtoStub, updateUserService } from 'test/unit/stubs/user';

const requestParamsStub = {
  updateUser: updateUserDtoStub(),
  jwtPayload: { userId: randomIdStub() },
  file: imageStub(),
};

describe('<UserController>', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockedService,
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  it('It´s defined', () => {
    expect(userController).toBeDefined();
  });
  describe('Update user', () => {
    it('should be called with correct params user', async () => {
      const updateUserSpy = jest.spyOn(userController, 'updateUser');
      const { jwtPayload, file, updateUser } = requestParamsStub;
      await userController.updateUser(jwtPayload, updateUser, file);
      expect(updateUserSpy).toBeCalledWith(jwtPayload, updateUser, file);
    });

    it('should call userService.updateUser with correct params', async () => {
      const updateUserServiceSpy = jest.spyOn(userService, 'updateUser');

      const { jwtPayload, file, updateUser } = requestParamsStub;

      await userController.updateUser(jwtPayload, updateUser, file);

      expect(updateUserServiceSpy).toBeCalledWith(updateUserService());
    });
  });
});
