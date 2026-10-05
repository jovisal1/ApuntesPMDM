---
title: "Programació orientada a objectes (II)"
sidebar:
  label: "Programació orientada a objectes (II)"
  order: 10
---

## Herència

En programació orientada a objectes, l'herència és un mecanisme que permet a una classe (anomenada **subclasse** o **classe filla**) heretar les propietats i mètodes d'una altra classe (anomenada **superclasse** o **classe pare**). Això significa que la subclasse automàticament adquireix les característiques de la superclasse, a més de poder tindre les seues pròpies característiques addicionals.&#x20;

Alguns dels avantatges d'usar herència en els nostres desenvolupaments són:

* **Reutilització de codi:** Evita repetir codi en crear classes similars.
* **Organització de codi:** Ajuda a estructurar el codi de manera jeràrquica, la qual cosa facilita la comprensió i el manteniment.
* **Polimorfisme:** Permet que objectes de diferents classes es tracten com si foren de la mateixa classe, la qual cosa agrega flexibilitat al codi.

En Dart, l'herència s'implementa utilitzant la paraula clau `extends`. Per exemple:

```dart
class Animal {
  String nombre;
  int edad;

  void comer() {
    print('L\'animal està menjant.');
  }
}

class Perro extends Animal {
  void olfatear() {
    print('El gos ensuma!');
  }
}
```

En este exemple:

* `Animal` és la superclasse. Té les propietats `nombre` i `edad`, i el mètode `comer()`.
* `Perro` és la subclasse de `Animal`. Hereta totes les propietats i mètodes de `Animal` i a més té el seu propi mètode `olfatear()`.

:::note

Dart permet herència simple. És a dir, una classe només pot estendre d'una única superclasse.

:::

### **Sobreescriptura de mètodes**

Pot ser que en certs casos una subclasse necessite modificar un cert comportament heretat de la seua classe pare. Per exemple, imagineu que incorporem a la classe `Animal`un mètode `hacerRuido()`. Quan creem la subclasse`Perro`, podem voler definir la nostra pròpia versió del mètode `hacerRuido()`. Això significa que un `Perro` farà un soroll diferent a un `Gato`, encara que tots dos hereten de la classe `Animal`. Esta capacitat de redefinir un mètode en una subclasse es coneix com **sobreescriptura de mètodes**.

La sobreescriptura de mètodes permet que objectes de diferents classes es tracten com si foren de la mateixa classe, però amb comportaments específics permetent una major especialització dels mètodes si fora necessari.

<pre class="language-dart"><code class="lang-dart">class Animal {
<strong>  String nombre;
</strong>  int edad;

  void comer() {
    print('L\'animal està menjant.');
  } 
  
  void hacerRuido() {
    print('L\'animal fa un soroll.');
  }
}

class Perro extends Animal {
  void olfatear() {
    print('El gos ensuma!');
  }
  @override
  void hacerRuido() {
    print('Guau guau!');
  }
}

class Gato extends Animal {
  @override
  void hacerRuido() {
    print('Miau miau!');
  }
}
</code></pre>

En este exemple:

* La classe `Animal` té dos mètodes genèrics: `hacerRuido()` i `comer()` .
* La classe `Perro` sobreescriu el mètode `hacerRuido()` per a fer que el gos lladre i afig un altre propi `olfatear()`.
* La classe `Gato` també sobreescriu `hacerRuido()` per a fer que el gat miola.

:::note

Com podem deduir de l'anterior exemple, hem de tindre en compte dos detalls a l'hora de sobreescriure mètodes:

* **La paraula clau `@override`:** Esta anotació indica al compilador que estem intencionalment redefinint un mètode heretat.
* **Signatura del mètode:** El mètode sobreescrit ha de tindre exactament la mateixa signatura (nom, tipus de retorn i paràmetres) que el mètode original en la superclasse.
  
:::

### Mini Task Manager: tasques urgents i polimorfisme

Ara distingim tasques normals i urgents. Esta versió completa substitueix la classe del capítol anterior; conserva els paràmetres amb nom i l'estat encapsulat. El getter `descripcion` permet que cada classe descriga els seus objectes de manera diferent:

```dart
class Tarea {
  final String titulo;
  final DateTime fechaLimite;
  bool _completada;

  Tarea({
    required this.titulo,
    required this.fechaLimite,
    bool completada = false,
  }) : _completada = completada;

  bool get completada => _completada;

  void completar() => _completada = true;

  String get descripcion =>
      '$titulo - ${completada ? "Completada" : "Pendent"}';

  void mostrar() => print(descripcion);
}

class TareaUrgente extends Tarea {
  final int prioridad;

  TareaUrgente({
    required String titulo,
    required DateTime fechaLimite,
    required this.prioridad,
  }) : super(titulo: titulo, fechaLimite: fechaLimite);

  @override
  String get descripcion =>
      '🔥 ${super.descripcion} - Prioritat $prioridad';
}

void main() {
  final tareas = <Tarea>[
    Tarea(
      titulo: 'Preparar apunts',
      fechaLimite: DateTime(2026, 10, 6),
    ),
    TareaUrgente(
      titulo: 'Entregar projecte',
      fechaLimite: DateTime(2026, 10, 5),
      prioridad: 10,
    ),
  ];

  for (final tarea in tareas) {
    tarea.mostrar();
  }
}
```

El constructor de `TareaUrgente` utilitza `super(...)` per a inicialitzar la part heretada. El seu getter utilitza `super.descripcion` per a conservar el títol i l'estat que calcula la classe base.

**Si la llista és `List<Tarea>`, per què s'executa el getter de `TareaUrgente` per al segon objecte?** El tipus real de l'objecte determina quina implementació sobreescrita s'utilitza: això és **polimorfisme**. Fins i tot el mètode heretat `mostrar()` utilitza la versió de `descripcion` corresponent a l'objecte.

:::tip[Comprova el comportament]
Completa la tasca urgent abans del bucle. La seua descripció ha de mostrar tant «Completada» com la seua prioritat. Lleva després `extends Tarea` i observa per què deixa d'encaixar en la llista.
:::

### super

La paraula clau `super` en Dart és fonamental per a interactuar amb la superclasse en el context de l'herència ja que ens permet:

* **Tindre accés a membres de la superclasse:** Quan una subclasse necessita accedir a un membre (propietat o mètode) de la seua superclasse que ha sigut sobreescrit, utilitza `super`. Això permet invocar la versió original del membre.
* **Cridar al constructor de la superclasse:** En el constructor d'una subclasse, s'utilitza `super` per a cridar al constructor de la superclasse i així inicialitzar les propietats heretades.

```dart
class Animal {
  String nombre;

  Animal(this.nombre) {
    print('Es va crear un animal anomenat $nombre.');
  }

  void comer() {
    print('L\'animal està menjant.');
  }
}

class Perro extends Animal {
  String raza;

  Perro(String nombre, this.raza) : super(nombre) {
    print('Es va crear un gos de raça $raza.');
  }

  @override
  void comer() {
    print('El gos està menjant croquetes.');
  }

  void jugar() {
    super.comer(); // Crida al mètode comer() de la superclasse
    print('El gos està jugant!');
  }
}
```

En este exemple, en el constructor de `Perro`, `super(nombre)` crida al constructor de `Animal` per a inicialitzar la propietat `nombre`.

Per una altra banda, en el mètode `jugar()`, `super.comer()` crida a la versió original del mètode `comer()` de la classe `Animal`, fins i tot encara que `Perro` haja sobreescrit este mètode.

:::note

Igual que en la sobreescriptura de mètodes, amb l'ús de super també hem de tindre en compte alguns detalls:

* **Ordre d'inicialització:** El constructor de la superclasse sempre s'executa abans que el constructor de la subclasse.
* **Visibilitat:** `super` només es pot utilitzar dins d'una subclasse per a accedir a membres de la superclasse.
  
:::

### Classes abstractes

Una classe abstracta és una classe que no pot ser instanciada directament. Serveix com un "pla" o "contracte" que defineix una estructura bàsica i un conjunt de mètodes que han de ser implementats per les seues subclasses. És a dir, una classe abstracta estableix un conjunt de regles que les classes que l'hereten han de seguir.

**Característiques principals:**

* **No es poden instanciar:** No pots crear objectes directament d'una classe abstracta.
* **Contenen mètodes abstractes:** Estos mètodes només tenen una declaració, però no una implementació. La implementació concreta es deixa a les subclasses. Serà obligatori que almenys una classe filla implemente els mètodes que siguen abstractes.
* **Poden contindre mètodes amb implementació:** A més dels mètodes abstractes, una classe abstracta pot tindre mètodes amb una implementació per defecte, que les subclasses poden sobreescriure si ho desitgen.

```dart
abstract class Animal {
  void comer(); // Mètode abstracte
  void dormir() {
    print('L\'animal està dormint.'); // Mètode amb implementació per defecte
  }
}

class Perro extends Animal {
  @override
  void comer() {
    print('El gos està menjant croquetes.');
  }
}
```

Com podem observar, `Animal` és una classe abstracta que defineix dos mètodes: `comer()` (abstracte) i `dormir()` (amb implementació per defecte). Per part seua, `Perro` és una subclasse de `Animal` i ha d'implementar el mètode abstracte `comer()`.

## Mixins

**Un mixin és una classe especial que defineix un conjunt de mètodes i propietats que poden ser "mesclats" en altres classes.** Això ens permet compartir codi de manera més granular i evitar la creació de jerarquies d'herència innecessàries. Per exemple, en Flutter, els mixins s'utilitzen sovint per a agregar comportaments als widgets.

A l'hora d'utilitzar Mixins necessitem tindre en compte:

* **Declaració:** Es declaren usant la paraula clau `mixin` seguida del nom del mixin.
* **Ús:** Es "mesclen" en una classe utilitzant la paraula clau `with` després de la declaració de la classe.
* **Característiques:**
  * Un mixin pot contindre mètodes, propietats i variables.
  * No pot tindre constructors.
  * No pot estendre altres classes o mixins.

```dart
mixin Logeable {
  void log(String mensaje) {
    print('Log: $mensaje');
  }
}

class Persona with Logeable {
  String nombre;
  Persona(this.nombre);
}

void main() {
  var persona = Persona('Juan');
  persona.log('Hola des del mixin');
}
```

En este exemple:

* `Logeable` és un mixin que defineix un mètode `log` per a registrar missatges.
* `Persona` és una classe que "mescla" el mixin `Logeable`, per la qual cosa pot utilitzar el mètode `log`.

:::note

Consideracions importants sobre els mixins:

* **Conflictes de noms:** Si dos mixins o una classe i un mixin tenen membres amb el mateix nom, pot haver-hi conflictes.
* **Ordre de mescla:** L'ordre en què es mesclen els mixins pot afectar el comportament de la classe.&#x20;
  
:::
