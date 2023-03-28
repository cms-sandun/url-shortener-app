import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './task.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [UrlController],
  providers: [UrlService, PrismaService, TasksService],
})
export class UrlModule {}
