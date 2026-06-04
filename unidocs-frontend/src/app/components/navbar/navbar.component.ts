import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private themeService = inject(ThemeService);
  
  theme = this.themeService.getTheme();
  isDarkMode = computed(() => this.theme() === 'dark');
  isMenuOpen = false;
  isNavbarHidden = signal(false);
  searchQuery = signal('');
  searchResults = signal<any[]>([]);
  isSearching = signal(false);
  private lastScrollY = 0;
  private scrollThreshold = 50;

  // Mock data para documentos e informes
  private mockDocuments = [
    { id: 1, title: 'Informe Académico 2026', type: 'Informe', icon: '📊' },
    { id: 2, title: 'Documento de Políticas', type: 'Documento', icon: '📄' },
    { id: 3, title: 'Informe de Evaluación', type: 'Informe', icon: '📈' },
    { id: 4, title: 'Reglamento Institucional', type: 'Documento', icon: '📋' },
    { id: 5, title: 'Informe de Gestión', type: 'Informe', icon: '📊' },
    { id: 6, title: 'Manual de Procedimientos', type: 'Documento', icon: '📚' },
  ];

  ngOnInit(): void {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  private handleScroll(): void {
    const currentScrollY = window.scrollY;
    
    // Solo ocultar la navbar después de desplazarse más de 50px
    if (currentScrollY > this.scrollThreshold) {
      // Si estamos scrolleando hacia abajo
      if (currentScrollY > this.lastScrollY) {
        this.isNavbarHidden.set(true);
      }
      // Si estamos scrolleando hacia arriba
      else {
        this.isNavbarHidden.set(false);
      }
    } else {
      // Cerca del top, siempre mostrar
      this.isNavbarHidden.set(false);
    }
    
    this.lastScrollY = currentScrollY;
  }

  onSearch(): void {
    const query = this.searchQuery().toLowerCase().trim();
    
    if (query.length === 0) {
      this.searchResults.set([]);
      this.isSearching.set(false);
      return;
    }

    this.isSearching.set(true);

    // Simular búsqueda (en una app real, sería un llamado al backend)
    setTimeout(() => {
      const results = this.mockDocuments.filter(doc =>
        doc.title.toLowerCase().includes(query) ||
        doc.type.toLowerCase().includes(query)
      );
      this.searchResults.set(results);
    }, 300);
  }

  selectResult(result: any): void {
    this.searchQuery.set(result.title);
    this.searchResults.set([]);
    // Aquí podrías navegar a la página del documento
    console.log('Seleccionado:', result);
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.searchResults.set([]);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
