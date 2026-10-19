---
title: "Scaffold y AppBar: dar estructura a la pantalla"
sidebar:
  order: 8
---

**`Scaffold` organiza las zonas de una pantalla Material** y **`AppBar` configura su barra superior**. No son otra aplicación: forman parte del `MaterialApp` que ya inicia el catálogo.

```dart
Scaffold(
  appBar: AppBar(title: const Text('Mi pantalla')),
  body: const Text('Contenido de la pantalla'),
)
```

`Text` muestra el título y el contenido. `appBar` y `body` reciben widgets para zonas distintas. Estos ejemplos sustituyen el `Scaffold` devuelto por `build` en `ScaffoldEjemplosPantalla`; no se añaden como elementos de la lista ni modifican la pantalla principal.

## 🔧 Propiedades principales

### 1. `body` y `backgroundColor`: contenido y fondo

`body` define el contenido principal de la pantalla: puede ser un texto, una lista o una composición de widgets. `backgroundColor` establece el fondo del `Scaffold`; es útil para diferenciar una sección o mantener contraste con su contenido.

```dart
Scaffold(
  backgroundColor: Colors.indigo.shade50,
  appBar: AppBar(title: const Text('Contenido centrado')),
  body: const Center(child: Text('Mi ejemplo')),
)
```

`Center` centra el `Text` dentro del cuerpo. `shade50` selecciona un tono claro de la paleta. `Scaffold` no añade desplazamiento por sí solo; para contenido largo puedes utilizar el `ListView` del proyecto base.

### 2. `title`, `centerTitle` y colores de AppBar

`title` permite identificar la pantalla mediante un texto u otro widget, y `centerTitle` decide si se centra en la barra. `backgroundColor` y `foregroundColor` ajustan el fondo y el color habitual del contenido de esa barra. Estas propiedades son útiles para dar identidad a una sección y mantener el título y los iconos legibles. `toolbarHeight` permite ajustar su altura y `elevation` aporta separación visual respecto al cuerpo.

```dart
Scaffold(
  appBar: AppBar(
    title: const Text('Barra destacada'),
    centerTitle: true,
    backgroundColor: Colors.indigo,
    foregroundColor: Colors.white,
    toolbarHeight: 72,
    elevation: 2,
  ),
  body: const Text('Compara el título, los colores y la altura'),
)
```

`foregroundColor` se aplica habitualmente a texto e iconos. `toolbarHeight` cambia la altura de la zona de herramientas y `elevation`, la elevación visual. Compara una propiedad cada vez.

### 3. `actions` y `leading`: zonas de la barra

`actions` permite situar acciones frecuentes de la pantalla al final de la barra, como buscar o consultar información. `leading` configura el elemento inicial, un lugar habitual para un control de vuelta o de menú. Sirven para organizar los controles de la pantalla sin mezclarlos con el contenido principal.

```dart
Scaffold(
  appBar: AppBar(
    title: const Text('Acciones de la sección'),
    actions: [
      IconButton(
        tooltip: 'Información',
        icon: const Icon(Icons.info_outline),
        onPressed: () { debugPrint('Información'); },
      ),
    ],
  ),
  body: const Text('Prueba la acción de información'),
)
```

`IconButton` responde a la pulsación y `Icon` dibuja el símbolo. `debugPrint` permite observar la acción en consola. Si no indicas `leading`, Flutter puede incorporar un control según el contexto; `automaticallyImplyLeading` controla esa opción. Conserva aquí ese comportamiento para mantener el control de vuelta del catálogo.

### 4. `floatingActionButton` y su ubicación

`floatingActionButton` permite destacar una acción principal de la pantalla, como añadir un elemento, separada del contenido del cuerpo. `floatingActionButtonLocation` elige dónde se coloca; es útil para adaptar esa acción a la composición de la pantalla sin posicionarla manualmente.

```dart
Scaffold(
  appBar: AppBar(title: const Text('Acción destacada')),
  body: const Text('Pulsa el botón +'),
  floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
  floatingActionButton: FloatingActionButton(
    tooltip: 'Añadir ejemplo',
    onPressed: () { debugPrint('Añadir ejemplo'); },
    child: const Icon(Icons.add),
  ),
)
```

`FloatingActionButton` es un botón pensado para una acción principal de pantalla. `Icon` aporta su símbolo. Compara la ubicación central con `endFloat`; todavía no implementamos una operación de añadido real.

## Un aviso como respuesta a una acción

En el cuerpo o la lista de tu pantalla puedes usar este botón:

```dart
FilledButton(
  onPressed: () {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Ejemplo completado'),
        duration: Duration(seconds: 3),
        behavior: SnackBarBehavior.floating,
      ),
    );
  },
  child: const Text('Mostrar aviso'),
)
```

`FilledButton` ejecuta la función al pulsar; `ScaffoldMessenger.of(context)` localiza el gestor de mensajes que proporciona la aplicación. `showSnackBar` muestra una `SnackBar`, cuyo `content` es un `Text`. `Duration` es un objeto de tiempo, no un widget. `behavior` permite elegir `floating` o `fixed`. El aviso no guarda datos. Este fragmento utiliza el `context` del `build` de la pantalla.

Otras zonas como `drawer` y `bottomNavigationBar` se estudiarán más adelante. `resizeToAvoidBottomInset` ajusta el cuerpo ante el teclado y `extendBodyBehindAppBar` permite extenderlo detrás de la barra; no necesitas cambiar esas opciones en esta actividad.


## ✍️ Actividad: crea componentes con variantes

Implementa **los dos componentes** siguientes como `StatelessWidget`, cada uno en el archivo indicado dentro de `lib/ui/core/ui/`. Los nombres y parámetros son el contrato que debes cumplir, no una solución implementada. Usa campos `final`, parámetros con nombre, `super.key` y constructor `const` cuando sea posible. Las variantes se eligen mediante parámetros: no necesitan estado propio.

Los parámetros sin valor predeterminado son obligatorios; márcalos con `required`, también si admiten `null`. Un tipo terminado en `?` admite `null`. Los `enum` propuestos se declaran en el mismo archivo que el componente.

`Widget contenido` permite recibir una pieza de interfaz como parámetro, igual que hacen `child` o `body`.

Si necesitas recordar cómo un parámetro selecciona el aspecto, consulta [Variantes de un componente](../estilo-y-variantes/). La implementación de estas propuestas te corresponde a ti.

### 1. `PantallaDemostracion`

`lib/ui/core/ui/pantalla_demostracion.dart`

Parámetros: `String titulo`, `Widget contenido`, `bool destacada = false`, `bool centrarTitulo = false`.

Construye un `Scaffold` con `AppBar`. La variante destacada cambia los colores locales de la barra; `contenido` se muestra en `body` sin alterarlo y `centrarTitulo` decide la alineación del título. Conserva el comportamiento inicial de `leading`.

### 2. `BotonAviso`

`lib/ui/core/ui/boton_aviso.dart`

Parámetros: `String etiqueta`, `String mensaje`, `bool flotante = false`, `int segundos = 3`.

Construye un botón que muestre una `SnackBar`. El parámetro `flotante` selecciona `floating` o `fixed`. La duración debe ser positiva y el mensaje mostrado debe ser el recibido.

## 🧩 Muestra los componentes en el catálogo

En `lib/ui/catalogo/ui/scaffold_ejemplos_pantalla.dart`, conserva `ScaffoldEjemplosPantalla` e importa los archivos nuevos. Cada import va al principio, fuera de las clases:

```dart
import 'package:catalogo_widgets/ui/core/ui/pantalla_demostracion.dart';
import 'package:catalogo_widgets/ui/core/ui/boton_aviso.dart';
```

En un import `package:`, `catalogo_widgets` identifica el paquete y la ruta siguiente comienza dentro de `lib/`. Los imports hacen accesibles las clases y los `enum` públicos de esos archivos.

Cuando hayas implementado los componentes, podrás utilizarlos así en el `build` de la pantalla:

```dart
return PantallaDemostracion(
  titulo: 'Variantes de pantalla',
  destacada: true,
  centrarTitulo: true,
  contenido: ListView(
    padding: const EdgeInsets.all(16),
    children: const [
      BotonAviso(etiqueta: 'Aviso fijo', mensaje: 'Primer mensaje'),
      BotonAviso(
        etiqueta: 'Aviso flotante',
        mensaje: 'Segundo mensaje',
        flotante: true,
      ),
    ],
  ),
);
```

El ejemplo de integración sustituye el `return` de `build` de `ScaffoldEjemplosPantalla`. `ListView` coloca los botones en una lista desplazable y `EdgeInsets.all(16)` añade espacio interior. Prueba ambas configuraciones de `destacada` y `centrarTitulo`, manteniendo el contenido. No anides esta pantalla dentro del `body` de otro `Scaffold`. Comprueba los dos avisos, su mensaje y duración; las pruebas deben controlar el tiempo sin pausas reales.

Añade las combinaciones que falten: los usos anteriores son solo un comienzo. Identifica cada caso con un título y una explicación propia. No dupliques una clase por cada combinación ni copies los componentes dentro de la pantalla. Puedes utilizar `create-component` para revisar tu implementación y `test-widget` para generar pruebas con criterios concretos. Ejecuta `dart format lib`, `flutter analyze` y las pruebas que hayas creado.

Referencia: [Scaffold y AppBar](https://api.flutter.dev/flutter/material/Scaffold-class.html).
