import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class PagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.page.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOneBySlug(slug: string) {
    const page = await this.prisma.page.findUnique({ where: { slug } });
    if (!page) throw new NotFoundException('Page not found');
    return page;
  }

  async updateBySlug(slug: string, data: { title?: string; content?: string }) {
    const page = await this.prisma.page.findUnique({ where: { slug } });
    if (!page) {
      // If page doesn't exist, we can optionally create it here (upsert-like behavior) for static pages
      // But assuming seed already creates them, we just throw
      throw new NotFoundException('Page not found');
    }
    return this.prisma.page.update({
      where: { slug },
      data,
    });
  }
}
