import { CommentService } from '@/application/services/comment.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentParamDTO } from '../dtos/comment/comment-param.dto';
import { CreateCommentDTO } from '../dtos/comment/create-comment.dto';
import { UpdateCommentDTO } from '../dtos/comment/update-comment.dto';

@Controller('comment')
@ApiTags('Comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/create')
  createComment(@Body() { content, post_id, user_id }: CreateCommentDTO) {
    return this.commentService.createComment({ content, post_id, user_id });
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
}
