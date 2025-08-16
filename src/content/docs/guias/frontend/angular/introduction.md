---
title: 'Introducción'
description: 'Introducción a Angular'
---

## Probar App desde Local
- Se Accede con el ide de forma remota
- Se levanta la aplicación en el servidor remoto
- Se abre el terminal en la máquina local
- Se ejecuta el siguiente comando
    ```bash
    ssh -L 4200:localhost:4200 usuario@vps
    ```

## Instalación `Angular CLI`
```bash
npm install -g @angular/cli
```

## Verificar versión
```bash
ng --version
```

## Crear Proyecto Básico
```bash
# Crear proyecto Angular
ng new hello-world-angular --routing=false --style=css --skip-git

# Opciones seleccionadas:
# ❓ Would you like to add Angular routing? → No
# ❓ Which stylesheet format would you like to use? → CSS

cd hello-world-angular
```

## Iniciar la aplicación
```bash
ng serve
```

## Construir la aplicación para ambiente de producción
```bash
ng build
```