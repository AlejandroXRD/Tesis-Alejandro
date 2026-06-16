import { Component, OnInit, ChangeDetectorRef, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TareaService, Tarea, EstadoTarea } from '../../services/tarea.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './tareas.component.css',
  templateUrl: './tareas.component.html'
})
export class TareasComponent implements OnInit {
  private tareaService = inject(TareaService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private cd = inject(ChangeDetectorRef);

  loading = false;
  error = '';
  sinTareasAsignadas = false;

  // ── Datos crudos ──
  todasLasTareas = signal<Tarea[]>([]);

  // ── Filtros ──
  estadoFiltro   = signal<string>('');
  profesorFiltro = signal<string>('');

  // ── Estado del modal de subida ──
  showUploadModal = false;
  selectedTareaId: string | null = null;
  selectedFile: File | null = null;
  isDragging = false;
  uploadError = '';
  uploading = false;

  loggedUser = computed(() => this.authService.getUser());

  // Roles que ven TODAS las tareas
  private readonly rolesAdmin = new Set(['ADMIN', 'JEFE_DEPARTAMENTO', 'DECANO_VICEDECANO']);

  // ── Computed ──
  profesoresDisponibles = computed(() => {
    return this.todasLasTareas()
      .map(t => `${t.profesor.userName} ${t.profesor.apellido}`.trim())
      .filter((v, i, a) => v && a.indexOf(v) === i)
      .sort();
  });

  tareas = computed(() => {
    let res = this.todasLasTareas();
    const estado = this.estadoFiltro();
    if (estado) res = res.filter(t => t.estado === estado);
    const profesor = this.profesorFiltro();
    if (profesor) res = res.filter(
      t => `${t.profesor.userName} ${t.profesor.apellido}`.trim() === profesor
    );
    return res;
  });

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.loading = true;
    this.error = '';
    this.sinTareasAsignadas = false;

    const rol = this.getCurrentRol();

    const peticion$ = this.rolesAdmin.has(rol)
      ? this.tareaService.getAllTareas()
      : this.tareaService.getMisTareas();

    peticion$.subscribe({
      next: (data) => {
        this.todasLasTareas.set(data ?? []);
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 403 || err.status === 404) {
          this.todasLasTareas.set([]);
          this.sinTareasAsignadas = true;
        } else {
          console.error('❌ Error:', err);
          this.error = `Error ${err.status}: No se pudieron cargar las tareas`;
        }
        this.cd.detectChanges();
      }
    });
  }

  // ── Filtros ──────────────────────────────────────────────────

  filterByEstado(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.estadoFiltro.set(target.value);
  }

  filterByProfesor(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.profesorFiltro.set(target.value);
  }

  resetFiltros(): void {
    this.estadoFiltro.set('');
    this.profesorFiltro.set('');
  }

  // ── Permisos por rol ──────────────────────────────────────────

  getCurrentRol(): string {
    return String(this.loggedUser()?.rol ?? '').toUpperCase().trim();
  }

  canUploadFiles(): boolean {
    const rol = this.getCurrentRol();
    return rol === 'PROFESOR' || rol === 'PPA';
  }

  canReviewFiles(): boolean {
    return this.rolesAdmin.has(this.getCurrentRol());
  }

  canCreateTarea(): boolean {
    return this.canReviewFiles();
  }

  // ── Modal de subida ───────────────────────────────────────────

  openUploadModal(tareaId: string): void {
    this.selectedTareaId = tareaId;
    this.selectedFile = null;
    this.uploadError = '';
    this.isDragging = false;
    this.showUploadModal = true;
  }

  closeUploadModal(): void {
    this.showUploadModal = false;
    this.selectedTareaId = null;
    this.selectedFile = null;
    this.uploadError = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }

  handleFile(file: File): void {
    const allowedExt = ['.pdf', '.docx', '.xlsx', '.xls'];
    const ext = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');

    if (!allowedExt.includes(ext)) {
      this.uploadError = 'Formato no permitido. Solo .pdf, .docx, .xlsx, .xls';
      this.selectedFile = null;
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      this.uploadError = 'El archivo excede los 20MB';
      this.selectedFile = null;
      return;
    }

    this.uploadError = '';
    this.selectedFile = file;
  }

  uploadFile(): void {
    if (!this.selectedFile || !this.selectedTareaId) return;

    this.uploading = true;
    this.tareaService.uploadArchivo(this.selectedTareaId, this.selectedFile).subscribe({
      next: () => {
        this.uploading = false;
        this.closeUploadModal();
        this.cargarTareas();
      },
      error: (err) => {
        console.error('❌ Error al subir:', err);
        this.uploadError = `Error ${err.status}: ${err.error?.message || 'No se pudo subir'}`;
        this.uploading = false;
        this.cd.detectChanges();
      }
    });
  }

  // ── Descarga ──────────────────────────────────────────────────

  downloadFile(tareaId: string): void {
    this.tareaService.downloadArchivo(tareaId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tarea-${tareaId}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('❌ Error al descargar:', err);
        alert('No se pudo descargar el archivo');
      }
    });
  }

  // ── Cambio de estado ──────────────────────────────────────────

  cambiarEstado(tarea: Tarea, nuevoEstado: EstadoTarea): void {
    this.tareaService.updateEstado(tarea.tareaId, nuevoEstado).subscribe({
      next: () => {
        this.cargarTareas();
      },
      error: (err) => {
        console.error('❌ Error al cambiar estado:', err);
        alert('No se pudo cambiar el estado');
      }
    });
  }

  // ── Utilidades ────────────────────────────────────────────────

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    return !isNaN(d.getTime()) ? d.toLocaleString() : fecha;
  }

  getEstadoClass(estado: string): string {
    return `estado-${estado.toLowerCase()}`;
  }

  public navigateToCrearTarea() {
    this.router.navigate(['/crear-tareas']);
  }
}