import { Component, OnInit, ChangeDetectorRef, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TareaService, Tarea } from '../../services/tarea.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule],
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
  tareas: Tarea[] = [];

  // Estado del modal de subida
  showUploadModal = false;
  selectedTareaId: string | null = null;
  selectedFile: File | null = null;
  isDragging = false;
  uploadError = '';
  uploading = false;

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
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('❌ Error:', err);
        this.error = `Error ${err.status}: No se pudieron cargar las tareas`;
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  // 🆕 PERMISOS POR ROL
  getCurrentRol(): string {
    return String(this.loggedUser()?.rol ?? '').toUpperCase().trim();
  }

  /** PROFESOR y PPA pueden subir archivos */
  canUploadFiles(): boolean {
    const rol = this.getCurrentRol();
    return rol === 'PROFESOR' || rol === 'PPA';
  }

  /** ADMIN, JEFE_DEPARTAMENTO, DECANO_VICEDECANO pueden revisar y descargar */
  canReviewFiles(): boolean {
    const rol = this.getCurrentRol();
    return ['ADMIN', 'JEFE_DEPARTAMENTO', 'DECANO_VICEDECANO'].includes(rol);
  }

  canCreateTarea(): boolean {
    return this.canReviewFiles();
  }

  // 🆕 DRAG & DROP + CLICK
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

  // 🆕 DESCARGA
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

  // 🆕 CAMBIO DE ESTADO
  cambiarEstado(tarea: Tarea, nuevoEstado: 'EN_REVISION' | 'COMPLETADA' | 'RECHAZADA'): void {
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
