import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { DtoValidationPipe } from 'src/pipes/dto.validation.pipe';
import { SeederService } from 'src/helpers/seeder.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;
  let seeder: SeederService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new DtoValidationPipe());
    seeder = app.get(SeederService);
    await seeder.seed();
    await app.init();
  });

  describe('Sign in operations', () => {
    it('should successfully log in.', () => {
      return request(app.getHttpServer())
        .post('/auth/signIn')
        .send({
          email: 'joao.silva@example.com',
          password: 'hashedpassword123',
        })
        .expect(200);
    });
  });

  afterAll(async () => {
    await seeder.tear();
    await app.close();
  });
});
