import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Controller('api/cms/categories')
export class CategoriesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll() {
    const data = await this.prisma.category.findMany();
    return { data };
  }

  @Post()
  async create(@Body() body: { name: string, description?: string }) {
    const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const data = await this.prisma.category.create({ data: { name: body.name, description: body.description, slug } });
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.prisma.category.delete({ where: { id } });
    return { success: true };
  }
}
