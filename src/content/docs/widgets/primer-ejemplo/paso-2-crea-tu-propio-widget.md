---
title: "Paso 2. Crea tu propio widget"
sidebar:
  order: 4
---

Podemos dar un nombre a esta composición. Sustituye **todo `lib/main.dart`** por:

```dart
import 'package:flutter/material.dart';

void main() => runApp(const EntrenamientoApp());

class EntrenamientoApp extends StatelessWidget {
  const EntrenamientoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        '¡Vamos a entrenar!',
        textDirection: TextDirection.ltr,
      ),
    );
  }
}
```

`EntrenamientoApp` hereda de `StatelessWidget` porque por ahora solo describe un saludo. `build` devuelve el widget que representa su interfaz y `@override` indica que implementamos un método de la clase base. La función flecha de `main` es una forma abreviada de escribir una única expresión.

El constructor `const EntrenamientoApp({super.key})` permite crear instancias constantes y pasar la clave opcional al constructor de la clase base. **`key` ayuda a Flutter a identificar elementos al actualizar el árbol**; no es un identificador para buscar controles como en HTML. Si la omites, normalmente su valor es `null`: Flutter no genera una `Key` por ti.

### Qué representa BuildContext

`context` representa **la ubicación de este widget en el árbol**. Permite consultar información proporcionada por sus antecesores, como el tema mediante `Theme.of(context)`. No contiene por sí mismo todas las variables de la aplicación.

Esto explica una regla práctica: un contexto puede consultar lo que hay por encima de él, pero no un widget que acabamos de devolver por debajo. Al separar la aplicación y su pantalla en el siguiente paso, el contexto de la pantalla quedará bajo `MaterialApp`.

### Herramientas del editor

Con el cursor sobre un widget, abre las acciones de código con la bombilla o `Ctrl + .`:

| Acción | Qué facilita |
| --- | --- |
| **Wrap with Center / Column** | Envuelve una pieza en otro widget. |
| **Extract Widget** | Convierte una parte del árbol en una clase con nombre. |
| **Convert to StatefulWidget** | Genera la separación entre widget y estado. |

Las extensiones también ofrecen plantillas al escribir prefijos como `stless` o `stful`; los nombres disponibles dependen de las extensiones instaladas. Revisa el resultado generado: debes entender el constructor y completar `build`. Si aparece `throw UnimplementedError()`, todavía falta implementar la interfaz.
