import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUrlEntityDto } from './dto/create-url-entity.dto';
import { UrlService } from './url.service';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  @Post()
  async create(@Body() createUrlEntityDto: CreateUrlEntityDto) {
    const urlEntity = await this.urlService.create(createUrlEntityDto.url);
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

    const originalUrl = url.originalUrl;
    return res.redirect(originalUrl as string);
  }
}
