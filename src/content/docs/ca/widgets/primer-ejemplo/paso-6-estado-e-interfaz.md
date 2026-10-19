---
title: "Pas 6. Guarda la dada i actualitza la interfície"
sidebar:
  order: 8
---

Podríem intentar declarar `int voltes = 0` dins de `build`, mostrar-lo amb `Text('$voltes')` i incrementar-lo en el botó. Això presenta **dos problemes distints**:

- Canviar una variable no sol·licita per si sol que Flutter reconstruïsca la interfície. La consola pot mostrar un número nou mentre el text continua mostrant l’anterior.
- Una variable local de `build` torna a inicialitzar-se quan s’executa eixe mètode. No és un lloc adequat per a conservar el comptador entre reconstruccions.

Necessitem guardar la dada en un objecte `State` i sol·licitar l’actualització amb `setState`. **Substituïx tot `lib/ui/entrenamiento/ui/pantalla_entrenament.dart`** per esta versió final:

```dart
import 'package:flutter/material.dart';

class PantallaEntrenament extends StatefulWidget {
  const PantallaEntrenament({super.key});

  @override
  State<PantallaEntrenament> createState() => _PantallaEntrenamentState();
}

class _PantallaEntrenamentState extends State<PantallaEntrenament> {
  int _voltes = 0;

  void _registrarVolta() {
    setState(() {
      _voltes++;
    });
    debugPrint('Voltes completades: $_voltes');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('El meu entrenament')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Voltes completades'),
            const SizedBox(height: 12),
            Text('$_voltes', style: const TextStyle(fontSize: 56)),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Registrar una volta',
        onPressed: _registrarVolta,
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

En **`lib/main.dart`**, el contingut final ha de ser:

```dart
import 'package:flutter/material.dart';
import 'package:contador_vueltas/ui/entrenamiento/ui/pantalla_entrenament.dart';

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
```

En canviar de `StatelessWidget` a `StatefulWidget`, fes un **hot restart** per a començar amb la nova estructura. Polsa tres vegades el botó: el número ha de passar per 1, 2 i 3 i coincidir amb els missatges de la consola.

### Què ocorre en cada pulsació

1. `onPressed: _registrarVolta` entrega la funció al botó, sense executar-la durant `build`.
2. La pulsació executa la funció, i el callback de `setState` incrementa `_voltes`.
3. `setState` sol·licita una reconstrucció; `build` llig la nova dada.
4. `Text('$_voltes')` convertix el número en text mitjançant interpolació.

`_voltes` pertany a l’objecte `State`, així que es conserva entre reconstruccions mentre Flutter mantinga eixe estat en l’arbre. El guió baix indica privacitat dins de la biblioteca de Dart. El comptador viu en memòria: no es guarda en tancar l’aplicació.

:::note[Què canvia i què continua sent constant]
`PantallaEntrenament` continua sent una configuració immutable, encara que tinga estat associat. El que és mutable és `_voltes` en `State`. El `Text` que mostra el número no pot ser `const`, però el seu `TextStyle` sí. `EntrenamentApp` pot continuar sent un `StatelessWidget`: no necessita gestionar el comptador.
:::

### Un widget propi que rep dades

També podem extraure el número a un component sense estat propi. Afig esta classe al final de l’arxiu de la pantalla:

```dart
class NumeroVoltes extends StatelessWidget {
  final int valor;

  const NumeroVoltes({super.key, required this.valor});

  @override
  Widget build(BuildContext context) {
    return Text('$valor', style: const TextStyle(fontSize: 56));
  }
}
```

Després substituïx `Text('$_voltes', style: const TextStyle(fontSize: 56))` per `NumeroVoltes(valor: _voltes)`.

`required` obliga a proporcionar el valor i `final` impedix reassignar-lo en eixa instància. **El component pot mostrar un altre número quan el pare li entrega una configuració nova**. No necessita estat propi per a reflectir dades que canvien. El constructor admet `const`, però esta crida utilitza `_voltes`, una dada d’execució, i per això no porta `const`.
