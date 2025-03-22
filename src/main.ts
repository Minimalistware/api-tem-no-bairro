import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { DtoValidationPipe } from './utils/dto.validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'api',
      json: true,
    }),
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new DtoValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Tem No Bairro')
    .setDescription('API de Entregas')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 application is running on: ${await app.getUrl()}`);
}
bootstrap();
