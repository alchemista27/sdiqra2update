import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CommentsService } from './comments.service.js';

@Controller('api/public/comments')
export class CommentsPublicController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':postId')
  async getApprovedForPost(@Param('postId') postId: string) {
    const data = await this.commentsService.getApprovedCommentsForPost(postId);
    return { data };
  }

  @Post()
  async createComment(@Body() body: { postId: string; parentId?: string; content: string; authorName: string; authorEmail?: string }) {
    const data = await this.commentsService.createPublicComment(body);
    return { data };
  }
}
