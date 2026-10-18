---
title: "Text: mostrar i donar format al text"
sidebar:
  order: 3
---

**`Text` mostra una cadena de caràcters**: un títol, una descripció o un valor convertit a text. El primer argument és el contingut que volem mostrar.

```dart
const Text('Hola, Flutter')
```

És un widget complet: no necessita definir un estil per a mostrar el missatge.

## 🔧 Propietats principals

### 1. `style`: grandària, pes i color

`style` permet donar jerarquia visual al text: distingir un títol d’una descripció, destacar una dada o indicar un avís. Rep un `TextStyle`, un objecte de configuració, no un widget. Dins, `fontSize` establix la grandària en píxels lògics; `fontWeight`, el pes; i `color`, el color.

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

Has de veure un text gran, en negreta i verd blavós. Canvia una opció cada vegada per a identificar-ne l’efecte.

### 2. `textAlign`: alineació dins de l’espai

`textAlign` decidix com s’alineen les línies dins de l’amplària disponible. És útil per a centrar un missatge breu, alinear una quantitat a la dreta o mantindre una descripció alineada a l’inici. L’efecte es veu quan sobra amplària; no col·loca per si mateix el widget en la pantalla.

```dart
const Center(
  child: SizedBox(
    width: 240,
    child: Text('Una ruta fácil', textAlign: TextAlign.right),
  ),
)
```

`SizedBox` sol·licita una amplària de 240 i conté un fill. `Center` centra el requadre i permet mantindre’n l’amplària dins de la llista. `textAlign` porta el text a la dreta **del requadre**, no de la pantalla. Prova `left` i `center`.

### 3. `maxLines` i `overflow`: text que no cap

`maxLines` limita quantes línies pot mostrar el text i `overflow` decidix com representar el que no cap. Són útils en targetes, llistats o resums on una descripció llarga no ha d’ocupar tota la pantalla. Amb `TextOverflow.ellipsis`, els punts suspensius indiquen que hi ha contingut sense mostrar.

```dart
const Center(
  child: SizedBox(
    width: 220,
    child: Text(
      'Un recorrido entre árboles que termina junto a una cascada. '
      'El sendero continúa hasta el mirador de la montaña.',
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
    ),
  ),
)
```

Mantenim `Center` i `SizedBox` per a limitar l’amplària i observar el retall. Compara una i dos línies amb el mateix text.

### 4. `softWrap`: salts de línia

`softWrap` controla si el text pot saltar de línia en els espais per a adaptar-se a l’amplària. Normalment interessa permetre-ho en descripcions; desactivar-ho pot ser útil en una etiqueta que haja de quedar en una línia, definint també què fer si desborda. `softWrap: false` no equival a configurar només `maxLines: 1`.

```dart
const Center(
  child: SizedBox(
    width: 180,
    child: Text(
      'Una descripción más larga que el espacio disponible',
      softWrap: false,
      overflow: TextOverflow.fade,
    ),
  ),
)
```

`fade` difumina la vora del text que desborda. Compara el resultat amb `softWrap: true` dins del mateix requadre.

### 5. `semanticsLabel`: significat accessible

`semanticsLabel` oferix al lector de pantalla una descripció alternativa al text visible. És útil quan mostrem abreviatures, unitats o símbols que convé llegir amb el significat complet, sense canviar el que apareix en pantalla.

```dart
const Text('12 km', semanticsLabel: 'Doce kilómetros')
```

El contingut visible continua sent «12 km». Comprova la descripció amb les eines d’accessibilitat; no es dibuixa com un altre text.

## ✍️ Activitat: crea components amb variants

Implementa **els dos components** següents com a `StatelessWidget`, cadascun en el fitxer indicat dins de `lib/componentes/`. Els noms i paràmetres són el contracte que has de complir, no una solució implementada. Usa camps `final`, paràmetres amb nom, `super.key` i constructor `const` quan siga possible. Les variants es trien amb paràmetres: no necessiten estat propi.

Els paràmetres sense valor predeterminat són obligatoris; marca’ls amb `required`, també si admeten `null`. Un tipus acabat en `?` admet `null`. Els `enum` proposats es declaren en el mateix fitxer que el component.

Si necessites recordar com un paràmetre selecciona l’aspecte, consulta [Variants d’un component](../estilo-y-variantes/). La implementació d’estes propostes et correspon a tu.

### 1. `TextoJerarquico`

`lib/componentes/texto_jerarquico.dart`

Paràmetres: `String texto`, `TipoTexto tipo = TipoTexto.cuerpo`.

Definix `enum TipoTexto { titulo, subtitulo, cuerpo }`. Cada opció seleccionarà grandària i pes dins del component. Conserva el text rebut en les tres variants.

### 2. `TextoResumen`

`lib/componentes/texto_resumen.dart`

Paràmetres: `String texto`, `int lineas = 2`, `bool centrado = false`.

Limita el text amb punts suspensius i canvia l’alineació amb `centrado`. Admet només un nombre positiu de línies i comprova una descripció llarga.

## 🧩 Mostra els components en el catàleg

En `lib/view/text_ejemplos_pantalla.dart`, conserva `TextEjemplosPantalla` i importa els fitxers nous. Cada import va al principi, fora de les classes:

```dart
import '../componentes/texto_jerarquico.dart';
import '../componentes/texto_resumen.dart';
```

`../` puja de `view` a `lib`; després entra en `componentes`. Els imports fan accessibles les classes i els `enum` públics d’eixos fitxers.

Quan hages implementat els components, podràs utilitzar-los així dins de `children`:

```dart
const TextoJerarquico(texto: 'Ruta del río', tipo: TipoTexto.titulo),
const TextoJerarquico(texto: 'Ruta del río', tipo: TipoTexto.cuerpo),
const Center(
  child: SizedBox(
    width: 220,
    child: TextoResumen(
      texto: 'Un recorrido largo que permite comparar las líneas visibles.',
      lineas: 1,
      centrado: true,
    ),
  ),
),
```

Mostra les tres jerarquies amb el mateix contingut i dos resums amb límits diferents. Comprova text curt i llarg. Les proves han de detectar una jerarquia incorrecta o un límit que no s’aplique; revisa visualment el retall.

Afig les combinacions que falten: els usos anteriors són només un començament. Identifica cada cas amb un títol i una explicació pròpia. No dupliques una classe per cada combinació ni copies els components dins de la pantalla. Pots utilitzar `create-component` per a revisar la teua implementació i `test-widget` per a generar proves amb criteris concrets. Executa `dart format lib`, `flutter analyze` i les proves que hages creat.

Referència: [Text](https://api.flutter.dev/flutter/widgets/Text-class.html).
