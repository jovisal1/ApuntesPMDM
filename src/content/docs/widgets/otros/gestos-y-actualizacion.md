---
title: "Gestos: GestureDetector, InkWell y RefreshIndicator"
sidebar:
  order: 3
---

**Un contenedor visual no siempre es interactivo.** `GestureDetector` reconoce gestos sobre un hijo; `InkWell` añade una respuesta visual Material al toque. `RefreshIndicator` reconoce el gesto de arrastrar una lista para actualizar. Son complementos de la composición, no sustituyen a un botón cuando necesitamos una acción estándar.

```dart
GestureDetector(
  onTap: () { debugPrint('Tocado'); },
  child: const Padding(padding: EdgeInsets.all(16), child: Text('Área de demostración')),
)
```

`Padding` da espacio alrededor del texto. `GestureDetector` no dibuja una onda ni resalta automáticamente la zona. Los callbacks impiden que esta expresión sea `const`.

## 🔧 Propiedades principales

### 1. `onTap`, `onDoubleTap` y `onLongPress`

Permiten distinguir un toque, dos toques y una pulsación mantenida. Son útiles para una superficie de demostración con varios gestos, siempre que el usuario sepa qué puede hacer.

```dart
GestureDetector(
  behavior: HitTestBehavior.opaque,
  onTap: () { debugPrint('Un toque'); },
  onDoubleTap: () { debugPrint('Dos toques'); },
  onLongPress: () { debugPrint('Pulsación mantenida'); },
  child: const SizedBox(height: 80, child: Center(child: Text('Prueba los tres gestos'))),
)
```

`behavior: opaque` hace que toda la caja reciba el gesto, incluso las zonas vacías; no la colorea. Al reconocer también el doble toque, la respuesta de un toque puede esperar para distinguirlo. No ocultes acciones esenciales tras gestos difíciles de descubrir.

### 2. InkWell: superficie Material y onda visible

Es útil para tarjetas y zonas táctiles que deben confirmar visualmente la pulsación. Necesita un antepasado `Material` donde pintar la onda.

```dart
Material(
  color: Colors.teal.shade50,
  borderRadius: BorderRadius.circular(12),
  clipBehavior: Clip.antiAlias,
  child: InkWell(
    onTap: () { debugPrint('Área activada'); },
    child: const Padding(padding: EdgeInsets.all(20), child: Text('Ver preparación')),
  ),
)
```

`Material` aporta la superficie y recorta sus esquinas. `InkWell` gestiona el toque y `Padding` el espacio. El color se pinta en `Material`, no en un `Container` opaco entre la superficie y la onda, que la ocultaría. Para una acción habitual, un botón ya resuelve más detalles de interacción y accesibilidad.

### 3. RefreshIndicator: `onRefresh` y lista desplazable

Permite solicitar una actualización al arrastrar hacia abajo desde el inicio de una lista vertical. `onRefresh` devuelve un `Future<void>`: el indicador espera a que termine esa operación.

```dart
SizedBox(
  height: 220,
  child: RefreshIndicator(
    onRefresh: () async {
      await Future<void>.delayed(const Duration(milliseconds: 600));
      debugPrint('Simulación de actualización terminada');
    },
    child: ListView(
      physics: const AlwaysScrollableScrollPhysics(),
      children: const [ListTile(title: Text('Preparación de la salida'))],
    ),
  ),
)
```

`async` permite esperar con `await`. `Future.delayed` simula trabajo, no descarga datos ni modifica esta lista. `Duration` expresa el tiempo. `AlwaysScrollableScrollPhysics` permite el gesto aunque solo haya una fila. En web, prueba con interacción táctil o emulación móvil; el gesto no equivale a girar la rueda del ratón.

## ✍️ Actividad: crea componentes con variantes

Implementa los dos componentes en archivos de `lib/ui/core/ui/`. Cada clase recibe la configuración mediante parámetros con nombre y campos `final`; utiliza `StatelessWidget` y constructor `const` cuando sea posible. Los parámetros sin valor predeterminado son obligatorios (`required`), aunque admitan `null`. Las variantes deciden la presentación sin duplicar la clase.

`VoidCallback` es una función sin argumentos ni resultado; `?` permite `null`. `Future<void> Function()` es una función sin argumentos que devuelve una operación asíncrona sin dato final.

### 1. `ZonaInteractiva`

`lib/ui/core/ui/zona_interactiva.dart`

Parámetros: `String texto`, `bool conOnda = true`, `VoidCallback onTap`.

Selecciona `Material` con `InkWell` o `GestureDetector`. Conserva la misma acción y dimensiones; añade una etiqueta accesible y explica al usuario cómo activar el área.

### 2. `ListaActualizable`

`lib/ui/core/ui/lista_actualizable.dart`

Parámetros: `List<String> nombres`, `Future<void> Function() onActualizar`, `bool permitirConPocosDatos = true`.

Recibe la operación desde fuera y entrégala a `RefreshIndicator`. No crees una petición de red dentro de `build`. La variante permite o no arrastrar cuando la lista es corta.

## 🧩 Muestra las variantes en el catálogo

En `lib/ui/catalogo/ui/otros_ejemplos_pantalla.dart`, importa los archivos de los componentes al principio:

```dart
import 'package:catalogo_widgets/ui/core/ui/zona_interactiva.dart';
import 'package:catalogo_widgets/ui/core/ui/lista_actualizable.dart';
```

Después de implementarlos, estos usos pueden formar parte de la lista de ejemplos:

```dart
ZonaInteractiva(
  texto: 'Ver preparación',
  conOnda: true,
  onTap: () { debugPrint('Acción del catálogo'); },
),
SizedBox(
  height: 220,
  child: ListaActualizable(
    nombres: const ['Ruta del río'],
    onActualizar: () async { debugPrint('Actualización solicitada'); },
  ),
),
```

Compara la misma acción con y sin onda y cuenta las llamadas: una activación debe producir una llamada. Prueba la actualización con lista corta y larga. Un callback de actualización no cambia los datos por sí solo: más adelante el padre gestionará ese estado. En tests controla el Future, sin pausas reales ni `pumpAndSettle` mientras gire un indicador indefinido.

Completa las variantes que falten con títulos y explicaciones propias. Utiliza `create-component` para revisar tu intento y `test-widget` para comprobar requisitos concretos. Ejecuta `dart format lib test`, `flutter analyze` y las pruebas. Revisa también el resultado visual: una prueba superada no garantiza que el texto se lea bien.

Referencias: [GestureDetector](https://api.flutter.dev/flutter/widgets/GestureDetector-class.html) · [InkWell](https://api.flutter.dev/flutter/material/InkWell-class.html) · [RefreshIndicator](https://api.flutter.dev/flutter/material/RefreshIndicator-class.html).
