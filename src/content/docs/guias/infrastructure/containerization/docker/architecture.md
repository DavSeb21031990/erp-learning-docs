---
title: "Docker Architecture y Componentes"
description: "Introducción de Docker Architecture y Componentes"
---

## Arquitectura General

![Arquitectura](data:image/png;base64,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)

## Componentes Principales:

### Docker Client

Es la interfaz de línea de comandos (CLI) que usas.

```bash
# Ejemplos de comandos del client:
docker run nginx
docker build -t mi-app .
docker ps
docker stop mi-container
```

**Función:** Envía comandos al Docker Daemon.

### Docker Daemon (dockerd)

Es el "motor" de Docker que corre en background.

```bash
# Ver si el daemon está corriendo:
docker version
```

**Funciones:**

- Gestiona containers, images, networks, volumes
- Ejecuta comandos del Docker Client
- Se comunica con Docker Registry

### Docker Registry

Es un almacén de imágenes Docker.

**Tipos:**

- **Docker Hub (público):** docker pull nginx
- **Registry privado:** Para empresas
- **Local registry:** Para desarrollo

```bash
# Descargar imagen desde registry
docker pull mysql:8.0

# Subir imagen a registry
docker push mi-empresa/mi-app:v1.0
```

### Docker Objects

**Images**

```bash
# Ver imágenes locales
docker images

# Crear imagen
docker build -t mi-app .
```

**Containers**

```bash
# Ver containers corriendo
docker ps

# Crear y ejecutar container
docker run -d --name web nginx
```

**Networks**

```bash
# Ver networks
docker network ls

# Crear network personalizada
docker network create mi-red
```

**Volumes**

```bash
# Ver volumes
docker volume ls

# Crear volume
docker volume create mi-datos
```

## Flujo de trabajo

```
1. Cliente ejecuta: docker run nginx
         ↓
2. Daemon verifica si image 'nginx' existe localmente
         ↓
3. Si no existe, la descarga desde Docker Hub
         ↓
4. Daemon crea y ejecuta container desde la image
         ↓
5. Container corre la aplicación nginx
```

## Ejemplo práctico

```bash
# 1. CLIENT envía comando
docker run -d -p 8080:80 --name mi-web nginx

# 2. DAEMON ejecuta:
# - Busca image 'nginx' localmente
# - Si no existe, la descarga de REGISTRY (Docker Hub)
# - Crea CONTAINER llamado 'mi-web'
# - Mapea puerto 8080 del host al 80 del container
# - Ejecuta nginx en el container

# 3. Resultado: nginx corriendo en http://localhost:8080
```

## Arquitectura en el Sistema

```
┌─────────────────────────────────────────────┐
│           HOST OPERATING SYSTEM             │
├─────────────────────────────────────────────┤
│              DOCKER DAEMON                  │
├─────────────────────────────────────────────┤
│  Container 1  │  Container 2  │ Container 3 │
│   (nginx)     │   (mysql)     │  (node app) │
│               │               │             │
│  Image: nginx │ Image: mysql  │ Image: node │
└─────────────────────────────────────────────┘
```

## Comandos por Componente:

### Images

```bash
docker images          # Listar
docker build -t name .  # Crear
docker rmi image-id     # Eliminar
```

### Containers

```bash
docker ps              # Listar (corriendo)
docker ps -a           # Listar (todos)
docker run image       # Crear y ejecutar
docker stop container  # Parar
docker rm container    # Eliminar
```

### Volumes

```bash
docker volume ls       # Listar
docker volume create   # Crear
docker volume rm       # Eliminar
```

### Networks

```bash
docker network ls      # Listar
docker network create # Crear
docker network rm      # Eliminar
```
