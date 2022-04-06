import { registerUserDto } from '@/presentation/dtos/auth/registerUser.dto';
import { RegisterUserResponseDto } from '@/presentation/dtos/auth/registerUserResponse.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public async register(registerUserDto: registerUserDto): Promise<RegisterUserResponseDto> {
    return;
  }
}
