---
title: ''
description: ''
---

## Instalación de dependencias
```bash
npm i -D size-limit @size-limit/file
```

## Configuración
```json title="package.json"
{
  "scripts": {
    "build": "vite build",
    "size": "npm run build && npx size-limit"
  },
  "size-limit": [
    { "path": "dist/assets/*.js",  "limit": "200 KB", "brotli": true },
    { "path": "dist/assets/*.css", "limit": "60 KB",  "brotli": true }
  ]
}

```
- Ajusta límites a tu realidad (empieza generoso y ve bajando).
- Si usas CRA, cambia la ruta a build/static/js/*.js