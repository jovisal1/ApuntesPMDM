---
title: "Un lloc per a provar els exemples"
sidebar:
  order: 2
---

Els primers blocs són **fragments d’interfície**. Per a executar-los, apega este programa en `lib/main.dart` o en [DartPad](https://dartpad.dev/) i substituïx `const Text('La meua primera ruta')` pel widget que vulgues provar:

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: ProvaWidgets()));

class ProvaWidgets extends StatelessWidget {
  const ProvaWidgets({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Widgets bàsics')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: const Text('La meua primera ruta'),
        ),
      ),
    );
  }
}
```

`MaterialApp` configura l’aplicació Material i `Scaffold` organitza la pantalla. `Center` centra el fill i `Padding` deixa espai al voltant. El `context` disponible en `build` permet consultar el tema o localitzar servicis de l’arbre, com veurem en mostrar missatges.

:::tip[Llig els arguments per la seua funció 🔎]
En `Text('La meua primera ruta')`, el text és un argument posicional. En `Icon(Icons.terrain, size: 32)`, `size` és un argument amb nom. `child` rep un sol widget; `children`, una llista. Utilitza `const` quan la configuració siga constant; si necessita un valor calculat en execució, com `Theme.of(context)`, omet-lo en eixa expressió.
:::
