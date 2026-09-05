import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { CommentsModule } from './comments/comments.module.js';
import { UsersModule } from './users/users.module.js';
import { PostsModule } from './cms/posts/posts.module.js';
import { SettingsModule } from './cms/settings/settings.module.js';
import { CategoriesModule } from './cms/categories/categories.module.js';
import { MediaModule } from './cms/media/media.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { MenusModule } from './cms/menus/menus.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    CommentsModule,
    PostsModule,
    SettingsModule,
    CategoriesModule,
    MediaModule,
    MenusModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
