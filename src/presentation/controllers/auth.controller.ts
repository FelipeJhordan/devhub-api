import { JwtAuthGuard } from '@/application/guards/jwt.auth.guard';
import { AuthService } from '@/application/services/auth.service';
import { SessionService } from '@/application/services/session.service';
import { IJwtPayload } from '@/infra/jwt/protocol/jwt.payload.protocol';
import { Body, Controller, Delete, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserDecorator } from '../decorators/user.decorator';
import { AuthUserResponseDto } from '../dtos/auth/authUserResponse.dto';
import { LoginUserDto } from '../dtos/auth/loginUser.dto';
import { RegisterUserDto } from '../dtos/auth/registerUser.dto';
import { MessageDto } from '../dtos/shared/message.dto';

@Controller('auth')
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

  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  public async logout(@UserDecorator() { userId }: IJwtPayload): Promise<MessageDto> {
    await this.sessionService.destroySession(userId);

    return MessageDto.createMessage('Logout success', 204);
  }
}
