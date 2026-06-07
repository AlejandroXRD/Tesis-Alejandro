// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS para que el frontend pueda llamar
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods : 'GET,POST,PATCH,DELETE',
  });

  await app.listen(3000);

}
bootstrap();
