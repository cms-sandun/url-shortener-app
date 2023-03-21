import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UrlModule } from '../src/url/url.module';
import { PrismaService } from '../prisma/prisma.service';
import { UrlService } from '../src/url/url.service';
import { PrismaClient, UrlEntry } from '@prisma/client';

describe('UrlController (e2e)', () => {
  let app: INestApplication;
  let prismaClient: PrismaClient;
  const mockUrlEntity: Omit<UrlEntry, 'id' | 'createdAt'> = {
    originalUrl: 'https://www.google.com',
    shortUrlKey: 'Xft6PHIe0R',
  };

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();

    await prismaClient.urlEntry.create({
      data: {
        originalUrl: mockUrlEntity.originalUrl,
        shortUrlKey: mockUrlEntity.shortUrlKey,
      },
    });
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UrlModule],
      providers: [PrismaService, UrlService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('create shorten url from original url', () => {
    it('should return url entity object with 201 response code for valid request body', () => {
      return request(app.getHttpServer())
        .post('/')
        .send({ url: mockUrlEntity.originalUrl })
        .expect(201)
        .then((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('shortUrlKey');
          expect(res.body).toHaveProperty('originalUrl');
          expect(res.body).toHaveProperty('createdAt');

          expect(res.body.originalUrl).toBe(mockUrlEntity.originalUrl);
          expect(res.body.shortUrlKey).toHaveLength(10);
        });
    });

    it('should return url 400 bad request for invalid request body', () => {
      return request(app.getHttpServer())
        .post('/')
        .send({ url: 'invalid url' })
        .expect(400)
        .then((res) => {
          expect(res.body.message[0]).toEqual('url must be a URL address');
          expect(res.body.error).toEqual('Bad Request');
        });
    });
  });

  describe('get original url from shorten url', () => {
    it('should return url entity object with 302 response code for valid urlShortenKey', () => {
      return request(app.getHttpServer())
        .get(`/${mockUrlEntity.shortUrlKey}`)
        .expect(302)
        .then((res) => {
          expect(res.header.location).toBe(mockUrlEntity.originalUrl);
        });
    });

    it('should return 404 response code for invalid urlShortenKey', () => {
      return request(app.getHttpServer())
        .get(`/invalidKey`)
        .expect(404)
        .then((res) => {
          expect(res.body.message).toEqual(
            'Invalid url provided. Please try with valid url',
          );
          expect(res.body.error).toEqual('Not Found');
        });
    });
  });

  afterAll(async () => {
    // Delete test entries
    await prismaClient.urlEntry.deleteMany({
      where: {
        originalUrl: mockUrlEntity.originalUrl,
      },
    });

    // Shutting down the prisma client and app
    await prismaClient.$disconnect();
    await app.close();
  });
});
