import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ColectivoService } from './colectivo.service';
import { CreateColectivoDto } from './dto/create-colectivo.dto';
import { UpdateColectivoDto } from './dto/update-colectivo.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth-guard';

@Controller('colectivo')
export class ColectivoController {
  constructor(private readonly colectivoService: ColectivoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createColectivoDto: CreateColectivoDto) {
    return this.colectivoService.create(createColectivoDto);
  }

  @Get()
  findAll() {
    return this.colectivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colectivoService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateColectivoDto: UpdateColectivoDto) {
    return this.colectivoService.update(id, updateColectivoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.colectivoService.remove(id);
  }
}
