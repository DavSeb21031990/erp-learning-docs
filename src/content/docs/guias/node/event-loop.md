---
title: 'Event Loop'
description: 'Guia sobre Event Loop de Node.js'
---

El Event Loop es el corazón de Node.js que permite ejecutar operaciones asíncronas de manera no bloqueante en un solo hilo principal. Es lo que hace posible que Node.js maneje miles de conexiones concurrentes sin crear un hilo nuevo para cada una.

## Arquitectura del Event Loop
### Componentes principales:

**Call Stack (Pila de Llamadas)**
- Donde se ejecutan las funciones síncronas
- Funciona como una pila LIFO (Last In, First Out)
- Solo puede procesar una operación a la vez

**Web APIs / C++ APIs**
- Manejan operaciones asíncronas como:
    - Timers (setTimeout, setInterval)
    - I/O de archivos
    - Peticiones HTTP
    - Eventos del DOM (en el navegador)

**Callback Queue (Cola de Callbacks)**
- Cola FIFO donde se almacenan los callbacks listos para ejecutar
- También llamada Task Queue

**Microtask Queue**
- Cola de mayor prioridad para:
    - Promesas (`.then`, `.catch`, `.finally`)
    - `process.nextTick()` en `Node.js`
    - `queueMicrotask()`

## Fases del Event Loop en Node.js
Node.js tiene un Event Loop más complejo con 6 fases principales:
```
┌───────────────────────────┐
┌─>│           timers          │  ← setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  ← I/O callbacks diferidos
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  ← uso interno
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │  ← nuevos I/O events
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │  ← setImmediate callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │  ← close events
   └───────────────────────────┘
```
### Descripción de cada fase:
- Timers

    - Ejecuta callbacks de `setTimeout()` y `setInterval()`
    - Solo ejecuta si el tiempo especificado ya pasó

- Pending Callbacks

    - Ejecuta callbacks de operaciones I/O que se pospusieron

- Idle, Prepare

    - Uso interno de `Node.js`

- Poll

    - **La fase más importante**
    - Obtiene nuevos eventos I/O
    - Ejecuta callbacks relacionados con I/O
    - Puede bloquear si no hay callbacks pendientes

- Check

    - Ejecuta callbacks de `setImmediate()`

- Close Callbacks

    - Ejecuta callbacks de eventos de cierre (ej: `socket.on('close')`)

## Ejemplo practico
```javascript
console.log('1: Start');

// Macrotask (Timer)
setTimeout(() => console.log('2: Timer 1'), 0);

// Microtask (Promise)
Promise.resolve().then(() => console.log('3: Promise 1'));

// Immediate
setImmediate(() => console.log('4: Immediate 1'));

// Microtask (process.nextTick - mayor prioridad)
process.nextTick(() => console.log('5: NextTick 1'));

// Microtask (Promise)
Promise.resolve().then(() => console.log('6: Promise 2'));

console.log('7: End');

// Resultado:
// 1: Start
// 7: End
// 5: NextTick 1
// 3: Promise 1
// 6: Promise 2
// 2: Timer 1
// 4: Immediate 1
```

## Orden de Prioridad

### Call Stack (código síncrono)
### Microtasks:
- `process.nextTick()` (máxima prioridad)
- `Promises`
- `queueMicrotask()`

### Macrotasks:
- `setTimeout`/`setInterval`
- `setImmediate`
- I/O operations

## Ventajas de esta Arquitectura
- **No Bloqueante:** Las operaciones I/O no bloquean el hilo principal
- **Eficiencia:** Un solo hilo maneja múltiples conexiones
- **Escalabilidad:** Ideal para aplicaciones I/O intensivas
- **Rendimiento:** Menor overhead comparado con modelos multi-hilo

## Casos de Uso Ideales
- APIs REST
- Aplicaciones en tiempo real (chat, streaming)
- Microservicios
- Proxy servers
- Aplicaciones con muchas operaciones de red