---
title: 'Scripts NPM'
description: 'Guia de Scripts NPM para TypeScript'
---

## Agregar scripts a package.json
```json
{
  "name": "aprender-typescript",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",                           // Compilar TypeScript
    "start": "node dist/index.js",            // Ejecutar JS compilado
    "dev": "tsc --watch",                     // Compilar en modo watch
    "dev:run": "ts-node src/index.ts",       // Ejecutar TS directamente
    "clean": "rm -rf dist"                    // Limpiar carpeta dist
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "ts-node": "^10.9.1",                    // Para ejecutar TS directamente
    "typescript": "^5.3.3"
  }
}
```