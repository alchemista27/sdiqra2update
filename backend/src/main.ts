import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors();
  
  // Create /public/uploads directory if it doesn't exist (handle statically)
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/public/',
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
