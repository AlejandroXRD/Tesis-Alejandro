import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ColectivoComponent } from './components/colectivo/colectivo';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'colectivos', component: ColectivoComponent },
  { path: '**', redirectTo: 'home' }
];
