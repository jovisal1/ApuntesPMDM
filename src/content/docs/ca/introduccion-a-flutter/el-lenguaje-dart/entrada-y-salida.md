---
title: "Entrada i eixida"
sidebar:
  label: "Entrada i eixida"
  order: 4
---

Quan desenvolupem un programa, habitualment necessitem **mostrar informació a l'usuari i obtindre dades introduïdes per l’usuari**. En aplicacions de consola, estes operacions es realitzen mitjançant els mecanismes d'entrada i eixida estàndard.

#### Mostrar informació: `print()`

La forma més senzilla i habitual de mostrar informació per consola en Dart és mitjançant la funció `print()`:

```dart
void main() {
  print('Hola, soc Dart!');
  print('Estem aprenent Flutter');
}
```

Obtindrem:

```
Hola, soc Dart!
Estem aprenent Flutter
```

La funció `print()` mostra el valor que li proporcionem i **afig automàticament un salt de línia al final**.

A més de cadenes de text, podem utilitzar-la per a mostrar variables, expressions o altres tipus de dades:

```dart
void main() {
  String nombre = 'Ana';
  int edad = 20;

  print(nombre);
  print(edad);
  print('Hola, $nombre');
  print('L\'any que ve tindràs ${edad + 1} anys');
}
```

En la majoria dels nostres exemples utilitzarem `print()` per la seua senzillesa.

#### Entrada i eixida mitjançant `dart:io`

Quan necessitem un major control sobre l'entrada i eixida per consola, Dart proporciona la biblioteca `dart:io`:

```dart
import 'dart:io';
```

Esta biblioteca ens proporciona, entre altres, els següents elements:

* `stdin`: representa l’**entrada estàndard** i permet llegir dades introduïdes per l'usuari.
* `stdout`: representa l’**eixida estàndard** i permet escriure informació en la consola.
* `stderr`: representa l’**eixida d'errors** i permet mostrar missatges d'error.

Per a escriure mitjançant l'eixida estàndard podem utilitzar `stdout.write()`:

```dart
stdout.write('Com et dius? ');
```

A diferència de `print()`, `stdout.write()` **no afig automàticament un salt de línia**. Això resulta especialment útil quan volem que l'usuari introduïsca un valor just a continuació del missatge.

#### Llegir dades des del teclat

Per a llegir una línia introduïda per l'usuari utilitzarem `stdin.readLineSync()`:

```dart
import 'dart:io';

void main() {
  stdout.write('Com et dius? ');

  String? nombre = stdin.readLineSync();

  print('Hola, $nombre!');
}
```

Una possible execució seria:

```
Com et dius? Juan
Hola, Juan!
```

Observa que `readLineSync()` retorna un `String?`. El símbol `?` indica que el resultat **pot ser `null`**, concepte relacionat amb el sistema de **Null Safety** de Dart que estudiarem més endavant.

#### Llegir valors numèrics

Els valors obtinguts mitjançant `stdin.readLineSync()` són cadenes de text. Si necessitem treballar amb números, haurem de **convertir el valor llegit al tipus corresponent**.

Per a llegir un enter podem utilitzar `int.parse()`:

```dart
import 'dart:io';

void main() {
  stdout.write('Introdueix la teua edat: ');

  int edad = int.parse(stdin.readLineSync()!);

  print('Tens $edad anys');
}
```

Per a un nombre decimal utilitzaríem `double.parse()`:

```dart
double precio = double.parse(stdin.readLineSync()!);
```

En estos exemples apareix també l'operador `!`:

```dart
stdin.readLineSync()!
```

Amb ell indiquem a Dart que **estem segurs que el valor obtingut no serà `null`**. Igual que ocorre amb ?, quan estudiem Null Safety, veurem amb detall què significa este operador i com podem evitar possibles errors.
