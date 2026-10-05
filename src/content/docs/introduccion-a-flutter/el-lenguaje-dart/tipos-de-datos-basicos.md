---
title: "Tipos de datos básicos"
sidebar:
  label: "Tipos de datos básicos"
  order: 5
---

https\://dart.dev/language/built-in-types

Dart soporta (entre otros) los siguientes tipos de variables básicos:

* [Numéricos](https://dart.dev/language/built-in-types#numbers) (`int`, `double`)
* [Cadenas de caracteres](https://dart.dev/language/built-in-types#strings) (`String`)
* [Booleanos](https://dart.dev/language/built-in-types#booleans) (`bool`)
* El  valor `null` (`Null`)

En **Dart**, las variables se pueden declarar utilizando las palabras clave **`var`**, **`final`**, o **`const`** dependiendo del tipo de variable que necesitemos y seguido de su identificador. A continuación, podemos asignar su valor. Por ejemplo:

1. **`var`**: Declara una variable cuyo tipo es inferido automáticamente.

   ```dart
   var nombre = 'Juan';  // Dart infiere que es de tipo String
   ```
2. **`final`**: Declara una variable cuyo valor no puede cambiar después de asignarse.

   ```dart
   final edad = 25;  // No se puede reasignar
   ```
3. **`const`**: Similar a `final`, pero el valor debe ser conocido en tiempo de compilación.

   ```dart
   const pi = 3.14;  // Valor constante
   ```

Además, puedes especificar el tipo explícitamente:

```dart
int numero = 10;
String mensaje = 'Hola';
```

## Numéricos

Los valores numéricos en Dart pueden ser de dos tipos: [`int`](https://api.dart.dev/stable/dart-core/int-class.html) y [`double`](https://api.dart.dev/stable/3.5.2/dart-core/double-class.html)*.* Mientras `int` se utiliza para representar valores enteros de menos de 64 bits, `double` lo utilizaremos para valores decimales.

:::note

Tanto `int` como `double` son subtipos de [`num`](https://api.dart.dev/stable/3.5.2/dart-core/num-class.html). El tipo num incluye operadores básicos como +, -, / y \*, y métodos muy  útiles como por ejemplo toInt(), toDouble() o toString() para realizar conversiones entre tipos o ceil() y floor() para redondeos.&#x20;

Podemos declarar una variable como num que podrá ser tanto entero como double:

```dart
num x = 1; // x puede ser tanto entero como double
x += 2.5;
```


:::

Veámos algunos ejemplos de uso de variables numéricas:

```dart
// Declaramos una variable (numeroEntero) de tipo int
int numeroEntero = 42;
// Creamos otra variable (cadenaNumeroEntero) con el valor convertido a String
String cadenaNumeroEntero = numeroEntero.toString();
// Verificamos que cadenaNumeroEntero tiene el valor esperado
assert(cadenaNumeroEntero == '42');
// Creamos otra variable (numeroDouble) con el valor convertido a double
double numeroDouble = 43.2;
// Creamos otra variable (cadenaNumeroDouble) con el valor convertido a String
String cadenaNumeroDouble = numeroDouble.toString();
// Verificamos que cadenaNumeroDouble tiene el valor esperado
assert(cadenaNumeroDouble == '43.2');
```

En el anterior código se utiliza la función `assert`. Esta es una función utilizada **para verificar condiciones durante la fase de desarrollo**. Sirve para depurar el código, permitiendo comprobar que una expresión o condición es verdadera mientras se ejecuta en modo de depuración. Si la condición evaluada con `assert` es falsa, el programa lanza una excepción, interrumpiendo su ejecución y mostrando un mensaje de error opcional.

## Cadenas de caracteres

Las cadenas se utilizan principalmente **para representar texto** y para definir una variable de este tipo, anteponemos al nombre de la variable el tipo de dato [String](https://api.flutter.dev/flutter/dart-core/String-class.html). Además, una cadena **puede ser de una o varias líneas**. Las cadenas de una sola línea se escriben utilizando comillas simples o dobles coincidentes, y las cadenas de varias líneas se escriben utilizando comillas triples. Las siguientes son todas las cadenas de Dart válidas:

```dart
String msg1 = 'Hola a PMDM';  
  
String msg2 = "Esto también es una cadena de texto";  
  
String msg3 = ''' Igual  
que  
esto'''  
```

### Concatenación de cadenas

La forma más simple de concatenar cadenas de caracteres en Dart es utilizando el operador de suma (`+`). El operador de suma se utiliza para unir dos o más cadenas de caracteres. Veamos un ejemplo:

```dart
String nombre = "Pepe";
int edad = 15;
String mensaje = "Hola, mi nombre es " + nombre + " y tengo " + edad + " años";
print(mensaje); // Imprime Juan Pérez
```

La ejecución del anterior  código mostraría como resultado la cadena Hola, mi nombre es *`Pepe y tengo 15 años`*

### Interpolación de valores

La interpolación de textos es una forma elegante y fácil de combinar valores de variables dentro de cadenas de caracteres. En lugar de concatenar manualmente  todos los elementos (textos y valores de variables) utilizando el operador de concatenación (+), la interpolación de textos nos permite incrustar variables directamente en la cadena utilizando la sintaxis especial `${variable}`.

El ejemplo anterior podría resolverse fácilmente utilizando interpolación con el siguiente código:

```dart
String nombre = 'Pepe';
int edad = 15;
String mensaje = 'Hola, mi nombre es $nombre y tengo $edad años.';
print(mensaje);
```

:::note

Algunos métodos y propiedades útiles de tratamiento de cadenas son las siguientes:&#x20;

* startsWith(cadena): devuelve verdadero si la variable comienza con la cadena pasada como parámetro o falso en caso contrario.&#x20;
* endsWith(cadena): devuelve verdadero si la variable comienza con la cadena pasada como parámetro o falso en caso contrario.&#x20;
* contains(cadena): devuelve verdadero si la variable contiene la cadena pasada como parámetro o falso en caso contrario.&#x20;
* toUpperCase()/ toLowerCase(): devuelve el valor dela variable con todos sus caracteres en mayúscula o mínúscula.
* trim(): elimina los espacios al comienzo y al final de la variable.&#x20;
* length: devuelve el número de caracteres de la cadena de texto.&#x20;
* isEmpty: devuelve verdadero si es una cadena vacía o falso en caso contrario.&#x20;
* substring(inicio, fin): devuelve la porción de texto comprendido entre los caracteres en las posiciones inicio y fin.

Algunos ejemplos de uso serían:

```dart
const string = 'dartlang';
print('$string has ${string.length} letters'); // dartlang tiene 8 letras
const string = 'Dart es divertido';
print(string.substring(0, 4)); // 'Dart'
```


:::

Sí. Para una introducción a Dart, la centraría en las conversiones que realmente van a utilizar: **String ↔ números**, `int ↔ double`, `toString()` y las variantes seguras `tryParse()`.

## Conversión de tipos

En determinadas situaciones necesitaremos **convertir un valor de un tipo de dato a otro**. Por ejemplo, los datos introducidos por teclado se reciben como cadenas de texto (`String`), por lo que tendremos que convertirlos si queremos realizar operaciones numéricas con ellos.

Dart proporciona diferentes métodos para realizar estas conversiones.

### De `String` a valores numéricos

Podemos convertir una cadena de texto a un número entero mediante `int.parse()`:

```dart
String texto = '25';
int numero = int.parse(texto);
print(numero); // 25
```

Para convertir una cadena a un número decimal utilizaremos `double.parse()`:

```dart
String texto = '12.5';
double numero = double.parse(texto);
print(numero); // 12.5
```

Es importante que el contenido de la cadena represente un número válido. Por ejemplo:

```dart
int numero = int.parse('Flutter');
```

producirá un error durante la ejecución, ya que `'Flutter'` no puede convertirse en un número entero.

### Conversiones seguras con `tryParse()`

Cuando no podemos garantizar que el texto contiene un número válido, es preferible utilizar `tryParse()`:

```dart
String texto = '25';

int? numero = int.tryParse(texto);

print(numero); // 25
```

Si la conversión no puede realizarse, `tryParse()` devuelve `null` en lugar de producir una excepción:

```dart
String texto = 'Flutter';
int? numero = int.tryParse(texto);
print(numero); // null
```

Esto nos permite comprobar fácilmente si la conversión se ha realizado correctamente:

```dart
String texto = '25';
int? numero = int.tryParse(texto);
if (numero != null) {
  print('El número es $numero');
} else {
  print('El valor introducido no es válido');
}
```

También disponemos de:

```dart
double.tryParse('12.5');
```

para realizar conversiones seguras a `double`.

### De valores numéricos a `String`

Para convertir un valor a una cadena de texto podemos utilizar el método `toString()`:

```dart
int edad = 25;
String texto = edad.toString();
print(texto); // "25"
```

Podemos utilizarlo también con otros tipos:

```dart
double precio = 19.95;
bool activo = true;
String precioTexto = precio.toString();
String activoTexto = activo.toString();
```

No obstante, cuando únicamente queremos **incorporar un valor dentro de una cadena**, normalmente será más cómodo utilizar interpolación:

```dart
int edad = 25;
print('Tengo $edad años');
```

### Conversión entre `int` y `double`

Dart distingue entre números enteros (`int`) y números decimales (`double`).

Podemos convertir un entero a decimal mediante `toDouble()`:

```dart
int numero = 10;
double decimal = numero.toDouble();
print(decimal); // 10.0
```

Para realizar la conversión inversa utilizaremos `toInt()`:

```dart
double precio = 19.95;
int entero = precio.toInt();
print(entero); // 19
```

Es importante tener en cuenta que `toInt()` **elimina la parte decimal**, no redondea el número.

Si queremos redondear podemos utilizar:

```dart
double numero = 19.75;

print(numero.round()); // 20
print(numero.floor()); // 19
print(numero.ceil());  // 20
```

Donde:

* `round()` redondea al entero más cercano.
* `floor()` obtiene el entero inferior.
* `ceil()` obtiene el entero superior.

### Ejemplo: leer y convertir datos

Un caso muy habitual consiste en leer información desde el teclado y convertirla al tipo que necesitamos:

```dart
import 'dart:io';

void main() {
  stdout.write('Introduce tu edad: ');

  String? entrada = stdin.readLineSync();
  int? edad = int.tryParse(entrada ?? '');

  if (edad != null) {
    print('El próximo año tendrás ${edad + 1} años');
  } else {
    print('Debes introducir un número válido');
  }
}
```

En este ejemplo combinamos varios conceptos: **entrada de datos, Null Safety, conversión de tipos y estructuras condicionales**.

#### Resumen

| Conversión           | Método              | Ejemplo                   |
| -------------------- | ------------------- | ------------------------- |
| `String` → `int`     | `int.parse()`       | `int.parse('25')`         |
| `String` → `double`  | `double.parse()`    | `double.parse('12.5')`    |
| `String` → `int?`    | `int.tryParse()`    | `int.tryParse('25')`      |
| `String` → `double?` | `double.tryParse()` | `double.tryParse('12.5')` |
| `int` → `double`     | `toDouble()`        | `numero.toDouble()`       |
| `double` → `int`     | `toInt()`           | `numero.toInt()`          |
| Valor → `String`     | `toString()`        | `numero.toString()`       |

> Siempre que el valor que queremos convertir pueda proceder de la entrada de un usuario o de una fuente que no controlamos, es recomendable utilizar **`tryParse()`** en lugar de `parse()`, ya que nos permite gestionar una conversión incorrecta sin provocar directamente una excepción

## Lógicos

El tipo `bool` se utiliza para representar **valores lógicos**. Una variable de este tipo únicamente puede almacenar uno de estos dos valores:

* `true`: verdadero.
* `false`: falso.

Los valores booleanos son especialmente importantes en programación, ya que se utilizan para **representar condiciones y tomar decisiones** durante la ejecución de un programa.

Por ejemplo:

```dart
void main() {
  bool activo = true;
  bool finalizado = false;

  print(activo);     // true
  print(finalizado); // false
}
```

También es habitual obtener valores booleanos como resultado de **comparaciones o llamadas a determinados métodos**.

Por ejemplo, el método `contains()` de `String` permite comprobar si una cadena contiene un determinado texto y devuelve un valor booleano:

```dart
void main() {
  String cadena = 'Esto es una cadena de texto';
  bool contieneTexto = cadena.contains('texto');
  print(contieneTexto); // true
}
```

En este caso, `contains()` comprueba si la cadena contiene `'texto'`. Como el resultado de la comprobación es verdadero, la variable `contieneTexto` almacenará el valor `true`.

## Nulos

Dart incorpora un sistema denominado **Null Safety** cuyo objetivo es evitar errores provocados por el uso inesperado de valores `null`.

Por defecto, las variables en Dart **no pueden contener `null`**. Por ejemplo:

```dart
String nombre = 'Ana';
nombre = null; // Error
```

Si necesitamos que una variable pueda contener un valor nulo, tendremos que indicarlo **explícitamente en su tipo**:

```dart
String? nombre;
```

De esta forma, Dart puede detectar durante el desarrollo muchas situaciones en las que podríamos estar utilizando un valor nulo de forma incorrecta.

Para trabajar con estos valores, Dart proporciona diferentes **operadores relacionados con Null Safety**.

### Variables *nullable*: `?`

El operador `?`, colocado después del tipo, indica que una variable **puede contener un valor de ese tipo o `null`**.

```dart
int? edad;
String? nombre;
```

En este ejemplo, tanto `edad` como `nombre` pueden contener `null`.

En cambio:

```dart
int edad = 20;
String nombre = 'Ana';
```

son variables **no anulables (*****non-nullable*****)** y Dart no permitirá asignarles `null`.

### Operador de aserción no nula: `!`

Cuando tenemos una variable *nullable* pero sabemos con certeza que **su valor no es `null`**, podemos utilizar el operador `!`.

```dart
String? nombre = 'Ana';
String nombreUsuario = nombre!;
```

Con `nombre!` estamos indicando a Dart:

> «Sé que esta variable puede contener `null`, pero en este punto garantizo que tiene un valor».

:::caution

Debemos utilizar este operador con precaución. Si nuestra afirmación es incorrecta y el valor realmente es `null`, se producirá un **error durante la ejecución**:

```dart
String? nombre;

String nombreUsuario = nombre!; // Error en tiempo de ejecución
```

Por tanto, `!` **no elimina ni convierte un valor `null`**; simplemente indica al compilador que asumimos la responsabilidad de garantizar que el valor no es nulo.

:::

### Valor alternativo: `??`

El operador `??` permite proporcionar un **valor alternativo cuando una expresión es `null`**.

```dart
String? nombre;
print(nombre ?? 'Anónimo');
```

Podemos interpretar la expresión anterior como:

* si `nombre` tiene un valor, utiliza ese valor;
* si `nombre` es `null`, utiliza `'Anónimo'`.

Por ejemplo:

```dart
String? nombre = 'Laura';
print(nombre ?? 'Anónimo'); // Laura
```

Mientras que:

```dart
String? nombre;
print(nombre ?? 'Anónimo'); // Anónimo
```

Este operador resulta especialmente útil para establecer **valores predeterminados**.

### Asignación si es nulo: `??=`

El operador `??=` permite **asignar un valor únicamente cuando la variable contiene `null`**.

```dart
String? nombre;

nombre ??= 'Anónimo';

print(nombre); // Anónimo
```

Si la variable ya contiene un valor, este se conserva:

```dart
String? nombre = 'Laura';

nombre ??= 'Anónimo';

print(nombre); // Laura
```

Por tanto:

```dart
variable ??= valor;
```

puede interpretarse como:

> «Asigna `valor` únicamente si `variable` es `null`».

### Acceso condicional: `?.`

Cuando un objeto puede ser `null`, no podemos acceder directamente a sus propiedades o métodos sin comprobar previamente su valor.

Por ejemplo:

```dart
String? nombre;

print(nombre.length); // Error
```

Podemos utilizar el operador `?.` para realizar el acceso **únicamente si el objeto no es `null`**:

```dart
String? nombre;

print(nombre?.length); // null
```

Si `nombre` contiene un valor:

```dart
String? nombre = 'Flutter';

print(nombre?.length); // 7
```

Dart accederá normalmente a la propiedad `length`. Si contiene `null`, la expresión devolverá `null` en lugar de intentar realizar el acceso.

### Resumen de operadores

| Operador | Función                                                        | Ejemplo                |
| -------- | -------------------------------------------------------------- | ---------------------- |
| `?`      | Indica que una variable puede contener `null`                  | `String? nombre`       |
| `!`      | Afirma que un valor *nullable* no es `null`                    | `nombre!`              |
| `??`     | Proporciona un valor alternativo si es `null`                  | `nombre ?? 'Anónimo'`  |
| `??=`    | Asigna un valor únicamente si la variable es `null`            | `nombre ??= 'Anónimo'` |
| `?.`     | Accede a una propiedad o método solo si el objeto no es `null` | `nombre?.length`       |

La **Null Safety** será especialmente importante cuando trabajemos con Flutter, ya que encontraremos frecuentemente datos que pueden no estar disponibles, parámetros opcionales o valores que todavía no han sido inicializados. Comprender estos operadores nos permitirá gestionar estas situaciones de forma segura y evitar errores durante la ejecución.

## Enumerados

Los tipos de datos enumerados ([enum](https://dart.dev/language/enums)) son un tipo especial de clase utilizada para representar un número fijo de valores constantes. **Debe declararse siempre fuera de cualquier función o clase**.

Por ejemplo, podemos definir un enumerado con colores de la siguiente forma:

```dart
enum Color { red, green, blue }
```

Cada valor en un [enum](https://dart.dev/language/enums) tiene un **index getter**, que devuelve la posición del valor en la declaración. El primer valor tiene indice 0 y para obtener una lista de todos los valores de un **enum**, usamos **values**.

<pre class="language-dart"><code class="lang-dart"><strong>List&#x3C;Color> colors = Color.values;
</strong>assert(colors[2] == Color.blue);
</code></pre>

Podemos usar **enums** en las sentencias **switch**:

<pre class="language-dart"><code class="lang-dart">var aColor = Color.blue;

<strong>switch (aColor) {
</strong><strong>  case Color.red:
</strong>    print('Red as roses!');
    break;
<strong>  case Color.green:
</strong>    print('Green as grass!');
    break;
<strong>  default: // Without this, you see a WARNING.
</strong>    print(aColor); // 'Color.blue'
}
</code></pre>

## Dinámicos

Dart es un lenguaje con **tipado estático**, lo que significa que los tipos de las variables se conocen y comprueban principalmente durante la compilación. Sin embargo, Dart también permite trabajar con valores cuyo tipo no conocemos de antemano mediante el tipo `dynamic`.

Una variable declarada como `dynamic` puede almacenar valores de diferentes tipos durante la ejecución del programa:

```dart
void main() {
  dynamic miVariable;

  miVariable = 'Hola';
  print(miVariable.toUpperCase());

  miVariable = 10;
  print(miVariable + 5);
}
```

En este ejemplo, `miVariable` está declarada como `dynamic`. Primero contiene un `String` y posteriormente un `int`.

Al utilizar `dynamic`, Dart permite realizar operaciones sobre el valor sin comprobar durante la compilación si realmente existen para ese tipo. Por este motivo, debemos utilizarlo con cuidado:

```dart
dynamic miVariable = 10;

miVariable.toUpperCase(); // Error durante la ejecución
```

El compilador permite esta instrucción porque `miVariable` es `dynamic`, pero cuando se ejecuta el programa descubrimos que un `int` no dispone del método `toUpperCase()`.

### Diferencia entre `var` y `dynamic`

Debemos tener en cuenta que `var` **no es un tipo**, sino una palabra clave que permite a Dart inferir automáticamente el tipo a partir del valor asignado.

Por ejemplo:

```dart
var nombre = 'Ontinyent';
```

Dart infiere que `nombre` es un `String`. A partir de ese momento no podremos asignarle un valor de otro tipo:

```dart
nombre = 10; // Error
```

En cambio:

```dart
dynamic valor = 'Ontinyent';
valor = 10;     // Correcto
valor = true;   // Correcto
```

Una variable `dynamic` puede contener valores de diferentes tipos durante la ejecución.

### El operador `as`

Cuando trabajamos con valores `dynamic`, en ocasiones **sabemos qué tipo de dato esperamos encontrar**, aunque Dart no pueda determinarlo automáticamente.

En estos casos podemos utilizar el operador `as` para realizar una **conversión o comprobación de tipo (*****type cast*****)**:

```dart
dynamic valor = 'Ontinyent';
String ciudad = valor as String;
print(ciudad.toUpperCase());
```

Con:

```dart
valor as String
```

estamos indicando que esperamos que el objeto almacenado en `valor` sea un `String`.

Esto será especialmente útil cuando trabajemos con **JSON**, ya que encontraremos estructuras con tipos como:

```dart
Map<String, dynamic>
```

Por ejemplo:

```dart
final nombre = datos['name'] as String;
```

o:

```dart
final resultados = datos['results'] as List<dynamic>;
```

Es importante entender que `as` **no transforma cualquier valor en el tipo indicado**. El objeto debe ser compatible con ese tipo:

```dart
dynamic valor = 10;
String texto = valor as String; // Error en tiempo de ejecución
```

:::note

`dynamic` permite trabajar con un valor cuyo tipo no está determinado estáticamente, mientras que `as` nos permite indicar y comprobar el tipo que esperamos que tenga ese valor.

:::

Esta combinación aparecerá frecuentemente cuando procesemos las respuestas JSON de una API.
