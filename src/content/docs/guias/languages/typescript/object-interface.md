---
title: 'Objetos e Interfaces'
description: 'Guia de objetos e interfaces en TypeScript'
---

## Objetos con tipo inline
Son objetos los cuales se define su tipo y se le asigna sus respectivos valores en la misma linea.
```typescript
let usuario: {
  nombre: string;
  edad: number;
  activo: boolean;
} = {
  nombre: "Ana",
  edad: 28,
  activo: true
};
```

## Interfaces
Las interfaces en TypeScript tienen varios usos entre uno de esos esta el que se suelen usar para definir la estructura de un objetos.

Este uso de las interfaces es recomendado sobre todo en lugar de la definición de objetos con tipo inline, la cual se considera una mala practica.

```typescript title="Interface"
interface Usuario {
  nombre: string;
  edad: number;
  email: string;
  activo?: boolean;        // Propiedad opcional (?)
}
```

```typescript title="Objeto"
let usuario2: Usuario = {
  nombre: "María",
  edad: 25,
  email: "maria@email.com",
  activo: true
};
```

### Definir un atributo como opcional
Para definir una propiedad opcional, se usa el signo de interrogación (?) antes de los dos puntos (:), por ejemplo: `<name_property>?: <type>`;

### Herencia
Para aplicar la herencia entre interfaces basta con usar la palabra extends a lado del nombre de la interface, por ejemplo:

```typescript title="Interface Padre"
interface Usuario {
  nombre: string;
  edad: number;
  email: string;
  activo?: boolean;        // Propiedad opcional (?)
}
```

```typescript title="Interface Hija"
interface Administrador extends Usuario {
  permisos: string[];
  nivel: number;
}
```
