---
title: 'Bundle y analísis'
description: 'Guia para generar el bundle y analizarlo'
---

## Bundle
En el desarrollo web moderno, un bundle es un archivo (o conjunto de archivos) que resulta de empaquetar todo tu código fuente (JavaScript, CSS, imágenes, etc.) en un formato optimizado para que el navegador lo cargue.

### Ejemplo:

- Tú tienes decenas o cientos de archivos: App.vue, main.ts, componentes, librerías, imágenes…
- El bundler (Webpack, Vite/Rollup, esbuild…) los toma, los resuelve (import/export), y genera archivos finales como:

```
dist/
  index.html
  assets/
    index-3sdFgH.js
    vendor-6KjkPq.js
    style-abcd.css
```

### 📦 ¿Para qué se usa?

- Agrupar código disperso
    - Pasas de miles de pequeños módulos a unos pocos archivos fáciles de servir.

- Optimizar la carga
    - Minificación (eliminar espacios/comentarios).
    - Tree-shaking (quitar código no usado).
    - Compresión (gzip/brotli).
    - Code-splitting (partir bundles grandes y cargarlos bajo demanda).

- Compatibilidad
    - Transpilar código moderno (ES2020, TypeScript, Vue/React JSX) a JS que entiende cualquier navegador.
    - Incluir polyfills si hace falta.

- Caché en navegador
    - Los bundles llevan hash en el nombre (main-XYZ.js), para que el navegador los cachee y solo descargue uno nuevo si cambió.

- Seguridad y consistencia
    - Todos los assets están controlados y no hay riesgo de que falte un archivo en producción.

## Lighthouse
Genera un reporte HTML interactivo con métricas como:

**Performance:**
- Tiempo hasta el primer render (First Contentful Paint, FCP).
- Velocidad de carga, interactividad (TTI, TBT).
- Tamaño de recursos y optimización.

**Accesibilidad:**
- Uso correcto de etiquetas ARIA.
- Contraste de colores.
- Navegación con teclado.

**Best Practices:**
- Uso de HTTPS.
- Seguridad (XSS, CSP).
- Errores de JS en consola.

**SEO:**
- Meta etiquetas.
- Mobile friendly.
- Indexabilidad.

**PWA (si aplica):**
- Service worker.
- App manifest.
- Experiencia offline.

## Instalación de herramientas de analísis
```bash
npm install --save-dev webpack-bundle-analyzer
npm install --save-dev lighthouse
```

```bash title="Angular versión 17+"
npm install --save-dev source-map-explorer
```

### Construir la aplicación con estadísticas
```bash title="Angular versión 2-15"
ng build --stats-json --prod
```
```bash title="Angular versión 17+"
ng build --configuration production --source-map
```

## Construir Bundle
```bash title="Angular versión 2-15"
npx webpack-bundle-analyzer dist/stats.json
```

```bash title="Angular versión 17+"
npx source-map-explorer 'dist/hello-world-angular/browser/*.js'
```

## Configuración de script personalizados para analísis
```json title="Angular versión 2-16"
{
    "scripts": {
    "analyze": "ng build --stats-json && npx webpack-bundle-analyzer dist/stats.json",
    "analyze:react": "npm run build && npx source-map-explorer 'build/static/js/*.js'",
    "lighthouse": "lighthouse http://localhost:4200 --output html --output-path ./lighthouse-report.html"
    }
}
```

```json title="Angular versión 17+"
{
  "scripts": {
    "build:prod": "ng build --configuration production --source-map",
    "analyze": "npm run build:prod && npx source-map-explorer 'dist/hello-world-angular/browser/*.js'",
    "preview:dist": "npx http-server dist/hello-world-angular/browser -p 4173 -c-1",
    "lighthouse": "lighthouse http://localhost:4173 --output html --output-path ./lighthouse-report.html"
  },
  "devDependencies": {
    "source-map-explorer": "^2.5.3",
    "http-server": "^14.1.1"
  }
}
```