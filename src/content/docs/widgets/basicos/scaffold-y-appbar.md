---
title: "Scaffold y AppBar: dar estructura a la pantalla"
sidebar:
  order: 8
---

Hasta ahora hemos probado piezas dentro del cuerpo de una pantalla. **`Scaffold` ofrece las zonas habituales de una pantalla Material**, y `AppBar` configura su barra superior:

```dart
Scaffold(
  appBar: AppBar(
    title: const Text('Mis rutas'),
    actions: [
      IconButton(
        tooltip: 'Buscar rutas',
        icon: const Icon(Icons.search),
        onPressed: () {
          debugPrint('Buscar rutas');
        },
      ),
    ],
  ),
  body: const Center(child: Text('Elige tu próxima ruta')),
  floatingActionButton: FloatingActionButton(
    tooltip: 'Añadir ruta',
    onPressed: () {
      debugPrint('Añadir ruta');
    },
    child: const Icon(Icons.add),
  ),
)
```

En este caso, reemplaza el `Scaffold` completo del programa de prueba. `Scaffold` no sustituye a `MaterialApp`: el primero organiza una pantalla; el segundo configura la aplicación.

| Zona de `Scaffold` | Contenido habitual |
| --- | --- |
| `appBar` | Una barra superior, normalmente `AppBar`. |
| `body` | El contenido principal. |
| `floatingActionButton` | Un botón para una acción destacada. |
| `drawer` | Un panel lateral de navegación. |
| `bottomNavigationBar` | Navegación en la parte inferior; por ejemplo, `NavigationBar`. |

Otras propiedades útiles de [`Scaffold`](https://api.flutter.dev/flutter/material/Scaffold-class.html):

| Propiedad | Para qué sirve |
| --- | --- |
| `backgroundColor` | Configura el fondo de la pantalla. |
| `floatingActionButtonLocation` | Indica dónde se coloca el botón flotante. |
| `resizeToAvoidBottomInset` | Controla si el cuerpo ajusta su espacio para evitar el teclado en pantalla. |
| `extendBodyBehindAppBar` | Permite extender el cuerpo por detrás de la barra; hay que cuidar la legibilidad. |

En `AppBar`, `title` recibe el título, `actions` una lista de acciones al final y `leading` un widget al principio. Cuando no configuras `leading`, Flutter puede añadir un botón para volver o abrir el panel lateral, según el contexto.

:::note[Una pantalla no se desplaza por tener Scaffold]
`Scaffold` organiza zonas, pero su `body` no se vuelve desplazable automáticamente. Si el contenido no cabe, necesitas una solución como `ListView` o `SingleChildScrollView`.
:::

### Propiedades útiles de AppBar

Documentación oficial: [`AppBar`](https://api.flutter.dev/flutter/material/AppBar-class.html).

| Propiedad | Para qué sirve |
| --- | --- |
| `title` | Recibe el widget del título. |
| `leading` | Coloca un widget al principio de la barra. |
| `actions` | Recibe los widgets de acción situados al final. |
| `centerTitle` | Controla si el título se centra. |
| `backgroundColor / foregroundColor` | Configuran el fondo y el color habitual del texto y los iconos. |
| `elevation` | Configura la elevación visual de la barra. |
| `toolbarHeight` | Establece la altura de la zona de herramientas. |
| `automaticallyImplyLeading` | Controla la incorporación automática del botón de volver o abrir el panel lateral. |

### Mostrar un aviso con SnackBar

Para dar una respuesta breve a una acción, podemos mostrar una **`SnackBar` mediante `ScaffoldMessenger`**. Este fragmento puede sustituir el texto del programa de prueba:

```dart
FilledButton(
  onPressed: () {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Ruta guardada')),
    );
  },
  child: const Text('Guardar ruta'),
)
```

`ScaffoldMessenger.of(context)` localiza el gestor de mensajes más cercano. En este programa, `MaterialApp` lo proporciona y el `Scaffold` se registra en él. **Mostrar «Ruta guardada» no persiste la ruta**: la operación de guardado debe programarse por separado.

Una `SnackBar` sirve para una respuesta temporal. Un `MaterialBanner` presenta un aviso en la parte superior del cuerpo y permanece hasta que se retire, por ejemplo mediante `hideCurrentMaterialBanner`. Si utilizas uno, proporciona una acción para cerrarlo o atender el aviso. Consulta las referencias de [Scaffold](https://api.flutter.dev/flutter/material/Scaffold-class.html) y [ScaffoldMessenger](https://api.flutter.dev/flutter/material/ScaffoldMessenger-class.html).

### Propiedades de los avisos

En [`SnackBar`](https://api.flutter.dev/flutter/material/SnackBar-class.html), estas propiedades permiten ajustar el mensaje:

| Propiedad | Para qué sirve |
| --- | --- |
| `content` | Recibe el contenido del aviso. |
| `duration` | Configura el tiempo de presentación, sujeto al comportamiento de accesibilidad. |
| `action` | Añade una acción mediante `SnackBarAction`, por ejemplo «Deshacer». |
| `behavior` | Permite elegir entre `SnackBarBehavior.fixed` y `floating`. |

En [`MaterialBanner`](https://api.flutter.dev/flutter/material/MaterialBanner-class.html), destacan `content` (mensaje), `actions` (acciones disponibles), `leading` (icono o elemento inicial) y `backgroundColor` (color de fondo).
