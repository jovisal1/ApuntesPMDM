---
title: "Placeholder: reservar un espacio provisional"
sidebar:
  order: 7
---

Durante el desarrollo quizá ya sepas dónde irá el mapa, pero aún no tengas ese componente. **`Placeholder` dibuja un recuadro con diagonales para hacer visible ese espacio pendiente**:

Documentación oficial: [`Placeholder`](https://api.flutter.dev/flutter/widgets/Placeholder-class.html).

| Propiedad | Para qué sirve |
| --- | --- |
| `color` | Configura el color del recuadro y sus diagonales. |
| `strokeWidth` | Establece el grosor de las líneas. |
| `fallbackWidth / fallbackHeight` | Se utilizan como tamaño de reserva cuando el ancho o la altura no están limitados; no fuerzan el tamaño si el padre ya lo delimita. |
| `child` | Permite añadir un widget dentro del marcador provisional. |

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

`SizedBox` delimita el hueco y `Placeholder` lo señala. Cuando tengas el mapa, sustituye el marcador por el widget definitivo. **No representa automáticamente la carga de una imagen**: para una espera utiliza un indicador como `CircularProgressIndicator` o personaliza `Image.loadingBuilder`.
