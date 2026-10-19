---
title: "Image: incorporar imágenes"
sidebar:
  order: 4
---

**`Image` muestra una imagen**. Sus constructores indican de dónde sale: `Image.network` utiliza una URL e `Image.asset`, un recurso del proyecto.

```dart
Image.network('https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg')
```

Este ejemplo necesita conexión. Si la imagen no carga, comprueba la URL y el acceso a Internet.

## 🔧 Propiedades principales

### 1. `width` y `height`: espacio de la imagen

`width` y `height` solicitan el ancho y la altura de la imagen en píxeles lógicos, respetando las restricciones del padre. Son útiles para que las fotografías de un listado tengan un tamaño coherente y para reservar su espacio antes de que termine la carga.

```dart
Center(
  child: Image.network(
    'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
    width: 240,
    height: 160,
  ),
)
```

`Center` centra la imagen y evita que la lista le imponga todo el ancho disponible. Conservar el tamaño evita que otros ejemplos se desplacen al terminar la carga.

### 2. `fit` y `alignment`: ajuste y recorte

`fit` decide cómo adaptar la imagen cuando sus proporciones no coinciden con las del espacio reservado: podemos mostrarla completa, recortarla o deformarla. `alignment` permite elegir qué zona se alinea con ese espacio. Son útiles, por ejemplo, para crear una cabecera panorámica y conservar visible la parte importante de la fotografía.

```dart
Center(
  child: Image.network(
    'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
    width: 240,
    height: 120,
    fit: BoxFit.cover,
    alignment: Alignment.topCenter,
  ),
)
```

`cover` conserva la proporción y cubre el espacio recortando lo necesario. `topCenter` prioriza la parte superior. Cambia a `contain` para ver la imagen completa con posibles huecos, y a `fill` para llenar el espacio aunque se deforme.

### 3. `semanticLabel` y `excludeFromSemantics`

`semanticLabel` describe una imagen para quien utiliza un lector de pantalla; úsalo cuando la fotografía aporte información necesaria para comprender el contenido. `excludeFromSemantics` permite excluir una imagen puramente decorativa, evitando que se anuncie como si aportase información adicional.

```dart
Image.network(
  'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
  height: 160,
  semanticLabel: 'Un búho posado en una rama',
)
```

Para una imagen decorativa, omite `semanticLabel` y utiliza `excludeFromSemantics: true`. No marques como decorativa una imagen cuyo contenido sea necesario para comprender la pantalla.

### 4. `errorBuilder`: alternativa si falla la carga

`errorBuilder` permite elegir qué mostrar si la imagen no puede cargarse. Es especialmente útil con direcciones remotas que pueden dejar de existir o fallar por falta de conexión: en lugar de dejar el fallo sin explicar, podemos mostrar un mensaje o una imagen alternativa. Recibe una función que devuelve ese widget de sustitución.

```dart
Image.network(
  'https://example.invalid/imagen.jpg',
  height: 160,
  errorBuilder: (context, error, stackTrace) => const SizedBox(
    height: 160,
    child: Center(child: Text('Imagen no disponible')),
  ),
)
```

La dirección está elegida para fallar. La función recibe contexto, error y traza; `=>` devuelve la alternativa. `SizedBox` reserva altura, `Center` centra el contenido y `Text` muestra el mensaje.

### 5. `loadingBuilder`: durante la espera

`loadingBuilder` permite personalizar lo que ve el usuario mientras se descarga la imagen. Es útil si la conexión es lenta o la imagen pesa mucho, para indicar que la aplicación sigue trabajando. Su función recibe la imagen y el progreso de carga: cuando el progreso es `null`, devolvemos la imagen; durante la espera podemos mostrar un indicador.

```dart
Image.network(
  'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
  height: 160,
  loadingBuilder: (context, child, progreso) {
    if (progreso == null) return child;
    return const SizedBox(
      height: 160,
      child: Center(child: CircularProgressIndicator()),
    );
  },
)
```

`CircularProgressIndicator` muestra una espera sin porcentaje. El indicador puede ser imperceptible si la imagen ya está en caché; prueba limitando la red desde las herramientas del navegador. Añadir `loadingBuilder` no sustituye a `errorBuilder`.

## Usar una imagen del proyecto

Coloca `ruta.jpg` en `assets/images/` y declara esa carpeta dentro del bloque `flutter` que ya existe en `pubspec.yaml`:

```yaml
flutter:
  uses-material-design: true
  assets:
    - assets/images/
```

Respeta la indentación y ejecuta `flutter pub get`. Después puedes usar `Image.asset('assets/images/ruta.jpg')`, con las mismas propiedades de tamaño y ajuste. Si no aparece el recurso nuevo, reinicia la aplicación y comprueba ruta y mayúsculas. `Image.file` permite leer archivos en plataformas compatibles (no en web), e `Image.memory` recibe bytes; no los necesitamos para estas actividades.


## ✍️ Actividad: crea componentes con variantes

Implementa **los dos componentes** siguientes como `StatelessWidget`, cada uno en el archivo indicado dentro de `lib/ui/core/ui/`. Los nombres y parámetros son el contrato que debes cumplir, no una solución implementada. Usa campos `final`, parámetros con nombre, `super.key` y constructor `const` cuando sea posible. Las variantes se eligen mediante parámetros: no necesitan estado propio.

Los parámetros sin valor predeterminado son obligatorios; márcalos con `required`, también si admiten `null`. Un tipo terminado en `?` admite `null`. Los `enum` propuestos se declaran en el mismo archivo que el componente.

Si necesitas recordar cómo un parámetro selecciona el aspecto, consulta [Variantes de un componente](../estilo-y-variantes/). La implementación de estas propuestas te corresponde a ti.

### 1. `ImagenRuta`

`lib/ui/core/ui/imagen_ruta.dart`

Parámetros: `String rutaAsset`, `bool panoramica = false`, `String descripcion`.

Carga un recurso local. La variante normal mide 240 × 180 y la panorámica, 300 × 120, siempre dentro del espacio disponible. Usa `cover` y la descripción accesible recibida.

### 2. `ImagenRemota`

`lib/ui/core/ui/imagen_remota.dart`

Parámetros: `String url`, `BoxFit ajuste = BoxFit.cover`, `bool decorativa = false`, `String? descripcion`.

Reserva altura, muestra espera y alternativa de error. Si no es decorativa, exige una descripción no vacía; si lo es, exclúyela de la descripción accesible. Permite comparar `cover` y `contain`.

## 🧩 Muestra los componentes en el catálogo

En `lib/ui/catalogo/ui/image_ejemplos_pantalla.dart`, conserva `ImageEjemplosPantalla` e importa los archivos nuevos. Cada import va al principio, fuera de las clases:

```dart
import 'package:catalogo_widgets/ui/core/ui/imagen_ruta.dart';
import 'package:catalogo_widgets/ui/core/ui/imagen_remota.dart';
```

En un import `package:`, `catalogo_widgets` identifica el paquete y la ruta siguiente comienza dentro de `lib/`. Los imports hacen accesibles las clases y los `enum` públicos de esos archivos.

Cuando hayas implementado los componentes, podrás utilizarlos así dentro de `children`:

```dart
const ImagenRuta(
  rutaAsset: 'assets/images/ruta.jpg',
  descripcion: 'Sendero entre árboles',
),
const ImagenRuta(
  rutaAsset: 'assets/images/ruta.jpg',
  descripcion: 'Sendero entre árboles',
  panoramica: true,
),
const ImagenRemota(
  url: 'https://example.invalid/imagen.jpg',
  descripcion: 'Fotografía de una ruta',
),
```

Muestra las dos proporciones locales, dos ajustes remotos y un caso de error. No hagas depender los tests de Internet: pide a `test-widget` una carga controlada si pruebas espera o error; revisa también los recortes manualmente.

Añade las combinaciones que falten: los usos anteriores son solo un comienzo. Identifica cada caso con un título y una explicación propia. No dupliques una clase por cada combinación ni copies los componentes dentro de la pantalla. Puedes utilizar `create-component` para revisar tu implementación y `test-widget` para generar pruebas con criterios concretos. Ejecuta `dart format lib`, `flutter analyze` y las pruebas que hayas creado.

Referencia: [Image](https://api.flutter.dev/flutter/widgets/Image-class.html).
