---
title: "Widgets básicos"
description: "Texto, imágenes, iconos, botones y la estructura de una pantalla Flutter, con ejemplos para practicar."
sidebar:
  label: Básicos
  order: 1
---

Ya sabemos que una pantalla se construye combinando widgets. Ahora vamos a conocer las piezas que utilizaremos con más frecuencia: **mostrar contenido, ofrecer una acción y dar estructura a la pantalla**. No necesitas memorizar todos sus argumentos; empieza por entender qué resuelve cada widget y prueba a cambiar una propiedad cada vez.

Imagina una ficha de una ruta: tiene un título, una fotografía, un icono que indica su dificultad y un botón para guardarla. Estas piezas se colocan dentro de una pantalla con una barra superior. A lo largo del apartado construiremos los elementos de esa interfaz.

## 🎯 Qué aprenderás

- Mostrar textos, imágenes e iconos y configurar su aspecto.
- Incorporar botones y dar estructura a una pantalla con Scaffold y AppBar.
- Crear componentes con parámetros y comparar sus variantes en el catálogo.

| Necesidad | Widget |
| --- | --- |
| Mostrar un texto | `Text` |
| Mostrar una fotografía o ilustración | `Image` |
| Representar una idea mediante un símbolo | `Icon` |
| Ejecutar una acción | `FilledButton`, `ElevatedButton`, `OutlinedButton`, `TextButton` o `IconButton` |
| Reservar el lugar de una pieza pendiente | `Placeholder` |
| Mostrar la barra superior | `AppBar` |
| Organizar las zonas de una pantalla Material | `Scaffold` |
| Organizar contenido y desplazamiento | `Container`, `Row`, `Column`, `Stack`, `ListView`, `GridView` |

Trabajaremos directamente sobre el proyecto base creado en la sección de configuración del asistente. La pantalla principal, el listado y las secciones vacías ya están preparados. Cada apartado empieza explicando el widget con un ejemplo mínimo y sus propiedades principales. Después crearás componentes parametrizados en archivos de `lib/ui/core/ui/` y mostrarás sus variantes en la pantalla correspondiente del catálogo. Los ejemplos de propiedades sirven para comprender el widget; el resultado de la actividad son tus componentes reutilizables. Consulta el [esquema del proyecto](../configuracion-de-un-asistente-de-ia/el-proyecto-del-catalogo/).

## 🔎 Claves para leer y entender un widget

Lee el código **de fuera hacia dentro**: identifica primero qué widget se crea y después qué configuración recibe. Este fragmento podría ser un elemento de la lista de ejemplos:

```dart
const Center(
  child: Text(
    'Ruta de la cascada', // Contenido: argumento posicional.
    maxLines: 2, // Parámetro con nombre: valor.
    textAlign: TextAlign.center,
    style: TextStyle(
      fontSize: 24,
      fontWeight: FontWeight.bold,
    ),
  ),
)
```

| Clave | Cómo leerla | Ejemplo |
| --- | --- | --- |
| Nombre y paréntesis | El nombre identifica el constructor y los paréntesis contienen sus argumentos. No todos los objetos que creamos son widgets: `TextStyle` configura un estilo. | `Text('Hola')` crea un widget; `TextStyle(fontSize: 24)` crea un estilo. |
| Parámetros con nombre | Se escriben como **`nombre: valor`**. Los dos puntos separan el nombre del argumento y el valor; no son una asignación con `=`. | En `maxLines: 2`, configuramos el límite de líneas con el valor `2`. |
| Argumentos posicionales | Se reconocen por su posición y no llevan nombre ni dos puntos. | `'Ruta de la cascada'` es el primer argumento de `Text`. |
| Comas | Separan los argumentos. Puede haber una coma después del último. Un salto de línea no sustituye a una coma. | `fontSize: 24, fontWeight: FontWeight.bold,` |
| Paréntesis e indentación | Cada `(` tiene su `)`. La indentación ayuda a distinguir qué argumentos pertenecen a cada objeto. | `Center(child: Text('Hola'))` contiene un `Text` dentro de un `Center`. |
| Valores | Pueden ser números, cadenas, booleanos, variables, expresiones u objetos, incluidos otros widgets. | `24`, `'Hola'`, `true`, `TextAlign.center` o `Text('Hola')`. |
| Un hijo | `child` suele recibir un widget. Otros parámetros, como `body`, `title` o `icon`, reciben widgets para zonas concretas. | `child: Text('Hola')` |
| Varios hijos | `children` recibe una lista entre corchetes, con sus widgets separados por comas. | `children: [Text('Uno'), Text('Dos')]` |
| Acciones | Un evento recibe una función para ejecutarla después. Las llaves delimitan el cuerpo de una función anónima. | `onPressed: () { guardar(); }` o `onPressed: guardar`. Escribir `guardar()` ejecuta la función en ese momento. |
| Configuración constante | `const` crea un objeto con configuración constante y establece un contexto constante para sus objetos anidados. No puede usarse si un argumento requiere un valor calculado durante la ejecución. | En `const Center(child: Text('Hola'))`, no hace falta repetir `const` delante de `Text`. |

Antes de modificar un ejemplo, intenta responder: **¿qué widget estoy configurando, qué argumento cambiaré y qué resultado espero observar?** Cambia una propiedad cada vez y compara el resultado con tu predicción.

## Apartados

- [Variantes de un componente](./estilo-y-variantes/)
- [Text: mostrar y dar formato al texto](./text/)
- [Image: incorporar imágenes](./image/)
- [Icon: representar una idea con un símbolo](./icon/)
- [Botones: responder a una acción](./botones/)
- [Placeholder: reservar un espacio provisional](./placeholder/)
- [Scaffold y AppBar: dar estructura a la pantalla](./scaffold-y-appbar/)
- [Contenedores: composición, espacio y desplazamiento](../contenedores/)
- [Otros widgets: presentación e interacción](../otros/)
- [Practica con los widgets básicos](./practica/)
