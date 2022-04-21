import { CreateSessionDto } from '@/presentation/dtos/session/createSession.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class SessionService {
  constructor(private prismaService: PrismaService) {}

  async createSession({ idUser, token }: CreateSessionDto): Promise<void> {
    const session = await this.prismaService.session.findFirst({
      where: {
        user_id: idUser,
      },
    });

    if (session) {
      await this.prismaService.session.update({
        data: { token },
        where: {
          id: session.id,
        },
      });

      return;
    }
    console.log('entrei aqui');
    await this.prismaService.session.create({
      data: {
        token,
        user_id: idUser,
      },
    });
  }

  async destroySession(userId: number) {
    try {
      await this.prismaService.session.delete({
        where: {
          user_id: userId,
        },
      });
    } catch (e) {
      throw new NotFoundException('Session not exists.');
    }
  }
}
