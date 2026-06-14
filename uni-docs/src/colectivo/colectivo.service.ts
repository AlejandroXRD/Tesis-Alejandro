import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateColectivoDto } from './dto/create-colectivo.dto';
import { UpdateColectivoDto } from './dto/update-colectivo.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ColectivoService {
  constructor(private prisma: PrismaService) {}

  create(createColectivoDto: CreateColectivoDto) {
    return this.prisma.colectivo.create({
      data: {
        nombreColectivo: createColectivoDto.nombreColectivo,
        year: createColectivoDto.year,
        modalidad: createColectivoDto.modalidad
      }
    });
  }

  findAll() {
    return this.prisma.colectivo.findMany({
      include: {
        profesores: {
          include: {
            profesor: {
              select: {
                userId: true,
                userName: true,
                apellido: true,
                rol: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  findAllDiurno() {
    return this.prisma.colectivo.findMany({
      where: { modalidad: 'DIURNO' },
      include: { profesores: true },
      orderBy: { createdAt: 'asc' }
    })
  }

  findAllEncuentro() {
    return this.prisma.colectivo.findMany({
      where: { modalidad: 'ENCUENTRO' },
      include: { profesores: true },
      orderBy: { createdAt: 'asc' }
    })
  }

  findOne(id: string) {
    return this.prisma.colectivo.findUnique({
      where: { colectivoId: id },
      include: { profesores: true }
    });
  }

  async update(id: string, updateColectivoDto: UpdateColectivoDto) {
    // Verificar que el colectivo existe
    const colectivoExist = await this.prisma.colectivo.findUnique({
      where: { colectivoId: id }
    });

    if (!colectivoExist) {
      throw new NotFoundException('Este colectivo no existe');
    }

    // Preparar datos para actualizar
    const updateData: any = {};

    if (updateColectivoDto.nombreColectivo) {
      updateData.nombreColectivo = updateColectivoDto.nombreColectivo;
    }

    if (typeof updateColectivoDto.year === 'number') {
      updateData.year = updateColectivoDto.year;
    }

    // Actualizar profesores si se proporcionan
    if (updateColectivoDto.profesores) {
      // Eliminar profesores actuales (relaciones)
      await this.prisma.colectivoProfesor.deleteMany({
        where: { colectivoId: id }
      });

      // Filtrar profesores válidos (que tengan profesorId y asignatura)
      const validProfesores = updateColectivoDto.profesores.filter(
        (p) => p && p.profesorId && p.asignatura
      );

      // Si hay profesores válidos, crearlos
      if (validProfesores.length > 0) {
        try {
          await this.prisma.colectivoProfesor.createMany({
            data: validProfesores.map((p) => ({
              colectivoId: id,
              userId: p.profesorId,
              asignatura: p.asignatura,
            })),
          });
        } catch (error) {
          // Si falla al crear las relaciones, lanzar error específico
          if (error.code === 'P2025') {
            throw new BadRequestException(
              'Uno o más profesores (userId) no existen en el sistema'
            );
          }
          throw error;
        }
      }
      // Si no hay profesores válidos pero se enviaron, lanzar advertencia
      else if (updateColectivoDto.profesores.length > 0) {
        console.warn(
          `[UPDATE COLECTIVO ${id}] Se intentó agregar ${updateColectivoDto.profesores.length} profesores pero ninguno era válido`
        );
      }
    }

    // Actualizar colectivo y retornar con profesores incluidos
    return this.prisma.colectivo.update({
      where: { colectivoId: id },
      data: updateData,
      include: {
        profesores: {
          include: {
            profesor: {
              select: {
                userId: true,
                userName: true,
                apellido: true,
                rol: true,
              },
            },
          },
        },
      },
    });
  }

  async remove(id: string) {
    const colectivoExist = await this.prisma.colectivo.findUnique({
      where: { colectivoId: id }
    });

    if (!colectivoExist) {
      throw new NotFoundException('Este colectivo no existe');
    }

    // Primero eliminar las relaciones de profesores (foreign key)
    await this.prisma.colectivoProfesor.deleteMany({
      where: { colectivoId: id }
    });

    return this.prisma.colectivo.delete({
      where: { colectivoId: id }
    });
  }
}