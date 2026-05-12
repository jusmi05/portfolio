# Portfolio — Julen Garcia Sanchez

Portfolio personal desplegado en GitHub Pages.

## Estructura

```
portfolio-julen/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       ├── avatar.jpg              ← Tu foto
│       ├── forest-pioneer-portal.jpg  ← Captura portal empleados
│       ├── forest-pioneer-tienda.jpg  ← Captura tienda WooCommerce
│       ├── shopify-pv.jpg          ← Captura tienda Shopify
│       └── waas-preview.jpg        ← Captura SaaS motor (o placeholder)
└── README.md
```

## Imágenes necesarias

Coloca las siguientes imágenes en `assets/img/` antes de desplegar:

| Archivo | Contenido | Tamaño recomendado |
|---|---|---|
| `avatar.jpg` | Foto tuya (fondo neutro o casual) | 600×800px |
| `forest-pioneer-portal.jpg` | Captura del portal del empleado | 1200×750px |
| `forest-pioneer-tienda.jpg` | Captura de la tienda WooCommerce | 1200×750px |
| `shopify-pv.jpg` | Captura de la tienda Shopify | 1200×750px |
| `waas-preview.jpg` | Captura del SaaS (puede ser parcial o mockup) | 1200×750px |

> Sin las imágenes, el portfolio muestra placeholders con color — funciona igualmente.

## Despliegue en GitHub Pages

1. Sube todo el contenido a un repositorio GitHub (ej: `portfolio` o `julengarcia.github.io`)
2. Ve a **Settings → Pages**
3. En **Source**, selecciona `main` branch y carpeta `/root`
4. GitHub Pages lo desplegará automáticamente en `https://tuusuario.github.io/portfolio`

Si el repo se llama exactamente `tuusuario.github.io`, se desplegará en la raíz: `https://tuusuario.github.io`

## Personalización rápida

### Cambiar colores
En `assets/css/style.css`, busca `:root` al inicio y modifica:
```css
--orange: #fc9003;   /* Color principal de acento */
--lime:   #c8f04d;   /* Color secundario / métricas */
```

### Añadir un proyecto
En `index.html`, copia un bloque `<article class="project-card">` y edita el contenido.

### Activar el formulario de contacto real
En `assets/js/main.js`, función `handleSubmit`, sustituye el `setTimeout` por:
- **Formspree**: `fetch('https://formspree.io/f/YOURCODE', { method: 'POST', body: new FormData(e.target) })`
- **EmailJS**: sigue su documentación en emailjs.com

## Stack técnico del portfolio

- HTML5 semántico
- CSS3 con custom properties
- Vanilla JavaScript (sin frameworks)
- GSAP 3 + ScrollTrigger para animaciones
- Google Fonts (Fraunces + DM Sans + DM Mono)
- Compatible con GitHub Pages sin build steps
