# Configuración Angular ↔ NestJS

## 🚀 Configuración completada

### 1. **Proxy de desarrollo** (`proxy.conf.json`)
Redirige todas las peticiones `/api/*` al backend en `http://localhost:3000`

### 2. **Variables de entorno**
- `src/environments/environment.development.ts` - Desarrollo
- `src/environments/environment.ts` - Producción

### 3. **Servicios HTTP**

#### **ApiService** (base)
```typescript
import { ApiService } from '@app/services';

constructor(private api: ApiService) {}

// GET
this.api.get<MyType>('/endpoint').subscribe(data => {});

// POST
this.api.post<MyType>('/endpoint', payload).subscribe(data => {});

// PUT
this.api.put<MyType>('/endpoint/id', payload).subscribe(data => {});

// DELETE
this.api.delete<void>('/endpoint/id').subscribe(() => {});
```

#### **AuthService**
```typescript
import { AuthService } from '@app/services';

constructor(private auth: AuthService) {}

// Login
this.auth.login({ userName: 'user', password: 'pass' }).subscribe(response => {
  this.auth.setToken(response.access_token);
});

// Logout
this.auth.logout();

// Check if logged in
if (this.auth.isLoggedIn()) {
  // ...
}
```

#### **ColectivoService**
```typescript
import { ColectivoService } from '@app/services';

constructor(private colectivo: ColectivoService) {}

// Get all
this.colectivo.getAllColectivos().subscribe(data => {});

// Get by ID
this.colectivo.getColectivoById('id').subscribe(data => {});

// Create
this.colectivo.createColectivo({
  nombreColectivo: 'Mi Colectivo',
  year: 2025,
  modalidad: 'DIURNO'
}).subscribe(data => {});

// Update
this.colectivo.updateColectivo('id', { nombreColectivo: 'Nuevo nombre' }).subscribe(data => {});

// Delete
this.colectivo.deleteColectivo('id').subscribe(() => {});
```

## 🔑 Próximos pasos

### 1. **Agregar Interceptor de autenticación**
Para agregar automáticamente el token JWT a todas las peticiones.

### 2. **Crear Guard de rutas**
Para proteger rutas que requieren autenticación.

### 3. **Agregar manejo de errores**
Interceptor para manejar errores HTTP globalmente.

### 4. **CORS en NestJS**
Si es necesario, configurar CORS en el backend:
```typescript
// main.ts
app.enableCors({
  origin: 'http://localhost:4200',
  credentials: true
});
```

## 🏃 Para empezar

1. **Inicia el backend NestJS:**
```bash
cd uni-docs
npm run start:dev
```

2. **Inicia el frontend Angular:**
```bash
cd unidocs-frontend
npm start
```

3. **Frontend estará en:** http://localhost:4200
4. **Backend estará en:** http://localhost:3000

## 📝 Estructura de carpetas

```
src/
├── app/
│   ├── services/
│   │   ├── api.service.ts (servicio base)
│   │   ├── auth.service.ts
│   │   ├── colectivo.service.ts
│   │   └── index.ts (exporta todos)
│   ├── app.config.ts (proveedor HttpClient)
│   └── ...
├── environments/
│   ├── environment.development.ts
│   └── environment.ts
└── ...
```

¡Listo! Tu frontend y backend están conectados. 🎉
