---
title: "Gestió d’errors"
sidebar:
  label: "Gestió d’errors"
  order: 11
---

Durant l'execució d'un programa poden produir-se situacions inesperades: dades introduïdes amb un format incorrecte, accés a posicions inexistents d'una llista, divisions no vàlides o errors en convertir tipus.

Dart permet gestionar estes situacions mitjançant **excepcions**, evitant que el programa finalitze de manera abrupta i permetent-nos decidir com actuar quan es produeix un error.

### `try` i `catch`

El bloc `try` conté el codi que pot produir una excepció. Si ocorre un error, l'execució passa al bloc `catch`.

```dart
void main() {
  try {
    int numero = int.parse('abc');
    print(numero);
  } catch (e) {
    print('S\'ha produït un error: $e');
  }
}
```

En este cas, `int.parse()` no pot convertir `'abc'` a un enter, per la qual cosa es llança una excepció i s'executa el bloc `catch`.

La variable `e` conté informació sobre l'error produït.

### Capturar tipus d'excepció concrets

També podem controlar únicament determinats tipus d'excepcions mitjançant `on`.

```dart
void main() {
  try {
    int numero = int.parse('abc');
    print(numero);
  } on FormatException {
    print('El valor introduït no té un format numèric vàlid.');
  }
}
```

Això resulta útil quan volem oferir un tractament específic per a un error concret.

Podem combinar `on` i `catch`:

```dart
void main() {
  try {
    int numero = int.parse('abc');
    print(numero);
  } on FormatException catch (e) {
    print('Error de format: $e');
  }
}
```

### El bloc `finally`

El bloc `finally` conté codi que s'executarà **sempre**, independentment que es produïsca o no una excepció.

```dart
void main() {
  try {
    int numero = int.parse('25');
    print(numero);
  } catch (e) {
    print('S\'ha produït un error.');
  } finally {
    print('Fi de l\'operació.');
  }
}
```

`finally` sol utilitzar-se per a fer tasques de neteja, com tancar arxius, alliberar recursos o finalitzar connexions.

### Llançar excepcions amb `throw`

També podem generar les nostres pròpies excepcions mitjançant `throw` quan detectem una situació que considerem incorrecta.

```dart
void comprobarEdad(int edad) {
  if (edad < 0) {
    throw ArgumentError('L\'edat no pot ser negativa.');
  }

  print('Edat vàlida: $edad');
}
```

Podem capturar posteriorment eixa excepció:

```dart
void main() {
  try {
    comprobarEdad(-5);
  } catch (e) {
    print('Error: $e');
  }
}
```

### Mini Task Manager: rebutjar tasques sense títol

Una tasca amb el títol buit no resulta útil. En la classe `Tarea` de l'apartat anterior, substituïm el constructor per esta versió, mantenint els seus atributs i mètodes:

```dart
Tarea({
  required this.titulo,
  required this.fechaLimite,
  bool completada = false,
}) : _completada = completada {
  if (titulo.trim().isEmpty) {
    throw ArgumentError('El títol no pot estar buit');
  }
}
```

Primer substitueix el `main()` per este codi i executa'l per a observar l'excepció sense capturar:

```dart
void main() {
  final tarea = Tarea(
    titulo: '',
    fechaLimite: DateTime.now(),
  );
  print(tarea.descripcion);
}
```

La construcció falla, per la qual cosa no s’arriba a executar el `print`. Després reemplaça eixe `main()` per una versió que gestione l'error:

```dart
void main() {
  try {
    final tarea = Tarea(
      titulo: '',
      fechaLimite: DateTime.now(),
    );
    print(tarea.descripcion);
  } on ArgumentError catch (e) {
    print('Dades incorrectes: $e');
  } catch (e) {
    print('Error inesperat: $e');
  } finally {
    print('Fi de l\'operació');
  }
}
```

Abans d'executar, prediu quins missatges apareixeran i si s'executarà `finally`. Prova després amb un títol vàlid i amb un títol format només per espais. `trim()` fa que este últim també es rebutge. La validació s'aplica igualment a les tasques urgents, perquè el seu constructor crida al de `Tarea`.

### Excepcions personalitzades

En aplicacions més complexes podem crear els nostres propis tipus d'excepció implementant `Exception`.

```dart
class EdadNoValidaException implements Exception {
  final String mensaje;

  EdadNoValidaException(this.mensaje);

  @override
  String toString() => mensaje;
}
```

I utilitzar-la d'esta forma:

```dart
void comprobarEdad(int edad) {
  if (edad < 0) {
    throw EdadNoValidaException('L\'edat no pot ser negativa.');
  }
}
```

Això ens permet representar errors específics de la nostra aplicació de forma més clara.

### `tryParse()` com a alternativa

No tots els errors requereixen necessàriament utilitzar excepcions. Per a certes operacions, Dart proporciona mètodes que permeten gestionar la fallada d'una forma més senzilla.

Per exemple:

```dart
int? numero = int.tryParse('abc');
```

En lloc de llançar una excepció, `tryParse()` retorna `null` si la conversió no pot realitzar-se.

Podem comprovar-ho:

```dart
void main() {
  String entrada = 'abc';

  int? numero = int.tryParse(entrada);

  if (numero != null) {
    print('Número vàlid: $numero');
  } else {
    print('El valor introduït no és vàlid.');
  }
}
```

Quan existeix una alternativa com `tryParse()`, sol ser preferible utilitzar-la per a situacions que formen part del funcionament normal del programa.

### Resum

| Element    | Funció                                             |
| ----------- | --------------------------------------------------- |
| `try`       | Conté el codi que pot produir una excepció |
| `catch`     | Captura i gestiona una excepció                    |
| `on`        | Permet capturar un tipus concret d'excepció      |
| `finally`   | Executa codi independentment que hi haja error |
| `throw`     | Llança una excepció                                 |
| `Exception` | Permet crear excepcions personalitzades            |
