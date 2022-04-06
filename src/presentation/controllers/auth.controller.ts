import { AuthService } from '@/application/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from '../dtos/auth/loginUser.dto';
import { RegisterUserDto } from '../dtos/auth/registerUser.dto';
import { AuthUserResponseDto } from '../dtos/auth/AuthUserResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<AuthUserResponseDto> {
    return await this.authService.register(registerUserDto);
  }

  @Post('login')
  public async loginUser(@Body() loginUserDto: LoginUserDto): Promise<AuthUserResponseDto> {
    return await this.authService.login(loginUserDto);
  }
}
