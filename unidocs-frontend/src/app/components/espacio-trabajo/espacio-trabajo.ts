import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

interface FileDocument {
  id: string;
  name: string;
  uploadedAt: Date;
  uploadedBy: string;
  size: number;
  url: string;
}

@Component({
  selector: 'app-espacio-trabajo',
  standalone: true,
  imports: [CommonModule],
  styleUrl: "./espacio-trabajo.css",
  templateUrl: "./espacio-trabajo.html"
})
export class EspacioTrabajoComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private httpClient = inject(HttpClient);

  @ViewChild('fileInput') fileInput!: ElementRef;

  showModal = false;
  currentSection: 'graficos' | 'modelos' | 'planificacion' | null = null;
  currentFiles: FileDocument[] = [];
  filesCounts: { [key: string]: number } = {
    graficos: 0,
    modelos: 0,
    planificacion: 0
  };

  private userRole: string = '';

  ngOnInit(): void {
    // Validar que el usuario esté autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
      return;
    }

    // Obtener el rol del usuario
    this.userRole = this.authService.getUserRole() || '';

    // Cargar los conteos de archivos
    this.loadFilesCounts();
  }

  /**
   * Carga el conteo de archivos de cada sección
   */
  private loadFilesCounts(): void {
    this.loadFilesCount('graficos');
    this.loadFilesCount('modelos');
    this.loadFilesCount('planificacion');
  }

  /**
   * Carga el conteo de archivos de una sección específica
   */
  private loadFilesCount(section: string): void {
    const folderName = this.getFolderName(section);
    this.httpClient.get<any>(`/api/uploads/${folderName}/count`)
      .subscribe({
        next: (response) => {
          this.filesCounts[section] = response.count || 0;
        },
        error: (error) => {
          console.error(`Error loading file count for ${section}:`, error);
          this.filesCounts[section] = 0;
        }
      });
  }

  /**
   * Abre el modal con los archivos de una sección
   */
  openDocuments(section: 'graficos' | 'modelos' | 'planificacion'): void {
    this.currentSection = section;
    this.showModal = true;
    this.loadFiles(section);
  }

  /**
   * Cierra el modal
   */
  closeModal(): void {
    this.showModal = false;
    this.currentSection = null;
    this.currentFiles = [];
  }

  /**
   * Carga los archivos de una sección
   */
  private loadFiles(section: string): void {
    const folderName = this.getFolderName(section);
    this.httpClient.get<FileDocument[]>(`/api/uploads/${folderName}`)
      .subscribe({
        next: (files) => {
          this.currentFiles = files.map(file => ({
            ...file,
            uploadedAt: new Date(file.uploadedAt)
          }));
        },
        error: (error) => {
          console.error(`Error loading files from ${section}:`, error);
          this.currentFiles = [];
        }
      });
  }

  /**
   * Obtiene el nombre de la carpeta según la sección
   */
  private getFolderName(section: string): string {
    const folderMap: { [key: string]: string } = {
      graficos: 'Uploads Graficos',
      modelos: 'Uploads Modelos',
      planificacion: 'Uploads Planificacion'
    };
    return folderMap[section] || '';
  }

  /**
   * Obtiene el título del modal según la sección
   */
  getModalTitle(): string {
    const titleMap: { [key: string]: string } = {
      graficos: 'Gráficos Docentes',
      modelos: 'Modelos de Trabajo',
      planificacion: 'Planificación'
    };
    return titleMap[this.currentSection || ''] || '';
  }

  /**
   * Verifica si el usuario puede subir archivos (Decano o Vicedecano)
   */
  canUploadFiles(): boolean {
    return this.userRole === 'Decano' || this.userRole === 'Vicedecano';
  }

  /**
   * Verifica si el usuario puede eliminar archivos (Decano o Vicedecano)
   */
  canDeleteFiles(): boolean {
    return this.userRole === 'Decano' || this.userRole === 'Vicedecano';
  }

  /**
   * Activa el input de archivo
   */
  triggerUpload(): void {
    this.fileInput.nativeElement.click();
  }

  /**
   * Maneja la subida de archivos
   */
  uploadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files || files.length === 0) {
      return;
    }

    Array.from(files).forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('uploadedBy', this.authService.getCurrentUser()?.name || 'Unknown');

      const folderName = this.getFolderName(this.currentSection || '');
      
      this.httpClient.post(`/api/uploads/${folderName}`, formData)
        .subscribe({
          next: (response: any) => {
            console.log('File uploaded successfully:', response);
            // Recargar la lista de archivos
            if (this.currentSection) {
              this.loadFiles(this.currentSection);
              this.loadFilesCount(this.currentSection);
            }
          },
          error: (error) => {
            console.error('Error uploading file:', error);
            alert('Error al subir el archivo. Intenta de nuevo.');
          }
        });
    });

    // Limpiar el input
    input.value = '';
  }

  /**
   * Descarga un archivo
   */
  downloadFile(file: FileDocument): void {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Elimina un archivo
   */
  deleteFile(fileId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este archivo?')) {
      this.httpClient.delete(`/api/uploads/${fileId}`)
        .subscribe({
          next: () => {
            console.log('File deleted successfully');
            // Recargar la lista de archivos
            if (this.currentSection) {
              this.loadFiles(this.currentSection);
              this.loadFilesCount(this.currentSection);
            }
          },
          error: (error) => {
            console.error('Error deleting file:', error);
            alert('Error al eliminar el archivo. Intenta de nuevo.');
          }
        });
    }
  }

  /**
   * Obtiene el icono emoji según el tipo de archivo
   */
  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    
    const iconMap: { [key: string]: string } = {
      pdf: '📄',
      doc: '📘',
      docx: '📘',
      xls: '📊',
      xlsx: '📊',
      ppt: '🎯',
      pptx: '🎯',
      zip: '📦',
      rar: '📦',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️',
      gif: '🖼️',
      txt: '📝',
      csv: '📋'
    };

    return iconMap[extension] || '📎';
  }

  /**
   * Formatea la fecha al español
   */
  formatDate(date: Date): string {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return d.toLocaleDateString('es-ES', options);
  }

  /**
   * Navega a una sección
   */
  goToSection(section: string): void {
    this.router.navigate([`/${section}`]);
  }

  /**
   * Vuelve al inicio
   */
  goHome(): void {
    this.router.navigate(['/home']);
  }
}