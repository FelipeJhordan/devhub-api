import { getLanguageId } from '@/domain/enum/FavoriteLanguage.enum';
import { IUpdateUser } from '@/domain/user/interfaces/IUpdateUser';
import { CreateUserDto } from '@/presentation/dtos/user/createUser.dto';
import { createFileName, replaceFileName } from '@/shared';
import { generateRecoveryCode } from '@/shared/generate-recovery-code.utils';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { FileService } from './file.service';
import { PrismaService } from './prisma.service';
import { HashingAdapter } from './protocols/hashing.adapter';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private fileService: FileService,
    private hashing: HashingAdapter,
  ) {}

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

  public async verifyIfEmailExistsAndNotIsSame(email, id): Promise<void> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user && user.id != id) throw new BadRequestException('This email already registered in our system');
  }

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

  public async updateUser({ id, formData, file }: IUpdateUser): Promise<User> {
    let photo;
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        Profile: {
          select: {
            photo: true,
          },
        },
      },
    });

    const filename = !user.Profile.photo ? createFileName(user.id) : replaceFileName(user.Profile.photo);

    if (!!file) {
      photo = await this.fileService.addPhoto(filename, file);
    }

    const hashedPassword = await this.hashing.hash(formData.password);

    await this.verifyIfEmailExistsAndNotIsSame(formData.email, user.id);

    const userAfterUpdate = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        email: formData.email,
        password: hashedPassword,
        Profile: {
          update: {
            name: formData.name,
            photo: { set: photo },
          },
        },
      },
      include: {
        Profile: {
          select: {
            birth: true,
            name: true,
            photo: true,
          },
        },
      },
    });

    return userAfterUpdate;
  }

  async getUserPassword(id: number): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      select: { password: true },
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user.password;
  }

  async setRecoveryCode(email: string): Promise<string> {
    const code = generateRecoveryCode();
    await this.prismaService.user.update({
      where: {
        email,
      },
      data: {
        recovery_code: code,
      },
    });

    return code;
  }
}
