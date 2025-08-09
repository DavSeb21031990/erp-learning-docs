---
title: 'Nuevas caracteristicas de Java 21'
description: 'Guia con las nuevas caracteristicas de Java 21'
---

## Pattern Matching para switch (Preview → Stable)
```java title="Ejemplo con Java 8 - Java 17"
public String processObject(Object obj) {
    if (obj instanceof String) {
        String s = (String) obj;
        return "String: " + s.toUpperCase();
    } else if (obj instanceof Integer) {
        Integer i = (Integer) obj;
        return "Number: " + i * 2;
    } else if (obj instanceof List) {
        List<?> list = (List<?>) obj;
        return "List size: " + list.size();
    }
    return "Unknown";
}
```

```java title="Ejemplo con Java 21"
public String processObject(Object obj) {
    return switch (obj) {
        case String s -> "String: " + s.toUpperCase();
        case Integer i -> "Number: " + i * 2;
        case List<?> list -> "List size: " + list.size();
        case null -> "Null value";
        default -> "Unknown";
    };
}
```

```java title="Ejemplo con Java 21 avanzado"
public String analyzeNumber(Object obj) {
    return switch (obj) {
        case Integer i when i > 0 -> "Positive: " + i;
        case Integer i when i < 0 -> "Negative: " + i;
        case Integer i -> "Zero";
        case Double d when d.isNaN() -> "Not a number";
        case Double d -> "Double: " + d;
        default -> "Not a number type";
    };
}
```

## Virtual Threads (Project Loom)

```java title="Solución con Threads tradicionales"
// Esto es costoso y no escala bien
public void traditionalThreads() throws InterruptedException {
    ExecutorService executor = Executors.newFixedThreadPool(1000);
    
    for (int i = 0; i < 100_000; i++) {
        final int taskId = i;
        executor.submit(() -> {
            try {
                // Simular I/O (database, API call)
                Thread.sleep(1000);
                System.out.println("Task " + taskId + " completed");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
    }
}
```

```java title="Solución con Virtual Threads"
public void virtualThreads() throws InterruptedException {
    // ¡Pueden crear millones de virtual threads!
    try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
        
        for (int i = 0; i < 100_000; i++) {
            final int taskId = i;
            executor.submit(() -> {
                try {
                    // El mismo I/O, pero muchísimo más eficiente
                    Thread.sleep(1000);
                    System.out.println("Task " + taskId + " completed");
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }
    }
}
```

```java title="Solución en Spring Boot con Virtual Threads"
@RestController
public class VirtualThreadController {
    
    @GetMapping("/slow-endpoint")
    public ResponseEntity<String> slowEndpoint() throws InterruptedException {
        // Este endpoint puede manejar miles de requests concurrentes
        Thread.sleep(2000); // Simular consulta lenta a BD
        return ResponseEntity.ok("Processed by: " + Thread.currentThread());
    }
}

// Configuración en application.properties
# spring.threads.virtual.enabled=true
```

## Record Patterns

### Definiendo records:
```java
public record Point(int x, int y) {}
public record Circle(Point center, int radius) {}
public record Rectangle(Point topLeft, Point bottomRight) {}
```
### Patter Matching con Records
```java
public double calculateArea(Object shape) {
    return switch (shape) {
        case Circle(var center, var radius) -> 
            Math.PI * radius * radius;
            
        case Rectangle(Point(var x1, var y1), Point(var x2, var y2)) -> 
            Math.abs((x2 - x1) * (y2 - y1));
            
        default -> 0.0;
    };
}

// Uso
Circle circle = new Circle(new Point(0, 0), 5);
double area = calculateArea(circle); // Automáticamente extrae center y radius
```

## String Template
```java
// Variables
String name = "Spring Boot";
int version = 3;
double performance = 95.8;

// Template string (más legible que concatenación)
String message = STR."""
    Framework: \{name}
    Version: \{version}
    Performance: \{performance}%
    Status: \{performance > 90 ? "Excellent" : "Good"}
    """;
```

## Sequenced Collections
```java
// Nueva interfaz que garantiza orden
SequencedCollection<String> items = new ArrayList<>();
items.addFirst("primero");
items.addLast("último");

String first = items.getFirst();
String last = items.getLast();

// También para Sets y Maps
SequencedSet<Integer> numbers = new LinkedHashSet<>();
SequencedMap<String, Integer> map = new LinkedHashMap<>();
```

## Aplicaciones practicas
### APIs REST más eficientes con Virtual Threads
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public CompletableFuture<User> getUser(@PathVariable Long id) {
        // Con virtual threads, esto escala a millones de requests
        return CompletableFuture.supplyAsync(() -> {
            // Consultas a múltiples servicios
            User user = userService.findById(id);
            user.setProfile(profileService.getProfile(id));
            user.setPreferences(preferencesService.getPreferences(id));
            return user;
        });
    }
}
```

### Procesamiento de datos con Pattern Matching
```java
@Service
public class DataProcessor {
    
    public ProcessResult processData(Object data) {
        return switch (data) {
            case String json when isValidJson(json) -> 
                processJsonData(json);
                
            case Map<?, ?> map when map.containsKey("type") -> 
                processMapData(map);
                
            case List<?> list when !list.isEmpty() -> 
                processBatchData(list);
                
            case null -> 
                ProcessResult.error("Null data received");
                
            default -> 
                ProcessResult.error("Unsupported data type: " + data.getClass());
        };
    }
}
```

### Migración con código legacy
```java title="Antes"
public String formatUserInfo(Object user) {
    if (user instanceof AdminUser) {
        AdminUser admin = (AdminUser) user;
        return String.format("Admin: %s (Level: %d)", 
                           admin.getName(), admin.getLevel());
    } else if (user instanceof RegularUser) {
        RegularUser regular = (RegularUser) user;
        return String.format("User: %s (Since: %s)", 
                           regular.getName(), regular.getJoinDate());
    }
    return "Unknown user type";
}
```

```java title="Java 21"
public String formatUserInfo(Object user) {
    return switch (user) {
        case AdminUser(var name, var level, var _) -> 
            STR."Admin: \{name} (Level: \{level})";
            
        case RegularUser(var name, var joinDate, var _) -> 
            STR."User: \{name} (Since: \{joinDate})";
            
        default -> "Unknown user type";
    };
}
```

## Impacto
**Para Spring Boot:**

- Virtual Threads: APIs que manejan 10x más tráfico
- Pattern Matching: Código más limpio en controllers y services
- Records: DTOs más simples y seguros

**Para microservicios:**

- Mejor manejo de I/O bound operations
- Menos uso de memoria
- Mayor throughput