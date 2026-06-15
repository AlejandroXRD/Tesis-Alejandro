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
        modalidad: createColectivoDto.modalidad,
        periodo : createColectivoDto.periodo
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

  /**
   * Encuentra todos los colectivos a los que pertenece un usuario específico
   * @param userId - ID del usuario (profesor)
   * @returns Array de colectivos con información del profesor y detalles completos
   */
  async findColectivosByUserId(userId: string) {
    try {
      // Buscar todas las asignaciones del usuario a colectivos
      const colectivosDelUsuario = await this.prisma.colectivoProfesor.findMany({
        where: { userId },
        include: {
          colectivo: {
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
          },
        },
        orderBy: { colectivo: { createdAt: 'asc' } },
      });

      // Si no hay colectivos, retornar array vacío
      if (colectivosDelUsuario.length === 0) {
        return {
          totalColectivos: 0,
          colectivos: [],
          mensaje: `El usuario ${userId} no está asignado a ningún colectivo`,
        };
      }

      // Transformar la respuesta para devolver solo los colectivos con la información del profesor
      const colectivos = colectivosDelUsuario.map((asignacion) => ({
        ...asignacion.colectivo,
        asignacion: {
          asignatura: asignacion.asignatura,
          asignadoEn: asignacion.createdAt,
        },
      }));

      return {
        totalColectivos: colectivos.length,
        colectivos,
        usuario: userId,
      };
    } catch (error) {
      console.error(`Error al buscar colectivos del usuario ${userId}:`, error);
      throw new BadRequestException(
        'Error al obtener los colectivos del usuario'
      );
    }
  }

  /**
   * Encuentra colectivos de un usuario filtrados por modalidad
   * @param userId - ID del usuario
   * @param modalidad - DIURNO o ENCUENTRO
   * @returns Array de colectivos filtrados
   */
  async findColectivosByUserIdAndModalidad(
    userId: string,
    modalidad: 'DIURNO' | 'ENCUENTRO'
  ) {
    try {
      const colectivosDelUsuario = await this.prisma.colectivoProfesor.findMany({
        where: {
          userId,
          colectivo: { modalidad },
        },
        include: {
          colectivo: {
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
          },
        },
        orderBy: { colectivo: { createdAt: 'asc' } },
      });

      if (colectivosDelUsuario.length === 0) {
        return {
          totalColectivos: 0,
          colectivos: [],
          modalidad,
          mensaje: `El usuario ${userId} no está asignado a colectivos ${modalidad}`,
        };
      }

      const colectivos = colectivosDelUsuario.map((asignacion) => ({
        ...asignacion.colectivo,
        asignacion: {
          asignatura: asignacion.asignatura,
          asignadoEn: asignacion.createdAt,
        },
      }));

      return {
        totalColectivos: colectivos.length,
        colectivos,
        modalidad,
        usuario: userId,
      };
    } catch (error) {
      console.error(
        `Error al buscar colectivos ${modalidad} del usuario ${userId}:`,
        error
      );
      throw new BadRequestException(
        `Error al obtener los colectivos ${modalidad} del usuario`
      );
    }
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
          console.error(`Error al actualizar profesores del colectivo ${id}:`, error);
          throw new BadRequestException(
            'Error al actualizar los profesores del colectivo. Asegúrate de que los profesorId sean válidos y existan en la base de datos.'
          );
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