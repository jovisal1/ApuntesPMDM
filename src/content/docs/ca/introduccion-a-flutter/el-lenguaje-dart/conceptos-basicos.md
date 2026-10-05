---
title: "Conceptes bàsics"
sidebar:
  label: "Conceptes bàsics"
  order: 3
---

Abans d'endinsar-nos en aspectes més concrets del llenguatge Dart, és necessari tindre en compte els següents detalls:

## [Mètode main](https://dart.dev/language/functions#the-main-function)

En Dart, la funció `main()` constitueix el **punt d'entrada d'un programa**. Això significa que, quan executem un arxiu Dart, l'execució comença per les instruccions que es troben dins d'esta funció.

La seua forma més senzilla és:

```dart
void main() {
  // Codi del programa
}
```

La paraula `void` indica que la funció **no retorna cap valor**. Encara que Dart permet ometre el tipus de retorn en este cas, és recomanable indicar-lo explícitament per a millorar la llegibilitat del codi.

#### Arguments d'entrada

La funció `main()` també pot rebre **arguments des de la línia de ordes**. Per a això, podem definir un paràmetre de tipus `List<String>`:

```dart
void main(List<String> args) {
  print(args);
}
```

Els arguments es proporcionen en executar el programa, escrivint-los a continuació del nom de l'arxiu:

```bash
dart programa.dart param1 param2
```

Dart emmagatzemarà estos valors, en el mateix ordre, dins de la llista `args`:

```
args[0] → "param1"
args[1] → "param2"
```

Per exemple:

```dart
void main(List<String> args) {
  print('Primer argument: ${args[0]}');
  print('Segon argument: ${args[1]}');
}
```

Si executem:

```bash
dart programa.dart Flutter Dart
```

obtindrem:

```
Primer argument: Flutter
Segon argument: Dart
```

:::caution

Abans d'accedir a una posició concreta de `args`, hem d'assegurar-nos que l'argument existeix. En cas contrari, intentarem accedir a una posició inexistent de la llista i es produirà un error durant l'execució.

:::

## [Comentaris](https://dart.dev/language/comments)

Dart admet tres tipus de comentaris:

1. **Comentaris d'una sola línia**: S'usen amb `//` i es col·loquen en qualsevol línia per a explicar una porció de codi.

   ```dart
   // Això és un comentari d'una sola línia
   var x = 5;
   ```
2. **Comentaris de diverses línies**: Es tanquen entre `/* */` i s'usen per a explicar blocs de codi més llargs.

   ```dart
   /* 
   Este és un comentari
   de diverses línies
   */
   var y = 10;
   ```
3. **Comentaris de documentació**: S'utilitzen per a documentar funcions, classes o variables, i s'indiquen amb `///`.

   ```dart
   /// Esta funció imprimeix una salutació
   void saludo() {
     print('Hola');
   }
   ```

## Blocs de codi i instruccions

Un bloc de codi en Dart es defineix amb claus `{ }`, i agrupa diverses instruccions que s'executen juntes. Els blocs de codi s'utilitzen en funcions, bucles, condicionals, etc.

```dart
void main() {
  // Este és un bloc de codi
  if (true) {
    print('Això està dins d\'un bloc de codi');
  }
}
```

:::note

**Importantíssim!!!**. Tota instrucció en Dart ha d'acabar en `;`

:::
