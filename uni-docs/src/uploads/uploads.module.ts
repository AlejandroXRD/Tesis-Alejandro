// src/uploads/uploads.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  imports: [
    // Usamos memoryStorage: el servicio escribe el buffer al disco manualmente
    // así tenemos control total sobre la ruta de destino por categoría
    MulterModule.register({
      storage: memoryStorage(),
      limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB máximo por archivo
    }),
  ],
  controllers: [UploadsController],
  providers:   [UploadsService],
  exports:     [UploadsService],
})
export class UploadsModule {}