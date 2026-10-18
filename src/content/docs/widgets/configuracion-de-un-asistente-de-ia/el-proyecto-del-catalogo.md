---
title: "4. El proyecto del catálogo"
sidebar:
  order: 5
---

## De qué proyecto partimos

Crearemos **`catalogo_widgets`** con una pantalla principal y un listado de familias de widgets. En este apartado tienes el código inicial completo: copiarás la base y prepararás una pantalla vacía para cada familia. Después las completarás durante los tutoriales.

Tu tarea será convertir esas secciones vacías en un **catálogo de ejemplos ejecutables**. No tendrás que construir el menú ni programar el paso entre pantallas. Ese mecanismo ya viene preparado y lo estudiaremos cuando trabajemos navegación. Por ahora céntrate en el contenido de cada sección.

## Así será el catálogo

![Esquema del catálogo: listado inicial a la izquierda y sección de Text con ejemplos guiados y casos del alumno a la derecha](../../../../assets/widgets/catalogo-es.svg)

La izquierda representa la pantalla que pondrás en marcha con el código de este apartado. La derecha muestra el trabajo que irás completando. Cada familia tendrá su propia sección con ejemplos guiados y, al final, los casos que añadas tú. La flecha solo relaciona la entrada del listado con su sección; no necesitamos estudiar su implementación todavía.

Cada demostración incluirá un título identificable, el widget real y una explicación breve del cambio que queremos observar. Por ejemplo, en `Text` compararemos un título con estilo, una descripción limitada a dos líneas y una frase con varios estilos. Después añadirás casos nuevos como parte de la actividad.

## 1. Crea y abre el proyecto

En la carpeta donde guardas tus prácticas, ejecuta estas órdenes una a una. Si ya tienes `catalogo_widgets` de los apartados anteriores, consérvalo y continúa con el paso 2; no lo crees de nuevo.

```bash
flutter create catalogo_widgets
cd catalogo_widgets
flutter pub get
```

Abre en VS Code la carpeta que contiene `pubspec.yaml`. Conserva las instrucciones y skills que ya has preparado.

## 2. Prepara las pantallas vacías

Crea `lib/view/` y los seis archivos de la tabla. Copia la siguiente plantilla en cada uno: cambia **las dos apariciones del nombre de clase** y el título de `AppBar` según la fila. No cambies el resto.

| Archivo dentro de `lib/view/` | Clase y constructor | Título |
| --- | --- | --- |
| `text_ejemplos_pantalla.dart` | `TextEjemplosPantalla` | `Ejemplos de Text` |
| `image_ejemplos_pantalla.dart` | `ImageEjemplosPantalla` | `Ejemplos de Image` |
| `icon_ejemplos_pantalla.dart` | `IconEjemplosPantalla` | `Ejemplos de Icon` |
| `botones_ejemplos_pantalla.dart` | `BotonesEjemplosPantalla` | `Ejemplos de Botones` |
| `placeholder_ejemplos_pantalla.dart` | `PlaceholderEjemplosPantalla` | `Ejemplos de Placeholder` |
| `scaffold_ejemplos_pantalla.dart` | `ScaffoldEjemplosPantalla` | `Ejemplos de Scaffold y AppBar` |

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
        children: [
          // Aquí añadiremos los ejemplos del tutorial.
        ],
      ),
    );
  }
}
```

`children` queda vacío a propósito: ahí añadirás los ejemplos. `ListView` es el soporte para colocarlos en vertical y poder desplazarte si no caben. Cada tutorial indicará qué archivo modificar.

## 3. Copia el punto de partida en main.dart

Sustituye todo `lib/main.dart` por el siguiente código. Incluye la aplicación y el listado completo. El mecanismo que relaciona cada entrada con su pantalla ya está resuelto; lo estudiaremos más adelante. Ahora no necesitas analizar esa parte para trabajar los widgets.

```dart
import 'package:flutter/material.dart';

import 'view/text_ejemplos_pantalla.dart';
import 'view/image_ejemplos_pantalla.dart';
import 'view/icon_ejemplos_pantalla.dart';
import 'view/botones_ejemplos_pantalla.dart';
import 'view/placeholder_ejemplos_pantalla.dart';
import 'view/scaffold_ejemplos_pantalla.dart';

void main() => runApp(const CatalogoApp());

class CatalogoApp extends StatelessWidget {
  const CatalogoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Catálogo de widgets',
      home: CatalogoPantalla(),
    );
  }
}

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
            leading: const Icon(Icons.image_outlined),
            title: const Text('Image'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const ImageEjemplosPantalla(),
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.star_outline),
            title: const Text('Icon'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const IconEjemplosPantalla(),
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.smart_button_outlined),
            title: const Text('Botones'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const BotonesEjemplosPantalla(),
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.crop_square),
            title: const Text('Placeholder'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const PlaceholderEjemplosPantalla(),
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.web_asset),
            title: const Text('Scaffold y AppBar'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const ScaffoldEjemplosPantalla(),
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

## 4. Comprueba el punto de partida

Guarda los siete archivos y ejecuta desde la raíz del proyecto:

```bash
dart format lib
flutter run
```

`dart format lib` aplica el formato estándar de Dart a todos los archivos `.dart` de la carpeta `lib` y sus subcarpetas. Ajusta la indentación, los espacios y los saltos de línea, y guarda los cambios en esos archivos. No ejecuta la aplicación ni comprueba su comportamiento. Después, `flutter run` inicia la aplicación para revisar el resultado en pantalla.

Debes ver las seis entradas. Abre cada una y comprueba su título y el cuerpo vacío; vuelve al listado con el control de la barra. Si falla un import, revisa que el nombre del archivo y el de la clase coincidan con la tabla.

Para comprobar este punto de partida, puedes pedir a `test-widget` que prepare `test/widget_test.dart` y verifique que `CatalogoApp` muestra el título y las seis etiquetas. Ejecuta `flutter analyze` para detectar problemas en el código y `flutter test` para ejecutar las pruebas, sin estudiar todavía el mecanismo entre pantallas.

## Cómo avanzaremos en cada apartado

1. Comprende para qué sirve el widget y prueba su ejemplo mínimo.
2. Estudia sus propiedades principales y los ejemplos; identifica también los widgets auxiliares que utilizan.
3. Implementa los componentes propuestos en archivos propios de `lib/componentes/`, con variantes seleccionadas mediante parámetros.
4. Impórtalos desde la pantalla correspondiente y muestra varias configuraciones de cada uno en el catálogo.
5. Comprueba los requisitos y utiliza las skills para revisar código y generar pruebas concretas.

La pantalla es el lugar donde mostramos los casos; el componente es la pieza reutilizable que recibe datos. No necesitas modificar el listado principal. Empieza por [Variantes de un componente](../../basicos/estilo-y-variantes/), donde prepararemos una primera pieza reutilizable antes de estudiar cada widget básico.
