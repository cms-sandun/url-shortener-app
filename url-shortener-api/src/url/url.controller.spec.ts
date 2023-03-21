import { Test, TestingModule } from '@nestjs/testing';
import { UrlEntry } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUrlEntityDto } from './dto/create-url-entity.dto';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

describe('UrlController', () => {
  let controller: UrlController;
  let service: UrlService;
  const mockUrlEntity: UrlEntry = {
    id: 1,
    originalUrl: 'https://google.com',
    shortUrlKey: '1736423kj4b3kj',
    createdAt: new Date(),
  };
  const mockResponse = {
    location: mockUrlEntity.originalUrl,
    status: 302,
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [UrlService, PrismaService],
    }).compile();

    controller = module.get<UrlController>(UrlController);
    service = module.get<UrlService>(UrlService);

    service.create = jest.fn().mockReturnValueOnce(mockUrlEntity);
    service.findOne = jest.fn().mockReturnValueOnce(mockUrlEntity);

    mockResponse.redirect = jest.fn().mockImplementationOnce(() => {
      return mockResponse;
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return url entity for given original url', async () => {
    const createUrlEntityDto: CreateUrlEntityDto = {
      url: mockUrlEntity.originalUrl,
    };
    const urlEntity = await controller.create(createUrlEntityDto);
    expect(urlEntity).toEqual(mockUrlEntity);
  });

  it('should return original url for given shortUrlKey', async () => {
    await controller.findOne(mockUrlEntity.shortUrlKey, mockResponse);
    expect(mockResponse.redirect).toHaveBeenCalledWith(
      mockUrlEntity.originalUrl,
    );
  });
});
