---
title: 'Gradle Wrapper'
description: 'Guia sobre Gradle Wrapper'
---
## Definición
El Gradle Wrapper es un script que descarga y ejecuta automáticamente una versión específica de Gradle sin necesidad de tenerlo instalado globalmente en el sistema.

El Gradle Wrapper es esencial para el desarrollo moderno - garantiza que todos usen la misma versión de build tool, elimina problemas de configuración y hace que los proyectos sean verdaderamente portables y reproducibles.

## Archivos de `Wrapper`
```markdown
mi-proyecto/
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar      # ← JAR que descarga Gradle
│       └── gradle-wrapper.properties # ← Configuración de versión
├── gradlew                         # ← Script Unix/Linux/macOS
├── gradlew.bat                     # ← Script Windows
└── build.gradle
```

## Como funciona
### `gradle.wrapper.properties`
```properties
# Distribución base (donde se almacena)
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists

# URL de descarga - VERSIÓN ESPECÍFICA
distributionUrl=https\://services.gradle.org/distributions/gradle-8.5-bin.zip

# Timeout de descarga
networkTimeout=10000

# Validación de integridad
validateDistributionSha256Checksum=true

# Cache local
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

### Uso básico
```bash
# En lugar de usar gradle directamente:
gradle build  # ❌ Requiere Gradle instalado

# Usas el wrapper:
./gradlew build  # ✅ Descarga la versión correcta automáticamente

# En Windows:
gradlew.bat build
```

## Comandos útiles
```groovy
# Build del proyecto
./gradlew build

# Ejecutar tests
./gradlew test

# Limpiar proyecto
./gradlew clean

# Ver versión de Gradle
./gradlew --version

# Ver todas las tasks disponibles
./gradlew tasks

# Ver dependencias
./gradlew dependencies

# Ejecutar aplicación Spring Boot
./gradlew bootRun
```

## Mejores practicas
### Commit wrapper en Git:
```bash
# ✅ SIEMPRE commitear estos archivos:
git add gradlew
git add gradlew.bat
git add gradle/wrapper/gradle-wrapper.jar
git add gradle/wrapper/gradle-wrapper.properties

# ❌ NO agregar a .gitignore:
# gradle/wrapper/gradle-wrapper.jar  # Este JAR SÍ debe ir en Git
```

### Verificar integridad
```bash
# Validar que el wrapper no está comprometido
./gradlew --version

# Si hay problemas, regenerar:
rm -rf gradle/wrapper/
./gradlew wrapper
```

### Actualización controlada
```bash
# Actualizar en rama separada
git checkout -b update-gradle-8.6
./gradlew wrapper --gradle-version 8.6

# Probar que todo funciona
./gradlew build
./gradlew test

# Commit y PR
git add gradle/wrapper/gradle-wrapper.properties
git commit -m "Update Gradle wrapper to 8.6"
```

## Crear proyecto Spring Boot con Gradle Wrapper
```bash
# Al crear proyecto Spring Boot
spring init --type=gradle-project mi-proyecto
# ✅ Wrapper incluido automáticamente

# Siempre usar:
./gradlew build     # NO: gradle build
./gradlew test      # NO: gradle test  
./gradlew bootRun   # NO: gradle bootRun
```