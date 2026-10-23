---
title: "Stack y Positioned: componer por capas"
sidebar:
  order: 4
---

**`Stack` permite superponer widgets.** Es útil para colocar una insignia sobre una ilustración o un aviso en una esquina. `Positioned` sitúa un hijo respecto a los bordes de ese `Stack`, sin reorganizar los demás como haría una fila.

```dart
SizedBox(
  height: 100,
  child: Stack(
    children: [
      Container(color: Colors.teal.shade50),
      const Text('Reserva abierta'),
    ],
  ),
)
```

`SizedBox` aporta altura finita. La caja de color queda detrás del texto porque es el primer hijo: los hijos posteriores se dibujan encima.

## 🔧 Propiedades principales

### 1. `alignment`: colocar hijos sin posición explícita

Define la referencia para los hijos que no tienen offsets de `Positioned`. Es útil para centrar un símbolo sobre un fondo.

```dart
SizedBox(
  height: 140,
  child: Stack(
    alignment: Alignment.center,
    children: [
      Container(color: Colors.teal.shade50),
      const Icon(Icons.landscape, size: 72),
    ],
  ),
)
```

`Icon` dibuja el símbolo y `Container` aporta el fondo. El tamaño del área está definido desde fuera; un `Stack` con solo hijos posicionados no obtiene su tamaño a partir de ellos.

### 2. Positioned: `top`, `right`, `bottom` y `left`

Sitúan una capa a una distancia del borde. Es útil para una insignia que debe permanecer en una esquina aunque cambie el fondo.

```dart
SizedBox(
  height: 160,
  child: Stack(
    children: [
      Container(color: Colors.indigo.shade50),
      const Positioned(
        top: 12,
        right: 12,
        child: Chip(label: Text('Nueva')),
      ),
    ],
  ),
)
```

`Chip` aporta la etiqueta. `Positioned` debe quedar bajo el `Stack`, no directamente en la lista del catálogo. `PositionedDirectional` permite usar `start` y `end` si la posición debe seguir el sentido de lectura.

### 3. `fit` y `Positioned.fill`: cubrir el área

`StackFit.expand` estira los hijos no posicionados al tamaño disponible. `Positioned.fill` hace que una capa cubra toda la caja. Son útiles para fondos y velos.

```dart
SizedBox(
  height: 140,
  child: Stack(
    fit: StackFit.expand,
    children: [
      Container(color: Colors.indigo),
      const Positioned.fill(child: ColoredBox(color: Colors.black26)),
      const Center(child: Text('Ruta nocturna', style: TextStyle(color: Colors.white))),
    ],
  ),
)
```

`ColoredBox` pinta un color sin otras opciones de `Container`. `Colors.black26` es semitransparente. `Center` centra el texto y `TextStyle` aporta contraste.

### 4. `clipBehavior`: recortar lo que sobresale

Es útil para decidir si una capa puede dibujarse fuera de la caja. No aumenta el espacio que ocupa el `Stack`.

```dart
SizedBox(
  height: 100,
  child: Stack(
    clipBehavior: Clip.hardEdge,
    children: [
      Container(color: Colors.teal.shade50),
      const Positioned(top: -16, right: 12, child: Icon(Icons.star, size: 48)),
    ],
  ),
)
```

Compara con `Clip.none`: aparecerá la parte que sobresale, pero los vecinos no se apartan y esa zona exterior no gana automáticamente interacción. Evita ocultar información importante fuera de los límites.

## ✍️ Actividad: crea componentes con variantes

Implementa los dos componentes en archivos de `lib/ui/core/ui/`. Cada clase recibe la configuración mediante parámetros con nombre y campos `final`; utiliza `StatelessWidget` y constructor `const` cuando sea posible. Los parámetros sin valor predeterminado son obligatorios (`required`), aunque admitan `null`. Las variantes deciden la presentación sin duplicar la clase.

### 1. `PortadaRuta`

`lib/ui/core/ui/portada_ruta.dart`

Parámetros: `String titulo`, `bool nueva = false`, `bool etiquetaAbajo = false`.

Dibuja un fondo sin imágenes externas y superpone título e insignia. `nueva` muestra la insignia; el otro parámetro elige esquina superior o inferior. Reserva una altura explícita.

### 2. `IconoConAviso`

`lib/ui/core/ui/icono_con_aviso.dart`

Parámetros: `IconData icono`, `bool mostrarAviso = false`.

Superpone un pequeño símbolo de aviso sobre el icono principal. Incluye una descripción accesible que indique el aviso, no lo comuniques solo mediante color.

## 🧩 Muestra las variantes en el catálogo

En `lib/ui/catalogo/ui/contenedores_ejemplos_pantalla.dart`, importa los archivos de los componentes al principio:

```dart
import 'package:catalogo_widgets/ui/core/ui/portada_ruta.dart';
import 'package:catalogo_widgets/ui/core/ui/icono_con_aviso.dart';
```

Después de implementarlos, estos usos pueden formar parte de la lista de ejemplos:

```dart
const PortadaRuta(titulo: 'Ruta del faro', nueva: true),
const PortadaRuta(titulo: 'Ruta del faro', nueva: true, etiquetaAbajo: true),
const IconoConAviso(icono: Icons.map, mostrarAviso: true),
```

Comprueba las cuatro combinaciones de la portada, un título largo y el icono con y sin aviso. Ninguna capa debe impedir leer el título.

Completa las variantes que falten con títulos y explicaciones propias. Utiliza `create-component` para revisar tu intento y `test-widget` para comprobar requisitos concretos. Ejecuta `dart format lib test`, `flutter analyze` y las pruebas. Revisa también el resultado visual: una prueba superada no garantiza que el texto se lea bien.

Referencias: [Stack](https://api.flutter.dev/flutter/widgets/Stack-class.html) · [Positioned](https://api.flutter.dev/flutter/widgets/Positioned-class.html).
