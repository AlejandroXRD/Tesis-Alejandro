import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TareaService {
  constructor(private prisma: PrismaService) {}

  async create(createTareaDto: CreateTareaDto) {
    // Verificar que el profesor existe
    const profesorExist = await this.prisma.user.findUnique({
      where: { userId: createTareaDto.profesorId }
    })
    if (!profesorExist) throw new NotFoundException('Este profesor no existe')

    return this.prisma.tarea.create({
      data: {
        nombreTarea: createTareaDto.nombreTarea,
        descripcion: createTareaDto.descripcion,
        fechaLimite: new Date(createTareaDto.fechaLimite),
        estado: createTareaDto.estado,
        userId: createTareaDto.profesorId
      },
      include: { profesor: true }
    });
  }

  findAll() {
    return this.prisma.tarea.findMany({
      include: { profesor: true }
    });
  }

  findOne(id: string) {
    return this.prisma.tarea.findUnique({
      where: { tareaId: id },
      include: { profesor: true }
    });
  }

  async update(id: string, updateTareaDto: UpdateTareaDto) {
    // Verificar que la tarea existe
    const tareaExist = await this.prisma.tarea.findUnique({
      where: { tareaId: id }
    })
    if (!tareaExist) throw new NotFoundException('Esta tarea no existe')

    // Si se proporciona un nuevo profesor, verificar que existe
    if (updateTareaDto.profesorId) {
      const profesorExist = await this.prisma.user.findUnique({
        where: { userId: updateTareaDto.profesorId }
      })
      if (!profesorExist) throw new NotFoundException('Este profesor no existe')
    }

    const updateData: any = {}
    if (updateTareaDto.nombreTarea) updateData.nombreTarea = updateTareaDto.nombreTarea
    if (updateTareaDto.descripcion) updateData.descripcion = updateTareaDto.descripcion
    if (updateTareaDto.fechaLimite) updateData.fechaLimite = new Date(updateTareaDto.fechaLimite)
    if (updateTareaDto.estado) updateData.estado = updateTareaDto.estado
    if (updateTareaDto.profesorId) updateData.userId = updateTareaDto.profesorId

    return this.prisma.tarea.update({
      where: { tareaId: id },
      data: updateData,
      include: { profesor: true }
    });
  }

  remove(id: string) {
    return this.prisma.tarea.delete({
      where: { tareaId: id }
    });
  }
}
