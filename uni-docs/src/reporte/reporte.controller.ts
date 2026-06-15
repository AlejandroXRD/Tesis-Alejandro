import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('reporte')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  @Get(':id')
  // @UseGuards(AuthGuard)
  getReport(@Param('id') id: string) {
    return this.reporteService.getReport(id);
  }

}
