---
title: "Gestión de errores"
sidebar:
  label: "Gestión de errores"
  order: 11
---

Durante la ejecución de un programa pueden producirse situaciones inesperadas: datos introducidos con un formato incorrecto, acceso a posiciones inexistentes de una lista, divisiones no válidas o errores al convertir tipos.

Dart permite gestionar estas situaciones mediante **excepciones**, evitando que el programa finalice de forma abrupta y permitiéndonos decidir cómo actuar cuando se produce un error.

### `try` y `catch`

El bloque `try` contiene el código que puede producir una excepción. Si ocurre un error, la ejecución pasa al bloque `catch`.

```dart
void main() {
  try {
    int numero = int.parse('abc');
    print(numero);
  } catch (e) {
    print('Se ha producido un error: $e');
  }
}
```

En este caso, `int.parse()` no puede convertir `'abc'` a un entero, por lo que se lanza una excepción y se ejecuta el bloque `catch`.

La variable `e` contiene información sobre el error producido.

### Capturar tipos de excepción concretos

También podemos controlar únicamente determinados tipos de excepciones mediante `on`.

```dart
void main() {
  try {
    int numero = int.parse('abc');
    print(numero);
  } on FormatException {
    print('El valor introducido no tiene un formato numérico válido.');
  }
}
```

Esto resulta útil cuando queremos ofrecer un tratamiento específico para un error concreto.

Podemos combinar `on` y `catch`:

```dart
void main() {
  try {
    int numero = int.parse('abc');
    print(numero);
  } on FormatException catch (e) {
    print('Error de formato: $e');
  }
}
```

### El bloque `finally`

El bloque `finally` contiene código que se ejecutará **siempre**, independientemente de que se produzca o no una excepción.

```dart
void main() {
  try {
    int numero = int.parse('25');
    print(numero);
  } catch (e) {
    print('Se ha producido un error.');
  } finally {
    print('Fin de la operación.');
  }
}
```

`finally` suele utilizarse para realizar tareas de limpieza, como cerrar archivos, liberar recursos o finalizar conexiones.

### Lanzar excepciones con `throw`

También podemos generar nuestras propias excepciones mediante `throw` cuando detectamos una situación que consideramos incorrecta.

```dart
void comprobarEdad(int edad) {
  if (edad < 0) {
    throw ArgumentError('La edad no puede ser negativa.');
  }

  print('Edad válida: $edad');
}
```

Podemos capturar posteriormente esa excepción:

```dart
void main() {
  try {
    comprobarEdad(-5);
  } catch (e) {
    print('Error: $e');
  }
}
```

### Mini Task Manager: rechazar tareas sin título

Una tarea con el título vacío no resulta útil. En la clase `Tarea` del apartado anterior, sustituimos el constructor por esta versión, manteniendo sus atributos y métodos:

```dart
Tarea({
  required this.titulo,
  required this.fechaLimite,
  bool completada = false,
}) : _completada = completada {
  if (titulo.trim().isEmpty) {
    throw ArgumentError('El título no puede estar vacío');
  }
}
```

Primero sustituye el `main()` por este código y ejecútalo para observar la excepción sin capturar:

```dart
void main() {
  final tarea = Tarea(
    titulo: '',
    fechaLimite: DateTime.now(),
  );
  print(tarea.descripcion);
}
```

La construcción falla, por lo que no se alcanza el `print`. Después reemplaza ese `main()` por una versión que gestione el error:

```dart
void main() {
  try {
    final tarea = Tarea(
      titulo: '',
      fechaLimite: DateTime.now(),
    );
    print(tarea.descripcion);
  } on ArgumentError catch (e) {
    print('Datos incorrectos: $e');
  } catch (e) {
    print('Error inesperado: $e');
  } finally {
    print('Fin de la operación');
  }
}
```

Antes de ejecutar, predice qué mensajes aparecerán y si se ejecutará `finally`. Prueba después con un título válido y con uno formado solo por espacios. `trim()` hace que este último también se rechace. La validación se aplica igualmente a las tareas urgentes, porque su constructor llama al de `Tarea`.

### Excepciones personalizadas

En aplicaciones más complejas podemos crear nuestros propios tipos de excepción implementando `Exception`.

```dart
class EdadNoValidaException implements Exception {
  final String mensaje;

  EdadNoValidaException(this.mensaje);

  @override
  String toString() => mensaje;
}
```

Y utilizarla de esta forma:

```dart
void comprobarEdad(int edad) {
  if (edad < 0) {
    throw EdadNoValidaException('La edad no puede ser negativa.');
  }
}
```

Esto nos permite representar errores específicos de nuestra aplicación de forma más clara.

### `tryParse()` como alternativa

No todos los errores requieren necesariamente utilizar excepciones. Para ciertas operaciones, Dart proporciona métodos que permiten gestionar el fallo de una forma más sencilla.

Por ejemplo:

```dart
int? numero = int.tryParse('abc');
```

En lugar de lanzar una excepción, `tryParse()` devuelve `null` si la conversión no puede realizarse.

Podemos comprobarlo:

```dart
void main() {
  String entrada = 'abc';

  int? numero = int.tryParse(entrada);

  if (numero != null) {
    print('Número válido: $numero');
  } else {
    print('El valor introducido no es válido.');
  }
}
```

Cuando existe una alternativa como `tryParse()`, suele ser preferible utilizarla para situaciones que forman parte del funcionamiento normal del programa.

### Resumen

| Elemento    | Función                                             |
| ----------- | --------------------------------------------------- |
| `try`       | Contiene el código que puede producir una excepción |
| `catch`     | Captura y gestiona una excepción                    |
| `on`        | Permite capturar un tipo concreto de excepción      |
| `finally`   | Ejecuta código independientemente de que haya error |
| `throw`     | Lanza una excepción                                 |
| `Exception` | Permite crear excepciones personalizadas            |
