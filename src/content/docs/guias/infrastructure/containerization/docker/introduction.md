---
title: "Docker"
description: "Introducción a Docker"
---

## ¿Qué problema resuelve Docker?

### El Problema Principal: "En mi máquina funciona"

Imagínate esta situación común:

```bash
# Desarrollador A:
$ node --version
v16.14.0
$ npm start
✅ Aplicación funcionando perfectamente

# Desarrollador B (misma aplicación):
$ node --version
v18.12.0
$ npm start
❌ Error: módulo incompatible
```

### Problemas Específicos que Resuelve Docker:

**Inconsistencia de Entornos**

```bash title="Problema"
# Desarrollo (tu máquina)
- Java 17
- Maven 3.8
- PostgreSQL 14
- Redis 6.2
✅ Todo funciona

# Producción (servidor)
- Java 11
- Maven 3.6
- PostgreSQL 12
- Redis 5.0
❌ Fallos inesperados
```

```docker title="Solución con Docker
# Dockerfile - MISMO entorno en todas partes
FROM openjdk:17-jdk-slim

WORKDIR /app
COPY target/myapp.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

**Dependencias Conflictivas**

```bash title="Problema"
# Proyecto A necesita Python 3.8
# Proyecto B necesita Python 3.10
# ❌ No puedes tener ambas versiones fácilmente

# Aplicación A necesita MySQL 5.7
# Aplicación B necesita MySQL 8.0
# ❌ Conflicto en el mismo sistema
```

```yaml title="Solución con Docker"
# docker-compose.yml
version: "3.8"
services:
  app-a:
    image: python:3.8
    volumes:
      - ./app-a:/code

  app-b:
    image: python:3.10
    volumes:
      - ./app-b:/code

  mysql-5:
    image: mysql:5.7

  mysql-8:
    image: mysql:8.0
```

**Configuración Compleja de Entorno**

```bash title="Sin Docker"
# Para configurar un proyecto nuevo, cada desarrollador debe:
1. Instalar Java 17
2. Instalar Maven
3. Instalar PostgreSQL
4. Configurar base de datos
5. Instalar Redis
6. Configurar variables de entorno
7. Instalar Node.js
8. Instalar dependencias...
# ⏱️ Puede tomar HORAS o DÍAS
```

```bash title="Con Docker"
# Para cualquier desarrollador nuevo:
git clone proyecto
docker-compose up
# ⏱️ Listo en MINUTOS
```

## Problemas Reales en Desarrollo Fullstack:

### Escenario 1: Backend + Frontend + Base de Datos

```bash title="Problema tradicional"
# Backend Spring Boot
- Necesita Java 17
- Necesita PostgreSQL corriendo
- Variables de entorno específicas

# Frontend Angular
- Necesita Node.js 18
- Dependencias npm específicas

# Base de datos
- PostgreSQL debe estar instalado localmente
- Configuración de usuarios y permisos
```

```yaml title="Solución con Docker"
# docker-compose.yml
version: "3.8"
services:
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=jdbc:postgresql://db:5432/myapp
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "4200:4200"

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
# Un solo comando para levantar TODO:
docker-compose up
```

### Escenario 2: Microservicios

```bash title="Sin Docker"
# Servicio A: Puerto 8081, Java 11, MySQL
# Servicio B: Puerto 8082, Java 17, MongoDB
# Servicio C: Puerto 8083, Python 3.9, Redis
# API Gateway: Puerto 8080, Node.js 16

# Cada desarrollador debe instalar y configurar TODO esto
```

```yaml title="Con Docker"
services:
  service-a:
    build: ./service-a
    ports: ["8081:8080"]

  service-b:
    build: ./service-b
    ports: ["8082:8080"]

  service-c:
    build: ./service-c
    ports: ["8083:8080"]

  gateway:
    build: ./gateway
    ports: ["8080:8080"]"
```

## Beneficios Específicos para tu Stack Tecnológico:

### Para Java/Spring Boot:

```docker
FROM openjdk:17-jdk-slim

# Siempre tendrás Java 17, sin importar qué versión tenga el sistema
WORKDIR /app
COPY target/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

### Para Angular/React:

```docker
# Multi-stage build
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

### Para Python:

```docker
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["python", "app.py"]
```

## Casos de Uso Prácticos:

### Desarrollo Local Consistente

```bash
# Cualquier desarrollador en el equipo:
git clone mi-proyecto
docker-compose up
# Mismo entorno, sin configuración manual
```

### Testing en CI/CD

```yaml
# GitHub Actions
- name: Test with Docker
  run: |
    docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

### Deployment Simplificado

```bash
# En cualquier servidor:
docker pull mi-app:latest
docker run -p 8080:8080 mi-app:latest
# Sin instalar dependencias en el servidor
```

### Rollback Rápido

```bash
# Si hay problemas con nueva versión:
docker stop mi-app-new
docker start mi-app-old
# Rollback instantáneo
```
