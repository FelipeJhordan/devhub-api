import { JwtAuthGuard } from '@/application/guards/jwt.auth.guard';
import { CommentService } from '@/application/services/comment.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Like } from '@prisma/client';
import { CommentParamDTO } from '../dtos/comment/comment-param.dto';
import { CreateCommentDTO } from '../dtos/comment/create-comment.dto';
import { UpdateCommentDTO } from '../dtos/comment/update-comment.dto';
import { PostParamDTO } from '../dtos/post/post-param.dto';

@Controller('comment')
@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/create')
  createComment(@Req() { user }, @Body() { content, post_id }: CreateCommentDTO) {
    return this.commentService.createComment({ content, post_id, user_id: user.userId });
  }

  @Get('/:id')
  getComment(@Param() { id }: CommentParamDTO) {
    return this.commentService.getComment({ id });
  }

  @Put('/:id')
  updateComment(@Param() { id }: CommentParamDTO, @Body() { new_content }: UpdateCommentDTO) {
    return this.commentService.updateComment({ id, new_content });
  }

  @Delete('/:id')
  deleteComments(@Param() { id }: CommentParamDTO) {
    return this.commentService.deleteComment({ id });
  }

  @Post(':id/like')
  likeComment(@Req() { user }, @Param() { id }: PostParamDTO): Promise<Like> {
    return this.commentService.likeComment({ comment_id: id, user_id: user.userId });
  }

  @Delete(':id/like')
  deslikeComment(@Req() { user }, @Param() { id }: PostParamDTO): Promise<void> {
    return this.commentService.deslikeComment({ comment_id: id, user_id: user.userId });
  }
}
