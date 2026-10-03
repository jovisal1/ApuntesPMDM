---
title: "Widgets bàsics"
description: "Text, imatges, icones, botons i l’estructura d’una pantalla Flutter, amb exemples per a practicar."
sidebar:
  label: Bàsics
  order: 3
---

Ja sabem que una pantalla es construïx combinant widgets. Ara coneixerem les peces que utilitzarem més sovint: **mostrar contingut, oferir una acció i donar estructura a la pantalla**. No necessites memoritzar tots els arguments; comença per entendre què resol cada widget i prova a canviar una propietat cada vegada.

Imagina una fitxa d’una ruta: té un títol, una fotografia, una icona que indica la dificultat i un botó per a guardar-la. Estes peces es col·loquen dins d’una pantalla amb una barra superior. Al llarg de l’apartat construirem els elements d’esta interfície.

| Necessitat | Widget |
| --- | --- |
| Mostrar un text | `Text` |
| Mostrar una fotografia o il·lustració | `Image` |
| Representar una idea mitjançant un símbol | `Icon` |
| Executar una acció | `FilledButton`, `ElevatedButton`, `OutlinedButton`, `TextButton` o `IconButton` |
| Reservar el lloc d’una peça pendent | `Placeholder` |
| Mostrar la barra superior | `AppBar` |
| Organitzar les zones d’una pantalla Material | `Scaffold` |

## 🧪 Un lloc per a provar els exemples

Els primers blocs són **fragments d’interfície**. Per a executar-los, apega este programa en `lib/main.dart` o en [DartPad](https://dartpad.dev/) i substituïx `const Text('La meua primera ruta')` pel widget que vulgues provar:

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: ProvaWidgets()));

class ProvaWidgets extends StatelessWidget {
  const ProvaWidgets({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Widgets bàsics')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: const Text('La meua primera ruta'),
        ),
      ),
    );
  }
}
```

`MaterialApp` configura l’aplicació Material i `Scaffold` organitza la pantalla. `Center` centra el fill i `Padding` deixa espai al voltant. El `context` disponible en `build` permet consultar el tema o localitzar servicis de l’arbre, com veurem en mostrar missatges.

:::tip[Llig els arguments per la seua funció 🔎]
En `Text('La meua primera ruta')`, el text és un argument posicional. En `Icon(Icons.terrain, size: 32)`, `size` és un argument amb nom. `child` rep un sol widget; `children`, una llista. Utilitza `const` quan la configuració siga constant; si necessita un valor calculat en execució, com `Theme.of(context)`, omet-lo en eixa expressió.
:::

## 📝 Text: mostrar i donar format al text

**`Text` mostra una cadena de caràcters.** Pot ser un títol, una descripció o un valor obtingut d’una variable. L’aspecte es configura mitjançant `TextStyle`:

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

El text apareix amb mida 24, en negreta i amb color verd blavós. `TextStyle` és un objecte de configuració, no un altre widget. Les mesures de la interfície s’expressen en **píxels lògics**, que Flutter adapta a la densitat de cada pantalla.

| Propietat | Per a què servix |
| --- | --- |
| `style` | Configura mida, pes, color i altres detalls del text. |
| `textAlign` | Alinea les línies dins de l’amplària disponible. |
| `maxLines` | Limita el nombre de línies que es mostren. |
| `overflow` | Decidix com representar el text que no cap. |

Per a una descripció breu podem limitar les línies i afegir punts suspensius:

```dart
const SizedBox(
  width: 240,
  child: Text(
    'Un recorregut entre arbres que acaba al costat d’una cascada.',
    maxLines: 2,
    overflow: TextOverflow.ellipsis,
    textAlign: TextAlign.center,
  ),
)
```

Ací `SizedBox` limita l’amplària a 240, dins del que permeta el pare. Així el text té un espai concret on ajustar-se. **`textAlign` alinea el text dins d’eixe espai; no col·loca el widget al centre de la pantalla.** Per a això utilitzem `Center`.

En una aplicació convé aprofitar els estils del tema per a mantindre una jerarquia visual coherent:

```dart
Text(
  'Ruta de la cascada',
  style: Theme.of(context).textTheme.headlineSmall,
)
```

### Diversos estils en una mateixa frase

`Text.rich` permet combinar fragments amb `TextSpan`. Cada fragment pot tindre el seu propi estil:

```dart
const Text.rich(
  TextSpan(
    text: 'Dificultat: ',
    children: [
      TextSpan(
        text: 'fàcil',
        style: TextStyle(fontWeight: FontWeight.bold),
      ),
    ],
  ),
)
```

El resultat és una sola frase en què «fàcil» apareix en negreta. Si necessites que l’usuari copie el contingut, pots utilitzar `SelectableText`; `Text` no permet seleccionar-lo per defecte. Consulta els detalls en la [referència de `Text`](https://api.flutter.dev/flutter/widgets/Text-class.html).

:::note[Prova una variació ✍️]
Canvia el text per una descripció més llarga i alterna `maxLines: 1` i `maxLines: 3`. Després elimina el límit d’amplària: observa com influïx l’espai disponible en el salt de línia.
:::

## 🖼️ Image: incorporar imatges

**`Image` mostra una imatge**, però necessitem indicar d’on procedix. Els constructors amb nom permeten triar l’origen:

| Constructor | Origen | Exemple d’ús |
| --- | --- | --- |
| `Image.asset` | Un recurs inclòs en l’aplicació. | Un logotip o una il·lustració. |
| `Image.network` | Una adreça d’Internet. | Una fotografia d’un catàleg. |
| `Image.file` | Un arxiu del dispositiu. | Una fotografia local en plataformes compatibles; no s’admet en Flutter web. |
| `Image.memory` | Bytes emmagatzemats en memòria. | Una imatge rebuda o generada com a dades. |

### Imatges de l’aplicació

Per a utilitzar una fotografia local, crea la carpeta `assets/images/` en l’arrel del projecte i col·loca-hi un arxiu anomenat `ruta.jpg`. Després declara la carpeta en **el bloc `flutter` que ja existix** en `pubspec.yaml`:

```yaml
flutter:
  uses-material-design: true
  assets:
    - assets/images/
```

Respecta la indentació: YAML utilitza espais per a expressar l’estructura. Executa `flutter pub get` després de modificar la configuració i torna a iniciar l’aplicació si el recurs nou no apareix. Esta preparació requerix un projecte local; DartPad no incorpora els arxius del teu ordinador.

```dart
Image.asset(
  'assets/images/ruta.jpg',
  width: 300,
  height: 180,
  fit: BoxFit.cover,
  semanticLabel: 'Sender entre arbres al costat d’una cascada',
)
```

`width` i `height` definixen l’espai sol·licitat. **`fit` indica com ajustar la imatge a eixe espai**:

| Valor | Resultat |
| --- | --- |
| `BoxFit.cover` | Manté la proporció i cobrix l’espai; pot retallar les vores. |
| `BoxFit.contain` | Manté la proporció i mostra la imatge completa; pot deixar espai lliure. |
| `BoxFit.fill` | Ompli l’espai deformant la imatge si les proporcions no coincidixen. |

`semanticLabel` descriu la imatge per a les tecnologies d’assistència. Si és purament decorativa, pots utilitzar `excludeFromSemantics: true`. La [referència de `Image.asset`](https://api.flutter.dev/flutter/widgets/Image/Image.asset.html) explica la càrrega de recursos.

### Imatges d’Internet

Una imatge remota necessita connexió i pot fallar. Podem reservar-ne la mida i oferir una alternativa mitjançant `errorBuilder`:

```dart
Image.network(
  'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
  width: 300,
  height: 180,
  fit: BoxFit.cover,
  semanticLabel: 'Un mussol posat en una branca',
  errorBuilder: (context, error, stackTrace) => const SizedBox(
    width: 300,
    height: 180,
    child: Center(child: Text('No s’ha pogut carregar la imatge')),
  ),
)
```

`errorBuilder` rep informació de l’error i retorna el widget que es mostrarà en lloc de la imatge. També existix `loadingBuilder` per a personalitzar l’espera. En web, el servidor d’origen ha de permetre la càrrega segons les restriccions del navegador; en altres plataformes revisa la configuració d’accés a Internet. Consulta la [referència de `Image.network`](https://api.flutter.dev/flutter/widgets/Image/Image.network.html).

:::caution[Si un recurs no apareix]
Comprova la ruta, les majúscules i minúscules del nom i la declaració en `pubspec.yaml`. La ruta s’escriu des de l’arrel del projecte, no des de `lib/main.dart`.
:::

## 🧭 Icon: representar una idea amb un símbol

**`Icon` dibuixa un símbol a partir d’un `IconData`**, com els que oferix la classe `Icons`. És útil per a acompanyar una etiqueta o identificar una acció:

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

## 👆 Botons: respondre a una acció

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

### Triar el tipus de botó

Tots estos botons atenen la pulsació, però tenen distinta presència visual:

| Widget | Quan encaixa |
| --- | --- |
| `FilledButton` | Una acció principal que volem destacar. |
| `ElevatedButton` | Una acció que necessita destacar mitjançant elevació. |
| `OutlinedButton` | Una acció secundària amb vora visible. |
| `TextButton` | Una acció de menor èmfasi visual. |
| `IconButton` | Una acció compacta representada per una icona. |
| `FloatingActionButton` | Una acció destacada de la pantalla, habitualment en `Scaffold.floatingActionButton`. |

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

## 🚧 Placeholder: reservar un espai provisional

Durant el desenvolupament potser ja saps on anirà el mapa, però encara no tens eixe component. **`Placeholder` dibuixa un requadre amb diagonals per a fer visible eixe espai pendent**:

```dart
const SizedBox(
  width: 300,
  height: 160,
  child: Placeholder(
    color: Colors.teal,
    strokeWidth: 2,
  ),
)
```

`SizedBox` delimita el buit i `Placeholder` l’assenyala. Quan tingues el mapa, substituïx el marcador pel widget definitiu. **No representa automàticament la càrrega d’una imatge**: per a una espera utilitza un indicador com `CircularProgressIndicator` o personalitza `Image.loadingBuilder`.

## 🏗️ Scaffold i AppBar: donar estructura a la pantalla

Fins ara hem provat peces dins del cos d’una pantalla. **`Scaffold` oferix les zones habituals d’una pantalla Material**, i `AppBar` configura la barra superior:

```dart
Scaffold(
  appBar: AppBar(
    title: const Text('Les meues rutes'),
    actions: [
      IconButton(
        tooltip: 'Buscar rutes',
        icon: const Icon(Icons.search),
        onPressed: () {
          debugPrint('Buscar rutes');
        },
      ),
    ],
  ),
  body: const Center(child: Text('Tria la teua pròxima ruta')),
  floatingActionButton: FloatingActionButton(
    tooltip: 'Afegir ruta',
    onPressed: () {
      debugPrint('Afegir ruta');
    },
    child: const Icon(Icons.add),
  ),
)
```

En este cas, reemplaça el `Scaffold` complet del programa de prova. `Scaffold` no substituïx `MaterialApp`: el primer organitza una pantalla; el segon configura l’aplicació.

| Zona de `Scaffold` | Contingut habitual |
| --- | --- |
| `appBar` | Una barra superior, normalment `AppBar`. |
| `body` | El contingut principal. |
| `floatingActionButton` | Un botó per a una acció destacada. |
| `drawer` | Un panell lateral de navegació. |
| `bottomNavigationBar` | Navegació en la part inferior; per exemple, `NavigationBar`. |

En `AppBar`, `title` rep el títol, `actions` una llista d’accions al final i `leading` un widget al principi. Quan no configures `leading`, Flutter pot afegir un botó per a tornar o obrir el panell lateral, segons el context.

:::note[Una pantalla no es desplaça per tindre Scaffold]
`Scaffold` organitza zones, però el seu `body` no es torna desplaçable automàticament. Si el contingut no cap, necessites una solució com `ListView` o `SingleChildScrollView`.
:::

### Mostrar un avís amb SnackBar

Per a donar una resposta breu a una acció, podem mostrar una **`SnackBar` mitjançant `ScaffoldMessenger`**. Este fragment pot substituir el text del programa de prova:

```dart
FilledButton(
  onPressed: () {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Ruta guardada')),
    );
  },
  child: const Text('Guardar ruta'),
)
```

`ScaffoldMessenger.of(context)` localitza el gestor de missatges més pròxim. En este programa, `MaterialApp` el proporciona i el `Scaffold` s’hi registra. **Mostrar «Ruta guardada» no persistix la ruta**: l’operació de guardat s’ha de programar per separat.

Una `SnackBar` servix per a una resposta temporal. Un `MaterialBanner` presenta un avís en la part superior del cos i es manté fins que es retire, per exemple mitjançant `hideCurrentMaterialBanner`. Si n’utilitzes un, proporciona una acció per a tancar-lo o atendre l’avís. Consulta les referències de [Scaffold](https://api.flutter.dev/flutter/material/Scaffold-class.html) i [ScaffoldMessenger](https://api.flutter.dev/flutter/material/ScaffoldMessenger-class.html).

## 🧩 Combinar les peces: una fitxa de ruta

Per a combinar estos widgets necessitem algunes peces de disposició. **`Column` col·loca fills en vertical, `Row` en horitzontal i `SizedBox` pot deixar una separació entre ells**. `Padding` afig espai interior; `Container` permet reunir espai, alineació i decoració. Els estudiarem amb més detall en treballar la disposició de la interfície.

:::tip[La mida depén del pare 📐]
Un widget sol·licita una mida dins dels límits que rep del pare. Per això `width: 300` no garantix 300 píxels lògics en qualsevol posició. Esta relació s’explica en la [guia oficial de restriccions](https://docs.flutter.dev/ui/layout/constraints). En una `Row`, `Expanded` pot assignar al text l’espai restant perquè s’ajuste.
:::

Este programa és **complet i independent** de l’anterior. Funciona sense imatges locals ni connexió: utilitzem un `Placeholder` per a la futura fotografia. Apega’l en `lib/main.dart` o en DartPad:

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: FitxaRuta()));

class FitxaRuta extends StatelessWidget {
  const FitxaRuta({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Explora')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(24),
          children: [
            const SizedBox(
              height: 180,
              child: Placeholder(color: Colors.teal),
            ),
            const SizedBox(height: 16),
            Text(
              'Ruta de la cascada',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            const Row(
              children: [
                Icon(Icons.terrain, color: Colors.teal),
                SizedBox(width: 8),
                Expanded(child: Text('Dificultat fàcil · 4 km')),
              ],
            ),
            const SizedBox(height: 12),
            const Text(
              'Un passeig entre arbres per a disfrutar del paisatge. '
              'Porta aigua i calçat còmode.',
            ),
            const SizedBox(height: 24),
            FilledButton.icon(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Has polsat Guardar ruta'),
                  ),
                );
              },
              icon: const Icon(Icons.bookmark_add_outlined),
              label: const Text('Guardar ruta'),
            ),
          ],
        ),
      ),
    );
  }
}
```

`SafeArea` evita que el contingut envaïsca zones reservades del dispositiu. `ListView` organitza la fitxa en vertical i permet desplaçar-la si no cap; `Expanded` deixa al text de la fila utilitzar l’amplària restant. Els `SizedBox` separen les peces sense afegir text ni decoració.

Observa que el botó mostra un missatge, però la fitxa continua sent un `StatelessWidget`: **una acció no implica necessàriament estat propi**. Necessitaríem gestionar estat si volguérem recordar dins de la fitxa si està guardada i canviar-ne la icona o l’etiqueta.

## 🎯 Practica amb la fitxa

1. Canvia el títol, la descripció i la distància per a representar una altra ruta.
2. Afig un segon `Text` amb una recomanació en cursiva.
3. Substituïx el botó per `OutlinedButton.icon` i compara’n l’èmfasi visual.
4. En un projecte local, incorpora una fotografia amb `Image.asset` en lloc del `Placeholder`. Compara `BoxFit.cover` i `BoxFit.contain`.
5. Afig una acció d’informació a `AppBar` que mostre una `SnackBar` en polsar-la.
6. Prova una finestra estreta i una mida de text més gran en el dispositiu. Comprova que pots desplaçar-te i llegir el contingut.

:::tip[Abans de passar al següent apartat ✅]
Has de poder explicar quina diferència hi ha entre `Icon` i `IconButton`, per què un botó rep una funció en `onPressed`, on declares una imatge local i quin paper tenen `MaterialApp`, `Scaffold` i `AppBar`. Si pots modificar la fitxa i justificar la teua elecció de widgets, ja tens una base per a construir pantalles pròpies.
:::
