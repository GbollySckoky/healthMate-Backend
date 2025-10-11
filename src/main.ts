import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import express from 'express';
// import { HttpExceptionsFilter } from './common/filters/http-exceptions.filter';
// import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const corsOrigins = configService.get('CORS_ORIGIN');

  app.enableCors({
    origin: corsOrigins ? corsOrigins.split(',') : '*',
    credentials: !!corsOrigins,
  });

  // app.useGlobalInterceptors(new TransformResponseInterceptor());

  app.use(express.json({
    verify: (req: any, _, buf) => {
      req.rawBody = buf; // save raw body for later
    },
  }));

  const config = new DocumentBuilder()
    .setTitle('HealthMate NestJS Starter API')
    .setDescription('HealthMate NestJS Starter API description')
    .setVersion('1.0')
    .addTag('healthMate')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token', // This name here is important for matching in @ApiBearerAuth()
    )
    .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, documentFactory);

  // app.useGlobalFilters(new HttpExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  const port = parseInt(configService.get('PORT')!, 10) || 3000;
  // console.log(`Listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
