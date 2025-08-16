---
title: 'Introducción'
description: 'Introducción a React'
---

## Probar App desde Local
- Se Accede con el ide de forma remota
- Se levanta la aplicación en el servidor remoto
- Se abre el terminal en la máquina local
- Se ejecuta el siguiente comando
    ```bash
    ssh -L 5173:localhost:5173 usuario@vps
    ```

## Verificar versión
- Esta libreria se instala al instalar `npm`
```bash
npx create-react-app --version
```

## Crear Proyecto Básico
```bash
# Crear proyecto React con Vite (más rápido)
npm create vite@latest hello-world-react -- --template react

cd hello-world-react
npm install
```

## Construir applicación para ambiente de producción
```bash
npm run build
```