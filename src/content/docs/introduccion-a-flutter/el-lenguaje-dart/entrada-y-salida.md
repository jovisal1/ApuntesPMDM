---
title: "Entrada y salida"
sidebar:
  label: "Entrada y salida"
  order: 4
---

Cuando desarrollamos un programa, habitualmente necesitamos **mostrar información al usuario y obtener datos introducidos por este**. En aplicaciones de consola, estas operaciones se realizan mediante los mecanismos de entrada y salida estándar.

#### Mostrar información: `print()`

La forma más sencilla y habitual de mostrar información por consola en Dart es mediante la función `print()`:

```dart
void main() {
  print('¡Hola, soy Dart!');
  print('Estamos aprendiendo Flutter');
}
```

Obtendremos:

```
¡Hola, soy Dart!
Estamos aprendiendo Flutter
```

La función `print()` muestra el valor que le proporcionamos y **añade automáticamente un salto de línea al final**.

Además de cadenas de texto, podemos utilizarla para mostrar variables, expresiones u otros tipos de datos:

```dart
void main() {
  String nombre = 'Ana';
  int edad = 20;

  print(nombre);
  print(edad);
  print('Hola, $nombre');
  print('El año que viene tendrás ${edad + 1} años');
}
```

En la mayoría de nuestros ejemplos utilizaremos `print()` por su sencillez.

#### Entrada y salida mediante `dart:io`

Cuando necesitamos un mayor control sobre la entrada y salida por consola, Dart proporciona la biblioteca `dart:io`:

```dart
import 'dart:io';
```

Esta biblioteca nos proporciona, entre otros, los siguientes elementos:

* `stdin`: representa la **entrada estándar** y permite leer datos introducidos por el usuario.
* `stdout`: representa la **salida estándar** y permite escribir información en la consola.
* `stderr`: representa la **salida de errores** y permite mostrar mensajes de error.

Para escribir mediante la salida estándar podemos utilizar `stdout.write()`:

```dart
stdout.write('¿Cómo te llamas? ');
```

A diferencia de `print()`, `stdout.write()` **no añade automáticamente un salto de línea**. Esto resulta especialmente útil cuando queremos que el usuario introduzca un valor justo a continuación del mensaje.

#### Leer datos desde el teclado

Para leer una línea introducida por el usuario utilizaremos `stdin.readLineSync()`:

```dart
import 'dart:io';

void main() {
  stdout.write('¿Cómo te llamas? ');

  String? nombre = stdin.readLineSync();

  print('¡Hola, $nombre!');
}
```

Una posible ejecución sería:

```
¿Cómo te llamas? Juan
¡Hola, Juan!
```

Observa que `readLineSync()` devuelve un `String?`. El símbolo `?` indica que el resultado **puede ser `null`**, concepto relacionado con el sistema de **Null Safety** de Dart que estudiaremos más adelante.

#### Leer valores numéricos

Los valores obtenidos mediante `stdin.readLineSync()` son cadenas de texto. Si necesitamos trabajar con números, tendremos que **convertir el valor leído al tipo correspondiente**.

Para leer un entero podemos utilizar `int.parse()`:

```dart
import 'dart:io';

void main() {
  stdout.write('Introduce tu edad: ');

  int edad = int.parse(stdin.readLineSync()!);

  print('Tienes $edad años');
}
```

Para un número decimal utilizaríamos `double.parse()`:

```dart
double precio = double.parse(stdin.readLineSync()!);
```

En estos ejemplos aparece también el operador `!`:

```dart
stdin.readLineSync()!
```

Con él indicamos a Dart que **estamos seguros de que el valor obtenido no será `null`**. Igual que ocurre con ?, cuando estudiemos Null Safety, veremos con detalle qué significa este operador y cómo podemos evitar posibles errores.
