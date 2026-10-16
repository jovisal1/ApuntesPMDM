---
title: "Pas 4. Separa la pantalla en un arxiu"
sidebar:
  order: 6
---

Crea `lib/presentation/screens/pantalla_entrenament.dart`. **Mou a eixe arxiu la classe `PantallaEntrenament` del pas anterior**, juntament amb este import al principi:

```dart
import 'package:flutter/material.dart';
```

En `lib/main.dart`, elimina la classe que has mogut i afig:

```dart
import 'package:contador_vueltas/presentation/screens/pantalla_entrenament.dart';
```

L’estructura queda així:

```text
lib/
├── main.dart
└── presentation/
    └── screens/
        └── pantalla_entrenament.dart
```

En un import `package:`, `contador_vueltas` és el nom declarat en `pubspec.yaml` i la ruta següent comença dins de `lib`, per això no escrivim `lib/`. Cada arxiu importa les biblioteques que utilitza.

**`main.dart` conserva `EntrenamentApp` i `MaterialApp`; la pantalla conserva `Scaffold`.** La carpeta `presentation/screens` agrupa la interfície, però crear-la per si sola no implementa una arquitectura completa. Executa de nou: el resultat visual ha de ser el mateix.
