import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  // ─────────────────────────────────────────────
  // 🆕 GET MIS TAREAS según rol del usuario
  // ─────────────────────────────────────────────
  /**
   * PPA     → Ve todas las tareas de los profesores asignados
   *            a los colectivos donde él mismo está asignado.
   * PROFESOR → Ve únicamente las tareas que le fueron asignadas a él.
   * Otros roles (ADMIN, JEFE, DECANO) → ForbiddenException.
   *            Ellos usan findAll() desde su propio panel.
   */
  async getMisTareas(userId: string) {
    // 1. Obtener el usuario con su rol
    const usuario = await this.prisma.user.findUnique({
      where: { userId },
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // 2. Lógica según rol
    if (usuario.rol === 'PROFESOR') {
      // Solo sus tareas directas
      return this.prisma.tarea.findMany({
        where: { userId },
        include: { profesor: true },
        orderBy: { createdAt: 'desc' },
      });
    }

    if (usuario.rol === 'PPA') {
      // a) Encontrar los colectivos donde está asignado el PPA
      const colectivosDelPpa = await this.prisma.colectivoProfesor.findMany({
        where: { userId },
        select: { colectivoId: true },
      });

      if (colectivosDelPpa.length === 0) {
        return [];
      }

      const colectivoIds = colectivosDelPpa.map(c => c.colectivoId);

      // b) Encontrar todos los profesores en esos colectivos
      const profesoresEnColectivos = await this.prisma.colectivoProfesor.findMany({
        where: {
          colectivoId: { in: colectivoIds },
        },
        select: { userId: true },
      });

      const profesorIds = [
        // IDs únicos para no duplicar tareas si un profesor está en varios colectivos
        ...new Set(profesoresEnColectivos.map(p => p.userId)),
      ];

      // c) Retornar todas las tareas de esos profesores
      return this.prisma.tarea.findMany({
        where: {
          userId: { in: profesorIds },
        },
        include: { profesor: true },
        orderBy: { createdAt: 'desc' },
      });
    }

    // Cualquier otro rol no tiene acceso por este endpoint
    throw new ForbiddenException(
      'Tu rol no tiene acceso a este endpoint. Usa /tarea para ver todas las tareas.',
    );
  }
}