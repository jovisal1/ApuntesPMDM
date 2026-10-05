---
title: "Programació modular"
sidebar:
  label: "Programació modular"
  order: 8
---

A mesura que els nostres desenvolupaments creixen i es tornen més complexos, necessitem plantejar-nos algun tipus de subdivisió que faça que el nostre codi siga més abordable i mantenible.

En esta secció presentem les principals opcions que ens ofereix el llenguatge Dart per a resoldre problemes complexos mitjançant la seua descomposició en uns altres més simples.

## Funcions

Com ocorre  en altres llenguatges de programació, una funció en Dart és un bloc de codi que realitza alguna operació. Este bloc de codi tindrà un nom, podrà rebre paràmetres, i retornarà un valor.  Per exemple:

```dart
String saludo(String nombre){
    return "Hola Caragol de mar, soc $nombre" ;
}
```

En l'exemple anterior disposem d'una funció denominada salutació que retorna una cadena de text i que rep com a paràmetre una variable de tipus String denominada nom.

### Paràmetres

Els **paràmetres** permeten proporcionar informació a una funció perquè puga utilitzar-la durant la seua execució. S'especifiquen entre parèntesi després del nom de la funció, indicant normalment el seu **tipus i nom**.

Per exemple:

```dart
void saludar(String nombre) {
  print('Hola, $nombre');
}

void main() {
  saludar('Ana');
}
```

En este cas, `nombre` és el **paràmetre** definit per la funció, mentre que `'Ana'` és l’**argument** que proporcionem en invocar-la.

Dart ofereix diferents maneres de definir els paràmetres d'una funció, principalment **posicionals** i **nomenats**.

#### **Paràmetres posicionals obligatoris**

Són la forma més senzilla de definir paràmetres. En cridar a la funció hem de proporcionar **tots els arguments i respectar l'ordre en el qual han sigut declarats**.

```dart
void saludar(String nombre, int edad) {
  print('Hola, $nombre. Tens $edad anys.');
}

void main() {
  saludar('Pepe', 25);
}
```

En este exemple, el primer argument correspon a `nombre` i el segon a `edad`.

Per tant, l'ordre és important:

```dart
saludar('Pepe', 25); // Correcte
```

#### **Paràmetres posicionals opcionals `[ ]`**

Podem fer que determinats paràmetres posicionals siguen **opcionals** col·locant-los entre claudàtors `[ ]`.

```dart
void saludar(String nombre, [String? ciudad]) {
  print('Hola, $nombre');
}
```

Ara podem cridar a la funció proporcionant únicament el paràmetre obligatori:

```dart
saludar('Ana');
```

o proporcionant també l'opcional:

```dart
saludar('Ana', 'Valencia');
```

En utilitzar Null Safety, un paràmetre opcional ha de poder contindre `null` o disposar d'un **valor predeterminat**:

```dart
void saludar(String nombre, [String ciudad = 'Valencia']) {
  print('Hola, $nombre. Vius en $ciudad.');
}
```

Si no proporcionem el segon argument, s'utilitzarà `'Valencia'`:

```dart
saludar('Ana');
// Hola, Ana. Vius a València.
```

#### **Paràmetres amb nom `{ }`**

Els paràmetres amb nom es defineixen entre claus `{ }` i permeten indicar explícitament **a quin paràmetre correspon cada argument** en cridar a la funció.

```dart
void mostrarUsuario({String? nombre, int? edad}) {
  print('Nom: $nombre - Edat: $edad');
}
```

Per a proporcionar els arguments utilitzem el nom del paràmetre:

```dart
mostrarUsuario(nombre: 'Ana', edad: 30);
```

Un dels seus principals avantatges és que **l'ordre deixa de ser important**:

```dart
mostrarUsuario(edad: 30, nombre: 'Ana');
```

Totes dues crides produeixen el mateix resultat.

A més, els paràmetres amb nom són **opcionals per defecte**, per la qual cosa podríem escriure:

```dart
mostrarUsuario(nombre: 'Ana');
```

En este cas, `edad` tindrà el valor `null`.

#### **Paràmetres amb nom amb valors predeterminats**

També podem proporcionar un **valor per defecte** a un paràmetre amb nom:

```dart
void saludar({
  String nombre = 'Amigo',
  int edad = 0,
}) {
  print('Hola, $nombre. Tens $edad anys.');
}
```

Podem cridar a la funció sense proporcionar cap argument:

```dart
saludar();
// Hola, Amic. Tens 0 anys.
```

O modificar únicament els valors que necessitem:

```dart
saludar(nombre: 'Laura');
// Hola, Laura. Tens 0 anys.
```

#### **Paràmetres amb nom obligatoris: `required`**

Encara que els paràmetres amb nom són opcionals per defecte, podem indicar que un d'ells siga **obligatori** mitjançant la paraula clau `required`.

```dart
void crearUsuario({
  required String nombre,
  required String email,
  int edad = 18,
}) {
  print('$nombre - $email - $edad');
}
```

Ara serà obligatori proporcionar `nombre` i `email`:

```dart
crearUsuario(
  nombre: 'Ana',
  email: 'ana@email.com',
);
```

Mentre que `edad` continuarà sent opcional perquè disposa d'un valor predeterminat.

Si intentem ometre un paràmetre `required`:

```dart
crearUsuario(nombre: 'Ana'); // Error
```

Dart detectarà el problema abans d'executar el programa.

:::note

**`required` serà especialment important en Flutter.** Els paràmetres amb nom s'utilitzen constantment en els constructors dels widgets per a fer el codi més llegible i permetre distingir clarament quins valors són obligatoris i quins opcionals.

:::

Per exemple, més endavant trobarem codi amb una estructura similar a:

```dart
MiWidget(
  titulo: 'Flutter',
  activo: true,
)
```

#### Resum

| Tipus                                      | Sintaxi                   | Obligatori? | Importa l'ordre? |
| ----------------------------------------- | -------------------------- | ------------: | -----------------: |
| Posicional                                | `String nombre`            |            Sí |                 Sí |
| Posicional opcional                       | `[String? nombre]`         |            No |                 Sí |
| Posicional opcional amb valor per defecte | `[String nombre = 'Ana']`  |            No |                 Sí |
| Amb nom                                  | `{String? nombre}`         |            No |                 No |
| Amb nom amb valor per defecte            | `{String nombre = 'Ana'}`  |            No |                 No |
| Amb nom obligatori                      | `{required String nombre}` |            Sí |                 No |

### Funcions fletxa

Dart permet utilitzar una sintaxi abreujada per a aquelles funcions el cos de les quals està format per **una única expressió**. Estes funcions es coneixen habitualment com a **funcions fletxa** (*arrow functions*) i utilitzen l'operador `=>`.

Per exemple, una funció convencional com:

```dart
int cuadrado(int numero) {
  return numero * numero;
}
```

pot escriure's de forma més compacta:

```dart
int cuadrado(int numero) => numero * numero;
```

Totes dues funcions són equivalents. En una funció fletxa, el resultat de l'expressió situada després de `=>` s'utilitza directament com a **valor de retorn**, per la qual cosa no és necessari utilitzar `return`.

També podem utilitzar esta sintaxi en funcions que no retornen cap valor:

```dart
void saludar(String nombre) => print('Hola, $nombre');
```

Un exemple habitual apareix quan treballem amb col·leccions. Podem definir una funció que mostre el quadrat d'un número:

```dart
void imprimirCuadrado(int numero) =>
    print('Quadrat de $numero: ${numero * numero}');
```

i passar-la posteriorment a `forEach()`:

```dart
void main() {
  List<int> numeros = [1, 2, 3, 4, 5];

  numeros.forEach(imprimirCuadrado);
}
```

En este cas, `forEach()` executarà la funció `imprimirCuadrado` per a cadascun dels elements de la llista.

:::caution

**Pot una funció fletxa tindre diverses instruccions?**

No. La sintaxi `=>` únicament pot utilitzar-se quan el cos de la funció està format per **una única expressió**.

Per exemple:

```dart
int cuadrado(int numero) => numero * numero;
```

Si necessitem realitzar diverses operacions, haurem d'utilitzar la sintaxi convencional mitjançant un bloc `{ }`:

```dart
int calcular(int numero) {
  int resultado = numero * numero;
  print('El resultat és $resultado');

  return resultado;
}
```

Per tant, no podríem escriure alguna cosa com:

```dart
// ❌ Incorrecte
int calcular(int numero) =>
  int resultado = numero * numero;
  print(resultado);
  return resultado;
```

Després de `=>`, Dart espera **una única expressió**, no una seqüència d'instruccions. Utilitzarem `=>` per a funcions senzilles formades per una única expressió. Quan necessitem executar diverses instruccions, utilitzarem un bloc `{ }`.

:::

### Funcions anònimes

Normalment declarem les nostres funcions assignant-los un **nom** que posteriorment utilitzem per a invocar-les:

```dart
int multiplicar(int a, int b) {
  return a * b;
}
```

No obstant això, Dart també permet crear **funcions sense nom**, conegudes com a **funcions anònimes** o *lambdes*.

Per exemple:

```dart
void main() {
  var multiplicar = (int a, int b) {
    return a * b;
  };

  print(multiplicar(3, 4)); // 12
}
```

En este cas, la funció no té un nom propi, encara que emmagatzemem una referència a ella en la variable `multiplicar`, la qual cosa ens permet invocar-la posteriorment.

#### **Funcions anònimes amb sintaxi fletxa**

Si una funció anònima està formada per una única expressió, també podem utilitzar la sintaxi `=>`:

```dart
void main() {
  var multiplicar = (int a, int b) => a * b;

  print(multiplicar(3, 4)); // 12
}
```

En este cas estem combinant **dos conceptes diferents**: tenim una funció anònima perquè no té nom i, al mateix temps, utilitzem la sintaxi fletxa perquè el seu cos conté una única expressió.

#### Funcions anònimes com a arguments

Una de les aplicacions més habituals de les funcions anònimes consisteix a **proporcionar-les directament com a argument a una altra funció**.

Per exemple, podem recórrer una llista mitjançant `forEach()`:

```dart
void main() {
  List<int> numeros = [1, 2, 3, 4, 5];

  numeros.forEach((numero) {
    print('Quadrat de $numero: ${numero * numero}');
  });
}
```

La funció:

```dart
(numero) {
  print('Quadrat de $numero: ${numero * numero}');
}
```

no té cap nom i es proporciona directament a `forEach()`, que serà l'encarregat d'executar-la per a cada element.

Com únicament conté una expressió, també podem utilitzar la sintaxi fletxa:

```dart
void main() {
  List<int> numeros = [1, 2, 3, 4, 5];

  numeros.forEach(
    (numero) => print('Quadrat de $numero: ${numero * numero}'),
  );
}
```

:::note


#### Funcions anònimes en Flutter

Les funcions anònimes apareixeran **constantment quan treballem amb Flutter**, especialment per a definir *callbacks*: funcions que s'executaran com a resposta a determinats esdeveniments.

Per exemple, per a indicar què ha d'ocórrer quan l'usuari prema un botó trobarem codi similar a:

```dart
onPressed: () {
  print('Botó premut');
}
```

En este cas estem proporcionant una funció anònima sense paràmetres. Flutter serà l'encarregat d'executar-la quan es produïsca l'esdeveniment.

Si únicament necessitem realitzar una operació, podem utilitzar la sintaxi fletxa:

```dart
onPressed: () => print('Botó premut')
```

En canvi, si necessitem realitzar diverses operacions:

```dart
onPressed: () {
  print('Botó premut');
  contador++;
  actualizarDatos();
}
```

haurem d'utilitzar necessàriament un bloc `{ }`.

:::

## Paquets

L'ecosistema Dart utilitza paquets per a administrar programari compartit, com a biblioteques i eines. Per a obtindre paquets de Dart, utilitza l'administrador de paquets [**pub**](https://dart.dev/tools/pub/cmd). Podem trobar paquets disponibles públicament en el lloc [pub.dev](https://pub.dev/), o carregar paquets des del sistema d'arxius local o des d'un altre lloc, com els repositoris Git. Independentment de l'origen dels seus paquets, pub administra les dependències de versions, ajudant-nos a obtindre versions de paquets que funcionen entre si i amb la seua versió de SDK.

Les metadades de paquets que no formen part de l’SDK es defineixen en l'arxiu pubspec.yaml (YAML és l'acrònim per a Yet Another Markup Language). Este arxiu es troba en cada aplicació i conté les dependències i les metadades de l'aplicació, com ara nom, autor, versió i descripció. Este arxiu s'utilitza per a descarregar les llibreries que el programa necessitarà. L'aspecte ha de ser similar al mostrat a continuació:

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

[**pub**](https://dart.dev/tools/pub/cmd) utilitza una sèrie de ordes per a la gestió dels paquets:

* **`pub get`**: Descàrrega les dependències especificades en l'arxiu `pubspec.yaml`.
* **`pub upgrade`**: Actualitza les dependències a les seues versions més recents permeses.
* **`pub outdated`**: Mostra una llista de les dependències que estan desactualitzades.
* **`pub run`**: Executa un paquet o un script especificat en el projecte.

### Importar i exportar mòduls i paquets

En Dart, per a **importar mòduls** i altres classes des de diferents biblioteques o arxius, s'utilitzen les paraules clau `import` i `export`.&#x20;

* **Importar biblioteques o paquets.** Per a importar una biblioteca externa o un arxiu dins del teu projecte:

```dart
import 'dart:math';  // Importa una biblioteca de Dart
import 'package:http/http.dart';  // Importa un paquet de pub.dev
import 'src/my_file.dart';  // Importa un arxiu local dins del projecte
```

* **Importar només parts d'un mòdul.** També podem especificar quines classes o funcions importar d'un mòdul:

```dart
import 'dart:math' show pi, sqrt;
```

* **Exportar un mòdul.** Per a fer disponible una classe o funció per a altres arxius:

```dart
export 'src/my_utils.dart';
```

Vegem un exemple senzill:

#### Si disposem d'un arxiu `math_utils.dart` en la carpeta utils (mòdul a importar):

```dart
// utils/math_utils.dart
int sumar(int a, int b) {
  return a + b;
}
```

#### Arxiu `main.dart` (classe que importa el mòdul des del directori utils):

```dart
// main.dart
import 'utils/math_utils.dart';

class Calculadora {
  void realizarSuma(int x, int y) {
    int resultado = sumar(x, y);  // Usem el mètode importat de math_utils.dart
    print('El resultat de la suma és: $resultado');
  }
}

void main() {
  Calculadora calc = Calculadora();
  calc.realizarSuma(3, 5);
}
```

En este exemple, l'arxiu `math_utils.dart` defineix una funció `sumar`. En l'arxiu `main.dart`, eixa funció s'importa i s'usa dins de la classe `Calculadora`.
