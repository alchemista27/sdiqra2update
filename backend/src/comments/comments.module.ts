import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service.js';
import { CommentsController } from './comments.controller.js';
import { CommentsPublicController } from './comments-public.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [CommentsController, CommentsPublicController],
  providers: [CommentsService],
})
export class CommentsModule {}
