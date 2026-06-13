import { Component, OnInit, computed, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);  // ← Agregar esto

  loading = false;
  savingRoleForUserId: string | null = null;
  error = '';
  usuarios: User[] = [];

  loggedUser = computed(() => this.authService.getUser());

  readonly roles: Rol[] = ['ADMIN', 'PPA', 'JEFE_COLECTIVO', 'PROFESOR', 'CLIENTE'];

  ngOnInit(): void {
    console.log('[Usuarios] ngOnInit');
    const canSee = this.canSeeUsuarios();
    console.log('[Usuarios] canSeeUsuarios:', canSee, 'loggedUser:', this.loggedUser());

    if (!canSee) {
      Promise.resolve().then(() => {
        this.router.navigate(['/home']);
      });
      return;
    }

    this.cargarUsuarios();
  }

  private canSeeUsuarios(): boolean {
    const logged = this.loggedUser();

    let rolRaw = '';
    if (logged) {
      if (logged.rol != null) {
        rolRaw = logged.rol;
      } else if ((logged as any).role != null) {
        rolRaw = (logged as any).role;
      } else if ((logged as any).Rol != null) {
        rolRaw = (logged as any).Rol;
      }
    }

    const rol = String(rolRaw).toLowerCase().trim();
    return rol === 'admin' || rol === 'administrador' || rol.includes('admin');
  }

  cargarUsuarios(): void {
    this.loading = true;
    this.error = '';
    this.usuarios = [];

    this.userService
      .getAllUsers()
      .pipe(
        timeout({ first: 15000 }),
        catchError((err) => {
          console.error('getAllUsers error:', err);
          this.error = 'Error al cargar usuarios (revisa consola para detalles)';
          return of([] as User[]);
        }),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();  // ← Forzar detección de cambios
        })
      )
      .subscribe((data) => {
        console.log('👥 Usuarios recibidos:', data);  // ← Debug
        this.usuarios = data ?? [];
        this.cdr.detectChanges();  // ← Forzar detección de cambios
      });
  }

  guardarRol(user: User): void {
    if (!user?.userId) return;

    const nuevoRol = user.rol as Rol;
    this.savingRoleForUserId = user.userId;

    this.userService.updateUserRole(user.userId, nuevoRol).subscribe({
      next: (updated) => {
        this.usuarios = this.usuarios.map((u) => (u.userId === updated.userId ? updated : u));
        this.savingRoleForUserId = null;
        this.cdr.detectChanges();  // ← Forzar detección de cambios
      },
      error: () => {
        this.error = 'Error al actualizar rol';
        this.savingRoleForUserId = null;
        this.cdr.detectChanges();  // ← Forzar detección de cambios
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