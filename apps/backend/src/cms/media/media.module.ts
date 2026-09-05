import { Module } from '@nestjs/common';
import { MediaService } from './media.service.js';
import { MediaController } from './media.controller.js';

@Module({
  providers: [MediaService],
  controllers: [MediaController]
})
export class MediaModule {}
