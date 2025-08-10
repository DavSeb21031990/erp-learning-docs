---
title: 'Maven vs Gradle'
description: 'Comparación de maven vs gradle'
---

## Maven
- Herramienta de build tradicional
- Basada en XML para configuración
- Convención sobre configuración
- Ciclo de vida predefinido

## Gradle
- Herramienta moderna
- Basada en Groovy/Kotlin DSL
- Más flexible y programable
- Build incrementales y paralelos

## Sintaxis y configuraciones
### Maven - `pom.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>mi-app</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>
    
    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <spring.boot.version>3.2.0</spring.boot.version>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>${spring.boot.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
            <version>${spring.boot.version}</version>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <version>2.2.224</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <version>${spring.boot.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>${spring.boot.version}</version>
            </plugin>
        </plugins>
    </build>
</project>
```
### Gradle - `build.gradle`
```groovy
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.2.0'
    id 'io.spring.dependency-management' version '1.1.4'
}

group = 'com.example'
version = '1.0.0'

java {
    sourceCompatibility = '21'
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    runtimeOnly 'com.h2database:h2'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

tasks.named('test') {
    useJUnitPlatform()
}
```

## Perfomance y Velocidad
### Gradle
```bash
# Primera ejecución
./gradlew build
# ⏱️ 45 segundos

# Segunda ejecución (incremental)
./gradlew build
# ⏱️ 3 segundos ✅ Build incremental

# Build paralelo automático
./gradlew build --parallel
# ✅ Usa múltiples cores automáticamente

# Build daemon (reutiliza JVM)
./gradlew build --daemon
# ✅ JVM persistente = builds más rápidos
```

### Maven
```bash
# Primera ejecución
./mvnw clean package
# ⏱️ 50 segundos

# Segunda ejecución
./mvnw package
# ⏱️ 35 segundos ⚠️ Menos optimización incremental

# Build paralelo (manual)
./mvnw -T 4 package
# ⚠️ Requiere configuración manual
```

## Comandos comunes
### Gradle
```bash
# Crear proyecto
gradle init

# Compilar
./gradlew build

# Ejecutar tests
./gradlew test

# Ejecutar aplicación
./gradlew bootRun

# Limpiar
./gradlew clean

# Ver dependencias
./gradlew dependencies

# Publicar
./gradlew publish

# Ver tasks disponibles
./gradlew tasks
```

### Maven
```bash
# Crear proyecto
mvn archetype:generate

# Compilar
./mvnw compile

# Empaquetar
./mvnw package

# Ejecutar tests
./mvnw test

# Ejecutar aplicación
./mvnw spring-boot:run

# Limpiar
./mvnw clean

# Ver dependencias
./mvnw dependency:tree

# Instalar en repo local
./mvnw install

# Ver fases disponibles
./mvnw help:describe -Dcmd=compile
```

## Gestión de dependencias
### Maven - Versiones especificas
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>3.2.0</version>
    </dependency>
    
    <!-- Dependency management -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-dependencies</artifactId>
        <version>3.2.0</version>
        <type>pom</type>
        <scope>import</scope>
    </dependency>
</dependencies>
```

### Gradle - BOM automáticos
```groovy
dependencies {
    // Spring Boot BOM maneja versiones automáticamente
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    
    // Versiones específicas si necesitas
    implementation 'com.fasterxml.jackson.core:jackson-core:2.15.2'
    
    // Diferentes scopes
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    runtimeOnly 'com.h2database:h2'
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
}
```

## Estructura de proyectos
### Maven - Estructura Estándar
```markdown
mi-proyecto/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/App.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       ├── java/
│       │   └── com/example/AppTest.java
│       └── resources/
└── target/                    # ← Output directory
    ├── classes/
    ├── test-classes/
    └── mi-proyecto-1.0.0.jar
```

### Gradle - Estructura Estandar
```markdown
mi-proyecto/
├── build.gradle
├── gradle/
│   └── wrapper/
├── gradlew
├── gradlew.bat
├── settings.gradle
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/App.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       ├── java/
│       │   └── com/example/AppTest.java
│       └── resources/
└── build/                     # ← Output directory
    ├── classes/
    ├── libs/
    └── mi-proyecto-1.0.0.jar
```

## Plugins y extensibilidad
### Maven - Plugins XML:
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <mainClass>com.example.Application</mainClass>
            </configuration>
        </plugin>
        
        <plugin>
            <groupId>org.jacoco</groupId>
            <artifactId>jacoco-maven-plugin</artifactId>
            <version>0.8.8</version>
            <executions>
                <execution>
                    <goals>
                        <goal>prepare-agent</goal>
                    </goals>
                </execution>
                <execution>
                    <id>report</id>
                    <phase>test</phase>
                    <goals>
                        <goal>report</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

### Gradle - Plugins DSL
```groovy
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.2.0'
    id 'io.spring.dependency-management' version '1.1.4'
    id 'jacoco'
    id 'org.sonarqube' version '4.4.1.3373'
}

// Configuración simple de plugins
jacoco {
    toolVersion = "0.8.8"
}

jacocoTestReport {
    reports {
        xml.required = true
        html.required = true
    }
}

// Tasks personalizados fáciles
task printDependencies {
    doLast {
        configurations.runtimeClasspath.each { println it }
    }
}
```

## Proyectos Multimodulo
### Maven - Reactor Build
```maven title="parent/pom.xml"
<modules>
    <module>common</module>
    <module>web</module>
    <module>api</module>
</modules>
```

```maven title="web/pom.xml"

<parent>
    <groupId>com.example</groupId>
    <artifactId>parent</artifactId>
    <version>1.0.0</version>
</parent>

<dependencies>
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>common</artifactId>
        <version>${project.version}</version>
    </dependency>
</dependencies>
```

### Gradle - Composite Build
```groovy title="settings.gradle"
rootProject.name = 'mi-proyecto'
include 'common', 'web', 'api'
```

```groovy title="web/build.gradle"
dependencies {
    implementation project(':common')
    implementation 'org.springframework.boot:spring-boot-starter-web'
}

// Parallel execution automático para módulos
gradle.startParameter.parallelProjectExecutionEnabled = true
```