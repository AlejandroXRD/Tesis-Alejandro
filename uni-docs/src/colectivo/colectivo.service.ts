import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColectivoDto } from './dto/create-colectivo.dto';
import { UpdateColectivoDto } from './dto/update-colectivo.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ColectivoService {
  constructor( private prisma : PrismaService ){}
  create(createColectivoDto: CreateColectivoDto) {
    return this.prisma.colectivo.create({
      data: { nombreColectivo : createColectivoDto.nombreColectivo,
        year : createColectivoDto.year, modalidad : createColectivoDto.modalidad
      }
    });
  }

  findAll() {
    return this.prisma.colectivo.findMany();
  }

  findOne(id: string) {
    return this.prisma.colectivo.findUnique({
      where : { colectivoId : id },
      include: { profesores : true }
    });
  }

  async update(id: string, updateColectivoDto: UpdateColectivoDto) {
    // Verificar que el colectivo existe
    const colectivoExist = await this.prisma.colectivo.findUnique({
      where: { colectivoId: id }
    })
    if(!colectivoExist) throw new NotFoundException('Este colectivo no existe')

    // Preparar datos para actualizar
    const updateData: any = {}
    if(updateColectivoDto.nombreColecivo) {
      updateData.nombreColectivo = updateColectivoDto.nombreColecivo
    }
    if(updateColectivoDto.year) {
      updateData.year = updateColectivoDto.year
    }

    // Actualizar profesores si se proporcionan
    if(updateColectivoDto.profesores && updateColectivoDto.profesores.length > 0) {
      // Eliminar profesores actuales
      await this.prisma.colectivoProfesor.deleteMany({
        where: { colectivoId: id }
      })

      // Crear nuevos profesores con sus asignaturas
      updateData.profesores = {
        create: updateColectivoDto.profesores.map(profesor => ({
          userId: profesor.profesorId,
          asignatura: profesor.asignatura
        }))
      }
    }

    return this.prisma.colectivo.update({
      where: { colectivoId: id },
      data: updateData,
      include: { profesores: true }
    })
  }

  remove(id: string) {
    return `This action removes a #${id} colectivo`;
  }
}
