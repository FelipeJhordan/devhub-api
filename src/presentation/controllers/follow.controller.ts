import { FollowService } from '@/application/services/follow.service';
import { Controller, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FollowDTO } from '../dtos/follow/follow.dto';

@Controller('follow')
@ApiTags('Follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':id')
  async followUser(@Req() { user }, @Param() { id }: FollowDTO) {
    return this.followService.create({
      id,
      followee: user.user_id,
    });
  }
}
