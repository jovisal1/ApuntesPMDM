---
title: "Botons: respondre a una acció"
sidebar:
  order: 6
---

Un botó combina una representació visual amb una funció que s’executa en polsar-lo. **`onPressed` rep eixa funció**, mentre que `child` descriu el contingut:

```dart
ElevatedButton(
  onPressed: () {
    debugPrint('Comencem la ruta');
  },
  child: const Text('Començar ruta'),
)
```

L’expressió `() { ... }` és una funció anònima sense paràmetres. L’entreguem al botó perquè l’execute més avant. Si ja existix una funció `guardarRuta`, escrivim `onPressed: guardarRuta`, sense parèntesis: `guardarRuta()` l’executaria en construir la interfície.

Estes propietats són habituals en `ElevatedButton`, `FilledButton`, `OutlinedButton` i `TextButton`. Consulta la referència de cada variant per a comprovar quines admet.

| Propietat | Per a què servix |
| --- | --- |
| `onPressed` | Funció que s’executa en polsar; `null` desactiva el botó. |
| `onLongPress` | Funció per a una pulsació prolongada en els botons que l’admeten. |
| `child` | Contingut del botó en el constructor habitual. |
| `style` | Personalitza l’aspecte mitjançant `ButtonStyle` en els botons de text, amb vora, amb farciment i elevats. |
| `autofocus / focusNode` | Permeten gestionar el focus, per exemple en navegar amb el teclat. |

### Triar el tipus de botó

Tots estos botons atenen la pulsació, però tenen distinta presència visual:

| Widget | Quan encaixa |
| --- | --- |
| [`FilledButton`](https://api.flutter.dev/flutter/material/FilledButton-class.html) | Una acció principal que volem destacar. |
| [`ElevatedButton`](https://api.flutter.dev/flutter/material/ElevatedButton-class.html) | Una acció que necessita destacar mitjançant elevació. |
| [`OutlinedButton`](https://api.flutter.dev/flutter/material/OutlinedButton-class.html) | Una acció secundària amb vora visible. |
| [`TextButton`](https://api.flutter.dev/flutter/material/TextButton-class.html) | Una acció de menor èmfasi visual. |
| [`IconButton`](https://api.flutter.dev/flutter/material/IconButton-class.html) | Una acció compacta representada per una icona. |
| [`FloatingActionButton`](https://api.flutter.dev/flutter/material/FloatingActionButton-class.html) | Una acció destacada de la pantalla, habitualment en `Scaffold.floatingActionButton`. |

En `IconButton` destaquen `icon`, `tooltip`, `iconSize` i `onPressed`. En `FloatingActionButton`, `child`, `tooltip`, `backgroundColor` i `onPressed`. Els constructors `.icon` dels botons anteriors utilitzen `icon` i `label` per a separar símbol i text.

Per a combinar icona i text, diversos botons oferixen el constructor `.icon`:

```dart
FilledButton.icon(
  onPressed: () {
    debugPrint('Ruta guardada');
  },
  icon: const Icon(Icons.bookmark_add_outlined),
  label: const Text('Guardar ruta'),
)
```

**`onPressed: null` desactiva el botó**. És útil quan una acció encara no està disponible:

```dart
const OutlinedButton(
  onPressed: null,
  child: Text('Descarregar mapa'),
)
```

El tema aporta l’aspecte habitual dels botons. Si necessites modificar-ne un de concret, utilitza la propietat `style`, per exemple `FilledButton.styleFrom(...)`. Evita assignar colors a tots els botons per separat quan pots configurar el tema. La [referència de `FilledButton`](https://api.flutter.dev/flutter/material/FilledButton-class.html) inclou les variants i propietats.
