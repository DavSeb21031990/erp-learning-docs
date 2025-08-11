---
title: 'Tipos Avanazdos'
description: 'Guia de tipos avanzados en TypeScript'
---

## Union types (puede ser uno u otro tipo)
```typescript title="Ejemplo 1"
type Estado = "pendiente" | "completado" | "cancelado";
```

```typescript title="Ejemplo 2"
type ID = string | number;
```

```typescript title="Ejemplo Uso"
interface Tarea {
    id: ID;
    titulo: string;
    estado: Estado;
    fechaVencimiento?: Date;
}
```

## Type alias para objetos
```typescript
type Coordenadas = {
    x: number;
    y: number;
};
```

## Función con union types
```typescript
function procesar(valor: string | number): string{
    if(typeof  valor === "string"){
        return valor.toUpperCase();
    }
    return  valor.toString();
}
```

## Array de objetos tipados

```typescript title="Tipo"
interface Tarea {
    id: ID;
    titulo: string;
    estado: Estado;
    fechaVencimiento?: Date;
}
```

```typescript title="Array"
let tareas: Tarea[] = [
    {
        id: 1,
        titulo: 'Aprender TypeScript',
        estado: "pendiente"
    },
    {
        id: 2,
        titulo: 'Configurar proyecto',
        estado: "completado",
        fechaVencimiento: new Date("2025-12-31")
    }
];
```