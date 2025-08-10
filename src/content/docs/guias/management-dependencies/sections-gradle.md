---
title: 'Build.gradle básico y sus secciones'
description: 'Guia de build.gradle básico y sus '
---

## Definición
El archivo `build.gradle` es el script de configuración principal que le dice a Gradle:
- Cómo compilar tu proyecto
- Qué dependencias usar
- Qué tareas ejecutar
- Cómo crear el JAR/WAR final

## Estructura básica
```gradle
// ============================================
// 1. PLUGINS - Funcionalidades adicionales
// ============================================
plugins {
    id 'java'                                           // Plugin Java básico
    id 'org.springframework.boot' version '3.2.0'      // Spring Boot
    id 'io.spring.dependency-management' version '1.1.4' // Gestión dependencias
    id 'application'                                    // Para apps ejecutables
}

// ============================================
// 2. METADATOS DEL PROYECTO
// ============================================
group = 'com.example'                    // Group ID (como en Maven)
version = '1.0.0-SNAPSHOT'              // Versión del proyecto
description = 'Mi aplicación Spring Boot'

// ============================================
// 3. CONFIGURACIÓN JAVA
// ============================================
java {
    sourceCompatibility = '21'          // Versión mínima de Java
    targetCompatibility = '21'          // Versión target para compilar
}

// ============================================
// 4. REPOSITORIOS - Dónde buscar dependencias
// ============================================
repositories {
    mavenCentral()                      // Repositorio principal
    mavenLocal()                        // Repo local ~/.m2/repository
    
    // Repositorios adicionales si necesitas
    maven {
        url 'https://repo.spring.io/milestone'
    }
}

// ============================================
// 5. DEPENDENCIAS - Librerías que usa tu proyecto
// ============================================
dependencies {
    // === DEPENDENCIAS DE IMPLEMENTACIÓN ===
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    
    // === DEPENDENCIAS SOLO COMPILACIÓN ===
    compileOnly 'org.projectlombok:lombok'
    
    // === PROCESADORES DE ANOTACIONES ===
    annotationProcessor 'org.projectlombok:lombok'
    
    // === DEPENDENCIAS SOLO RUNTIME ===
    runtimeOnly 'com.h2database:h2'
    runtimeOnly 'org.postgresql:postgresql'
    
    // === DEPENDENCIAS DE DESARROLLO ===
    developmentOnly 'org.springframework.boot:spring-boot-devtools'
    
    // === DEPENDENCIAS DE TEST ===
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.springframework.security:spring-security-test'
}

// ============================================
// 6. CONFIGURACIÓN DE TAREAS
// ============================================
tasks.named('test') {
    useJUnitPlatform()                  // Usar JUnit 5
    
    testLogging {
        events "passed", "skipped", "failed"
        exceptionFormat "full"
    }
}

// ============================================
// 7. CONFIGURACIÓN DE APLICACIÓN
// ============================================
application {
    mainClass = 'com.example.Application'
}

// ============================================
// 8. TAREAS PERSONALIZADAS
// ============================================
task hello {
    doLast {
        println 'Hola desde Gradle!'
    }
}
```

## Sección 1 - Plugins
Los plugins añaden funcionalidades específicas a tu build.
```gradle
plugins {
    id 'java'                                    // Compilación Java básica
    id 'org.springframework.boot' version '3.2.0' // Funcionalidades Spring Boot
    id 'application'                            // Para crear apps ejecutables
    id 'war'                                    // Para crear archivos WAR
    id 'jacoco'                                 // Cobertura de código
}
```

### Plugins comunes
```gradle
// Para diferentes tipos de proyecto
id 'java-library'        // Para crear librerías Java
id 'maven-publish'       // Para publicar a repositorios Maven
id 'org.springframework.boot' // Spring Boot
id 'io.spring.dependency-management' // Gestión de versiones
id 'org.flywaydb.flyway' // Migraciones de BD
id 'com.google.cloud.tools.jib' // Crear imágenes Docker
```

## Sección 2 - Metadatos del proyecto
### Información básica
```gradle
group = 'com.miempresa'              // Namespace del proyecto
version = '2.1.0-RELEASE'           // Versión actual
description = 'API REST para e-commerce'

// Información adicional
ext {
    author = 'Mi Nombre'
    email = 'mi.email@empresa.com'
    buildDate = new Date()
}
```

### Usando variables
```gradle
// Definir versiones en un lugar
ext {
    springBootVersion = '3.2.0'
    lombokVersion = '1.18.30'
}

plugins {
    id 'org.springframework.boot' version "${springBootVersion}"
}
```

## Sección 3 - Configuración Java
### Configuración básica
```gradle
java {
    sourceCompatibility = '21'      // Código compatible con Java 21+
    targetCompatibility = '21'      // Compilar para Java 21
    
    // Configuraciones adicionales
    withJavadocJar()               // Generar JAR con Javadoc
    withSourcesJar()               // Generar JAR con sources
}
```

### Configuración avanzada
```gradle
java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
        vendor = JvmVendorSpec.ADOPTIUM  // Especificar vendor de JVM
    }
}

// Opciones del compilador
tasks.withType(JavaCompile) {
    options.encoding = 'UTF-8'
    options.compilerArgs += [
        '-Xlint:unchecked',
        '-Xlint:deprecation',
        '--enable-preview'  // Para features preview de Java
    ]
}
```

## Sección 4 - Repositorios
### Repositorios comunes
```gradle
repositories {
    mavenCentral()                  // Repositorio principal de Maven
    mavenLocal()                    // Cache local ~/.m2/repository
    gradlePluginPortal()           // Para plugins de Gradle
    
    // Repositorios de Spring
    maven { url 'https://repo.spring.io/milestone' }
    maven { url 'https://repo.spring.io/snapshot' }
    
    // Repositorio privado de empresa
    maven {
        url 'https://nexus.miempresa.com/repository/maven-public'
        credentials {
            username = project.findProperty('nexusUsername') ?: ''
            password = project.findProperty('nexusPassword') ?: ''
        }
    }
    
    // Repositorio con autenticación
    maven {
        url 'https://private-repo.com/maven'
        credentials(HttpHeaderCredentials) {
            name = "Authorization"
            value = "Bearer ${System.getenv('REPO_TOKEN')}"
        }
        authentication {
            header(HttpHeaderAuthentication)
        }
    }
}
```

## Sección 5 - Dependencias (La más importante)
### Tipos de dependencias:
#### implementation - Dependencias principales
```gradle
dependencies {
    // Estas dependencias están disponibles en compile + runtime
    // Y están incluidas en el JAR final
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'com.fasterxml.jackson.core:jackson-databind:2.15.2'
}
```

#### compileOnly - Solo para compilar
```gradle
dependencies {
    // Solo para compilar, NO incluidas en JAR final
    compileOnly 'org.projectlombok:lombok'
    compileOnly 'jakarta.servlet:jakarta.servlet-api'
}
```

#### runtimeOnly - Solo en ejecución
```gradle
dependencies {
    // Solo necesarias en runtime, no para compilar
    runtimeOnly 'com.h2database:h2'           // BD para tests
    runtimeOnly 'org.postgresql:postgresql'    // Driver PostgreSQL
    runtimeOnly 'io.micrometer:micrometer-registry-prometheus'
}
```

#### testImplementation - Solo para tests
```gradle
dependencies {
    // Solo disponibles en tests
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.testcontainers:postgresql'
    testImplementation 'org.mockito:mockito-core'
}
```

#### annotationProcessor - Procesadores
```gradle
dependencies {
    // Para procesar anotaciones en tiempo de compilación
    annotationProcessor 'org.projectlombok:lombok'
    annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'
}
```

#### Dependencias con versiones específicas
```gradle
dependencies {
    // Con versión específica
    implementation 'com.google.guava:guava:32.1.3-jre'
    
    // Con rango de versiones
    implementation 'org.apache.commons:commons-lang3:3.+'
    
    // Excluir dependencias transitivas
    implementation('org.springframework.boot:spring-boot-starter-web') {
        exclude group: 'org.springframework.boot', module: 'spring-boot-starter-tomcat'
    }
    
    // Dependencia de otro proyecto local
    implementation project(':common')
    
    // Archivos JAR locales
    implementation files('libs/mi-libreria-1.0.jar')
    implementation fileTree(dir: 'libs', include: ['*.jar'])
}
```

## Sección 6: Configuración de tareas
### Configurar tareas existentes
```gradle
// Configurar task de test
tasks.named('test') {
    useJUnitPlatform()              // Usar JUnit 5
    
    // Configurar logging de tests
    testLogging {
        events "passed", "skipped", "failed", "standardOut", "standardError"
        exceptionFormat "full"
        showStandardStreams = true
    }
    
    // Configurar JVM para tests
    jvmArgs = ['-Xmx1024m', '-XX:MaxPermSize=256m']
    
    // Variables de entorno para tests
    environment 'SPRING_PROFILES_ACTIVE', 'test'
    
    // Ejecutar después de tests
    finalizedBy jacocoTestReport
}

// Configurar task de compilación
tasks.named('compileJava') {
    options.encoding = 'UTF-8'
    options.compilerArgs += ['-Xlint:unchecked', '-Xlint:deprecation']
}

// Configurar JAR
tasks.named('jar') {
    manifest {
        attributes(
            'Implementation-Title': project.name,
            'Implementation-Version': project.version,
            'Main-Class': 'com.example.Application'
        )
    }
    
    // Incluir dependencias en JAR (fat JAR)
    from {
        configurations.runtimeClasspath.collect { it.isDirectory() ? it : zipTree(it) }
    }
}
```

## Sección 7 - Configuración de aplicación
### Para aplicaciones ejecutables
```gradle
application {
    mainClass = 'com.example.Application'  // Clase con método main
    applicationDefaultJvmArgs = ['-Xmx2048m', '-Xms1024m']
}

// Configuración específica de Spring Boot
springBoot {
    mainClass = 'com.example.Application'
    
    buildInfo {
        properties {
            artifact = 'mi-aplicacion'
            version = '1.0.0'
            group = 'com.example'
            name = 'Mi Aplicación'
        }
    }
}
```

## Sección 8 - Tareas personalizadas
### Tareas simples
```gradle
// Tarea básica
task hello {
    doLast {
        println 'Hola desde Gradle!'
    }
}

// Tarea con configuración
task printProjectInfo {
    description = 'Imprime información del proyecto'
    group = 'help'
    
    doLast {
        println "Proyecto: ${project.name}"
        println "Versión: ${project.version}"
        println "Group: ${project.group}"
    }
}

// Tarea que depende de otra
task buildAndNotify {
    dependsOn 'build'
    
    doLast {
        println '✅ Build completado exitosamente!'
    }
}
```

### Tareas más complejas
```gradle
// Tarea para limpiar logs
task cleanLogs(type: Delete) {
    delete fileTree(dir: 'logs', include: '*.log')
}

// Tarea para copiar archivos
task copyResources(type: Copy) {
    from 'src/main/config'
    into 'build/config'
    include '**/*.properties'
}

// Tarea para generar documentación
task generateDocs(type: Javadoc) {
    source = sourceSets.main.allJava
    classpath = configurations.runtimeClasspath
    destinationDir = file('build/docs/javadoc')
}

// Tarea con parámetros
task deployToEnv {
    description = 'Deploy to specified environment'
    
    doLast {
        def env = project.hasProperty('env') ? project.env : 'dev'
        println "Deploying to environment: ${env}"
        
        if (env == 'prod') {
            println '🚀 Deploying to PRODUCTION'
        } else {
            println "🔧 Deploying to ${env.toUpperCase()}"
        }
    }
}
```

## Ejemplo completo: Proyecto Spring Boot real
```gradle
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.2.0'
    id 'io.spring.dependency-management' version '1.1.4'
    id 'jacoco'
    id 'org.sonarqube' version '4.4.1.3373'
}

group = 'com.miempresa'
version = '1.0.0-SNAPSHOT'
description = 'API REST para gestión de usuarios'

java {
    sourceCompatibility = '21'
    withJavadocJar()
    withSourcesJar()
}

repositories {
    mavenCentral()
    maven { url 'https://repo.spring.io/milestone' }
}

ext {
    springBootVersion = '3.2.0'
    testcontainersVersion = '1.19.3'
}

dependencies {
    // Spring Boot starters
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
    
    // Database
    runtimeOnly 'org.postgresql:postgresql'
    runtimeOnly 'com.h2database:h2'
    
    // Utilities
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    implementation 'org.mapstruct:mapstruct:1.5.5.Final'
    annotationProcessor 'org.mapstruct:mapstruct-processor:1.5.5.Final'
    
    // Development
    developmentOnly 'org.springframework.boot:spring-boot-devtools'
    annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'
    
    // Testing
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.springframework.security:spring-security-test'
    testImplementation "org.testcontainers:junit-jupiter"
    testImplementation "org.testcontainers:postgresql"
}

tasks.named('test') {
    useJUnitPlatform()
    finalizedBy jacocoTestReport
    
    testLogging {
        events "passed", "skipped", "failed"
    }
}

jacocoTestReport {
    dependsOn test
    reports {
        xml.required = true
        html.required = true
    }
}

// Tarea personalizada para generar información de build
task buildInfo {
    doLast {
        def buildInfoFile = file('build/resources/main/build-info.properties')
        buildInfoFile.parentFile.mkdirs()
        buildInfoFile.text = """
build.version=${version}
build.time=${new Date()}
build.gradle=${gradle.gradleVersion}
build.java=${System.getProperty('java.version')}
        """.trim()
    }
}

processResources.dependsOn buildInfo

springBoot {
    buildInfo()
}
```