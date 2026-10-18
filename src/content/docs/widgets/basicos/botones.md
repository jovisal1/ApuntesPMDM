---
title: "Botones: responder a una acción"
sidebar:
  order: 6
---

**Un botón permite ejecutar una acción al pulsarlo.** Utilizaremos `FilledButton` como primer ejemplo: `child` describe su contenido y `onPressed` recibe la función que se ejecutará después.

```dart
FilledButton(
  onPressed: () { debugPrint('Hola'); },
  child: const Text('Saludar'),
)
```

`Text` muestra la etiqueta del botón. `() { ... }` es una función anónima y `debugPrint` escribe en consola. Al construir el botón no se imprime nada; el mensaje aparece al pulsar.

## 🔧 Propiedades principales

### 1. `onPressed`: acción o desactivación

`onPressed` define qué debe ocurrir al pulsar el botón, por ejemplo guardar un dato o iniciar una operación. También permite expresar que una acción todavía no está disponible: si vale `null`, el botón queda desactivado. Es útil para impedir una descarga sin recurso o un envío antes de completar los datos necesarios.

```dart
const FilledButton(onPressed: null, child: Text('Descargar'))
```

Con una función `guardarRuta` ya definida, usarías `onPressed: guardarRuta`. No escribas `guardarRuta()` si quieres entregar la función para más tarde.

### 2. `child`, o `icon` y `label`

`child` permite elegir el contenido de un botón, habitualmente una etiqueta de texto. Si queremos combinar un símbolo con la etiqueta para ayudar a reconocer la acción, el constructor `.icon` ofrece `icon` y `label` por separado y se encarga de colocarlos juntos.

```dart
FilledButton.icon(
  onPressed: () { debugPrint('Acción de guardar'); },
  icon: const Icon(Icons.bookmark_add_outlined),
  label: const Text('Guardar'),
)
```

`Icon` dibuja el símbolo de `Icons`; `Text` muestra la etiqueta. En este constructor usamos `label` en lugar de `child`. El mensaje no persiste datos.

### 3. `style`: aspecto del botón

`style` personaliza el aspecto de un botón concreto. Es útil para crear variantes de un mismo componente, por ejemplo una acción destacada con más espacio interior y colores diferentes. `FilledButton.styleFrom` crea el `ButtonStyle` a partir de valores sencillos; es un objeto de configuración, no otro widget.

```dart
FilledButton(
  style: FilledButton.styleFrom(
    backgroundColor: Colors.indigo,
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
  ),
  onPressed: () { debugPrint('Comenzar'); },
  child: const Text('Comenzar'),
)
```

`backgroundColor` es el fondo y `foregroundColor`, el color del contenido. `EdgeInsets.symmetric` configura el espacio interior horizontal y vertical; es un objeto de medidas, no un widget. Estos ajustes pertenecen a este botón, sin crear un estilo global.

### 4. `onLongPress`: pulsación prolongada

`onLongPress` define una acción al mantener pulsado el botón. Puede ser útil para ofrecer una acción secundaria relacionada con la pulsación normal, siempre que el usuario tenga otra forma clara de descubrirla. Ambas acciones pueden convivir y producir respuestas diferentes.

```dart
FilledButton(
  onPressed: () { debugPrint('Pulsación normal'); },
  onLongPress: () { debugPrint('Pulsación prolongada'); },
  child: const Text('Mantén pulsado'),
)
```

Prueba una pulsación breve y otra mantenida. No hagas que la pulsación prolongada sea la única forma de acceder a una acción imprescindible.

### 5. `tooltip` e `iconSize` en IconButton

`tooltip` explica qué hace un botón que solo muestra un símbolo, como una lupa sin la palabra «Buscar». Es útil para evitar acciones ambiguas y aportar una etiqueta accesible. `iconSize` permite ajustar el tamaño del símbolo según su importancia visual, sin cambiar su significado.

```dart
IconButton(
  tooltip: 'Buscar rutas',
  iconSize: 32,
  onPressed: () { debugPrint('Buscar'); },
  icon: const Icon(Icons.search),
)
```

`IconButton` ya gestiona la interacción; `Icon` únicamente dibuja el símbolo. `tooltip` identifica la acción y `iconSize` configura el tamaño de su icono.

## Elegir el tipo de botón

| Tipo | Uso habitual | Ejemplo de constructor |
| --- | --- | --- |
| `FilledButton` | Acción principal con relleno. | `FilledButton(onPressed: ..., child: ...)` |
| `ElevatedButton` | Acción que destaca mediante elevación. | `ElevatedButton(onPressed: ..., child: ...)` |
| `OutlinedButton` | Acción secundaria con borde. | `OutlinedButton(onPressed: ..., child: ...)` |
| `TextButton` | Acción de menor énfasis visual. | `TextButton(onPressed: ..., child: ...)` |
| `IconButton` | Acción compacta con símbolo y tooltip. | `IconButton(onPressed: ..., icon: ..., tooltip: ...)` |
| `FloatingActionButton` | Acción destacada de la pantalla. | Se coloca normalmente en `Scaffold.floatingActionButton`. |

Los puntos suspensivos de la tabla representan valores que faltan, no código para copiar. Prueba a sustituir `FilledButton` por `OutlinedButton` en el ejemplo mínimo, sin cambiar su acción. Propiedades como `onPressed`, `child` y `style` son comunes a los cuatro primeros tipos, pero no todos los botones tienen exactamente la misma API.


## ✍️ Actividad: crea componentes con variantes

Implementa **los dos componentes** siguientes como `StatelessWidget`, cada uno en el archivo indicado dentro de `lib/componentes/`. Los nombres y parámetros son el contrato que debes cumplir, no una solución implementada. Usa campos `final`, parámetros con nombre, `super.key` y constructor `const` cuando sea posible. Las variantes se eligen mediante parámetros: no necesitan estado propio.

Los parámetros sin valor predeterminado son obligatorios; márcalos con `required`, también si admiten `null`. Un tipo terminado en `?` admite `null`. Los `enum` propuestos se declaran en el mismo archivo que el componente.

`VoidCallback` es el tipo de una función sin argumentos ni valor devuelto; `VoidCallback?` permite también `null`. `IconData` es el tipo de los símbolos de `Icons`.

Si necesitas recordar cómo un parámetro selecciona el aspecto, consulta [Variantes de un componente](../estilo-y-variantes/). La implementación de estas propuestas te corresponde a ti.

### 1. `BotonAccion`

`lib/componentes/boton_accion.dart`

Parámetros: `String texto`, `VoidCallback? onPressed`, `bool destacado = false`.

Usa `FilledButton` con estilo local: la variante destacada tendrá más espacio interior y otra combinación de colores. Si el callback es `null`, debe quedar desactivado. La variante visual no puede cambiar la acción.

### 2. `BotonConIcono`

`lib/componentes/boton_con_icono.dart`

Parámetros: `String texto`, `IconData icono`, `VoidCallback? onPressed`, `bool secundario = false`.

Selecciona `FilledButton.icon` para la acción principal y `OutlinedButton.icon` para la secundaria. Mantén texto, icono y callback recibidos.

## 🧩 Muestra los componentes en el catálogo

En `lib/pantallas/botones_ejemplos_pantalla.dart`, conserva `BotonesEjemplosPantalla` e importa los archivos nuevos. Cada import va al principio, fuera de las clases:

```dart
import '../componentes/boton_accion.dart';
import '../componentes/boton_con_icono.dart';
```

`../` sube de `pantallas` a `lib`; después entra en `componentes`. Los imports hacen accesibles las clases y los `enum` públicos de esos archivos.

Cuando hayas implementado los componentes, podrás utilizarlos así dentro de `children`:

```dart
BotonAccion(
  texto: 'Comenzar',
  destacado: true,
  onPressed: () { debugPrint('Comenzar desde el catálogo'); },
),
const BotonAccion(texto: 'No disponible', onPressed: null),
BotonConIcono(
  texto: 'Guardar',
  icono: Icons.bookmark_border,
  secundario: true,
  onPressed: () { debugPrint('Guardar desde el catálogo'); },
),
```

Muestra ambas variantes de cada componente y un caso desactivado. Una pulsación debe invocar el callback exactamente una vez; cambiar el estilo no debe cambiarlo. Prueba también que un botón desactivado no ejecuta ninguna acción.

Añade las combinaciones que falten: los usos anteriores son solo un comienzo. Identifica cada caso con un título y una explicación propia. No dupliques una clase por cada combinación ni copies los componentes dentro de la pantalla. Puedes utilizar `create-component` para revisar tu implementación y `test-widget` para generar pruebas con criterios concretos. Ejecuta `dart format lib`, `flutter analyze` y las pruebas que hayas creado.

Referencia: [Botones](https://api.flutter.dev/flutter/material/FilledButton-class.html).
