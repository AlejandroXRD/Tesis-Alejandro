// src/uploads/uploads.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Res,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { UploadsService, Category } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  /**
   * POST /uploads/:category
   * Sube uno o varios archivos a la categoría indicada.
   * Categorías válidas: graficos | modelos | planificacion
   */
  @Post(':category')
  @UseInterceptors(FilesInterceptor('files', 20))
  uploadFiles(
    @Param('category') category: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    this.uploadsService.validateCategory(category);
    if (!files || files.length === 0) {
      throw new BadRequestException('No se recibió ningún archivo.');
    }
    return this.uploadsService.saveFiles(category as Category, files);
  }

  /**
   * GET /uploads/:category
   * Lista todos los archivos de una categoría.
   */
  @Get(':category')
  listFiles(@Param('category') category: string) {
    this.uploadsService.validateCategory(category);
    return this.uploadsService.listFiles(category as Category);
  }

  /**
   * GET /uploads/:category/:filename
   * Descarga un archivo específico.
   */
  @Get(':category/:filename')
  downloadFile(
    @Param('category') category: string,
    @Param('filename') filename: string,
    @Res() res: any,
  ) {
    this.uploadsService.validateCategory(category);
    const filePath = this.uploadsService.getFilePath(category as Category, filename);
    if (!filePath) throw new NotFoundException('Archivo no encontrado.');
    res.download(filePath, filename);
  }

  /**
   * DELETE /uploads/:category/:filename
   * Elimina un archivo específico.
   */
  @Delete(':category/:filename')
  deleteFile(
    @Param('category') category: string,
    @Param('filename') filename: string,
  ) {
    this.uploadsService.validateCategory(category);
    this.uploadsService.deleteFile(category as Category, filename);
    return { message: `Archivo "${filename}" eliminado correctamente.` };
  }
}