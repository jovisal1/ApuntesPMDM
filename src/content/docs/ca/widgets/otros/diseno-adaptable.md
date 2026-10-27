---
title: "Disseny adaptable: LayoutBuilder i MediaQuery"
sidebar:
  order: 4
---

Una fitxa pot cabre en dos panells en una finestra ampla i necessitar una columna en una finestra estreta. Adaptar la interfície consisteix a triar una composició llegible segons l’espai disponible, mantenint el contingut i les accions.

No basta distingir «mòbil» i «tauleta»: una aplicació d’escriptori pot ocupar una finestra menuda i un component pot estar dins d’un panell lateral. Usarem `LayoutBuilder` per a decidir dins d’un component i `MediaQuery.sizeOf` per a consultar la grandària de la finestra.

Este fragment es pot col·locar com un fill de la llista d’exemples d’`Otros`:

```dart
LayoutBuilder(
  builder: (context, constraints) {
    final amplio = constraints.maxWidth >= 600;
    return Text(amplio ? 'Hay espacio para dos paneles' : 'Usaremos una columna');
  },
)
```

En redimensionar la finestra, el text canvia quan l’amplària disponible per a este widget arriba a 600 píxels lògics. Són unitats de disposició, no píxels físics de la pantalla. El valor 600 és un llindar triat per a l’exemple, no una detecció del tipus de dispositiu.

## Quina mesura necessitem

| Pregunta | Ferramenta |
| --- | --- |
| Quant d’espai em permet ocupar el pare? | `LayoutBuilder` i les seues `BoxConstraints`. |
| Quina grandària té la finestra de l’aplicació? | `MediaQuery.sizeOf(context)`. |

Una finestra de 1200 pot contindre un panell de 360. En eixe panell `MediaQuery.sizeOf(context).width` pot continuar sent 1200, mentre que `constraints.maxWidth` serà 360. Per a organitzar els fills, el component ha d’atendre eixe espai local.

## 🔧 Propietats i consultes principals

### 1. `LayoutBuilder`: construir segons les restriccions

La propietat `builder` rep un `BuildContext` i un objecte `BoxConstraints`, amb els límits mínims i màxims d’amplària i altura que permet el pare. `maxWidth` és un límit disponible, no una mesura posterior del contingut. Flutter torna a avaluar el builder quan canvien les restriccions, entre altres motius; no necessitem guardar l’amplària amb `setState`.

Crearem un component que rep dos widgets: `principal` i `secundario`. En poc espai els apila; en espai ampli els situa un al costat de l’altre. Este fitxer complet serveix com a referència per a les activitats posteriors.

`lib/ui/core/ui/panel_adaptable.dart`

```dart
import 'package:flutter/material.dart';

class PanelAdaptable extends StatelessWidget {
  const PanelAdaptable({
    super.key,
    required this.principal,
    required this.secundario,
    this.puntoCambio = 600,
    this.separacion = 16,
  });

  final Widget principal;
  final Widget secundario;
  final double puntoCambio;
  final double separacion;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < puntoCambio) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              principal,
              SizedBox(height: separacion),
              secundario,
            ],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: principal),
            SizedBox(width: separacion),
            Expanded(child: secundario),
          ],
        );
      },
    );
  }
}
```

`puntoCambio` controla quan canvia la composició i `separacion` l’espai entre panells. `required` obliga a proporcionar els dos continguts, que no depenen del disseny triat. L’`if` retorna una de les dos composicions.

En la `Column`, `CrossAxisAlignment.stretch` fa que els dos panells ocupen l’amplària disponible. En la `Row`, cada `Expanded` reparteix per igual l’amplària restant després de descomptar la separació. Així el text rep una amplària limitada i pot ocupar diverses línies. Els `Expanded` actuen horitzontalment perquè pertanyen a la fila.

**Este component necessita una amplària màxima finita**, com la que rep d’un `ListView` vertical. Dins d’una `Row`, embolcalla’l amb `Expanded` per a limitar-ne l’amplària. No usa `maxHeight` perquè una llista vertical pot oferir altura sense límit. Tampoc afig desplaçament: la llista exterior desplaça els dos panells complets.

### 2. `MediaQuery.sizeOf`: decisions sobre la finestra

Per a una decisió general, com augmentar el marge d’una pantalla ampla, consulta la grandària de la finestra. Este fragment substitueix el contingut d’un mètode `build` davall de `MaterialApp`:

```dart
final anchoVentana = MediaQuery.sizeOf(context).width;
final margen = anchoVentana >= 900 ? 32.0 : 16.0;

return Padding(
  padding: EdgeInsets.all(margen),
  child: const Text('El margen depende del ancho de la ventana'),
);
```

`sizeOf` retorna un `Size`; `width` i `height` expressen les dimensions lògiques. La consulta fa que el context es reconstruïsca en canviar eixa grandària. Preferim `sizeOf` a `MediaQuery.of(context).size` quan només necessitem la grandària.

Ací el marge canvia amb la finestra; el component anterior continua decidint la composició a partir de les seues pròpies restriccions. No calcules l’amplària d’una targeta com una fracció de la finestra si el pare pot donar-li menys espai. Tampoc reduïsques la grandària del text per a fer-lo cabre: permet diverses línies i desplaçament.

### 3. Triar el punt de canvi pel contingut

Prova l’espai que necessiten els panells, la separació i els marges. L’exemple permet dos panells amb 600 d’amplària local; si els continguts necessiten més, augmenta `puntoCambio`. Girar el dispositiu o redimensionar la finestra ha de conservar el mateix contingut i les mateixes accions.

No bases tota l’adaptació en l’orientació: dos finestres en horitzontal poden tindre amplàries molt diferents. Comença per l’amplària que rep el component i comprova també l’altura disponible i el text ampliat.

## 🧩 Mostra les variants en el catàleg

Afig este import a `lib/ui/catalogo/ui/otros_ejemplos_pantalla.dart`:

```dart
import '../../core/ui/panel_adaptable.dart';
```

Conserva els exemples existents i afig estos widgets a `children` del seu `ListView`. El segon cas limita l’amplària a 360; si el pare disposa de menys espai, rebrà eixe límit menor:

```dart
PanelAdaptable(
  principal: const Card(
    child: Padding(
      padding: EdgeInsets.all(16),
      child: Text('Taladro percutor: herramienta para pequeñas reparaciones.'),
    ),
  ),
  secundario: const Card(
    child: Padding(
      padding: EdgeInsets.all(16),
      child: Text('Recogida en La Plaza. Préstamo máximo: 3 días.'),
    ),
  ),
),
const SizedBox(height: 24),
Align(
  alignment: Alignment.centerLeft,
  child: SizedBox(
    width: 360,
    child: PanelAdaptable(
      puntoCambio: 500,
      separacion: 8,
      principal: const Text('Resumen dentro de un panel estrecho'),
      secundario: const Text('Condiciones debajo del resumen'),
    ),
  ),
),
```

En una finestra ampla, el primer exemple pot mostrar dos panells mentre el segon manté una columna. Això permet comprovar que el disseny respon a l’amplària local i no a la grandària global. L’`Align` permet que el `SizedBox` siga més estret que la llista.

## ✍️ Activitat: una fitxa adaptable

Crea `lib/ui/core/ui/ficha_adaptable.dart` amb una classe `FichaAdaptable` que reutilitze `PanelAdaptable`. Rebrà `String titulo`, `String descripcion`, `String condiciones`, `VoidCallback onConsultar` i `double puntoCambio = 600`.

- El panell principal mostra títol i descripció; el secundari, condicions i un botó **Consultar** que executa el callback rebut.
- Les variants es controlen mitjançant paràmetres. No crees classes diferents per a mòbil i escriptori ni canvies les dades en canviar d’amplària.
- Mostra en `Otros` dos fitxes amb textos i punts de canvi diferents; col·loca’n una dins d’una amplària limitada. Conserva també les demostracions anteriors.
- En cada composició s’han de veure tots els textos i el botó ha d’executar la mateixa acció una sola vegada per pulsació.

## ✅ Comprovacions

| Situació | Resultat esperat amb `puntoCambio: 600` |
| --- | --- |
| Amplària local de 320 o 599 | Panell secundari davall del principal. |
| Amplària local de 600 o 900 | Panells un al costat de l’altre. |
| Finestra ampla i component limitat a 360 | Una columna dins del component. |
| Text ampliat i descripcions llargues | Text complet, sense desbordaments; la llista permet arribar al final. |
| Finestra baixa o dispositiu en horitzontal | Es pot desplaçar fins a l’últim control. |

Des de l’arrel de `catalogo_widgets`, executa `dart format lib`, que aplica format, i `flutter analyze`, que comprova el codi. Després executa `flutter run` per a provar el catàleg: redimensiona la finestra, amplia el text i comprova el desplaçament. El punt de canvi s’aplica a l’amplària **després** del padding de la llista; una finestra de 600 no implica 600 disponibles per al component.

Referències: [LayoutBuilder](https://api.flutter.dev/flutter/widgets/LayoutBuilder-class.html), [MediaQuery.sizeOf](https://api.flutter.dev/flutter/widgets/MediaQuery/sizeOf.html) i [enfocament de Flutter per a interfícies adaptables](https://docs.flutter.dev/ui/adaptive-responsive/general).
