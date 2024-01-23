import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validation pipe
  app.useGlobalPipes(new ValidationPipe());

  //Global prefix
  app.setGlobalPrefix('api');

  //Swagger config
  const options = new DocumentBuilder()
    .setTitle('Notebook API')
    .setDescription('Notebook API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      description: 'Enter access token here',
      bearerFormat: 'Bearer ${token}',
      in: 'header',
      name: 'Authorization',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = process.env.PORT || 3000;

  // Configure CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers)
  });

  await app.listen(PORT);

  Logger.log(`📓 Notebook backend is running on http://localhost:${PORT}`);
  Logger.log(`📚 Swagger is running on http://localhost:${PORT}/api/docs`);
}
bootstrap();
