import { PostService } from '@/application/services/post.service';
import { Body, Controller, Post } from '@nestjs/common';
import { Post as UserPost } from '@prisma/client';
import { CreatePostDTO } from '../dtos/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private service: PostService) {}

  @Post('create')
  createPost(@Body() data: CreatePostDTO): Promise<UserPost> {
    return this.service.createPost(data);
  }
}
