/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthService } from '@/application/services/auth.service';
import { AuthController } from '@/presentation/controllers/auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceMock } from 'test/mocks/auth/auth.service';
import { AuthUserResponseDtoStub, LoginUserDtoStub, registerUserDtoStub } from 'test/stubs/auth';

describe('<AuthController>', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthController,
        {
          provide: AuthService,
          useValue: AuthServiceMock,
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('Register', () => {
    it('Should be called with correct params', async () => {
      const registerSpy = jest.spyOn(authController, 'registerUser');
      await authController.registerUser(registerUserDtoStub());

      expect(registerSpy).toBeCalledWith(registerUserDtoStub());
    });

    it('Should return the correct response', async () => {
      const response = authController.registerUser(registerUserDtoStub());

      await expect(response).resolves.toEqual(AuthUserResponseDtoStub());
    });

    it('Should call AuthService.register with correct values', async () => {
      const registerSpy = jest.spyOn(authService, 'register');

      await authController.registerUser(registerUserDtoStub());

      expect(registerSpy).toBeCalledWith(registerUserDtoStub());
    });
  });

  describe('Login', () => {
    it('Should be called with correct params', async () => {
      const loginSpy = jest.spyOn(authController, 'loginUser');

      await authController.loginUser(LoginUserDtoStub());

      expect(loginSpy).toBeCalledWith(LoginUserDtoStub());
    });

    it('Should return the correct response', async () => {
      const response = authController.loginUser(LoginUserDtoStub());

      await expect(response).resolves.toEqual(AuthUserResponseDtoStub());
    });

    it('Should call AuthService.login with correct values', async () => {
      const loginSpy = jest.spyOn(authService, 'login');

      await authController.loginUser(LoginUserDtoStub());

      expect(loginSpy).toBeCalledWith(LoginUserDtoStub());
    });
  });
});
