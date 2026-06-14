import { Component, OnInit, computed, inject, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { catchError, finalize, of, timeout } from 'rxjs';

type Rol = User['rol'];

interface Toast {
  id: string;
  mensaje: string;
  tipo: 'success' | 'error';
}

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
  private cdr = inject(ChangeDetectorRef);

  // Estados reactivos con signals
  loading = signal<boolean>(false);
  error = signal<string>('');
  usuarios = signal<User[]>([]);
  savingRoleForUserId = signal<string | null>(null);
  deletingUserId = signal<string | null>(null);
  toasts = signal<Toast[]>([]);

  // Modal de edición
  editingUser = signal<User | null>(null);
  editForm = signal<{ userName: string; apellido: string }>({ userName: '', apellido: '' });
  savingEdit = signal<boolean>(false);

  loggedUser = computed(() => this.authService.getUser());

  readonly roles: Rol[] = ['ADMIN', 'PPA', 'JEFE_COLECTIVO', 'PROFESOR', 'CLIENTE'];

  ngOnInit(): void {
    const canSee = this.canSeeUsuarios();

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
    this.loading.set(true);
    this.error.set('');
    this.usuarios.set([]);

    this.userService
      .getAllUsers()
      .pipe(
        timeout({ first: 15000 }),
        catchError((err) => {
          console.error('Error al cargar usuarios:', err);
          this.error.set('Error al cargar usuarios. Intenta nuevamente.');
          return of([] as User[]);
        }),
        finalize(() => {
          this.loading.set(false);
          this.cdr.detectChanges();
        })
      )
      .subscribe((data) => {
        this.usuarios.set(data ?? []);
        this.cdr.detectChanges();
      });
  }

  guardarRol(user: User): void {
    if (!user?.userId) return;

    const nuevoRol = user.rol as Rol;
    this.savingRoleForUserId.set(user.userId);

    this.userService.updateUserRole(user.userId, nuevoRol).subscribe({
      next: (updated) => {
        this.usuarios.update(lista =>
          lista.map(u => u.userId === updated.userId ? updated : u)
        );
        this.agregarToast(
          `Rol de ${user.userName} actualizado a ${nuevoRol}`,
          'success'
        );
        this.savingRoleForUserId.set(null);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al actualizar rol:', err);
        this.agregarToast('Error al actualizar el rol. Intenta nuevamente.', 'error');
        this.savingRoleForUserId.set(null);
        this.cdr.detectChanges();
      }
    });
  }

  eliminarUsuario(user: User): void {
    if (!user?.userId) return;

    if (!confirm(`¿Estás seguro de que deseas eliminar a ${user.userName}? Esta acción no se puede deshacer.`)) {
      return;
    }

    this.deletingUserId.set(user.userId);

    this.userService.deleteUser(user.userId).subscribe({
      next: () => {
        this.usuarios.update(lista =>
          lista.filter(u => u.userId !== user.userId)
        );
        this.agregarToast(
          `Usuario ${user.userName} eliminado correctamente`,
          'success'
        );
        this.deletingUserId.set(null);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
        this.agregarToast('Error al eliminar el usuario. Intenta nuevamente.', 'error');
        this.deletingUserId.set(null);
        this.cdr.detectChanges();
      }
    });
  }

  // ── Modal de edición ──────────────────────────────────────────

  abrirModal(user: User): void {
    this.editingUser.set({ ...user });
    this.editForm.set({ userName: user.userName, apellido: user.apellido });
  }

  cerrarModal(): void {
    if (this.savingEdit()) return;
    this.editingUser.set(null);
    this.editForm.set({ userName: '', apellido: '' });
  }

  guardarEdicion(): void {
    const user = this.editingUser();
    if (!user?.userId) return;

    const { userName, apellido } = this.editForm();
    if (!userName.trim() || !apellido.trim()) {
      this.agregarToast('El nombre y apellido no pueden estar vacíos.', 'error');
      return;
    }

    this.savingEdit.set(true);

    this.userService.updateUser(user.userId, { userName: userName.trim(), apellido: apellido.trim() }).subscribe({
      next: (updated) => {
        this.usuarios.update(lista =>
          lista.map(u => u.userId === updated.userId ? updated : u)
        );
        this.agregarToast(`Usuario ${updated.userName} actualizado correctamente`, 'success');
        this.savingEdit.set(false);
        this.cerrarModal();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        this.agregarToast('Error al actualizar el usuario. Intenta nuevamente.', 'error');
        this.savingEdit.set(false);
        this.cdr.detectChanges();
      }
    });
  }

  onModalBackdrop(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.cerrarModal();
    }
  }

  // ── Toasts ────────────────────────────────────────────────────

  private agregarToast(mensaje: string, tipo: 'success' | 'error'): void {
    const id = Date.now().toString();
    const toast: Toast = { id, mensaje, tipo };

    this.toasts.update(lista => [...lista, toast]);

    setTimeout(() => {
      this.removerToast(id);
    }, 4000);
  }

  removerToast(id: string): void {
    this.toasts.update(lista => lista.filter(t => t.id !== id));
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    if (!isNaN(d.getTime())) return d.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    return fecha;
  }
}