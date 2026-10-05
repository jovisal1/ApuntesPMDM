---
title: "Programación modular"
sidebar:
  label: "Programación modular"
  order: 8
---

A medida que nuestros desarrollos crecen y se vuelven más complejos, necesitamos plantearnos algún tipo de subdivisión que haga que nuestro código sea más abordable y mantenible.

En esta sección presentamos las principales opciones que nos ofrece el lenguaje Dart para resolver problemas complejos mediante su descomposición en otros más simples.

## Funciones

Como ocurre  en otros lenguajes de programación, una función en Dart es un bloque de código que realiza alguna operación. Este bloque de código tendrá un nombre, podrá recibir parámetros, y retornará un valor.  Por ejemplo:

```dart
String saludo(String nombre){
    return "Hola Caracola, soy $nombre" ;
}
```

En el ejemplo anterior disponemos de una función denominada saludo que retorna una cadena de texto y que recibe como parámetro una variable de tipo String denominada nombre.

### Parámetros

Los **parámetros** permiten proporcionar información a una función para que pueda utilizarla durante su ejecución. Se especifican entre paréntesis después del nombre de la función, indicando normalmente su **tipo y nombre**.

Por ejemplo:

```dart
void saludar(String nombre) {
  print('Hola, $nombre');
}

void main() {
  saludar('Ana');
}
```

En este caso, `nombre` es el **parámetro** definido por la función, mientras que `'Ana'` es el **argumento** que proporcionamos al invocarla.

Dart ofrece diferentes formas de definir los parámetros de una función, principalmente **posicionales** y **nombrados**.

#### **Parámetros posicionales obligatorios**

Son la forma más sencilla de definir parámetros. Al llamar a la función debemos proporcionar **todos los argumentos y respetar el orden en el que han sido declarados**.

```dart
void saludar(String nombre, int edad) {
  print('Hola, $nombre. Tienes $edad años.');
}

void main() {
  saludar('Pepe', 25);
}
```

En este ejemplo, el primer argumento corresponde a `nombre` y el segundo a `edad`.

Por tanto, el orden es importante:

```dart
saludar('Pepe', 25); // Correcto
```

#### **Parámetros posicionales opcionales `[ ]`**

Podemos hacer que determinados parámetros posicionales sean **opcionales** colocándolos entre corchetes `[ ]`.

```dart
void saludar(String nombre, [String? ciudad]) {
  print('Hola, $nombre');
}
```

Ahora podemos llamar a la función proporcionando únicamente el parámetro obligatorio:

```dart
saludar('Ana');
```

o proporcionando también el opcional:

```dart
saludar('Ana', 'Valencia');
```

Al utilizar Null Safety, un parámetro opcional debe poder contener `null` o disponer de un **valor predeterminado**:

```dart
void saludar(String nombre, [String ciudad = 'Valencia']) {
  print('Hola, $nombre. Vives en $ciudad.');
}
```

Si no proporcionamos el segundo argumento, se utilizará `'Valencia'`:

```dart
saludar('Ana');
// Hola, Ana. Vives en Valencia.
```

#### **Parámetros nombrados `{ }`**

Los parámetros nombrados se definen entre llaves `{ }` y permiten indicar explícitamente **a qué parámetro corresponde cada argumento** al llamar a la función.

```dart
void mostrarUsuario({String? nombre, int? edad}) {
  print('Nombre: $nombre - Edad: $edad');
}
```

Para proporcionar los argumentos utilizamos el nombre del parámetro:

```dart
mostrarUsuario(nombre: 'Ana', edad: 30);
```

Una de sus principales ventajas es que **el orden deja de ser importante**:

```dart
mostrarUsuario(edad: 30, nombre: 'Ana');
```

Ambas llamadas producen el mismo resultado.

Además, los parámetros nombrados son **opcionales por defecto**, por lo que podríamos escribir:

```dart
mostrarUsuario(nombre: 'Ana');
```

En este caso, `edad` tendrá el valor `null`.

#### **Parámetros nombrados con valores predeterminados**

También podemos proporcionar un **valor por defecto** a un parámetro nombrado:

```dart
void saludar({
  String nombre = 'Amigo',
  int edad = 0,
}) {
  print('Hola, $nombre. Tienes $edad años.');
}
```

Podemos llamar a la función sin proporcionar ningún argumento:

```dart
saludar();
// Hola, Amigo. Tienes 0 años.
```

O modificar únicamente los valores que necesitemos:

```dart
saludar(nombre: 'Laura');
// Hola, Laura. Tienes 0 años.
```

#### **Parámetros nombrados obligatorios: `required`**

Aunque los parámetros nombrados son opcionales por defecto, podemos indicar que uno de ellos sea **obligatorio** mediante la palabra clave `required`.

```dart
void crearUsuario({
  required String nombre,
  required String email,
  int edad = 18,
}) {
  print('$nombre - $email - $edad');
}
```

Ahora será obligatorio proporcionar `nombre` y `email`:

```dart
crearUsuario(
  nombre: 'Ana',
  email: 'ana@email.com',
);
```

Mientras que `edad` seguirá siendo opcional porque dispone de un valor predeterminado.

Si intentamos omitir un parámetro `required`:

```dart
crearUsuario(nombre: 'Ana'); // Error
```

Dart detectará el problema antes de ejecutar el programa.

:::note

**`required` será especialmente importante en Flutter.** Los parámetros nombrados se utilizan constantemente en los constructores de los widgets para hacer el código más legible y permitir distinguir claramente qué valores son obligatorios y cuáles opcionales.

:::

Por ejemplo, más adelante encontraremos código con una estructura similar a:

```dart
MiWidget(
  titulo: 'Flutter',
  activo: true,
)
```

#### Resumen

| Tipo                                      | Sintaxis                   | ¿Obligatorio? | ¿Importa el orden? |
| ----------------------------------------- | -------------------------- | ------------: | -----------------: |
| Posicional                                | `String nombre`            |            Sí |                 Sí |
| Posicional opcional                       | `[String? nombre]`         |            No |                 Sí |
| Posicional opcional con valor por defecto | `[String nombre = 'Ana']`  |            No |                 Sí |
| Nombrado                                  | `{String? nombre}`         |            No |                 No |
| Nombrado con valor por defecto            | `{String nombre = 'Ana'}`  |            No |                 No |
| Nombrado obligatorio                      | `{required String nombre}` |            Sí |                 No |

### Funciones flecha

Dart permite utilizar una sintaxis abreviada para aquellas funciones cuyo cuerpo está formado por **una única expresión**. Estas funciones se conocen habitualmente como **funciones flecha** (*arrow functions*) y utilizan el operador `=>`.

Por ejemplo, una función convencional como:

```dart
int cuadrado(int numero) {
  return numero * numero;
}
```

puede escribirse de forma más compacta:

```dart
int cuadrado(int numero) => numero * numero;
```

Ambas funciones son equivalentes. En una función flecha, el resultado de la expresión situada después de `=>` se utiliza directamente como **valor de retorno**, por lo que no es necesario utilizar `return`.

También podemos utilizar esta sintaxis en funciones que no devuelven ningún valor:

```dart
void saludar(String nombre) => print('Hola, $nombre');
```

Un ejemplo habitual aparece cuando trabajamos con colecciones. Podemos definir una función que muestre el cuadrado de un número:

```dart
void imprimirCuadrado(int numero) =>
    print('Cuadrado de $numero: ${numero * numero}');
```

y pasarla posteriormente a `forEach()`:

```dart
void main() {
  List<int> numeros = [1, 2, 3, 4, 5];

  numeros.forEach(imprimirCuadrado);
}
```

En este caso, `forEach()` ejecutará la función `imprimirCuadrado` para cada uno de los elementos de la lista.

:::caution

**¿Puede una función flecha tener varias instrucciones?**

No. La sintaxis `=>` únicamente puede utilizarse cuando el cuerpo de la función está formado por **una única expresión**.

Por ejemplo:

```dart
int cuadrado(int numero) => numero * numero;
```

Si necesitamos realizar varias operaciones, tendremos que utilizar la sintaxis convencional mediante un bloque `{ }`:

```dart
int calcular(int numero) {
  int resultado = numero * numero;
  print('El resultado es $resultado');

  return resultado;
}
```

Por tanto, no podríamos escribir algo como:

```dart
// ❌ Incorrecto
int calcular(int numero) =>
  int resultado = numero * numero;
  print(resultado);
  return resultado;
```

Después de `=>`, Dart espera **una única expresión**, no una secuencia de instrucciones. Utilizaremos `=>` para funciones sencillas formadas por una única expresión. Cuando necesitemos ejecutar varias instrucciones, utilizaremos un bloque `{ }`.

:::

### Funciones anónimas

Normalmente declaramos nuestras funciones asignándoles un **nombre** que posteriormente utilizamos para invocarlas:

```dart
int multiplicar(int a, int b) {
  return a * b;
}
```

Sin embargo, Dart también permite crear **funciones sin nombre**, conocidas como **funciones anónimas** o *lambdas*.

Por ejemplo:

```dart
void main() {
  var multiplicar = (int a, int b) {
    return a * b;
  };

  print(multiplicar(3, 4)); // 12
}
```

En este caso, la función no tiene un nombre propio, aunque almacenamos una referencia a ella en la variable `multiplicar`, lo que nos permite invocarla posteriormente.

#### **Funciones anónimas con sintaxis flecha**

Si una función anónima está formada por una única expresión, también podemos utilizar la sintaxis `=>`:

```dart
void main() {
  var multiplicar = (int a, int b) => a * b;

  print(multiplicar(3, 4)); // 12
}
```

En este caso estamos combinando **dos conceptos diferentes**: tenemos una función anónima porque no tiene nombre y, al mismo tiempo, utilizamos la sintaxis flecha porque su cuerpo contiene una única expresión.

#### Funciones anónimas como argumentos

Una de las aplicaciones más habituales de las funciones anónimas consiste en **proporcionarlas directamente como argumento a otra función**.

Por ejemplo, podemos recorrer una lista mediante `forEach()`:

```dart
void main() {
  List<int> numeros = [1, 2, 3, 4, 5];

  numeros.forEach((numero) {
    print('Cuadrado de $numero: ${numero * numero}');
  });
}
```

La función:

```dart
(numero) {
  print('Cuadrado de $numero: ${numero * numero}');
}
```

no tiene ningún nombre y se proporciona directamente a `forEach()`, que será el encargado de ejecutarla para cada elemento.

Como únicamente contiene una expresión, también podemos utilizar la sintaxis flecha:

```dart
void main() {
  List<int> numeros = [1, 2, 3, 4, 5];

  numeros.forEach(
    (numero) => print('Cuadrado de $numero: ${numero * numero}'),
  );
}
```

:::note


#### Funciones anónimas en Flutter

Las funciones anónimas aparecerán **constantemente cuando trabajemos con Flutter**, especialmente para definir *callbacks*: funciones que se ejecutarán como respuesta a determinados eventos.

Por ejemplo, para indicar qué debe ocurrir cuando el usuario pulse un botón encontraremos código similar a:

```dart
onPressed: () {
  print('Botón pulsado');
}
```

En este caso estamos proporcionando una función anónima sin parámetros. Flutter será el encargado de ejecutarla cuando se produzca el evento.

Si únicamente necesitamos realizar una operación, podemos utilizar la sintaxis flecha:

```dart
onPressed: () => print('Botón pulsado')
```

En cambio, si necesitamos realizar varias operaciones:

```dart
onPressed: () {
  print('Botón pulsado');
  contador++;
  actualizarDatos();
}
```

deberemos utilizar necesariamente un bloque `{ }`.

:::

## Paquetes

El ecosistema Dart utiliza paquetes para administrar software compartido, como bibliotecas y herramientas. Para obtener paquetes de Dart, utiliza el administrador de paquetes [**pub**](https://dart.dev/tools/pub/cmd). Podemos encontrar paquetes disponibles públicamente en el sitio [pub.dev](https://pub.dev/), o cargar paquetes desde el sistema de archivos local o desde otro lugar, como los repositorios Git. Independientemente del origen de sus paquetes, pub administra las dependencias de versiones, ayudándonos a obtener versiones de paquetes que funcionan entre sí y con su versión de SDK.

Los metadatos de paquetes que no forman parte del SDK se definen en el archivo pubspec.yaml (YAML es el acrónimo para Yet Another Markup Language). Este archivo se encuentra en cada aplicación y contiene las dependencias y los metadatos de la aplicación, tales como nombre, autor, versión y descripción. Este archivo se utiliza para descargar las librerías que el programa necesitará. El aspecto debe ser similar al mostrado a continuación:

```yaml
name: dart_application_2
description: A sample command-line application.
version: 1.0.0
# repository: https://github.com/my_org/my_repo

environment:
  sdk: ^3.3.1

# Add regular dependencies here.
dependencies:
  # path: ^1.8.0

dev_dependencies:
  lints: ^3.0.0
  test: ^1.24.0
```

[**pub**](https://dart.dev/tools/pub/cmd) utiliza una serie de comandos para la gestión de los paquetes:

* **`pub get`**: Descarga las dependencias especificadas en el archivo `pubspec.yaml`.
* **`pub upgrade`**: Actualiza las dependencias a sus versiones más recientes permitidas.
* **`pub outdated`**: Muestra una lista de las dependencias que están desactualizadas.
* **`pub run`**: Ejecuta un paquete o un script especificado en el proyecto.

### Importar y exportar módulos y paquetes

En Dart, para **importar módulos** y otras clases desde diferentes bibliotecas o archivos, se utilizan las palabras clave `import` y `export`.&#x20;

* **Importar bibliotecas o paquetes.** Para importar una biblioteca externa o un archivo dentro de tu proyecto:

```dart
import 'dart:math';  // Importa una biblioteca de Dart
import 'package:http/http.dart';  // Importa un paquete de pub.dev
import 'src/my_file.dart';  // Importa un archivo local dentro del proyecto
```

* **Importar solo partes de un módulo.** También podemos especificar qué clases o funciones importar de un módulo:

```dart
import 'dart:math' show pi, sqrt;
```

* **Exportar un módulo.** Para hacer disponible una clase o función para otros archivos:

```dart
export 'src/my_utils.dart';
```

Veámos un ejemplo sencillo:

#### Si disponemos de un archivo `math_utils.dart` en la carpeta utils (módulo a importar):

```dart
// utils/math_utils.dart
int sumar(int a, int b) {
  return a + b;
}
```

#### Archivo `main.dart` (clase que importa el módulo desde el directorio utils):

```dart
// main.dart
import 'utils/math_utils.dart';

class Calculadora {
  void realizarSuma(int x, int y) {
    int resultado = sumar(x, y);  // Usamos el método importado de math_utils.dart
    print('El resultado de la suma es: $resultado');
  }
}

void main() {
  Calculadora calc = Calculadora();
  calc.realizarSuma(3, 5);
}
```

En este ejemplo, el archivo `math_utils.dart` define una función `sumar`. En el archivo `main.dart`, esa función se importa y se usa dentro de la clase `Calculadora`.
