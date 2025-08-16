---
title: 'Introducción'
description: 'Introducción a Vue'
---

## Probar App desde Local
- Se Accede con el ide de forma remota
- Se levanta la aplicación en el servidor remoto
- Se abre el terminal en la máquina local
- Se ejecuta el siguiente comando
    ```bash
    ssh -L 5173:localhost:5173 usuario@vps
    ```

## Crear Proyecto Básico
```bash
# Crear proyecto Vue con Vite
npm create vue@latest my-app

# Opciones durante la creación:
# ❓ Please pick a preset: → Default ([Vue 3] babel, eslint)

cd hello-world-vue
```

## Verificar versión
```bash
vue --version
```

## Construir aplicación
```bash
vite build
```