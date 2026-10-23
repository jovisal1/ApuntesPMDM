---
title: "Stack i Positioned: compondre per capes"
sidebar:
  order: 4
---

**`Stack` permet superposar widgets.** És útil per a posar una insígnia damunt d’una il·lustració o un avís en una cantonada. `Positioned` situa un fill respecte a les vores de l’`Stack`, sense reorganitzar els altres com una fila.

```dart
SizedBox(
  height: 100,
  child: Stack(
    children: [
      Container(color: Colors.teal.shade50),
      const Text('Reserva abierta'),
    ],
  ),
)
```

`SizedBox` aporta altura finita. La caixa de color queda darrere del text perquè és el primer fill: els següents es dibuixen damunt.

## 🔧 Propietats principals

### 1. `alignment`: col·locar fills sense posició explícita

Definix la referència per als fills sense desplaçaments de `Positioned`. És útil per a centrar un símbol damunt d’un fons.

```dart
SizedBox(
  height: 140,
  child: Stack(
    alignment: Alignment.center,
    children: [
      Container(color: Colors.teal.shade50),
      const Icon(Icons.landscape, size: 72),
    ],
  ),
)
```

`Icon` dibuixa el símbol i `Container` aporta el fons. La grandària es definix des de fora; un `Stack` només amb fills posicionats no obté d’ells la grandària.

### 2. Positioned: `top`, `right`, `bottom` i `left`

Situen una capa a una distància de la vora. És útil per a una insígnia que ha de quedar en una cantonada encara que canvie el fons.

```dart
SizedBox(
  height: 160,
  child: Stack(
    children: [
      Container(color: Colors.indigo.shade50),
      const Positioned(
        top: 12,
        right: 12,
        child: Chip(label: Text('Nueva')),
      ),
    ],
  ),
)
```

`Chip` aporta l’etiqueta. `Positioned` ha de quedar davall de l’`Stack`, no directament en la llista. `PositionedDirectional` permet `start` i `end` per a seguir el sentit de lectura.

### 3. `fit` i `Positioned.fill`: cobrir l’àrea

`StackFit.expand` estira els fills no posicionats a l’espai disponible. `Positioned.fill` fa que una capa cobrisca tota la caixa. Són útils per a fons i vels.

```dart
SizedBox(
  height: 140,
  child: Stack(
    fit: StackFit.expand,
    children: [
      Container(color: Colors.indigo),
      const Positioned.fill(child: ColoredBox(color: Colors.black26)),
      const Center(child: Text('Ruta nocturna', style: TextStyle(color: Colors.white))),
    ],
  ),
)
```

`ColoredBox` pinta un color sense altres opcions de `Container`. `Colors.black26` és semitransparent. `Center` centra el text i `TextStyle` aporta contrast.

### 4. `clipBehavior`: retallar el que sobreïx

És útil per a decidir si una capa pot dibuixar-se fora de la caixa. No augmenta l’espai que ocupa l’`Stack`.

```dart
SizedBox(
  height: 100,
  child: Stack(
    clipBehavior: Clip.hardEdge,
    children: [
      Container(color: Colors.teal.shade50),
      const Positioned(top: -16, right: 12, child: Icon(Icons.star, size: 48)),
    ],
  ),
)
```

Compara amb `Clip.none`: apareix la part que sobreïx, però els veïns no s’aparten i la zona exterior no guanya automàticament interacció. No amagues informació important fora dels límits.

## ✍️ Activitat: crea components amb variants

Implementa els dos components en fitxers de `lib/ui/core/ui/`. Cada classe rep la configuració amb paràmetres amb nom i camps `final`; utilitza `StatelessWidget` i constructor `const` quan siga possible. Els paràmetres sense valor predeterminat són obligatoris (`required`), encara que admeten `null`. Les variants decidixen la presentació sense duplicar la classe.

### 1. `PortadaRuta`

`lib/ui/core/ui/portada_ruta.dart`

Paràmetres: `String titulo`, `bool nueva = false`, `bool etiquetaAbajo = false`.

Dibuixa un fons sense imatges externes i superposa títol i insígnia. `nueva` mostra la insígnia; l’altre paràmetre tria cantonada superior o inferior. Reserva altura explícita.

### 2. `IconoConAviso`

`lib/ui/core/ui/icono_con_aviso.dart`

Paràmetres: `IconData icono`, `bool mostrarAviso = false`.

Superposa un símbol d’avís a la icona principal. Inclou una descripció accessible que indique l’avís, no només color.

## 🧩 Mostra les variants en el catàleg

En `lib/ui/catalogo/ui/contenedores_ejemplos_pantalla.dart`, importa els fitxers dels components al principi:

```dart
import 'package:catalogo_widgets/ui/core/ui/portada_ruta.dart';
import 'package:catalogo_widgets/ui/core/ui/icono_con_aviso.dart';
```

Després d’implementar-los, estos usos poden formar part de la llista d’exemples:

```dart
const PortadaRuta(titulo: 'Ruta del faro', nueva: true),
const PortadaRuta(titulo: 'Ruta del faro', nueva: true, etiquetaAbajo: true),
const IconoConAviso(icono: Icons.map, mostrarAviso: true),
```

Comprova les quatre combinacions de la portada, un títol llarg i la icona amb avís i sense. Cap capa ha d’impedir llegir el títol.

Completa les variants que falten amb títols i explicacions pròpies. Utilitza `create-component` per a revisar el teu intent i `test-widget` per a comprovar requisits concrets. Executa `dart format lib test`, `flutter analyze` i les proves. Revisa també el resultat visual: una prova superada no garantix que el text es llija bé.

Referències: [Stack](https://api.flutter.dev/flutter/widgets/Stack-class.html) · [Positioned](https://api.flutter.dev/flutter/widgets/Positioned-class.html).
