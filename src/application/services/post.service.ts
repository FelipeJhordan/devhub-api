import { PaginationDto } from '@/presentation/dtos/pagination/pagination.dto';
import { Injectable } from '@nestjs/common';
import { Like, Post } from '@prisma/client';
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

  listFeedPost(userId: string, { itemsPerPage, page }: PaginationDto) {
    return this.prismaService
      .$queryRaw`SELECT pf.user_id, pf.name, pf.photo, p.id, p.content, p.created_at, count(l.id) as likes, count(c.id) as comments
                 FROM users u
                 LEFT JOIN follows f ON f.follower_id = u.id
                 LEFT JOIN posts p ON p.user_id = f.following_id OR p.user_id = u.id
                 LEFT JOIN profiles pf ON pf.user_id = p.user_id
                 LEFT JOIN comments c ON p.id = c.post_id
                 LEFT JOIN likes l ON p.id = l.post_id
                 WHERE u.id = ${userId}
                 GROUP BY pf.user_id, pf.name, pf.photo, p.id, p.content, p.created_at
                 ORDER BY p.created_at DESC
                 LIMIT ${itemsPerPage} OFFSET ${(page - 1) * itemsPerPage}`;
  }

  listProfilePost(userId: string, { itemsPerPage, page }: PaginationDto) {
    return this.prismaService
      .$queryRaw`SELECT pf.user_id, pf.name, pf.photo, p.id, p.content, p.created_at, count(l.id) as likes, count(c.id) as comments
                 FROM users u
                 LEFT JOIN posts p ON p.user_id = u.id
                 LEFT JOIN profiles pf ON pf.user_id = p.user_id
                 LEFT JOIN comments c ON p.id = c.post_id
                 LEFT JOIN likes l ON p.id = l.post_id
                 WHERE u.id = ${userId}
                 GROUP BY pf.user_id, pf.name, pf.photo, p.id, p.content, p.created_at
                 ORDER BY p.created_at DESC
                 LIMIT ${itemsPerPage} OFFSET ${(page - 1) * itemsPerPage}`;
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

  async unlikePost({ user_id, post_id }: LikePost): Promise<void> {
    await this.prismaService.like.deleteMany({
      where: {
        post_id,
        user_id,
      },
    });
  }
}
