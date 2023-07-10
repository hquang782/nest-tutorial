import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { logger } from './config/logger.middleware';
import { HttpExceptionFilter } from './config/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger)

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Decription')
    .setVersion('1.0')
    .addTag('API')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
