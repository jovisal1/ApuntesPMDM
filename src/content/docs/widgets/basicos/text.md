---
title: "Text: mostrar y dar formato al texto"
sidebar:
  order: 3
---

**`Text` muestra una cadena de caracteres.** Puede ser un título, una descripción o un valor obtenido de una variable. Su aspecto se configura mediante `TextStyle`:

```dart
const Text(
  'Ruta de la cascada',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.teal,
  ),
)
```

El texto aparece con tamaño 24, en negrita y con color verde azulado. `TextStyle` es un objeto de configuración, no otro widget. Las medidas de la interfaz se expresan en **píxeles lógicos**, que Flutter adapta a la densidad de cada pantalla.

| Propiedad | Para qué sirve |
| --- | --- |
| `style` | Configura tamaño, peso, color y otros detalles del texto. |
| `textAlign` | Alinea las líneas dentro del ancho disponible. |
| `maxLines` | Limita el número de líneas que se muestran. |
| `overflow` | Decide cómo representar el texto que no cabe. |
| `softWrap` | Permite el salto de línea cuando se agota el ancho. |
| `semanticsLabel` | Ofrece una descripción accesible alternativa al texto visible. |

Para una descripción breve podemos limitar las líneas y añadir puntos suspensivos:

```dart
const SizedBox(
  width: 240,
  child: Text(
    'Un recorrido entre árboles que termina junto a una cascada.',
    maxLines: 2,
    overflow: TextOverflow.ellipsis,
    textAlign: TextAlign.center,
  ),
)
```

Aquí `SizedBox` limita el ancho a 240, dentro de lo que permita su padre. Así el texto tiene un espacio concreto en el que ajustarse. **`textAlign` alinea el texto dentro de ese espacio; no coloca el widget en el centro de la pantalla.** Para esto último utilizamos `Center`.

En una aplicación conviene aprovechar los estilos del tema para mantener una jerarquía visual coherente:

```dart
Text(
  'Ruta de la cascada',
  style: Theme.of(context).textTheme.headlineSmall,
)
```

### Varios estilos en una misma frase

`Text.rich` permite combinar fragmentos con `TextSpan`. Cada fragmento puede tener su propio estilo:

```dart
const Text.rich(
  TextSpan(
    text: 'Dificultad: ',
    children: [
      TextSpan(
        text: 'fácil',
        style: TextStyle(fontWeight: FontWeight.bold),
      ),
    ],
  ),
)
```

El resultado es una sola frase en la que «fácil» aparece en negrita. Si necesitas que el usuario copie el contenido, puedes utilizar `SelectableText`; `Text` no permite seleccionarlo por defecto. Consulta los detalles en la [referencia de `Text`](https://api.flutter.dev/flutter/widgets/Text-class.html).

:::note[Prueba una variación ✍️]
Cambia el texto por una descripción más larga y alterna `maxLines: 1` y `maxLines: 3`. Después elimina el límite de ancho: observa cómo influye el espacio disponible en el salto de línea.
:::
