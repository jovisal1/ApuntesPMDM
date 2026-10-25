---
title: "2. Arreplegar el nom i el correu"
sidebar:
  order: 3
---

La pantalla ja permet escriure un nom. Ara afegirem Correo i connectarem els dos camps amb un objecte que conserve els valors. Necessitem eixes dades per a poder comprovar-les i elaborar el resum més avant.

Crearem `InscripcionViewModel` amb dos valors i dos mètodes per a actualitzar-los. Després connectarem `onChanged` de cada camp i prepararem `InscripcionEjemploPantalla`, que obrirà el formulari amb el seu ViewModel des del catàleg.

:::tip[Què aconseguirem]
En acabar tindràs dos camps connectats a les seues dades. Encara no mostrarem errors ni un resum: això arribarà en els passos següents.
:::

Crea `lib/ui/inscripcion/view_models/inscripcion_viewmodel.dart` amb esta classe inicial:

```dart
import 'package:flutter/foundation.dart';

class InscripcionViewModel extends ChangeNotifier {
  String _nombre = '';
  String _correo = '';

  String get nombre => _nombre;
  String get correo => _correo;

  void cambiarNombre(String valor) {
    _nombre = valor;
    notifyListeners();
  }

  void cambiarCorreo(String valor) {
    _correo = valor;
    notifyListeners();
  }

}
```

A diferència de `guardarDatos(borrador)` de l’exemple anterior, `cambiarNombre` i `cambiarCorreo` actualitzen una dada en cada edició i notifiquen el canvi. Esta connexió permetrà descartar el resum tan prompte com es modifique un camp.

En `InscripcionPantalla`, importa esta classe i substituïx el constructor per:

```dart
// Import junto al de material.dart:
import '../view_models/inscripcion_viewmodel.dart';

// Dentro de InscripcionPantalla:
const InscripcionPantalla({super.key, required this.viewModel});
final InscripcionViewModel viewModel;
```

Substituïx el camp Nombre de `children` per estos dos camps. `onChanged` rep el text cada vegada que s’edita i crida el mètode corresponent:

```dart
TextFormField(
  initialValue: widget.viewModel.nombre,
  decoration: const InputDecoration(labelText: 'Nombre'),
  textInputAction: TextInputAction.next,
  onChanged: widget.viewModel.cambiarNombre,
),
const SizedBox(height: 16),
TextFormField(
  initialValue: widget.viewModel.correo,
  decoration: const InputDecoration(labelText: 'Correo'),
  keyboardType: TextInputType.emailAddress,
  textInputAction: TextInputAction.done,
  onChanged: widget.viewModel.cambiarCorreo,
),
```

El correu usa `TextInputType.emailAddress`; la regla de validació s’afegirà en el pas 3. Conserva, si ja l’has aplicada, la decoració completa de Nombre.

## 🧩 Preparar l’exemple que obri el catàleg

Ara el formulari exigix un ViewModel. Crea `lib/ui/inscripcion/ui/inscripcion_ejemplo_pantalla.dart` amb este widget, que el crea una vegada i l’entrega al formulari:

```dart
import 'package:flutter/material.dart';

import '../view_models/inscripcion_viewmodel.dart';
import 'inscripcion_pantalla.dart';

class InscripcionEjemploPantalla extends StatefulWidget {
  const InscripcionEjemploPantalla({super.key});

  @override
  State<InscripcionEjemploPantalla> createState() =>
      _InscripcionEjemploPantallaState();
}

class _InscripcionEjemploPantallaState
    extends State<InscripcionEjemploPantalla> {
  final _viewModel = InscripcionViewModel();

  @override
  void dispose() {
    _viewModel.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return InscripcionPantalla(viewModel: _viewModel);
  }
}
```

En `catalogo_pantalla.dart`, substituïx l’import d’`inscripcion_pantalla.dart` per:

```dart
import '../../inscripcion/ui/inscripcion_ejemplo_pantalla.dart';
```

En l’entrada «Formulario de inscripción», canvia únicament la destinació:

```dart
builder: (_) => const InscripcionEjemploPantalla(),
```

Conserva la resta de l’entrada i `main.dart`. En obrir l’exemple es crea el seu ViewModel; en eixir definitivament de la ruta s’allibera amb `dispose()`. Si tornes a obrir-lo, comença una inscripció nova. Prova els dos camps des del catàleg.
