import { NestFactory } from '@nestjs/core';
import { AppModule } from '../backend/src/app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

let cachedApp: any;

async function bootstrapServerless() {
  if (!cachedApp) {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    app.useStaticAssets(join(process.cwd(), 'backend', 'public'), {
      prefix: '/public/',
    });
    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
  }
  return cachedApp;
}

export default async function handler(req: any, res: any) {
  const app = await bootstrapServerless();
  return app(req, res);
}
