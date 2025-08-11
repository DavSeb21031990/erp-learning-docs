---
title: 'Introducción'
description: 'Introducción a TypeScript'
---

## Definición
TypeScript es JavaScript con tipos. Añade tipado estático opcional a JavaScript.

## TypeScript vs JavaScript
```javascript title="JavaScript"
// JavaScript (sin tipos)
function saludar(nombre) {
  return "Hola " + nombre;
}

saludar("Juan");    // ✅ Funciona
saludar(123);       // ✅ Funciona pero puede causar errores
saludar();          // ✅ Funciona pero nombre será undefined
```

```typescript title="TypeScript"
// TypeScript (con tipos)
function saludar(nombre: string): string {
  return "Hola " + nombre;
}

saludar("Juan");    // ✅ Funciona
saludar(123);       // ❌ Error: Argument of type 'number' is not assignable to type 'string'
saludar();          // ❌ Error: Expected 1 arguments, but got 0
```

## Intalación
### Instalación global
```bash
npm install -g typescript
```

### Instalación local (para proyectos especificos)
```bash
# En un proyecto específico
npm install -D typescript
npm install -D @types/node    # Types para Node.js
```

### Instalar ts-node (para desarrollo)
```bash
npm install -D ts-node
```

## Verificar versión
```bash
tsc --version
```

## Crear Proyecto Básico
```bash
# Crear directorio
mkdir tu_proyecto
cd tu_proyecto

# Inicializar proyecto
npm init -y

# Instalar TypeScript localmente
npm install -D typescript @types/node

# Crear directorio para código
mkdir src
```

### Crear archivo de configuración (tsconfig.json)
```bash
# Generar tsconfig.json automáticamente
npx tsc --init
```
```json title="Configuración Básica"
{
  "compilerOptions": {
    "target": "ES2020",                     // Versión de JS de salida
    "module": "commonjs",                   // Sistema de módulos
    "outDir": "./dist",                     // Carpeta de archivos compilados
    "rootDir": "./src",                     // Carpeta de archivos fuente
    "strict": true,                         // Modo estricto (recomendado)
    "esModuleInterop": true,               // Compatibilidad con módulos ES
    "skipLibCheck": true,                   // Saltar verificación de librerías
    "forceConsistentCasingInFileNames": true, // Nombres de archivos consistentes
    "resolveJsonModule": true,              // Importar archivos JSON
    "declaration": true,                    // Generar archivos .d.ts
    "sourceMap": true                       // Generar source maps para debug
  },
  "include": [
    "src/**/*"                              // Incluir todos los archivos en src/
  ],
  "exclude": [
    "node_modules",                         // Excluir node_modules
    "dist"                                  // Excluir directorio de salida
  ]
}
```

## Compilar y Ejecutar
```bash
# Compilar TypeScript a JavaScript
npm run build

# Ver archivos generados
ls dist/

# Ejecutar JavaScript compilado
npm start

# Desarrollo con watch mode (recompila automáticamente)
npm run dev

# Ejecutar TypeScript directamente (desarrollo)
npm run dev:run
```