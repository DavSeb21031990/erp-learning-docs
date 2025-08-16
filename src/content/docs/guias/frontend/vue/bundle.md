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

## Instalación de herramientas de analísis
```bash
npm i -D source-map-explorer
npm i -D terser
npm i -D rollup-plugin-visualizer source-map-explorer
```

### Configuración `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      template: 'treemap',
      filename: 'stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  build: {
    sourcemap: true
  }
})
```

### Construir la aplicación con estadísticas
```bash
vite build --sourcemap
```

## Construir Bundle
```bash
npx source-map-explorer 'dist/assets/index-*.js'
```

## Configuración de script personalizados para analísis
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",

    "analyze": "vite build", 
    "analyze:maps": "vite build --sourcemap && npx source-map-explorer \"dist/assets/*.js\""
  }
}
```