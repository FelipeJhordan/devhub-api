import { AuthService } from '@/application/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { registerUserDto } from '../dtos/auth/registerUser.dto';
import { RegisterUserResponseDto } from '../dtos/auth/registerUserResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public async registerUser(@Body() registerUserDto: registerUserDto): Promise<RegisterUserResponseDto> {
    console.log(registerUserDto);
    return await this.authService.register(registerUserDto);
  }
}
