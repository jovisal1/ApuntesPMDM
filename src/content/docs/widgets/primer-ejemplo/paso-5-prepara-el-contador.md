---
title: "Paso 5. Prepara el contador"
sidebar:
  order: 7
---

En `pantalla_entrenamiento.dart`, sustituye el `body` por:

```dart
body: const Center(
  child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      Text('Vueltas completadas'),
      SizedBox(height: 12),
      Text('0', style: TextStyle(fontSize: 56)),
    ],
  ),
),
```

`Center` recibe un `child`; `Column` recibe una lista `children` y coloca sus elementos en vertical. `SizedBox` deja una separación y `TextStyle` aumenta el tamaño del número en píxeles lógicos.

Por defecto, esta columna ocupa la altura disponible y coloca los hijos al principio. **`mainAxisAlignment: MainAxisAlignment.center` centra los hijos dentro de la columna**. También existen `start`, `end`, `spaceBetween`, `spaceAround` y `spaceEvenly`. Otra solución es `mainAxisSize: MainAxisSize.min`, que reduce la altura de la columna a su contenido y permite que el `Center` centre el grupo.

Añade este argumento al `Scaffold`, al mismo nivel que `body`:

```dart
floatingActionButton: FloatingActionButton(
  tooltip: 'Registrar una vuelta',
  onPressed: () {
    debugPrint('Has completado una vuelta');
  },
  child: const Icon(Icons.add),
),
```

`onPressed` recibe una función que Flutter ejecutará al pulsar. El icono es constante, pero el botón con esta función no puede declararse `const`. `debugPrint` escribe en la consola; todavía no modifica el número de la pantalla.

:::tip[Formato que ayuda a leer el árbol 🔎]
Utiliza **Format Document** en el editor o `dart format lib` desde la terminal. Las comas finales facilitan añadir argumentos y suelen favorecer bloques legibles; el formato exacto depende de la versión del formateador y de las reglas que aplique.
:::
