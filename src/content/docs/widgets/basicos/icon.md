---
title: "Icon: representar una idea con un símbolo"
sidebar:
  order: 5
---

**`Icon` dibuja un símbolo a partir de un `IconData`**, como los que ofrece la clase `Icons`. Es útil para acompañar una etiqueta o identificar una acción:

Documentación oficial: [`Icon`](https://api.flutter.dev/flutter/widgets/Icon-class.html).

| Propiedad | Para qué sirve |
| --- | --- |
| `icon` | Identifica el símbolo mediante un `IconData`; se pasa como primer argumento. |
| `size` | Establece el tamaño en píxeles lógicos. |
| `color` | Configura el color del símbolo. |
| `semanticLabel` | Aporta una descripción para lectores de pantalla. |
| `textDirection` | Permite controlar la dirección de los iconos que se reflejan según el sentido de lectura. |

```dart
const Icon(
  Icons.terrain,
  size: 40,
  color: Colors.teal,
  semanticLabel: 'Montaña',
)
```

`Icons.terrain` identifica el símbolo; `size` establece su tamaño y `color` su color. Los iconos Material requieren `uses-material-design: true` en `pubspec.yaml`, una opción que los proyectos Flutter habituales ya incluyen.

**Un `Icon` no responde a pulsaciones por sí mismo.** Si representa una acción, utiliza `IconButton`:

```dart
IconButton(
  tooltip: 'Guardar ruta',
  icon: const Icon(Icons.bookmark_border),
  onPressed: () {
    debugPrint('Guardar ruta');
  },
)
```

`tooltip` ayuda a comprender la acción y aporta una etiqueta de accesibilidad. El mensaje de `debugPrint` aparece en la consola; este ejemplo todavía no guarda datos. Puedes explorar los símbolos en la [referencia de `Icons`](https://api.flutter.dev/flutter/material/Icons-class.html).
