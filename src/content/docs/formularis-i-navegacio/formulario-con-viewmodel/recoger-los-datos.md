---
title: "2. Recoger el nombre y el correo"
sidebar:
  order: 3
---

La pantalla ya permite escribir un nombre. Ahora añadiremos Correo y conectaremos ambos campos con un objeto que conserve sus valores. Necesitamos esos datos para poder comprobarlos y elaborar el resumen más adelante.

Crearemos `InscripcionViewModel` con dos valores y dos métodos para actualizarlos. Después conectaremos `onChanged` de cada campo y prepararemos `InscripcionEjemploPantalla`, que abrirá el formulario con su ViewModel desde el catálogo.

:::tip[Qué conseguiremos]
Al terminar tendrás dos campos conectados a sus datos. Todavía no mostraremos errores ni un resumen: eso llegará en los siguientes pasos.
:::

Crea `lib/ui/inscripcion/view_models/inscripcion_viewmodel.dart` con esta clase inicial:

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

A diferencia de `guardarDatos(borrador)` del ejemplo anterior, `cambiarNombre` y `cambiarCorreo` actualizan un dato en cada edición y notifican el cambio. Esta conexión permitirá descartar el resumen en cuanto se modifique un campo.

En `InscripcionPantalla`, importa esta clase y sustituye el constructor por:

```dart
// Import junto al de material.dart:
import '../view_models/inscripcion_viewmodel.dart';

// Dentro de InscripcionPantalla:
const InscripcionPantalla({super.key, required this.viewModel});
final InscripcionViewModel viewModel;
```

Sustituye el campo Nombre de `children` por estos dos campos. `onChanged` recibe el texto cada vez que se edita y llama al método correspondiente:

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

El correo utiliza `TextInputType.emailAddress`; su regla de validación se añadirá en el paso 3. Conserva, si ya la has aplicado, la decoración completa de Nombre.

## 🧩 Preparar el ejemplo que abre el catálogo

Ahora el formulario exige un ViewModel. Crea `lib/ui/inscripcion/ui/inscripcion_ejemplo_pantalla.dart` con este widget, que lo crea una vez y lo entrega al formulario:

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

En `catalogo_pantalla.dart`, sustituye el import de `inscripcion_pantalla.dart` por:

```dart
import '../../inscripcion/ui/inscripcion_ejemplo_pantalla.dart';
```

En la entrada «Formulario de inscripción», cambia únicamente el destino:

```dart
builder: (_) => const InscripcionEjemploPantalla(),
```

Conserva el resto de la entrada y `main.dart`. Al abrir el ejemplo se crea su ViewModel; al salir definitivamente de la ruta se libera con `dispose()`. Si vuelves a abrirlo, empieza una inscripción nueva. Prueba ambos campos desde el catálogo.
