---
title: "Comandos Esenciales"
description: "Comandos Esenciales"
---

## Comandos Esenciales

```bash title="RUN - Crear y ejecutar contenedor"
docker run -d --name nombre imagen                    # Background
docker run -it --name nombre imagen /bin/bash         # Interactivo
docker run -d -p 8080:80 --name web nginx             # Con puerto
docker run -d -e VAR=valor --name app imagen          # Con variables
```

```bash title="PS - Ver contenedores"
docker ps                                             # Corriendo
docker ps -a                                          # Todos
docker ps --format "table {{.Names}}\t{{.Status}}"    # Formato custom
docker ps -q                                          # Ver solo los ID de los contenedores
docker ps --filter "ancestor=nginx"                   # Ver contenedores de una imagen específica
```

```bash title="LOGS - Ver logs"
docker logs contenedor                                # Ver logs
docker logs -f contenedor                             # Seguir logs
docker logs --tail 20 contenedor                      # Últimas 20 líneas
docker logs -t contenedor                             # Con timestamps
docker logs --since=5m app-logs                       # Ver logs desde hace 5 minutos
```

```bash title="EXEC - Ejecutar en contenedor"
docker exec contenedor comando                        # Comando simple
docker exec -it contenedor /bin/bash                  # Shell interactiva
docker exec -u root contenedor comando                # Como root
```
