import { AuthUserResponseDto } from '@/presentation/dtos/auth/authUserResponse.dto';
import { ChangePasswordByRecoveryCodeDto } from '@/presentation/dtos/auth/changePasswordByRecoveryCode.dto';
import { LoginUserDto } from '@/presentation/dtos/auth/loginUser.dto';
import { RegisterUserDto } from '@/presentation/dtos/auth/registerUser.dto';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './email.service';
import { HashingAdapter } from './protocols/hashing.adapter';
import { IVerifyPasswordParams } from './protocols/IVerifyPasswordParams';
import { SessionService } from './session.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private hashing: HashingAdapter,
    private userService: UserService,
    private sessionService: SessionService,
    private jwtService: JwtService,
    private emailService: EmailService,
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

    if (!user?.password) {
      await this.throwWrongCredencials();
    }

    const isPassword = await this.hashing.compare(password, user?.password);

    if (!isPassword) {
      await this.throwWrongCredencials();
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

  public async verifyPassword({ id, password }: IVerifyPasswordParams): Promise<void> {
    const userPassword = await this.userService.getUserPassword(id);
    if (!(await this.hashing.compare(password, userPassword))) {
      throw new ForbiddenException('Invalid password.'); // Acredito que o 401 também se enquadra
    }
  }

  public async setRecoveryCodeAndSend(email: string): Promise<void> {
    const userByEmail = await this.userService.getUserByEmail(email);

    if (!userByEmail) {
      throw new NotFoundException('Email not registered.');
    }

    const code = await this.userService.setRecoveryCode(email);

    await this.emailService.emailAdapter.send(email, {
      code,
      name: userByEmail.Profile.name,
    });
  }

  private async throwWrongCredencials() {
    throw new NotFoundException('Wrong credentials.');
  }

  public async changePasswordByRecoveryCode(
    { email, password }: ChangePasswordByRecoveryCodeDto,
    code: string,
  ): Promise<void> {
    const userByEmail = await this.userService.getUserByEmail(email);

    if (!userByEmail) {
      throw new NotFoundException('Email not registered.');
    }

    if (!userByEmail.recovery_code && userByEmail.recovery_code.toUpperCase() != code.toUpperCase()) {
      throw new BadRequestException('Invalid recovery code.');
    }

    const newPassword = await this.hashing.hash(password);

    await this.userService.changePassword(userByEmail.id, newPassword);
  }
}
