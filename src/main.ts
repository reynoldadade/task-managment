import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  // swagger

  const options = new DocumentBuilder()
    .setTitle('Task Management')
    .setDescription('API description for task management Apps')
    .setVersion('1.0')
    .addTag('tasks')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = 3000;
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
