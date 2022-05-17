import { Module } from '@nestjs/common';

import { CommentController } from '@/presentation/controllers/comment.controller';
import { CommentService } from '../services/comment.service';
import { CommentExists } from '@/infra/class-validator/comment-exists.validator';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentExists],
})
export class CommentModule {}
