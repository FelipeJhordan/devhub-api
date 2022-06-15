import { Module } from '@nestjs/common';

import { FollowController } from '@/presentation/controllers/follow.controller';

import { FollowService } from '../services/follow.service';

@Module({
  imports: [],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
