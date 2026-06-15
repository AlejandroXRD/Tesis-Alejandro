import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ColectivoModule } from './colectivo/colectivo.module';
import { ReporteModule } from './reporte/reporte.module';
import { TareaModule } from './tarea/tarea.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ColectivoModule,
    UserModule,
    AuthModule,
    ReporteModule,
    TareaModule,
  ],
})
export class AppModule {}
