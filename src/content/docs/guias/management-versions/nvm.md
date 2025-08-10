---
title: 'NVM (Node Version Manager)'
description: 'Guia de NVM (Node Version Manager)'
---

`NVM` es un administrador de versiones de `Node.js` que te permite:

- Instalar múltiples versiones de `Node.js` en una sola máquina
- Cambiar entre versiones fácilmente
- Usar diferentes versiones para diferentes proyectos
- Probar aplicaciones con distintas versiones de `Node.js`

## Importancia de NVM
Problemas que resuelve:

- **Compatibilidad:** Diferentes proyectos requieren diferentes versiones
- **Testing:** Probar tu código en múltiples versiones
- **Transiciones:** Migrar gradualmente entre versiones
- **Colaboración:** Sincronizar versiones con tu equipo

## Intalación
```bash
# Descargar e instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# O con wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recargar el shell
source ~/.bashrc
# o
source ~/.zshrc
```

## Verificar versión
```bash
nvm --version
# Debería mostrar: 0.39.0 (o la versión instalada)
```

## Comandos Básicos de NVM
### Ver versiones disponibles
```bash
# Listar versiones remotas disponibles
nvm ls-remote

# Listar solo versiones LTS
nvm ls-remote --lts

# Ver últimas 10 versiones
nvm ls-remote | tail -10
```

### Instalar versiones de Node.js
```bash
# Instalar versión específica
nvm install 18.19.0
nvm install 20.11.0
nvm install 22.0.0

# Instalar última versión estable
nvm install stable

# Instalar última LTS
nvm install --lts

# Instalar y usar inmediatamente
nvm install 20.11.0 --latest-npm
```

### Ver versiones instaladas
```bash
# Listar versiones instaladas localmente
nvm ls

# Ejemplo de salida:
#     v18.19.0
# ->  v20.11.0  (currently using 64-bit executable)
#     v22.0.0
#     default -> 20.11.0
#     node -> stable (-> v22.0.0) (default)
```

### Cambiar entre versiones
```bash
# Usar versión específica
nvm use 18.19.0

# Usar última LTS
nvm use --lts

# Usar versión más reciente
nvm use node

# Usar versión por defecto
nvm use default
```

### Configurar versión por defecto
```bash
# Establecer versión por defecto
nvm alias default 20.11.0

# Verificar
nvm ls
# -> default -> 20.11.0
```

## Comandos Avanzados
### Gestión de versiones
```bash
# Desinstalar versión
nvm uninstall 18.19.0

# Ver versión actual
nvm current

# Ver directorio de instalación actual
nvm which current

# Ejecutar comando con versión específica
nvm exec 18.19.0 node --version

# Ejecutar script con versión específica
nvm exec 18.19.0 npm test
```

### Aliases útiles
```bash
# Crear alias personalizado
nvm alias proyecto-antiguo 18.19.0
nvm alias proyecto-nuevo 22.0.0

# Usar alias
nvm use proyecto-antiguo

# Ver aliases
nvm alias

# Eliminar alias
nvm unalias proyecto-antiguo
```

## Archivo .nvmrc
Puedes especificar la versión de `Node.js` para un proyecto usando un archivo `.nvmrc`:

### Crear .nvmrc
```bash
# En la raíz de tu proyecto
echo "20.11.0" > .nvmrc

# O para LTS
echo "lts/*" > .nvmrc

# O para la más reciente
echo "node" > .nvmrc
```

### Usar .nvmrc
```bash
# Cambiar a la versión especificada en .nvmrc
nvm use

# Instalar si no existe
nvm install

# Verificar
cat .nvmrc
node --version
```

## Ejemplo Práctico de Uso
### Escenario: Múltiples proyectos
```bash
# Proyecto 1: Aplicación legacy
cd proyecto-legacy
echo "16.20.0" > .nvmrc
nvm use
npm install
npm start

# Proyecto 2: Aplicación moderna
cd ../proyecto-moderno
echo "22.0.0" > .nvmrc
nvm use
npm install
npm run dev

# Proyecto 3: Para aprender
cd ../proyecto-experimental
echo "node" > .nvmrc  # Siempre la más reciente
nvm use
```

### Integración con Proyectos
```json title="Package.json"
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "engines": {
    "node": ">=20.11.0",
    "npm": ">=10.0.0"
  },
  "scripts": {
    "prestart": "node --version",
    "start": "node server.js"
  }
}
```

```bash title="Script de automátización"
#!/bin/bash
# deploy.sh

echo "🚀 Configurando entorno de desarrollo"

# Verificar si existe .nvmrc
if [ -f ".nvmrc" ]; then
    echo "📦 Usando versión de Node.js especificada en .nvmrc"
    nvm use
else
    echo "⚠️  No se encontró .nvmrc, usando versión por defecto"
    nvm use default
fi

# Verificar versión
echo "✅ Versión de Node.js: $(node --version)"
echo "✅ Versión de NPM: $(npm --version)"

# Instalar dependencias
npm install

# Ejecutar aplicación
npm start
```

## Mejores Prácticas
### Estructura recomendada
```bash
# Versiones a mantener
nvm install --lts        # Para producción
nvm install stable       # Para desarrollo
nvm install node         # Para experimentar

# Configurar por defecto la LTS
nvm alias default lts/*
```

### Para equipos de desarrollo
```bash
# Crear .nvmrc en cada proyecto
echo "lts/*" > .nvmrc

# Documentar en README.md
# ## Requisitos
# - Node.js (ver .nvmrc)
# - Ejecutar: `nvm use` antes de trabajar
```

### Automatización con shell
```bash
# Agregar a ~/.bashrc o ~/.zshrc
cdnvm() {
    cd "$@";
    nvm_path=$(nvm_find_up .nvmrc | tr -d '\n')
    
    if [[ ! $nvm_path = *[^[:space:]]* ]]; then
        declare default_version;
        default_version=$(nvm version default);
        
        if [[ $default_version == "N/A" ]]; then
            nvm install --lts;
        else
            nvm use default;
        fi
    else
        declare nvm_version
        nvm_version=$(<"$nvm_path/.nvmrc")
        
        declare locally_resolved_nvm_version
        locally_resolved_nvm_version=$(nvm ls --no-colors "$nvm_version" | tail -1 | tr -d '\-> ' | tr -d '[:space:]')
        
        if [[ "$locally_resolved_nvm_version" == "N/A" ]]; then
            nvm install "$nvm_version";
        else
            nvm use "$nvm_version";
        fi
    fi
}
alias cd='cdnvm'
```

## Troubleshooting Común
### Problemas y soluciones
```bash
# NVM comando no encontrado
source ~/.bashrc

# Permisos de npm
nvm use system
nvm use node

# Limpiar caché de npm
npm cache clean --force

# Reinstalar npm en versión específica
nvm install-latest-npm

# Ver configuración actual
nvm debug
```

## Configuración recomendada
```bash
# Instalar versiones clave
nvm install --lts          # Para proyectos estables
nvm install node           # Para aprender nuevas features
nvm alias default lts/*    # LTS como predeterminada

# Para cada proyecto nuevo
echo "lts/*" > .nvmrc      # Usar LTS por defecto
```