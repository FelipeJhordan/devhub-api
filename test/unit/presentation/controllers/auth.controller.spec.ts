/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthService } from '@/application/services/auth.service';
import { SessionService } from '@/application/services/session.service';
import { AuthController } from '@/presentation/controllers/auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService as AuthServiceMock } from 'test/unit/mocks/auth/auth.service';
import { SessionService as SessionServiceMock } from 'test/unit/mocks/session/session.service';
import {
  authUserResponseDtoStub,
  loginUserDtoStub,
  registerUserDtoStub,
  verifyPasswordDtoStub,
} from 'test/unit/stubs/auth';
import { jwtPayloadStub, messageDtoStub } from 'test/unit/stubs/shared';

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
        {
          provide: SessionService,
          useValue: SessionServiceMock,
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

      await expect(response).resolves.toEqual(authUserResponseDtoStub());
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

      await authController.loginUser(loginUserDtoStub());

      expect(loginSpy).toBeCalledWith(loginUserDtoStub());
    });

    it('Should return the correct response', async () => {
      const response = authController.loginUser(loginUserDtoStub());

      await expect(response).resolves.toEqual(authUserResponseDtoStub());
    });

    it('Should call AuthService.login with correct values', async () => {
      const loginSpy = jest.spyOn(authService, 'login');

      await authController.loginUser(loginUserDtoStub());

      expect(loginSpy).toBeCalledWith(loginUserDtoStub());
    });
  });
  describe('Logout', () => {
    it('Should be called with correct params', async () => {
      const loginSpy = jest.spyOn(authController, 'logout');

      await authController.logout(jwtPayloadStub());

      expect(loginSpy).toBeCalledWith(jwtPayloadStub());
    });

    it('Should return the correct response', async () => {
      const response = authController.logout(jwtPayloadStub());

      await expect(response).resolves.toEqual(messageDtoStub());
    });
  });
  describe('verifyPassword', () => {
    it('Should be called with correct params', async () => {
      const verifyPasswordSpy = jest.spyOn(authController, 'verifyPassword');

      await authController.verifyPassword(verifyPasswordDtoStub());

      expect(verifyPasswordSpy).toBeCalledWith(verifyPasswordDtoStub());
    });
  });
});
