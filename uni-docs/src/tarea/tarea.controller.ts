import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UseGuards, UseInterceptors, UploadedFile, BadRequestException,
  Res, Req
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import * as path from 'path';

import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth-guard';

@Controller('tarea')
export class TareaController {
  private readonly uploadPath = path.join(process.cwd(), 'Uploads');

  constructor(private readonly tareaService: TareaService) {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
      console.log('📁 [BACKEND] Carpeta Uploads creada en:', this.uploadPath);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTareaDto: CreateTareaDto) {
    return this.tareaService.create(createTareaDto);
  }

  @Get()
  findAll(@Req() req: any) {
    console.log('🎯 [BACKEND] GET /tarea');
    console.log('🎯 [BACKEND] Method:', req.method);
    console.log('🎯 [BACKEND] Headers:', JSON.stringify(req.headers));
    return this.tareaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tareaService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTareaDto: UpdateTareaDto) {
    return this.tareaService.update(id, updateTareaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.tareaService.remove(id);
  }

  // 🆕 SUBIR ARCHIVO - Solo usuarios autenticados (PROFESOR/PPA)
  @Post(':id/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('archivo', {
      storage: diskStorage({
        destination: './Uploads',
        filename: (req, file, cb) => {
          const tareaId = req.params.id;
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `tarea-${tareaId}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedExt = ['.pdf', '.docx', '.xlsx', '.xls'];
        const ext = extname(file.originalname).toLowerCase();
        if (!allowedExt.includes(ext)) {
          return cb(
            new BadRequestException('Solo se permiten archivos .pdf, .docx, .xlsx, .xls'),
            false
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
    }),
  )
  async uploadArchivo(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se subió ningún archivo');
    }
    console.log('📤 [BACKEND] Archivo recibido:', file.filename);
    return this.tareaService.uploadArchivo(id, file.filename);
  }

  // 🆕 DESCARGAR ARCHIVO - Solo usuarios autenticados (ADMIN/JEFE/DECANO)
  @Get(':id/download')
  @UseGuards(JwtAuthGuard)
  async downloadArchivo(@Param('id') id: string, @Res() res: any) {
    const file = await this.tareaService.getArchivoPath(id);
    return res.download(file.path, file.filename);
  }
}
