---
title: 'Conceptos Fundamentales'
description: 'Conceptos Fundamentales de TypeScript'
---

## Tipos primitivos
- Cadenas de caracteres
    ```typescript
    let nombre: string = "Juan";
    ```
- Números
    ```typescript
    let edad: number = 25;
    ```
- Booleanos
    ```typescript
    let activo: boolean = true;
    ```
- Indefinidos
    ```typescript
    let indefinido: undefined = undefined;

    ```
- Nulos
    ```typescript
    let nulo: null = null;
    ```

## Inferir tipos
```typescript
let ciudad = "Madrid";
let precio = 99.99;
```

## Arrays
```typescript
let numeros: number[] = [1, 2, 3, 4, 5];
let nombres: string[] = ["Ana", "Luis", "María"];
let activos: boolean[] = [true, false, true];
```

### Array alternativo
```typescript
let colores: Array<string> = ["rojo", "verde", "azul"];
```