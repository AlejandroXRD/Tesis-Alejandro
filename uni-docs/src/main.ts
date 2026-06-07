// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS para que el frontend pueda llamar
  app.enableCors({
    origin: 'http://localhost:4200', // URL de tu frontend (Next.js, React, etc.)
    credentials: true,
  });

  // ✅ Validación automática de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(3000);  // ← antes: 4200
  console.log('Backend corriendo en http://localhost:3000');

}
bootstrap();
