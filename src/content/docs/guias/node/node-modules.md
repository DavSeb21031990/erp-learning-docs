---
title: 'Node_modules'
description: 'Guia de Node_modules'
---

## Definición
`node_modules` es la carpeta donde `NPM` instala todas las dependencias de tu proyecto.

### Características:

- 📁 Carpeta física en tu proyecto
- 📦 Contiene todas las librerías especificadas en package.json
- 🔄 Se regenera automáticamente con `npm install`
- ⚠️ NO se sube a `git` (está en `.gitignore`)

## Estructura de `node_modules`
```markdown
mi-proyecto/
├── package.json
├── package-lock.json
└── node_modules/
    ├── express/
    │   ├── package.json
    │   ├── lib/
    │   └── node_modules/     ← Dependencias de express
    ├── mongoose/
    │   ├── package.json
    │   └── lib/
    ├── cors/
    └── .bin/                 ← Ejecutables (nodemon, eslint, etc.)
```

### Dependencias anidadas
```markdown
node_modules/
├── express/
│   └── node_modules/
│       ├── accepts/
│       ├── body-parser/
│       └── cookie/
└── mongoose/
    └── node_modules/
        ├── bson/
        └── mongodb/
```

## Comandos especciales
### Gestión básica
```bash
# Crear package.json
npm init                    # Interactivo
npm init -y                # Con valores por defecto

# Instalar dependencias
npm install                 # Instala todo de package.json
npm install express         # Instala y agrega a dependencies
npm install -D nodemon      # Instala como devDependency
npm install -g typescript   # Instalación global

# Actualizar dependencias
npm update                  # Actualiza todas
npm update express          # Actualiza específica
npm outdated               # Ver qué está desactualizado

# Desinstalar
npm uninstall express       # Remueve de dependencies
npm uninstall -D nodemon    # Remueve de devDependencies
```

### Scripts
```bash
# Ejecutar scripts definidos en package.json
npm start                   # Ejecuta "start"
npm test                    # Ejecuta "test"
npm run dev                 # Ejecuta script personalizado
npm run build              # Ejecuta "build"
```