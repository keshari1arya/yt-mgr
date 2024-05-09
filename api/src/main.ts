import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  if (configService.get<boolean>('SHOW_SWAGGER_DOCUMENT')) {
    const config = new DocumentBuilder()
      .setTitle('YT-MGR API')
      .setDescription('YT-MGR API description')
      .setVersion('1.0')
      .addTag('YT-MGR API')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors();

  const PORT = configService.get<number>('PORT')!;
  await app.listen(PORT);
}
bootstrap();
