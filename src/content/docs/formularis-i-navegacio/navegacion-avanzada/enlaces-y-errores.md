---
title: "7. Enlaces directos y errores"
sidebar:
  order: 7
---

Un enlace directo identifica un destino sin exigir pasar antes por el catálogo. El router puede interpretar `/talleres/20`, pero deben existir la ruta y los datos. La entrada por URL debe producir las mismas comprobaciones que un botón.

## Ruta desconocida y dato inexistente

Son casos diferentes:

- `/no-existe` no coincide con la configuración: `errorBuilder` muestra una salida comprensible.
- `/talleres/999` coincide con el patrón, pero el repositorio no tiene ese identificador: el detalle muestra la ausencia del taller.
- `/talleres?q=zzzz` es un listado válido sin coincidencias: se muestra el estado vacío.

Crea este destino para errores de ruta. No presenta la excepción técnica al usuario; permite regresar al catálogo.


`lib/ui/navegacion_avanzada/ui/ruta_no_encontrada_pantalla.dart`

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class RutaNoEncontradaPantalla extends StatelessWidget {
  const RutaNoEncontradaPantalla({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Ruta no encontrada')),
    body: Center(
      child: FilledButton(
        onPressed: () => context.go('/'),
        child: const Text('Volver al catálogo'),
      ),
    ),
  );
}
```

Añade el import de la vista en `app_router.dart` y, como propiedad del `GoRouter`, `errorBuilder: (context, state) => const RutaNoEncontradaPantalla()`. Un error de programación de las rutas, como nombres duplicados o paths incorrectos, se corrige en el código; no se considera resuelto porque exista una pantalla de error.

## Comprobar en web y móvil

Desde la raíz del catálogo ejecuta `flutter run -d chrome`. Con la estrategia de URL con fragmento, prueba direcciones como `http://localhost:PUERTO/#/talleres/20`; sustituye `PUERTO` por el que muestra Flutter. Entra directamente, copia el enlace y recarga. El detalle debe poder reconstruirse sin `extra`.

Una estrategia sin `#` requiere configurar también el servidor para entregar la aplicación al recargar una ruta. Esa configuración no la realiza `go_router` por sí solo. En Android e iOS, asociar enlaces externos a la app requiere la configuración de plataforma correspondiente; declarar `GoRoute` no registra automáticamente dominios ni esquemas del sistema.

La sesión de este ejemplo solo existe en memoria: recargar `/cuenta` vuelve al login. Es el resultado esperado, no un motivo para pasar la ficha del usuario por la URL. Prueba también atrás y adelante después de entrar, salir y cambiar de sección.

Referencias: [tratamiento de errores](https://pub.dev/documentation/go_router/latest/topics/Error%20handling-topic.html), [web](https://pub.dev/documentation/go_router/latest/topics/Web-topic.html) y [enlaces directos de Flutter](https://docs.flutter.dev/ui/navigation/deep-linking).
