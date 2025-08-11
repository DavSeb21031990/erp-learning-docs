---
title: 'Introducción'
description: 'Introducción a Vue'
---

## Instalación de `Vue CLI`
```bash
npm install -g @vue/cli
```

## Verificar versión
```bash
vue --version
```

## Crear Proyecto Básico
```bash
# Crear proyecto Vue con CLI
vue create hello-world-vue

# Opciones durante la creación:
# ❓ Please pick a preset: → Default ([Vue 3] babel, eslint)

cd hello-world-vue
```

## Probar App desde Local
- Se Accede con el ide de forma remota
- Se levanta la aplicación en el servidor remoto
- Se abre el terminal en la máquina local
- Se ejecuta el siguiente comando
    ```bash
    ssh -L 5173:localhost:5173 usuario@vps
    ```