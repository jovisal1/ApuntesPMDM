---
title: "Actividades de navegación"
sidebar:
  order: 5
---

## ✍️ Amplía los ejemplos de navegación

Realiza estas actividades dentro de **`catalogo_widgets`**. Conserva las pantallas de barra inferior, rail, cajón y pestañas: los ejercicios se añaden al catálogo sin sustituirlas. Usa únicamente las herramientas estudiadas en esta sección; no necesitas instalar paquetes.

### Elegir un componente y recibir la respuesta

Crea `SelectorComponentePantalla` y `DetalleComponentePantalla` en `lib/ui/navegacion/ui/`, y añade «Selector de componentes» al catálogo.

- El selector muestra Text, Image e Icon. Al pulsar uno, abre el detalle mediante `Navigator.push` y pasa su nombre por el constructor.
- El detalle muestra el nombre recibido y una breve descripción del componente.
- El botón «Elegir» cierra el detalle con `pop` y devuelve el nombre.
- En el selector, espera el resultado de `push` y, después de comprobar `context.mounted`, muestra la elección en un `SnackBar`.
- Si se vuelve con la flecha sin elegir, el resultado es `null`: no muestres un mensaje de elección.

:::tip[Resultado esperado]
Catálogo → Selector → Detalle. «Elegir» devuelve el dato al selector; la flecha solo vuelve. Un nuevo retroceso desde el selector lleva al catálogo.
:::

### Organizar una biblioteca de ejemplos

Añade `BibliotecaEjemplosPantalla` en `lib/ui/navegacion/ui/`, con su propia entrada en el catálogo.

- Utiliza una `NavigationBar` con tres destinos: Texto, Imagen y Diseño. Cada selección debe actualizar el título y el contenido central.
- En Texto, añade dos pestañas: «Guiados» y «Mis ejemplos». Usa `DefaultTabController`, `TabBar` y `TabBarView` con el mismo número de elementos.
- Muestra al menos un contenido distinto en cada destino y en cada pestaña; no basta con cambiar el indicador de selección.
- Mantén la barra inferior al cambiar de sección. No utilices `push` para cada selección de la barra o de las pestañas.

:::tip[Resultado esperado]
Puedes cambiar de destino y de pestaña sin acumular pantallas. Al volver desde la biblioteca regresas al catálogo, sin recorrer las selecciones anteriores.
:::

### Pedir una elección y confirmar una acción

Añade `AccionesEjemploPantalla` en `lib/ui/navegacion/ui/`, con una entrada propia en el catálogo y dos botones independientes.

- «Elegir turno» abre una hoja inferior modal con Mañana y Tarde. Cada opción cierra la hoja y devuelve su valor; la pantalla muestra la elección en un `SnackBar`.
- Si se cierra la hoja sin elegir, no muestres una confirmación.
- «Vaciar selección» abre un `AlertDialog` con «Cancelar» y «Vaciar». El diálogo devuelve un booleano.
- Solo una confirmación explícita muestra «Selección vaciada» en un `SnackBar`. Cancelar o cerrar el diálogo no ejecuta esa acción.
- Tras cada espera, comprueba que el contexto sigue montado antes de utilizarlo.

En esta actividad basta con mostrar las respuestas: no necesitas implementar almacenamiento ni un formulario nuevo.

:::tip[Resultado esperado]
La hoja y el diálogo se cierran antes de mostrar su respuesta. El usuario permanece en la pantalla de acciones; cerrar una interacción sin confirmar no produce un mensaje de éxito.
:::

## 🧩 Conserva todas las demostraciones

El catálogo debe permitir abrir por separado los ejemplos originales y las tres actividades. Añade un título y una explicación breve a cada pantalla. Ejecuta `dart format lib` y `flutter analyze`.

Revisa tanto los botones de confirmación como la flecha de retroceso y el cierre sin elegir. Comprueba que cada respuesta se utiliza en la pantalla que abrió la interacción y que el retroceso conserva el orden esperado.
