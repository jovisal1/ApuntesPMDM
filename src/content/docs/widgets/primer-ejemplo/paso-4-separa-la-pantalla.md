---
title: "Paso 4. Separa la pantalla en un archivo"
sidebar:
  order: 6
---

Crea `lib/presentation/screens/pantalla_entrenamiento.dart`. **Mueve a ese archivo la clase `PantallaEntrenamiento` del paso anterior**, junto con este import al principio:

```dart
import 'package:flutter/material.dart';
```

En `lib/main.dart`, elimina la clase que has movido y añade:

```dart
import 'package:contador_vueltas/presentation/screens/pantalla_entrenamiento.dart';
```

La estructura queda así:

```text
lib/
├── main.dart
└── presentation/
    └── screens/
        └── pantalla_entrenamiento.dart
```

En un import `package:`, `contador_vueltas` es el nombre declarado en `pubspec.yaml` y la ruta siguiente comienza dentro de `lib`, por eso no escribimos `lib/`. Cada archivo importa las bibliotecas que utiliza.

**`main.dart` conserva `EntrenamientoApp` y `MaterialApp`; la pantalla conserva `Scaffold`.** La carpeta `presentation/screens` agrupa la interfaz, pero crearla por sí sola no implementa una arquitectura completa. Ejecuta de nuevo: el resultado visual debe ser el mismo.
