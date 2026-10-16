---
title: "Icon: representar una idea amb un símbol"
sidebar:
  order: 5
---

**`Icon` dibuixa un símbol a partir d’un `IconData`**, com els que oferix la classe `Icons`. És útil per a acompanyar una etiqueta o identificar una acció:

Documentació oficial: [`Icon`](https://api.flutter.dev/flutter/widgets/Icon-class.html).

| Propietat | Per a què servix |
| --- | --- |
| `icon` | Identifica el símbol mitjançant un `IconData`; es passa com a primer argument. |
| `size` | Establix la mida en píxels lògics. |
| `color` | Configura el color del símbol. |
| `semanticLabel` | Aporta una descripció per a lectors de pantalla. |
| `textDirection` | Permet controlar la direcció de les icones que es reflectixen segons el sentit de lectura. |

```dart
const Icon(
  Icons.terrain,
  size: 40,
  color: Colors.teal,
  semanticLabel: 'Muntanya',
)
```

`Icons.terrain` identifica el símbol; `size` establix la mida i `color` el color. Les icones Material requerixen `uses-material-design: true` en `pubspec.yaml`, una opció que els projectes Flutter habituals ja inclouen.

**Un `Icon` no respon a pulsacions per si mateix.** Si representa una acció, utilitza `IconButton`:

```dart
IconButton(
  tooltip: 'Guardar ruta',
  icon: const Icon(Icons.bookmark_border),
  onPressed: () {
    debugPrint('Guardar ruta');
  },
)
```

`tooltip` ajuda a comprendre l’acció i aporta una etiqueta d’accessibilitat. El missatge de `debugPrint` apareix en la consola; este exemple encara no guarda dades. Pots explorar els símbols en la [referència de `Icons`](https://api.flutter.dev/flutter/material/Icons-class.html).
