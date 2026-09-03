import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.menuItem.findMany({
      orderBy: { order: 'asc' },
      include: {
        children: {
          orderBy: { order: 'asc' },
        },
      },
      where: {
        parentId: null, // Only fetch root nodes, children are eagerly loaded
      },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.menuItem.findUnique({
      where: { id },
      include: { children: true },
    });
    if (!item) throw new NotFoundException('Menu not found');
    return item;
  }

  async create(data: any) {
    return this.prisma.menuItem.create({
      data: {
        label: data.label,
        url: data.url,
        order: data.order || 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
        openInNewTab: data.openInNewTab || false,
        parentId: data.parentId || null,
      },
    });
  }

  async update(id: string, data: any) {
    await this.findOne(id); // ensure exists
    return this.prisma.menuItem.update({
      where: { id },
      data: {
        label: data.label,
        url: data.url,
        order: data.order,
        isActive: data.isActive,
        openInNewTab: data.openInNewTab,
        parentId: data.parentId,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.menuItem.deleteMany({ where: { parentId: id } });
    return this.prisma.menuItem.delete({ where: { id } });
  }
}
