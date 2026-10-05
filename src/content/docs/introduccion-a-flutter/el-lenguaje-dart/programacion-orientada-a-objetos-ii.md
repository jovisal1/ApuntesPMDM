---
title: "Programación Orientada a Objetos (II)"
sidebar:
  label: "Programación Orientada a Objetos (II)"
  order: 10
---

## Herencia

En programación orientada a objetos, la herencia es un mecanismo que permite a una clase (llamada **subclase** o **clase hija**) heredar las propiedades y métodos de otra clase (llamada **superclase** o **clase padre**). Esto significa que la subclase automáticamente adquiere las características de la superclase, además de poder tener sus propias características adicionales.&#x20;

Algunas de las ventajas de usar herencia en nuestros desarrollos son:

* **Reutilización de código:** Evita repetir código al crear clases similares.
* **Organización de código:** Ayuda a estructurar el código de manera jerárquica, lo que facilita la comprensión y el mantenimiento.
* **Polimorfismo:** Permite que objetos de diferentes clases se traten como si fueran de la misma clase, lo que agrega flexibilidad al código.

En Dart, la herencia se implementa utilizando la palabra clave `extends`. Por ejemplo:

```dart
class Animal {
  String nombre;
  int edad;

  void comer() {
    print('El animal está comiendo.');
  }
}

class Perro extends Animal {
  void olfatear() {
    print('El perro olfatea!');
  }
}
```

En este ejemplo:

* `Animal` es la superclase. Tiene las propiedades `nombre` y `edad`, y el método `comer()`.
* `Perro` es la subclase de `Animal`. Hereda todas las propiedades y métodos de `Animal` y además tiene su propio método `olfatear()`.

:::note

Dart permite herencia simple. Esto es, Una clase solo puede extender de una única superclase.

:::

### **Sobreescritura de métodos**

Puede que en ciertos casos una subclase necesite modificar un cierto comportamiento heredado de su clase padre. Por ejemplo, imaginad que incorporamos a la clase `Animal`un método `hacerRuido()`. Cuando creamos la subclase`Perro`, podemos querer definir nuestra propia versión del método `hacerRuido()`. Esto significa que un `Perro` hará un ruido diferente a un `Gato`, aunque ambos hereden de la clase `Animal`. Esta capacidad de redefinir un método en una subclase se conoce como **sobreescritura de métodos**.

La sobreescritura de métodos permite que objetos de diferentes clases se traten como si fueran de la misma clase, pero con comportamientos específicos permitiendo una mayor especialización de los métodos si fuese necesario.

<pre class="language-dart"><code class="lang-dart">class Animal {
<strong>  String nombre;
</strong>  int edad;

  void comer() {
    print('El animal está comiendo.');
  } 
  
  void hacerRuido() {
    print('El animal hace un ruido.');
  }
}

class Perro extends Animal {
  void olfatear() {
    print('El perro olfatea!');
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

En este ejemplo:

* La clase `Animal` tiene dos métodos genéricoss: `hacerRuido()` y `comer()` .
* La clase `Perro` sobreescribe el método `hacerRuido()` para hacer que el perro ladre y añade otro propio `olfatear()`.
* La clase `Gato` también sobreescribe `hacerRuido()` para hacer que el gato maúlle.

:::note

Como podemos deducir del anterior ejemplo, debemos tener en cuenta dos detalles a la hora de sobreescribir métodos:

* **La palabra clave `@override`:** Esta anotación indica al compilador que estamos intencionalmente redefiniendo un método heredado.
* **Firma del método:** El método sobreescrito debe tener exactamente la misma firma (nombre, tipo de retorno y parámetros) que el método original en la superclase.
  
:::

### Mini Task Manager: tareas urgentes y polimorfismo

Ahora distinguimos tareas normales y urgentes. Esta versión completa sustituye a la clase del capítulo anterior; conserva los parámetros nombrados y el estado encapsulado. El getter `descripcion` permite que cada clase describa sus objetos de forma diferente:

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
      '$titulo - ${completada ? "Completada" : "Pendiente"}';

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
      '🔥 ${super.descripcion} - Prioridad $prioridad';
}

void main() {
  final tareas = <Tarea>[
    Tarea(
      titulo: 'Preparar apuntes',
      fechaLimite: DateTime(2026, 10, 6),
    ),
    TareaUrgente(
      titulo: 'Entregar proyecto',
      fechaLimite: DateTime(2026, 10, 5),
      prioridad: 10,
    ),
  ];

  for (final tarea in tareas) {
    tarea.mostrar();
  }
}
```

El constructor de `TareaUrgente` utiliza `super(...)` para inicializar la parte heredada. Su getter utiliza `super.descripcion` para conservar el título y el estado que calcula la clase base.

**Si la lista es `List<Tarea>`, ¿por qué se ejecuta el getter de `TareaUrgente` para el segundo objeto?** El tipo real del objeto determina qué implementación sobrescrita se utiliza: esto es **polimorfismo**. Incluso el método heredado `mostrar()` utiliza la versión de `descripcion` correspondiente al objeto.

:::tip[Comprueba el comportamiento]
Completa la tarea urgente antes del bucle. Su descripción debe mostrar tanto «Completada» como su prioridad. Quita después `extends Tarea` y observa por qué deja de encajar en la lista.
:::

### super

La palabra clave `super` en Dart es fundamental para interactuar con la superclase en el contexto de la herencia ya que nos permite:

* **Tener acceso a miembros de la superclase:** Cuando una subclase necesita acceder a un miembro (propiedad o método) de su superclase que ha sido sobreescrito, utiliza `super`. Esto permite invocar la versión original del miembro.
* **Llamar al constructor de la superclase:** En el constructor de una subclase, se utiliza `super` para llamar al constructor de la superclase y así inicializar las propiedades heredadas.

```dart
class Animal {
  String nombre;

  Animal(this.nombre) {
    print('Se creó un animal llamado $nombre.');
  }

  void comer() {
    print('El animal está comiendo.');
  }
}

class Perro extends Animal {
  String raza;

  Perro(String nombre, this.raza) : super(nombre) {
    print('Se creó un perro de raza $raza.');
  }

  @override
  void comer() {
    print('El perro está comiendo croquetas.');
  }

  void jugar() {
    super.comer(); // Llama al método comer() de la superclase
    print('¡El perro está jugando!');
  }
}
```

En este ejemplo, en el constructor de `Perro`, `super(nombre)` llama al constructor de `Animal` para inicializar la propiedad `nombre`.

Por otra parta, en el método `jugar()`, `super.comer()` llama a la versión original del método `comer()` de la clase `Animal`, incluso aunque `Perro` haya sobreescrito este método.

:::note

Al igual que en la sobreescritura de métodos, con el uso de super también tenemos que tener en cuenta algunos detalles:

* **Orden de inicialización:** El constructor de la superclase siempre se ejecuta antes que el constructor de la subclase.
* **Visibilidad:** `super` solo se puede utilizar dentro de una subclase para acceder a miembros de la superclase.
  
:::

### Clases abstractas

Una clase abstracta es una clase que no puede ser instanciada directamente. Sirve como un "plan" o "contrato" que define una estructura básica y un conjunto de métodos que deben ser implementados por sus subclases. Es decir, una clase abstracta establece un conjunto de reglas que las clases que la heredan deben seguir.

**Características principales:**

* **No se pueden instanciar:** No puedes crear objetos directamente de una clase abstracta.
* **Contienen métodos abstractos:** Estos métodos solo tienen una declaración, pero no una implementación. La implementación concreta se deja a las subclases. Será obligatorio que al menos una clase hija implemente los métodos que sean abstractos.
* **Pueden contener métodos con implementación:** Además de los métodos abstractos, una clase abstracta puede tener métodos con una implementación por defecto, que las subclases pueden sobreescribir si lo desean.

```dart
abstract class Animal {
  void comer(); // Método abstracto
  void dormir() {
    print('El animal está durmiendo.'); // Método con implementación por defecto
  }
}

class Perro extends Animal {
  @override
  void comer() {
    print('El perro está comiendo croquetas.');
  }
}
```

Como podemos observar, `Animal` es una clase abstracta que define dos métodos: `comer()` (abstracto) y `dormir()` (con implementación por defecto). Por su parte, `Perro` es una subclase de `Animal` y debe implementar el método abstracto `comer()`.

## Mixins

**Un mixin es una clase especial que define un conjunto de métodos y propiedades que pueden ser "mezclados" en otras clases.** Esto nos permite compartir código de manera más granular y evitar la creación de jerarquías de herencia innecesarias. Por ejemplo, en Flutter, los mixins se utilizan a menudo para agregar comportamientos a los widgets.

A la hora de utilizar Mixins necesitamos tener en cuenta:

* **Declaración:** Se declaran usando la palabra clave `mixin` seguida del nombre del mixin.
* **Uso:** Se "mezclan" en una clase utilizando la palabra clave `with` después de la declaración de la clase.
* **Características:**
  * Un mixin puede contener métodos, propiedades y variables.
  * No puede tener constructores.
  * No puede extender otras clases o mixins.

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
  persona.log('Hola desde el mixin');
}
```

En este ejemplo:

* `Logeable` es un mixin que define un método `log` para registrar mensajes.
* `Persona` es una clase que "mezcla" el mixin `Logeable`, por lo que puede utilizar el método `log`.

:::note

Consideraciones importantes sobre los mixins:

* **Conflictos de nombres:** Si dos mixins o una clase y un mixin tienen miembros con el mismo nombre, puede haber conflictos.
* **Orden de mezcla:** El orden en que se mezclan los mixins puede afectar el comportamiento de la clase.&#x20;
  
:::
