---
title: "Variantes de un componente"
sidebar:
  order: 2
---

Una **variante** es una forma de presentar o configurar un mismo componente. Piensa en una etiqueta que a veces debe verse discreta y otras veces destacada. No necesitamos escribir dos clases: podemos crear una sola y decidir su aspecto mediante un parámetro.

En este apartado construiremos esa etiqueta paso a paso. Solo utilizaremos un widget que muestra texto y unas pocas opciones para darle formato; las explicamos aquí antes de usarlas. Más adelante conocerás sus demás posibilidades.

## 1. Las piezas mínimas del ejemplo

`Text` es un widget que muestra la cadena que recibe entre paréntesis:

```dart
const Text('Ruta de la cascada')
```

Si queremos cambiar su aspecto, podemos proporcionar el argumento `style`. Este recibe un objeto `TextStyle` que reúne la configuración visual:

```dart
const Text(
  'Ruta de la cascada',
  style: TextStyle(
    fontSize: 22,
    fontWeight: FontWeight.bold,
    color: Colors.indigo,
  ),
)
```

| Pieza | Qué significa en este ejemplo |
| --- | --- |
| `'Ruta de la cascada'` | Contenido visible. Se entrega como primer argumento, sin nombre. |
| `style: TextStyle(...)` | Configuración del aspecto del texto. `TextStyle` es un objeto de configuración, no otro widget. |
| `fontSize: 22` | Tamaño del texto en píxeles lógicos, una medida que Flutter adapta a la densidad de la pantalla. |
| `fontWeight: FontWeight.bold` | Texto en negrita. `FontWeight.normal` seleccionaría un peso normal. |
| `color: Colors.indigo` | Color del texto. `Colors` ofrece valores de color ya definidos. |

El resultado es una etiqueta grande, en negrita y de color índigo. Esta configuración se aplica solo a ese texto. Ahora vamos a hacer que un componente elija entre ese aspecto y otro más discreto.

## 2. Decide qué recibe el componente

Antes de escribir la clase, piensa qué debería poder decidir quien utilice nuestra etiqueta. En el ejemplo anterior, el mensaje y el estilo estaban escritos directamente dentro de `Text`. Si copiáramos ese código para cada etiqueta, tendríamos que repetir las decisiones de tamaño, peso y color en muchos lugares.

Vamos a reunir esas decisiones en un componente propio llamado `EtiquetaCatalogo`. Será una clase que construye un `Text` por nosotros. Desde fuera le indicaremos **qué mensaje mostrar** y **si debe destacarlo**; dentro de la clase decidiremos cómo se traduce eso en tamaño, peso y color.

Los datos que proporcionamos al crear el componente entran mediante los **parámetros de su constructor**. Necesitaremos estos dos:

| Parámetro | Función | Ejemplo |
| --- | --- | --- |
| `String texto` | Contenido obligatorio que mostrará la etiqueta. | `texto: 'Ruta de la cascada'` |
| `bool destacada` | Selecciona la variante visual; por defecto vale `false`. | `destacada: true` |

`String texto` significa que el parámetro `texto` recibe una cadena de caracteres. Lo haremos obligatorio porque una etiqueta necesita un mensaje que mostrar. `bool destacada` recibe uno de dos valores: `true` o `false`. Lo haremos opcional: si no lo indicamos, la etiqueta utilizará el aspecto normal.

Así será su uso cuando hayamos creado la clase:

```dart
const EtiquetaCatalogo(texto: 'Ruta de la cascada')
```

Esta llamada entrega el mensaje y omite `destacada`, por lo que se utilizará `false`. Para mostrar el mismo mensaje con el aspecto destacado, escribiremos:

```dart
const EtiquetaCatalogo(
  texto: 'Ruta de la cascada',
  destacada: true,
)
```

Son dos instancias de la misma clase. Cambia la configuración recibida, no la definición del componente. También podríamos cambiar solo `texto` y conservar la misma variante.

Fíjate en que quien utiliza la etiqueta **no necesita elegir el tamaño, el peso ni el color**: solo expresa la intención de destacarla. La clase se encargará de aplicar esos detalles de forma coherente en todos los lugares donde se use.

## 3. Crea el componente en su archivo

Ahora vamos a escribir la clase que hará posibles esas llamadas. Separaremos dos responsabilidades: **el componente define cómo se dibuja una etiqueta** y **la pantalla decide qué etiquetas mostrar y con qué datos**.

Guardaremos el componente en su propio archivo para poder importarlo y utilizarlo desde distintas pantallas, sin copiar su código. Crear el archivo no hace que aparezca automáticamente en la aplicación: en el paso 4 lo importaremos y añadiremos instancias a la pantalla del catálogo.

En el explorador de VS Code:

1. Dentro de `lib`, crea la carpeta `componentes` si todavía no existe.
2. Dentro de esa carpeta, crea `etiqueta_catalogo.dart`. Este archivo contendrá la clase `EtiquetaCatalogo`; en Dart usamos guiones bajos para el nombre del archivo y mayúsculas iniciales para el de la clase.
3. Copia el código completo siguiente y guarda el archivo.

El `import` da acceso a las clases de Flutter que utilizaremos. Después encontrarás los campos que guardan la configuración, el constructor que la recibe y el método `build` que la convierte en una interfaz. Justo debajo leeremos cada una de esas partes:

```dart
import 'package:flutter/material.dart';

class EtiquetaCatalogo extends StatelessWidget {
  final String texto;
  final bool destacada;

  const EtiquetaCatalogo({
    super.key,
    required this.texto,
    this.destacada = false,
  });

  @override
  Widget build(BuildContext context) {
    final estilo = TextStyle(
      fontSize: destacada ? 22 : 16,
      fontWeight: destacada ? FontWeight.bold : FontWeight.normal,
      color: destacada ? Colors.indigo : Colors.black87,
    );

    return Text(texto, style: estilo);
  }
}
```

### Cómo leer la clase

`EtiquetaCatalogo` hereda de `StatelessWidget`: recibe configuración y devuelve una descripción de la interfaz en `build`. No necesita guardar un dato que vaya cambiando por sí mismo.

Los campos `texto` y `destacada` son `final`: una vez creada la instancia, no les asignamos otro valor. El constructor exige `texto` mediante `required`; permite omitir `destacada` porque tiene el valor predeterminado `false`. `super.key` mantiene el parámetro opcional que Flutter utiliza para identificar widgets.

`build` recibe un `BuildContext`, que representa su lugar en el árbol de widgets. En este ejemplo no necesitamos consultarlo. El método prepara el estilo y devuelve `Text(texto, style: estilo)` para mostrar el contenido recibido.

### Cómo se elige la variante

La expresión **`condicion ? valorSiEsCierta : valorSiEsFalsa`** selecciona uno de dos valores. Por ejemplo, `destacada ? 22 : 16` utiliza `22` si `destacada` es `true` y `16` si es `false`.

| Propiedad | Normal: `destacada: false` | Destacada: `destacada: true` |
| --- | --- | --- |
| Tamaño | 16 | 22 |
| Peso | Normal | Negrita |
| Color | Negro suavizado (`Colors.black87`) | Índigo (`Colors.indigo`) |

La variable local `estilo` agrupa el resultado. Crear esa configuración dentro del componente permite que todas sus instancias destacadas compartan el mismo aspecto.

El constructor puede ser `const` porque los campos son inmutables. En cambio, `Text(texto, style: estilo)` no lleva `const`: dentro de `build` utiliza los valores de esa instancia y el estilo que acabamos de calcular.

## 4. Compara las dos variantes en el catálogo

Utilizaremos la pantalla `Text` que ya preparaste al crear el catálogo; todavía no necesitas conocer otras propiedades de ese widget. Sustituye el contenido de `lib/pantallas/text_ejemplos_pantalla.dart` por el siguiente archivo completo:

```dart
import 'package:flutter/material.dart';

import '../componentes/etiqueta_catalogo.dart';

class TextEjemplosPantalla extends StatelessWidget {
  const TextEjemplosPantalla({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ejemplos de Text')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          EtiquetaCatalogo(texto: 'Ruta de la cascada'),
          SizedBox(height: 16),
          EtiquetaCatalogo(
            texto: 'Ruta de la cascada',
            destacada: true,
          ),
        ],
      ),
    );
  }
}
```

El import `../componentes/etiqueta_catalogo.dart` hace accesible nuestra clase. `../` sube desde `pantallas` a `lib`, y después la ruta entra en `componentes`.

Estas son las piezas de la pantalla, que usamos como soporte para comparar las etiquetas:

| Pieza | Para qué la usamos aquí |
| --- | --- |
| `Scaffold` | Organiza la pantalla en una barra y un cuerpo. |
| `AppBar` y `title` | Muestran el título de la sección con un `Text`. |
| `ListView` y `children` | Colocan las etiquetas en una lista vertical que permite desplazarse si no caben. Los corchetes contienen sus widgets, separados por comas. |
| `padding: EdgeInsets.all(16)` | Deja 16 píxeles lógicos de espacio interior en cada lado de la lista. `EdgeInsets` es un objeto de medidas, no un widget. |
| `SizedBox(height: 16)` | Deja un hueco vertical entre las dos etiquetas. |
| `children: const [...]` | Declara constante esta lista y permite omitir `const` delante de sus objetos anidados. |

Ejecuta la aplicación y abre `Text`. Debes ver **el mismo contenido con dos aspectos distintos**. La primera etiqueta omite `destacada` y usa `false`; la segunda entrega `true`.

Aquí **no estamos pulsando para cambiar de variante**: son dos instancias con configuraciones diferentes. Elegir el aspecto por un parámetro no requiere un `StatefulWidget`. Si un padre proporciona otra configuración, el componente describe el resultado que corresponde a esa nueva configuración.

## 5. Cuando necesites más de dos variantes

Un booleano funciona bien para dos opciones. Para un conjunto de tres o más, un `enum` permite dar un nombre a cada una y evitar combinaciones ambiguas de varios booleanos:

```dart
enum VarianteEtiqueta { normal, destacada, aviso }
```

Esta declaración iría en `etiqueta_catalogo.dart`, fuera de la clase. Para adaptar el componente, sustituiríamos el campo `destacada` por `final VarianteEtiqueta variante` y su parámetro de constructor por `this.variante = VarianteEtiqueta.normal`.

Dentro de `build`, esta selección reemplazaría la definición actual de `estilo`:

```dart
final estilo = switch (variante) {
  VarianteEtiqueta.normal => const TextStyle(fontSize: 16),
  VarianteEtiqueta.destacada => const TextStyle(
    fontSize: 22,
    fontWeight: FontWeight.bold,
  ),
  VarianteEtiqueta.aviso => const TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.bold,
    color: Colors.deepOrange,
  ),
};
```

La expresión `switch` compara `variante` con cada opción. A la derecha de cada `=>` está el `TextStyle` que se obtiene en ese caso. El punto y coma cierra la asignación a `estilo`. Después seguimos devolviendo `Text(texto, style: estilo)`.

Un uso sería `EtiquetaCatalogo(texto: 'Revisa la ruta', variante: VarianteEtiqueta.aviso)`. Al cambiar la API, los usos anteriores con `destacada: true` deberán pasar a `variante: VarianteEtiqueta.destacada`.

## ✍️ Actividad: completa tus variantes

1. Comprueba primero las dos variantes booleanas con el mismo texto y explica qué selecciona cada expresión condicional.
2. Adapta el componente a las tres opciones del `enum`. Mantén una única clase y muestra las tres configuraciones en la lista del catálogo, sustituyendo los usos anteriores.
3. Cambia el tamaño de la variante destacada en el componente y verifica que todas sus instancias destacadas se actualizan al recargar la aplicación.
4. Comprueba que el texto recibido se conserva en todas las variantes y que el aviso se distingue por peso o tamaño, además de por color. Usa un contenido como «Aviso: revisa la ruta» para expresar también su significado con palabras.

Conserva la clase reutilizable en `lib/componentes/` y las instancias de demostración en la pantalla. Este será el patrón de las actividades de los siguientes apartados: **un componente con parámetros y varias configuraciones mostradas en el catálogo**.

Referencia: [`TextStyle`](https://api.flutter.dev/flutter/painting/TextStyle-class.html).
