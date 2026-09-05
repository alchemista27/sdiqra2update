import { Controller, Get, Post, Delete, Param, Query, UseInterceptors, UploadedFile, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { MediaService } from './media.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { SessionAuthGuard } from '../../auth/session-auth.guard.js';

@Controller('api/cms/media')
@UseGuards(SessionAuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  async getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 50;
    return this.mediaService.getAllMedia(p, l);
  }
  
  @Get('folders')
  async getFolders() {
    return { data: [{ name: 'General', path: 'iqra2' }] };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: any,
    @Request() req: any,
    @Query('folder') folder?: string
  ) {
    if (!file) throw new BadRequestException('File is missing');
    const media = await this.mediaService.uploadFile(file, req.user.id, folder);
    return { data: media };
  }

  @Delete(':id')
  async deleteMedia(@Param('id') id: string) {
    return this.mediaService.deleteMedia(id);
  }
}
