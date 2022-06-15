import { FollowDTO } from '@/presentation/dtos/follow/follow.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Follow } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class FollowService {
  constructor(private readonly prismaService: PrismaService) {}

  create({ id, followee }: FollowDTO): Promise<Follow> {
    return this.prismaService.follow.create({
      data: {
        follower_id: followee,
        following_id: id,
      },
    });
  }

  async delete(followDto: FollowDTO) {
    const { id, followee } = followDto;
    await this.findFollow(followDto);
    this.prismaService.follow.delete({
      where: {
        follower_id_following_id: {
          follower_id: followee,
          following_id: id,
        },
      },
    });
  }

  async findFollow({ id, followee }: FollowDTO) {
    const follow = await this.prismaService.follow.findUnique({
      where: {
        follower_id_following_id: {
          follower_id: followee,
          following_id: id,
        },
      },
    });

    if (!follow) {
      throw new NotFoundException('Follow not found!');
    }
  }
}
