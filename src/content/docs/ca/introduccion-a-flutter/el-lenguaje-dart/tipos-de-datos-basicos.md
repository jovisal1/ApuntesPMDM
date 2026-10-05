---
title: "Tipus de dades bàsics"
sidebar:
  label: "Tipus de dades bàsics"
  order: 5
---

https\://dart.dev/language/built-in-types

Dart suporta (entre altres) els següents tipus de variables bàsics:

* [Numèrics](https://dart.dev/language/built-in-types#numbers) (`int`, `double`)
* [Cadenes de caràcters](https://dart.dev/language/built-in-types#strings) (`String`)
* [Booleans](https://dart.dev/language/built-in-types#booleans) (`bool`)
* El  valor `null` (`Null`)

En **Dart**, les variables es poden declarar utilitzant les paraules clau **`var`**, **`final`**, o **`const`** depenent de la mena de variable que necessitem i seguit del seu identificador. A continuació, podem assignar el seu valor. Per exemple:

1. **`var`**: Declara una variable el tipus de la qual és inferit automàticament.

   ```dart
   var nombre = 'Juan';  // Dart infereix que és de tipus String
   ```
2. **`final`**: Declara una variable el valor de la qual no pot canviar després d'assignar-se.

   ```dart
   final edad = 25;  // No es pot reassignar
   ```
3. **`const`**: Similar a `final`, però el valor ha de ser conegut en temps de compilació.

   ```dart
   const pi = 3.14;  // Valor constant
   ```

A més, pots especificar el tipus explícitament:

```dart
int numero = 10;
String mensaje = 'Hola';
```

## Numèrics

Els valors numèrics en Dart poden ser de dos tipus: [`int`](https://api.dart.dev/stable/dart-core/int-class.html) i [`double`](https://api.dart.dev/stable/3.5.2/dart-core/double-class.html)*.* Mentre `int` s'utilitza per a representar valors enters de menys de 64 bits, `double` ho utilitzarem per a valors decimals.

:::note

Tant `int` com `double` són subtipus de [`num`](https://api.dart.dev/stable/3.5.2/dart-core/num-class.html). El tipus `num` inclou operadors bàsics com +, -, / i \*, i mètodes molt  útils com per exemple toInt(), toDouble() o toString() per a realitzar conversions entre tipus o ceil() i floor() per a arredoniments.&#x20;

Podem declarar una variable com num que podrà ser tant enter com double:

```dart
num x = 1; // x pot ser tant enter com double
x += 2.5;
```


:::

Vegem alguns exemples d'ús de variables numèriques:

```dart
// Declarem una variable (numeroEntero) de tipus int
int numeroEntero = 42;
// Creem una altra variable (cadenaNumeroEntero) amb el valor convertit a String
String cadenaNumeroEntero = numeroEntero.toString();
// Verifiquem que cadenaNumeroEntero té el valor esperat
assert(cadenaNumeroEntero == '42');
// Creem una altra variable (numeroDouble) amb el valor convertit a double
double numeroDouble = 43.2;
// Creem una altra variable (cadenaNumeroDouble) amb el valor convertit a String
String cadenaNumeroDouble = numeroDouble.toString();
// Verifiquem que cadenaNumeroDouble té el valor esperat
assert(cadenaNumeroDouble == '43.2');
```

En l'anterior codi s'utilitza la funció `assert`. Esta és una funció utilitzada **per a verificar condicions durant la fase de desenvolupament**. Serveix per a depurar el codi, permetent comprovar que una expressió o condició és vertadera mentre s'executa en mode de depuració. Si la condició avaluada amb `assert` és falsa, el programa llança una excepció, interrompent la seua execució i mostrant un missatge d'error opcional.

## Cadenes de caràcters

Les cadenes s'utilitzen principalment **per a representar text** i per a definir una variable d'este tipus, escrivim davant del nom de la variable el tipus de dada [String](https://api.flutter.dev/flutter/dart-core/String-class.html). A més, una cadena **pot ser d'una o diverses línies**. Les cadenes d'una sola línia s'escriuen utilitzant cometes simples o dobles coincidents, i les cadenes de diverses línies s'escriuen utilitzant cometes triples. Les següents són totes les cadenes de Dart vàlides:

```dart
String msg1 = 'Hola a PMDM';  
  
String msg2 = "Això també és una cadena de text";  
  
String msg3 = ''' Igual  
que  
això'''  
```

### Concatenació de cadenes

La forma més simple de concatenar cadenes de caràcters en Dart és utilitzant l'operador de suma (`+`). L'operador de suma s'utilitza per a unir dues o més cadenes de caràcters. Vegem un exemple:

```dart
String nombre = "Pepe";
int edad = 15;
String mensaje = "Hola, el meu nom és " + nombre + " i tinc " + edad + " anys";
print(mensaje); // Imprimeix Juan Pérez
```

L'execució de l'anterior  codi mostraria com a resultat la cadena Hola, el meu nom és *`Pepe i tinc 15 anys`*

### Interpolació de valors

La interpolació de textos és una forma elegant i fàcil de combinar valors de variables dins de cadenes de caràcters. En lloc de concatenar manualment  tots els elements (textos i valors de variables) utilitzant l'operador de concatenació (+), la interpolació de textos ens permet incrustar variables directament en la cadena utilitzant la sintaxi especial `${variable}`.

L'exemple anterior podria resoldre's fàcilment utilitzant interpolació amb el següent codi:

```dart
String nombre = 'Pepe';
int edad = 15;
String mensaje = 'Hola, el meu nom és $nombre i tinc $edad anys.';
print(mensaje);
```

:::note

Alguns mètodes i propietats útils de tractament de cadenes són les següents:&#x20;

* startsWith(cadena): retorna vertader si la variable comença amb la cadena passada com a paràmetre o fals en cas contrari.&#x20;
* endsWith(cadena): retorna vertader si la variable comença amb la cadena passada com a paràmetre o fals en cas contrari.&#x20;
* contains(cadena): retorna vertader si la variable conté la cadena passada com a paràmetre o fals en cas contrari.&#x20;
* toUpperCase()/ toLowerCase(): retorna el valor de la variable amb tots els seus caràcters en majúscula o minúscula.
* trim(): elimina els espais al començament i al final de la variable.&#x20;
* length: retorna el nombre de caràcters de la cadena de text.&#x20;
* isEmpty: retorna vertader si és una cadena buida o fals en cas contrari.&#x20;
* substring(inici, fi): retorna la porció de text compresa entre els caràcters en les posicions inici i fi.

Alguns exemples d'ús serien:

```dart
const string = 'dartlang';
print('$string has ${string.length} letters'); // dartlang té 8 lletres
const string = 'Dart és divertit';
print(string.substring(0, 4)); // 'Dart'
```


:::

Sí. Per a una introducció a Dart, la centraria en les conversions que realment utilitzaran: **String ↔ números**, `int ↔ double`, `toString()` i les variants segures `tryParse()`.

## Conversió de tipus

En determinades situacions necessitarem **convertir un valor d'una mena de dada a un altre**. Per exemple, les dades introduïdes per teclat es reben com a cadenes de text (`String`), per la qual cosa haurem de convertir-los si volem realitzar operacions numèriques amb ells.

Dart proporciona diferents mètodes per a realitzar estes conversions.

### De `String` a valors numèrics

Podem convertir una cadena de text a un nombre enter mitjançant `int.parse()`:

```dart
String texto = '25';
int numero = int.parse(texto);
print(numero); // 25
```

Per a convertir una cadena a un nombre decimal utilitzarem `double.parse()`:

```dart
String texto = '12.5';
double numero = double.parse(texto);
print(numero); // 12.5
```

És important que el contingut de la cadena represente un número vàlid. Per exemple:

```dart
int numero = int.parse('Flutter');
```

produirà un error durant l'execució, ja que `'Flutter'` no pot convertir-se en un nombre enter.

### Conversions segures amb `tryParse()`

Quan no podem garantir que el text conté un número vàlid, és preferible utilitzar `tryParse()`:

```dart
String texto = '25';

int? numero = int.tryParse(texto);

print(numero); // 25
```

Si la conversió no pot realitzar-se, `tryParse()` retorna `null` en lloc de produir una excepció:

```dart
String texto = 'Flutter';
int? numero = int.tryParse(texto);
print(numero); // null
```

Això ens permet comprovar fàcilment si la conversió s'ha realitzat correctament:

```dart
String texto = '25';
int? numero = int.tryParse(texto);
if (numero != null) {
  print('El número és $numero');
} else {
  print('El valor introduït no és vàlid');
}
```

També disposem de:

```dart
double.tryParse('12.5');
```

per a realitzar conversions segures a `double`.

### De valors numèrics a `String`

Per a convertir un valor a una cadena de text podem utilitzar el mètode `toString()`:

```dart
int edad = 25;
String texto = edad.toString();
print(texto); // "25"
```

Podem utilitzar-ho també amb altres tipus:

```dart
double precio = 19.95;
bool activo = true;
String precioTexto = precio.toString();
String activoTexto = activo.toString();
```

No obstant això, quan únicament volem **incorporar un valor dins d'una cadena**, normalment serà més còmode utilitzar interpolació:

```dart
int edad = 25;
print('Tinc $edad anys');
```

### Conversió entre `int` i `double`

Dart distingeix entre nombres enters (`int`) i nombres decimals (`double`).

Podem convertir un enter a decimal mitjançant `toDouble()`:

```dart
int numero = 10;
double decimal = numero.toDouble();
print(decimal); // 10.0
```

Per a realitzar la conversió inversa utilitzarem `toInt()`:

```dart
double precio = 19.95;
int entero = precio.toInt();
print(entero); // 19
```

És important tindre en compte que `toInt()` **elimina la part decimal**, no arredoneix el número.

Si volem arredonir podem utilitzar:

```dart
double numero = 19.75;

print(numero.round()); // 20
print(numero.floor()); // 19
print(numero.ceil());  // 20
```

On:

* `round()` arredoneix a l'enter més pròxim.
* `floor()` obté l'enter inferior.
* `ceil()` obté l'enter superior.

### Exemple: llegir i convertir dades

Un cas molt habitual consisteix a llegir informació des del teclat i convertir-la al tipus que necessitem:

```dart
import 'dart:io';

void main() {
  stdout.write('Introdueix la teua edat: ');

  String? entrada = stdin.readLineSync();
  int? edad = int.tryParse(entrada ?? '');

  if (edad != null) {
    print('L\'any vinent tindràs ${edad + 1} anys');
  } else {
    print('Has d\'introduir un número vàlid');
  }
}
```

En este exemple combinem diversos conceptes: **entrada de dades, Null Safety, conversió de tipus i estructures condicionals**.

#### Resum

| Conversió           | Mètode              | Exemple                   |
| -------------------- | ------------------- | ------------------------- |
| `String` → `int`     | `int.parse()`       | `int.parse('25')`         |
| `String` → `double`  | `double.parse()`    | `double.parse('12.5')`    |
| `String` → `int?`    | `int.tryParse()`    | `int.tryParse('25')`      |
| `String` → `double?` | `double.tryParse()` | `double.tryParse('12.5')` |
| `int` → `double`     | `toDouble()`        | `numero.toDouble()`       |
| `double` → `int`     | `toInt()`           | `numero.toInt()`          |
| Valor → `String`     | `toString()`        | `numero.toString()`       |

> Sempre que el valor que volem convertir puga procedir de l'entrada d'un usuari o d'una font que no controlem, és recomanable utilitzar **`tryParse()`** en lloc de `parse()`, ja que ens permet gestionar una conversió incorrecta sense provocar directament una excepció

## Lògics

El tipus `bool` s'utilitza per a representar **valors lògics**. Una variable d'este tipus únicament pot emmagatzemar un d'estos dos valors:

* `true`: vertader.
* `false`: fals.

Els valors booleans són especialment importants en programació, ja que s'utilitzen per a **representar condicions i prendre decisions** durant l'execució d'un programa.

Per exemple:

```dart
void main() {
  bool activo = true;
  bool finalizado = false;

  print(activo);     // true
  print(finalizado); // false
}
```

També és habitual obtindre valors booleans com a resultat de **comparacions o crides a determinats mètodes**.

Per exemple, el mètode `contains()` de `String` permet comprovar si una cadena conté un determinat text i retorna un valor booleà:

```dart
void main() {
  String cadena = 'Això és una cadena de text';
  bool contieneTexto = cadena.contains('texto');
  print(contieneTexto); // true
}
```

En este cas, `contains()` comprova si la cadena conté `'texto'`. Com el resultat de la comprovació és vertader, la variable `contieneTexto` emmagatzemarà el valor `true`.

## Nuls

Dart incorpora un sistema denominat **Null Safety** l'objectiu del qual és evitar errors provocats per l'ús inesperat de valors `null`.

Per defecte, les variables en Dart **no poden contindre `null`**. Per exemple:

```dart
String nombre = 'Ana';
nombre = null; // Error
```

Si necessitem que una variable puga contindre un valor nul, haurem d'indicar-lo **explícitament en el seu tipus**:

```dart
String? nombre;
```

D'esta forma, Dart pot detectar durant el desenvolupament moltes situacions en les quals podríem estar utilitzant un valor nul de manera incorrecta.

Per a treballar amb estos valors, Dart proporciona diferents **operadors relacionats amb Null Safety**.

### Variables *nullable*: `?`

L'operador `?`, col·locat després del tipus, indica que una variable **pot contindre un valor d'eixe tipus o `null`**.

```dart
int? edad;
String? nombre;
```

En este exemple, tant `edad` com `nombre` poden contindre `null`.

En canvi:

```dart
int edad = 20;
String nombre = 'Ana';
```

són variables **no anul·lables (*****non-nullable*****)** i Dart no permetrà assignar-los `null`.

### Operador d'asserció no nul·la: `!`

Quan tenim una variable *nullable* però sabem amb certesa que **el seu valor no és `null`**, podem utilitzar l'operador `!`.

```dart
String? nombre = 'Ana';
String nombreUsuario = nombre!;
```

Amb `nombre!` estem indicant a Dart:

> «Sé que esta variable pot contindre `null`, però en este punt garantisc que té un valor».

:::caution

Hem d'utilitzar este operador amb precaució. Si la nostra afirmació és incorrecta i el valor realment és `null`, es produirà un **error durant l'execució**:

```dart
String? nombre;

String nombreUsuario = nombre!; // Error en temps d'execució
```

Per tant, `!` **no elimina ni converteix un valor `null`**; simplement indica al compilador que assumim la responsabilitat de garantir que el valor no és nul.

:::

### Valor alternatiu: `??`

L'operador `??` permet proporcionar un **valor alternatiu quan una expressió és `null`**.

```dart
String? nombre;
print(nombre ?? 'Anònim');
```

Podem interpretar l'expressió anterior com:

* si `nombre` té un valor, utilitza eixe valor;
* si `nombre` és `null`, utilitza `'Anònim'`.

Per exemple:

```dart
String? nombre = 'Laura';
print(nombre ?? 'Anònim'); // Laura
```

Mentre que:

```dart
String? nombre;
print(nombre ?? 'Anònim'); // Anònim
```

Este operador resulta especialment útil per a establir **valors predeterminats**.

### Assignació si és nul: `??=`

L'operador `??=` permet **assignar un valor únicament quan la variable conté `null`**.

```dart
String? nombre;

nombre ??= 'Anònim';

print(nombre); // Anònim
```

Si la variable ja conté un valor, este es conserva:

```dart
String? nombre = 'Laura';

nombre ??= 'Anònim';

print(nombre); // Laura
```

Per tant:

```dart
variable ??= valor;
```

pot interpretar-se com:

> «Assigna `valor` únicament si `variable` és `null`».

### Accés condicional: `?.`

Quan un objecte pot ser `null`, no podem accedir directament a les seues propietats o mètodes sense comprovar prèviament el seu valor.

Per exemple:

```dart
String? nombre;

print(nombre.length); // Error
```

Podem utilitzar l'operador `?.` per a realitzar l'accés **únicament si l'objecte no és `null`**:

```dart
String? nombre;

print(nombre?.length); // null
```

Si `nombre` conté un valor:

```dart
String? nombre = 'Flutter';

print(nombre?.length); // 7
```

Dart accedirà normalment a la propietat `length`. Si conté `null`, l'expressió retornarà `null` en lloc d'intentar realitzar l'accés.

### Resum d'operadors

| Operador | Funció                                                        | Exemple                |
| -------- | -------------------------------------------------------------- | ---------------------- |
| `?`      | Indica que una variable pot contindre `null`                  | `String? nombre`       |
| `!`      | Afirma que un valor *nullable* no és `null`                    | `nombre!`              |
| `??`     | Proporciona un valor alternatiu si és `null`                  | `nombre ?? 'Anònim'`  |
| `??=`    | Assigna un valor únicament si la variable és `null`            | `nombre ??= 'Anònim'` |
| `?.`     | Accedeix a una propietat o mètode sol si l'objecte no és `null` | `nombre?.length`       |

La **Null Safety** serà especialment important quan treballem amb Flutter, ja que trobarem sovint dades que poden no estar disponibles, paràmetres opcionals o valors que encara no han sigut inicialitzats. Comprendre estos operadors ens permetrà gestionar estes situacions de manera segura i evitar errors durant l'execució.

## Enumerats

Els tipus de dades enumerades ([enum](https://dart.dev/language/enums)) són un tipus especial de classe utilitzada per a representar un nombre fix de valors constants. **Ha de declarar-se sempre fora de qualsevol funció o classe**.

Per exemple, podem definir un enumerat amb colors de la següent forma:

```dart
enum Color { red, green, blue }
```

Cada valor en un [enum](https://dart.dev/language/enums) té un **index getter**, que retorna la posició del valor en la declaració. El primer valor té índex 0 i per a obtindre una llista de tots els valors d'un **enum**, usem **values**.

<pre class="language-dart"><code class="lang-dart"><strong>List&#x3C;Color> colors = Color.values;
</strong>assert(colors[2] == Color.blue);
</code></pre>

Podem usar **enums** en les sentències **switch**:

<pre class="language-dart"><code class="lang-dart">var aColor = Color.blue;

<strong>switch (aColor) {
</strong><strong>  case Color.red:
</strong>    print('Xarxa as roses!');
    break;
<strong>  case Color.green:
</strong>    print('Green as grass!');
    break;
<strong>  default: // Without this, you see a WARNING.
</strong>    print(aColor); // 'Color.blue'
}
</code></pre>

## Dinàmics

Dart és un llenguatge amb **tipatge estàtic**, la qual cosa significa que els tipus de les variables es coneixen i comproven principalment durant la compilació. No obstant això, Dart també permet treballar amb valors el tipus dels quals no coneixem per endavant mitjançant el tipus `dynamic`.

Una variable declarada com `dynamic` pot emmagatzemar valors de diferents tipus durant l'execució del programa:

```dart
void main() {
  dynamic miVariable;

  miVariable = 'Hola';
  print(miVariable.toUpperCase());

  miVariable = 10;
  print(miVariable + 5);
}
```

En este exemple, `miVariable` està declarada com `dynamic`. Primer conté un `String` i posteriorment un `int`.

En utilitzar `dynamic`, Dart permet realitzar operacions sobre el valor sense comprovar durant la compilació si realment existeixen per a eixe tipus. Per este motiu, hem d'utilitzar-lo amb cura:

```dart
dynamic miVariable = 10;

miVariable.toUpperCase(); // Error durant l'execució
```

El compilador permet esta instrucció perquè `miVariable` és `dynamic`, però quan s'executa el programa descobrim que un `int` no disposa del mètode `toUpperCase()`.

### Diferència entre `var` i `dynamic`

Hem de tindre en compte que `var` **no és un tipus**, sinó una paraula clau que permet a Dart inferir automàticament el tipus a partir del valor assignat.

Per exemple:

```dart
var nombre = 'Ontinyent';
```

Dart infereix que `nombre` és un `String`. A partir d'eixe moment no podrem assignar-li un valor d'un altre tipus:

```dart
nombre = 10; // Error
```

En canvi:

```dart
dynamic valor = 'Ontinyent';
valor = 10;     // Correcte
valor = true;   // Correcte
```

Una variable `dynamic` pot contindre valors de diferents tipus durant l'execució.

### L'operador `as`

Quan treballem amb valors `dynamic`, a vegades **sabem quin tipus de dada esperem trobar**, encara que Dart no puga determinar-ho automàticament.

En estos casos podem utilitzar l'operador `as` per a realitzar una **conversió o comprovació de tipus (*****type cast*****)**:

```dart
dynamic valor = 'Ontinyent';
String ciudad = valor as String;
print(ciudad.toUpperCase());
```

Amb:

```dart
valor as String
```

estem indicant que esperem que l'objecte emmagatzemat en `valor` siga un `String`.

Això serà especialment útil quan treballem amb **JSON**, ja que trobarem estructures amb tipus com:

```dart
Map<String, dynamic>
```

Per exemple:

```dart
final nombre = datos['name'] as String;
```

o:

```dart
final resultados = datos['results'] as List<dynamic>;
```

És important entendre que `as` **no transforma qualsevol valor en el tipus indicat**. L'objecte ha de ser compatible amb eixe tipus:

```dart
dynamic valor = 10;
String texto = valor as String; // Error en temps d'execució
```

:::note

`dynamic` permet treballar amb un valor el tipus del qual no està determinat estàticament, mentre que `as` ens permet indicar i comprovar el tipus que esperem que tinga eixe valor.

:::

Esta combinació apareixerà sovint quan processem les respostes JSON d'una API.
