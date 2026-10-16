---
title: "Text: mostrar i donar format al text"
sidebar:
  order: 3
---

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
| `softWrap` | Permet el salt de línia quan s’esgota l’amplària. |
| `semanticsLabel` | Oferix una descripció accessible alternativa al text visible. |

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
