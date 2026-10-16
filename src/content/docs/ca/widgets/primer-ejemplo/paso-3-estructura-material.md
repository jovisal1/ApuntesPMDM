---
title: "Pas 3. Dona-li estructura Material"
sidebar:
  order: 5
---

Separarem **la configuració de l’aplicació** de **la pantalla d’entrenament**. Substituïx **tot `lib/main.dart`** per este codi:

```dart
import 'package:flutter/material.dart';

void main() => runApp(const EntrenamentApp());

class EntrenamentApp extends StatelessWidget {
  const EntrenamentApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Comptador de voltes',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
      ),
      home: const PantallaEntrenament(),
    );
  }
}

class PantallaEntrenament extends StatelessWidget {
  const PantallaEntrenament({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('El meu entrenament')),
      body: const Center(child: Text('Anem a entrenar!')),
    );
  }
}
```

**`MaterialApp` configura l’aplicació; `Scaffold` organitza una pantalla; `AppBar` descriu la barra superior.** Importar `material.dart` permet utilitzar les classes, però no crea per si sol esta estructura.

| Argument | Què configura |
| --- | --- |
| `MaterialApp.title` | Un títol que el sistema pot utilitzar, per exemple en la descripció de l’aplicació; no dibuixa la barra superior. |
| `debugShowCheckedModeBanner` | La visibilitat de l’etiqueta de depuració; ocultar-la no canvia el mode d’execució. |
| `theme` | Els estils comuns. Ací generem una paleta a partir d’un color llavor. |
| `home` | La pantalla inicial. |
| `Scaffold.appBar` | La barra superior, el `title` de la qual sí que es veu en pantalla. |
| `Scaffold.body` | El contingut principal. |

Ja no indiquem `textDirection` en cada text: l’estructura de l’aplicació proporciona una direcció mitjançant els widgets antecessors. El color llavor tampoc pren automàticament els colors del fons de pantalla del dispositiu. Consulta les opcions en la [referència de `MaterialApp`](https://api.flutter.dev/flutter/material/MaterialApp-class.html).
