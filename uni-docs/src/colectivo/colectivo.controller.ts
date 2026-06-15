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
  Query,
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

  /**
   * Obtiene todos los colectivos a los que pertenece el usuario actual
   * Requiere autenticación JWT
   * Endpoint: GET /colectivo/usuario/mis-colectivos
   */
  @Get('usuario/mis-colectivos')
  @UseGuards(JwtAuthGuard)
  findMisColectivos(@Req() req: any) {
    const userId = req?.user?.userId;
    
    if (!userId) {
      throw new BadRequestException('No se pudo obtener el ID del usuario del token JWT');
    }

    return this.colectivoService.findColectivosByUserId(userId);
  }

  /**
   * Obtiene todos los colectivos a los que pertenece un usuario específico
   * Requiere autenticación JWT
   * Endpoint: GET /colectivo/usuario/:userId
   * @param userId - ID del usuario a buscar
   */
  @Get('usuario/:userId')
  @UseGuards(JwtAuthGuard)
  findColectivosByUser(@Param('userId') userId: string) {
    // Validar que sea un UUID válido
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (!uuidRegex.test(userId)) {
      throw new BadRequestException('El userId debe ser un UUID válido');
    }

    return this.colectivoService.findColectivosByUserId(userId);
  }

  /**
   * Obtiene colectivos de un usuario filtrados por modalidad (DIURNO o ENCUENTRO)
   * Requiere autenticación JWT
   * Endpoint: GET /colectivo/usuario/mis-colectivos/:modalidad
   * @param modalidad - DIURNO o ENCUENTRO
   */
  @Get('usuario/mis-colectivos/:modalidad')
  @UseGuards(JwtAuthGuard)
  findMisColectivosByModalidad(
    @Param('modalidad') modalidad: string,
    @Req() req: any
  ) {
    const userId = req?.user?.userId;
    
    if (!userId) {
      throw new BadRequestException('No se pudo obtener el ID del usuario del token JWT');
    }

    // Validar que la modalidad sea válida
    const modalidadUpper = (modalidad ?? '').toString().toUpperCase();
    if (modalidadUpper !== 'DIURNO' && modalidadUpper !== 'ENCUENTRO') {
      throw new BadRequestException(
        'La modalidad debe ser DIURNO o ENCUENTRO'
      );
    }

    return this.colectivoService.findColectivosByUserIdAndModalidad(
      userId,
      modalidadUpper as 'DIURNO' | 'ENCUENTRO'
    );
  }

  /**
   * Obtiene colectivos de cualquier usuario filtrados por modalidad
   * Requiere autenticación JWT
   * Endpoint: GET /colectivo/usuario/:userId/modalidad/:modalidad
   * @param userId - ID del usuario
   * @param modalidad - DIURNO o ENCUENTRO
   */
  @Get('usuario/:userId/modalidad/:modalidad')
  @UseGuards(JwtAuthGuard)
  findColectivosByUserAndModalidad(
    @Param('userId') userId: string,
    @Param('modalidad') modalidad: string,
    @Req() req?: any
  ) {
    // Validar que sea un UUID válido
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (!uuidRegex.test(userId)) {
      throw new BadRequestException('El userId debe ser un UUID válido');
    }

    // Validar que la modalidad sea válida
    const modalidadUpper = (modalidad ?? '').toString().toUpperCase();
    if (modalidadUpper !== 'DIURNO' && modalidadUpper !== 'ENCUENTRO') {
      throw new BadRequestException(
        'La modalidad debe ser DIURNO o ENCUENTRO'
      );
    }

    return this.colectivoService.findColectivosByUserIdAndModalidad(
      userId,
      modalidadUpper as 'DIURNO' | 'ENCUENTRO'
    );
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