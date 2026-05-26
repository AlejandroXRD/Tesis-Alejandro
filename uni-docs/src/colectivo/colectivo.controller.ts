import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColectivoService } from './colectivo.service';
import { CreateColectivoDto } from './dto/create-colectivo.dto';
import { UpdateColectivoDto } from './dto/update-colectivo.dto';

@Controller('colectivo')
export class ColectivoController {
  constructor(private readonly colectivoService: ColectivoService) {}

  @Post()
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
  update(@Param('id') id: string, @Body() updateColectivoDto: UpdateColectivoDto) {
    return this.colectivoService.update(id, updateColectivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colectivoService.remove(id);
  }
}
