import { JwtAuthGuard } from '@/application/guards/jwt.auth.guard';
import { FollowService } from '@/application/services/follow.service';
import { Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FollowDTO } from '../dtos/follow/follow.dto';

@Controller('follow')
@ApiTags('Follow')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':id')
  async followUser(@Req() { user }, @Param() { id }: FollowDTO) {
    return this.followService.create({
      id,
      followee: user.userId,
    });
  }

  @Delete(':id')
  async unfollowUser(@Req() { user }, @Param() { id }: FollowDTO): Promise<void> {
    return this.followService.delete({
      id,
      followee: user.userId,
    });
  }
}
