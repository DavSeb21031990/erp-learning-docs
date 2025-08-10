---
title: 'Package.json'
description: 'Guia de Package.json'
---

## Definición
`package.json` es el "corazón" de cualquier proyecto `Node.js`. Es un archivo JSON que contiene:
- Metadatos del proyecto
- Lista de dependencias
- Scripts de automatización
- Configuración del proyecto

### Función principal:
- **Manifiesto del proyecto:** Define qué es y cómo funciona
- **Gestor de dependencias:** Especifica qué librerías necesita
- **Centro de comandos:** Define scripts para tareas comunes`

## Estructura del package.json
### Archivo básico
```json
{
  "name": "mi-proyecto-fullstack",
  "version": "1.0.0",
  "description": "Aplicación fullstack con Node.js y Spring Boot",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack --mode production"
  },
  "keywords": ["node", "express", "api", "fullstack"],
  "author": "Tu Nombre <tu.email@ejemplo.com>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "eslint": "^8.55.0"
  },
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```
## Campos Importantes del package.json
### Metadatos básicos
```json
{
  "name": "mi-api-backend",           // Nombre único del proyecto
  "version": "1.2.3",                // Versión semántica
  "description": "API REST para...",  // Descripción breve
  "main": "server.js",               // Punto de entrada principal
  "author": "Tu Nombre",             // Autor del proyecto
  "license": "MIT",                  // Licencia del código
  "keywords": ["api", "rest", "node"] // Palabras clave
}
```

### Scripts
```json
{
  "scripts": {
    "start": "node server.js",                    // Producción
    "dev": "nodemon server.js",                   // Desarrollo
    "test": "jest --coverage",                    // Testing
    "test:watch": "jest --watch",                 // Testing continuo
    "build": "webpack --mode production",         // Build para producción
    "lint": "eslint src/",                       // Linting
    "lint:fix": "eslint src/ --fix",             // Auto-fix
    "db:migrate": "sequelize-cli db:migrate",    // Migraciones DB
    "db:seed": "sequelize-cli db:seed:all",      // Seed de datos
    "docker:build": "docker build -t mi-app .",  // Docker
    "deploy": "npm run build && npm run docker:build"
  }
}
```

### Dependencias
```json
{
  "dependencies": {
    // Librerías necesarias en PRODUCCIÓN
    "express": "^4.18.2",        // Framework web
    "mongoose": "^8.0.3",        // ODM para MongoDB
    "jsonwebtoken": "^9.0.2",    // JWT para auth
    "bcryptjs": "^2.4.3",        // Hashing de passwords
    "cors": "^2.8.5",            // CORS middleware
    "dotenv": "^16.3.1"          // Variables de entorno
  },
  "devDependencies": {
    // Librerías solo para DESARROLLO
    "nodemon": "^3.0.2",         // Auto-restart en desarrollo
    "jest": "^29.7.0",           // Framework de testing
    "supertest": "^6.3.3",       // Testing de APIs
    "eslint": "^8.55.0",         // Linter
    "prettier": "^3.1.0",        // Formateador
    "@types/node": "^20.10.0"    // Types para TypeScript
  }
}
```

### Configuración de entorno
```json
{
  "engines": {
    "node": ">=20.0.0",     // Versión mínima de Node.js
    "npm": ">=10.0.0"       // Versión mínima de NPM
  },
  "os": ["linux", "darwin", "win32"],  // SO soportados
  "cpu": ["x64", "arm64"]               // Arquitecturas soportadas
}
```

## Versionado Semántico en Dependencies
### Símbolos importantes
```json
{
  "dependencies": {
    "express": "4.18.2",      // Versión exacta
    "mongoose": "^8.0.3",     // Compatible (8.x.x)
    "cors": "~2.8.5",         // Patch level (2.8.x)
    "lodash": "*",            // Cualquier versión (NO recomendado)
    "moment": ">=2.29.0",     // Mayor o igual
    "axios": "1.x"            // Rango de versiones
  }
}
```
### Significado:

- `^ (caret):` Actualizaciones compatibles (no rompe API)
- `~ (tilde):` Solo actualizaciones de parches (bug fixes)
- `Exacta:` Solo esa versión específica