import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

import { catchError, finalize, of, timeout } from 'rxjs';

type Rol = User['rol'];

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = false;
  savingRoleForUserId: string | null = null;
  error = '';

  usuarios: User[] = [];

  loggedUser = computed(() => this.authService.getUser());

  readonly roles: Rol[] = ['ADMIN', 'PPA', 'JEFE_COLECTIVO', 'PROFESOR'];

  ngOnInit(): void {
    if (!this.canSeeUsuarios()) {
      // Si no es admin, evita acceso (aunque el link del navbar no aparezca)
      // Usar microtask para evitar ExpressionChangedAfterItHasBeenCheckedError
      Promise.resolve().then(() => {
        this.router.navigate(['/home']);
      });
      return;
    }

    this.cargarUsuarios();
  }

  private canSeeUsuarios(): boolean {
    const rolRaw = this.loggedUser()?.rol ?? '';
    const rol = String(rolRaw).toLowerCase().trim();
    return rol === 'admin' || rol.includes('admin');
  }

  cargarUsuarios(): void {
    this.loading = true;
    this.error = '';
    this.usuarios = [];

    this.userService
      .getAllUsers()
      .pipe(
        timeout({ first: 15000 }),
        catchError(() => {
          this.error = 'Error al cargar usuarios (tiempo agotado o fallo del servidor)';
          return of([] as User[]);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((data) => {
        this.usuarios = data ?? [];
      });
  }

  guardarRol(user: User): void {
    if (!user?.userId) return;

    const nuevoRol = user.rol as Rol;

    this.savingRoleForUserId = user.userId;

    this.userService.updateUserRole(user.userId, nuevoRol).subscribe({
      next: (updated) => {
        // Actualizar la fila local con lo que devuelve backend
        this.usuarios = this.usuarios.map((u) => (u.userId === updated.userId ? updated : u));
        this.savingRoleForUserId = null;
      },
      error: () => {
        // Mantener selección del select; solo mostramos error UX mínima
        this.error = 'Error al actualizar rol';
        this.savingRoleForUserId = null;
      }
    });
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    if (!isNaN(d.getTime())) return d.toLocaleString();
    return fecha;
  }
}
