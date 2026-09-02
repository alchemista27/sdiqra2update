import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { PagesService } from './pages.service.js';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard.js';

@Controller('api/cms/pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  async findAll() {
    const data = await this.pagesService.findAll();
    return { data };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const data = await this.pagesService.findOneBySlug(slug);
    return { data };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':slug')
  async update(@Param('slug') slug: string, @Body() updateData: { title?: string; content?: string }) {
    const data = await this.pagesService.updateBySlug(slug, updateData);
    return { data, message: 'Page updated successfully' };
  }
}
