import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPublicComment(data: { postId: string, parentId?: string, content: string, authorName: string, authorEmail?: string }) {
    return this.prisma.comment.create({
      data: {
        postId: data.postId,
        parentId: data.parentId || null,
        content: data.content,
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        status: 'PENDING',
      },
    });
  }

  async getApprovedCommentsForPost(postId: string) {
    const comments = await this.prisma.comment.findMany({
      where: { postId, status: 'APPROVED' },
      orderBy: { createdAt: 'asc' },
    });
    
    // Nest the comments in a tree
    const commentMap = new Map();
    comments.forEach(c => commentMap.set(c.id, { ...c, replies: [] }));
    const rootComments: any[] = [];
    comments.forEach(c => {
      if (c.parentId) {
        const parent = commentMap.get(c.parentId);
        if (parent) parent.replies.push(commentMap.get(c.id));
      } else {
        rootComments.push(commentMap.get(c.id));
      }
    });
    return rootComments;
  }

  async getAllAdmin(query: any) {
    const limit = parseInt(query.limit) || 20;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;

    const [comments, total] = await Promise.all([
      this.prisma.comment.findMany({
        where,
        take: limit,
        skip,
        orderBy: { createdAt: 'desc' },
        include: { post: { select: { title: true } } },
      }),
      this.prisma.comment.count({ where }),
    ]);

    return {
      data: comments,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async updateStatus(id: string, status: any) {
    return this.prisma.comment.update({
      where: { id },
      data: { status },
    });
  }

  async remove(id: string) {
    return this.prisma.comment.delete({ where: { id } });
  }
}
