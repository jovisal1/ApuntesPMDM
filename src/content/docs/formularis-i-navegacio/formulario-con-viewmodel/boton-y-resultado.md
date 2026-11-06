---
title: "8. Login y detalle del usuario"
sidebar:
  order: 9
---

Login será el único botón del formulario. Primero crearemos su destino: una vista que recibe un modelo de dominio y muestra la ficha completa devuelta por el repositorio. Después conectaremos la acción.

## Crear el detalle del usuario

Crea este archivo completo. El saludo, los apellidos, el teléfono y la localidad proceden de `acceso.usuario`; no son datos reconstruidos a partir de los campos. También mostramos el taller y el recordatorio de esta visita. `StatelessWidget` basta porque la vista solo representa el resultado recibido.


`lib/ui/inscripcion/ui/detalle_usuario_pantalla.dart`

```dart
import 'package:flutter/material.dart';
import '../../../domain/models/datos_acceso.dart';

class DetalleUsuarioPantalla extends StatelessWidget {
  const DetalleUsuarioPantalla({super.key, required this.acceso});
  final DatosAcceso acceso;

  @override
  Widget build(BuildContext context) {
    final usuario = acceso.usuario;
    return Scaffold(
      appBar: AppBar(title: const Text('Detalle del usuario')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Text(
              '¡Hola, ${usuario.nombreCompleto}!',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 16),
            Text('Identificador: ${usuario.id}'),
            Text('Nombre: ${usuario.nombre}'),
            Text('Apellidos: ${usuario.apellidos}'),
            Text('Correo: ${usuario.correo}'),
            Text('Teléfono: ${usuario.telefono}'),
            Text('Localidad: ${usuario.localidad}'),
            const SizedBox(height: 16),
            Text('Taller: ${acceso.taller.titulo}'),
            Text(
              acceso.recordatorio
                  ? 'Recordatorio solicitado (simulado)'
                  : 'Sin recordatorio',
            ),
            const Text(
              'Consulta de datos ficticios. No se guarda la inscripción.',
            ),
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Volver al formulario'),
            ),
          ],
        ),
      ),
    );
  }
}
```

## Validar y consultar antes de navegar

En `inscripcion_pantalla.dart`, añade `import 'detalle_usuario_pantalla.dart';` y este método dentro del `State`, antes de `build`:


```dart
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
```

`validate()` solicita la validación de todos los campos. Si falla, el método termina y los campos muestran sus errores. Si pasa, `login()` consulta la ficha a través del repositorio. Un resultado `null` también detiene el recorrido: el ViewModel ya habrá notificado el error de consulta.

Solo con un resultado correcto, `Navigator.push` añade una ruta. `MaterialPageRoute` describe esa pantalla y su `builder` crea el detalle pasando `resultado` por constructor. La flecha de volver recupera el formulario, que conserva sus datos. No guardamos una sesión ni modificamos la fuente. Al ser una consulta síncrona, no hay `await` ni uso de `context` tras una espera.

## Mostrar el error y un único botón

Añade este bloque al final de `children`, después de la casilla:


```dart
if (vm.error != null)
  Text(vm.error!, semanticsLabel: 'Error: ${vm.error}'),
const SizedBox(height: 16),
FilledButton(
  onPressed: _login,
  child: const Text('Login'),
),
```

La condición solo añade el mensaje cuando existe. `ListenableBuilder` vuelve a construir este bloque al recibir `notifyListeners()`. Al corregir un campo desaparece el error de consulta anterior; Login vuelve a verificar los datos actuales.

Referencias: [Navegar a otra pantalla y volver](https://docs.flutter.dev/cookbook/navigation/navigation-basics) y [FormState.validate](https://api.flutter.dev/flutter/widgets/FormState/validate.html).
