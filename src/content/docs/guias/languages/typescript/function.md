---
title: 'Funciones'
description: 'Guia de funciones en TypeScript'
---

## Funciones con tipos
```typescript title="Definición"
function sumar(a: number, b: number): number {
    return a + b;
}
```

```typescript title="Uso"
console.log("Sum: ", sumar(5, 3));
```

## Funciones con parámetro opcional
```typescript title="Definición"
function saludar(nombre: string, apellido?: string): string {
    if (apellido) {
        return `Hola ${nombre} ${apellido}`
    }
    return `Hola ${nombre}`;
}
```

```typescript title="Uso"
console.log("Saludo: ", saludar("Ana"));
console.log("Saludo completo: ", saludar("Ana", "García"));
```

## Funciones con parámetro por defecto
```typescript title="Definición"
function crearUsuario(nombre: string, edad: number = 18): Usuario {
    return {
        nombre,
        edad,
        email: `${nombre.toLowerCase()}@correo.com`
    }
}
```

```typescript title="Uso"
const nuevoUsuario = crearUsuario("Luis");
console.log("Nuevo usuario: ", nuevoUsuario);
```

## Arrow Function
```typescript title="Definición"
const multiplicar = (a: number, b:number): number => a * b;
```

## Funcione que retorna `Promise`
```typescript title="Definición"
async function obtenerDatos(id: number): Promise<Usuario> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                nombre: "Usuario " + id,
                edad: 25,
                email: `ùsuario${id}@correo.com`
            }, 1000);
        });
    });
}
```

```typescript title="Uso"
obtenerDatos(1)
    .then(usuario => {
        console.log("Datos obtenidos: ", usuario);
    });
```