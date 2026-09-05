import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any) {
    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        take: limit,
        skip,
        orderBy: { createdAt: 'desc' },
        include: { category: true, author: { select: { name: true } } },
      }),
      this.prisma.post.count({ where }),
    ]);

    return {
      data: posts,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOneBySlug(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
      include: { category: true, author: { select: { name: true } } },
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }
}
