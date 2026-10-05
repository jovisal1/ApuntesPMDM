---
title: "Programació orientada a objectes"
sidebar:
  label: "Programació orientada a objectes"
  order: 9
---

https\://dart.dev/language/classes

La programació orientada a objectes (POO) és un model de programació en el qual el disseny de programari s'organitza al voltant de dades o objectes, en comptes d'usar funcions i lògica. S'enfoca en els objectes que els programadors necessiten manipular, en lloc de centrar-se en la lògica necessària per a eixa manipulació. Un objecte es pot definir com un camp de dades amb atributs i comportaments únics.

**Dart és un llenguatge orientat a objectes** amb classes **i herència basada en mixin** (que veurem més endavant) . Cada objecte és una instància d'una classe i totes les classes, excepte `Null`, descendeixen de `Object`. &#x20;

Assumint que ja disposem de coneixements previs sobre POO, vegem els principals elements que caracteritzen a la Programació Orientada a Objectes en Dart.&#x20;

## Exemple conductor: Mini Task Manager

Al llarg d'estes sis seccions construirem un xicotet gestor de tasques. Començarem modelant una tasca, incorporarem herència i validació, simularem una descàrrega i després obtindrem dades d'una API. Finalment, treballarem amb dates de lliurament i hores de recordatori.

Abans de programar, pensa: **quines propietats hauria de tindre una tasca i quines accions podríem realitzar amb ella?** Usarem un títol, un estat de finalització i una data límit. Ara com ara, n'hi ha prou amb saber que `DateTime` representa una data i una hora; ho estudiarem en l'última secció.

### Classes i objectes

Una **classe** defineix l'estructura i el comportament que tindran els objectes creats a partir d'ella. Dins d'una classe podem declarar principalment:

* **Atributs**, que representen l'estat o les propietats de l'objecte.
* **Mètodes**, que defineixen el seu comportament.
* **Constructors**, que permeten crear i inicialitzar noves instàncies.

Per exemple:

```dart
class Persona {
  String nombre;
  int edad;

  Persona(this.nombre, this.edad);

  void saludar() {
    print('Hola, em dic $nombre i tinc $edad anys.');
  }
}

void main() {
  Persona persona = Persona('Ana', 25);
  persona.saludar();
}
```

En este exemple, `Persona` és la classe i `persona` és un **objecte o instància** d'esta classe.

Podem accedir als seus atributs i mètodes utilitzant l'operador `.`:

```dart
print(persona.nombre);
print(persona.edad);
persona.saludar();
```

:::note

A diferència de llenguatges com Java, en Dart no és necessari que la funció `main()` pertanga a una classe. Podem declarar-la directament a nivell d'arxiu.

:::

### Atributs

Els **atributs**, també denominats *variables d'instància* o *camps*, representen les propietats i l'estat dels objectes d'una classe.

```dart
class Persona {
  String nombre;
  int edad;

  Persona(this.nombre, this.edad);
}
```

Cada instància manté els seus propis valors:

```dart
void main() {
  Persona persona1 = Persona('Juan', 25);
  Persona persona2 = Persona('Ana', 30);

  print(persona1.nombre); // Juan
  print(persona2.nombre); // Ana
}
```

#### Atributs estàtics

Quan declarem un atribut mitjançant `static`, este **pertany a la classe i no a cadascuna de les seues instàncies**.

Per tant, el seu valor és compartit:

```dart
class Persona {
  String nombre;
  static int totalPersonas = 0;

  Persona(this.nombre) {
    totalPersonas++;
  }
}
```

Podem accedir a un membre estàtic directament mitjançant el nom de la classe:

```dart
void main() {
  Persona persona1 = Persona('Juan');
  Persona persona2 = Persona('Ana');
  print(Persona.totalPersonas); // 2
}
```

Observa que utilitzem:

```dart
Persona.totalPersonas
```

i no una instància concreta, ja que `totalPersonas` pertany a la mateixa classe.

### Mètodes

Els **mètodes** són funcions declarades dins d'una classe i permeten definir el comportament dels seus objectes.

A més, poden accedir directament als atributs de la instància:

```dart
class Persona {
  String nombre;
  int edad;

  Persona(this.nombre, this.edad);

  void saludar() {
    print('Hola, soc $nombre');
  }

  void cumplirAnios() {
    edad++;
  }
}
```

Podem invocar-los a través d'una instància:

```dart
void main() {
  Persona persona = Persona('Ana', 25);

  persona.saludar();
  persona.cumplirAnios();
  print(persona.edad); // 26
}
```

Igual que ocorre amb els atributs, també podem definir **mètodes estàtics** mitjançant `static`. Estos pertanyen a la classe i poden utilitzar-se sense crear prèviament una instància.

### Constructors

Els **constructors** permeten crear i inicialitzar els objectes d'una classe.

En Dart, el constructor generatiu bàsic té el mateix nom que la classe:

```dart
class Persona {
  String nombre;
  int edad;

  Persona(String nombre, int edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
}
```

No obstant això, Dart proporciona una sintaxi molt més compacta quan els paràmetres del constructor s'utilitzen directament per a inicialitzar atributs:

```dart
class Persona {
  String nombre;
  int edad;

  Persona(this.nombre, this.edad);
}
```

Totes dues versions realitzen essencialment la mateixa inicialització.

L'expressió:

```dart
this.nombre
```

fa referència a l'atribut `nombre` de la instància que estem creant.

Podem crear objectes mitjançant:

```dart
Persona persona = Persona('Ana', 25);
```

#### Mini Task Manager: la nostra primera tasca

Reunim classes, atributs, mètodes i constructors en un programa complet:

```dart
class Tarea {
  String titulo;
  bool completada;
  DateTime fechaLimite;

  Tarea({
    required this.titulo,
    required this.fechaLimite,
    this.completada = false,
  });

  void completar() {
    completada = true;
  }

  void mostrar() {
    print('$titulo - ${completada ? "✅" : "⏳"}');
  }
}

void main() {
  final tarea = Tarea(
    titulo: 'Estudiar Dart',
    fechaLimite: DateTime(2026, 10, 10),
  );

  tarea.mostrar();
  tarea.completar();
  tarea.mostrar();
}
```

`Tarea` és la classe i `tarea` és una instància. El constructor usa **paràmetres amb nom**: `required` obliga a proporcionar el títol i la data, mentre que `completada` té un valor per defecte. El mètode `completar()` canvia l'estat de l'objecte i `mostrar()` permet observar-lo.

Encara que la variable `tarea` siga `final`, els seus atributs poden canviar: no podem assignar-li un altre objecte, però sí que modificar l'objecte al qual fa referència.

:::tip[Prediu i prova]
Què mostraran les dues crides a `mostrar()`? Després, crea una segona tasca i completa només la primera. Comprova que cada objecte conserva el seu estat.
:::

#### Constructors amb nom

Dart no utilitza la sobrecàrrega tradicional de constructors de la mateixa forma que llenguatges com Java. En el seu lloc, podem definir **constructors amb nom** (*named constructors*) per a proporcionar diferents maneres de crear un objecte.

```dart
class Persona {
  String nombre;
  int edad;

  Persona(this.nombre, this.edad);

  Persona.invitado()
      : nombre = 'Invitado',
        edad = 0;
}
```

Ara podem crear objectes de dues formes:

```dart
Persona persona1 = Persona('Ana', 25);
Persona persona2 = Persona.invitado();
```

Els constructors amb nom permeten a més que el mateix nom indique **la finalitat de cada forma de construcció**.

### Llista d'inicialitzadors

Dart permet inicialitzar atributs **abans d'executar el cos del constructor** mitjançant una llista d'inicialitzadors.

Esta es col·loca després de `:`:

```dart
class Persona {
  String nombre;
  int edad;

  Persona(String nombre)
      : nombre = nombre,
        edad = 18 {
    print('Persona creada');
  }
}
```

Les assignacions:

```dart
nombre = nombre,
edad = 18
```

es realitzen abans d'executar el cos `{ }` del constructor.

Les llistes d'inicialitzadors seran especialment útils per a **inicialitzar atributs `final`, realitzar càlculs previs o delegar en altres constructors**.

### Atributs `final`

La paraula clau `final` permet declarar atributs el valor dels quals **només pot assignar-se una vegada**.

```dart
class Persona {
  final String dni;
  String nombre;

  Persona(this.dni, this.nombre);
}
```

Podem proporcionar el valor en crear l'objecte:

```dart
Persona persona = Persona('12345678A', 'Ana');
```

però posteriorment no podrem modificar-lo:

```dart
persona.dni = '87654321B'; // Error
```

L'ús de `final` serà molt habitual quan comencem a treballar amb Flutter.

### Constructors constants

Si tots els atributs que representen l'estat d'una classe són `final`, podem definir un **constructor constant** mitjançant `const`:

```dart
class Punto {
  final double x;
  final double y;

  const Punto(this.x, this.y);
}
```

Això permet crear objectes constants:

```dart
const punto = Punto(10, 20);
```

Els objectes constants poden ser determinats en temps de compilació i Dart pot **reutilitzar instàncies constants equivalents**, evitant crear objectes innecessaris.

Els constructors `const` tindran especial importància en Flutter, on trobarem contínuament widgets creats mitjançant:

```dart
const Text('Hola')
```

### Getters i setters

Els **getters** i **setters** permeten controlar l'accés i modificació de les propietats d'un objecte.

En Dart es defineixen mitjançant les paraules clau `get` i `set`.

Per exemple:

```dart
class Persona {
  String _nombre;
  int _edad;

  Persona(this._nombre, this._edad);

  // Getter
  String get nombre => _nombre;

  int get edad => _edad;

  // Setter
  set edad(int nuevaEdad) {
    if (nuevaEdad >= 0) {
      _edad = nuevaEdad;
    }
  }
}
```

Podem utilitzar-los com si foren propietats:

```dart
void main() {
  Persona persona = Persona('Ana', 25);

  // Utilitzem el getter
  print(persona.edad); // 25
  // Utilitzem el setter
  persona.edad = 30;

  print(persona.edad); // 30
}
```

Encara que internament estem utilitzant mètodes `get` i `set`, en accedir a ells **no utilitzem parèntesis**

:::note

En Dart, el guió baix `_` al principi d'un identificador té un significat especial: indica que eixe element és **privat a la seua biblioteca (*****library*****)**.

Per exemple:

```
class Persona {  String _nombre;  int _edad;
  Persona(this._nombre, this._edad);}
```

Ací `_nombre` i `_edad` són membres privats.

Això és important perquè Dart **no utilitza paraules clau com `private`, `public` o `protected`**, habituals en llenguatges com Java.

:::

#### Mini Task Manager: controlar l'estat de finalització

En la classe `Tarea`, substituïm l'atribut públic `bool completada;` per un camp privat i un getter:

```dart
bool _completada;

bool get completada => _completada;
```

Substituïm també el constructor i el mètode `completar()` per estes versions. La resta de la classe i el `main()` anterior es mantenen:

```dart
Tarea({
  required this.titulo,
  required this.fechaLimite,
  bool completada = false,
}) : _completada = completada;

void completar() {
  _completada = true;
}
```

El codi que utilitza la tasca pot consultar `tarea.completada` i cridar a `tarea.completar()`. Com no hem definit un setter, `tarea.completada = true` produeix un error de compilació.

La privacitat de `_completada` s'aplica a la **biblioteca**, no únicament a la classe: un altre codi del mateix arxiu pot accedir al camp privat. Per a comprovar l'encapsulació des de fora, guarda `Tarea` en `tarea.dart` i importa-la des de `main.dart`.

### Constructors `factory`

Dart proporciona també els constructors `factory`. A diferència d'un constructor generatiu convencional, un constructor `factory` **no està obligat a crear sempre una nova instància**.

Per exemple, pot retornar un objecte creat prèviament:

```dart
class Configuracion {
  static final Configuracion _instancia = Configuracion._interno();

  Configuracion._interno();

  factory Configuracion() {
    return _instancia;
  }
}
```

D'esta forma:

```dart
var config1 = Configuracion();
var config2 = Configuracion();

print(identical(config1, config2)); // true
```

totes dues variables fan referència a la mateixa instància.

Els constructors `factory` resulten útils per a implementar patrons de creació, reutilitzar objectes existents o decidir quina instància retornar.
