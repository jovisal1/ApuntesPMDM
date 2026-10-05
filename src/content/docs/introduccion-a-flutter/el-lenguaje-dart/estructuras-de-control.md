---
title: "Estructuras de control"
sidebar:
  label: "Estructuras de control"
  order: 6
---

Como suele ocurrir en cualquier otro lenguaje de programación, las estructuras de control son el conjunto de reglas que permiten controlar el flujo de ejecución de las instrucciones de un algoritmo o de un programa. En Dart disponemos de las siguientes:

## Estructuras condicionales

Las estructuras condicionales permiten **controlar el flujo de ejecución de un programa** en función de si se cumple o no una determinada condición.

### `if`, `else if` y `else`

En Dart utilizamos `if` para evaluar una primera condición, `else if` para comprobar condiciones adicionales y `else` para ejecutar un bloque de código cuando ninguna de las condiciones anteriores se cumple.

Su estructura general es:

```dart
if (condicion) {
  // Se ejecuta si la condición es verdadera
} else if (otraCondicion) {
  // Se ejecuta si la segunda condición es verdadera
} else {
  // Se ejecuta si ninguna condición anterior es verdadera
}
```

Las condiciones deben ser expresiones cuyo resultado sea un valor de tipo `bool`, es decir, `true` o `false`.

Por ejemplo:

```dart
int edad = 20;

if (edad >= 18) {
  print('Eres mayor de edad');
} else {
  print('Eres menor de edad');
}
```

En este caso, la expresión `edad >= 18` devuelve un valor booleano. Si es `true`, se ejecutará el primer bloque; en caso contrario, se ejecutará el bloque asociado a `else`.

**Ejemplo: comprobar si un número es positivo o negativo**

El siguiente programa recibe un número como **argumento desde la línea de comandos** y utiliza diferentes condiciones para determinar si es positivo, negativo o igual a cero.

Antes de acceder al argumento, comprobamos que el usuario haya proporcionado algún valor:

```dart
void main(List<String> args) {
  if (args.isEmpty) {
    print('Por favor, proporciona un número como argumento.');
  } else {
    int numero = int.parse(args[0]);

    if (numero > 0) {
      print('$numero es positivo');
    } else if (numero < 0) {
      print('$numero es negativo');
    } else {
      print('El número es cero');
    }
  }
}
```

Podemos ejecutarlo proporcionando el número a continuación del nombre del archivo:

```
dart programa.dart 10
```

En este caso obtendremos:

```
10 es positivo
```

Si ejecutamos:

```
dart programa.dart -5
```

obtendremos:

```
-5 es negativo
```

Observa que en el ejemplo aparecen **dos estructuras condicionales**. La primera comprueba mediante `args.isEmpty` si se ha proporcionado algún argumento. La segunda evalúa el número recibido y determina cuál de los tres bloques debe ejecutarse.

### **`switch`**

La estructura `switch` permite **seleccionar qué código ejecutar en función del valor de una expresión**. Resulta especialmente útil cuando queremos comparar una misma variable con diferentes valores posibles, evitando encadenar múltiples bloques `else if`.

Por ejemplo, podríamos determinar el nombre de un día de la semana a partir de su número:

```dart
void main() {
  int dia = 3;
  switch (dia) {
    case 1:
      print('Lunes');
      break;
    case 2:
      print('Martes');
      break;
    case 3:
      print('Miércoles');
      break;
    case 4:
      print('Jueves');
      break;
    case 5:
      print('Viernes');
      break;
    case 6:
      print('Sábado');
      break;
    case 7:
      print('Domingo');
      break;
    default:
      print('Día no válido');
  }
}
```

En este caso, `switch` evalúa el valor de `dia` y lo compara con cada uno de los casos definidos mediante `case`. Como `dia` contiene el valor `3`, se ejecutará:

```
Miércoles
```

El bloque `default` es opcional y permite indicar qué debe ocurrir cuando **ninguno de los casos anteriores coincide** con el valor evaluado.

Esta estructura resulta especialmente apropiada cuando tenemos un conjunto concreto de valores posibles. El código anterior podría implementarse utilizando `if` y `else if`, pero sería menos legible:

```dart
if (dia == 1) {
  print('Lunes');
} else if (dia == 2) {
  print('Martes');
} else if (dia == 3) {
  print('Miércoles');
} else {
  // ...
}
```

#### Expresiones `switch`

Dart también permite utilizar `switch` como una **expresión**. Esta sintaxis resulta especialmente cómoda cuando queremos **obtener un valor dependiendo de diferentes alternativas**.

El ejemplo anterior podría escribirse de una forma mucho más compacta:

```dart
void main() {
  int dia = 3;

  String nombreDia = switch (dia) {
    1 => 'Lunes',
    2 => 'Martes',
    3 => 'Miércoles',
    4 => 'Jueves',
    5 => 'Viernes',
    6 => 'Sábado',
    7 => 'Domingo',
    _ => 'Día no válido',
  };

  print(nombreDia);
}
```

En una expresión `switch`:

* Cada posible valor se sitúa a la izquierda de `=>`.
* A la derecha indicamos el **valor que producirá la expresión** cuando exista una coincidencia.
* No utilizamos las palabras `case` ni `break`.
* El patrón `_` funciona como **comodín (*****wildcard*****)** y coincide con cualquier valor que no haya sido tratado anteriormente.
* El resultado completo del `switch` puede **asignarse directamente a una variable**.

Por ejemplo:

```dart
String resultado = switch (nota) {
  10 => 'Matrícula',
  9 => 'Sobresaliente',
  7 || 8 => 'Notable',
  6 => 'Bien',
  5 => 'Aprobado',
  _ => 'Suspenso',
};
```

#### `switch` con patrones

Las versiones modernas de Dart incorporan **Pattern Matching**, lo que hace que `switch` sea bastante más potente que una simple comparación de valores.

Por ejemplo, podemos utilizar condiciones mediante patrones relacionales:

```dart
String resultado = switch (nota) {
  >= 9 => 'Sobresaliente',
  >= 7 => 'Notable',
  >= 6 => 'Bien',
  >= 5 => 'Aprobado',
  _ => 'Suspenso',
};
```

Los casos se evalúan en orden. Por ejemplo, una nota de `8` no cumple `>= 9`, pero sí `>= 7`, por lo que el resultado será:

```
Notable
```

También podemos combinar condiciones:

```dart
String temperatura = switch (grados) {
  < 0 => 'Bajo cero',
  >= 0 && < 15 => 'Frío',
  >= 15 && < 25 => 'Agradable',
  >= 25 => 'Calor',
  _ => 'Valor no válido',
};
```

Esta capacidad forma parte del sistema de **patrones (*****patterns*****) de Dart**, que permite realizar comprobaciones y desestructurar datos de formas mucho más avanzadas.

:::note

Para situaciones sencillas utilizaremos `if` cuando necesitemos evaluar **condiciones diferentes**, mientras que `switch` resulta especialmente apropiado cuando queremos analizar **diferentes posibilidades de una misma expresión**. Las expresiones `switch` son especialmente cómodas cuando el objetivo es obtener un valor a partir de esas alternativas.

:::

### Operador ternario

En ocasiones necesitamos utilizar una estructura `if-else` únicamente para **elegir entre dos valores en función de una condición**. Para estos casos, Dart proporciona el **operador condicional**, conocido habitualmente como **operador ternario**.

Su sintaxis es:

```dart
condicion ? expresionSiTrue : expresionSiFalse
```

La condición se evalúa y, dependiendo de su resultado:

* si es `true`, se utiliza el valor de `expresionSiTrue`;
* si es `false`, se utiliza el valor de `expresionSiFalse`.

Por ejemplo, podemos determinar si una nota está aprobada mediante:

```dart
void main() {  int nota = 7;
  String calificacion = nota >= 5 ? 'Aprobado' : 'Suspendido';
  print(calificacion); // Aprobado}
```

Esta expresión:

```dart
String calificacion = nota >= 5 ? 'Aprobado' : 'Suspendido';
```

es una forma más compacta de escribir:

```dart
String calificacion;
if (nota >= 5) {  
    calificacion = 'Aprobado';
} else {  
    calificacion = 'Suspendido';
}
```

Como el operador ternario **produce un valor**, también podemos utilizarlo directamente como parte de otras expresiones:

```dart
int edad = 17;
print('El usuario es ${edad >= 18 ? 'mayor' : 'menor'} de edad');
```

El resultado será:

```
El usuario es menor de edad
```

:::note

**¿Cuándo utilizarlo?**

El operador ternario resulta especialmente útil para **condiciones sencillas con dos posibles resultados**. Si necesitamos evaluar varias condiciones o realizar operaciones más complejas, generalmente será más legible utilizar `if-else` o una expresión `switch`.

:::

Este operador aparecerá con bastante frecuencia cuando trabajemos con **Flutter**, especialmente para decidir de forma sencilla qué valor o qué widget utilizar dependiendo del estado de nuestra aplicación.

## Estructuras de repetición

Las **estructuras de repetición**, también conocidas como **bucles**, permiten ejecutar un bloque de código varias veces. Dependiendo de la situación, podemos repetirlo un número determinado de veces, mientras se cumpla una condición o recorrer directamente los elementos de una colección.

Dart proporciona diferentes estructuras de repetición: `for`, `while`, `do-while` y `for-in`.

### `for`

El bucle `for` resulta especialmente útil cuando **conocemos de antemano el número de veces que queremos repetir un bloque de código**.

Su estructura general es:

```dart
for (inicializacion; condicion; actualizacion) {
  // Código que queremos repetir
}
```

Por ejemplo, podemos mostrar los números del `0` al `10`:

```dart
void main() {
  for (int i = 0; i <= 10; i++) {
    print(i);
  }
}
```

En un `for` podemos distinguir tres partes:

* `int i = 0`: inicializa la variable que utilizaremos como contador.
* `i <= 10`: establece la condición que debe cumplirse para continuar ejecutando el bucle.
* `i++`: actualiza el contador después de cada iteración.

Podemos combinarlo con otras estructuras de control:

```dart
void main() {
  for (int i = 0; i <= 10; i++) {
    if (i < 5) {
      print('$i es menor que 5');
    } else {
      print('$i no es menor que 5');
    }
  }
}
```

### `while`

El bucle `while` ejecuta repetidamente un bloque de código **mientras una determinada condición sea verdadera**.

Su sintaxis es:

```dart
while (condicion) {
  // Código que queremos repetir
}
```

Por ejemplo, podemos implementar una lógica similar al ejemplo anterior:

```dart
void main() {
  int i = 0;

  while (i <= 10) {
    if (i < 5) {
      print('$i es menor que 5');
    } else {
      print('$i no es menor que 5');
    }

    i++;
  }
}
```

A diferencia del `for`, la inicialización y actualización del contador no forman parte de la propia estructura del bucle.

`while` resulta especialmente apropiado cuando **no sabemos exactamente cuántas iteraciones serán necesarias**, pero sí conocemos la condición que debe mantenerse para continuar.

:::caution

La condición se comprueba **antes de cada iteración**. Por tanto, si inicialmente es `false`, el contenido del `while` no llegará a ejecutarse ninguna vez.

:::

### `do-while`

El bucle `do-while` funciona de forma similar a `while`, pero presenta una diferencia importante: **la condición se evalúa después de ejecutar el bloque de código**.

Su estructura es:

```dart
do {
  // Código que queremos repetir
} while (condicion);
```

Por ejemplo:

```dart
void main() {
  int i = 0;

  do {
    if (i < 5) {
      print('$i es menor que 5');
    } else {
      print('$i no es menor que 5');
    }

    i++;
  } while (i <= 10);
}
```

Como la condición se comprueba al final, el bloque de código se ejecutará **al menos una vez**, aunque inicialmente la condición sea falsa.

Podemos observarlo fácilmente:

```dart
void main() {
  int numero = 20;

  do {
    print(numero);
  } while (numero < 10);
}
```

Aunque `numero < 10` es `false`, el programa mostrará:

```
20
```

porque la comprobación se realiza después de la primera ejecución.

### `for-in`

Cuando queremos **recorrer los elementos de una colección**, Dart proporciona una sintaxis más sencilla mediante `for-in`.

Su estructura es:

```dart
for (var elemento in coleccion) {
  // Utilizamos elemento
}
```

Por ejemplo:

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

En cada iteración, la variable `dia` contiene uno de los elementos de la lista. De esta forma podemos recorrer la colección **sin necesidad de gestionar manualmente un índice**.

También podemos utilizar inferencia de tipos:

```dart
for (var dia in laborables) {
  print(dia);
}
```

Dart deducirá que `dia` es de tipo `String` a partir del tipo de los elementos almacenados en la lista.

#### ¿Qué estructura debemos utilizar?

La elección dependerá principalmente del tipo de repetición que necesitemos:

| Estructura | Uso habitual                                                                            |
| ---------- | --------------------------------------------------------------------------------------- |
| `for`      | Cuando conocemos el número de iteraciones o necesitamos trabajar con un contador.       |
| `while`    | Cuando queremos repetir mientras se cumpla una condición.                               |
| `do-while` | Cuando necesitamos ejecutar el código al menos una vez antes de comprobar la condición. |
| `for-in`   | Cuando queremos recorrer directamente los elementos de una colección.                   |
