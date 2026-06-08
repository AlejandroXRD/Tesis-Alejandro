import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ColectivoComponent } from './components/colectivo/colectivo';
import { RegisterComponent } from './pages/register/register.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [PublicGuard] },
  { path: 'colectivos', component: ColectivoComponent, canActivate: [AuthGuard] },
  { path: 'tareas', component: TareaComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];
