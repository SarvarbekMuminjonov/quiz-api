import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  // app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  const config = new DocumentBuilder()
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .setTitle('Intex Api')
    .setDescription('Intex API description')
    .setVersion('2.0')
    .addTag('Intex Api')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
