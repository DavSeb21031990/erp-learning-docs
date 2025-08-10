---
title: 'Estructura de un proyecto Gradle'
description: 'Guia de una estructura de un proyecto con Gradle'
---
## Estructura básica de un proyecto `Gradle`
```markdown
mi-proyecto-gradle/
├── gradle/                          # Configuración del wrapper
│   └── wrapper/
│       ├── gradle-wrapper.jar       # JAR del wrapper
│       └── gradle-wrapper.properties # Configuración de versión
├── gradlew                          # Script wrapper (Unix/Linux/macOS)
├── gradlew.bat                      # Script wrapper (Windows)
├── settings.gradle                  # Configuración del proyecto
├── build.gradle                     # Script de build principal
├── gradle.properties               # Propiedades globales (opcional)
├── src/                            # Código fuente
│   ├── main/
│   │   ├── java/                   # Código Java principal
│   │   │   └── com/example/
│   │   │       └── Application.java
│   │   └── resources/              # Recursos (properties, configs)
│   │       ├── application.properties
│   │       ├── static/             # Archivos estáticos (CSS, JS)
│   │       └── templates/          # Templates (Thymeleaf, etc.)
│   └── test/
│       ├── java/                   # Tests Java
│       │   └── com/example/
│       │       └── ApplicationTest.java
│       └── resources/              # Recursos para tests
│           └── application-test.properties
└── build/                          # Directorio de salida (generado)
    ├── classes/
    ├── libs/
    ├── reports/
    └── tmp/
```

## Archivos de configuración principales
###  `settings.gradle`
```gradle
// Configuración básica del proyecto
rootProject.name = 'mi-proyecto-gradle'

// Para proyectos multi-módulo
// include 'modulo-web', 'modulo-api', 'modulo-common'

// Configuración de repositorios de plugins (opcional)
pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
    }
}

// Configuración de repositorios de dependencias (opcional)
dependencyResolutionManagement {
    repositories {
        mavenCentral()
    }
}
```

### ``build.gradle` (Principal)
```gradle
// === PLUGINS ===
plugins {
    id 'java'                                           // Plugin Java básico
    id 'org.springframework.boot' version '3.2.0'      // Spring Boot
    id 'io.spring.dependency-management' version '1.1.4' // Gestión dependencias
    id 'application'                                    // Para aplicaciones ejecutables
}

// === INFORMACIÓN DEL PROYECTO ===
group = 'com.example'                 // Group ID (Maven style)
version = '1.0.0-SNAPSHOT'           // Versión del proyecto
description = 'Mi proyecto Spring Boot con Gradle'

// === CONFIGURACIÓN JAVA ===
java {
    sourceCompatibility = '21'        // Versión de Java
    targetCompatibility = '21'
}

// === REPOSITORIOS ===
repositories {
    mavenCentral()                   // Repositorio principal
    // mavenLocal()                  // Repo local (~/.m2/repository)
    // maven { url 'https://repo.spring.io/milestone' } // Repos adicionales
}

// === DEPENDENCIAS ===
dependencies {
    // Dependencias de implementación (incluidas en JAR final)
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    
    // Dependencias solo en tiempo de compilación
    compileOnly 'org.projectlombok:lombok'
    
    // Procesadores de anotaciones
    annotationProcessor 'org.projectlombok:lombok'
    
    // Dependencias solo en runtime
    runtimeOnly 'com.h2database:h2'
    runtimeOnly 'org.postgresql:postgresql'
    
    // Dependencias para desarrollo
    developmentOnly 'org.springframework.boot:spring-boot-devtools'
    
    // Dependencias de test
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.springframework.security:spring-security-test'
    
    // Dependencias solo para compilar tests
    testCompileOnly 'org.junit.jupiter:junit-jupiter-api'
    
    // Runtime solo para tests
    testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine'
}

// === CONFIGURACIÓN DE TASKS ===
tasks.named('test') {
    useJUnitPlatform()              // Usar JUnit 5
    
    // Configuración adicional de tests
    testLogging {
        events "passed", "skipped", "failed"
        exceptionFormat "full"
    }
    
    // Reports de cobertura
    finalizedBy jacocoTestReport
}

// === CONFIGURACIÓN DE APLICACIÓN ===
application {
    mainClass = 'com.example.Application'  // Clase main
}

// === TASKS PERSONALIZADOS ===
task printDependencies {
    doLast {
        configurations.runtimeClasspath.forEach { println it }
    }
}

// === CONFIGURACIÓN DEL JAR ===
jar {
    manifest {
        attributes(
            'Main-Class': 'com.example.Application',
            'Implementation-Title': project.name,
            'Implementation-Version': project.version
        )
    }
}
```

## `gradle.properties`
```properties
# Configuración de la JVM para Gradle
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m

# Build paralelo (usa múltiples cores)
org.gradle.parallel=true

# Configurar daemon
org.gradle.daemon=true

# Cache entre builds
org.gradle.caching=true

# Configuración de builds configurables
org.gradle.configureondemand=true

# Propiedades del proyecto
version=1.0.0
springBootVersion=3.2.0

# Configuraciones personalizadas
database.url=jdbc:h2:mem:testdb
database.username=sa
database.password=

# Profile activo
spring.profiles.active=dev
```

## Directorio `src/` en detalle
### `src/main/java`
```markdown
src/main/java/
└── com/example/
    ├── Application.java              # Clase principal Spring Boot
    ├── config/                       # Configuraciones
    │   ├── DatabaseConfig.java
    │   ├── SecurityConfig.java
    │   └── WebConfig.java
    ├── controller/                   # Controllers REST
    │   ├── UserController.java
    │   ├── ProductController.java
    │   └── AuthController.java
    ├── service/                      # Lógica de negocio
    │   ├── UserService.java
    │   ├── ProductService.java
    │   └── impl/
    │       ├── UserServiceImpl.java
    │       └── ProductServiceImpl.java
    ├── repository/                   # Acceso a datos
    │   ├── UserRepository.java
    │   └── ProductRepository.java
    ├── model/                        # Entidades/DTOs
    │   ├── entity/
    │   │   ├── User.java
    │   │   └── Product.java
    │   └── dto/
    │       ├── UserDTO.java
    │       └── ProductDTO.java
    └── exception/                    # Manejo de excepciones
        ├── GlobalExceptionHandler.java
        ├── UserNotFoundException.java
        └── ValidationException.java
```

### `src/main/resources/``
```markdown
src/main/resources/
├── application.properties           # Configuración principal
├── application-dev.properties       # Configuración desarrollo
├── application-prod.properties      # Configuración producción
├── application-test.properties      # Configuración tests
├── static/                         # Archivos estáticos web
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── logo.png
├── templates/                      # Templates (Thymeleaf, etc.)
│   ├── index.html
│   ├── user/
│   │   ├── list.html
│   │   └── edit.html
│   └── fragments/
│       ├── header.html
│       └── footer.html
├── db/                            # Scripts de base de datos
│   ├── migration/
│   │   ├── V1__Create_users_table.sql
│   │   └── V2__Add_products_table.sql
│   └── data/
│       └── sample-data.sql
├── config/                        # Archivos de configuración
│   ├── logback-spring.xml
│   └── banner.txt
└── META-INF/                      # Metadatos
    └── MANIFEST.MF
```

### `src/test/java/`
```markdown
src/test/java/
└── com/example/
    ├── ApplicationTest.java          # Test de contexto Spring
    ├── controller/                   # Tests de controllers
    │   ├── UserControllerTest.java
    │   └── ProductControllerTest.java
    ├── service/                      # Tests de servicios
    │   ├── UserServiceTest.java
    │   └── ProductServiceTest.java
    ├── repository/                   # Tests de repositorios
    │   ├── UserRepositoryTest.java
    │   └── ProductRepositoryTest.java
    ├── integration/                  # Tests de integración
    │   ├── UserIntegrationTest.java
    │   └── ApiIntegrationTest.java
    └── util/                        # Utilidades para tests
        ├── TestDataFactory.java
        └── TestUtils.java
```

##  Directorio build/ (generado)
### Estructura después del build:
```markdown
build/
├── classes/                        # Clases compiladas
│   ├── java/
│   │   ├── main/                   # Clases principales
│   │   │   └── com/example/
│   │   └── test/                   # Clases de test
│   │       └── com/example/
│   └── resources/                  # Recursos copiados
│       ├── main/
│       └── test/
├── libs/                          # JARs generados
│   ├── mi-proyecto-1.0.0.jar      # JAR principal
│   └── mi-proyecto-1.0.0-plain.jar # JAR sin dependencias
├── reports/                       # Reports de build
│   ├── tests/
│   │   └── test/
│   │       └── index.html         # Report HTML de tests
│   ├── jacoco/                    # Cobertura de código
│   │   └── test/
│   └── checkstyle/               # Análisis de código
├── test-results/                  # Resultados XML de tests
│   └── test/
│       └── TEST-*.xml
├── tmp/                          # Archivos temporales
│   ├── jar/
│   ├── compileJava/
│   └── compileTestJava/
└── bootJarMainClassName          # Metadata Spring Boot
```

## Configuraciones avanzadas
### Multi-module project structure:
```markdown
mi-proyecto-multi/
├── settings.gradle               # Include all modules
├── build.gradle                  # Parent build script
├── gradle.properties            # Shared properties
├── common/                      # Shared module
│   └── build.gradle
├── web/                         # Web module
│   ├── build.gradle
│   └── src/
├── api/                         # API module
│   ├── build.gradle
│   └── src/
└── database/                    # Database module
    ├── build.gradle
    └── src/
```

### `build.gradle` para submódulo:
```gradle
// common/build.gradle
plugins {
    id 'java-library'              // Para librerías compartidas
}

dependencies {
    api 'org.springframework:spring-context'        // Expuesta a dependientes
    implementation 'org.apache.commons:commons-lang3' // Interna
    
    testImplementation 'org.junit.jupiter:junit-jupiter'
}
```

```gradle title="web/build.gradle"
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.2.0'
}

dependencies {
    implementation project(':common')  // Dependencia del módulo común
    implementation 'org.springframework.boot:spring-boot-starter-web'
}
```

##  Tasks principales de Gradle
### Build lifecycle:
```bash
# Compilar código fuente
./gradlew compileJava

# Procesar recursos
./gradlew processResources

# Compilar tests
./gradlew compileTestJava

# Ejecutar tests
./gradlew test

# Crear JAR
./gradlew jar

# Build completo
./gradlew build

# Limpiar outputs
./gradlew clean
```

### Tasks específicas de Spring Boot:
```bash
# Crear JAR ejecutable
./gradlew bootJar

# Ejecutar aplicación
./gradlew bootRun

# Crear imagen Docker
./gradlew bootBuildImage
```

## Ejemplo práctico: Proyecto Spring Boot completo
### Crear estructura:
```bash
mkdir mi-api-gradle
cd mi-api-gradle

# Generar proyecto base
spring init \
  --dependencies=web,data-jpa,h2,validation \
  --type=gradle-project \
  --java-version=21 \
  --group-id=com.example \
  --artifact-id=mi-api \
  --name="Mi API REST" \
  .
```
### Estructura resultante:
```markdown
mi-api-gradle/
├── gradle/wrapper/...
├── gradlew
├── gradlew.bat
├── settings.gradle
├── build.gradle
└── src/
    ├── main/
    │   ├── java/com/example/
    │   │   └── MiApiApplication.java
    │   └── resources/
    │       └── application.properties
    └── test/
        └── java/com/example/
            └── MiApiApplicationTests.java
```

### Expandir con estructura real:
```bash
# Crear estructura de paquetes
mkdir -p src/main/java/com/example/{controller,service,repository,model,config}
mkdir -p src/test/java/com/example/{controller,service,repository,integration}
mkdir -p src/main/resources/{static,templates,db/migration}
```

### Build y ejecutar:
```bash
# Build inicial
./gradlew build

# Ejecutar aplicación
./gradlew bootRun

# Verificar estructura generada
ls -la build/
```