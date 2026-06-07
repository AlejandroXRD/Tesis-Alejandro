import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';  // ✅ Importa PrismaService

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],  // ✅ Lo registra
  exports: [UserService, PrismaService],  // ✅ Lo exporta
})
export class UserModule {}
