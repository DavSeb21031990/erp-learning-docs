---
title: 'Bundle y analísis'
description: 'Guia para generar el bundle y analizarlo'
---

## Bundle
En el desarrollo web moderno, un bundle es un archivo (o conjunto de archivos) que resulta de empaquetar todo tu código fuente (JavaScript, CSS, imágenes, etc.) en un formato optimizado para que el navegador lo cargue.

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

## Instalar herramientas de analísis
```bash
npm install --save-dev source-map-explorer
npm install --save-dev webpack-bundle-analyzer
npm i -D rollup-plugin-visualizer source-map-explorer
```

## Configuración ``vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      template: 'treemap',
      filename: 'stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  build: { sourcemap: true } // para source-map-explorer
})
```

### Construir la aplicación con estadísticas
```bash
npm run build
```

## Construir el Bundle
```bash
npx source-map-explorer 'build/static/js/*.js'
```

## Configuración de script personalizados para analísis
```json title="Angular versión 2-16"
{
    "scripts": {
      "analyze": "vite build",
      "analyze:maps": "vite build --sourcemap && npx source-map-explorer 'dist/assets/*.js'",
    }
}
```