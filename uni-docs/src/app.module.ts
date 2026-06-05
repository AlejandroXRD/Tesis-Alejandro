import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColectivoModule } from './colectivo/colectivo.module';
import { AuthModule } from './auth/auth.module';
import { TareaModule } from './tarea/tarea.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [ColectivoModule, AuthModule, TareaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
