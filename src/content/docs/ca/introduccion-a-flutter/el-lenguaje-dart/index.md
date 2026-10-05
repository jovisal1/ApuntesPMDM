---
title: "El llenguatge Dart"
sidebar:
  label: "El llenguatge Dart"
  order: 1
---

**Dart** és un llenguatge de programació modern, orientat a objectes i amb tipatge estàtic, desenvolupat per Google. És el llenguatge utilitzat per **Flutter** per a implementar la lògica i construir les aplicacions que desenvoluparem al llarg del curs.

La seua sintaxi comparteix molts conceptes amb llenguatges com **Java, JavaScript, C# o Kotlin**, per la qual cosa bona part de les seues estructures ens resultaran familiars.

Algunes de les característiques més importants del llenguatge Dart són:

* **Orientat a objectes**: Dart és un llenguatge orientat a objectes basat en classes. Utilitzarem classes, objectes, constructors, herència i altres conceptes de POO constantment en Flutter.
* **Tipatge estàtic**: les variables tenen un tipus determinat, la qual cosa permet detectar nombrosos errors abans d'executar l'aplicació.
* **Inferència de tipus**: encara que és un llenguatge tipat, Dart pot deduir automàticament el tipus de moltes variables mitjançant `var`.

```
var nombre = 'Flutter'; // Dart infereix Stringvar edat = 20;          // Dart infereix int
```

* **Null Safety**: distingeix entre variables que poden contindre `null` i aquelles que no, ajudant a previndre un dels errors més habituals durant l'execució.

```
String nombre = 'Ana';String? segundoNombre;
```

* **Tot són objectes**: pràcticament tots els valors amb els quals treballem són objectes, inclosos números, cadenes de text, funcions i col·leccions.
* **Funcions com a objectes de primera classe**: podem emmagatzemar funcions en variables, passar-les com a arguments i retornar-les des d'altres funcions. Això serà especialment important en Flutter per a treballar amb *callbacks*.
* **Programació asíncrona**: proporciona `Future`, `async` i `await` per a realitzar operacions asíncrones de manera senzilla. Serà fonamental quan accedim a APIs, bases de dades o arxius.

```
final datos = await cargarDatos();
```

* **Col·leccions potents**: incorpora `List`, `Set` i `Map`, juntament amb operacions com `map()`, `where()` o `forEach()` per a treballar còmodament amb conjunts de dades.
* **Compilació adaptada al desenvolupament i producció**: Dart està dissenyat per a proporcionar un **cicle de desenvolupament ràpid** i, al mateix temps, permetre generar aplicacions optimitzades per a producció. Esta característica és clau per a funcionalitats de Flutter com **Hot Reload**.
* **Gestor de paquets integrat**: mitjançant **Pub** i el repositori `pub.dev` podem incorporar fàcilment llibreries i paquets desenvolupats per la comunitat.

En esta unitat coneixerem els **fonaments de Dart necessaris per a treballar amb Flutter**, prestant especial atenció a les seues característiques pròpies i a aquells elements que utilitzarem posteriorment en el desenvolupament de les nostres aplicacions.<br>
