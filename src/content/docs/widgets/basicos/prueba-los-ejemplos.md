---
title: "Un lugar para probar los ejemplos"
sidebar:
  order: 2
---

Los primeros bloques son **fragmentos de interfaz**. Para ejecutarlos, pega este programa en `lib/main.dart` o en [DartPad](https://dartpad.dev/) y sustituye `const Text('Mi primera ruta')` por el widget que quieras probar:

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: PruebaWidgets()));

class PruebaWidgets extends StatelessWidget {
  const PruebaWidgets({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Widgets básicos')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: const Text('Mi primera ruta'),
        ),
      ),
    );
  }
}
```

`MaterialApp` configura la aplicación Material y `Scaffold` organiza la pantalla. `Center` centra su hijo y `Padding` deja espacio alrededor. El `context` disponible en `build` permite consultar el tema o localizar servicios del árbol, como veremos al mostrar mensajes.

:::tip[Lee los argumentos por su función 🔎]
En `Text('Mi primera ruta')`, el texto es un argumento posicional. En `Icon(Icons.terrain, size: 32)`, `size` es un argumento con nombre. `child` recibe un solo widget; `children`, una lista. Usa `const` cuando la configuración sea constante; si necesita un valor calculado en ejecución, como `Theme.of(context)`, omítelo en esa expresión.
:::
