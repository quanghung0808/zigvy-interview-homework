import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Server } from 'http';

interface SigninResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
  };
}

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer() as Server)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST)', async () => {
    const res = await request(app.getHttpServer() as Server)
      .post('/auth/signup')
      .send({ email: 'test@example.com', password: 'password123' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  it('/auth/signin (POST)', async () => {
    const res = await request(app.getHttpServer() as Server)
      .post('/auth/signin')
      .send({ email: 'test@example.com', password: 'password123' })
      .expect(201);

    const body = res.body as SigninResponse;

    expect(body).toHaveProperty('access_token');
    expect(body.user).toHaveProperty('email', 'test@example.com');
  });

  afterAll(async () => {
    await app.close();
  });
});
