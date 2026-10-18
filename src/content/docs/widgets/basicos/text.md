---
title: "Text: mostrar y dar formato al texto"
sidebar:
  order: 3
---

**`Text` muestra una cadena de caracteres**: un título, una descripción o un valor convertido a texto. Su primer argumento es el contenido que queremos mostrar.

```dart
const Text('Hola, Flutter')
```

Este es un widget completo: no necesita definir un estilo para mostrar el mensaje.

## 🔧 Propiedades principales

### 1. `style`: tamaño, peso y color

`style` permite dar una jerarquía visual al texto: distinguir un título de una descripción, resaltar un dato o indicar un aviso. Recibe un `TextStyle`, un objeto de configuración, no un widget. Dentro de él, `fontSize` establece el tamaño en píxeles lógicos; `fontWeight`, el peso; y `color`, el color.

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

Debe verse un texto grande, en negrita y verde azulado. Cambia una opción cada vez para identificar su efecto.

### 2. `textAlign`: alineación dentro del espacio

`textAlign` decide cómo se alinean las líneas de texto dentro del ancho disponible. Es útil para centrar un mensaje breve, alinear una cantidad a la derecha o mantener una descripción alineada al inicio. Su efecto se aprecia cuando el texto dispone de más ancho que su contenido; no coloca por sí mismo el widget en la pantalla.

```dart
const Center(
  child: SizedBox(
    width: 240,
    child: Text('Una ruta fácil', textAlign: TextAlign.right),
  ),
)
```

`SizedBox` solicita un ancho de 240 y contiene un hijo. `Center` centra ese recuadro y permite que mantenga su ancho dentro de la lista. `textAlign` lleva el texto al borde derecho **del recuadro**, no de la pantalla. Prueba también `left` y `center`.

### 3. `maxLines` y `overflow`: texto que no cabe

`maxLines` limita cuántas líneas puede mostrar el texto y `overflow` decide cómo representar lo que no cabe. Son útiles en tarjetas, listados o resúmenes donde una descripción larga no debe ocupar toda la pantalla. Con `TextOverflow.ellipsis`, los puntos suspensivos indican que hay contenido sin mostrar.

```dart
const Center(
  child: SizedBox(
    width: 220,
    child: Text(
      'Un recorrido entre árboles que termina junto a una cascada. '
      'El sendero continúa hasta el mirador de la montaña.',
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
    ),
  ),
)
```

Mantenemos `Center` y `SizedBox` para que el ancho esté limitado y el recorte sea observable. Compara una y dos líneas usando el mismo texto.

### 4. `softWrap`: saltos de línea

`softWrap` controla si el texto puede saltar de línea en los espacios para adaptarse al ancho. Normalmente interesa permitirlo en descripciones; desactivarlo puede ser útil en una etiqueta que deba mantenerse en una sola línea, definiendo también qué hacer si desborda. `softWrap: false` no equivale a configurar solo `maxLines: 1`.

```dart
const Center(
  child: SizedBox(
    width: 180,
    child: Text(
      'Una descripción más larga que el espacio disponible',
      softWrap: false,
      overflow: TextOverflow.fade,
    ),
  ),
)
```

`fade` desvanece el borde del texto que desborda. Compara el resultado con `softWrap: true` dentro del mismo recuadro.

### 5. `semanticsLabel`: significado accesible

`semanticsLabel` ofrece al lector de pantalla una descripción alternativa al texto visible. Es útil cuando mostramos abreviaturas, unidades o símbolos que conviene leer con su significado completo, sin cambiar lo que aparece en pantalla.

```dart
const Text('12 km', semanticsLabel: 'Doce kilómetros')
```

El contenido visible sigue siendo «12 km». Comprueba la descripción mediante las herramientas de accesibilidad; no se dibuja como otro texto.

## ✍️ Actividad: crea componentes con variantes

Implementa **los dos componentes** siguientes como `StatelessWidget`, cada uno en el archivo indicado dentro de `lib/componentes/`. Los nombres y parámetros son el contrato que debes cumplir, no una solución implementada. Usa campos `final`, parámetros con nombre, `super.key` y constructor `const` cuando sea posible. Las variantes se eligen mediante parámetros: no necesitan estado propio.

Los parámetros sin valor predeterminado son obligatorios; márcalos con `required`, también si admiten `null`. Un tipo terminado en `?` admite `null`. Los `enum` propuestos se declaran en el mismo archivo que el componente.

Si necesitas recordar cómo un parámetro selecciona el aspecto, consulta [Variantes de un componente](../estilo-y-variantes/). La implementación de estas propuestas te corresponde a ti.

### 1. `TextoJerarquico`

`lib/componentes/texto_jerarquico.dart`

Parámetros: `String texto`, `TipoTexto tipo = TipoTexto.cuerpo`.

Define `enum TipoTexto { titulo, subtitulo, cuerpo }`. Cada opción seleccionará un tamaño y un peso dentro del componente. El texto recibido debe conservarse en las tres variantes.

### 2. `TextoResumen`

`lib/componentes/texto_resumen.dart`

Parámetros: `String texto`, `int lineas = 2`, `bool centrado = false`.

Limita el texto con puntos suspensivos y cambia su alineación mediante `centrado`. Admite solo un número positivo de líneas y comprueba el caso de una descripción larga.

## 🧩 Muestra los componentes en el catálogo

En `lib/view/text_ejemplos_pantalla.dart`, conserva `TextEjemplosPantalla` e importa los archivos nuevos. Cada import va al principio, fuera de las clases:

```dart
import '../componentes/texto_jerarquico.dart';
import '../componentes/texto_resumen.dart';
```

`../` sube de `view` a `lib`; después entra en `componentes`. Los imports hacen accesibles las clases y los `enum` públicos de esos archivos.

Cuando hayas implementado los componentes, podrás utilizarlos así dentro de `children`:

```dart
const TextoJerarquico(texto: 'Ruta del río', tipo: TipoTexto.titulo),
const TextoJerarquico(texto: 'Ruta del río', tipo: TipoTexto.cuerpo),
const Center(
  child: SizedBox(
    width: 220,
    child: TextoResumen(
      texto: 'Un recorrido largo que permite comparar las líneas visibles.',
      lineas: 1,
      centrado: true,
    ),
  ),
),
```

Muestra las tres jerarquías con el mismo contenido y dos resúmenes con distinto límite de líneas. Comprueba texto corto y largo. Las pruebas deben detectar una jerarquía incorrecta o un límite que no se aplique; revisa también visualmente el recorte.

Añade las combinaciones que falten: los usos anteriores son solo un comienzo. Identifica cada caso con un título y una explicación propia. No dupliques una clase por cada combinación ni copies los componentes dentro de la pantalla. Puedes utilizar `create-component` para revisar tu implementación y `test-widget` para generar pruebas con criterios concretos. Ejecuta `dart format lib`, `flutter analyze` y las pruebas que hayas creado.

Referencia: [Text](https://api.flutter.dev/flutter/widgets/Text-class.html).
