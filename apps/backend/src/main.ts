import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

let cachedApp: any;

async function bootstrapServerless() {
  if (!cachedApp) {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    app.useStaticAssets(join(process.cwd(), 'public'), {
      prefix: '/public/',
    });
    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
  }
  return cachedApp;
}

// For Vercel Serverless
export default async function handler(req: any, res: any) {
  const app = await bootstrapServerless();
  return app(req, res);
}

// For Local Development
if (process.env.NODE_ENV !== 'production' || process.env.RUN_LOCAL === 'true') {
  async function bootstrapLocal() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    app.useStaticAssets(join(process.cwd(), 'public'), {
      prefix: '/public/',
    });
    await app.listen(process.env.PORT ?? 5000);
    console.log(`Backend running on port ${process.env.PORT ?? 5000}`);
  }
  bootstrapLocal();
}
