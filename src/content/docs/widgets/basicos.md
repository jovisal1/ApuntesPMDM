---
title: "Widgets básicos"
description: "Texto, imágenes, iconos, botones y la estructura de una pantalla Flutter, con ejemplos para practicar."
sidebar:
  label: Básicos
  order: 3
---

Ya sabemos que una pantalla se construye combinando widgets. Ahora vamos a conocer las piezas que utilizaremos con más frecuencia: **mostrar contenido, ofrecer una acción y dar estructura a la pantalla**. No necesitas memorizar todos sus argumentos; empieza por entender qué resuelve cada widget y prueba a cambiar una propiedad cada vez.

Imagina una ficha de una ruta: tiene un título, una fotografía, un icono que indica su dificultad y un botón para guardarla. Estas piezas se colocan dentro de una pantalla con una barra superior. A lo largo del apartado construiremos los elementos de esa interfaz.

| Necesidad | Widget |
| --- | --- |
| Mostrar un texto | `Text` |
| Mostrar una fotografía o ilustración | `Image` |
| Representar una idea mediante un símbolo | `Icon` |
| Ejecutar una acción | `FilledButton`, `ElevatedButton`, `OutlinedButton`, `TextButton` o `IconButton` |
| Reservar el lugar de una pieza pendiente | `Placeholder` |
| Mostrar la barra superior | `AppBar` |
| Organizar las zonas de una pantalla Material | `Scaffold` |

## 🧪 Un lugar para probar los ejemplos

Los primeros bloques son **fragmentos de interfaz**. Para ejecutarlos, pega este programa en `lib/main.dart` o en [DartPad](https://dartpad.dev/) y sustituye `const Text('Mi primera ruta')` por el widget que quieras probar:

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: PruebaWidgets()));

class PruebaWidgets extends StatelessWidget {
  const PruebaWidgets({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Widgets básicos')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: const Text('Mi primera ruta'),
        ),
      ),
    );
  }
}
```

`MaterialApp` configura la aplicación Material y `Scaffold` organiza la pantalla. `Center` centra su hijo y `Padding` deja espacio alrededor. El `context` disponible en `build` permite consultar el tema o localizar servicios del árbol, como veremos al mostrar mensajes.

:::tip[Lee los argumentos por su función 🔎]
En `Text('Mi primera ruta')`, el texto es un argumento posicional. En `Icon(Icons.terrain, size: 32)`, `size` es un argumento con nombre. `child` recibe un solo widget; `children`, una lista. Usa `const` cuando la configuración sea constante; si necesita un valor calculado en ejecución, como `Theme.of(context)`, omítelo en esa expresión.
:::

## 📝 Text: mostrar y dar formato al texto

**`Text` muestra una cadena de caracteres.** Puede ser un título, una descripción o un valor obtenido de una variable. Su aspecto se configura mediante `TextStyle`:

```dart
const Text(
  'Ruta de la cascada',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.teal,
  ),
)
```

El texto aparece con tamaño 24, en negrita y con color verde azulado. `TextStyle` es un objeto de configuración, no otro widget. Las medidas de la interfaz se expresan en **píxeles lógicos**, que Flutter adapta a la densidad de cada pantalla.

| Propiedad | Para qué sirve |
| --- | --- |
| `style` | Configura tamaño, peso, color y otros detalles del texto. |
| `textAlign` | Alinea las líneas dentro del ancho disponible. |
| `maxLines` | Limita el número de líneas que se muestran. |
| `overflow` | Decide cómo representar el texto que no cabe. |

Para una descripción breve podemos limitar las líneas y añadir puntos suspensivos:

```dart
const SizedBox(
  width: 240,
  child: Text(
    'Un recorrido entre árboles que termina junto a una cascada.',
    maxLines: 2,
    overflow: TextOverflow.ellipsis,
    textAlign: TextAlign.center,
  ),
)
```

Aquí `SizedBox` limita el ancho a 240, dentro de lo que permita su padre. Así el texto tiene un espacio concreto en el que ajustarse. **`textAlign` alinea el texto dentro de ese espacio; no coloca el widget en el centro de la pantalla.** Para esto último utilizamos `Center`.

En una aplicación conviene aprovechar los estilos del tema para mantener una jerarquía visual coherente:

```dart
Text(
  'Ruta de la cascada',
  style: Theme.of(context).textTheme.headlineSmall,
)
```

### Varios estilos en una misma frase

`Text.rich` permite combinar fragmentos con `TextSpan`. Cada fragmento puede tener su propio estilo:

```dart
const Text.rich(
  TextSpan(
    text: 'Dificultad: ',
    children: [
      TextSpan(
        text: 'fácil',
        style: TextStyle(fontWeight: FontWeight.bold),
      ),
    ],
  ),
)
```

El resultado es una sola frase en la que «fácil» aparece en negrita. Si necesitas que el usuario copie el contenido, puedes utilizar `SelectableText`; `Text` no permite seleccionarlo por defecto. Consulta los detalles en la [referencia de `Text`](https://api.flutter.dev/flutter/widgets/Text-class.html).

:::note[Prueba una variación ✍️]
Cambia el texto por una descripción más larga y alterna `maxLines: 1` y `maxLines: 3`. Después elimina el límite de ancho: observa cómo influye el espacio disponible en el salto de línea.
:::

## 🖼️ Image: incorporar imágenes

**`Image` muestra una imagen**, pero necesitamos indicar de dónde procede. Sus constructores con nombre permiten elegir el origen:

| Constructor | Origen | Ejemplo de uso |
| --- | --- | --- |
| `Image.asset` | Un recurso incluido en la aplicación. | Un logotipo o una ilustración. |
| `Image.network` | Una dirección de Internet. | Una fotografía de un catálogo. |
| `Image.file` | Un archivo del dispositivo. | Una fotografía local en plataformas compatibles; no se admite en Flutter web. |
| `Image.memory` | Bytes almacenados en memoria. | Una imagen recibida o generada como datos. |

### Imágenes de la aplicación

Para usar una fotografía local, crea la carpeta `assets/images/` en la raíz del proyecto y coloca en ella un archivo llamado `ruta.jpg`. Después declara la carpeta en **el bloque `flutter` que ya existe** en `pubspec.yaml`:

```yaml
flutter:
  uses-material-design: true
  assets:
    - assets/images/
```

Respeta la indentación: YAML utiliza espacios para expresar la estructura. Ejecuta `flutter pub get` después de modificar la configuración y vuelve a iniciar la aplicación si el recurso nuevo no aparece. Esta preparación requiere un proyecto local; DartPad no incorpora los archivos de tu ordenador.

```dart
Image.asset(
  'assets/images/ruta.jpg',
  width: 300,
  height: 180,
  fit: BoxFit.cover,
  semanticLabel: 'Sendero entre árboles junto a una cascada',
)
```

`width` y `height` definen el espacio solicitado. **`fit` indica cómo ajustar la imagen a ese espacio**:

| Valor | Resultado |
| --- | --- |
| `BoxFit.cover` | Mantiene la proporción y cubre el espacio; puede recortar los bordes. |
| `BoxFit.contain` | Mantiene la proporción y muestra la imagen completa; puede dejar espacio libre. |
| `BoxFit.fill` | Llena el espacio deformando la imagen si las proporciones no coinciden. |

`semanticLabel` describe la imagen para las tecnologías de asistencia. Si es puramente decorativa, puedes usar `excludeFromSemantics: true`. La [referencia de `Image.asset`](https://api.flutter.dev/flutter/widgets/Image/Image.asset.html) explica la carga de recursos.

### Imágenes de Internet

Una imagen remota necesita conexión y puede fallar. Podemos reservar su tamaño y ofrecer una alternativa mediante `errorBuilder`:

```dart
Image.network(
  'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
  width: 300,
  height: 180,
  fit: BoxFit.cover,
  semanticLabel: 'Un búho posado en una rama',
  errorBuilder: (context, error, stackTrace) => const SizedBox(
    width: 300,
    height: 180,
    child: Center(child: Text('No se pudo cargar la imagen')),
  ),
)
```

`errorBuilder` recibe información del fallo y devuelve el widget que se mostrará en su lugar. También existe `loadingBuilder` para personalizar la espera. En web, el servidor de origen debe permitir la carga según las restricciones del navegador; en otras plataformas revisa la configuración de acceso a Internet. Consulta la [referencia de `Image.network`](https://api.flutter.dev/flutter/widgets/Image/Image.network.html).

:::caution[Si un recurso no aparece]
Comprueba la ruta, las mayúsculas y minúsculas del nombre y la declaración en `pubspec.yaml`. La ruta se escribe desde la raíz del proyecto, no desde `lib/main.dart`.
:::

## 🧭 Icon: representar una idea con un símbolo

**`Icon` dibuja un símbolo a partir de un `IconData`**, como los que ofrece la clase `Icons`. Es útil para acompañar una etiqueta o identificar una acción:

```dart
const Icon(
  Icons.terrain,
  size: 40,
  color: Colors.teal,
  semanticLabel: 'Montaña',
)
```

`Icons.terrain` identifica el símbolo; `size` establece su tamaño y `color` su color. Los iconos Material requieren `uses-material-design: true` en `pubspec.yaml`, una opción que los proyectos Flutter habituales ya incluyen.

**Un `Icon` no responde a pulsaciones por sí mismo.** Si representa una acción, utiliza `IconButton`:

```dart
IconButton(
  tooltip: 'Guardar ruta',
  icon: const Icon(Icons.bookmark_border),
  onPressed: () {
    debugPrint('Guardar ruta');
  },
)
```

`tooltip` ayuda a comprender la acción y aporta una etiqueta de accesibilidad. El mensaje de `debugPrint` aparece en la consola; este ejemplo todavía no guarda datos. Puedes explorar los símbolos en la [referencia de `Icons`](https://api.flutter.dev/flutter/material/Icons-class.html).

## 👆 Botones: responder a una acción

Un botón combina una representación visual con una función que se ejecuta al pulsarlo. **`onPressed` recibe esa función**, mientras que `child` describe su contenido:

```dart
ElevatedButton(
  onPressed: () {
    debugPrint('Comenzamos la ruta');
  },
  child: const Text('Comenzar ruta'),
)
```

La expresión `() { ... }` es una función anónima sin parámetros. La entregamos al botón para que la ejecute más adelante. Si ya existe una función `guardarRuta`, escribimos `onPressed: guardarRuta`, sin paréntesis: `guardarRuta()` la ejecutaría al construir la interfaz.

### Elegir el tipo de botón

Todos estos botones atienden la pulsación, pero tienen distinta presencia visual:

| Widget | Cuándo encaja |
| --- | --- |
| `FilledButton` | Una acción principal que queremos destacar. |
| `ElevatedButton` | Una acción que necesita destacar mediante elevación. |
| `OutlinedButton` | Una acción secundaria con borde visible. |
| `TextButton` | Una acción de menor énfasis visual. |
| `IconButton` | Una acción compacta representada por un icono. |
| `FloatingActionButton` | Una acción destacada de la pantalla, habitualmente en `Scaffold.floatingActionButton`. |

Para combinar icono y texto, varios botones ofrecen el constructor `.icon`:

```dart
FilledButton.icon(
  onPressed: () {
    debugPrint('Ruta guardada');
  },
  icon: const Icon(Icons.bookmark_add_outlined),
  label: const Text('Guardar ruta'),
)
```

**`onPressed: null` desactiva el botón**. Es útil cuando una acción todavía no está disponible:

```dart
const OutlinedButton(
  onPressed: null,
  child: Text('Descargar mapa'),
)
```

El tema aporta el aspecto habitual de los botones. Si necesitas modificar uno concreto, utiliza su propiedad `style`, por ejemplo `FilledButton.styleFrom(...)`. Evita asignar colores a todos los botones por separado cuando puedes configurar el tema. La [referencia de `FilledButton`](https://api.flutter.dev/flutter/material/FilledButton-class.html) incluye sus variantes y propiedades.

## 🚧 Placeholder: reservar un espacio provisional

Durante el desarrollo quizá ya sepas dónde irá el mapa, pero aún no tengas ese componente. **`Placeholder` dibuja un recuadro con diagonales para hacer visible ese espacio pendiente**:

```dart
const SizedBox(
  width: 300,
  height: 160,
  child: Placeholder(
    color: Colors.teal,
    strokeWidth: 2,
  ),
)
```

`SizedBox` delimita el hueco y `Placeholder` lo señala. Cuando tengas el mapa, sustituye el marcador por el widget definitivo. **No representa automáticamente la carga de una imagen**: para una espera utiliza un indicador como `CircularProgressIndicator` o personaliza `Image.loadingBuilder`.

## 🏗️ Scaffold y AppBar: dar estructura a la pantalla

Hasta ahora hemos probado piezas dentro del cuerpo de una pantalla. **`Scaffold` ofrece las zonas habituales de una pantalla Material**, y `AppBar` configura su barra superior:

```dart
Scaffold(
  appBar: AppBar(
    title: const Text('Mis rutas'),
    actions: [
      IconButton(
        tooltip: 'Buscar rutas',
        icon: const Icon(Icons.search),
        onPressed: () {
          debugPrint('Buscar rutas');
        },
      ),
    ],
  ),
  body: const Center(child: Text('Elige tu próxima ruta')),
  floatingActionButton: FloatingActionButton(
    tooltip: 'Añadir ruta',
    onPressed: () {
      debugPrint('Añadir ruta');
    },
    child: const Icon(Icons.add),
  ),
)
```

En este caso, reemplaza el `Scaffold` completo del programa de prueba. `Scaffold` no sustituye a `MaterialApp`: el primero organiza una pantalla; el segundo configura la aplicación.

| Zona de `Scaffold` | Contenido habitual |
| --- | --- |
| `appBar` | Una barra superior, normalmente `AppBar`. |
| `body` | El contenido principal. |
| `floatingActionButton` | Un botón para una acción destacada. |
| `drawer` | Un panel lateral de navegación. |
| `bottomNavigationBar` | Navegación en la parte inferior; por ejemplo, `NavigationBar`. |

En `AppBar`, `title` recibe el título, `actions` una lista de acciones al final y `leading` un widget al principio. Cuando no configuras `leading`, Flutter puede añadir un botón para volver o abrir el panel lateral, según el contexto.

:::note[Una pantalla no se desplaza por tener Scaffold]
`Scaffold` organiza zonas, pero su `body` no se vuelve desplazable automáticamente. Si el contenido no cabe, necesitas una solución como `ListView` o `SingleChildScrollView`.
:::

### Mostrar un aviso con SnackBar

Para dar una respuesta breve a una acción, podemos mostrar una **`SnackBar` mediante `ScaffoldMessenger`**. Este fragmento puede sustituir el texto del programa de prueba:

```dart
FilledButton(
  onPressed: () {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Ruta guardada')),
    );
  },
  child: const Text('Guardar ruta'),
)
```

`ScaffoldMessenger.of(context)` localiza el gestor de mensajes más cercano. En este programa, `MaterialApp` lo proporciona y el `Scaffold` se registra en él. **Mostrar «Ruta guardada» no persiste la ruta**: la operación de guardado debe programarse por separado.

Una `SnackBar` sirve para una respuesta temporal. Un `MaterialBanner` presenta un aviso en la parte superior del cuerpo y permanece hasta que se retire, por ejemplo mediante `hideCurrentMaterialBanner`. Si utilizas uno, proporciona una acción para cerrarlo o atender el aviso. Consulta las referencias de [Scaffold](https://api.flutter.dev/flutter/material/Scaffold-class.html) y [ScaffoldMessenger](https://api.flutter.dev/flutter/material/ScaffoldMessenger-class.html).

## 🧩 Combinar las piezas: una ficha de ruta

Para combinar estos widgets necesitamos algunas piezas de disposición. **`Column` coloca hijos en vertical, `Row` en horizontal y `SizedBox` puede dejar una separación entre ellos**. `Padding` añade espacio interior; `Container` permite reunir espacio, alineación y decoración. Los estudiaremos con más detalle al trabajar la disposición de la interfaz.

:::tip[El tamaño depende del padre 📐]
Un widget solicita un tamaño dentro de los límites que recibe de su padre. Por eso `width: 300` no garantiza 300 píxeles lógicos en cualquier posición. Esta relación se explica en la [guía oficial de restricciones](https://docs.flutter.dev/ui/layout/constraints). En una `Row`, `Expanded` puede asignar al texto el espacio restante para que se ajuste.
:::

Este programa es **completo e independiente** del anterior. Funciona sin imágenes locales ni conexión: utilizamos un `Placeholder` para la futura fotografía. Pégalo en `lib/main.dart` o en DartPad:

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: FichaRuta()));

class FichaRuta extends StatelessWidget {
  const FichaRuta({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Explora')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(24),
          children: [
            const SizedBox(
              height: 180,
              child: Placeholder(color: Colors.teal),
            ),
            const SizedBox(height: 16),
            Text(
              'Ruta de la cascada',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            const Row(
              children: [
                Icon(Icons.terrain, color: Colors.teal),
                SizedBox(width: 8),
                Expanded(child: Text('Dificultad fácil · 4 km')),
              ],
            ),
            const SizedBox(height: 12),
            const Text(
              'Un paseo entre árboles para disfrutar del paisaje. '
              'Lleva agua y calzado cómodo.',
            ),
            const SizedBox(height: 24),
            FilledButton.icon(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Has pulsado Guardar ruta'),
                  ),
                );
              },
              icon: const Icon(Icons.bookmark_add_outlined),
              label: const Text('Guardar ruta'),
            ),
          ],
        ),
      ),
    );
  }
}
```

`SafeArea` evita que el contenido invada zonas reservadas del dispositivo. `ListView` organiza la ficha en vertical y permite desplazarla si no cabe; `Expanded` deja al texto de la fila utilizar el ancho restante. Los `SizedBox` separan las piezas sin añadir texto ni decoración.

Observa que el botón muestra un mensaje, pero la ficha sigue siendo un `StatelessWidget`: **una acción no implica necesariamente estado propio**. Necesitaríamos gestionar estado si quisiéramos recordar dentro de la ficha si está guardada y cambiar su icono o etiqueta.

## 🎯 Practica con la ficha

1. Cambia el título, la descripción y la distancia para representar otra ruta.
2. Añade un segundo `Text` con una recomendación en cursiva.
3. Sustituye el botón por `OutlinedButton.icon` y compara su énfasis visual.
4. En un proyecto local, incorpora una fotografía con `Image.asset` en lugar del `Placeholder`. Compara `BoxFit.cover` y `BoxFit.contain`.
5. Añade una acción de información a `AppBar` que muestre una `SnackBar` al pulsarla.
6. Prueba una ventana estrecha y un tamaño de texto mayor en el dispositivo. Comprueba que puedes desplazarte y leer el contenido.

:::tip[Antes de pasar al siguiente apartado ✅]
Debes poder explicar qué diferencia hay entre `Icon` e `IconButton`, por qué un botón recibe una función en `onPressed`, dónde declaras una imagen local y qué papel tienen `MaterialApp`, `Scaffold` y `AppBar`. Si puedes modificar la ficha y justificar tu elección de widgets, ya tienes una base para construir pantallas propias.
:::
