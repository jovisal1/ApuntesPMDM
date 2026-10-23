---
title: "ListView, GridView i desplaçament"
sidebar:
  order: 5
---

**`ListView` organitza una seqüència desplaçable i `GridView`, una graella desplaçable.** Són útils quan les dades no caben en pantalla. `SingleChildScrollView` afig desplaçament a una composició menuda, com una `Column`.

```dart
SizedBox(
  height: 140,
  child: ListView(
    children: const [Text('Ruta del río'), Text('Ruta del faro'), Text('Ruta del bosque')],
  ),
)
```

`SizedBox` limita l’altura dins de la llista del catàleg. Si una llista és tot el `body` d’un `Scaffold`, ja té una àrea delimitada. No poses llistes verticals sense altura dins d’una altra llista vertical.

## 🔧 Propietats principals

### 1. `scrollDirection`, `padding` i `physics`

Permeten triar el sentit del desplaçament, deixar espai a les vores i ajustar el comportament. Una llista horitzontal és útil per a opcions curtes.

```dart
SizedBox(
  height: 80,
  child: ListView(
    scrollDirection: Axis.horizontal,
    padding: const EdgeInsets.all(8),
    children: const [
      SizedBox(width: 140, child: Center(child: Text('Bosque'))),
      SizedBox(width: 140, child: Center(child: Text('Río'))),
      SizedBox(width: 140, child: Center(child: Text('Montaña'))),
    ],
  ),
)
```

`Axis.horizontal` canvia l’eix. Els `SizedBox` interiors reserven amplària per element. `EdgeInsets` configura l’espai interior. `AlwaysScrollableScrollPhysics` permet arrossegar encara amb poc contingut; l’utilitzarem amb l’actualització per gest.

### 2. `itemCount` i `itemBuilder`: construir des de dades

`ListView.builder` demana widgets quan els necessita. És útil per a col·leccions llargues: `itemCount` limita els índexs i `itemBuilder` descriu cada element.

```dart
SizedBox(
  height: 180,
  child: ListView.builder(
    itemCount: 30,
    itemBuilder: (context, index) {
      return Padding(
        padding: const EdgeInsets.all(12),
        child: Text('Parada ${index + 1}'),
      );
    },
  ),
)
```

`index` comença en 0: sumem 1 per a numerar parades. `Padding` separa el text dels límits. Amb una llista `rutas`, utilitzaries `itemCount: rutas.length` i `Text(rutas[index])`; declara les dades abans del `return` de `build`.

### 3. `gridDelegate`: columnes i separació

Un delegate és un objecte al qual encarreguem una decisió. Ací decidix la distribució de cel·les: és útil per a un mosaic de targetes o símbols.

```dart
SizedBox(
  height: 220,
  child: GridView.builder(
    itemCount: 12,
    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: 3,
      crossAxisSpacing: 8,
      mainAxisSpacing: 8,
      childAspectRatio: 1.5,
    ),
    itemBuilder: (context, index) {
      return Container(
        color: Colors.teal.shade50,
        alignment: Alignment.center,
        child: Text('Ruta ${index + 1}'),
      );
    },
  ),
)
```

Amb desplaçament vertical, `crossAxisCount` fixa les columnes. Les separacions s’apliquen entre cel·les; `childAspectRatio` és amplària/altura. `Container` pinta i centra l’etiqueta. El delegate és configuració, no un widget.

### 4. Adaptar el nombre de columnes

Si la finestra canvia de grandària, pot interessar una amplària màxima per cel·la en lloc de columnes fixes.

```dart
SizedBox(
  height: 220,
  child: GridView.builder(
    itemCount: 12,
    gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
      maxCrossAxisExtent: 180,
      mainAxisSpacing: 8,
      crossAxisSpacing: 8,
    ),
    itemBuilder: (context, index) => Center(child: Text('Etapa ${index + 1}')),
  ),
)
```

Canvia l’amplària de la finestra: Flutter recalcula les cel·les. `maxCrossAxisExtent` no demana que totes mesuren exactament 180. Amb finestres menors també es reduïxen.

### 5. SingleChildScrollView: una composició que pot créixer

És útil per a un contingut breu i heterogeni que normalment cap, però necessita desplaçament en una finestra menuda. No és la primera opció per a centenars de files.

```dart
const SizedBox(
  height: 120,
  child: SingleChildScrollView(
    padding: EdgeInsets.all(12),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Preparación'),
        SizedBox(height: 80),
        Text('Agua, calzado y protección solar'),
      ],
    ),
  ),
)
```

`Column` organitza però no desplaça per si mateixa. L’embolcall proporciona el desplaçament. No poses `Expanded` en esta columna sense resoldre els límits d’altura: en l’eix de desplaçament rep espai sense límit.

### Evitar desplaçaments que competixen

En el catàleg, mostra cada llista o graella dins d’un `SizedBox` amb altura finita. Per a una llista menuda que forme part del desplaçament exterior pots utilitzar `shrinkWrap: true` i `physics: NeverScrollableScrollPhysics()`, però mesurar tot el contingut costa més i no és una solució general per a llistes grans. `shrinkWrap` no substituïx comprendre les restriccions.

## ✍️ Activitat: crea components amb variants

Implementa els dos components en fitxers de `lib/ui/core/ui/`. Cada classe rep la configuració amb paràmetres amb nom i camps `final`; utilitza `StatelessWidget` i constructor `const` quan siga possible. Els paràmetres sense valor predeterminat són obligatoris (`required`), encara que admeten `null`. Les variants decidixen la presentació sense duplicar la classe.

### 1. `ListaRecorridos`

`lib/ui/core/ui/lista_recorridos.dart`

Paràmetres: `List<String> nombres`, `bool horizontal = false`.

Utilitza `ListView.builder`. En horitzontal dona amplària finita a cada element. Mostra un missatge sense dades i conserva l’ordre rebut. L’altura de prova es decidix des del catàleg.

### 2. `MosaicoRecorridos`

`lib/ui/core/ui/mosaico_recorridos.dart`

Paràmetres: `List<String> nombres`, `bool adaptable = false`, `int columnas = 2`.

Alterna columnes fixes positives i màxim de 180. Utilitza un builder i mostra cada nom una vegada per dada.

## 🧩 Mostra les variants en el catàleg

En `lib/ui/catalogo/ui/contenedores_ejemplos_pantalla.dart`, importa els fitxers dels components al principi:

```dart
import 'package:catalogo_widgets/ui/core/ui/lista_recorridos.dart';
import 'package:catalogo_widgets/ui/core/ui/mosaico_recorridos.dart';
```

Després d’implementar-los, estos usos poden formar part de la llista d’exemples:

```dart
const SizedBox(
  height: 180,
  child: ListaRecorridos(nombres: ['Río', 'Faro', 'Bosque']),
),
const SizedBox(
  height: 220,
  child: MosaicoRecorridos(nombres: ['Río', 'Faro', 'Bosque'], adaptable: true),
),
```

Prova dades buides, una i trenta. Desplaça’t fins a l’última i reduïx l’amplària. En proves de builders no exigisques trobar tots els elements abans de desplaçar-te: alguns encara no s’han construït.

Completa les variants que falten amb títols i explicacions pròpies. Utilitza `create-component` per a revisar el teu intent i `test-widget` per a comprovar requisits concrets. Executa `dart format lib test`, `flutter analyze` i les proves. Revisa també el resultat visual: una prova superada no garantix que el text es llija bé.

Referències: [ListView](https://api.flutter.dev/flutter/widgets/ListView-class.html) · [GridView](https://api.flutter.dev/flutter/widgets/GridView-class.html) · [SingleChildScrollView](https://api.flutter.dev/flutter/widgets/SingleChildScrollView-class.html).
