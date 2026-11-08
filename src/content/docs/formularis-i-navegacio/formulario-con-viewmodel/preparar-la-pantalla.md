---
title: "3. Preparar la vista y sus dependencias"
sidebar:
  order: 4
---

La vista muestra los campos y comunica los cambios al ViewModel recibido. Empieza con este archivo completo: por ahora puedes escribir, pero todavía no hay acción de Login. Añadiremos sus piezas en los pasos siguientes, sin crear otra pantalla de formulario.

`ListenableBuilder` escucha el `ChangeNotifier` y ejecuta su `builder` cuando recibe un aviso. La clave identifica el estado del `Form`. `ListView` permite desplazar el contenido cuando aparece el teclado o falta altura.

`lib/ui/inscripcion/ui/inscripcion_pantalla.dart`

```dart
import 'package:flutter/material.dart';
import '../view_models/inscripcion_viewmodel.dart';

class InscripcionPantalla extends StatefulWidget {
  const InscripcionPantalla({super.key, required this.viewModel});
  final InscripcionViewModel viewModel;

  @override
  State<InscripcionPantalla> createState() => _InscripcionPantallaState();
}

class _InscripcionPantallaState extends State<InscripcionPantalla> {
  GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    final vm = widget.viewModel;
    return Scaffold(
      appBar: AppBar(title: const Text('Login de demostración')),
      body: SafeArea(
        child: ListenableBuilder(
          listenable: vm,
          builder: (context, _) => Form(
            key: _formKey,
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                TextFormField(
                  initialValue: vm.nombre,
                  decoration: const InputDecoration(
                    labelText: 'Nombre',
                    prefixIcon: Icon(Icons.person_outline),
                    filled: true,
                    border: OutlineInputBorder(),
                    errorMaxLines: 3,
                  ),
                  onChanged: vm.cambiarNombre,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  initialValue: vm.correo,
                  decoration: const InputDecoration(
                    labelText: 'Correo',
                    prefixIcon: Icon(Icons.email_outlined),
                    filled: true,
                    border: OutlineInputBorder(),
                    errorMaxLines: 3,
                  ),
                  keyboardType: TextInputType.emailAddress,
                  onChanged: vm.cambiarCorreo,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```

## Crear las dependencias una vez

Crea también este archivo completo. Es la **raíz de composición** del ejemplo: aquí sí importamos las implementaciones de `data` para conectar servicio, repositorio y ViewModel. Las vistas de formulario y detalle no realizan ese montaje.

En `initState` se crea el ViewModel una vez por visita. `late final` permite asignarlo durante esa inicialización y evita reemplazarlo después. `dispose` lo libera al salir de la ruta; no lo creamos en cada `build`.


`lib/ui/inscripcion/ui/inscripcion_ejemplo_pantalla.dart`

```dart
import 'package:flutter/material.dart';
import '../../../data/repositories/inscripciones_local_repository.dart';
import '../../../data/services/inscripciones_local_service.dart';
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
  late final InscripcionViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    final repository = InscripcionesLocalRepository(
      const InscripcionesLocalService(),
    );
    _viewModel = InscripcionViewModel(repository);
  }

  @override
  void dispose() {
    _viewModel.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) =>
      InscripcionPantalla(viewModel: _viewModel);
}
```

## Abrir desde el catálogo

En `lib/ui/catalogo/ui/catalogo_pantalla.dart`, añade este import y esta entrada a su `ListView`, conservando las anteriores. Si ya tenías la entrada del formulario, sustituye esa entrada y su import en lugar de duplicarlos. Mantén `main.dart`.


```dart
import '../../inscripcion/ui/inscripcion_ejemplo_pantalla.dart';
```


```dart
ListTile(
  leading: const Icon(Icons.login),
  title: const Text('Login de demostración'),
  onTap: () => Navigator.of(context).push<void>(
    MaterialPageRoute<void>(
      builder: (_) => const InscripcionEjemploPantalla(),
    ),
  ),
),
```

Desde la raíz de `catalogo_widgets`, ejecuta `flutter run`, abre Login de demostración y prueba la escritura. La navegación del catálogo ya usa `Navigator.push`: añade una pantalla sobre la anterior y permite volver. En el paso 7 aplicaremos el mismo mecanismo al detalle.

Los campos ya tienen etiqueta, icono, fondo y borde. En el montaje final añadiremos una tarjeta de anchura limitada y una cabecera, manteniendo estas responsabilidades en la vista.
