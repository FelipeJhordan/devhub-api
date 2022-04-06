/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthService } from '@/application/services/auth.service';
import { AuthController } from '@/presentation/controllers/auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { mockRegisterUserDto, mockRegisterUserResponseDto } from 'test/mocks/auth';

describe('<AuthController>', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthController,
        {
          provide: AuthService,
          useFactory: () => ({
            register: jest.fn((param) => mockRegisterUserResponseDto()),
          }),
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('Register', () => {
    it('Should be called with correct params', async () => {
      const registerSpy = jest.spyOn(authController, 'registerUser');
      await authController.registerUser(mockRegisterUserDto());

      expect(registerSpy).toBeCalledWith(mockRegisterUserDto());
    });

    // Funny test
    it('Should return void', async () => {
      const response = authController.registerUser(mockRegisterUserDto());

      await expect(response).resolves.toEqual(mockRegisterUserResponseDto());
    });

    it('Should call AuthService.register with correct values', async () => {
      const registerSpy = jest.spyOn(authService, 'register');

      await authController.registerUser(mockRegisterUserDto());

      expect(registerSpy).toBeCalledWith(mockRegisterUserDto());
    });
  });
});
