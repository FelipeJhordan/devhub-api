import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from './prisma.service';

interface CreatePost {
  content: string;
  created_at: string;
  user_id: number;
}

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  createPost(data: CreatePost): Promise<Post> {
    return this.prismaService.post.create({ data });
  }
}
