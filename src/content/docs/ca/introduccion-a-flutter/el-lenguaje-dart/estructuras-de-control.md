---
title: "Estructures de control"
sidebar:
  label: "Estructures de control"
  order: 6
---

Com sol ocórrer en qualsevol altre llenguatge de programació, les estructures de control són el conjunt de regles que permeten controlar el flux d'execució de les instruccions d'un algorisme o d'un programa. En Dart disposem de les següents:

## Estructures condicionals

Les estructures condicionals permeten **controlar el flux d'execució d'un programa** en funció de si es compleix o no una determinada condició.

### `if`, `else if` i `else`

En Dart utilitzem `if` per a avaluar una primera condició, `else if` per a comprovar condicions addicionals i `else` per a executar un bloc de codi quan cap de les condicions anteriors es compleix.

La seua estructura general és:

```dart
if (condicion) {
  // S'executa si la condició és vertadera
} else if (otraCondicion) {
  // S'executa si la segona condició és vertadera
} else {
  // S'executa si cap condició anterior és vertadera
}
```

Les condicions han de ser expressions el resultat de les quals siga un valor de tipus `bool`, és a dir, `true` o `false`.

Per exemple:

```dart
int edad = 20;

if (edad >= 18) {
  print('Eres major d\'edat');
} else {
  print('Eres menor d\'edat');
}
```

En este cas, l'expressió `edad >= 18` retorna un valor booleà. Si és `true`, s'executarà el primer bloc; en cas contrari, s'executarà el bloc associat a `else`.

**Exemple: comprovar si un número és positiu o negatiu**

El següent programa rep un número com a **argument des de la línia de ordes** i utilitza diferents condicions per a determinar si és positiu, negatiu o igual a zero.

Abans d'accedir a l'argument, comprovem que l'usuari haja proporcionat algun valor:

```dart
void main(List<String> args) {
  if (args.isEmpty) {
    print('Per favor, proporciona un número com a argument.');
  } else {
    int numero = int.parse(args[0]);

    if (numero > 0) {
      print('$numero és positiu');
    } else if (numero < 0) {
      print('$numero és negatiu');
    } else {
      print('El número és zero');
    }
  }
}
```

Podem executar-lo proporcionant el número a continuació del nom de l'arxiu:

```
dart programa.dart 10
```

En este cas obtindrem:

```
10 és positiu
```

Si executem:

```
dart programa.dart -5
```

obtindrem:

```
-5 és negatiu
```

Observa que en l'exemple apareixen **dues estructures condicionals**. La primera comprova mitjançant `args.isEmpty` si s'ha proporcionat algun argument. La segona avalua el número rebut i determina quin dels tres blocs ha d'executar-se.

### **`switch`**

L'estructura `switch` permet **seleccionar quin codi executar en funció del valor d'una expressió**. Resulta especialment útil quan volem comparar una mateixa variable amb diferents valors possibles, evitant encadenar múltiples blocs `else if`.

Per exemple, podríem determinar el nom d'un dia de la setmana a partir del seu número:

```dart
void main() {
  int dia = 3;
  switch (dia) {
    case 1:
      print('Dilluns');
      break;
    case 2:
      print('Dimarts');
      break;
    case 3:
      print('Dimecres');
      break;
    case 4:
      print('Dijous');
      break;
    case 5:
      print('Divendres');
      break;
    case 6:
      print('Dissabte');
      break;
    case 7:
      print('Diumenge');
      break;
    default:
      print('Dia no vàlid');
  }
}
```

En este cas, `switch` avalua el valor de `dia` i el compara amb cadascun dels casos definits mitjançant `case`. Com `dia` conté el valor `3`, s'executarà:

```
Dimecres
```

El bloc `default` és opcional i permet indicar què ha d'ocórrer quan **cap dels casos anteriors coincideix** amb el valor avaluat.

Esta estructura resulta especialment apropiada quan tenim un conjunt concret de valors possibles. El codi anterior podria implementar-se utilitzant `if` i `else if`, però seria menys llegible:

```dart
if (dia == 1) {
  print('Dilluns');
} else if (dia == 2) {
  print('Dimarts');
} else if (dia == 3) {
  print('Dimecres');
} else {
  // ...
}
```

#### Expressions `switch`

Dart també permet utilitzar `switch` com una **expressió**. Esta sintaxi resulta especialment còmoda quan volem **obtindre un valor depenent de diferents alternatives**.

L'exemple anterior podria escriure's d'una forma molt més compacta:

```dart
void main() {
  int dia = 3;

  String nombreDia = switch (dia) {
    1 => 'Dilluns',
    2 => 'Dimarts',
    3 => 'Dimecres',
    4 => 'Dijous',
    5 => 'Divendres',
    6 => 'Dissabte',
    7 => 'Diumenge',
    _ => 'Dia no vàlid',
  };

  print(nombreDia);
}
```

En una expressió `switch`:

* Cada possible valor se situa a l'esquerra de `=>`.
* A la dreta indiquem el **valor que produirà l'expressió** quan existisca una coincidència.
* No utilitzem les paraules `case` ni `break`.
* El patró `_` funciona com a **comodí (*****wildcard*****)** i coincideix amb qualsevol valor que no haja sigut tractat anteriorment.
* El resultat complet del `switch` pot **assignar-se directament a una variable**.

Per exemple:

```dart
String resultado = switch (nota) {
  10 => 'Matrícula',
  9 => 'Excel·lent',
  7 || 8 => 'Notable',
  6 => 'Bé',
  5 => 'Aprovat',
  _ => 'Suspés',
};
```

#### `switch` amb patrons

Les versions modernes de Dart incorporen **Pattern Matching**, la qual cosa fa que `switch` siga bastant més potent que una simple comparació de valors.

Per exemple, podem utilitzar condicions mitjançant patrons relacionals:

```dart
String resultado = switch (nota) {
  >= 9 => 'Excel·lent',
  >= 7 => 'Notable',
  >= 6 => 'Bé',
  >= 5 => 'Aprovat',
  _ => 'Suspés',
};
```

Els casos s'avaluen en ordre. Per exemple, una nota de `8` no compleix `>= 9`, però sí `>= 7`, per la qual cosa el resultat serà:

```
Notable
```

També podem combinar condicions:

```dart
String temperatura = switch (grados) {
  < 0 => 'Sota zero',
  >= 0 && < 15 => 'Frío',
  >= 15 && < 25 => 'Agradable',
  >= 25 => 'Calor',
  _ => 'Valor no vàlid',
};
```

Esta capacitat forma part del sistema de **patrons (*****patterns*****) de Dart**, que permet realitzar comprovacions i desestructurar dades de formes molt més avançades.

:::note

Per a situacions senzilles utilitzarem `if` quan necessitem avaluar **condicions diferents**, mentre que `switch` resulta especialment apropiat quan volem analitzar **diferents possibilitats d'una mateixa expressió**. Les expressions `switch` són especialment còmodes quan l'objectiu és obtindre un valor a partir d'eixes alternatives.

:::

### Operador ternari

A vegades necessitem utilitzar una estructura `if-else` únicament per a **triar entre dos valors en funció d'una condició**. Per a estos casos, Dart proporciona l’**operador condicional**, conegut habitualment com a **operador ternari**.

La seua sintaxi és:

```dart
condicion ? expresionSiTrue : expresionSiFalse
```

La condició s'avalua i, depenent del seu resultat:

* si és `true`, s'utilitza el valor de `expresionSiTrue`;
* si és `false`, s'utilitza el valor de `expresionSiFalse`.

Per exemple, podem determinar si una nota està aprovada mitjançant:

```dart
void main() {  int nota = 7;
  String calificacion = nota >= 5 ? 'Aprovat' : 'Suspendido';
  print(calificacion); // Aprovat}
```

Esta expressió:

```dart
String calificacion = nota >= 5 ? 'Aprovat' : 'Suspendido';
```

és una forma més compacta d'escriure:

```dart
String calificacion;
if (nota >= 5) {  
    calificacion = 'Aprovat';
} else {  
    calificacion = 'Suspendido';
}
```

Com l'operador ternari **produeix un valor**, també podem utilitzar-lo directament com a part d'altres expressions:

```dart
int edad = 17;
print('L\'usuari és ${edad >= 18 ? 'mayor' : 'menor'} d\'edat');
```

El resultat serà:

```
L'usuari és menor d'edat
```

:::note

**Quan utilitzar-lo?**

L'operador ternari resulta especialment útil per a **condicions senzilles amb dos possibles resultats**. Si necessitem avaluar diverses condicions o realitzar operacions més complexes, generalment serà més llegible utilitzar `if-else` o una expressió `switch`.

:::

Este operador apareixerà amb bastant freqüència quan treballem amb **Flutter**, especialment per a decidir de manera senzilla quin valor o quin widget utilitzar depenent de l'estat de la nostra aplicació.

## Estructures de repetició

Les **estructures de repetició**, també conegudes com a **bucles**, permeten executar un bloc de codi diverses vegades. Depenent de la situació, podem repetir-ho un nombre determinat de vegades, mentre es complisca una condició o recórrer directament els elements d'una col·lecció.

Dart proporciona diferents estructures de repetició: `for`, `while`, `do-while` i `for-in`.

### `for`

El bucle `for` resulta especialment útil quan **coneixem per endavant el nombre de vegades que volem repetir un bloc de codi**.

La seua estructura general és:

```dart
for (inicializacion; condicion; actualizacion) {
  // Codi que volem repetir
}
```

Per exemple, podem mostrar els números del `0` al `10`:

```dart
void main() {
  for (int i = 0; i <= 10; i++) {
    print(i);
  }
}
```

En un `for` podem distingir tres parts:

* `int i = 0`: inicialitza la variable que utilitzarem com a comptador.
* `i <= 10`: estableix la condició que ha de complir-se per a continuar executant el bucle.
* `i++`: actualitza el comptador després de cada iteració.

Podem combinar-lo amb altres estructures de control:

```dart
void main() {
  for (int i = 0; i <= 10; i++) {
    if (i < 5) {
      print('$i és menor que 5');
    } else {
      print('$i no és menor que 5');
    }
  }
}
```

### `while`

El bucle `while` executa repetidament un bloc de codi **mentre una determinada condició siga vertadera**.

La seua sintaxi és:

```dart
while (condicion) {
  // Codi que volem repetir
}
```

Per exemple, podem implementar una lògica similar a l'exemple anterior:

```dart
void main() {
  int i = 0;

  while (i <= 10) {
    if (i < 5) {
      print('$i és menor que 5');
    } else {
      print('$i no és menor que 5');
    }

    i++;
  }
}
```

A diferència del `for`, la inicialització i actualització del comptador no formen part de la pròpia estructura del bucle.

`while` resulta especialment apropiat quan **no sabem exactament quantes iteracions seran necessàries**, però sí que coneixem la condició que ha de mantindre's per a continuar.

:::caution

La condició es comprova **abans de cada iteració**. Per tant, si inicialment és `false`, el contingut del `while` no arribarà a executar-se cap vegada.

:::

### `do-while`

El bucle `do-while` funciona de manera similar a `while`, però presenta una diferència important: **la condició s'avalua després d'executar el bloc de codi**.

La seua estructura és:

```dart
do {
  // Codi que volem repetir
} while (condicion);
```

Per exemple:

```dart
void main() {
  int i = 0;

  do {
    if (i < 5) {
      print('$i és menor que 5');
    } else {
      print('$i no és menor que 5');
    }

    i++;
  } while (i <= 10);
}
```

Com la condició es comprova al final, el bloc de codi s'executarà **almenys una vegada**, encara que inicialment la condició siga falsa.

Podem observar-ho fàcilment:

```dart
void main() {
  int numero = 20;

  do {
    print(numero);
  } while (numero < 10);
}
```

Encara que `numero < 10` és `false`, el programa mostrarà:

```
20
```

perquè la comprovació es realitza després de la primera execució.

### `for-in`

Quan volem **recórrer els elements d'una col·lecció**, Dart proporciona una sintaxi més senzilla mitjançant `for-in`.

La seua estructura és:

```dart
for (var elemento in coleccion) {
  // Utilitzem element
}
```

Per exemple:

```dart
void main() {
  List<String> laborables = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
  ];

  for (String dia in laborables) {
    print(dia);
  }
}
```

En cada iteració, la variable `dia` conté un dels elements de la llista. D'esta forma podem recórrer la col·lecció **sense necessitat de gestionar manualment un índex**.

També podem utilitzar inferència de tipus:

```dart
for (var dia in laborables) {
  print(dia);
}
```

Dart deduirà que `dia` és de tipus `String` a partir de la mena dels elements emmagatzemats en la llista.

#### Quina estructura hem d'utilitzar?

L'elecció dependrà principalment de la mena de repetició que necessitem:

| Estructura | Ús habitual                                                                            |
| ---------- | --------------------------------------------------------------------------------------- |
| `for`      | Quan coneixem el nombre d'iteracions o necessitem treballar amb un comptador.       |
| `while`    | Quan volem repetir mentre es complisca una condició.                               |
| `do-while` | Quan necessitem executar el codi almenys una vegada abans de comprovar la condició. |
| `for-in`   | Quan volem recórrer directament els elements d'una col·lecció.                   |
