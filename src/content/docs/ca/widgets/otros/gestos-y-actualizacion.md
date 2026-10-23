---
title: "Gestos: GestureDetector, InkWell i RefreshIndicator"
sidebar:
  order: 3
---

**Un contenidor visual no sempre és interactiu.** `GestureDetector` reconeix gestos sobre un fill; `InkWell` afig resposta visual Material al toc. `RefreshIndicator` reconeix arrossegar una llista per a actualitzar. Complementen la composició, no substituïxen un botó per a accions estàndard.

```dart
GestureDetector(
  onTap: () { debugPrint('Tocado'); },
  child: const Padding(padding: EdgeInsets.all(16), child: Text('Área de demostración')),
)
```

`Padding` dona espai al text. `GestureDetector` no dibuixa una ona ni ressalta automàticament la zona. Els callbacks impedixen que l’expressió siga `const`.

## 🔧 Propietats principals

### 1. `onTap`, `onDoubleTap` i `onLongPress`

Permeten distingir un toc, dos tocs i una pulsació mantinguda. Són útils per a una superfície amb diversos gestos si l’usuari sap què pot fer.

```dart
GestureDetector(
  behavior: HitTestBehavior.opaque,
  onTap: () { debugPrint('Un toque'); },
  onDoubleTap: () { debugPrint('Dos toques'); },
  onLongPress: () { debugPrint('Pulsación mantenida'); },
  child: const SizedBox(height: 80, child: Center(child: Text('Prueba los tres gestos'))),
)
```

`behavior: opaque` fa que tota la caixa reba el gest, també zones buides; no la pinta. Si reconeix doble toc, la resposta d’un toc pot esperar per a distingir-lo. No amagues accions essencials darrere de gestos difícils de descobrir.

### 2. InkWell: superfície Material i ona visible

És útil per a targetes i zones tàctils amb confirmació visual. Necessita un avantpassat `Material` on pintar l’ona.

```dart
Material(
  color: Colors.teal.shade50,
  borderRadius: BorderRadius.circular(12),
  clipBehavior: Clip.antiAlias,
  child: InkWell(
    onTap: () { debugPrint('Área activada'); },
    child: const Padding(padding: EdgeInsets.all(20), child: Text('Ver preparación')),
  ),
)
```

`Material` aporta superfície i retalla cantonades. `InkWell` gestiona el toc i `Padding`, l’espai. El color es pinta en `Material`, no en un `Container` opac que amagaria l’ona. Un botó resol més detalls d’interacció i accessibilitat per a una acció habitual.

### 3. RefreshIndicator: `onRefresh` i llista desplaçable

Permet demanar una actualització en arrossegar cap avall des de l’inici d’una llista vertical. `onRefresh` retorna un `Future<void>`: l’indicador espera que acabe.

```dart
SizedBox(
  height: 220,
  child: RefreshIndicator(
    onRefresh: () async {
      await Future<void>.delayed(const Duration(milliseconds: 600));
      debugPrint('Simulación de actualización terminada');
    },
    child: ListView(
      physics: const AlwaysScrollableScrollPhysics(),
      children: const [ListTile(title: Text('Preparación de la salida'))],
    ),
  ),
)
```

`async` permet esperar amb `await`. `Future.delayed` simula treball, no descarrega dades ni modifica la llista. `Duration` expressa el temps. `AlwaysScrollableScrollPhysics` permet el gest amb una sola fila. En web prova interacció tàctil o emulació mòbil; no equival a girar la roda del ratolí.

## ✍️ Activitat: crea components amb variants

Implementa els dos components en fitxers de `lib/ui/core/ui/`. Cada classe rep la configuració amb paràmetres amb nom i camps `final`; utilitza `StatelessWidget` i constructor `const` quan siga possible. Els paràmetres sense valor predeterminat són obligatoris (`required`), encara que admeten `null`. Les variants decidixen la presentació sense duplicar la classe.

`VoidCallback` és una funció sense arguments ni resultat; `?` permet `null`. `Future<void> Function()` és una funció sense arguments que retorna una operació asíncrona sense dada final.

### 1. `ZonaInteractiva`

`lib/ui/core/ui/zona_interactiva.dart`

Paràmetres: `String texto`, `bool conOnda = true`, `VoidCallback onTap`.

Selecciona `Material` amb `InkWell` o `GestureDetector`. Conserva acció i dimensions; afig etiqueta accessible i explica com activar l’àrea.

### 2. `ListaActualizable`

`lib/ui/core/ui/lista_actualizable.dart`

Paràmetres: `List<String> nombres`, `Future<void> Function() onActualizar`, `bool permitirConPocosDatos = true`.

Rep l’operació des de fora i entrega-la a `RefreshIndicator`. No crees peticions de xarxa dins de `build`. La variant permet o no arrossegar quan la llista és curta.

## 🧩 Mostra les variants en el catàleg

En `lib/ui/catalogo/ui/otros_ejemplos_pantalla.dart`, importa els fitxers dels components al principi:

```dart
import 'package:catalogo_widgets/ui/core/ui/zona_interactiva.dart';
import 'package:catalogo_widgets/ui/core/ui/lista_actualizable.dart';
```

Després d’implementar-los, estos usos poden formar part de la llista d’exemples:

```dart
ZonaInteractiva(
  texto: 'Ver preparación',
  conOnda: true,
  onTap: () { debugPrint('Acción del catálogo'); },
),
SizedBox(
  height: 220,
  child: ListaActualizable(
    nombres: const ['Ruta del río'],
    onActualizar: () async { debugPrint('Actualización solicitada'); },
  ),
),
```

Compara la mateixa acció amb ona i sense i compta les crides: una activació, una crida. Prova l’actualització amb llista curta i llarga. El callback no canvia les dades per si mateix: més avant el pare gestionarà l’estat. En tests controla el Future, sense pauses reals ni `pumpAndSettle` mentre gire un indicador indefinit.

Completa les variants que falten amb títols i explicacions pròpies. Utilitza `create-component` per a revisar el teu intent i `test-widget` per a comprovar requisits concrets. Executa `dart format lib test`, `flutter analyze` i les proves. Revisa també el resultat visual: una prova superada no garantix que el text es llija bé.

Referències: [GestureDetector](https://api.flutter.dev/flutter/widgets/GestureDetector-class.html) · [InkWell](https://api.flutter.dev/flutter/material/InkWell-class.html) · [RefreshIndicator](https://api.flutter.dev/flutter/material/RefreshIndicator-class.html).
