---
title: ''
description: ''
---

## Configuración
### Angular (incluye 17+)
Angular soporta budgets nativos en angular.json (funcionan con el builder actual).
En `angular.json` → tu app → `architect.build.configurations.production.budgets`:

```json
"budgets": [
  { "type": "initial", "maximumWarning": "250kb", "maximumError": "300kb" },
  { "type": "anyScript", "maximumWarning": "150kb", "maximumError": "200kb" },
  { "type": "anyComponentStyle", "maximumWarning": "6kb", "maximumError": "10kb" },
  { "type": "bundle", "name": "styles", "maximumWarning": "120kb", "maximumError": "160kb" }
]
```
- initial: recursos críticos iniciales.
- anyScript / bundle: cada chunk JS/CSS.
- anyComponentStyle: CSS por componente.