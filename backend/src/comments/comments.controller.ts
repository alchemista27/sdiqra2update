import { Controller, Get, Query, Patch, Param, Body, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service.js';
import { SessionAuthGuard } from '../auth/session-auth.guard.js';

@Controller('api/cms/comments')
@UseGuards(SessionAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.commentsService.getAllAdmin(query);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.commentsService.updateStatus(id, status);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
