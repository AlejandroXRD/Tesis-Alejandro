import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  Req,
  BadRequestException,
} from '@nestjs/common';

import { ColectivoService } from './colectivo.service';
import { CreateColectivoDto } from './dto/create-colectivo.dto';
import { UpdateColectivoDto } from './dto/update-colectivo.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth-guard';

@Controller('colectivo')
export class ColectivoController {
  constructor(private readonly colectivoService: ColectivoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createColectivoDto: CreateColectivoDto, @Req() req?: any) {
    const rol = (req?.user?.rol ?? '').toString().toUpperCase();
    if (
      rol !== 'ADMIN' &&
      rol !== 'DECANO_VICEDECANO' &&
      rol !== 'JEFE_DEPARTAMENTO'
    ) {
      throw new ForbiddenException(
        'No tienes permisos para crear colectivos'
      );
    }
    return this.colectivoService.create(createColectivoDto);
  }

  @Get()
  findAll() {
    return this.colectivoService.findAll();
  }

  @Get('diurno')
  findAllDiurno() {
    return this.colectivoService.findAllDiurno();
  }

  @Get('encuentro')
  findAllEncuentro() {
    return this.colectivoService.findAllEncuentro();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Validar que el ID sea un UUID válido
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException('El ID debe ser un UUID válido');
    }
    return this.colectivoService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateColectivoDto: UpdateColectivoDto,
    @Req() req?: any
  ) {
    // Validar que el ID sea un UUID válido
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException('El ID debe ser un UUID válido');
    }

    const rol = (req?.user?.rol ?? '').toString().toUpperCase();
    if (
      rol !== 'ADMIN' &&
      rol !== 'DECANO_VICEDECANO' &&
      rol !== 'JEFE_DEPARTAMENTO'
    ) {
      throw new ForbiddenException(
        'No tienes permisos para editar colectivos'
      );
    }

    return this.colectivoService.update(id, updateColectivoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req?: any) {
    // Validar que el ID sea un UUID válido
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException('El ID debe ser un UUID válido');
    }

    const rol = (req?.user?.rol ?? '').toString().toUpperCase();
    if (
      rol !== 'ADMIN' &&
      rol !== 'DECANO_VICEDECANO' &&
      rol !== 'JEFE_DEPARTAMENTO'
    ) {
      throw new ForbiddenException(
        'No tienes permisos para eliminar colectivos'
      );
    }

    return this.colectivoService.remove(id);
  }
}