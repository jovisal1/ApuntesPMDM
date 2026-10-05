---
title: "Programación Orientada a Objetos"
sidebar:
  label: "Programación Orientada a Objetos"
  order: 9
---

https\://dart.dev/language/classes

La programación orientada a objetos (POO) es un modelo de programación en el que el diseño de software se organiza alrededor de datos u objetos, en vez de usar funciones y lógica. Se enfoca en los objetos que los programadores necesitan manipular, en lugar de centrarse en la lógica necesaria para esa manipulación. Un objeto se puede definir como un campo de datos con atributos y comportamientos únicos.

**Dart es un lenguaje orientado a objetos** con clases **y herencia basada en mixin** (que veremos más adelante) . Cada objeto es una instancia de una clase y todas las clases, excepto `Null`, descienden de `Object`. &#x20;

Asumiendo que ya disponemos de conocimientos previos sobre POO, veámos los principales elementos que caracterizan a la Programación Orientada a Objetos en Dart.&#x20;

## Ejemplo conductor: Mini Task Manager

A lo largo de estas seis secciones construiremos un pequeño gestor de tareas. Empezaremos modelando una tarea, incorporaremos herencia y validación, simularemos una descarga y después obtendremos datos de una API. Finalmente, trabajaremos con fechas de entrega y horas de recordatorio.

Antes de programar, piensa: **¿qué propiedades debería tener una tarea y qué acciones podríamos realizar con ella?** Usaremos un título, un estado de finalización y una fecha límite. Por ahora, basta con saber que `DateTime` representa una fecha y una hora; lo estudiaremos en la última sección.

### Clases y objetos

Una **clase** define la estructura y el comportamiento que tendrán los objetos creados a partir de ella. Dentro de una clase podemos declarar principalmente:

* **Atributos**, que representan el estado o las propiedades del objeto.
* **Métodos**, que definen su comportamiento.
* **Constructores**, que permiten crear e inicializar nuevas instancias.

Por ejemplo:

```dart
class Persona {
  String nombre;
  int edad;

  Persona(this.nombre, this.edad);

  void saludar() {
    print('Hola, me llamo $nombre y tengo $edad años.');
  }
}

void main() {
  Persona persona = Persona('Ana', 25);
  persona.saludar();
}
```

En este ejemplo, `Persona` es la clase y `persona` es un **objeto o instancia** de dicha clase.

Podemos acceder a sus atributos y métodos utilizando el operador `.`:

```dart
print(persona.nombre);
print(persona.edad);
persona.saludar();
```

:::note

A diferencia de lenguajes como Java, en Dart no es necesario que la función `main()` pertenezca a una clase. Podemos declararla directamente a nivel de archivo.

:::

### Atributos

Los **atributos**, también denominados *variables de instancia* o *campos*, representan las propiedades y el estado de los objetos de una clase.

```dart
class Persona {
  String nombre;
  int edad;

  Persona(this.nombre, this.edad);
}
```

Cada instancia mantiene sus propios valores:

```dart
void main() {
  Persona persona1 = Persona('Juan', 25);
  Persona persona2 = Persona('Ana', 30);

  print(persona1.nombre); // Juan
  print(persona2.nombre); // Ana
}
```

#### Atributos estáticos

Cuando declaramos un atributo mediante `static`, este **pertenece a la clase y no a cada una de sus instancias**.

Por tanto, su valor es compartido:

```dart
class Persona {
  String nombre;
  static int totalPersonas = 0;

  Persona(this.nombre) {
    totalPersonas++;
  }
}
```

Podemos acceder a un miembro estático directamente mediante el nombre de la clase:

```dart
void main() {
  Persona persona1 = Persona('Juan');
  Persona persona2 = Persona('Ana');
  print(Persona.totalPersonas); // 2
}
```

Observa que utilizamos:

```dart
Persona.totalPersonas
```

y no una instancia concreta, ya que `totalPersonas` pertenece a la propia clase.

### Métodos

Los **métodos** son funciones declaradas dentro de una clase y permiten definir el comportamiento de sus objetos.

Además, pueden acceder directamente a los atributos de la instancia:

```dart
class Persona {
  String nombre;
  int edad;

  Persona(this.nombre, this.edad);

  void saludar() {
    print('Hola, soy $nombre');
  }

  void cumplirAnios() {
    edad++;
  }
}
```

Podemos invocarlos a través de una instancia:

```dart
void main() {
  Persona persona = Persona('Ana', 25);

  persona.saludar();
  persona.cumplirAnios();
  print(persona.edad); // 26
}
```

Al igual que ocurre con los atributos, también podemos definir **métodos estáticos** mediante `static`. Estos pertenecen a la clase y pueden utilizarse sin crear previamente una instancia.

### Constructores

Los **constructores** permiten crear e inicializar los objetos de una clase.

En Dart, el constructor generativo básico tiene el mismo nombre que la clase:

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

Sin embargo, Dart proporciona una sintaxis mucho más compacta cuando los parámetros del constructor se utilizan directamente para inicializar atributos:

```dart
class Persona {
  String nombre;
  int edad;

  Persona(this.nombre, this.edad);
}
```

Ambas versiones realizan esencialmente la misma inicialización.

La expresión:

```dart
this.nombre
```

hace referencia al atributo `nombre` de la instancia que estamos creando.

Podemos crear objetos mediante:

```dart
Persona persona = Persona('Ana', 25);
```

#### Mini Task Manager: nuestra primera tarea

Reunimos clases, atributos, métodos y constructores en un programa completo:

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

`Tarea` es la clase y `tarea` es una instancia. El constructor usa **parámetros nombrados**: `required` obliga a proporcionar el título y la fecha, mientras que `completada` tiene un valor por defecto. El método `completar()` cambia el estado del objeto y `mostrar()` permite observarlo.

Aunque la variable `tarea` sea `final`, sus atributos pueden cambiar: no podemos asignarle otro objeto, pero sí modificar el objeto al que hace referencia.

:::tip[Predice y prueba]
¿Qué mostrarán las dos llamadas a `mostrar()`? Después, crea una segunda tarea y completa solo la primera. Comprueba que cada objeto conserva su propio estado.
:::

#### Constructores con nombre

Dart no utiliza la sobrecarga tradicional de constructores de la misma forma que lenguajes como Java. En su lugar, podemos definir **constructores con nombre** (*named constructors*) para proporcionar diferentes formas de crear un objeto.

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

Ahora podemos crear objetos de dos formas:

```dart
Persona persona1 = Persona('Ana', 25);
Persona persona2 = Persona.invitado();
```

Los constructores con nombre permiten además que el propio nombre indique **la finalidad de cada forma de construcción**.

### Lista de inicializadores

Dart permite inicializar atributos **antes de ejecutar el cuerpo del constructor** mediante una lista de inicializadores.

Esta se coloca después de `:`:

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

Las asignaciones:

```dart
nombre = nombre,
edad = 18
```

se realizan antes de ejecutar el cuerpo `{ }` del constructor.

Las listas de inicializadores serán especialmente útiles para **inicializar atributos `final`, realizar cálculos previos o delegar en otros constructores**.

### Atributos `final`

La palabra clave `final` permite declarar atributos cuyo valor **solo puede asignarse una vez**.

```dart
class Persona {
  final String dni;
  String nombre;

  Persona(this.dni, this.nombre);
}
```

Podemos proporcionar el valor al crear el objeto:

```dart
Persona persona = Persona('12345678A', 'Ana');
```

pero posteriormente no podremos modificarlo:

```dart
persona.dni = '87654321B'; // Error
```

El uso de `final` será muy habitual cuando comencemos a trabajar con Flutter.

### Constructores constantes

Si todos los atributos que representan el estado de una clase son `final`, podemos definir un **constructor constante** mediante `const`:

```dart
class Punto {
  final double x;
  final double y;

  const Punto(this.x, this.y);
}
```

Esto permite crear objetos constantes:

```dart
const punto = Punto(10, 20);
```

Los objetos constantes pueden ser determinados en tiempo de compilación y Dart puede **reutilizar instancias constantes equivalentes**, evitando crear objetos innecesarios.

Los constructores `const` tendrán especial importancia en Flutter, donde encontraremos continuamente widgets creados mediante:

```dart
const Text('Hola')
```

### Getters y setters

Los **getters** y **setters** permiten controlar el acceso y modificación de las propiedades de un objeto.

En Dart se definen mediante las palabras clave `get` y `set`.

Por ejemplo:

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

Podemos utilizarlos como si fueran propiedades:

```dart
void main() {
  Persona persona = Persona('Ana', 25);

  // Utilizamos el getter
  print(persona.edad); // 25
  // Utilizamos el setter
  persona.edad = 30;

  print(persona.edad); // 30
}
```

Aunque internamente estamos utilizando métodos `get` y `set`, al acceder a ellos **no utilizamos paréntesis**

:::note

En Dart, el guion bajo `_` al principio de un identificador tiene un significado especial: indica que ese elemento es **privado a su biblioteca (*****library*****)**.

Por ejemplo:

```
class Persona {  String _nombre;  int _edad;
  Persona(this._nombre, this._edad);}
```

Aquí `_nombre` y `_edad` son miembros privados.

Esto es importante porque Dart **no utiliza palabras clave como `private`, `public` o `protected`**, habituales en lenguajes como Java.

:::

#### Mini Task Manager: controlar el estado de finalización

En la clase `Tarea`, sustituimos el atributo público `bool completada;` por un campo privado y un getter:

```dart
bool _completada;

bool get completada => _completada;
```

Sustituimos también el constructor y el método `completar()` por estas versiones. El resto de la clase y el `main()` anterior se mantienen:

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

El código que utiliza la tarea puede consultar `tarea.completada` y llamar a `tarea.completar()`. Como no hemos definido un setter, `tarea.completada = true` produce un error de compilación.

La privacidad de `_completada` se aplica a la **biblioteca**, no únicamente a la clase: otro código del mismo archivo puede acceder al campo privado. Para comprobar la encapsulación desde fuera, guarda `Tarea` en `tarea.dart` e impórtala desde `main.dart`.

### Constructores `factory`

Dart proporciona también los constructores `factory`. A diferencia de un constructor generativo convencional, un constructor `factory` **no está obligado a crear siempre una nueva instancia**.

Por ejemplo, puede devolver un objeto creado previamente:

```dart
class Configuracion {
  static final Configuracion _instancia = Configuracion._interno();

  Configuracion._interno();

  factory Configuracion() {
    return _instancia;
  }
}
```

De esta forma:

```dart
var config1 = Configuracion();
var config2 = Configuracion();

print(identical(config1, config2)); // true
```

ambas variables hacen referencia a la misma instancia.

Los constructores `factory` resultan útiles para implementar patrones de creación, reutilizar objetos existentes o decidir qué instancia devolver.
