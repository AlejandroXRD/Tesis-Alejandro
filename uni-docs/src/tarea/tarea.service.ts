import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TareaService {
  private readonly uploadPath = path.join(process.cwd(), 'Uploads');

  constructor(private prisma: PrismaService) {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async create(createTareaDto: CreateTareaDto) {
    const profesorExist = await this.prisma.user.findUnique({
      where: { userId: createTareaDto.profesorId },
    });
    if (!profesorExist) throw new NotFoundException('Este profesor no existe');

    return this.prisma.tarea.create({
      data: {
        nombreTarea: createTareaDto.nombreTarea,
        descripcion: createTareaDto.descripcion,
        fechaLimite: new Date(createTareaDto.fechaLimite),
        estado: 'PENDIENTE',
        userId: createTareaDto.profesorId,
      },
      include: { profesor: true },
    });
  }

  findAll() {
    return this.prisma.tarea.findMany({
      include: { profesor: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.tarea.findUnique({
      where: { tareaId: id },
      include: { profesor: true },
    });
  }

  async update(id: string, updateTareaDto: UpdateTareaDto) {
    const tareaExist = await this.prisma.tarea.findUnique({
      where: { tareaId: id },
    });
    if (!tareaExist) throw new NotFoundException('Esta tarea no existe');

    if (updateTareaDto.profesorId) {
      const profesorExist = await this.prisma.user.findUnique({
        where: { userId: updateTareaDto.profesorId },
      });
      if (!profesorExist) throw new NotFoundException('Este profesor no existe');
    }

    const updateData: any = {};
    if (updateTareaDto.nombreTarea) updateData.nombreTarea = updateTareaDto.nombreTarea;
    if (updateTareaDto.descripcion) updateData.descripcion = updateTareaDto.descripcion;
    if (updateTareaDto.fechaLimite) updateData.fechaLimite = new Date(updateTareaDto.fechaLimite);
    if (updateTareaDto.estado) updateData.estado = updateTareaDto.estado;
    if (updateTareaDto.profesorId) updateData.userId = updateTareaDto.profesorId;

    return this.prisma.tarea.update({
      where: { tareaId: id },
      data: updateData,
      include: { profesor: true },
    });
  }

  remove(id: string) {
    return this.prisma.tarea.delete({
      where: { tareaId: id },
    });
  }

  // 🆕 Guardar nombre de archivo
  async uploadArchivo(tareaId: string, filename: string) {
    const tareaExist = await this.prisma.tarea.findUnique({
      where: { tareaId },
    });
    if (!tareaExist) throw new NotFoundException('Esta tarea no existe');

    return this.prisma.tarea.update({
      where: { tareaId },
      data: { archivo: filename },
      include: { profesor: true },
    });
  }

  // 🆕 Obtener ruta física del archivo
  async getArchivoPath(tareaId: string): Promise<{ path: string; filename: string }> {
    const tarea = await this.prisma.tarea.findUnique({
      where: { tareaId },
    });
    if (!tarea) throw new NotFoundException('Tarea no encontrada');
    if (!tarea.archivo) {
      throw new NotFoundException('Esta tarea no tiene archivo adjunto');
    }

    const filePath = path.join(this.uploadPath, tarea.archivo);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Archivo físico no encontrado en el servidor');
    }

    return { path: filePath, filename: tarea.archivo };
  }
}
