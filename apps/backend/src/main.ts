import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/public/',
  });

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
  await app.listen(port, '0.0.0.0');
  console.log(`Backend server running on http://0.0.0.0:${port}`);
}

if (!process.env.VERCEL) {
  bootstrap();
}

let cachedApp: any;
export default async function handler(req: any, res: any) {
  if (!cachedApp) {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({
      origin: true,
      credentials: true,
    });
    app.useStaticAssets(join(process.cwd(), 'public'), {
      prefix: '/public/',
    });
    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
  }
  return cachedApp(req, res);
}
