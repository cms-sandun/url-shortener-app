import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UrlModule } from './url/url.module';

async function bootstrap() {
  const app = await NestFactory.create(UrlModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
