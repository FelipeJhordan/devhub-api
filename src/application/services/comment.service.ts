import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from '@prisma/client';

import { PrismaService } from './prisma.service';

import { CommentParamDTO } from '@/presentation/dtos/comment/comment-param.dto';
import { CreateCommentDTO } from '@/presentation/dtos/comment/create-comment.dto';
import { UpdateCommentDTO } from '@/presentation/dtos/comment/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async createComment(data: CreateCommentDTO): Promise<Comment> {
    return this.prismaService.comment.create({ data });
  }

  async getComment({ id }: CommentParamDTO): Promise<Comment> {
    const post = await this.prismaService.comment.findUnique({
      select: { id: true, content: true, created_at: true, post_id: true, user_id: true },
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Comentário não encontrado!');
    }

    return post;
  }

  async updateComment({ id, new_content }: CommentParamDTO & UpdateCommentDTO): Promise<Comment> {
    return this.prismaService.comment.update({
      data: { content: new_content },
      where: { id },
    });
  }

  async deleteComment({ id }: CommentParamDTO): Promise<Comment> {
    return this.prismaService.comment.delete({
      where: { id },
    });
  }
}
