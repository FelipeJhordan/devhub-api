/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthService } from '@/application/services/auth.service';
import { AuthController } from '@/presentation/controllers/auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { mockLoginUserDto, mockRegisterUserDto, mockAuthUserResponseDto } from 'test/mocks/auth';

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
            register: jest.fn((param) => mockAuthUserResponseDto()),
            login: jest.fn((param) => mockAuthUserResponseDto()),
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
    it('Should return the correct response', async () => {
      const response = authController.registerUser(mockRegisterUserDto());

      await expect(response).resolves.toEqual(mockAuthUserResponseDto());
    });

    it('Should call AuthService.register with correct values', async () => {
      const registerSpy = jest.spyOn(authService, 'register');

      await authController.registerUser(mockRegisterUserDto());

      expect(registerSpy).toBeCalledWith(mockRegisterUserDto());
    });
  });

  describe('Login', () => {
    it('Should be called with correct params', async () => {
      const loginSpy = jest.spyOn(authController, 'loginUser');

      await authController.loginUser(mockLoginUserDto());

      expect(loginSpy).toBeCalledWith(mockLoginUserDto());
    });

    it('Should return the correct response', async () => {
      const response = authController.loginUser(mockLoginUserDto());

      await expect(response).resolves.toEqual(mockAuthUserResponseDto());
    });

    it('Should call AuthService.login with correct values', async () => {
      const loginSpy = jest.spyOn(authService, 'login');

      await authController.loginUser(mockLoginUserDto());

      expect(loginSpy).toBeCalledWith(mockLoginUserDto());
    });
  });
});
