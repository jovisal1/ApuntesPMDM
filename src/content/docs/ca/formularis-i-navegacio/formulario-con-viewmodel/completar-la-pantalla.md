---
title: "9. Completar la pantalla"
sidebar:
  order: 10
---

Esta és la mateixa pantalla que hem construït pas a pas, reunida en un fitxer complet. Substituïx `inscripcion_pantalla.dart` per esta versió per a contrastar el muntatge. Conserva els fitxers de `data`, `domain`, el ViewModel, el detall i l’arrel de composició dels passos anteriors; no cal una altra versió del formulari.

Comprova el recorregut: controladors → ViewModel → contracte → repositori → fitxa de domini → detall. La vista conserva únicament els recursos visuals i la navegació. Només existix un `FilledButton`, Login.


`lib/ui/inscripcion/ui/inscripcion_pantalla.dart`

```dart
import 'package:flutter/material.dart';
import '../view_models/inscripcion_viewmodel.dart';
import 'detalle_usuario_pantalla.dart';

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
    if (_nombreController.text != widget.viewModel.nombre) {
      widget.viewModel.cambiarNombre(_nombreController.text);
    }
  }

  void _actualizarCorreo() {
    if (_correoController.text != widget.viewModel.correo) {
      widget.viewModel.cambiarCorreo(_correoController.text);
    }
  }

  @override
  void dispose() {
    _nombreController.dispose();
    _correoController.dispose();
    _correoFocus.dispose();
    super.dispose();
  }

  void _login() {
    FocusScope.of(context).unfocus();
    if (!(_formKey.currentState?.validate() ?? false)) return;
    final resultado = widget.viewModel.login();
    if (resultado == null) return;
    Navigator.of(context).push<void>(
      MaterialPageRoute<void>(
        builder: (_) => DetalleUsuarioPantalla(acceso: resultado),
      ),
    );
  }

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
            autovalidateMode: AutovalidateMode.onUserInteraction,
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                const Text('Prueba Ana / ana@centro.es o Pau / pau@centro.es'),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _nombreController,
                  decoration: const InputDecoration(labelText: 'Nombre'),
                  textInputAction: TextInputAction.next,
                  onFieldSubmitted: (_) => _correoFocus.requestFocus(),
                  validator: vm.validarNombre,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _correoController,
                  focusNode: _correoFocus,
                  decoration: const InputDecoration(labelText: 'Correo'),
                  keyboardType: TextInputType.emailAddress,
                  textInputAction: TextInputAction.done,
                  validator: vm.validarCorreo,
                  onFieldSubmitted: (_) => FocusScope.of(context).unfocus(),
                ),
                const SizedBox(height: 16),
                DropdownButtonFormField<String>(
                  initialValue: vm.tallerId,
                  isExpanded: true,
                  decoration: const InputDecoration(labelText: 'Taller'),
                  items: vm.talleres
                      .map(
                        (taller) => DropdownMenuItem<String>(
                          value: taller.id,
                          child: Text(taller.titulo),
                        ),
                      )
                      .toList(),
                  onChanged: vm.cambiarTaller,
                  validator: vm.validarTaller,
                ),
                CheckboxListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Quiero recibir un recordatorio'),
                  subtitle: const Text(
                    'Opcional. No se enviará ningún mensaje.',
                  ),
                  value: vm.recordatorio,
                  onChanged: (valor) => vm.cambiarRecordatorio(valor ?? false),
                ),
                if (vm.error != null)
                  Text(vm.error!, semanticsLabel: 'Error: ${vm.error}'),
                const SizedBox(height: 16),
                FilledButton(onPressed: _login, child: const Text('Login')),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```

Les credencials de mostra del text d’ajuda només indiquen com provar. Les fitxes personals i les opcions del desplegable no es definixen ací: procedixen del repositori. Continua amb [les comprovacions](../probar-el-formulario/).
