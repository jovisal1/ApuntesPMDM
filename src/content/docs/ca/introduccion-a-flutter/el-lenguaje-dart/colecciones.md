---
title: "Col·leccions"
sidebar:
  label: "Col·leccions"
  order: 7
---

https\://dart.dev/language/collections

Les col·leccions són tipus d'objectes que representen un grup d'elements i que poden tindre comportaments diferents. En Dart podem destacar tres tipus de col·leccions:

* Llistes o arrays ([List](https://dart.dev/language/collections#lists))
* Conjunts ([Set](https://dart.dev/language/collections#sets))
* Mapes ([Map](https://dart.dev/language/collections#maps))

## Llistes

En Dart el que coneixem com arrays són objectes [**List**](https://api.flutter.dev/flutter/dart-core/List-class.html). Estos representen seqüències d'elements als quals es pot accedir mitjançant el seu índex, sent l'índex del primer element zero. Per a declarar una llista, s'utilitza el tipus List, indicant entre parèntesis angulars de quin tipus seran els elements que conté:

```dart
void main() {
   List<String> lstAsig = ["Raul", "David", "Alonso"];
   print(lstAsig); //Mostra el contingut de la llista
   print(lstAsig[0]); //Mostra el primer element
   print(lstAsig[1]); //Mostra el segon element
   print(lstAsig[2]); //Mostra el tercer element
}
```

:::caution

Si intentem accedir a una posició del List fora del rang, ens donarà una excepció RangeError.

:::

Dart ens ofereix la possibilitat de crear llistes de tipus mixtos. Per a això, especifiquem el seu tipus com  `dynamic`.&#x20;

```dart
void main() { 
   List lstVarios = ["Andrés", "García", 5, 15.7]; 
   print(lstVarios); //Mostra el contingut de la llista 
} 
```

A més, si volem crear una llista amb un nombre inicial d'elements amb un valor per defecte, podem utilitzar la següent instrucció:&#x20;

```dart
List lstNum = List.filled(10, 0, growable: true); 
```

On el primer element del mètode filled és el nombre d'elements, el segon el valor per defecte i el tercer, que és opcional, indica si el nombre d'elements de la llista pot incrementar-se (per defecte és false).

### Propietats

La classe [**List**](https://api.flutter.dev/flutter/dart-core/List-class.html) disposa d'una sèrie de propietats molt interessants. Algunes d'elles són:

* **length**: Retorna un enter amb el nombre d'elements de la llista.&#x20;
* **first**: obté el primer element de la llista.&#x20;
* **last**: obté l'últim element de la llista.&#x20;
* **isEmpty**/**isNotEmpty**: retorna un bool amb valor true si la llista està buida (o no) o false en cas contrari (o no).

```dart
void main() {
  List<String> lstAsig = ["Informática", "Matemáticas", "Castellano"];
  //Nombre d'elements
  print('Longitud: ${lstAsig.length}');
  //Primer element
  print('1r element: ${lstAsig.first}');
  //Últim element
  print('Últim element: ${lstAsig.last}');
  //Està buida
  print('Buida: ${lstAsig.isEmpty}');
  //No està buida
  print('No buida: ${lstAsig.isNotEmpty}');
}
```

### Mètodes

D'igual manera, la classe [**List**](https://api.flutter.dev/flutter/dart-core/List-class.html) també incorpora mètodes molt útils. Estos són alguns:

* **add**(element): afig element al final de la llista. No retorna res.&#x20;
* **clear**(): elimina tots els elements de la llista. No retorna res.&#x20;
* **contains**(element): retorna un bool, que serà vertader si element està en la llista o false en cas contrari.&#x20;
* **elementAt**(int índex): retorna l'element en la posició índex.&#x20;
* **forEach**(instrucció): executa la instrucció passada com a paràmetre, a la qual se li passa com a paràmetre, al seu torn, cadascun dels elements de la llista. No retorna res.&#x20;
* **insert**(int índex, element): inserix l’element en la posició indicada per índex. No retorna res.&#x20;
* **indexOf**(element, \[int inici]): retorna un enter amb l'índex de la primera ocurrència d'element trobada a partir d'inici, que és opcional i 0 per defecte.
* **join**(\[String separador]): retorna un String amb tots els elements convertits a String i concatenats. El paràmetre separador és opcional, però si l'utilitzem, l'intercalarà en cadascun dels elements concatenats.&#x20;
* **remove**(element): elimina la primera ocurrència d'element en la llista. Retorna un bool amb valor true si l'element existia o false en cas contrari.&#x20;
* **removeAt**(int índex): elimina l'element en la posició índex i retorna l'element.
* **removeLast**(int índex): elimina l'últim element de la llista i retorna l'element.
* **removeRange**(int inici, int fi): elimina el rang d'elements entre els índexs inici i fi. No retorna res.

```dart
void main() {
  List<String> lstPilotos = ["Márquez", "Acosta", "Miller"];
  List<String> lstFutbolistas = ["Messi", "Cristiano"];
  lstFutbolistas.add("Dembele"); //Afig Dembele a la llista d'optatives
  lstPilotos.contains("Rossi"); //Retorna false
  print(lstPilotos.elementAt(1)); //Mostra Acosta
  lstFutbolistas.forEach(print); //Mostra tots els futbolistes
  lstPilotos.insert(0, "Stoner"); //Inserida Stoner com 1r pilot
  print(lstPilotos.indexOf("Miller")); //Mostra 3
  print(lstFutbolistas.join(", ")); //Mostra Informàtica, C. Clàssica, Valors
  print(lstPilotos.remove("J.Martin")); //Retorna false perquè no existeix
  print(lstPilotos.removeAt(1)); //Elimina i retorna Márquez
  print(lstFutbolistas.removeLast()); //Elimina i retorna Cristiano
  lstPilotos.removeRange(0, 2); //Elimina els dos primers elements
  print(lstPilotos); //Mostra la llista de pilots
  print(lstFutbolistas); //Mostra la llista de futbolistes
  lstPilotos.clear(); //Buida la llista de pilots
  lstFutbolistas.clear(); //Buida la llista de futbolistes
}
```

:::note

En *Dart*, també existeix el que coneixem com a conjunt ([***Set***](https://api.dart.dev/stable/3.5.3/dart-core/Set-class.html)). Este tipus de variable representa una col·lecció d'elements únics i en desordre. Són similars a les llistes però els conjunts **no permeten elements duplicats i tampoc tenen un ordre específic** com les llistes.

```dart
// exemples de conjunts
Set<int> numeros = {1, 2, 3, 4, 5};
Set<String> colores = {'Verde', 'Azul', 'Rojo'};

```

Per descomptat, el tipus Set també disposa de propietats i mètodes molt interessants que faciliten el seu maneig.

:::

## Mapes

Els mapes en Dart són estructures de dades que emmagatzemen parells clau-valor i es declaren utilitzant el tipus [**Map**](https://api.dart.dev/stable/3.5.3/dart-core/Map-class.html)

La forma correcta de declarar un [**Map**](https://api.dart.dev/stable/3.5.3/dart-core/Map-class.html) és indicant de quin tipus són els elements de les claus i valors de la següent manera:

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

Les claus d'un mapa solen ser de tipus `String` encara que si fora necessari, podem declarar-les d'un altre tipus. Per exemple `dynamic`.

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

### Propietats

La classe [**List**](https://api.flutter.dev/flutter/dart-core/List-class.html) disposa d'una sèrie de propietats molt interessants. Algunes d'elles són:

* **entries**: retorna un objecte iterable que conté un parell clau/valor en cada element. Simplificant, cada element de l'objecte iterable seria com un mapa amb una única clau i valor. Amb el resultat es pot treballar com si fora una llista de parells clau/valor.&#x20;
* **keys**: retorna un objecte iterable que representa les claus i amb el qual es pot treballar com una llista.&#x20;
* **values**: retorna un objecte iterable que representa els valors i amb el qual es pot treballar com una llista.&#x20;
* **length**: retorna la quantitat d'elements clau/valor en el mapa.&#x20;
* **isEmpty/isNotEmpty**: retorna un bool que serà true si el mapa està buit (o no) o false en cas contrari (o no).&#x20;

```dart
void main() {
  Map<String, String> datosPersonales = {
    "nombre": "Juan", //Assignació mitjançant
    "apellidos": "Vidal Vidal", //literals de mapa
    "poblacion": "Benigánim"
  };
  //Entrades
  print("Entrades: ${datosPersonales.entries}"); //Entrades: (MapEntry(nom: Juan), MapEntry(cognoms: Vidal Vidal), MapEntry(poblacion: Benigànim))
  //Llesta de claus
  print("Claus: ${datosPersonales.keys}"); //Claus: (nom, cognoms, poblacion)
  //Llesta de valors
  print("Valors: ${datosPersonales.values}"); //Valors: (Juan, Vidal Vidal, Benigànim)
  //Nombre d'elements
  print("Longitud: ${datosPersonales.length}"); //Longitud: 3
  //Està buit
  print("Buit: ${datosPersonales.isEmpty}"); //Buit: false
  //No està buit
  print("No buit: ${datosPersonales.isNotEmpty}");//No buit: true
}
```

### Mètodes

Encara que la classe Map ofereix més mètodes, estos són els més utilitzats:

* **addAll**(param\_mapa): afig tots els elements de param\_mapa al Map. Els parells han de ser del mateix tipus entre tots dos mapes. No retorna res.&#x20;
* **clear**(): elimina totes les entrades del mapa. No retorna res.&#x20;
* containsKey(clau): retorna un bool amb valor true si en el Map existeix algun parell la clau del qual coincidisca amb la clau o false en cas contrari.&#x20;
* **containsValue**(valor): retorna un bool amb valor true si en el Map existeix algun parell el valor del qual coincidisca amb valor o false en cas contrari.&#x20;
* **forEach**(): executa la funció passada com a paràmetre. A diferència del forEach(…) dels objectes List, en este cas han d'indicar-se com a paràmetres la clau i el valor. Esta funció es comprendrà millor quan s'estudien les funcions lambda. No retorna res.&#x20;
* **remove**(clau): elimina el parell la clau del qual coincidisca amb clau. Retorna el valor associat a la clau.&#x20;
* **removeWhere**(): elimina tots els elements que satisfan una condició inclosa en els paràmetres

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

  Map<int, String> mapAlumnos2DAM = {}; //S'ha d'assignar un conjunt buit
  mapAlumnos2DAM.addAll(alumnosClase); //Afegim alumnes nous
  mapAlumnos2DAM.addAll(alumnosRepetidores); //Afegim alumnes repetidors

  //Existeix l'alumne amb clau 3
  print("Existeix clau 3: ${mapAlumnos2DAM.containsKey(3)}");

  //Existeix l'alumne amb valor Alfredo
  print("Existeix valor Marta: ${mapAlumnos2DAM.containsValue('Alfredo')}");
  print(mapAlumnos2DAM.remove(5)); //Eliminem l'alumne amb clau 5

  //Eliminem tots els alumnes amb clau parell
  mapAlumnos2DAM.removeWhere((key, value) => key.isEven);

  //Imprimim tots els valors de mapAlumnos
  mapAlumnos2DAM.forEach((key, value) {
    print(value);
  });

  //Eliminem tots els elements de mapAluRepet
  mapAlumnos2DAM.clear();
}
```

### Recorregut de Mapes

A l'hora de recórrer mapes existeixen diverses alternatives. Vegem les principals:

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
  //Utilitzant un for...in
  for (int claveAlumno in alumnosClase.keys) {
    print("Aneu: $claveAlumno, nom: ${alumnosClase[claveAlumno]}");
  }

  //Utilitzant el mètode forEach de la classe Map
  alumnosClase.forEach(
      (claveAlumno, valor) => print("Aneu: $claveAlumno, nom: $valor"));
}
```
