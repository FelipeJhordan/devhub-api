import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Post as UserPost } from '@prisma/client';

import { JwtAuthGuard } from '@/application/guards/jwt.auth.guard';
import { PostService } from '@/application/services/post.service';

import { CreatePostDTO } from '../dtos/post/create-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostParamDTO } from '../dtos/post/post-param.dto';
import { UpdatePostDTO } from '../dtos/post/update-post.dto';

@Controller('post')
@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private postService: PostService) {}

  @Post('create')
  createPost(@Req() { user }, @Body() { content }: CreatePostDTO): Promise<UserPost> {
    return this.postService.createPost({
      content,
      user_id: user,
    });
  }

  @Get('/:id')
  getPost(@Param() { id }: PostParamDTO) {
    return this.postService.getPost({ post_id: id });
  }

  @Put('/:id')
  updatePost(@Param() { id }: PostParamDTO, @Body() { new_content }: UpdatePostDTO) {
    return this.postService.updatePost({ post_id: id, updated_content: new_content });
  }

  @Delete('/:id')
  deletePosts(@Param() { id }: PostParamDTO) {
    return this.postService.deletePost({ post_id: id });
  }
}
