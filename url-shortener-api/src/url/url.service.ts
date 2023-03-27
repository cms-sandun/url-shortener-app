import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { getRandomString } from '../utils/random';
import { UrlEntry } from '@prisma/client';

@Injectable()
export class UrlService {
  constructor(private prismaService: PrismaService) {}

  async create(originalUrl: string): Promise<UrlEntry> {
    const shortUrlKey = getRandomString(10);
    return this.prismaService.urlEntry.create({
      data: {
        shortUrlKey,
        originalUrl,
      },
    });
  }

  async findOne(shortUrlKey: string): Promise<UrlEntry | null> {
    return this.prismaService.urlEntry.findFirst({
      where: {
        shortUrlKey,
      },
    });
  }

  async findUrlEntiryByOriginalUrl(originalUrl: string) {
    return this.prismaService.urlEntry.findFirst({
      where: {
        originalUrl,
      },
    });
  }

  async updateClicksCount(shortUrlKey: string) {
    return this.prismaService.urlEntry.update({
      where: {
        shortUrlKey,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });
  }
}
