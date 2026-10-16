---
title: "Placeholder: reservar un espai provisional"
sidebar:
  order: 7
---

Durant el desenvolupament potser ja saps on anirà el mapa, però encara no tens eixe component. **`Placeholder` dibuixa un requadre amb diagonals per a fer visible eixe espai pendent**:

Documentació oficial: [`Placeholder`](https://api.flutter.dev/flutter/widgets/Placeholder-class.html).

| Propietat | Per a què servix |
| --- | --- |
| `color` | Configura el color del requadre i les diagonals. |
| `strokeWidth` | Establix el gruix de les línies. |
| `fallbackWidth / fallbackHeight` | S’utilitzen com a mida de reserva quan l’amplària o l’altura no estan limitades; no forcen la mida si el pare ja la delimita. |
| `child` | Permet afegir un widget dins del marcador provisional. |

```dart
const SizedBox(
  width: 300,
  height: 160,
  child: Placeholder(
    color: Colors.teal,
    strokeWidth: 2,
  ),
)
```

`SizedBox` delimita el buit i `Placeholder` l’assenyala. Quan tingues el mapa, substituïx el marcador pel widget definitiu. **No representa automàticament la càrrega d’una imatge**: per a una espera utilitza un indicador com `CircularProgressIndicator` o personalitza `Image.loadingBuilder`.
