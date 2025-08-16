---
title: "Imagen, Contenedor y Volumen"
description: "Diferencias Image, Container y Volumen"
---

## Image (Imagen)

Es una plantilla o molde para crear `Containers`

**Analogía:** Como un plano de una casa - no puedes vivir en el plano, pero puedes construir muchas casas idénticas con él.

```docker title="Dockerfile"
# Dockerfile crea una IMAGE
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
```

```bash
# Crear imagen
docker build -t mi-app:1.0 .

# Ver imágenes
docker images
# REPOSITORY    TAG       IMAGE ID       CREATED
# mi-app        1.0       abc123def456   2 minutes ago
```

### Características:

- Read-only (no se puede modificar)
- Template para crear containers
- Portable (se puede compartir)
- Versionable (tags como 1.0, 2.0)

## Container (Contenedor)

Es una instancia ejecutándose de una imagen.

**Analogía:** Como una casa construida a partir del plano - aquí es donde realmente "vives" y ejecutas tu aplicación.

```bash
# Crear container desde imagen
docker run -d --name mi-container mi-app:1.0

# Ver containers corriendo
docker ps
# CONTAINER ID   IMAGE      COMMAND        STATUS
# 789xyz123abc   mi-app:1.0 "npm start"    Up 2 minutes
```

### Características:

- Ejecutable (proceso corriendo)
- Mutable (puedes modificar archivos dentro)
- Temporal (se puede parar y borrar)
- Aislado (su propio filesystem, red, procesos)

## Volume (Volumen)

Es un almacenamiento persistente que sobrevive cuando el container se elimina.

**Analogía:** Como un disco duro externo - aunque cambies de computadora (container), tus datos siguen ahí.

```bash
# Crear volume
docker volume create mi-datos

# Usar volume en container
docker run -v mi-datos:/app/data mi-app:1.0

# Ver volumes
docker volume ls
# DRIVER    VOLUME NAME
# local     mi-datos
```

### Características:

- Persistente (datos no se pierden)
- Compartible (múltiples containers pueden usarlo)
- Independiente (existe sin containers)
- Backup-able (se puede respaldar)

## Ejemplo Práctico - Aplicación Web:

```yaml title="docker-compose.yml"
# docker-compose.yml
version: "3.8"
services:
  web:
    image: mi-web-app:latest # ← IMAGE
    container_name: web-container # ← CONTAINER
    volumes:
      - app-data:/app/uploads # ← VOLUME

volumes:
  app-data: # ← VOLUME definido
```

**Lo que sucede:**

- `IMAGE mi-web-app:latest` sirve como plantilla
- Se crea un `CONTAINER` llamado `web-container`
- El `VOLUME app-data` guarda archivos permanentemente

## Casos de Uso Reales:

### Image

```bash
# Descargar imagen de MySQL
docker pull mysql:8.0

# Crear tu propia imagen
docker build -t mi-api:v1.0 .
```

### Container

```bash
# Ejecutar base de datos
docker run --name db-container mysql:8.0

# Ejecutar tu aplicación
docker run --name app-container mi-api:v1.0
```

### Volume

```bash
# Para base de datos (datos persistentes)
docker run -v db-data:/var/lib/mysql mysql:8.0

# Para logs de aplicación
docker run -v app-logs:/app/logs mi-api:v1.0
```

## Ejemplo Completo - Stack Fullstack:

```yaml
version: "3.8"
services:
  # Backend Spring Boot
  backend:
    image: mi-backend:latest # IMAGE
    container_name: backend-app # CONTAINER
    volumes:
      - app-logs:/app/logs # VOLUME para logs

  # Base de datos
  database:
    image: postgres:14 # IMAGE
    container_name: postgres-db # CONTAINER
    volumes:
      - db-data:/var/lib/postgresql/data # VOLUME para datos

  # Frontend Angular
  frontend:
    image: mi-frontend:latest # IMAGE
    container_name: frontend-app # CONTAINER

volumes:
  db-data: # VOLUME persistente para BD
  app-logs: # VOLUME persistente para logs
```
