---
title: "Botones: responder a una acción"
sidebar:
  order: 6
---

Un botón combina una representación visual con una función que se ejecuta al pulsarlo. **`onPressed` recibe esa función**, mientras que `child` describe su contenido:

```dart
ElevatedButton(
  onPressed: () {
    debugPrint('Comenzamos la ruta');
  },
  child: const Text('Comenzar ruta'),
)
```

La expresión `() { ... }` es una función anónima sin parámetros. La entregamos al botón para que la ejecute más adelante. Si ya existe una función `guardarRuta`, escribimos `onPressed: guardarRuta`, sin paréntesis: `guardarRuta()` la ejecutaría al construir la interfaz.

Estas propiedades son habituales en `ElevatedButton`, `FilledButton`, `OutlinedButton` y `TextButton`. Consulta la referencia de cada variante para comprobar cuáles admite.

| Propiedad | Para qué sirve |
| --- | --- |
| `onPressed` | Función que se ejecuta al pulsar; `null` desactiva el botón. |
| `onLongPress` | Función para una pulsación prolongada en los botones que la admiten. |
| `child` | Contenido del botón en su constructor habitual. |
| `style` | Personaliza el aspecto mediante `ButtonStyle` en los botones de texto, con borde, rellenos y elevados. |
| `autofocus / focusNode` | Permiten gestionar el foco, por ejemplo al navegar con el teclado. |

### Elegir el tipo de botón

Todos estos botones atienden la pulsación, pero tienen distinta presencia visual:

| Widget | Cuándo encaja |
| --- | --- |
| [`FilledButton`](https://api.flutter.dev/flutter/material/FilledButton-class.html) | Una acción principal que queremos destacar. |
| [`ElevatedButton`](https://api.flutter.dev/flutter/material/ElevatedButton-class.html) | Una acción que necesita destacar mediante elevación. |
| [`OutlinedButton`](https://api.flutter.dev/flutter/material/OutlinedButton-class.html) | Una acción secundaria con borde visible. |
| [`TextButton`](https://api.flutter.dev/flutter/material/TextButton-class.html) | Una acción de menor énfasis visual. |
| [`IconButton`](https://api.flutter.dev/flutter/material/IconButton-class.html) | Una acción compacta representada por un icono. |
| [`FloatingActionButton`](https://api.flutter.dev/flutter/material/FloatingActionButton-class.html) | Una acción destacada de la pantalla, habitualmente en `Scaffold.floatingActionButton`. |

En `IconButton` destacan `icon`, `tooltip`, `iconSize` y `onPressed`. En `FloatingActionButton`, `child`, `tooltip`, `backgroundColor` y `onPressed`. Los constructores `.icon` de los botones anteriores utilizan `icon` y `label` para separar símbolo y texto.

Para combinar icono y texto, varios botones ofrecen el constructor `.icon`:

```dart
FilledButton.icon(
  onPressed: () {
    debugPrint('Ruta guardada');
  },
  icon: const Icon(Icons.bookmark_add_outlined),
  label: const Text('Guardar ruta'),
)
```

**`onPressed: null` desactiva el botón**. Es útil cuando una acción todavía no está disponible:

```dart
const OutlinedButton(
  onPressed: null,
  child: Text('Descargar mapa'),
)
```

El tema aporta el aspecto habitual de los botones. Si necesitas modificar uno concreto, utiliza su propiedad `style`, por ejemplo `FilledButton.styleFrom(...)`. Evita asignar colores a todos los botones por separado cuando puedes configurar el tema. La [referencia de `FilledButton`](https://api.flutter.dev/flutter/material/FilledButton-class.html) incluye sus variantes y propiedades.
