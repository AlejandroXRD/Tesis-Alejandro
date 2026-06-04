import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="welcome-section">
        <h1>Bienvenido a UniDocs</h1>
        <p class="lead">Sistema de Gestión Documental Integral de la Universidad de Matanzas</p>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📚</div>
            <h3>Colectivos</h3>
            <p>Gestiona grupos de profesores y asignaturas de forma organizada</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">✅</div>
            <h3>Tareas</h3>
            <p>Asigna y monitorea tareas de los colectivos de año</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">👥</div>
            <h3>Usuarios</h3>
            <p>Administra perfiles y roles de usuarios</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Reportes</h3>
            <p>Genera reportes detallados de actividades</p>
          </div>
        </div>

        <div class="cta-section">
          <a href="/login" class="btn-primary">Iniciar Sesión</a>
          <a href="/register" class="btn-secondary">Registrarse</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .welcome-section {
      text-align: center;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .lead {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: 3rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin: 3rem 0;
    }

    .feature-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 2rem;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        border-color: var(--primary-color);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      .feature-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin-bottom: 0.5rem;
        color: var(--text-primary);
      }

      p {
        color: var(--text-secondary);
        font-size: 0.95rem;
      }
    }

    .cta-section {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 3rem;
      flex-wrap: wrap;
    }

    .btn-primary,
    .btn-secondary {
      padding: 0.75rem 2rem;
      border-radius: 6px;
      font-weight: 600;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background-color: var(--primary-color);
      color: white;

      &:hover {
        background-color: var(--primary-dark);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
      }
    }

    .btn-secondary {
      background-color: transparent;
      color: var(--primary-color);
      border: 2px solid var(--primary-color);

      &:hover {
        background-color: var(--primary-color);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
      }
    }

    .copyright-section {
      margin-top: 4rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
      text-align: center;

      p {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin: 0;
      }
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }

      .lead {
        font-size: 1rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent { }
