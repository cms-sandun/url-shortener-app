import {
  Body,
  Controller,
  Get,
  GoneException,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { EXPIRE_TIME } from './constants/time.constant';
import { CreateUrlEntityDto } from './dto/create-url-entity.dto';
import { PrismaClientExceptionFilter } from './exceptions/prisma-client-exception.filter';
import { TasksService } from './task.service';
import { UrlService } from './url.service';

@Controller()
@UseFilters(PrismaClientExceptionFilter)
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly taskService: TasksService,
  ) {
    // Start Link expiration process
    this.taskService.startLinkExpirationProcess();
  }

  @Post()
  async create(@Body() createUrlEntityDto: CreateUrlEntityDto) {
    const existingUrlEntity = await this.urlService.findUrlEntiryByOriginalUrl(
      createUrlEntityDto.url,
    );

    if (existingUrlEntity) {
      return existingUrlEntity;
    }

    // Link expiration
    const now = new Date();
    now.setSeconds(now.getSeconds() + EXPIRE_TIME);
    createUrlEntityDto.expiryAt = now;

    const urlEntity = await this.urlService.create(createUrlEntityDto);
    return urlEntity;
  }

  @Get(':shortUrlKey')
  @HttpCode(302)
  async findOne(
    @Param('shortUrlKey') shortUrlKey: string,
    @Res() res: Response,
  ) {
    const url = await this.urlService.findOne(shortUrlKey);

    if (!url) {
      throw new NotFoundException(
        'Invalid url provided. Please try with valid url',
      );
    }

    if (url.expiryAt && url.expiryAt < new Date()) {
      throw new GoneException('Link has been expired');
    }

    // Update click count
    await this.urlService.updateClicksCount(shortUrlKey);

    const originalUrl = url.originalUrl;
    return res.redirect(originalUrl as string);
  }
}
