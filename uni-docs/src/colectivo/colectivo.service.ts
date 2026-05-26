import { Injectable } from '@nestjs/common';
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

  update(id: string, updateColectivoDto: UpdateColectivoDto) {
    return `This action updates a #${id} colectivo`;
  }

  remove(id: string) {
    return `This action removes a #${id} colectivo`;
  }
}
