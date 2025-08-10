---
title: 'Configuración Servidor'
description: 'Guia para configurar el servidor VPS'
---

## Configuración inicial
- Crear usuario developer
    ```bash
    adduser developer
    usermod -aG sudo developer
    ```
- Cambiar sesion `root` -> `developer`
    ```bash
    su - developer
    ```
- Actualiza y limpia el servidor
    ```bash
    sudo apt update && sudo apt upgrade -y
    sudo apt install -y curl wget git vim
    ```

## Instalar SDKMAN
- Instalar dependencias
```bash
sudo apt update && sudo apt install zip unzip -y
sudo apt install curl tar -y
```
- Instalar SDKMAN
```bash
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk version
```
- Instalar Java 21
```bash
sdk install java 21.0.1-tem
```
- Instalar Java Gradle 8.5
```bash
sdk install gradle 8.5
```

## Crear direcctorios base
```bash
mkdir -p ~/proyectos/aprendizaje
```

## Configurar `Git`
- Instalar `Git`
```bash
sudo apt install git
```
- Configuración Global
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@example.com"
```