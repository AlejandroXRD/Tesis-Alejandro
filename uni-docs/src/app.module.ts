import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColectivoModule } from './colectivo/colectivo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ColectivoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
