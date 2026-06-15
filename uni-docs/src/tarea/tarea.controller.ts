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
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTareaDto: CreateTareaDto) {
    return this.tareaService.create(createTareaDto);
  }

  @Get()
  findAll() {
    return this.tareaService.findAll();
  }

  // ─────────────────────────────────────────────
  // 🆕 GET /tarea/mis-tareas
  // ─────────────────────────────────────────────
  // IMPORTANTE: esta ruta debe ir ANTES de `:id`
  // para que NestJS no interprete "mis-tareas" como un UUID.
  @Get('mis-tareas')
  @UseGuards(JwtAuthGuard)
  getMisTareas(@Req() req: any) {
    // El JwtAuthGuard adjunta el payload decodificado en req.user
    const userId: string = req.user.userId ?? req.user.sub;
    return this.tareaService.getMisTareas(userId);
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

  // SUBIR ARCHIVO
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
            false,
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
    return this.tareaService.uploadArchivo(id, file.filename);
  }

  // DESCARGAR ARCHIVO
  @Get(':id/download')
  @UseGuards(JwtAuthGuard)
  async downloadArchivo(@Param('id') id: string, @Res() res: any) {
    const file = await this.tareaService.getArchivoPath(id);
    return res.download(file.path, file.filename);
  }
}