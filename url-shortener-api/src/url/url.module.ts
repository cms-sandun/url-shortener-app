import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

@Module({
  imports: [],
  controllers: [UrlController],
  providers: [UrlService, PrismaService],
})
export class UrlModule {}
