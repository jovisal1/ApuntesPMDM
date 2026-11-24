---
title: "7. Enlaces directos y errores"
sidebar:
  order: 7
---

Un **enlace directo** (*deep link*) abre la aplicación directamente en un destino, sin pasar por el catálogo: por ejemplo, `/talleres/20` compartido por un compañero. Gracias al mapa de rutas, un enlace directo y un botón producen el mismo resultado: la misma pila, los mismos parámetros y las mismas comprobaciones de `redirect`.

En este paso añadimos una pantalla para las direcciones que no existen y aprendemos a probar enlaces directos.

## Tres situaciones distintas

Antes de crear la pantalla de error conviene distinguir qué es realmente un error de navegación. Una dirección puede no existir, o existir y no tener datos que mostrar:

| Ubicación | ¿Coincide con una ruta? | ¿Hay datos? | Quién responde |
| --- | --- | --- | --- |
| `/no-existe` | No | — | El router, con `errorBuilder`. |
| `/talleres/999` | Sí (`/talleres/:id`) | No hay taller 999 | El ViewModel del detalle: «No existe el taller 999». |
| `/talleres?q=zzz` | Sí (`/talleres`) | Lista vacía | El listado: «No hay talleres para esta búsqueda». |

Solo el primer caso es un error de navegación. Los otros dos son rutas válidas cuyo contenido debe representar la pantalla.

## 1. La pantalla de ruta no encontrada

Esta pantalla se mostrará cuando la dirección no coincida con ninguna ruta del mapa. Es una pantalla normal; de go_router solo usa `context.go` para volver al catálogo.

`lib/ui/navegacion_avanzada/ui/ruta_no_encontrada_pantalla.dart`

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class RutaNoEncontradaPantalla extends StatelessWidget {
  const RutaNoEncontradaPantalla({super.key, required this.ubicacion});
  final String ubicacion;

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Ruta no encontrada')),
    body: Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'La dirección $ubicacion no existe en esta aplicación.',
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            FilledButton(
              onPressed: () => context.go('/'),
              child: const Text('Volver al catálogo'),
            ),
          ],
        ),
      ),
    ),
  );
}
```

Muestra la dirección solicitada y ofrece una salida. No enseña la excepción técnica: eso es información para quien programa, no para quien usa la app.

## 2. Registrar `errorBuilder`

Para que el router use esta pantalla, se la indicamos en su configuración.

En `app_router.dart`, añade el import y la propiedad `errorBuilder` al `GoRouter`, justo después de `redirect`:

```dart
import '../navegacion_avanzada/ui/ruta_no_encontrada_pantalla.dart';
```

```dart
  errorBuilder: (context, state) =>
      RutaNoEncontradaPantalla(ubicacion: state.uri.toString()),
```

`errorBuilder` se usa cuando ninguna ruta coincide con la ubicación. Si no lo declaramos, go_router muestra una página de error genérica. En `state.error` está el detalle técnico, útil para depurar.

`errorBuilder` no sustituye a una buena configuración: si dos rutas tienen el mismo `name` o un `path` está mal escrito, go_router avisa con una excepción al arrancar, y eso se corrige en el código.

## 3. Probar enlaces directos en web

La forma más cómoda de probar enlaces directos es la versión web, porque podemos escribir cualquier dirección en la barra del navegador.

Ejecuta la app en Chrome:

```bash
flutter run -d chrome
```

Por defecto, Flutter web usa la **estrategia de URL con almohadilla**: la ubicación va después de `#`. Con el puerto que indique Flutter, prueba a escribir en la barra de direcciones:

| Dirección | Resultado |
| --- | --- |
| `http://localhost:PUERTO/#/talleres/20` | Detalle de Cerámica con barra inferior y flecha para volver al listado. |
| `http://localhost:PUERTO/#/talleres?q=foto` | Listado filtrado y el buscador con el texto «foto». |
| `http://localhost:PUERTO/#/talleres/999` | «No existe el taller 999». |
| `http://localhost:PUERTO/#/no-existe` | Pantalla de ruta no encontrada. |
| `http://localhost:PUERTO/#/cuenta` | Login, porque al cargar la página no hay sesión. |

Prueba también a recargar y a usar los botones atrás y adelante del navegador: el router recibe esas ubicaciones igual que un enlace y aplica las mismas reglas. Como la sesión vive en memoria, recargar en `/cuenta` lleva de nuevo a Login.

:::note[URL sin almohadilla]
Con `usePathUrlStrategy()` las direcciones quedan como `/talleres/20`, sin `#`. Entonces el **servidor web** también debe estar configurado para devolver la aplicación en cualquier ruta al recargar; eso no lo hace go_router.
:::

## 4. Enlaces directos en Android e iOS

El mapa de rutas ya sabe interpretar `/talleres/20`, pero para que un enlace externo (una web, un correo) abra la app instalada hay que **registrarlo en la plataforma**: App Links en Android y Universal Links en iOS. Declarar un `GoRoute` no registra dominios en el sistema. Esa configuración queda fuera de esta sección; la [guía de enlaces directos de Flutter](https://docs.flutter.dev/ui/navigation/deep-linking) explica los pasos.

Para probar en el móvil sin configurar nada, puedes cambiar temporalmente `initialLocation` a la dirección que quieras comprobar (por ejemplo `'/talleres/20?q=cer'`) y hacer hot restart.

Referencias: [tratamiento de errores](https://pub.dev/documentation/go_router/latest/topics/Error%20handling-topic.html) y [go_router en web](https://pub.dev/documentation/go_router/latest/topics/Web-topic.html).
