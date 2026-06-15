import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ColectivoComponent } from './components/colectivo/colectivo';
import { RegisterComponent } from './pages/register/register.component';
import { CrearTareaComponent } from './components/tarea/crear-tarea.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ReporteComponent } from './components/reporte/reporte';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [PublicGuard] },
  { path: 'colectivos', component: ColectivoComponent, canActivate: [AuthGuard] },
  { path: 'crear-tareas', component: CrearTareaComponent, canActivate: [AuthGuard] },
  { path: 'tareas', component: TareasComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'reporte', component: ReporteComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];
