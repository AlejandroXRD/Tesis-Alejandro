import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(3000);
  logger.log(`🚀 [BACKEND] Aplicación corriendo en http://localhost:3000`);

  await seedAdminIfEmpty(logger);
}

async function seedAdminIfEmpty(logger: Logger) {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    logger.error('❌ [SEEDER] DATABASE_URL no está definida en .env');
    return;
  }

  // 🆕 Usar el MISMO adapter que tu PrismaService
  const adapter = new PrismaPg({ connectionString: databaseUrl });
  const prisma = new PrismaClient({ adapter });

  try {
    await prisma.$connect();
    logger.log('🔍 [SEEDER] Verificando base de datos...');

    const userCount = await prisma.user.count();

    if (userCount > 0) {
      logger.log(`✅ [SEEDER] La base de datos ya tiene ${userCount} usuario(s). No se crea admin.`);
      return;
    }

    const hashedPassword = await bcrypt.hash('admin', 10);

    const admin = await prisma.user.create({
      data: {
        userName: 'Admin',
        password: hashedPassword,
        rol: 'ADMIN',
        apellido: 'Administrador',
      },
    });

  
  } catch (error) {
    logger.error('❌ [SEEDER] Error al crear el admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

bootstrap();
