import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './url/exceptions/prisma-client-exception.filter';
import { UrlModule } from './url/url.module';

async function bootstrap() {
  const app = await NestFactory.create(UrlModule, { cors: true });

  app.useGlobalFilters(new PrismaClientExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
