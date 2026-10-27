---
title: "Diseño adaptable: LayoutBuilder y MediaQuery"
sidebar:
  order: 4
---

Una ficha puede caber en dos paneles en una ventana amplia y necesitar una columna en una ventana estrecha. Adaptar la interfaz consiste en elegir una composición legible según el espacio disponible, manteniendo el contenido y las acciones.

No basta con distinguir «móvil» y «tableta»: una aplicación de escritorio puede ocupar una ventana pequeña y un componente puede estar dentro de un panel lateral. Usaremos `LayoutBuilder` para decidir dentro de un componente y `MediaQuery.sizeOf` para consultar el tamaño de la ventana.

Este fragmento puede colocarse como un hijo de la lista de ejemplos de `Otros`:

```dart
LayoutBuilder(
  builder: (context, constraints) {
    final amplio = constraints.maxWidth >= 600;
    return Text(amplio ? 'Hay espacio para dos paneles' : 'Usaremos una columna');
  },
)
```

Al redimensionar la ventana, el texto cambia cuando el ancho disponible para este widget alcanza 600 píxeles lógicos. Son unidades de layout, no píxeles físicos de la pantalla. El valor 600 es un umbral elegido para el ejemplo, no una detección del tipo de dispositivo.

## Qué medida necesitamos

| Pregunta | Herramienta |
| --- | --- |
| ¿Cuánto espacio me permite ocupar mi padre? | `LayoutBuilder` y sus `BoxConstraints`. |
| ¿Qué tamaño tiene la ventana de la aplicación? | `MediaQuery.sizeOf(context)`. |

Una ventana de 1200 puede contener un panel de 360. En ese panel `MediaQuery.sizeOf(context).width` puede seguir siendo 1200, mientras que `constraints.maxWidth` será 360. Para organizar sus hijos, el componente debe atender a ese espacio local.

## 🔧 Propiedades y consultas principales

### 1. `LayoutBuilder`: construir según las restricciones

Su propiedad `builder` recibe un `BuildContext` y un objeto `BoxConstraints`, con los límites mínimos y máximos de anchura y altura que permite el padre. `maxWidth` es un límite disponible, no una medición posterior del contenido. Flutter vuelve a evaluar el builder cuando cambian las restricciones, entre otros motivos; no necesitamos guardar el ancho con `setState`.

Vamos a crear un componente que recibe dos widgets: `principal` y `secundario`. En poco espacio los apila; en espacio amplio los sitúa uno al lado del otro. Este archivo completo sirve como referencia para las actividades posteriores.

`lib/ui/core/ui/panel_adaptable.dart`

```dart
import 'package:flutter/material.dart';

class PanelAdaptable extends StatelessWidget {
  const PanelAdaptable({
    super.key,
    required this.principal,
    required this.secundario,
    this.puntoCambio = 600,
    this.separacion = 16,
  });

  final Widget principal;
  final Widget secundario;
  final double puntoCambio;
  final double separacion;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < puntoCambio) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              principal,
              SizedBox(height: separacion),
              secundario,
            ],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: principal),
            SizedBox(width: separacion),
            Expanded(child: secundario),
          ],
        );
      },
    );
  }
}
```

`puntoCambio` controla cuándo cambia la composición y `separacion` el espacio entre paneles. `required` obliga a proporcionar ambos contenidos, que no dependen del diseño elegido. El `if` devuelve una de las dos composiciones.

En la `Column`, `CrossAxisAlignment.stretch` hace que ambos paneles ocupen el ancho disponible. En la `Row`, cada `Expanded` reparte por igual el ancho restante después de descontar la separación. Así el texto recibe un ancho limitado y puede ocupar varias líneas. Los `Expanded` actúan horizontalmente porque pertenecen a la fila.

**Este componente necesita un ancho máximo finito**, como el que recibe de un `ListView` vertical. Dentro de una `Row`, envuélvelo en `Expanded` para limitar su ancho. No usa `maxHeight` porque una lista vertical puede ofrecer altura sin límite. Tampoco añade desplazamiento: la lista exterior desplaza los dos paneles completos.

### 2. `MediaQuery.sizeOf`: decisiones sobre la ventana

Para una decisión general, como aumentar el margen de una pantalla amplia, consulta el tamaño de la ventana. Este fragmento sustituye el contenido de un método `build` bajo `MaterialApp`:

```dart
final anchoVentana = MediaQuery.sizeOf(context).width;
final margen = anchoVentana >= 900 ? 32.0 : 16.0;

return Padding(
  padding: EdgeInsets.all(margen),
  child: const Text('El margen depende del ancho de la ventana'),
);
```

`sizeOf` devuelve un `Size`; `width` y `height` expresan sus dimensiones lógicas. La consulta hace que el contexto se reconstruya al cambiar ese tamaño. Preferimos `sizeOf` a `MediaQuery.of(context).size` cuando solo necesitamos el tamaño.

Aquí el margen cambia con la ventana; el componente anterior sigue decidiendo su composición a partir de sus propias restricciones. No calcules el ancho de una tarjeta como una fracción de la ventana si el padre puede darle menos espacio. Tampoco reduzcas el tamaño del texto para hacerlo caber: permite varias líneas y desplazamiento.

### 3. Elegir el punto de cambio por el contenido

Prueba el espacio que necesitan los paneles, la separación y los márgenes. El ejemplo permite dos paneles con 600 de ancho local; si tus contenidos necesitan más, aumenta `puntoCambio`. Girar el dispositivo o redimensionar la ventana debe conservar el mismo contenido y las mismas acciones.

No bases toda la adaptación en la orientación: dos ventanas en horizontal pueden tener anchuras muy diferentes. Empieza por el ancho que recibe el componente y comprueba también la altura disponible y el texto ampliado.

## 🧩 Muestra las variantes en el catálogo

Añade este import a `lib/ui/catalogo/ui/otros_ejemplos_pantalla.dart`:

```dart
import '../../core/ui/panel_adaptable.dart';
```

Conserva los ejemplos existentes y añade estos widgets a `children` de su `ListView`. El segundo caso limita el ancho a 360; si su padre dispone de menos espacio, recibirá ese límite menor:

```dart
PanelAdaptable(
  principal: const Card(
    child: Padding(
      padding: EdgeInsets.all(16),
      child: Text('Taladro percutor: herramienta para pequeñas reparaciones.'),
    ),
  ),
  secundario: const Card(
    child: Padding(
      padding: EdgeInsets.all(16),
      child: Text('Recogida en La Plaza. Préstamo máximo: 3 días.'),
    ),
  ),
),
const SizedBox(height: 24),
Align(
  alignment: Alignment.centerLeft,
  child: SizedBox(
    width: 360,
    child: PanelAdaptable(
      puntoCambio: 500,
      separacion: 8,
      principal: const Text('Resumen dentro de un panel estrecho'),
      secundario: const Text('Condiciones debajo del resumen'),
    ),
  ),
),
```

En una ventana amplia, el primer ejemplo puede mostrar dos paneles mientras el segundo mantiene una columna. Esto permite comprobar que el diseño responde al ancho local y no al tamaño global. El `Align` permite que el `SizedBox` sea más estrecho que la lista.

## ✍️ Actividad: una ficha adaptable

Crea `lib/ui/core/ui/ficha_adaptable.dart` con una clase `FichaAdaptable` que reutilice `PanelAdaptable`. Recibirá `String titulo`, `String descripcion`, `String condiciones`, `VoidCallback onConsultar` y `double puntoCambio = 600`.

- El panel principal muestra título y descripción; el secundario, condiciones y un botón **Consultar** que ejecuta el callback recibido.
- Las variantes se controlan mediante parámetros. No crees clases distintas para móvil y escritorio ni cambies los datos al cambiar de ancho.
- Muestra en `Otros` dos fichas con textos y puntos de cambio diferentes; coloca una dentro de un ancho limitado. Conserva también las demostraciones anteriores.
- En cada composición deben verse todos los textos y el botón debe ejecutar la misma acción una sola vez por pulsación.

## ✅ Comprobaciones

| Situación | Resultado esperado con `puntoCambio: 600` |
| --- | --- |
| Ancho local de 320 o 599 | Panel secundario debajo del principal. |
| Ancho local de 600 o 900 | Paneles uno al lado del otro. |
| Ventana amplia y componente limitado a 360 | Una columna dentro del componente. |
| Texto ampliado y descripciones largas | Texto completo, sin desbordamientos; la lista permite llegar al final. |
| Ventana baja o dispositivo en horizontal | Se puede desplazar hasta el último control. |

Desde la raíz de `catalogo_widgets`, ejecuta `dart format lib`, que aplica formato, y `flutter analyze`, que comprueba el código. Después ejecuta `flutter run` para probar el catálogo: redimensiona la ventana, amplía el texto y comprueba el desplazamiento. El punto de cambio se aplica al ancho **después** del padding de la lista; una ventana de 600 no implica 600 disponibles para el componente.

Referencias: [LayoutBuilder](https://api.flutter.dev/flutter/widgets/LayoutBuilder-class.html), [MediaQuery.sizeOf](https://api.flutter.dev/flutter/widgets/MediaQuery/sizeOf.html) y [enfoque de Flutter para interfaces adaptables](https://docs.flutter.dev/ui/adaptive-responsive/general).
