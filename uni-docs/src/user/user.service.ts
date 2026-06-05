import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssignColectivosDto } from './dto/assign-colectivos.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        userId: true,
        userName: true,
        rol: true,
        apellido: true,
        createdAt: true,
        colectivos: true
      }
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { userId: id },
      include: { colectivos: true, tareas: true }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Verificar que el usuario existe
    const userExist = await this.prisma.user.findUnique({
      where: { userId: id }
    })
    if (!userExist) throw new NotFoundException('Este usuario no existe')

    const updateData: any = {}
    if (updateUserDto.userName) updateData.userName = updateUserDto.userName
    if (updateUserDto.apellido) updateData.apellido = updateUserDto.apellido
    if (updateUserDto.rol) updateData.rol = updateUserDto.rol

    return this.prisma.user.update({
      where: { userId: id },
      data: updateData,
      select: {
        userId: true,
        userName: true,
        rol: true,
        apellido: true,
        createdAt: true,
        colectivos: true
      }
    });
  }

  async remove(id: string) {
    // Verificar que el usuario existe
    const userExist = await this.prisma.user.findUnique({
      where: { userId: id }
    })
    if (!userExist) throw new NotFoundException('Este usuario no existe')

    return this.prisma.user.delete({
      where: { userId: id }
    });
  }

  async assignColectivos(userId: string, assignColectivosDto: AssignColectivosDto) {
    // Verificar que el usuario existe
    const userExist = await this.prisma.user.findUnique({
      where: { userId: userId }
    })
    if (!userExist) throw new NotFoundException('Este usuario no existe')

    // Eliminar colectivos anteriores
    await this.prisma.colectivoProfesor.deleteMany({
      where: { userId: userId }
    })

    // Asignar nuevos colectivos
    for (const colectivo of assignColectivosDto.colectivos) {
      // Verificar que el colectivo existe
      const colectivoExist = await this.prisma.colectivo.findUnique({
        where: { colectivoId: colectivo.colectivoId }
      })
      if (!colectivoExist) throw new NotFoundException(`El colectivo ${colectivo.colectivoId} no existe`)
    }

    // Crear las nuevas asignaciones
    for (const colectivo of assignColectivosDto.colectivos) {
      await this.prisma.colectivoProfesor.create({
        data: {
          colectivoId: colectivo.colectivoId,
          userId: userId,
          asignatura: colectivo.asignatura
        }
      })
    }

    return this.prisma.user.findUnique({
      where: { userId: userId },
      include: { colectivos: true }
    });
  }

  findColectivos(userId: string) {
    return this.prisma.colectivoProfesor.findMany({
      where: { userId: userId },
      include: { colectivo: true }
    });
  }
}
