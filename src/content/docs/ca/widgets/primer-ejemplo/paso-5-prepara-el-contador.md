---
title: "Pas 5. Prepara el comptador"
sidebar:
  order: 7
---

En `pantalla_entrenament.dart`, substituïx el `body` per:

```dart
body: const Center(
  child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      Text('Voltes completades'),
      SizedBox(height: 12),
      Text('0', style: TextStyle(fontSize: 56)),
    ],
  ),
),
```

`Center` rep un `child`; `Column` rep una llista `children` i col·loca els elements en vertical. `SizedBox` deixa una separació i `TextStyle` augmenta la mida del número en píxels lògics.

Per defecte, esta columna ocupa l’altura disponible i col·loca els fills al principi. **`mainAxisAlignment: MainAxisAlignment.center` centra els fills dins de la columna**. També existixen `start`, `end`, `spaceBetween`, `spaceAround` i `spaceEvenly`. Una altra solució és `mainAxisSize: MainAxisSize.min`, que reduïx l’altura de la columna al seu contingut i permet que el `Center` centre el grup.

Afig este argument al `Scaffold`, al mateix nivell que `body`:

```dart
floatingActionButton: FloatingActionButton(
  tooltip: 'Registrar una volta',
  onPressed: () {
    debugPrint('Has completat una volta');
  },
  child: const Icon(Icons.add),
),
```

`onPressed` rep una funció que Flutter executarà en polsar. La icona és constant, però el botó amb esta funció no pot declarar-se `const`. `debugPrint` escriu en la consola; encara no modifica el número de la pantalla.

:::tip[Format que ajuda a llegir l’arbre 🔎]
Utilitza **Format Document** en l’editor o `dart format lib` des de la terminal. Les comes finals faciliten afegir arguments i solen afavorir blocs llegibles; el format exacte depén de la versió del formatador i de les regles que aplique.
:::
