---
title: "Conceptos básicos"
sidebar:
  label: "Conceptos básicos"
  order: 3
---

Antes de adentrarnos en aspectos más concretos del lenguaje Dart, es necesario tener en cuenta los siguientes detalles:

## [Método main](https://dart.dev/language/functions#the-main-function)

En Dart, la función `main()` constituye el **punto de entrada de un programa**. Esto significa que, cuando ejecutamos un archivo Dart, la ejecución comienza por las instrucciones que se encuentran dentro de esta función.

Su forma más sencilla es:

```dart
void main() {
  // Código del programa
}
```

La palabra `void` indica que la función **no devuelve ningún valor**. Aunque Dart permite omitir el tipo de retorno en este caso, es recomendable indicarlo explícitamente para mejorar la legibilidad del código.

#### Argumentos de entrada

La función `main()` también puede recibir **argumentos desde la línea de comandos**. Para ello, podemos definir un parámetro de tipo `List<String>`:

```dart
void main(List<String> args) {
  print(args);
}
```

Los argumentos se proporcionan al ejecutar el programa, escribiéndolos a continuación del nombre del archivo:

```bash
dart programa.dart param1 param2
```

Dart almacenará estos valores, en el mismo orden, dentro de la lista `args`:

```
args[0] → "param1"
args[1] → "param2"
```

Por ejemplo:

```dart
void main(List<String> args) {
  print('Primer argumento: ${args[0]}');
  print('Segundo argumento: ${args[1]}');
}
```

Si ejecutamos:

```bash
dart programa.dart Flutter Dart
```

obtendremos:

```
Primer argumento: Flutter
Segundo argumento: Dart
```

:::caution

Antes de acceder a una posición concreta de `args`, debemos asegurarnos de que el argumento existe. De lo contrario, intentaremos acceder a una posición inexistente de la lista y se producirá un error durante la ejecución.

:::

## [Comentarios](https://dart.dev/language/comments)

Dart admite tres tipos de comentarios:

1. **Comentarios de una sola línea**: Se usan con `//` y se colocan en cualquier línea para explicar una porción de código.

   ```dart
   // Esto es un comentario de una sola línea
   var x = 5;
   ```
2. **Comentarios de varias líneas**: Se encierran entre `/* */` y se usan para explicar bloques de código más largos.

   ```dart
   /* 
   Este es un comentario
   de varias líneas
   */
   var y = 10;
   ```
3. **Comentarios de documentación**: Se utilizan para documentar funciones, clases o variables, y se indican con `///`.

   ```dart
   /// Esta función imprime un saludo
   void saludo() {
     print('Hola');
   }
   ```

## Bloques de código e instrucciones

Un bloque de código en Dart se define con llaves `{ }`, y agrupa varias instrucciones que se ejecutan juntas. Los bloques de código se utilizan en funciones, bucles, condicionales, etc.

```dart
void main() {
  // Este es un bloque de código
  if (true) {
    print('Esto está dentro de un bloque de código');
  }
}
```

:::note

**Importantísimo!!!**. Toda instrucción en Dart debe terminar en `;`

:::
