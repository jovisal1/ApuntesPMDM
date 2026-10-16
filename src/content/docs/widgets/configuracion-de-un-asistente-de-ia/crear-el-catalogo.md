---
title: "4. Construir el catálogo de widgets"
description: "4. Construir el catálogo de widgets · Asistente de IA y catálogo de widgets para 2.º de DAM."
sidebar:
  order: 5
---

## Qué vamos a construir

La primera versión tendrá dos entradas, **Text** e **Icon**. Cada una abrirá una pantalla con ejemplos distintos. Empezamos con pocas entradas para poder seguir el recorrido completo desde una pulsación hasta su resultado.

```text
Catálogo de widgets
├── Text → Ejemplos de Text
│          ├── Texto sencillo
│          ├── Tamaño, peso y color
│          ├── Alineación
│          └── Límite de líneas
└── Icon → Ejemplos de Icon
           ├── Símbolo sencillo
           ├── Tamaño y color
           └── Varios símbolos en una fila
```

En esta práctica adelantamos una navegación mínima. Más adelante estudiaremos rutas, devolución de datos y otras formas de organizar la navegación. Ahora necesitamos entender que la lista abre otra pantalla y que podemos volver.

## Antes de copiar código

Dentro de `lib`, crea la carpeta `pantallas` y los tres archivos que aparecen aquí. Sustituiremos el contenido completo de `lib/main.dart` por el programa de este apartado. Conserva `pubspec.yaml` y los archivos de plataforma generados por Flutter.

```text
lib/
├── main.dart
└── pantallas/
    ├── catalogo_pantalla.dart
    ├── text_ejemplos_pantalla.dart
    └── icon_ejemplos_pantalla.dart
```

Primero lee cada archivo y escríbelo en su lugar. Cuando existan los cuatro, ejecutaremos la aplicación. Si guardas `main.dart` antes de crear sus dependencias, aparecerán temporalmente errores de importación.

:::tip[Trabaja con el asistente]
Antes de cada bloque, pide: «Explícame qué responsabilidad tiene este archivo y una pregunta que deba poder responder sobre él. No añadas más funcionalidades». Después intenta responder sin mirar el chat.
:::

## Paso 1. El punto de entrada

Contenido completo de `lib/main.dart`:

```dart
import 'package:flutter/material.dart';

import 'pantallas/catalogo_pantalla.dart';

void main() => runApp(const CatalogoApp());

class CatalogoApp extends StatelessWidget {
  const CatalogoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Catálogo de widgets',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
        useMaterial3: true,
      ),
      home: const CatalogoPantalla(),
    );
  }
}
```

`main` inicia Flutter con `runApp`. `CatalogoApp` configura la aplicación mediante `MaterialApp`; `home` indica su primera pantalla. `ThemeData` reúne ajustes visuales comunes y `ColorScheme.fromSeed` obtiene una combinación de colores a partir de uno inicial. No necesitas memorizar esas opciones para entender la navegación.

El `import` relativo busca `pantallas/catalogo_pantalla.dart` desde este archivo. Las clases son `StatelessWidget` porque su configuración no guarda aquí un contador u otro dato que debamos cambiar con `setState`. Sus constructores aceptan `super.key` y permiten crear instancias constantes.

**Comprueba que lo entiendes:** ¿qué clase decide la primera pantalla y qué propiedad utiliza?

## Paso 2. La lista principal

Contenido completo de `lib/pantallas/catalogo_pantalla.dart`:

```dart
import 'package:flutter/material.dart';

import 'icon_ejemplos_pantalla.dart';
import 'text_ejemplos_pantalla.dart';

class CatalogoPantalla extends StatelessWidget {
  const CatalogoPantalla({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Catálogo de widgets')),
      body: ListView(
        children: [
          ListTile(
            leading: const Icon(Icons.text_fields),
            title: const Text('Text'),
            subtitle: const Text('Estilo, alineación y texto largo'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const TextEjemplosPantalla(),
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.star_outline),
            title: const Text('Icon'),
            subtitle: const Text('Símbolos, tamaños y colores'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const IconEjemplosPantalla(),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
```

### Cómo se construye una entrada

`Scaffold` organiza la pantalla y `AppBar` muestra el título. `ListView` coloca sus hijos en una lista vertical que puede desplazarse. Al principio escribimos dos entradas explícitas; cuando estudiemos modelos y colecciones podremos generar estas filas desde datos.

Cada `ListTile` representa una fila. `leading` es el elemento inicial; `title`, el nombre; `subtitle`, la explicación breve; y `trailing`, el icono final que sugiere que podemos avanzar. La flecha dibujada no navega por sí sola: la acción está en `onTap`.

### Qué ocurre al pulsar

`onTap` recibe una función sin argumentos: `() { ... }`. Flutter la llama **cuando pulsamos**, no mientras construye la lista. `Navigator.of(context)` obtiene el navegador asociado a ese lugar del árbol. `push` añade una ruta, es decir, una nueva pantalla sobre la actual.

`MaterialPageRoute<void>` describe la ruta con comportamiento Material. Aquí `void` indica que no esperamos recuperar un dato al cerrarla. `builder` recibe un contexto y devuelve el widget de la nueva pantalla. La expresión `=> const TextEjemplosPantalla()` es una función abreviada que lo devuelve.

Al abrir una ruta, su `AppBar` incorpora normalmente el botón para volver si el navegador puede retroceder. Volver retira la ruta superior y deja visible el catálogo. No necesitamos crear otro `MaterialApp` en cada pantalla.

La documentación de Flutter desarrolla [la navegación entre dos pantallas](https://docs.flutter.dev/cookbook/navigation/navigation-basics) y el uso de [listas con filas](https://docs.flutter.dev/cookbook/lists/basic-list). El código de esta práctica aplica esas piezas a nuestro catálogo.

## Paso 3. Varias demostraciones de Text

Contenido completo de `lib/pantallas/text_ejemplos_pantalla.dart`:

```dart
import 'package:flutter/material.dart';

class TextEjemplosPantalla extends StatelessWidget {
  const TextEjemplosPantalla({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ejemplos de Text')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          Text('1. Un texto sencillo'),
          SizedBox(height: 8),
          Text('Estoy aprendiendo Flutter'),
          SizedBox(height: 24),
          Text('2. Tamaño, peso y color'),
          SizedBox(height: 8),
          Text(
            'Una ruta por la montaña',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.indigo,
            ),
          ),
          SizedBox(height: 24),
          Text('3. Alineación dentro de un ancho'),
          SizedBox(height: 8),
          Center(
            child: SizedBox(
              width: 220,
              child: Text(
                'Este mensaje queda centrado dentro de su espacio.',
                textAlign: TextAlign.center,
              ),
            ),
          ),
          SizedBox(height: 24),
          Text('4. Texto largo con límite de líneas'),
          SizedBox(height: 8),
          Center(
            child: SizedBox(
              width: 220,
              child: Text(
                'Esta descripción es larga para mostrar qué sucede '
                'cuando limitamos el texto a dos líneas en un espacio pequeño.',
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

`padding` deja margen interior alrededor de la lista. `EdgeInsets.all(16)` indica 16 píxeles lógicos por cada lado. `SizedBox(height: ...)` reserva espacio entre demostraciones. `TextStyle` agrupa las propiedades visuales del texto: tamaño, peso y color.

En los dos últimos ejemplos, `Center` permite que el `SizedBox` interior tenga un ancho limitado de 220; el ancho efectivo también depende del espacio disponible. `textAlign` alinea las líneas **dentro del espacio del texto**. No coloca todo el widget en el centro de la pantalla: ese es el papel de `Center` en este ejemplo.

`maxLines: 2` limita las líneas visibles y `TextOverflow.ellipsis` indica que se añadan puntos suspensivos cuando no cabe todo. Las dos cadenas de la descripción, escritas una junto a otra, forman una sola cadena en Dart; no crean dos widgets.

**Prueba razonada:** predice qué pasará si cambias `maxLines` a `1`, ejecútalo y explica la diferencia. Después prueba `TextAlign.right` en la tercera demostración.

## Paso 4. Varias demostraciones de Icon

Contenido completo de `lib/pantallas/icon_ejemplos_pantalla.dart`:

```dart
import 'package:flutter/material.dart';

class IconEjemplosPantalla extends StatelessWidget {
  const IconEjemplosPantalla({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ejemplos de Icon')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          Text('1. Un símbolo conocido'),
          SizedBox(height: 8),
          Icon(Icons.home, semanticLabel: 'Inicio'),
          SizedBox(height: 24),
          Text('2. Otro tamaño y otro color'),
          SizedBox(height: 8),
          Icon(
            Icons.favorite,
            size: 48,
            color: Colors.red,
            semanticLabel: 'Favorito',
          ),
          SizedBox(height: 24),
          Text('3. Varios iconos en una fila'),
          SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Icon(Icons.directions_walk, semanticLabel: 'Caminar'),
              Icon(Icons.directions_bike, semanticLabel: 'Bicicleta'),
              Icon(Icons.directions_bus, semanticLabel: 'Autobús'),
            ],
          ),
        ],
      ),
    );
  }
}
```

`Icons` proporciona los símbolos y `Icon` los muestra. `size` cambia su tamaño y `color` su color. `semanticLabel` aporta un nombre para tecnologías de asistencia; no es un texto visible al lado del icono. La fila distribuye tres iconos con `MainAxisAlignment.spaceEvenly`, dejando espacios iguales entre ellos y en los extremos.

Un `Icon` muestra un símbolo; no incorpora una acción de pulsación por sí mismo. Cuando estudiemos botones, compararemos `Icon` con `IconButton` y añadiremos su pantalla al catálogo.

## Paso 5. Ejecuta y recorre la aplicación

Guarda los cuatro archivos. Desde la raíz de `catalogo_widgets` ejecuta:

```bash
dart format lib
flutter analyze
flutter run
```

`dart format` ajusta el formato y puede modificar los archivos. `flutter analyze` busca problemas sin abrir la aplicación. `flutter run` la inicia en el destino elegido. Si la tenías ejecutándose con el ejemplo anterior, realiza un **hot restart** para reiniciar desde `main`.

:::note[La prueba que creó Flutter también cuenta]
El proyecto inicial suele incluir `test/widget_test.dart`, que comprueba su contador. Al sustituir esa aplicación, la prueba deja de representar nuestro comportamiento y puede referirse a una clase que ya no existe. Antes de exigir un análisis sin errores, sustituye su contenido por la prueba del [siguiente apartado](../practicar-y-verificar/). No borres las pruebas para ocultar el error.
:::

Comprueba este recorrido: aparecen `Text` e `Icon`; al pulsar `Text` ves cuatro demostraciones; puedes volver; al pulsar `Icon` ves tres; puedes volver otra vez. Reduce la altura de la ventana o gira el dispositivo y comprueba que puedes desplazarte hasta el último ejemplo.

Pregunta al asistente por un solo bloque cada vez. Si propone sustituir toda la aplicación por otra solución, vuelve a delimitar la tarea y comprueba el cambio mínimo que necesitas.
