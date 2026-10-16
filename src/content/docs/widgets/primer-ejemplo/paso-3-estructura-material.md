---
title: "Paso 3. Dale estructura Material"
sidebar:
  order: 5
---

Vamos a separar **la configuración de la aplicación** de **la pantalla de entrenamiento**. Sustituye **todo `lib/main.dart`** por este código:

```dart
import 'package:flutter/material.dart';

void main() => runApp(const EntrenamientoApp());

class EntrenamientoApp extends StatelessWidget {
  const EntrenamientoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Contador de vueltas',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
      ),
      home: const PantallaEntrenamiento(),
    );
  }
}

class PantallaEntrenamiento extends StatelessWidget {
  const PantallaEntrenamiento({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Mi entrenamiento')),
      body: const Center(child: Text('¡Vamos a entrenar!')),
    );
  }
}
```

**`MaterialApp` configura la aplicación; `Scaffold` organiza una pantalla; `AppBar` describe su barra superior.** Importar `material.dart` permite utilizar sus clases, pero no crea por sí solo esta estructura.

| Argumento | Qué configura |
| --- | --- |
| `MaterialApp.title` | Un título que el sistema puede utilizar, por ejemplo en la descripción de la aplicación; no dibuja la barra superior. |
| `debugShowCheckedModeBanner` | La visibilidad de la etiqueta de depuración; ocultarla no cambia el modo de ejecución. |
| `theme` | Los estilos comunes. Aquí generamos una paleta a partir de un color semilla. |
| `home` | La pantalla inicial. |
| `Scaffold.appBar` | La barra superior, cuyo `title` sí se ve en pantalla. |
| `Scaffold.body` | El contenido principal. |

Ya no indicamos `textDirection` en cada texto: la estructura de la aplicación proporciona una dirección mediante sus widgets antecesores. El color semilla tampoco toma automáticamente los colores del fondo de pantalla del dispositivo. Consulta las opciones en la [referencia de `MaterialApp`](https://api.flutter.dev/flutter/material/MaterialApp-class.html).
