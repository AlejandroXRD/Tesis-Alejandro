import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { PrismaService } from 'src/prisma.service';
import { Rol } from '@prisma/client';

@Injectable()
export class ReporteService {
  
  constructor( private prisma : PrismaService ){

  }

  async getReport(colectivoId: string, user: { userId: string; username: string; rol: Rol }) {
    // Verify access for PPA and PROFESOR
    if (user.rol === Rol.PPA || user.rol === Rol.PROFESOR) {
      const assigned = await this.prisma.colectivoProfesor.findUnique({
        where: {
          colectivoId_userId: {
            colectivoId,
            userId: user.userId,
          },
        },
      });

      if (!assigned) {
        throw new ForbiddenException('No tiene acceso a este colectivo');
      }
    }

    const report = await this.prisma.colectivo.findUnique({
      where: { colectivoId },
      include: {
        profesores: {
          include: {
            profesor: {
              include: {
                tareas: true,
              },
            },
          },
        },
      },
    });

    if (!report) {
      return null;
    }

    let profesoresFiltrados = report.profesores;

    // For PROFESOR role, only show their own data
    if (user.rol === Rol.PROFESOR) {
      profesoresFiltrados = report.profesores.filter(cp => cp.profesor.userId === user.userId);
    }

    const reporteFormato = {
      colectivo: {
        nombre: report.nombreColectivo,
        año: report.year,
        modalidad: report.modalidad,
        cantidadProfesores: profesoresFiltrados.length,
      },
      profesores: profesoresFiltrados.map((cp) => ({
        nombre: cp.profesor.userName,
        apellido: cp.profesor.apellido,
        rol: cp.profesor.rol,
        asignatura: cp.asignatura,
        tareas: cp.profesor.tareas.map((tarea) => ({
          nombreTarea: tarea.nombreTarea,
          descripcion: tarea.descripcion,
          fechaLimite: tarea.fechaLimite,
          estado: tarea.estado,
        })),
      })),
    };
    return reporteFormato;
  }
}
