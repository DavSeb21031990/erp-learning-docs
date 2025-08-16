---
title: "Instalación y Configuración"
description: "Guia de instalación y configuración"
---

## Instalación de `Docker Engine` y `Docker Compose`

```bash
# Actualizar paquetes
sudo apt update

# Instalar dependencias
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# Agregar clave GPG oficial de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Agregar repositorio
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker Engine
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Instalar Docker Compose (standalone)
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## Configuración Post-Instalación

### Agregar usuario al grupo docker (Linux):

```bash
# Agregar tu usuario al grupo docker
sudo usermod -aG docker $USER

# Cerrar sesión y volver a entrar, o ejecutar:
newgrp docker

# Verificar que funciona sin sudo
docker run hello-world
```

### Iniciar servicios (Linux):

```bash
# Iniciar Docker daemon
sudo systemctl start docker

# Habilitar inicio automático
sudo systemctl enable docker

# Verificar estado
sudo systemctl status docker
```

## Verificar Instalación

### Docker Engine:

```bash
# Verificar versión de Docker
docker --version
# Ejemplo output: Docker version 24.0.5, build ced0996

# Verificar que Docker daemon está corriendo
docker info

# Ejecutar test básico
docker run hello-world
```

### Docker Compose:

```bash
# Verificar versión de Docker Compose
docker-compose --version
# Ejemplo output: Docker Compose version v2.21.0

# O si usas el plugin:
docker compose version
```
