import { getLanguageId } from '@/domain/enum/FavoriteLanguage.enum';
import { CreateUserDto } from '@/presentation/dtos/user/CreateUser.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  // Isso poderia ser separado em um language Service feito de maneira mais clean, mas tá bom
  async createUser({ birth, email, language, name, password }: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        email,
        password,
        Profile: {
          create: {
            birth,
            name,
            language: {
              connect: language?.map((language) => ({
                id: getLanguageId(language),
              })),
            },
          },
        },
      },
    });
  }

  public async verifyEmail(email): Promise<void> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user || user?.id) throw new BadRequestException('This email already registered in our system');
  }

  // Sem mensagem de erro para o usuário não saber qual campo está ínvalido, aquela velha discussão entre ExpUsuario/Segurança
  public async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
      include: {
        Profile: {
          include: {
            language: true,
          },
        },
        Session: true,
      },
    });
    return user;
  }
}
