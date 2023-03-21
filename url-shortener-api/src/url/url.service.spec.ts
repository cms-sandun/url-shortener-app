import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { UrlService } from './url.service';

describe('UrlService', () => {
  let service: UrlService;
  let prismaService: PrismaService;
  const mockUrlEntry = {
    id: 1,
    shortUrlKey: '5434hg342jhgjh',
    originalUrl: 'https://google.com',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlService, PrismaService],
    }).compile();

    service = module.get<UrlService>(UrlService);
    prismaService = module.get<PrismaService>(PrismaService);

    prismaService.urlEntry.create = jest.fn().mockReturnValueOnce(mockUrlEntry);
    prismaService.urlEntry.findFirst = jest
      .fn()
      .mockReturnValueOnce(mockUrlEntry);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should create url entity with original url', async () => {
    const originalUrl = 'https://google.com';
    const entry = await service.create(originalUrl);
    expect(entry.originalUrl).toEqual(originalUrl);
    expect(entry.shortUrlKey).toEqual(mockUrlEntry.shortUrlKey);
    expect(entry.createdAt).toEqual(mockUrlEntry.createdAt);
  });

  it('should return url entity for given key', async () => {
    const entry = await service.findOne(mockUrlEntry.shortUrlKey);
    expect(entry).toEqual(mockUrlEntry);
  });
});
