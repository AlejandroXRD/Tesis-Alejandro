import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth-guard';

@Controller('reporte')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getReport(@Param('id') id: string, @Req() req: any) {
    return this.reporteService.getReport(id, req.user);
  }

}
