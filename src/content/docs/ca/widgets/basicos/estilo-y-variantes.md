---
title: "Variants d’un component"
sidebar:
  order: 2
---

Una **variant** és una manera de presentar o configurar un mateix component. Pensa en una etiqueta que de vegades ha de ser discreta i altres vegades destacada. No cal escriure dos classes: podem crear-ne una i decidir l’aspecte amb un paràmetre.

Construirem l’etiqueta pas a pas. Només utilitzarem un widget que mostra text i unes opcions per a donar-li format; les expliquem ací abans d’utilitzar-les. Més avant coneixeràs les altres possibilitats.

## 1. Les peces mínimes de l’exemple

`Text` és un widget que mostra la cadena que rep entre parèntesis:

```dart
const Text('Ruta de la cascada')
```

Per a canviar l’aspecte podem proporcionar `style`, que rep un objecte `TextStyle` amb la configuració visual:

```dart
const Text(
  'Ruta de la cascada',
  style: TextStyle(
    fontSize: 22,
    fontWeight: FontWeight.bold,
    color: Colors.indigo,
  ),
)
```

| Peça | Què significa en este exemple |
| --- | --- |
| `'Ruta de la cascada'` | Contingut visible. Es passa com a primer argument, sense nom. |
| `style: TextStyle(...)` | Aspecte del text. `TextStyle` és un objecte de configuració, no un altre widget. |
| `fontSize: 22` | Grandària en píxels lògics, que Flutter adapta a la densitat de la pantalla. |
| `fontWeight: FontWeight.bold` | Negreta. `FontWeight.normal` seleccionaria un pes normal. |
| `color: Colors.indigo` | Color del text. `Colors` oferix valors de color definits. |

El resultat és una etiqueta gran, en negreta i de color indi. La configuració només s’aplica a eixe text. Ara farem que un component trie entre eixe aspecte i un de més discret.

## 2. Decidix què rep el component

Abans d’escriure la classe, pensa què hauria de poder decidir qui utilitza l’etiqueta. En l’exemple anterior, el missatge i l’estil estaven escrits directament dins de `Text`. Si copiàrem el codi per a cada etiqueta, hauríem de repetir les decisions de grandària, pes i color en molts llocs.

Reunirem eixes decisions en un component propi anomenat `EtiquetaCatalogo`. Serà una classe que construïx un `Text` per nosaltres. Des de fora li indicarem **quin missatge mostrar** i **si ha de destacar-lo**; dins de la classe decidirem com es traduïx això en grandària, pes i color.

Les dades que proporcionem en crear el component entren pels **paràmetres del constructor**. Necessitarem estos dos:

| Paràmetre | Funció | Exemple |
| --- | --- | --- |
| `String texto` | Contingut obligatori que mostrarà l’etiqueta. | `texto: 'Ruta de la cascada'` |
| `bool destacada` | Tria la variant visual; per defecte val `false`. | `destacada: true` |

`String texto` significa que el paràmetre `texto` rep una cadena de caràcters. El farem obligatori perquè l’etiqueta necessita un missatge. `bool destacada` rep un de dos valors: `true` o `false`. El farem opcional: si no l’indiquem, l’etiqueta utilitzarà l’aspecte normal.

Així l’utilitzarem quan hàgem creat la classe:

```dart
const EtiquetaCatalogo(texto: 'Ruta de la cascada')
```

Esta crida entrega el missatge i omet `destacada`, de manera que s’utilitzarà `false`. Per a mostrar el mateix missatge destacat, escriurem:

```dart
const EtiquetaCatalogo(
  texto: 'Ruta de la cascada',
  destacada: true,
)
```

Són dos instàncies de la mateixa classe. Canvia la configuració rebuda, no la definició del component. També podríem canviar només `texto` i conservar la variant.

Qui utilitza l’etiqueta **no necessita triar grandària, pes ni color**: només expressa la intenció de destacar-la. La classe aplicarà eixos detalls de manera coherent en tots els llocs on s’utilitze.

## 3. Crea el component en el seu fitxer

Ara escriurem la classe que farà possibles eixes crides. Separarem dos responsabilitats: **el component definix com es dibuixa una etiqueta** i **la pantalla decidix quines etiquetes mostrar i amb quines dades**.

Guardarem el component en el seu fitxer per a importar-lo i utilitzar-lo des de diverses pantalles sense copiar el codi. Crear el fitxer no fa que aparega automàticament en l’aplicació: en el pas 4 l’importarem i afegirem instàncies a la pantalla del catàleg.

En l’explorador de VS Code:

1. Dins de `lib`, crea `componentes` si encara no existix.
2. Dins, crea `etiqueta_catalogo.dart`. Contindrà la classe `EtiquetaCatalogo`; en Dart utilitzem guions baixos per al nom del fitxer i majúscules inicials per al de la classe.
3. Copia el codi complet següent i guarda el fitxer.

L’`import` dona accés a les classes de Flutter que utilitzarem. Després trobaràs els camps que guarden la configuració, el constructor que la rep i el mètode `build` que la convertix en interfície. Just davall llegirem cadascuna de les parts:

```dart
import 'package:flutter/material.dart';

class EtiquetaCatalogo extends StatelessWidget {
  final String texto;
  final bool destacada;

  const EtiquetaCatalogo({
    super.key,
    required this.texto,
    this.destacada = false,
  });

  @override
  Widget build(BuildContext context) {
    final estilo = TextStyle(
      fontSize: destacada ? 22 : 16,
      fontWeight: destacada ? FontWeight.bold : FontWeight.normal,
      color: destacada ? Colors.indigo : Colors.black87,
    );

    return Text(texto, style: estilo);
  }
}
```

### Com llegir la classe

`EtiquetaCatalogo` hereta de `StatelessWidget`: rep configuració i retorna una descripció de la interfície en `build`. No necessita guardar una dada que canvie per si mateixa.

Els camps `texto` i `destacada` són `final`: una vegada creada la instància, no els assignem un altre valor. El constructor exigix `texto` amb `required`; permet ometre `destacada` perquè té el valor predeterminat `false`. `super.key` manté el paràmetre opcional que Flutter utilitza per a identificar widgets.

`build` rep un `BuildContext`, que representa el seu lloc en l’arbre de widgets. Ací no cal consultar-lo. El mètode prepara l’estil i retorna `Text(texto, style: estilo)` per a mostrar el contingut rebut.

### Com es tria la variant

L’expressió **`condicio ? valorSiEsCerta : valorSiEsFalsa`** selecciona un de dos valors. `destacada ? 22 : 16` utilitza `22` si `destacada` és `true` i `16` si és `false`.

| Propietat | Normal: `destacada: false` | Destacada: `destacada: true` |
| --- | --- | --- |
| Grandària | 16 | 22 |
| Pes | Normal | Negreta |
| Color | Negre suavitzat (`Colors.black87`) | Indi (`Colors.indigo`) |

La variable local `estilo` agrupa el resultat. Definir la configuració dins del component permet que totes les instàncies destacades compartisquen l’aspecte.

El constructor pot ser `const` perquè els camps són immutables. `Text(texto, style: estilo)` no porta `const`: dins de `build` utilitza els valors de la instància i l’estil que acabem de calcular.

## 4. Compara les dos variants en el catàleg

Utilitzarem la pantalla `Text` preparada en crear el catàleg; encara no cal conéixer altres propietats del widget. Substituïx `lib/pantallas/text_ejemplos_pantalla.dart` per este fitxer complet:

```dart
import 'package:flutter/material.dart';

import '../componentes/etiqueta_catalogo.dart';

class TextEjemplosPantalla extends StatelessWidget {
  const TextEjemplosPantalla({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ejemplos de Text')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          EtiquetaCatalogo(texto: 'Ruta de la cascada'),
          SizedBox(height: 16),
          EtiquetaCatalogo(
            texto: 'Ruta de la cascada',
            destacada: true,
          ),
        ],
      ),
    );
  }
}
```

L’import `../componentes/etiqueta_catalogo.dart` dona accés a la classe. `../` puja de `pantallas` a `lib` i després la ruta entra en `componentes`.

Estes són les peces que utilitzem com a suport per a comparar les etiquetes:

| Peça | Per a què la utilitzem ací |
| --- | --- |
| `Scaffold` | Organitza la pantalla en una barra i un cos. |
| `AppBar` i `title` | Mostren el títol de la secció amb un `Text`. |
| `ListView` i `children` | Col·loquen les etiquetes en una llista vertical amb desplaçament si no caben. Els claudàtors contenen els widgets separats per comes. |
| `padding: EdgeInsets.all(16)` | Deixa 16 píxels lògics d’espai interior a cada costat. `EdgeInsets` és un objecte de mesures, no un widget. |
| `SizedBox(height: 16)` | Deixa un buit vertical entre les etiquetes. |
| `children: const [...]` | Declara constant la llista i permet ometre `const` davant dels objectes niats. |

Executa l’aplicació i obri `Text`: has de veure **el mateix contingut amb dos aspectes**. La primera etiqueta omet `destacada` i utilitza `false`; la segona entrega `true`.

Ací **no polsem per a canviar la variant**: són dos instàncies amb configuracions diferents. Triar l’aspecte amb un paràmetre no requerix un `StatefulWidget`. Si el pare proporciona una altra configuració, el component descriu el resultat corresponent.

## 5. Quan necessites més de dos variants

Un booleà servix per a dos opcions. Per a tres o més, un `enum` permet donar nom a cadascuna i evitar combinacions ambigües de diversos booleans:

```dart
enum VarianteEtiqueta { normal, destacada, aviso }
```

La declaració aniria en `etiqueta_catalogo.dart`, fora de la classe. Substituiríem el camp `destacada` per `final VarianteEtiqueta variante` i el paràmetre del constructor per `this.variante = VarianteEtiqueta.normal`.

Dins de `build`, esta selecció reemplaçaria la definició actual d’`estilo`:

```dart
final estilo = switch (variante) {
  VarianteEtiqueta.normal => const TextStyle(fontSize: 16),
  VarianteEtiqueta.destacada => const TextStyle(
    fontSize: 22,
    fontWeight: FontWeight.bold,
  ),
  VarianteEtiqueta.aviso => const TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.bold,
    color: Colors.deepOrange,
  ),
};
```

L’expressió `switch` compara `variante` amb cada opció. A la dreta de cada `=>` està el `TextStyle` obtingut. El punt i coma tanca l’assignació a `estilo`. Després continuem retornant `Text(texto, style: estilo)`.

Un ús seria `EtiquetaCatalogo(texto: 'Revisa la ruta', variante: VarianteEtiqueta.aviso)`. En canviar l’API, els usos amb `destacada: true` han de passar a `variante: VarianteEtiqueta.destacada`.

## ✍️ Activitat: completa les variants

1. Comprova les dos variants booleanes amb el mateix text i explica què selecciona cada expressió condicional.
2. Adapta el component a les tres opcions de l’`enum`. Mantín una classe i mostra les tres configuracions en la llista, substituint els usos anteriors.
3. Canvia la grandària de la variant destacada en el component i comprova que totes les instàncies destacades s’actualitzen en recarregar l’aplicació.
4. Comprova que el text es conserva en totes les variants i que l’avís es distingix per pes o grandària, a més del color. Utilitza un contingut com «Avís: revisa la ruta» per a expressar-ne el significat amb paraules.

Conserva la classe reutilitzable en `lib/componentes/` i les instàncies de demostració en la pantalla. Este serà el patró de les activitats següents: **un component amb paràmetres i diverses configuracions mostrades en el catàleg**.

Referència: [`TextStyle`](https://api.flutter.dev/flutter/painting/TextStyle-class.html).
