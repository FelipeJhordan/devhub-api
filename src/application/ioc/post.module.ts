import { PostController } from '@/presentation/controllers/post.controller';
import { Module } from '@nestjs/common';
import { PostService } from '../services/post.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
