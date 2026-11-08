---
title: "3. Preparar la vista i les seues dependències"
sidebar:
  order: 4
---

La vista mostra els camps i comunica els canvis al ViewModel rebut. Comença amb este fitxer complet: de moment pots escriure, però encara no hi ha acció de Login. Afegirem les peces en els passos següents, sense crear una altra pantalla de formulari.

`ListenableBuilder` escolta el `ChangeNotifier` i executa el seu `builder` quan rep un avís. La clau identifica l’estat del `Form`. `ListView` permet desplaçar el contingut quan apareix el teclat o falta altura.

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

## Crear les dependències una vegada

Crea també este fitxer complet. És l’**arrel de composició** de l’exemple: ací sí que importem les implementacions de `data` per a connectar servici, repositori i ViewModel. Les vistes de formulari i detall no fan eixe muntatge.

En `initState` es crea el ViewModel una vegada per visita. `late final` permet assignar-lo durant eixa inicialització i evita reemplaçar-lo després. `dispose` l’allibera en eixir de la ruta; no el creem en cada `build`.


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

## Obrir des del catàleg

En `lib/ui/catalogo/ui/catalogo_pantalla.dart`, afegix este import i esta entrada al seu `ListView`, conservant les anteriors. Si ja tenies l’entrada del formulari, substituïx eixa entrada i el seu import en lloc de duplicar-los. Mantín `main.dart`.


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

Des de l’arrel de `catalogo_widgets`, executa `flutter run`, obri Login de demostración i prova l’escriptura. La navegació del catàleg ja utilitza `Navigator.push`: afegix una pantalla sobre l’anterior i permet tornar. En el pas 7 aplicarem el mateix mecanisme al detall.

Els camps ja tenen etiqueta, icona, fons i vora. En el muntatge final afegirem una targeta d’amplària limitada i una capçalera, mantenint estes responsabilitats en la vista.
