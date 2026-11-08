---
title: "9. Completar la pantalla"
sidebar:
  order: 10
---

Reunim el mateix formulari en una versió completa amb una presentació més cuidada. Conserva data, domain, ViewModel, detall i muntatge; substituïx únicament este fitxer. Login és l’acció principal i Limpiar la secundària.

## Composició visual

La capçalera té una icona i dos nivells de text. La targeta separa els controls del fons; els camps compartixen vores arredonides, icones i farciment. `_decoracion` retorna una configuració `InputDecoration`, evitant repetir-la en cada camp. Els colors es lligen del tema per a conservar el contrast dels seus parells de superfície i text.

`ConstrainedBox(maxWidth: 520)` evita camps excessivament amples en tauleta. `SingleChildScrollView` permet recórrer el contingut quan apareix el teclat o augmenta la grandària del text. La `Column` interior no conté `Expanded` ni altures fixes: camps, errors i botons poden créixer. La icona circular i la targeta són decisions visuals d’esta vista, sense dades de la font.

`Semantics(liveRegion: true)` marca l’error de consulta perquè les ajudes d’accessibilitat puguen anunciar-ne l’actualització. Els errors individuals continuen mostrant-se amb els validadors.

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
  GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool _intentoLogin = false;
  bool _limpiando = false;
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
    if (!_limpiando && _nombreController.text != widget.viewModel.nombre) {
      widget.viewModel.cambiarNombre(_nombreController.text);
    }
  }

  void _actualizarCorreo() {
    if (!_limpiando && _correoController.text != widget.viewModel.correo) {
      widget.viewModel.cambiarCorreo(_correoController.text);
    }
  }

  @override
  void dispose() {
    _nombreController.dispose();
    _correoController.dispose();
    super.dispose();
  }

  void _login() {
    setState(() => _intentoLogin = true);
    if (!(_formKey.currentState?.validate() ?? false)) return;
    final resultado = widget.viewModel.login();
    if (resultado == null) return;
    Navigator.of(context).push<void>(
      MaterialPageRoute<void>(
        builder: (_) => DetalleUsuarioPantalla(acceso: resultado),
      ),
    );
  }

  void _limpiar() {
    _limpiando = true;
    _nombreController.clear();
    _correoController.clear();
    widget.viewModel.limpiar();
    setState(() {
      _intentoLogin = false;
      _formKey = GlobalKey<FormState>();
    });
    _limpiando = false;
  }

  InputDecoration _decoracion(String etiqueta, IconData icono) {
    return InputDecoration(
      labelText: etiqueta,
      prefixIcon: Icon(icono),
      filled: true,
      fillColor: Theme.of(context).colorScheme.surfaceContainerHighest,
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
      errorMaxLines: 3,
    );
  }

  @override
  Widget build(BuildContext context) {
    final vm = widget.viewModel;
    final colores = Theme.of(context).colorScheme;
    return Scaffold(
      backgroundColor: colores.surfaceContainerLowest,
      appBar: AppBar(title: const Text('Acceso a talleres')),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 520),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  CircleAvatar(
                    radius: 30,
                    backgroundColor: colores.primaryContainer,
                    child: Icon(
                      Icons.school_outlined,
                      size: 30,
                      color: colores.onPrimaryContainer,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Tu próximo taller',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Completa tus datos y elige una actividad.',
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),
                  Card(
                    margin: EdgeInsets.zero,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(24),
                      side: BorderSide(color: colores.outlineVariant),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(24),
                      child: ListenableBuilder(
                        listenable: vm,
                        builder: (context, _) => Form(
                          key: _formKey,
                          autovalidateMode: _intentoLogin
                              ? AutovalidateMode.onUserInteraction
                              : AutovalidateMode.disabled,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              Text(
                                'Datos de acceso',
                                style: Theme.of(context).textTheme.titleLarge,
                              ),
                              const SizedBox(height: 8),
                              const Text(
                                'Demostración con usuarios ficticios.',
                              ),
                              const SizedBox(height: 24),
                              TextFormField(
                                controller: _nombreController,
                                decoration: _decoracion(
                                  'Nombre',
                                  Icons.person_outline,
                                ),
                                validator: vm.validarNombre,
                              ),
                              const SizedBox(height: 20),
                              TextFormField(
                                controller: _correoController,
                                decoration: _decoracion(
                                  'Correo',
                                  Icons.email_outlined,
                                ),
                                keyboardType: TextInputType.emailAddress,
                                validator: vm.validarCorreo,
                              ),
                              const SizedBox(height: 20),
                              DropdownButtonFormField<String>(
                                initialValue: vm.tallerId,
                                isExpanded: true,
                                decoration: _decoracion(
                                  'Taller',
                                  Icons.palette_outlined,
                                ),
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
                              const SizedBox(height: 12),
                              CheckboxListTile(
                                contentPadding: EdgeInsets.zero,
                                controlAffinity:
                                    ListTileControlAffinity.leading,
                                title: const Text('Quiero un recordatorio'),
                                subtitle: const Text('Opcional y simulado.'),
                                value: vm.recordatorio,
                                onChanged: (valor) =>
                                    vm.cambiarRecordatorio(valor ?? false),
                              ),
                              if (vm.error != null) ...[
                                const SizedBox(height: 12),
                                Semantics(
                                  liveRegion: true,
                                  child: Text(
                                    vm.error!,
                                    style: TextStyle(color: colores.error),
                                  ),
                                ),
                              ],
                              const SizedBox(height: 24),
                              FilledButton.icon(
                                onPressed: _login,
                                icon: const Icon(Icons.login),
                                label: const Padding(
                                  padding: EdgeInsets.symmetric(vertical: 14),
                                  child: Text('Login'),
                                ),
                              ),
                              const SizedBox(height: 8),
                              OutlinedButton.icon(
                                onPressed: _limpiar,
                                icon: const Icon(Icons.restart_alt),
                                label: const Padding(
                                  padding: EdgeInsets.symmetric(vertical: 12),
                                  child: Text('Limpiar'),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Datos de prueba: Ana / ana@centro.es\n'
                    'o Pau / pau@centro.es',
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
```

Les fitxes i els tallers procedixen del repositori; el text de dades de prova només indica com provar. Continua amb [les comprovacions](../probar-el-formulario/).
