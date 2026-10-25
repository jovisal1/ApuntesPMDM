---
title: "7. Completar la pantalla"
sidebar:
  order: 8
---

En los pasos anteriores hemos preparado los datos, las reglas, la previsualización, los controladores y el foco. Ahora vamos a reunirlos en una única versión de `InscripcionPantalla` para comprobar cómo trabajan juntos.

Sustituiremos solo `inscripcion_pantalla.dart`. Conservaremos el ViewModel que has completado, `InscripcionEjemploPantalla` y la entrada del catálogo. Revisa cómo cada campo se conecta a su controlador y validador, y qué método ejecuta cada botón.

:::tip[Qué conseguiremos]
Al terminar podrás abrir el formulario desde el catálogo, rellenarlo, corregir errores, previsualizar los datos y utilizar los botones de lectura y edición.
:::

Sustituye `inscripcion_pantalla.dart` por esta versión, que reúne las piezas anteriores:

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
  final _formKey = GlobalKey<FormState>();

  final _correoFocus = FocusNode();

  late final TextEditingController _nombreController;
  late final TextEditingController _correoController;

  @override
  void initState() {
    super.initState();
    _nombreController = TextEditingController(text: widget.viewModel.nombre);
    _correoController = TextEditingController(text: widget.viewModel.correo);
    _nombreController.addListener(_actualizarNombre);
    _correoController.addListener(_actualizarCorreo);
  }

  void _actualizarNombre() {
    final texto = _nombreController.text;
    if (texto != widget.viewModel.nombre) {
      widget.viewModel.cambiarNombre(texto);
    }
  }

  void _actualizarCorreo() {
    final texto = _correoController.text;
    if (texto != widget.viewModel.correo) {
      widget.viewModel.cambiarCorreo(texto);
    }
  }

  @override
  void dispose() {
    _nombreController.dispose();
    _correoController.dispose();
    _correoFocus.dispose();
    super.dispose();
  }

  void _leerCorreo() {
    final correo = _correoController.text;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(correo.isEmpty ? 'Correo vacío' : correo)),
    );
  }

  void _previsualizar() {
    FocusScope.of(context).unfocus();
    if (_formKey.currentState!.validate()) {
      widget.viewModel.previsualizar();
    }
  }

  @override
  Widget build(BuildContext context) {
    final viewModel = widget.viewModel;
    return Scaffold(
      appBar: AppBar(title: const Text('Inscripción')),
      body: SafeArea(
        child: ListenableBuilder(
          listenable: viewModel,
          builder: (context, _) => Form(
            key: _formKey,
            autovalidateMode: AutovalidateMode.onUserInteraction,
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                TextFormField(
                  controller: _nombreController,
                  autofocus: true,
                  decoration: const InputDecoration(
                    labelText: 'Nombre',
                    hintText: 'Por ejemplo, Ana',
                    helperText: 'Escribe al menos dos caracteres',
                    prefixIcon: Icon(Icons.person_outline),
                    border: OutlineInputBorder(),
                  ),
                  textInputAction: TextInputAction.next,
                  onFieldSubmitted: (_) => _correoFocus.requestFocus(),
                  validator: viewModel.validarNombre,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _correoController,
                  focusNode: _correoFocus,
                  decoration: const InputDecoration(
                    labelText: 'Correo',
                    hintText: 'nombre@centro.es',
                    border: OutlineInputBorder(),
                  ),
                  keyboardType: TextInputType.emailAddress,
                  textInputAction: TextInputAction.done,
                  validator: viewModel.validarCorreo,
                  onFieldSubmitted: (_) => _previsualizar(),
                ),
                const SizedBox(height: 24),
                FilledButton(
                  onPressed: _previsualizar,
                  child: const Text('Previsualizar'),
                ),
                TextButton(
                  onPressed: _leerCorreo,
                  child: const Text('Leer correo'),
                ),
                TextButton(
                  onPressed: () => _correoController.text = 'ana@centro.es',
                  child: const Text('Usar correo de ejemplo'),
                ),
                TextButton(
                  onPressed: () => _correoFocus.requestFocus(),
                  child: const Text('Editar correo'),
                ),
                if (viewModel.resumen != null) ...[
                  const SizedBox(height: 16),
                  Text(viewModel.resumen!),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```
