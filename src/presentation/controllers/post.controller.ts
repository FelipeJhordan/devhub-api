import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Like, Post as UserPost } from '@prisma/client';

import { JwtAuthGuard } from '@/application/guards/jwt.auth.guard';
import { PostService } from '@/application/services/post.service';

import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreatePostDTO } from '../dtos/post/create-post.dto';
import { GetPostsByUserQueryDto } from '../dtos/post/get-posts-by-user-query.dto';
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
      user_id: user.userId,
    });
  }

  @Get('/feed')
  listFeedPosts(@Req() { user }, @Query() listProfileQuerys: PaginationDto) {
    return this.postService.listFeedPost(user.userId, listProfileQuerys);
  }

  @Get('/profile')
  listProfilePost(@Req() { user }, @Query() getPostsByUserQueryDto: GetPostsByUserQueryDto) {
    const getTargetProfile = !getPostsByUserQueryDto?.userId ? user.userId : getPostsByUserQueryDto.userId;
    return this.postService.listProfilePost(getTargetProfile, getPostsByUserQueryDto);
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

  @Post(':id/like')
  likePost(@Req() { user }, @Param() { id }: PostParamDTO): Promise<Like> {
    return this.postService.likePost({ post_id: id, user_id: user.userId });
  }

  @Delete(':id/unlike')
  unlikePost(@Req() { user }, @Param() { id }: PostParamDTO): Promise<void> {
    return this.postService.unlikePost({ post_id: id, user_id: user.userId });
  }

  @Get(':id/comment')
  getAllCommentsByPost(@Req() { user }, @Param() { id }: PostParamDTO) {
    return this.postService.getCommentsByPost(user.userId, id);
  }
}
