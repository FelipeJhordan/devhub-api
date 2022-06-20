import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/application/guards/jwt.auth.guard';
import { AuthService } from '@/application/services/auth.service';
import { SessionService } from '@/application/services/session.service';
import { IJwtPayload } from '@/infra/jwt/protocol/jwt.payload.protocol';
import { UserDecorator } from '../decorators/user.decorator';
import { AuthUserResponseDto } from '../dtos/auth/authUserResponse.dto';
import { ChangePasswordByRecoveryCodeDto } from '../dtos/auth/changePasswordByRecoveryCode.dto';
import { LoginUserDto } from '../dtos/auth/loginUser.dto';
import { RegisterUserDto } from '../dtos/auth/registerUser.dto';
import { SendRecoveryCodeDto } from '../dtos/auth/sendRecoveryCode.dto';
import { VerifyPasswordDto } from '../dtos/auth/verifyPassword.dto';
import { MessageDto } from '../dtos/shared/message.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService, private sessionService: SessionService) {}

  @Post('register')
  public async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<AuthUserResponseDto> {
    return await this.authService.register(registerUserDto);
  }

  @Post('login')
  public async loginUser(@Body() loginUserDto: LoginUserDto): Promise<AuthUserResponseDto> {
    return await this.authService.login(loginUserDto);
  }

  @Get('verify/password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  public async verifyPassword(
    @UserDecorator() { userId }: IJwtPayload,
    @Body() verifyPasswordDto: VerifyPasswordDto,
  ): Promise<void> {
    await this.authService.verifyPassword({
      id: userId,
      password: verifyPasswordDto.password,
    });
  }

  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async logout(@UserDecorator() { userId }: IJwtPayload): Promise<MessageDto> {
    await this.sessionService.destroySession(userId);

    return MessageDto.createMessage('Logout success', 204);
  }

  @Patch('recovery')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async setRecoveryCodeAndSend(@Body() { email }: SendRecoveryCodeDto) {
    await this.authService.setRecoveryCodeAndSend(email);
  }

  @Patch('password/:code')
  @HttpCode(HttpStatus.OK)
  public async changePasswordByRecoveryCode(
    @Body() { email, password }: ChangePasswordByRecoveryCodeDto,
    @Param('code') code: string,
  ): Promise<void> {
    await this.authService.changePasswordByRecoveryCode({ email, password }, code);
  }
}
