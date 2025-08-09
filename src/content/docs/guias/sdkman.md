---
title: Example Guide
description: A guide in my new Starlight docs site.
---

`SDKMAN (Software Development Kit Manager)` es una herramienta de línea de comandos que facilita enormemente la gestión de múltiples versiones de JDKs y otras herramientas del ecosistema JVM como Maven, Gradle, Kotlin, Scala, entre otras.

## Definición
SDKMAN es básicamente un gestor de versiones que te permite:

- Instalar múltiples versiones de Java (OpenJDK, Oracle JDK, - GraalVM, etc.)
- Cambiar entre versiones fácilmente
- Gestionar otras herramientas del ecosistema JVM
- Mantener todo organizado sin conflictos

## Instalación
- Instalar WSL (Windows Subsystem for Linux):
    - **Usuario:** deivi
    - **Password:** 21081990
    - **Usuario administrador:** root
    ```powershell
    wsl --install
    ```
- Abre la terminal de Ubuntu (WSL).
- Instalar dependencias
    ```bash title="Dependencias Zip y Unzip"
    sudo apt update && sudo apt install zip unzip -y
    ```
    ```bash title="Dependencias curl y tar"
    sudo apt install curl tar -y
    ```
- Instala `SDKMAN` como en Linux:
    ```bash
    curl -s "https://get.sdkman.io" | bash
    source "$HOME/.sdkman/bin/sdkman-init.sh"
    sdk version
    ```

## Ventajas sobre la instalación manual
### Gestión de multiples versiones
```bash
# Ver versiones disponibles
sdk list java

# Instalar Java 17
sdk install java 17.0.9-tem

# Instalar Java 21
sdk install java 21.0.1-tem

# Cambiar entre versiones globalmente
sdk default java 21.0.1-tem

# Cambiar para la sesión actual
sdk use java 17.0.9-tem

# Ver la versión actual de un SDK
sdk current java

# Ver todas las versiones activas
sdk current
```
### Simplicidad de intalación
En lugar de:
- Descargar manualmente el JDK
- Configurar JAVA_HOME
- Modificar PATH
- Gestionar variables de entorno

Solo necesitas:
```bash
sdk install java 21.0.1-tem
```

### Gestión automática de variables
`SDKMAN` maneja automáticamente:
- `JAVA_HOME`
- `PATH`
- Variables específicas de cada herramienta

### Ecosistema completo
No solo Java, también puedes instalar:
```bash
sdk install gradle 8.5
sdk install maven 3.9.6
sdk install kotlin 1.9.21
sdk install springboot 3.2.0
```

### Actualizaciones sencillas
```bash
# Ver qué hay disponible para actualizar
sdk upgrade

# Actualizar una herramienta específica
sdk upgrade java
```

## Configuración por proyecto
Puedes crear un archivo .sdkmanrc en cada proyecto:
```bash
# En la raíz de tu proyecto
echo "java=17.0.9-tem" > .sdkmanrc
echo "gradle=8.5" >> .sdkmanrc

# Al entrar al directorio, SDKMAN cambia automáticamente
sdk env
```

## Integración con Intellij
### Configuración cuando usas WSL2 + SDKMAN

#### Configurar el JDK en IntelliJ:
```
File → Project Structure → Project Settings → Project
```
- Project SDK: Apuntar a la ruta de `WSL2`
- Ruta típica: `\\wsl$\Ubuntu\home\tu-usuario\.sdkman\candidates\java\21.0.1-tem`

#### Configurar Gradle:
```
File → Settings → Build Tools → Gradle
```
- Gradle JVM: Usar el mismo `JDK` configurado
- Use Gradle from: Specified location
- Ruta: `\\wsl$\Ubuntu\home\tu-usuario\.sdkman\candidates\gradle\current`

### Flujo de trabajo práctico
```bash
# En WSL2 terminal
# 1. Crear proyecto y configurar versiones
mkdir mi-proyecto-spring
cd mi-proyecto-spring

# 2. Configurar versiones específicas para este proyecto
echo "java=21.0.1-tem" > .sdkmanrc
echo "gradle=8.5" >> .sdkmanrc

# 3. Activar el entorno
sdk env

# 4. Crear proyecto Spring Boot
sdk use springboot
spring init --dependencies=web,data-jpa,h2 --type=gradle-project mi-app
```

**En IntelliJ IDEA:**

Abrir proyecto:
- `File → Open`
- Navegar a `\\wsl$\Ubuntu\home\tu-usuario\mi-proyecto-spring`

IntelliJ detectará automáticamente:
- El archivo build.gradle
- Las configuraciones del proyecto

Configuración automática de SDK:
```
File → Project Structure → Modules → Dependencies
```

**Variables de entorno automáticas**

Crea un script de inicialización:
```bash
# ~/.profile o ~/.bashrc
# Auto-activar SDKMAN environment
cd() {
    builtin cd "$@"
    if [[ -f .sdkmanrc ]]; then
        sdk env
    fi
}
```
### Ejemplo practico completo

**Configuración inicial (una sola vez)**
```bash
# En WSL2
sdk install java 17.0.9-tem
sdk install java 21.0.1-tem
sdk install gradle 8.5
sdk install maven 3.9.6
sdk install springboot 3.2.0

# Configurar Java 21 como default
sdk default java 21.0.1-tem
```
**Para cada proyecto nuevo**
```bash
# Crear directorio del proyecto
mkdir spring-microservice
cd spring-microservice

# Configurar versiones específicas
echo "java=17.0.9-tem" > .sdkmanrc
echo "gradle=8.5" >> .sdkmanrc

# Activar entorno
sdk env

# Verificar configuración
java -version
gradle -version
```