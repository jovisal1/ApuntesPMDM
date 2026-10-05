---
title: "DateTime i TimeOfDay"
sidebar:
  label: "DateTime i TimeOfDay"
  order: 14
---

A l'hora de gestionar dates i hores, Flutter disposa de les classes [`DateTime`](https://api.flutter.dev/flutter/dart-core/DateTime-class.html) `y` [`TimeOfDay`](https://api.flutter.dev/flutter/material/TimeOfDay-class.html). Saber com utilitzar ambdues és fonamental per a treballar amb informació relacionada amb temps com ara dates actuals, diferències entre dates i el format de dates i hores en les teues aplicacions.

## **DateTime**

DateTime ens permet gestionar informació de temps en la qual s'inclou tant la data com l'hora. Podem crear instàncies de `DateTime` de diverses maneres:

* Amb una data i hora específiques.
* Utilitzant la data i hora actual.
* Analitzant una data a partir d'un string.

```dart
// Data i hora actuals
DateTime ahora = DateTime.now();

// Creació d'un objecte amb una data específica
DateTime fechaEspecifica = DateTime(2024, 10, 3, 16, 30);

// Analitze des d'un string
DateTime parsedDate = DateTime.parse("2024-10-03 16:30:00");
```

### **Propietats**

La classe `DateTime` té propietats per a accedir a diferents parts de la data i l'hora. Per exemple:

* `year`: L'any.
* `month`: El mes (1-12).
* `day`: El dia del mes (1-31).
* `hour`: L'hora del dia (0-23).
* `minute`: El minut (0-59).
* `second`: El segon (0-59).
* `weekday`: El dia de la setmana (1-7, on 1 és dilluns).

```dart
DateTime fecha = DateTime.now();
print("Any: ${fecha.year}");
print("Mes: ${fecha.month}");
print("Dia: ${fecha.day}");
print("Hora: ${fecha.hour}");
```

### Possibles usos

Podem utilitzar la classe DateTime per a casos com els següents:

* **Comparació de dates.** Podem comparar dates utilitzant operadors com `isBefore`, `isAfter`, i `isAtSameMomentAs`.

```dart
DateTime fecha1 = DateTime(2023, 5, 10);
DateTime fecha2 = DateTime(2023, 5, 15);

print(fecha1.isBefore(fecha2)); // true
print(fecha1.isAfter(fecha2));  // false
```

* **Manipulació de dates**: Podem sumar o restar temps a un objecte `DateTime` utilitzant els mètodes `add` i `subtract`, que utilitzen com a argument un `Duration`.

```dart
DateTime hoy = DateTime.now();

// Afegir 10 dies
DateTime diezDiasDespues = hoy.add(Duration(days: 10));

// Restar 5 hores
DateTime cincoHorasAntes = hoy.subtract(Duration(hours: 5));
```

* **Diferències entre dates**: El mètode `difference` retorna un objecte `Duration`, que representa la diferència entre dues dates.

```dart
DateTime inicio = DateTime(2023, 10, 3);
DateTime fin = DateTime(2023, 10, 10);

Duration diferencia = fin.difference(inicio);
print("Diferència en dies: ${diferencia.inDays}"); // 7 dies
```

* **Format de dates**. Podem formatar dates en un format més llegible (per exemple, `dd-MM-yyyy`) si utilitzem `DateTime` juntament amb el paquet `intl` (que haurem d'instal·lar ja que Flutter no l'inclou per defecte).

```dart
import 'package:intl/intl.dart';

DateTime ahora = DateTime.now();
String formattedDate = DateFormat('dd-MM-yyyy').format(ahora);

print(formattedDate);  // Exemple d'eixida: 03-10-2024
```

* **Ús en Widgets.** Com no, podem utilitzar objectes `DateTime` en widgets com `Text` per a mostrar la data i hora, o en widgets interactius com `showDatePicker` perquè els usuaris seleccionen una data.

Exemple de mostrar una data en un widget `Text`:

```dart
Text(
  "Data actual: ${DateTime.now().toString()}",
);
```

#### Exemple d'ús complet:

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
        appBar: AppBar(title: Text('Exemple DateTime')),
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
        Text('Data i hora actual: $now'),
        SizedBox(height: 20),
        Text('Data futura (30 dies després): $futureDate'),
      ],
    );
  }
}
```

### Mini Task Manager: dates de lliurament

En la classe `Tarea` de la secció HTTP, afig estos getters:

```dart
bool get estaVencida => fechaLimite.isBefore(DateTime.now());

int get diasRestantes =>
    fechaLimite.difference(DateTime.now()).inDays;
```

`estaVencida` compara l'instant límit amb l'actual, independentment de si la tasca està completada. Si vols localitzar tasques pendents i vençudes, comprova `!tarea.completada && tarea.estaVencida`.

Conservant eixa classe, pots provar les dates amb este `main()` independent de la descàrrega:

```dart
void main() {
  final ahora = DateTime.now();
  final entrega = DateTime(2026, 10, 10, 23, 59);
  final tarea = Tarea(
    titulo: 'Entregar projecte',
    fechaLimite: entrega,
  );

  print(ahora);
  print(entrega);
  print(entrega.isAfter(ahora));
  print('Vençuda: ${tarea.estaVencida}');
  print('Queden ${tarea.diasRestantes} dies complets');

  final manana = ahora.add(const Duration(days: 1));
  final haceUnaSemana = ahora.subtract(const Duration(days: 7));
  print('Demà: $manana');
  print('Fa una setmana: $haceUnaSemana');
}
```

El resultat depén de quan executes el programa. **Com implementaries `estaVencida` i `diasRestantes` abans de consultar els getters?** Prova també una tasca el límit de la qual siga un minut abans de `ahora`.

`inDays` compta períodes complets de 24 hores i trunca cap a zero: una data vençuda fa una hora pot donar `0` dies restants. Per a decidir si està vençuda, utilitza la comparació de dates. A més, sumar una duració de 24 hores pot canviar l'hora local en creuar un canvi d'horari d'estiu.

Per a donar a les tasques descarregades una data local d'exemple, canvia **només** l'assignació de `fechaLimite` en `Tarea.fromJson()` per:

```dart
fechaLimite: DateTime.now().add(const Duration(days: 1)),
```

És una data generada per la nostra aplicació; no una dada rebuda de JSONPlaceholder.

## TimeOfDay

A diferència de la classe `DateTime`, que gestiona tant la data com l'hora, `TimeOfDay` s'enfoca exclusivament en l'hora, amb un format de 24 hores per defecte.

És especialment útil per a treballar amb temps quan només necessitem gestionar l'hora, com en casos en els quals els usuaris han de seleccionar una hora específica en un formulari (per exemple, l'hora d'una cita o un recordatori).

:::caution

un xicotet matís important: **`TimeOfDay` no pertany a Dart pur, sinó a Flutter (`package:flutter/material.dart`)**. Per tant, en una aplicació executada amb `dart run` no podem treballar realment amb `TimeOfDay`

:::

Podem crear instàncies de `TimeOfDay` de diverses maneres, principalment usant una hora i minuts específics, o utilitzant el mètode `now()` per a obtindre l'hora actual.

```dart
// Crear un TimeOfDay amb una hora i minuts específics
TimeOfDay horaEspecifica = TimeOfDay(hour: 14, minute: 30);

// Obtindre l'hora actual
TimeOfDay horaActual = TimeOfDay.now();
```

### **Propietats**

La classe `TimeOfDay` té dues propietats clau:

* `hour`: L'hora en format de 24 hores (0-23).
* `minute`: Els minuts (0-59).

```dart
TimeOfDay ahora = TimeOfDay.now();
print("Hora: ${ahora.hour}");
print("Minuts: ${ahora.minute}");
```

### **Possibles usos**

Podem utilitzar la classe `TimeOfDay` per a casos com els següents:

* **Format de 12 hores**: Encara que internament utilitza el format de 24 hores, també podem convertir el temps a format de 12 hores utilitzant el mètode `period` (que indica si és AM o PM) i el mètode `hourOfPeriod`, que retorna l'hora en format de 12 hores.

```dart
TimeOfDay ahora = TimeOfDay.now();

String periodo = ahora.period == DayPeriod.am ? "AM" : "PM";
int hora12 = ahora.hourOfPeriod;

print("Hora en format 12 hores: $hora12 $periodo");
```

* **Mètode `replacing().`** Podem usar este mètode per a crear una nova instància de `TimeOfDay` reemplaçant un o tots dos valors (hora i minut).

```dart
TimeOfDay ahora = TimeOfDay.now();
TimeOfDay nuevaHora = ahora.replacing(hour: 16);
print("Nova hora: ${nuevaHora.hour}:${nuevaHora.minute}");
```

* **Ús amb `showTimePicker()`**: La classe `TimeOfDay` s'utilitza amb el widget `showTimePicker()` per a mostrar un selector de temps. Este selector permet a l'usuari seleccionar una hora específica i retorna un objecte `TimeOfDay` amb el valor seleccionat.

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

* **Comparació entre temps**: Encara que `TimeOfDay` no té un mètode específic per a comparar dos objectes, podem convertir les hores i minuts a minuts totals (hora \* 60 + minut) per a fer comparacions.

```dart
bool esAntes(TimeOfDay t1, TimeOfDay t2) {
  return (t1.hour * 60 + t1.minute) < (t2.hour * 60 + t2.minute);
}

TimeOfDay hora1 = TimeOfDay(hour: 10, minute: 30);
TimeOfDay hora2 = TimeOfDay(hour: 12, minute: 45);

print(esAntes(hora1, hora2)); // true
```

### Mini Task Manager: una hora de recordatori

`TimeOfDay` pertany a **Flutter**, mentre que `DateTime` forma part de Dart. Un recordatori diari a les 18.30 necessita una hora del dia; un lliurament el 10 d'octubre de 2026 a les 18.30 necessita també una data.

Este xicotet exemple s'executa en un projecte Flutter, amb l'import de Material. És independent del programa de consola anterior:

```dart
import 'package:flutter/material.dart';

class RecordatorioDiario {
  final String titulo;
  final TimeOfDay hora;

  RecordatorioDiario({required this.titulo, required this.hora});
}

void main() {
  final recordatorio = RecordatorioDiario(
    titulo: 'Revisar tasques pendents',
    hora: const TimeOfDay(hour: 18, minute: 30),
  );
  final entrega = DateTime(2026, 10, 10, 18, 30);

  print('${recordatorio.titulo}: '
      '${recordatorio.hora.hour}:${recordatorio.hora.minute}');
  print('Lliurament concret: $entrega');
}
```

Este `main()` mostra dades en la consola; no crea una interfície ni programa una notificació. Si l'hora s'afig com a atribut d'una tasca de Flutter, podria declarar-se `final TimeOfDay hora;` juntament amb la seua data. El model de consola ha de continuar utilitzant tipus de Dart.

**Si una tasca es repeteix tots els dies a les 18.30, què aporta `TimeOfDay` i quina informació addicional necessitaríem per a programar el pròxim avís?** L'hora per si sola no conté ni data ni zona horària.

### Mini Task Manager: integrar objectes, HTTP, errors i dates

Torna al projecte de consola: conserva els imports de `dart:convert` i `http`, la classe `Tarea` amb `fromJson` i els getters de dates, i la funció HTTP `descargarTareas()`. Substitueix el seu `main()` per:

```dart
Future<void> main() async {
  try {
    print('📡 Descarregant tasques...');
    final tareas = await descargarTareas();

    for (final tarea in tareas) {
      tarea.mostrar();
      print('Vençuda: ${tarea.estaVencida}');
      print('Dies complets restants: ${tarea.diasRestantes}');
    }
  } catch (e) {
    print('❌ No es van poder carregar les tasques: $e');
  } finally {
    print('👋 Aplicació finalitzada');
  }
}
```

Hem començat creant un objecte i ara descarreguem una llista de tasques, convertim JSON en instàncies, gestionem fallades i consultem dates. L'herència permet introduir tasques especialitzades; l'exemple de `TimeOfDay` afig una hora de recordatori quan passem a Flutter.

Com a pràctica, provoca un error cada vegada: crea una tasca sense títol, elimina un `await`, utilitza una ruta HTTP inexistent o estableix una data passada. Prediu el resultat i explica quina part del programa el detecta.
