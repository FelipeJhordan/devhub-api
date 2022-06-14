import { Injectable } from '@nestjs/common';
import { Like, Post, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

interface CreatePost {
  content: string;
  user_id: number;
}

interface FetchUserPosts {
  user_id: number;
}

interface UpdatePost {
  post_id: number;
  updated_content: string;
}

interface FetchPost {
  post_id: number;
}

interface DeletePost {
  post_id: number;
}

interface LikePost {
  user_id: number;
  post_id: number;
}

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  createPost(data: CreatePost): Promise<Post> {
    return this.prismaService.post.create({ data });
  }

  getUserPosts({ user_id }: FetchUserPosts): Promise<Post[]> {
    return this.prismaService.post.findMany({
      select: {
        id: true,
        content: true,
        created_at: true,
        user_id: true,
      },
      where: { user_id },
      orderBy: { created_at: 'desc' },
    });
  }

  updatePost({ post_id, updated_content }: UpdatePost): Promise<Post> {
    return this.prismaService.post.update({
      data: { content: updated_content },
      where: { id: post_id },
    });
  }

  getPost({ post_id }: FetchPost): Promise<Post> {
    return this.prismaService.post.findUnique({ where: { id: post_id } });
  }

  deletePost({ post_id }: DeletePost): Promise<Post> {
    return this.prismaService.post.delete({ where: { id: post_id } });
  }

  likePost({ user_id, post_id }: LikePost): Promise<Like> {
    return this.prismaService.like.create({
      data: {
        post_id,
        user_id,
      },
    });
  }
}
