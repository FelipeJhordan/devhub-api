import { AuthUserResponseDto } from '@/presentation/dtos/auth/authUserResponse.dto';
import { LoginUserDto } from '@/presentation/dtos/auth/loginUser.dto';
import { RegisterUserDto } from '@/presentation/dtos/auth/registerUser.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { HashingAdapter } from './protocols/hashing.adapter';
import { SessionService } from './session.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private hashing: HashingAdapter,
    private userService: UserService,
    private sessionService: SessionService,
    private jwtService: JwtService,
  ) {}
  public async register({
    birth,
    email,
    favoriteLanguages,
    name,
    password,
  }: RegisterUserDto): Promise<AuthUserResponseDto> {
    const { '1': hashedPassword } = await Promise.all([
      this.userService.verifyEmail(email),
      this.hashing.hash(password),
    ]);
    const user = await this.userService.createUser({
      birth,
      email,
      name,
      password: hashedPassword,
      language: favoriteLanguages,
    });
    const token = await this.jwtService.signAsync({ userId: user.id });
    await this.sessionService.createSession({ idUser: user.id, token });

    return AuthUserResponseDto.of({ id: user.id, email, token }, { name, birth, favoriteLanguages });
  }
  public async login({ email, password }: LoginUserDto): Promise<AuthUserResponseDto> {
    const user = await this.userService.getUserByEmail(email);

    const isPassword = await this.hashing.compare(password, user?.password);

    if (!isPassword) {
      throw new NotFoundException('Wrong credentials.');
    }

    const token = await this.jwtService.signAsync({ userId: user.id });

    await this.sessionService.createSession({ idUser: user.id, token });

    return AuthUserResponseDto.of(
      { email: email, id: user.id, token },
      {
        favoriteLanguages: user.Profile.language.map((language) => language.name),
        birth: user.Profile.birth,
        name: user.Profile.name,
        photo: user.Profile?.photo,
      },
    );
  }
}
