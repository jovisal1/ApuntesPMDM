---
title: "3. Navegar entre pantallas"
sidebar:
  order: 3
---

Ya tenemos dos pantallas: el catálogo (`/`) y Ayuda (`/ayuda`). Ahora vamos a probar **dos formas de abrir la misma pantalla** y observar qué ocurre al volver. No añadiremos todavía Talleres ni el login.

En la primera prueba, iremos a Ayuda como destino y ofreceremos un botón para regresar al catálogo. En la segunda, abriremos Ayuda encima del catálogo y devolveremos el mensaje «Consejo leído» al cerrarla. Son pruebas alternativas: cambiaremos el callback de la misma entrada, no crearemos varios botones de acceso.

## 1. Ir a Ayuda con `go`

En `catalogo_pantalla.dart`, el callback de la entrada **Ayuda con go_router** que añadimos en el paso anterior es:

```dart
onTap: () => context.go('/ayuda'),
```

Al pulsar, el router busca `/ayuda` en su configuración y muestra `AyudaPantalla`. Con las dos rutas independientes que tenemos ahora, la pila de páginas pasa del catálogo a Ayuda: **el catálogo no queda debajo como una página a la que hacer `pop`**. El historial del navegador web es un mecanismo distinto.

Para que el usuario pueda regresar, añade este widget a `children` del `ListView` de `AyudaPantalla`, después del interruptor y del consejo condicional. Añade también `import 'package:go_router/go_router.dart';` al principio del archivo:

```dart
FilledButton(
  onPressed: () => context.go('/'),
  child: const Text('Volver al catálogo'),
),
```

Prueba el recorrido: **catálogo → Ayuda → activar el consejo → Volver al catálogo**. Al volver a abrir Ayuda con esta configuración, se crea de nuevo su pantalla y el interruptor empieza desactivado. Más adelante aprenderemos a conservarlo entre pestañas.

## 2. Abrir Ayuda con `push` y devolver una respuesta

Ahora queremos que el catálogo espere una respuesta de Ayuda. `push` añade la pantalla sobre el recorrido actual; al cerrarla con `pop`, reaparece la página anterior. En esta prueba la pila será **catálogo debajo y Ayuda encima**.

En `catalogo_pantalla.dart`, sustituye el `onTap` anterior por este. El import de go_router ya debe estar añadido en esta vista:

```dart
onTap: () async {
  final elegido = await context.push<String>('/ayuda');
  if (!context.mounted || elegido == null) return;
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(elegido)));
},
```

`<String>` indica que esperamos un texto. `await` espera a que Ayuda se cierre, sin bloquear la interfaz. Si vuelve un texto, lo mostramos en una `SnackBar` del catálogo. Si se cierra sin respuesta, recibimos `null`. La comprobación `context.mounted` evita utilizar el contexto si la vista que esperaba ya se ha retirado.

En Ayuda, sustituye el botón de la primera prueba por este:

```dart
FilledButton(
  onPressed: context.canPop() ? () => context.pop('Consejo leído') : null,
  child: const Text('He leído el consejo'),
),
```

`canPop()` comprueba que hay una página anterior. Si la hay, el botón está habilitado: `pop` retira Ayuda y devuelve el texto. Si entramos directamente en `/ayuda` sin una página debajo, se deshabilita este botón de respuesta.

Prueba **catálogo → Ayuda → He leído el consejo**. Debes volver al catálogo y ver «Consejo leído» en una `SnackBar`. El texto no se guarda en los datos ni inicia sesión: solo demuestra cómo una pantalla devuelve un resultado a la que la abrió. `go` no devuelve este tipo de respuesta.

## Elegir la operación según el recorrido

| Operación | Resultado en estas pruebas |
| --- | --- |
| `go('/ayuda')` | Configura las páginas que corresponden a la ubicación de Ayuda. |
| `go('/')` | Configura el destino del catálogo. |
| `push<String>('/ayuda')` | Abre Ayuda sobre el catálogo y espera un texto al cerrarla. |
| `pop('Consejo leído')` | Cierra Ayuda y entrega ese texto a quien hizo `push`. |
| `canPop()` | Comprueba si hay una página que podamos retirar. |
| `goNamed('ayuda')` | Busca la ruta registrada con `name: 'ayuda'`; en esta configuración tiene el mismo destino que `go('/ayuda')`. |

`go` puede configurar varias páginas cuando la ubicación tiene rutas padre e hijas. Lo veremos al añadir `/talleres/20`; la explicación de una sola página de la primera prueba corresponde a las dos rutas independientes de este paso.

## Qué conservamos para continuar

Estas dos pruebas sirven para comparar operaciones. Antes del paso siguiente, restaura el acceso del catálogo con `context.go('/ayuda')` y retira el botón de prueba añadido a Ayuda. Mantén su interruptor y el consejo, tal como estaban en el paso 2. Así continuaremos todos desde el mismo ejemplo.

En web, comprueba por separado los botones atrás y adelante del navegador y la recarga: las operaciones imperativas pueden tener matices con ese historial. Un diálogo breve puede seguir abriéndose con `showDialog`; no necesita una ruta propia para esta práctica.

Referencias: [navegación y retorno de valores](https://pub.dev/documentation/go_router/latest/topics/Navigation-topic.html) y [rutas con nombre](https://pub.dev/documentation/go_router/latest/topics/Named%20routes-topic.html).
