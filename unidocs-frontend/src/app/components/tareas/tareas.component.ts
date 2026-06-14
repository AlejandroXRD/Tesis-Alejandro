import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TareaService, Tarea } from '../../services/tarea.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule],
  styleUrl: "./tareas.component.css",
  templateUrl: "./tareas.component.html"
})
export class TareasComponent implements OnInit {
  private tareaService = inject(TareaService);
  private router = inject(Router);
  private authService = inject(AuthService);

  loading = false;
  error = '';
  tareas: Tarea[] = [];

  loggedUser = computed(() => this.authService.getUser());

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.loading = true;
    this.error = '';
    this.tareaService.getAllTareas().subscribe({
      next: (data) => {
        this.tareas = data ?? [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar tareas';
        this.loading = false;
      }
    });
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    // Si viene ISO válido:
    if (!isNaN(d.getTime())) {
      return d.toLocaleString();
    }
    // Si no, lo retornamos tal cual:
    return fecha;
  }

  canCreateTarea(): boolean {
    const rolRaw = this.loggedUser()?.rol ?? '';
    const rol = String(rolRaw).toLowerCase().trim();

    // Admin: cualquier variante que contenga "admin"
    const isAdmin = rol.includes('admin');

    // Jefe de colectivo:
    // - "jefe de colectivo" / "jefe colectivo" (contiene jefe y colectivo)
    // - "jefe_colectivo" (contiene jefe_colectivo o jefe y colectivo)
    const isJefeColectivo =
      (rol.includes('jefe') && rol.includes('colectivo')) ||
      rol.includes('jefe_colectivo');

    return isAdmin || isJefeColectivo;
  }

  public navigateToCrearTarea(){
    this.router.navigate(['/crear-tareas']);
  }
}
