import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth-guard';

@Controller('tarea')
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTareaDto: CreateTareaDto) {
    return this.tareaService.create(createTareaDto);
  }

  @Get()
  findAll() {
    return this.tareaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tareaService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTareaDto: UpdateTareaDto) {
    return this.tareaService.update(id, updateTareaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.tareaService.remove(id);
  }
}
