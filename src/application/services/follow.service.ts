import { FollowDTO } from '@/presentation/dtos/follow/follow.dto';
import { Injectable } from '@nestjs/common';
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
}
