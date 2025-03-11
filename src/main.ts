import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API - CRUD DE USUÁRIOS')
    .setDescription('Documentação da API para gerenciamento de usuários')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document); // Acesse em http://localhost:3000

  await app.listen(3000);
}
bootstrap();
