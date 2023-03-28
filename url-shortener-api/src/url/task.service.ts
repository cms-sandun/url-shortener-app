import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async startLinkExpirationProcess() {
    const now = new Date();
    const result = await this.prismaService.urlEntry.deleteMany({
      where: {
        expiryAt: {
          lte: now,
        },
      },
    });
    console.log('No of expired links deleted : ', result.count);
  }
}
