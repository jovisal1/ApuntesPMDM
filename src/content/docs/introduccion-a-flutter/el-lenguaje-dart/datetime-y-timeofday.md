---
title: "DateTime y TimeOfDay"
sidebar:
  label: "DateTime y TimeOfDay"
  order: 14
---

A la hora de manejar fechas y horas, Flutter dispone de la clases [`DateTime`](https://api.flutter.dev/flutter/dart-core/DateTime-class.html) `y` [`TimeOfDay`](https://api.flutter.dev/flutter/material/TimeOfDay-class.html). Saber cómo utilizar ambas es fundamental para trabajar con información relacionada con tiempos como fechas actuales, diferencias entre fechas, y el formateo de fechas y horas en tus aplicaciones.

## **DateTime**

DateTime nos permite gestionar información de tiempo en la que se incluye tanto la fecha como la hora. Podemos crear instancias de `DateTime` de varias maneras:

* Con una fecha y hora específicas.
* Utilizando la fecha y hora actual.
* Parseando una fecha a partir de un string.

```dart
// Fecha y hora actuales
DateTime ahora = DateTime.now();

// Creación de un objeto con una fecha específica
DateTime fechaEspecifica = DateTime(2024, 10, 3, 16, 30);

// Parseo desde un string
DateTime parsedDate = DateTime.parse("2024-10-03 16:30:00");
```

### **Propiedades**

La clase `DateTime` tiene propiedades para acceder a diferentes partes de la fecha y la hora. Por ejemplo:

* `year`: El año.
* `month`: El mes (1-12).
* `day`: El día del mes (1-31).
* `hour`: La hora del día (0-23).
* `minute`: El minuto (0-59).
* `second`: El segundo (0-59).
* `weekday`: El día de la semana (1-7, donde 1 es lunes).

```dart
DateTime fecha = DateTime.now();
print("Año: ${fecha.year}");
print("Mes: ${fecha.month}");
print("Día: ${fecha.day}");
print("Hora: ${fecha.hour}");
```

### Posibles usos

Podemos utilizar la clase DateTime para casos como los siguientes:

* **Comparación de fechas.** Podemos comparar fechas utilizando operadores como `isBefore`, `isAfter`, y `isAtSameMomentAs`.

```dart
DateTime fecha1 = DateTime(2023, 5, 10);
DateTime fecha2 = DateTime(2023, 5, 15);

print(fecha1.isBefore(fecha2)); // true
print(fecha1.isAfter(fecha2));  // false
```

* **Manipulación de fechas**: Podemos sumar o restar tiempo a un objeto `DateTime` utilizando los métodos `add` y `subtract`, que utilizan como argumento un `Duration`.

```dart
DateTime hoy = DateTime.now();

// Añadir 10 días
DateTime diezDiasDespues = hoy.add(Duration(days: 10));

// Restar 5 horas
DateTime cincoHorasAntes = hoy.subtract(Duration(hours: 5));
```

* **Diferencias entre fechas**: El método `difference` devuelve un objeto `Duration`, que representa la diferencia entre dos fechas.

```dart
DateTime inicio = DateTime(2023, 10, 3);
DateTime fin = DateTime(2023, 10, 10);

Duration diferencia = fin.difference(inicio);
print("Diferencia en días: ${diferencia.inDays}"); // 7 días
```

* **Formato de fechas**. Podemos formatear fechas en un formato más legible (por ejemplo, `dd-MM-yyyy`) si utilizamos `DateTime` junto con el paquete `intl` (que deberemos instalar ya que Flutter no lo incluye por defecto).

```dart
import 'package:intl/intl.dart';

DateTime ahora = DateTime.now();
String formattedDate = DateFormat('dd-MM-yyyy').format(ahora);

print(formattedDate);  // Ejemplo de salida: 03-10-2024
```

* **Uso en Widgets.** Como no, podemos utilizar objetos `DateTime` en widgets como `Text` para mostrar la fecha y hora, o en widgets interactivos como `showDatePicker` para que los usuarios seleccionen una fecha.

Ejemplo de mostrar una fecha en un widget `Text`:

```dart
Text(
  "Fecha actual: ${DateTime.now().toString()}",
);
```

#### Ejemplo de uso completo:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('Ejemplo DateTime')),
        body: Center(
          child: DateTimeExample(),
        ),
      ),
    );
  }
}

class DateTimeExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    DateTime now = DateTime.now();
    DateTime futureDate = now.add(Duration(days: 30));

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text('Fecha y hora actual: $now'),
        SizedBox(height: 20),
        Text('Fecha futura (30 días después): $futureDate'),
      ],
    );
  }
}
```

### Mini Task Manager: fechas de entrega

En la clase `Tarea` de la sección HTTP, añade estos getters:

```dart
bool get estaVencida => fechaLimite.isBefore(DateTime.now());

int get diasRestantes =>
    fechaLimite.difference(DateTime.now()).inDays;
```

`estaVencida` compara el instante límite con el actual, independientemente de si la tarea está completada. Si quieres localizar tareas pendientes y vencidas, comprueba `!tarea.completada && tarea.estaVencida`.

Conservando esa clase, puedes probar las fechas con este `main()` independiente de la descarga:

```dart
void main() {
  final ahora = DateTime.now();
  final entrega = DateTime(2026, 10, 10, 23, 59);
  final tarea = Tarea(
    titulo: 'Entregar proyecto',
    fechaLimite: entrega,
  );

  print(ahora);
  print(entrega);
  print(entrega.isAfter(ahora));
  print('Vencida: ${tarea.estaVencida}');
  print('Quedan ${tarea.diasRestantes} días completos');

  final manana = ahora.add(const Duration(days: 1));
  final haceUnaSemana = ahora.subtract(const Duration(days: 7));
  print('Mañana: $manana');
  print('Hace una semana: $haceUnaSemana');
}
```

El resultado depende de cuándo ejecutes el programa. **¿Cómo implementarías `estaVencida` y `diasRestantes` antes de consultar los getters?** Prueba también una tarea cuyo límite sea un minuto antes de `ahora`.

`inDays` cuenta periodos completos de 24 horas y trunca hacia cero: una fecha vencida hace una hora puede dar `0` días restantes. Para decidir si está vencida, utiliza la comparación de fechas. Además, sumar una duración de 24 horas puede cambiar la hora local al cruzar un cambio de horario de verano.

Para dar a las tareas descargadas una fecha local de ejemplo, cambia **solo** la asignación de `fechaLimite` en `Tarea.fromJson()` por:

```dart
fechaLimite: DateTime.now().add(const Duration(days: 1)),
```

Es una fecha generada por nuestra aplicación; no un dato recibido de JSONPlaceholder.

## TimeOfDay

A diferencia de la clase `DateTime`, que maneja tanto la fecha como la hora, `TimeOfDay` se enfoca exclusivamente en la hora, con un formato de 24 horas por defecto.

Es especialmente útil para trabajar con tiempos cuando solo necesitamos manejar la hora, como en casos en los que los usuarios deben seleccionar una hora específica en un formulario (por ejemplo, la hora de una cita o un recordatorio).

:::caution

un pequeño matiz importante: **`TimeOfDay` no pertenece a Dart puro, sino a Flutter (`package:flutter/material.dart`)**. Por tanto, en una aplicación ejecutada con `dart run` no podemos trabajar realmente con `TimeOfDay`

:::

Podemos crear instancias de `TimeOfDay` de varias maneras, principalmente usando una hora y minutos específicos, o utilizando el método `now()` para obtener la hora actual.

```dart
// Crear un TimeOfDay con una hora y minutos específicos
TimeOfDay horaEspecifica = TimeOfDay(hour: 14, minute: 30);

// Obtener la hora actual
TimeOfDay horaActual = TimeOfDay.now();
```

### **Propiedades**

La clase `TimeOfDay` tiene dos propiedades clave:

* `hour`: La hora en formato de 24 horas (0-23).
* `minute`: Los minutos (0-59).

```dart
TimeOfDay ahora = TimeOfDay.now();
print("Hora: ${ahora.hour}");
print("Minutos: ${ahora.minute}");
```

### **Posibles usos**

Podemos utilizar la clase `TimeOfDay` para casos como los siguientes:

* **Formato de 12 horas**: Aunque internamente utiliza el formato de 24 horas, también podemos convertir el tiempo a formato de 12 horas utilizando el método `period` (que indica si es AM o PM) y el método `hourOfPeriod`, que devuelve la hora en formato de 12 horas.

```dart
TimeOfDay ahora = TimeOfDay.now();

String periodo = ahora.period == DayPeriod.am ? "AM" : "PM";
int hora12 = ahora.hourOfPeriod;

print("Hora en formato 12 horas: $hora12 $periodo");
```

* **Método `replacing().`** Podemos usar este método para crear una nueva instancia de `TimeOfDay` reemplazando uno o ambos valores (hora y minuto).

```dart
TimeOfDay ahora = TimeOfDay.now();
TimeOfDay nuevaHora = ahora.replacing(hour: 16);
print("Nueva hora: ${nuevaHora.hour}:${nuevaHora.minute}");
```

* **Uso con `showTimePicker()`**: La clase `TimeOfDay` se utiliza con el widget `showTimePicker()` para mostrar un selector de tiempo. Este selector permite al usuario seleccionar una hora específica y devuelve un objeto `TimeOfDay` con el valor seleccionado.

```dart
Future<void> _seleccionarHora(BuildContext context) async {
  TimeOfDay? horaSeleccionada = await showTimePicker(
    context: context,
    initialTime: TimeOfDay.now(),
  );

  if (horaSeleccionada != null) {
    print("Hora seleccionada: ${horaSeleccionada.hour}:${horaSeleccionada.minute}");
  }
}
```

* **Comparación entre tiempos**: Aunque `TimeOfDay` no tiene un método específico para comparar dos objetos, podemos convertir las horas y minutos a minutos totales (hora \* 60 + minuto) para hacer comparaciones.

```dart
bool esAntes(TimeOfDay t1, TimeOfDay t2) {
  return (t1.hour * 60 + t1.minute) < (t2.hour * 60 + t2.minute);
}

TimeOfDay hora1 = TimeOfDay(hour: 10, minute: 30);
TimeOfDay hora2 = TimeOfDay(hour: 12, minute: 45);

print(esAntes(hora1, hora2)); // true
```

### Mini Task Manager: una hora de recordatorio

`TimeOfDay` pertenece a **Flutter**, mientras que `DateTime` forma parte de Dart. Un recordatorio diario a las 18:30 necesita una hora del día; una entrega el 10 de octubre de 2026 a las 18:30 necesita también una fecha.

Este pequeño ejemplo se ejecuta en un proyecto Flutter, con el import de Material. Es independiente del programa de consola anterior:

```dart
import 'package:flutter/material.dart';

class RecordatorioDiario {
  final String titulo;
  final TimeOfDay hora;

  RecordatorioDiario({required this.titulo, required this.hora});
}

void main() {
  final recordatorio = RecordatorioDiario(
    titulo: 'Revisar tareas pendientes',
    hora: const TimeOfDay(hour: 18, minute: 30),
  );
  final entrega = DateTime(2026, 10, 10, 18, 30);

  print('${recordatorio.titulo}: '
      '${recordatorio.hora.hour}:${recordatorio.hora.minute}');
  print('Entrega concreta: $entrega');
}
```

Este `main()` muestra datos en la consola; no crea una interfaz ni programa una notificación. Si la hora se añade como atributo de una tarea de Flutter, podría declararse `final TimeOfDay hora;` junto con su fecha. El modelo de consola debe seguir utilizando tipos de Dart.

**Si una tarea se repite todos los días a las 18:30, ¿qué aporta `TimeOfDay` y qué información adicional necesitaríamos para programar el próximo aviso?** La hora por sí sola no contiene ni fecha ni zona horaria.

### Mini Task Manager: integrar objetos, HTTP, errores y fechas

Vuelve al proyecto de consola: conserva los imports de `dart:convert` y `http`, la clase `Tarea` con `fromJson` y los getters de fechas, y la función HTTP `descargarTareas()`. Sustituye su `main()` por:

```dart
Future<void> main() async {
  try {
    print('📡 Descargando tareas...');
    final tareas = await descargarTareas();

    for (final tarea in tareas) {
      tarea.mostrar();
      print('Vencida: ${tarea.estaVencida}');
      print('Días completos restantes: ${tarea.diasRestantes}');
    }
  } catch (e) {
    print('❌ No se pudieron cargar las tareas: $e');
  } finally {
    print('👋 Aplicación finalizada');
  }
}
```

Hemos comenzado creando un objeto y ahora descargamos una lista de tareas, convertimos JSON en instancias, gestionamos fallos y consultamos fechas. La herencia permite introducir tareas especializadas; el ejemplo de `TimeOfDay` añade una hora de recordatorio cuando pasamos a Flutter.

Como práctica, provoca un error cada vez: crea una tarea sin título, elimina un `await`, utiliza una ruta HTTP inexistente o establece una fecha pasada. Predice el resultado y explica qué parte del programa lo detecta.
