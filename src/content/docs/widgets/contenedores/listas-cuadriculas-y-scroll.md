---
title: "ListView, GridView y desplazamiento"
sidebar:
  order: 5
---

**`ListView` organiza una secuencia desplazable y `GridView`, una cuadrícula desplazable.** Son útiles cuando los datos no caben en una pantalla. `SingleChildScrollView` añade desplazamiento a una composición pequeña que ya tienes, como una `Column`.

```dart
SizedBox(
  height: 140,
  child: ListView(
    children: const [Text('Ruta del río'), Text('Ruta del faro'), Text('Ruta del bosque')],
  ),
)
```

El `SizedBox` limita la altura del ejemplo dentro de la lista del catálogo. Si una lista es el `body` completo de un `Scaffold`, ya dispone de un área delimitada. No introduzcas listas verticales sin altura dentro de otra lista vertical.

## 🔧 Propiedades principales

### 1. `scrollDirection`, `padding` y `physics`

Permiten elegir el sentido del desplazamiento, dejar espacio en los bordes y ajustar su comportamiento. Una lista horizontal es útil para varias opciones cortas.

```dart
SizedBox(
  height: 80,
  child: ListView(
    scrollDirection: Axis.horizontal,
    padding: const EdgeInsets.all(8),
    children: const [
      SizedBox(width: 140, child: Center(child: Text('Bosque'))),
      SizedBox(width: 140, child: Center(child: Text('Río'))),
      SizedBox(width: 140, child: Center(child: Text('Montaña'))),
    ],
  ),
)
```

`Axis.horizontal` cambia el eje. Los `SizedBox` interiores reservan ancho para cada elemento. `EdgeInsets` configura el espacio interior. `AlwaysScrollableScrollPhysics` permitirá arrastrar incluso con poco contenido; lo usaremos con la actualización por gesto.

### 2. `itemCount` e `itemBuilder`: construir desde datos

`ListView.builder` solicita los widgets según los necesita. Es útil para colecciones largas: `itemCount` limita los índices e `itemBuilder` describe cada elemento, sin escribir una fila por dato.

```dart
SizedBox(
  height: 180,
  child: ListView.builder(
    itemCount: 30,
    itemBuilder: (context, index) {
      return Padding(
        padding: const EdgeInsets.all(12),
        child: Text('Parada ${index + 1}'),
      );
    },
  ),
)
```

`index` empieza en 0: sumamos 1 para numerar las paradas. `Padding` separa el texto de sus límites. Con una lista `rutas`, usarías `itemCount: rutas.length` y `Text(rutas[index])`; declara esos datos antes del `return` de `build`.

### 3. `gridDelegate`: columnas y separación

Un delegate es un objeto al que encargamos una decisión. Aquí decide la distribución de las celdas: resulta útil para un mosaico de tarjetas o símbolos.

```dart
SizedBox(
  height: 220,
  child: GridView.builder(
    itemCount: 12,
    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: 3,
      crossAxisSpacing: 8,
      mainAxisSpacing: 8,
      childAspectRatio: 1.5,
    ),
    itemBuilder: (context, index) {
      return Container(
        color: Colors.teal.shade50,
        alignment: Alignment.center,
        child: Text('Ruta ${index + 1}'),
      );
    },
  ),
)
```

Con desplazamiento vertical, `crossAxisCount` fija las columnas. Las separaciones se aplican entre celdas; `childAspectRatio` es ancho/alto. `Container` colorea y centra la etiqueta. El delegate es configuración, no otro widget.

### 4. Adaptar el número de columnas

Si la ventana cambia de tamaño, puede interesar definir un ancho máximo por celda en vez de un número fijo de columnas.

```dart
SizedBox(
  height: 220,
  child: GridView.builder(
    itemCount: 12,
    gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
      maxCrossAxisExtent: 180,
      mainAxisSpacing: 8,
      crossAxisSpacing: 8,
    ),
    itemBuilder: (context, index) => Center(child: Text('Etapa ${index + 1}')),
  ),
)
```

Cambia el ancho de la ventana: Flutter recalcula cuántas celdas caben. `maxCrossAxisExtent` no pide que todas midan exactamente 180. Con ventanas menores, las celdas también se reducen.

### 5. SingleChildScrollView: una composición que puede crecer

Es útil para un contenido breve y heterogéneo que normalmente cabe, pero necesita desplazarse en una ventana pequeña. No es la primera opción para cientos de filas.

```dart
const SizedBox(
  height: 120,
  child: SingleChildScrollView(
    padding: EdgeInsets.all(12),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Preparación'),
        SizedBox(height: 80),
        Text('Agua, calzado y protección solar'),
      ],
    ),
  ),
)
```

`Column` organiza el contenido, pero no desplaza por sí sola. El envoltorio proporciona el desplazamiento. No pongas `Expanded` en esta columna sin resolver sus restricciones de altura: en el eje de desplazamiento recibe espacio sin límite.

### Evitar desplazamientos que compiten

En el catálogo, muestra cada lista o cuadrícula dentro de un `SizedBox` con altura finita. Para una lista pequeña que deba formar parte del desplazamiento exterior puedes usar `shrinkWrap: true` y `physics: NeverScrollableScrollPhysics()`, pero medir todo su contenido cuesta más y no es una solución general para listas grandes. `shrinkWrap` no sustituye a comprender las restricciones.

## ✍️ Actividad: crea componentes con variantes

Implementa los dos componentes en archivos de `lib/ui/core/ui/`. Cada clase recibe la configuración mediante parámetros con nombre y campos `final`; utiliza `StatelessWidget` y constructor `const` cuando sea posible. Los parámetros sin valor predeterminado son obligatorios (`required`), aunque admitan `null`. Las variantes deciden la presentación sin duplicar la clase.

### 1. `ListaRecorridos`

`lib/ui/core/ui/lista_recorridos.dart`

Parámetros: `List<String> nombres`, `bool horizontal = false`.

Usa `ListView.builder`. En horizontal, da un ancho finito a cada elemento. Muestra un mensaje cuando no haya datos y conserva el orden recibido. La altura del área de prueba se decide desde el catálogo.

### 2. `MosaicoRecorridos`

`lib/ui/core/ui/mosaico_recorridos.dart`

Parámetros: `List<String> nombres`, `bool adaptable = false`, `int columnas = 2`.

Alterna un delegate de columnas fijas positivas y otro con máximo de 180. Usa un builder y muestra cada nombre una vez por dato.

## 🧩 Muestra las variantes en el catálogo

En `lib/ui/catalogo/ui/contenedores_ejemplos_pantalla.dart`, importa los archivos de los componentes al principio:

```dart
import 'package:catalogo_widgets/ui/core/ui/lista_recorridos.dart';
import 'package:catalogo_widgets/ui/core/ui/mosaico_recorridos.dart';
```

Después de implementarlos, estos usos pueden formar parte de la lista de ejemplos:

```dart
const SizedBox(
  height: 180,
  child: ListaRecorridos(nombres: ['Río', 'Faro', 'Bosque']),
),
const SizedBox(
  height: 220,
  child: MosaicoRecorridos(nombres: ['Río', 'Faro', 'Bosque'], adaptable: true),
),
```

Prueba datos vacíos, uno y treinta elementos. Desplázate hasta el último y reduce el ancho de la ventana. En pruebas de builders, no exijas encontrar todos los elementos antes de desplazarte: algunos todavía no se han construido.

Completa las variantes que falten con títulos y explicaciones propias. Utiliza `create-component` para revisar tu intento y `test-widget` para comprobar requisitos concretos. Ejecuta `dart format lib test`, `flutter analyze` y las pruebas. Revisa también el resultado visual: una prueba superada no garantiza que el texto se lea bien.

Referencias: [ListView](https://api.flutter.dev/flutter/widgets/ListView-class.html) · [GridView](https://api.flutter.dev/flutter/widgets/GridView-class.html) · [SingleChildScrollView](https://api.flutter.dev/flutter/widgets/SingleChildScrollView-class.html).
