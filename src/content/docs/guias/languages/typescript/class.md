---
title: 'Clases'
description: 'Guia de clases en TypeScript'
---

## Clase Básica
```typescript
class Persona {
  // Propiedades
  private nombre: string;           // Solo accesible dentro de la clase
  protected edad: number;           // Accesible en la clase y subclases
  public email: string;             // Accesible desde cualquier lugar

  // Constructor
  constructor(nombre: string, edad: number, email: string) {
    this.nombre = nombre;
    this.edad = edad;
    this.email = email;
  }

  // Método público
  public presentarse(): string {
    return `Hola, soy ${this.nombre} y tengo ${this.edad} años`;
  }

  // Getter
  get getNombre(): string {
    return this.nombre;
  }

  // Setter
  set setEdad(nuevaEdad: number) {
    if (nuevaEdad > 0) {
      this.edad = nuevaEdad;
    }
  }
}
```

## Herencia
```typescript
class Empleado extends Persona{
    private salario: number;
    private departamento: string;

    constructor(nombre: string, edad: number, email: string, salario: number, departamento: string) {
        super(nombre, edad, email);
        this.salario = salario;
        this.departamento = departamento;
    }

    public trabajar(): string{
        return `${this.getNombre} está trabajando en ${this.departamento}`;
    }

    public obtenerInfo(): string {
        return `${this.presentarse()}, trabajo en ${this.departamento}`;
    }
}
```