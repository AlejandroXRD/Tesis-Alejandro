# Instrucciones para los logos

Para que el navbar muestre correctamente los logos de la universidad y facultad, necesitas:

## 1. Agregar las imágenes

Coloca las siguientes imágenes en la carpeta `public/assets/`:

- **logo-universidad.png** - Logo de la universidad (recomendado: 50x50px)
- **logo-facultad.png** - Logo de la facultad (recomendado: 50x50px)

## 2. Rutas de las imágenes

Las imágenes se cargan desde:
```
public/assets/logo-universidad.png
public/assets/logo-facultad.png
```

## 3. Tamaños recomendados

- **Ancho**: 50-100px
- **Alto**: 50-100px
- **Formato**: PNG con transparencia (recomendado) o JPG
- **Resolución**: Al menos 150x150px para retina displays (2x)

## 4. Ejemplo de estructura

```
public/
├── assets/
│   ├── logo-universidad.png
│   ├── logo-facultad.png
│   └── ...
└── favicon.ico
```

## 5. Si no tienes las imágenes

Temporalmente, puedes reemplazar en el HTML las imágenes con emojis o texto:

```html
<!-- En navbar.component.html -->
<div class="logos">
  <div class="logo-universidad">🎓</div>
  <div class="logos-divider"></div>
  <div class="logo-facultad">📚</div>
</div>
```

O agregar placeholders SVG.

## 6. Ajustar tamaños en CSS

Si necesitas cambiar los tamaños, edita en `navbar.component.scss`:

```scss
.logo-universidad,
.logo-facultad {
  height: 50px;  // Cambia este valor
  width: auto;
  object-fit: contain;
}
```
