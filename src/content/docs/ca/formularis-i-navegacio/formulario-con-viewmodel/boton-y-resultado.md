---
title: "7. Login i detall de l’usuari"
sidebar:
  order: 8
---

Login serà l’acció principal del formulari. Primer crearem la destinació: una vista que rep un model de domini i mostra la fitxa completa retornada pel repositori. Després connectarem l’acció.

## Crear el detall de l’usuari

Crea este fitxer complet. La salutació, els cognoms, el telèfon i la localitat procedixen d’`acceso.usuario`; no són dades reconstruïdes a partir dels camps. També mostrem el taller i el recordatori d’esta visita. `StatelessWidget` basta perquè la vista només representa el resultat rebut.


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

## Validar i consultar abans de navegar

En `inscripcion_pantalla.dart`, afegix `import 'detalle_usuario_pantalla.dart';` i este mètode dins del `State`, abans de `build`:


```dart
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
```

`setState` activa l’actualització automàtica dels errors després d’este primer intent. `validate()` demana la validació de tots els camps. Si falla, el mètode acaba i els camps mostren els errors. Si passa, `login()` consulta la fitxa a través del repositori. Un resultat `null` també deté el recorregut: el ViewModel ja haurà notificat l’error de consulta.

Només amb un resultat correcte, `Navigator.push` afegix una ruta. `MaterialPageRoute` descriu eixa pantalla i el seu `builder` crea el detall passant `resultado` per constructor. La fletxa de tornar recupera el formulari, que conserva les dades. No guardem una sessió ni modifiquem la font. Com que és una consulta síncrona, no hi ha `await` ni ús de `context` després d’una espera.

## Mostrar l’error i el botó Login

Afegix este bloc al final de `children`, després de la casella:


```dart
if (vm.error != null)
  Text(vm.error!, semanticsLabel: 'Error: ${vm.error}'),
const SizedBox(height: 16),
FilledButton(
  onPressed: _login,
  child: const Text('Login'),
),
```

La condició només afegix el missatge quan existix. `ListenableBuilder` torna a construir este bloc en rebre `notifyListeners()`. En corregir un camp desapareix l’error de consulta anterior; Login torna a verificar les dades actuals.

Referències: [Navegar a una altra pantalla i tornar](https://docs.flutter.dev/cookbook/navigation/navigation-basics) i [FormState.validate](https://api.flutter.dev/flutter/widgets/FormState/validate.html).

Continua amb [Netejar el formulari](../limpiar-el-formulario/) per a afegir l’acció secundària.
