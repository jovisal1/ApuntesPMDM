---
title: "Progración asíncrona"
sidebar:
  label: "Progración asíncrona"
  order: 12
---

https\://dart.dev/libraries/async/async-await

Cuando ejecutamos un programa de forma **síncrona**, las instrucciones se procesan secuencialmente. Si una operación tarda varios segundos en completarse, las instrucciones que dependen de ella tendrán que esperar hasta obtener su resultado.

Sin embargo, muchas de las operaciones que realizaremos en una aplicación pueden requerir cierto tiempo:

* realizar una petición a una API;
* consultar una base de datos;
* leer o escribir un archivo;
* acceder a determinados servicios del dispositivo;
* esperar la respuesta de un servidor.

En estos casos resulta especialmente importante la **programación asíncrona**, que nos permite iniciar una operación y gestionar su resultado cuando esté disponible, evitando bloquear innecesariamente el flujo de ejecución de nuestra aplicación.

En Dart, la programación asíncrona se basa principalmente en tres elementos:

* **`Future`**: representa un valor o error que estará disponible posteriormente.
* **`async`**: permite definir funciones que realizan operaciones asíncronas.
* **`await`**: permite esperar el resultado de una operación asíncrona.

Estos conceptos serán especialmente importantes cuando trabajemos con Flutter, ya que muchas operaciones habituales de una aplicación móvil son asíncronas.

### El problema: operaciones que requieren tiempo

Imaginemos que queremos preparar un desayuno compuesto por una tostada y un huevo.

Podemos simular que preparar la tostada requiere cinco segundos:

```dart
import 'dart:io';

bool tostarPan() {
  print('Preparando el pan...');
  print('Tostando el pan...');

  sleep(const Duration(seconds: 5));

  print('¡El pan está tostado!');
  return true;
}

bool freirHuevo() {
  print('Rompiendo el huevo...');
  print('Friendo el huevo...');
  print('¡El huevo está listo!');
  return true;
}

void main() {
  bool panTostado = tostarPan();
  bool huevoFrito = freirHuevo();
  print('Pan: $panTostado - Huevo: $huevoFrito');
}
```

En este ejemplo, `sleep()` detiene la ejecución durante cinco segundos. Por tanto, el huevo **no comienza a prepararse hasta que termina la tostada**.

Obtendríamos una salida similar a:

```
Preparando el pan...
Tostando el pan...

[esperamos 5 segundos]

¡El pan está tostado!
Rompiendo el huevo...
Friendo el huevo...
¡El huevo está listo!
Pan: true - Huevo: true
```

Esta espera representa precisamente el tipo de situación que queremos evitar en operaciones que pueden gestionarse de forma asíncrona. En tu versión original este ejemplo se utilizaba para introducir el bloqueo provocado por `sleep()`.

## `Future`

Un `Future` representa el **resultado de una operación que puede no estar disponible inmediatamente**, pero que esperamos obtener posteriormente.

Podemos entenderlo como una promesa: "Ahora mismo no tengo el resultado, pero te proporcionaré un valor —o un error— cuando termine la operación."

Por ejemplo:

```dart
Future<String> obtenerNombre() {
  return Future.delayed(
    const Duration(seconds: 2),
    () => 'Ana',
  );
}
```

La función no devuelve directamente un `String`:

```dart
String
```

sino:

```dart
Future<String>
```

Es decir, representa un `String` que **estará disponible cuando finalice la operación**.

### `Future.delayed()`

Para nuestros primeros ejemplos podemos utilizar `Future.delayed()`, que permite simular una operación que necesita cierto tiempo para completarse:

```dart
Future<String> obtenerMensaje() {
  return Future.delayed(
    const Duration(seconds: 2),
    () => 'Operación completada',
  );
}
```

Después de aproximadamente dos segundos, el `Future` se completará con:

```
Operación completada
```

En una aplicación real no utilizaremos normalmente estos retrasos artificiales. El tiempo de espera procederá de operaciones como una petición HTTP, una consulta a una base de datos o la lectura de un archivo.

### Mini Task Manager: simular un servidor

Hasta ahora creábamos las tareas directamente en el programa. Antes de conectarnos a Internet, simularemos una descarga con dos segundos de espera. Añade esta función fuera de la clase `Tarea` que venimos construyendo:

```dart
Future<List<Tarea>> descargarTareas() async {
  print('📡 Conectando con el servidor...');

  await Future.delayed(const Duration(seconds: 2));

  print('📦 Datos recibidos');
  return [
    Tarea(titulo: 'Estudiar Dart', fechaLimite: DateTime.now()),
    Tarea(titulo: 'Preparar examen', fechaLimite: DateTime.now()),
  ];
}
```

`Future<List<Tarea>>` indica que obtendremos una lista de tareas cuando termine la operación. `Future.delayed()` permite simular la espera; durante ese tiempo el programa puede atender otras operaciones. En el siguiente ejemplo veremos cómo consumir el resultado con `await`.

### Estados de un `Future`

Un `Future` puede encontrarse inicialmente **incompleto**, mientras esperamos que termine la operación.

Posteriormente se completará de una de estas dos formas:

* **Con un valor**, si la operación finaliza correctamente.
* **Con un error**, si se produce algún problema.

Conceptualmente:

```
                ┌── valor
Future ────────►│
                └── error
```

Por ejemplo, un:

```dart
Future<int>
```

no es un `int`. Representa un valor de tipo `int` que esperamos obtener posteriormente.

Esta diferencia es fundamental.

## `async` y `await`

La forma más habitual y legible de trabajar con operaciones asíncronas en Dart es mediante las palabras clave **`async` y `await`**.

### `async`

La palabra clave `async` permite indicar que una función realizará operaciones asíncronas.

Por ejemplo:

```dart
Future<String> obtenerNombre() async {
  return 'Ana';
}
```

Aunque escribimos:

```dart
return 'Ana';
```

la función está marcada como `async`, por lo que su tipo de retorno es:

```dart
Future<String>
```

Para funciones asíncronas que no necesitan devolver ningún valor utilizaremos:

```dart
Future<void>
```

Por ejemplo:

```dart
Future<void> realizarOperacion() async {
  // Operaciones asíncronas
}
```

### `await`

La palabra clave `await` permite **esperar a que un `Future` se complete y obtener su resultado**.

Por ejemplo:

```dart
Future<String> obtenerNombre() async {
  await Future.delayed(const Duration(seconds: 2));

  return 'Ana';
}

Future<void> main() async {
  String nombre = await obtenerNombre();

  print(nombre);
}
```

Cuando ejecutamos:

```dart
await obtenerNombre();
```

Dart espera a que ese `Future` se complete antes de continuar con la siguiente instrucción de esa función.

:::note

Para utilizar `await`, debemos encontrarnos dentro de una función marcada como `async`.

:::

### Mini Task Manager: esperar el resultado

Conserva `Tarea` y la función `descargarTareas()` de la simulación anterior. Sustituye el `main()` por este:

```dart
Future<void> main() async {
  print('1. Iniciando aplicación');
  final tareas = await descargarTareas();
  print('2. Tareas descargadas');

  for (final tarea in tareas) {
    print(tarea.titulo);
  }

  print('3. Fin');
}
```

**¿En qué orden aparecerán los mensajes?** Primero veremos el inicio y la conexión; tras la espera aparecerán los datos recibidos, la confirmación de descarga, los títulos y el final.

Prueba a quitar solo el `await` de `final tareas = await descargarTareas()`: `tareas` pasará a ser un `Future<List<Tarea>>`, por lo que el bucle no compilará. Para observar el orden sin esperar, sustituye todo el `main()` por esta variante y conserva las otras definiciones:

```dart
Future<void> main() async {
  print('1. Iniciando aplicación');
  final descarga = descargarTareas();
  print('2. La descarga sigue en curso');

  final tareas = await descarga;
  for (final tarea in tareas) {
    print(tarea.titulo);
  }
  print('3. Fin');
}
```

Ahora el segundo mensaje aparece antes de recibir los datos. Iniciar una operación y esperar su resultado son dos pasos distintos.

## Volvamos a nuestro desayuno

Ahora podemos modificar el ejemplo inicial para que el tiempo necesario para tostar el pan sea una espera asíncrona:

```dart
Future<bool> tostarPan() async {
  print('Preparando el pan...');
  print('Tostando el pan...');

  await Future.delayed(const Duration(seconds: 5));

  print('¡El pan está tostado!');
  return true;
}

bool freirHuevo() {
  print('Rompiendo el huevo...');
  print('Friendo el huevo...');
  print('¡El huevo está listo!');

  return true;
}
```

Podemos esperar el resultado de `tostarPan()` mediante `await`:

```dart
Future<void> main() async {
  bool panTostado = await tostarPan();
  bool huevoFrito = freirHuevo();

  print('Pan: $panTostado - Huevo: $huevoFrito');
}
```

Sin embargo, hay un detalle importante: aunque `tostarPan()` es asíncrona, al utilizar `await` inmediatamente estamos indicando que **no queremos continuar en esa función hasta obtener su resultado**.

Esto nos lleva a una cuestión importante: ¿qué ocurre cuando tenemos varias operaciones independientes que pueden realizarse mientras esperamos?

## Ejecutar varias operaciones asíncronas

Imaginemos dos operaciones independientes:

```dart
Future<String> obtenerUsuario() async {
  await Future.delayed(const Duration(seconds: 2));
  return 'Ana';
}

Future<String> obtenerMensajes() async {
  await Future.delayed(const Duration(seconds: 3));
  return '5 mensajes';
}
```

Podríamos ejecutarlas secuencialmente:

```dart
Future<void> main() async {
  String usuario = await obtenerUsuario();
  String mensajes = await obtenerMensajes();

  print('$usuario - $mensajes');
}
```

En este caso esperamos primero una operación y después iniciamos la siguiente.

Cuando las operaciones son independientes, podemos iniciar ambas antes de esperar sus resultados:

```dart
Future<void> main() async {
  Future<String> futuroUsuario = obtenerUsuario();
  Future<String> futuroMensajes = obtenerMensajes();

  String usuario = await futuroUsuario;
  String mensajes = await futuroMensajes;

  print('$usuario - $mensajes');
}
```

De esta forma, ambas operaciones pueden progresar durante el mismo intervalo de espera.

### `Future.wait()`

Dart también proporciona `Future.wait()` para esperar conjuntamente varios `Future`:

```dart
Future<void> main() async {
  List<String> resultados = await Future.wait([
    obtenerUsuario(),
    obtenerMensajes(),
  ]);

  print(resultados);
}
```

`Future.wait()` resulta especialmente útil cuando necesitamos realizar **varias operaciones asíncronas independientes y esperar a que todas terminen**.

## Gestión de errores asíncronos

Una operación asíncrona también puede finalizar con un error.

Cuando utilizamos `async` y `await`, podemos gestionar estos errores mediante los bloques `try-catch` que ya conocemos:

```dart
Future<int> convertirNumero(String texto) async {
  await Future.delayed(const Duration(seconds: 2));
  return int.parse(texto);
}
```

Podemos controlar una posible conversión incorrecta mediante:

```dart
Future<void> main() async {
  try {
    int numero = await convertirNumero('Hola');
    print('Número: $numero');
  } catch (e) {
    print('Se ha producido un error: $e');
  }
}
```

Como `'Hola'` no puede convertirse en un número entero, `int.parse()` genera una excepción que será capturada por `catch`.

También podemos utilizar `finally`:

```dart
Future<void> main() async {
  try {
    int numero = await convertirNumero('12');
    print('Número: $numero');
  } catch (e) {
    print('Se ha producido un error: $e');
  } finally {
    print('Operación finalizada');
  }
}
```

Por tanto, cuando trabajemos con `async` y `await`, utilizaremos normalmente:

```
async / await
      +
try / catch / finally
```

### Mini Task Manager: una descarga que falla

Para simular un fallo, sustituye temporalmente la función `descargarTareas()` por esta versión:

```dart
Future<List<Tarea>> descargarTareas() async {
  await Future.delayed(const Duration(seconds: 2));
  throw Exception('El servidor no está disponible');
}
```

Sustituye también el `main()` por el siguiente. El `await` debe estar dentro del `try` para capturar el error de la operación:

```dart
Future<void> main() async {
  try {
    print('📡 Descargando tareas...');
    final tareas = await descargarTareas();
    for (final tarea in tareas) {
      tarea.mostrar();
    }
  } catch (e) {
    print('❌ No se pudieron cargar las tareas: $e');
  } finally {
    print('👋 Aplicación finalizada');
  }
}
```

Predice la salida antes de ejecutar. Después recupera la función que devuelve tareas y comprueba que `finally` también se ejecuta cuando la descarga termina correctamente. Este mismo `main()` nos servirá al sustituir la simulación por una petición HTTP.

## Trabajar con `Future` mediante `then()`

Aunque `async` y `await` proporcionan normalmente un código más sencillo de leer, Dart también permite trabajar directamente con los métodos de un `Future`.

Uno de los más importantes es `then()`, que permite indicar qué queremos hacer **cuando el `Future` se complete correctamente**.

Por ejemplo:

```dart
Future<int> convertirNumero(String texto) {
  return Future.delayed(
    const Duration(seconds: 2),
    () => int.parse(texto),
  );
}

void main() {
  convertirNumero('12').then((numero) {
    print('Número convertido: $numero');
  });
}
```

También podemos gestionar los errores mediante `catchError()`:

```dart
void main() {
  convertirNumero('Hola')
      .then((numero) {
        print('Número convertido: $numero');
      })
      .catchError((error) {
        print('No se ha podido realizar la conversión');
      });
}
```

Una forma equivalente mediante `async` y `await` sería:

```dart
Future<void> main() async {
  try {
    int numero = await convertirNumero('Hola');
    print('Número convertido: $numero');
  } catch (e) {
    print('No se ha podido realizar la conversión');
  }
}
```

En general, utilizaremos preferentemente **`async` y `await`**, ya que permiten escribir el código asíncrono siguiendo un flujo más lineal y fácil de interpretar.

No obstante, es importante conocer `then()` y `catchError()`, ya que podemos encontrarlos en código Dart existente.

## Acceso a APIs

Una de las aplicaciones más habituales de la programación asíncrona consiste en **obtener información desde servicios externos**.

Muchas aplicaciones necesitan comunicarse con servidores para consultar usuarios, productos, noticias, mensajes, información meteorológica, etc.

Esta comunicación suele realizarse mediante una **API (Application Programming Interface)**.

En aplicaciones web y móviles es habitual trabajar con **APIs REST**, que permiten realizar operaciones sobre recursos utilizando el protocolo HTTP.

Por ejemplo, una aplicación podría solicitar:

```
GET /productos
```

para obtener productos, o:

```
POST /usuarios
```

para crear un nuevo usuario.

Los datos intercambiados suelen utilizar formatos como **JSON**.

## JSON

**JSON (JavaScript Object Notation)** es uno de los formatos más utilizados para intercambiar información entre aplicaciones y servicios web.

Por ejemplo, un servidor podría devolver la siguiente información:

```json
{
  "id": 1,
  "nombre": "Ana",
  "edad": 25
}
```

Dart proporciona herramientas para transformar JSON en estructuras que podamos utilizar en nuestro programa mediante la biblioteca:

```dart
import 'dart:convert';
```

Las dos funciones que utilizaremos principalmente son:

* `jsonDecode()`: convierte texto JSON en estructuras de datos de Dart.
* `jsonEncode()`: convierte estructuras de datos de Dart a JSON.

### `jsonDecode()`

Por ejemplo:

```dart
import 'dart:convert';

void main() {
  String texto = '''
  {
    "id": 1,
    "nombre": "Ana",
    "edad": 25
  }
  ''';

  final datos = jsonDecode(texto);

  print(datos['nombre']); // Ana
  print(datos['edad']);   // 25
}
```

Un objeto JSON suele convertirse en Dart en una estructura similar a:

```dart
Map<String, dynamic>
```

Mientras que un array JSON suele convertirse en:

```dart
List<dynamic>
```

### `jsonEncode()`

También podemos realizar la operación inversa:

```dart
import 'dart:convert';

void main() {
  final usuario = {
    'nombre': 'Ana',
    'edad': 25,
  };

  String json = jsonEncode(usuario);

  print(json);
}
```

Obtendríamos:

```json
{"nombre":"Ana","edad":25}
```

Estas dos operaciones serán fundamentales cuando enviemos y recibamos información mediante APIs.
