import { Module } from '@nestjs/common';
import { ColectivoService } from './colectivo.service';
import { ColectivoController } from './colectivo.controller';

@Module({
  controllers: [ColectivoController],
  providers: [ColectivoService],
})
export class ColectivoModule {}
