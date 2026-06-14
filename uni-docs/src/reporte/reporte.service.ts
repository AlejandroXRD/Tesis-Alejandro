import { Injectable } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReporteService {
  
  constructor( private prisma : PrismaService ){

  }

  async getReport(id: string) {
    const report = await this.prisma.colectivo.findUnique({
      where: { colectivoId: id },
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

    // Estructura los datos en el formato requerido
    const reporteFormato = {
      colectivo: {
        nombre: report.nombreColectivo,
        año: report.year,
        modalidad: report.modalidad,
        cantidadProfesores: report.profesores.length,
      },
      profesores: report.profesores.map((cp) => ({
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
