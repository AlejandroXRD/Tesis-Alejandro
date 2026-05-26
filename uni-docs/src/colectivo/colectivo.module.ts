import { Module } from '@nestjs/common';
import { ColectivoService } from './colectivo.service';
import { ColectivoController } from './colectivo.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ColectivoController],
  providers: [ColectivoService, PrismaService],
})
export class ColectivoModule {}
