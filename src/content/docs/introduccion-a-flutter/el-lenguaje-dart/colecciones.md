---
title: "Colecciones"
sidebar:
  label: "Colecciones"
  order: 7
---

https\://dart.dev/language/collections

Las colecciones son tipos de objetos que representan un grupo de elementos y que pueden tener comportamients distintos. En Dart podemos destacar tres tipos de colecciones:

* Listas o arrays ([List](https://dart.dev/language/collections#lists))
* Conjuntos ([Set](https://dart.dev/language/collections#sets))
* Mapas ([Map](https://dart.dev/language/collections#maps))

## Listas

En Dart lo que conocemos como arrays son objetos [**List**](https://api.flutter.dev/flutter/dart-core/List-class.html). Estos representan secuencias de elementos a los que se puede acceder mediante su índice, siendo el índice del primer elemento cero. Para declarar una lista, se utiliza el tipo List, indicando entre paréntesis angulares de qué tipo van a ser los elementos que contiene:

```dart
void main() {
   List<String> lstAsig = ["Raul", "David", "Alonso"];
   print(lstAsig); //Muestra el contenido de la lista
   print(lstAsig[0]); //Muestra el primer elemento
   print(lstAsig[1]); //Muestra el segundo elemento
   print(lstAsig[2]); //Muestra el tercer elemento
}
```

:::caution

Si intentamos acceder a una posición del List fuera del rango, nos dará una excepción RangeError.

:::

Dart nos ofrece la posibilidad de crear listas de tipos mixtos. Para ello, especificamos su tipo como  `dynamic`.&#x20;

```dart
void main() { 
   List lstVarios = ["Andrés", "García", 5, 15.7]; 
   print(lstVarios); //Muestra el contenido de la lista 
} 
```

Además, si queremos crear una lista con un número inicial de elementos con un valor por defecto, podemos utilizar la siguiente instrucción:&#x20;

```dart
List lstNum = List.filled(10, 0, growable: true); 
```

Donde el primer elemento del método filled es el número de elementos, el segundo el valor por defecto y el tercero, que es opcional, indica si el número de elementos de la lista puede incrementarse (por defecto es false).

### Propiedades

La clase [**List**](https://api.flutter.dev/flutter/dart-core/List-class.html) dispone de una serie de propiedades muy interesantes. Algunas de ellas son:

* **length**: Devuelve un entero con el número de elementos de la lista.&#x20;
* **first**: obtiene el primer elemento de la lista.&#x20;
* **last**: obtiene el último elemento de la lista.&#x20;
* **isEmpty**/**isNotEmpty**: devuelve un bool con valor true si la lista está vacía (o no) o false en caso contrario (o no).

```dart
void main() {
  List<String> lstAsig = ["Informática", "Matemáticas", "Castellano"];
  //Número de elementos
  print('Longitud: ${lstAsig.length}');
  //Primer elemento
  print('1er elemento: ${lstAsig.first}');
  //Último elemento
  print('Último elemento: ${lstAsig.last}');
  //Está vacía
  print('Vacía: ${lstAsig.isEmpty}');
  //No está vacía
  print('No vacía: ${lstAsig.isNotEmpty}');
}
```

### Métodos

De igual manera, la clase [**List**](https://api.flutter.dev/flutter/dart-core/List-class.html) también incorpora métodos muy útiles. Estos son algunos:

* **add**(elemento): añade elemento al final de la lista. No devuelve nada.&#x20;
* **clear**(): elimina todos los elementos de la lista. No devuelve nada.&#x20;
* **contains**(elemento): devuelve un bool, que será verdadero si elemento está en la lista o false en caso contrario.&#x20;
* **elementAt**(int índice): devuelve el elemento en la posición índice.&#x20;
* **forEach**(instrucción): ejecuta la instrucción pasada como parámetro, a la que se le pasa como parámetro, a su vez, cada uno de los elementos de la lista. No devuelve nada.&#x20;
* **insert**(int índice, elemento): inserta elemento en la posición indicada por índice. No devuelve nada.&#x20;
* **indexOf**(elemento, \[int inicio]): devuelve un entero con el índice de la primera ocurrencia de elemento encontrada a partir de inicio, que es opcional y 0 por defecto.
* **join**(\[String separador]): devuelve un String con todos los elementos convertidos a String y concatenados. El parámetro separador es opcional, pero si lo utilizamos, lo intercalará en cada uno de los elementos concatenados.&#x20;
* **remove**(elemento): elimina la primera ocurrencia de elemento en la lista. Devuelve un bool con valor true si el elemento existía o false en caso contrario.&#x20;
* **removeAt**(int índice): elimina el elemento en la posición índice y devuelve el elemento.
* **removeLast**(int índice): elimina el último elemento de la lista y devuelve el elemento.
* **removeRange**(int inicio, int fin): elimina el rango de elementos entre los índices inicio y fin. No devuelve nada.

```dart
void main() {
  List<String> lstPilotos = ["Márquez", "Acosta", "Miller"];
  List<String> lstFutbolistas = ["Messi", "Cristiano"];
  lstFutbolistas.add("Dembele"); //Añade Dembele a la lista de optativas
  lstPilotos.contains("Rossi"); //Devuelve false
  print(lstPilotos.elementAt(1)); //Muestra Acosta
  lstFutbolistas.forEach(print); //Muestra todos los futbolistas
  lstPilotos.insert(0, "Stoner"); //Inserta Stoner como 1r piloto
  print(lstPilotos.indexOf("Miller")); //Muestra 3
  print(lstFutbolistas.join(", ")); //Muestra Informática, C. Clásica, Valores
  print(lstPilotos.remove("J.Martin")); //Devuelve false porque no existe
  print(lstPilotos.removeAt(1)); //Elimina y devuelve Márquez
  print(lstFutbolistas.removeLast()); //Elimina y devuelve Cristiano
  lstPilotos.removeRange(0, 2); //Elimina los dos primeros elementos
  print(lstPilotos); //Muestra la lista de pilotos
  print(lstFutbolistas); //Muestra la lista de futbolistas
  lstPilotos.clear(); //Vacía la lista de pilotos
  lstFutbolistas.clear(); //Vacía la lista de futbolistas
}
```

:::note

En *Dart*, también existe lo que conocemos como conjunto ([***Set***](https://api.dart.dev/stable/3.5.3/dart-core/Set-class.html)). Este tipo de variable representa una colección de elementos únicos y en desorden. Son similares a las listas pero los conjuntos **no permiten elementos duplicados y tampoco tienen un orden específico** como las listas.

```dart
// ejemplos de conjuntos
Set<int> numeros = {1, 2, 3, 4, 5};
Set<String> colores = {'Verde', 'Azul', 'Rojo'};

```

Por supuesto, el tipo Set también dispone de propiedades y métodos muy interesantes que facilitan su manejo.

:::

## Mapas

Los mapas en Dart son estructuras de datos que almacenan pares clave-valor y se declaran utilizando el tipo [**Map**](https://api.dart.dev/stable/3.5.3/dart-core/Map-class.html)

La forma correcta de declarar un [**Map**](https://api.dart.dev/stable/3.5.3/dart-core/Map-class.html) es indicando de qué tipo son los elementos de las claves y valores de la siguiente manera:

```dart
void main() {
    Map<String, String> datosPersonales = {
        "nombre": "Ramón",
        "apellidos": "Vidal Vidal",
        "poblacion": "Benigánim"
    };
}
```

:::note

Las claves de un mapa suelen ser de tipo `String` aunque si fuese necesario, podemos declararlas de otro tipo. Por ejemplo `dynamic`.

```dart
void main() {
    Map<dynamic, String> datosPersonales = {
        "nombre": "Ramón",
        "apellidos": "Vidal Vidal",
        3: "Benigánim"
    };
}
```


:::

### Propiedades

La clase [**List**](https://api.flutter.dev/flutter/dart-core/List-class.html) dispone de una serie de propiedades muy interesantes. Algunas de ellas son:

* **entries**: devuelve un objeto iterable que contiene un par clave/valor en cada elemento. Simplificando, cada elemento del objeto iterable sería como un mapa con una única clave y valor. Con el resultado se puede trabajar como si fuera una lista de pares clave/valor.&#x20;
* **keys**: devuelve un objeto iterable que representa las claves y con el que se puede trabajar como una lista.&#x20;
* **values**: devuelve un objeto iterable que representa los valores y con el que se puede trabajar como una lista.&#x20;
* **length**: devuelve la cantidad de elementos clave/valor en el mapa.&#x20;
* **isEmpty/isNotEmpty**: devuelve un bool que será true si el mapa está vacío (o no) o false en caso contrario (o no).&#x20;

```dart
void main() {
  Map<String, String> datosPersonales = {
    "nombre": "Juan", //Asignación mediante
    "apellidos": "Vidal Vidal", //literales de mapa
    "poblacion": "Benigánim"
  };
  //Entradas
  print("Entradas: ${datosPersonales.entries}"); //Entradas: (MapEntry(nombre: Juan), MapEntry(apellidos: Vidal Vidal), MapEntry(poblacion: Benigánim))
  //Lista de claves
  print("Claves: ${datosPersonales.keys}"); //Claves: (nombre, apellidos, poblacion)
  //Lista de valores
  print("Valores: ${datosPersonales.values}"); //Valores: (Juan, Vidal Vidal, Benigánim)
  //Número de elementos
  print("Longitud: ${datosPersonales.length}"); //Longitud: 3
  //Está vacío
  print("Vacío: ${datosPersonales.isEmpty}"); //Vacío: false
  //No está vacío
  print("No vacío: ${datosPersonales.isNotEmpty}");//No vacío: true
}
```

### Métodos

Aunque la clase Map ofrece más métodos, estos son los más utilizados:

* **addAll**(param\_mapa): añade todos los elementos de param\_mapa al Map. Los pares deben ser del, mismo tipo entre ambos mapas. No devuelve nada.&#x20;
* **clear**(): elimina todas las entradas del mapa. No devuelve nada.&#x20;
* containsKey(clave): devuelve un bool con valor true si en el Map existe algún par cuya clave coincida con clave o false en caso contrario.&#x20;
* **containsValue**(valor): devuelve un bool con valor true si en el Map existe algún par cuyo valor coincida con valor o false en caso contrario.&#x20;
* **forEach**(): ejecuta la función pasada como parámetro. A diferencia del forEach(…) de los objetos List, en este caso han de indicarse como parámetros la clave y el valor. Está función se comprenderá mejor cuando se estudien las funciones lambda. No devuelve nada.&#x20;
* **remove**(clave): elimina el par cuya clave coincida con clave. Devuelve el valor asociado a la clave.&#x20;
* **removeWhere**(): elimina todos los elementos que satisfagan una condición incluida en los parámetros

```dart
void main() {
  Map<int, String> alumnosClase = {
    1: "Andreu",
    2: "Kiko",
    3: "Raul",
    4: "David",
    5: "Jonathan",
    6: "Alonso"
  };
  Map<int, String> alumnosRepetidores = {1: "Rafa", 2: "Pedro"};

  Map<int, String> mapAlumnos2DAM = {}; //Se debe asignar un conjunto vacío
  mapAlumnos2DAM.addAll(alumnosClase); //Añadimos alumnos nuevos
  mapAlumnos2DAM.addAll(alumnosRepetidores); //Añadimos alumnos repetidores

  //Existe el alumno con clave 3
  print("Existe clave 3: ${mapAlumnos2DAM.containsKey(3)}");

  //Existe el alumno con valor Alfredo
  print("Existe valor Marta: ${mapAlumnos2DAM.containsValue('Alfredo')}");
  print(mapAlumnos2DAM.remove(5)); //Eliminamos el alumno con clave 5

  //Eliminamos todos los alumnos con clave par
  mapAlumnos2DAM.removeWhere((key, value) => key.isEven);

  //Imprimimos todos los valores de mapAlumnos
  mapAlumnos2DAM.forEach((key, value) {
    print(value);
  });

  //Eliminamos todos los elementos de mapAluRepet
  mapAlumnos2DAM.clear();
}
```

### Recorrido de Mapas

A la hora de recorrer mapas existen varias alternativas. Veámos las principales:

```dart
void main() {
  Map<int, String> alumnosClase = {
    1: "Andreu",
    2: "Kiko",
    3: "Raul",
    4: "David",
    5: "Jonathan",
    6: "Alonso"
  };
  //Utilizando un for...in
  for (int claveAlumno in alumnosClase.keys) {
    print("Id: $claveAlumno, nombre: ${alumnosClase[claveAlumno]}");
  }

  //Utilizando el método forEach de la clase Map
  alumnosClase.forEach(
      (claveAlumno, valor) => print("Id: $claveAlumno, nombre: $valor"));
}
```
