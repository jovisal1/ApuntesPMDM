---
title: "Programació asíncrona"
sidebar:
  label: "Programació asíncrona"
  order: 12
---

https\://dart.dev/libraries/async/async-await

Quan executem un programa de manera **síncrona**, les instruccions es processen seqüencialment. Si una operació tarda diversos segons a completar-se, les instruccions que depenen d'ella hauran d'esperar fins a obtindre el seu resultat.

No obstant això, moltes de les operacions que realitzarem en una aplicació poden requerir cert temps:

* realitzar una petició a una API;
* consultar una base de dades;
* llegir o escriure un arxiu;
* accedir a determinats serveis del dispositiu;
* esperar la resposta d'un servidor.

En estos casos resulta especialment important la **programació asíncrona**, que ens permet iniciar una operació i gestionar el seu resultat quan estiga disponible, evitant bloquejar innecessàriament el flux d'execució de la nostra aplicació.

En Dart, la programació asíncrona es basa principalment en tres elements:

* **`Future`**: representa un valor o error que estarà disponible posteriorment.
* **`async`**: permet definir funcions que realitzen operacions asíncrones.
* **`await`**: permet esperar el resultat d'una operació asíncrona.

Estos conceptes seran especialment importants quan treballem amb Flutter, ja que moltes operacions habituals d'una aplicació mòbil són asíncrones.

### El problema: operacions que requereixen temps

Imaginem que volem preparar un desdejuni compost per una torrada i un ou.

Podem simular que preparar la torrada requereix cinc segons:

```dart
import 'dart:io';

bool tostarPan() {
  print('Preparant el pa...');
  print('Torrant el pa...');

  sleep(const Duration(seconds: 5));

  print('El pa està torrat!');
  return true;
}

bool freirHuevo() {
  print('Trencant l\'ou...');
  print('Fregint l\'ou...');
  print('L\'ou està llest!');
  return true;
}

void main() {
  bool panTostado = tostarPan();
  bool huevoFrito = freirHuevo();
  print('Pa: $panTostado - Ou: $huevoFrito');
}
```

En este exemple, `sleep()` deté l'execució durant cinc segons. Per tant, l'ou **no comença a preparar-se fins que acaba la torrada**.

Obtindríem una eixida similar a:

```
Preparant el pa...
Torrant el pa...

[esperem 5 segons]

El pa està torrat!
Trencant l'ou...
Fregint l'ou...
L'ou està llest!
Pa: true - Ou: true
```

Esta espera representa precisament el tipus de situació que volem evitar en operacions que poden gestionar-se de manera asíncrona. En la teua versió original este exemple s'utilitzava per a introduir el bloqueig provocat per `sleep()`.

## `Future`

Un `Future` representa el **resultat d'una operació que pot no estar disponible immediatament**, però que esperem obtindre posteriorment.

Podem entendre-ho com una promesa: "Ara mateix no tinc el resultat, però et proporcionaré un valor —o un error— quan acabe l'operació."

Per exemple:

```dart
Future<String> obtenerNombre() {
  return Future.delayed(
    const Duration(seconds: 2),
    () => 'Ana',
  );
}
```

La funció no retorna directament un `String`:

```dart
String
```

sinó:

```dart
Future<String>
```

És a dir, representa un `String` que **estarà disponible quan finalitze l'operació**.

### `Future.delayed()`

Per als nostres primers exemples podem utilitzar `Future.delayed()`, que permet simular una operació que necessita cert temps per a completar-se:

```dart
Future<String> obtenerMensaje() {
  return Future.delayed(
    const Duration(seconds: 2),
    () => 'Operació completada',
  );
}
```

Després d'aproximadament dos segons, el `Future` es completarà amb:

```
Operació completada
```

En una aplicació real no utilitzarem normalment estos retards artificials. El temps d'espera procedirà d'operacions com una petició HTTP, una consulta a una base de dades o la lectura d'un arxiu.

### Mini Task Manager: simular un servidor

Fins ara creàvem les tasques directament en el programa. Abans de connectar-nos a Internet, simularem una descàrrega amb dos segons d'espera. Afig esta funció fora de la classe `Tarea` que venim construint:

```dart
Future<List<Tarea>> descargarTareas() async {
  print('📡 Connectant amb el servidor...');

  await Future.delayed(const Duration(seconds: 2));

  print('📦 Dades rebudes');
  return [
    Tarea(titulo: 'Estudiar Dart', fechaLimite: DateTime.now()),
    Tarea(titulo: 'Preparar examen', fechaLimite: DateTime.now()),
  ];
}
```

`Future<List<Tarea>>` indica que obtindrem una llista de tasques quan acabe l'operació. `Future.delayed()` permet simular l'espera; durant eixe temps el programa pot atendre altres operacions. En el següent exemple veurem com consumir el resultat amb `await`.

### Estats d'un `Future`

Un `Future` pot trobar-se inicialment **incomplet**, mentre esperem que acabe l'operació.

Posteriorment es completarà d'una d'estes dues formes:

* **Amb un valor**, si l'operació finalitza correctament.
* **Amb un error**, si es produeix algun problema.

Conceptualment:

```
                ┌── valor
Future ────────►│
                └── error
```

Per exemple, un:

```dart
Future<int>
```

no és un `int`. Representa un valor de tipus `int` que esperem obtindre posteriorment.

Esta diferència és fonamental.

## `async` i `await`

La forma més habitual i llegible de treballar amb operacions asíncrones en Dart és mitjançant les paraules clau **`async` i `await`**.

### `async`

La paraula clau `async` permet indicar que una funció realitzarà operacions asíncrones.

Per exemple:

```dart
Future<String> obtenerNombre() async {
  return 'Ana';
}
```

Encara que escrivim:

```dart
return 'Ana';
```

la funció està marcada com `async`, per la qual cosa el seu tipus de retorn és:

```dart
Future<String>
```

Per a funcions asíncrones que no necessiten retornar cap valor utilitzarem:

```dart
Future<void>
```

Per exemple:

```dart
Future<void> realizarOperacion() async {
  // Operacions asíncrones
}
```

### `await`

La paraula clau `await` permet **esperar que un `Future` es complete i obtindre el seu resultat**.

Per exemple:

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

Quan executem:

```dart
await obtenerNombre();
```

Dart espera que eixe `Future` es complete abans de continuar amb la següent instrucció d'eixa funció.

:::note

Per a utilitzar `await`, hem de trobar-nos dins d'una funció marcada com `async`.

:::

### Mini Task Manager: esperar el resultat

Conserva `Tarea` i la funció `descargarTareas()` de la simulació anterior. Substitueix el `main()` per este:

```dart
Future<void> main() async {
  print('1. Iniciant aplicació');
  final tareas = await descargarTareas();
  print('2. Tasques descarregades');

  for (final tarea in tareas) {
    print(tarea.titulo);
  }

  print('3. Fi');
}
```

**En quin ordre apareixeran els missatges?** Primer veurem l'inici i la connexió; després de l'espera apareixeran les dades rebudes, la confirmació de descàrrega, els títols i el final.

Prova de llevar només el `await` de `final tareas = await descargarTareas()`: `tareas` passarà a ser un `Future<List<Tarea>>`, per la qual cosa el bucle no compilarà. Per a observar l'ordre sense esperar, substitueix tot el `main()` per esta variant i conserva les altres definicions:

```dart
Future<void> main() async {
  print('1. Iniciant aplicació');
  final descarga = descargarTareas();
  print('2. La descàrrega segueix en curs');

  final tareas = await descarga;
  for (final tarea in tareas) {
    print(tarea.titulo);
  }
  print('3. Fi');
}
```

Ara el segon missatge apareix abans de rebre les dades. Iniciar una operació i esperar el seu resultat són dos passos diferents.

## Tornem al nostre desdejuni

Ara podem modificar l'exemple inicial perquè el temps necessari per a torrar el pa siga una espera asíncrona:

```dart
Future<bool> tostarPan() async {
  print('Preparant el pa...');
  print('Torrant el pa...');

  await Future.delayed(const Duration(seconds: 5));

  print('El pa està torrat!');
  return true;
}

bool freirHuevo() {
  print('Trencant l\'ou...');
  print('Fregint l\'ou...');
  print('L\'ou està llest!');

  return true;
}
```

Podem esperar el resultat de `tostarPan()` mitjançant `await`:

```dart
Future<void> main() async {
  bool panTostado = await tostarPan();
  bool huevoFrito = freirHuevo();

  print('Pa: $panTostado - Ou: $huevoFrito');
}
```

No obstant això, hi ha un detall important: encara que `tostarPan()` és asíncrona, en utilitzar `await` immediatament estem indicant que **no volem continuar en eixa funció fins a obtindre el seu resultat**.

Això ens porta a una qüestió important: què ocorre quan tenim diverses operacions independents que poden realitzar-se mentre esperem?

## Executar diverses operacions asíncrones

Imaginem dues operacions independents:

```dart
Future<String> obtenerUsuario() async {
  await Future.delayed(const Duration(seconds: 2));
  return 'Ana';
}

Future<String> obtenerMensajes() async {
  await Future.delayed(const Duration(seconds: 3));
  return '5 missatges';
}
```

Podríem executar-les seqüencialment:

```dart
Future<void> main() async {
  String usuario = await obtenerUsuario();
  String mensajes = await obtenerMensajes();

  print('$usuario - $mensajes');
}
```

En este cas esperem primer una operació i després iniciem la següent.

Quan les operacions són independents, podem iniciar totes dues abans d'esperar els seus resultats:

```dart
Future<void> main() async {
  Future<String> futuroUsuario = obtenerUsuario();
  Future<String> futuroMensajes = obtenerMensajes();

  String usuario = await futuroUsuario;
  String mensajes = await futuroMensajes;

  print('$usuario - $mensajes');
}
```

D'esta forma, totes dues operacions poden progressar durant el mateix interval d'espera.

### `Future.wait()`

Dart també proporciona `Future.wait()` per a esperar conjuntament diversos `Future`:

```dart
Future<void> main() async {
  List<String> resultados = await Future.wait([
    obtenerUsuario(),
    obtenerMensajes(),
  ]);

  print(resultados);
}
```

`Future.wait()` resulta especialment útil quan necessitem realitzar **diverses operacions asíncrones independents i esperar que totes acaben**.

## Gestió d'errors asíncrons

Una operació asíncrona també pot finalitzar amb un error.

Quan utilitzem `async` i `await`, podem gestionar estos errors mitjançant els blocs `try-catch` que ja coneixem:

```dart
Future<int> convertirNumero(String texto) async {
  await Future.delayed(const Duration(seconds: 2));
  return int.parse(texto);
}
```

Podem controlar una possible conversió incorrecta mitjançant:

```dart
Future<void> main() async {
  try {
    int numero = await convertirNumero('Hola');
    print('Número: $numero');
  } catch (e) {
    print('S\'ha produït un error: $e');
  }
}
```

Com `'Hola'` no pot convertir-se en un nombre enter, `int.parse()` genera una excepció que serà capturada per `catch`.

També podem utilitzar `finally`:

```dart
Future<void> main() async {
  try {
    int numero = await convertirNumero('12');
    print('Número: $numero');
  } catch (e) {
    print('S\'ha produït un error: $e');
  } finally {
    print('Operació finalitzada');
  }
}
```

Per tant, quan treballem amb `async` i `await`, utilitzarem normalment:

```
async / await
      +
try / catch / finally
```

### Mini Task Manager: una descàrrega que falla

Per a simular una fallada, substitueix temporalment la funció `descargarTareas()` per esta versió:

```dart
Future<List<Tarea>> descargarTareas() async {
  await Future.delayed(const Duration(seconds: 2));
  throw Exception('El servidor no està disponible');
}
```

Substitueix també el `main()` pel següent. El `await` ha d'estar dins del `try` per a capturar l'error de l'operació:

```dart
Future<void> main() async {
  try {
    print('📡 Descarregant tasques...');
    final tareas = await descargarTareas();
    for (final tarea in tareas) {
      tarea.mostrar();
    }
  } catch (e) {
    print('❌ No es van poder carregar les tasques: $e');
  } finally {
    print('👋 Aplicació finalitzada');
  }
}
```

Prediu l'eixida abans d'executar. Després recupera la funció que retorna tasques i comprova que `finally` també s'executa quan la descàrrega acaba correctament. Este mateix `main()` ens servirà en substituir la simulació per una petició HTTP.

## Treballar amb `Future` mitjançant `then()`

Encara que `async` i `await` proporcionen normalment un codi més senzill de llegir, Dart també permet treballar directament amb els mètodes d'un `Future`.

Un dels més importants és `then()`, que permet indicar què volem fer **quan el `Future` es complete correctament**.

Per exemple:

```dart
Future<int> convertirNumero(String texto) {
  return Future.delayed(
    const Duration(seconds: 2),
    () => int.parse(texto),
  );
}

void main() {
  convertirNumero('12').then((numero) {
    print('Número convertit: $numero');
  });
}
```

També podem gestionar els errors mitjançant `catchError()`:

```dart
void main() {
  convertirNumero('Hola')
      .then((numero) {
        print('Número convertit: $numero');
      })
      .catchError((error) {
        print('No s\'ha pogut realitzar la conversió');
      });
}
```

Una forma equivalent mitjançant `async` i `await` seria:

```dart
Future<void> main() async {
  try {
    int numero = await convertirNumero('Hola');
    print('Número convertit: $numero');
  } catch (e) {
    print('No s\'ha pogut realitzar la conversió');
  }
}
```

En general, utilitzarem preferentment **`async` i `await`**, ja que permeten escriure el codi asíncron seguint un flux més lineal i fàcil d'interpretar.

No obstant això, és important conéixer `then()` i `catchError()`, ja que podem trobar-los en codi Dart existent.

## Accés a APIs

Una de les aplicacions més habituals de la programació asíncrona consisteix a **obtindre informació des de serveis externs**.

Moltes aplicacions necessiten comunicar-se amb servidors per a consultar usuaris, productes, notícies, missatges, informació meteorològica, etc.

Esta comunicació sol realitzar-se mitjançant una **API (Application Programming Interface)**.

En aplicacions web i mòbils és habitual treballar amb **APIs REST**, que permeten realitzar operacions sobre recursos utilitzant el protocol HTTP.

Per exemple, una aplicació podria sol·licitar:

```
GET /productos
```

per a obtindre productes, o:

```
POST /usuarios
```

per a crear un nou usuari.

Les dades intercanviades solen utilitzar formats com **JSON**.

## JSON

**JSON (JavaScript Object Notation)** és un dels formats més utilitzats per a intercanviar informació entre aplicacions i serveis web.

Per exemple, un servidor podria retornar la següent informació:

```json
{
  "id": 1,
  "nombre": "Ana",
  "edad": 25
}
```

Dart proporciona eines per a transformar JSON en estructures que puguem utilitzar en el nostre programa mitjançant la biblioteca:

```dart
import 'dart:convert';
```

Les dues funcions que utilitzarem principalment són:

* `jsonDecode()`: converteix text JSON en estructures de dades de Dart.
* `jsonEncode()`: converteix estructures de dades de Dart a JSON.

### `jsonDecode()`

Per exemple:

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

Un objecte JSON sol convertir-se en Dart en una estructura similar a:

```dart
Map<String, dynamic>
```

Mentre que un array JSON sol convertir-se en:

```dart
List<dynamic>
```

### `jsonEncode()`

També podem realitzar l'operació inversa:

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

Obtindríem:

```json
{"nombre":"Ana","edad":25}
```

Estes dues operacions seran fonamentals quan enviem i rebem informació mitjançant APIs.
