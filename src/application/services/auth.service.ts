import { LoginUserDto } from '@/presentation/dtos/auth/loginUser.dto';
import { RegisterUserDto } from '@/presentation/dtos/auth/registerUser.dto';
import { AuthUserResponseDto } from '@/presentation/dtos/auth/AuthUserResponse.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public async register(registerUserDto: RegisterUserDto): Promise<AuthUserResponseDto> {
    return;
  }
  public async login(loginUserDto: LoginUserDto): Promise<AuthUserResponseDto> {
    return;
  }
}
