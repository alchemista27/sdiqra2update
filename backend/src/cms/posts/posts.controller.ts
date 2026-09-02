import { Controller, Get, Query, Param } from '@nestjs/common';
import { PostsService } from './posts.service.js';

@Controller('api/cms/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.postsService.findAll(query);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const data = await this.postsService.findOneBySlug(slug);
    return { data };
  }
}
