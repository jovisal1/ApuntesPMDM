---
title: "Image: incorporar imatges"
sidebar:
  order: 4
---

**`Image` mostra una imatge**. Els constructors indiquen d’on ix: `Image.network` utilitza una URL i `Image.asset`, un recurs del projecte.

```dart
Image.network('https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg')
```

Este exemple necessita connexió. Si la imatge no carrega, comprova l’URL i l’accés a Internet.

## 🔧 Propietats principals

### 1. `width` i `height`: espai de la imatge

`width` i `height` sol·liciten l’amplària i l’altura de la imatge en píxels lògics, respectant les restriccions del pare. Són útils per a donar una grandària coherent a les fotografies d’un llistat i reservar-ne l’espai abans que acabe la càrrega.

```dart
Center(
  child: Image.network(
    'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
    width: 240,
    height: 160,
  ),
)
```

`Center` centra la imatge i evita que la llista li impose tota l’amplària. Conservar la grandària evita desplaçar altres exemples en acabar la càrrega.

### 2. `fit` i `alignment`: ajust i retall

`fit` decidix com adaptar la imatge quan les proporcions no coincidixen amb l’espai reservat: podem mostrar-la completa, retallar-la o deformar-la. `alignment` permet triar quina zona s’alinea amb eixe espai. Són útils per a crear una capçalera panoràmica i conservar visible la part important de la fotografia.

```dart
Center(
  child: Image.network(
    'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
    width: 240,
    height: 120,
    fit: BoxFit.cover,
    alignment: Alignment.topCenter,
  ),
)
```

`cover` conserva la proporció i cobrix l’espai retallant. `topCenter` prioritza la part superior. Canvia a `contain` per a veure tota la imatge amb possibles buits, i a `fill` per a omplir encara que es deforme.

### 3. `semanticLabel` i `excludeFromSemantics`

`semanticLabel` descriu una imatge per a qui utilitza un lector de pantalla; utilitza’l quan la fotografia aporte informació necessària per a comprendre el contingut. `excludeFromSemantics` permet excloure una imatge decorativa i evitar que s’anuncie com si aportara informació addicional.

```dart
Image.network(
  'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
  height: 160,
  semanticLabel: 'Un búho posado en una rama',
)
```

Per a una imatge decorativa, omet `semanticLabel` i utilitza `excludeFromSemantics: true`. No marques com a decorativa una imatge necessària per a comprendre la pantalla.

### 4. `errorBuilder`: alternativa si falla la càrrega

`errorBuilder` permet triar què mostrar si la imatge no pot carregar-se. És especialment útil amb adreces remotes que poden deixar d’existir o fallar per falta de connexió: podem mostrar un missatge o una imatge alternativa. Rep una funció que retorna eixe widget de substitució.

```dart
Image.network(
  'https://example.invalid/imagen.jpg',
  height: 160,
  errorBuilder: (context, error, stackTrace) => const SizedBox(
    height: 160,
    child: Center(child: Text('Imagen no disponible')),
  ),
)
```

L’adreça està triada per a fallar. La funció rep context, error i traça; `=>` retorna l’alternativa. `SizedBox` reserva altura, `Center` centra el contingut i `Text` mostra el missatge.

### 5. `loadingBuilder`: durant l’espera

`loadingBuilder` permet personalitzar el que veu l’usuari mentre es descarrega la imatge. És útil amb connexions lentes o imatges grans per a indicar que l’aplicació continua treballant. La funció rep la imatge i el progrés: quan és `null`, retornem la imatge; durant l’espera podem mostrar un indicador.

```dart
Image.network(
  'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
  height: 160,
  loadingBuilder: (context, child, progreso) {
    if (progreso == null) return child;
    return const SizedBox(
      height: 160,
      child: Center(child: CircularProgressIndicator()),
    );
  },
)
```

`CircularProgressIndicator` mostra una espera sense percentatge. Pot ser imperceptible si la imatge està en memòria cau; prova limitant la xarxa en les eines del navegador. `loadingBuilder` no substituïx `errorBuilder`.

## Utilitzar una imatge del projecte

Col·loca `ruta.jpg` en `assets/images/` i declara la carpeta dins del bloc `flutter` que ja existix en `pubspec.yaml`:

```yaml
flutter:
  uses-material-design: true
  assets:
    - assets/images/
```

Respecta la indentació i executa `flutter pub get`. Després pots utilitzar `Image.asset('assets/images/ruta.jpg')` amb les mateixes propietats de grandària i ajust. Si no apareix el recurs nou, reinicia l’aplicació i comprova ruta i majúscules. `Image.file` llig fitxers en plataformes compatibles (no en web), i `Image.memory` rep bytes; no els necessitem per a estes activitats.


## ✍️ Activitat: crea components amb variants

Implementa **els dos components** següents com a `StatelessWidget`, cadascun en el fitxer indicat dins de `lib/ui/core/ui/`. Els noms i paràmetres són el contracte que has de complir, no una solució implementada. Usa camps `final`, paràmetres amb nom, `super.key` i constructor `const` quan siga possible. Les variants es trien amb paràmetres: no necessiten estat propi.

Els paràmetres sense valor predeterminat són obligatoris; marca’ls amb `required`, també si admeten `null`. Un tipus acabat en `?` admet `null`. Els `enum` proposats es declaren en el mateix fitxer que el component.

Si necessites recordar com un paràmetre selecciona l’aspecte, consulta [Variants d’un component](../estilo-y-variantes/). La implementació d’estes propostes et correspon a tu.

### 1. `ImagenRuta`

`lib/ui/core/ui/imagen_ruta.dart`

Paràmetres: `String rutaAsset`, `bool panoramica = false`, `String descripcion`.

Carrega un recurs local. La variant normal mesura 240 × 180 i la panoràmica, 300 × 120, dins de l’espai disponible. Utilitza `cover` i la descripció accessible rebuda.

### 2. `ImagenRemota`

`lib/ui/core/ui/imagen_remota.dart`

Paràmetres: `String url`, `BoxFit ajuste = BoxFit.cover`, `bool decorativa = false`, `String? descripcion`.

Reserva altura, mostra espera i alternativa d’error. Si no és decorativa, exigix una descripció no buida; si ho és, exclou-la de la descripció accessible. Permet comparar `cover` i `contain`.

## 🧩 Mostra els components en el catàleg

En `lib/ui/catalogo/ui/image_ejemplos_pantalla.dart`, conserva `ImageEjemplosPantalla` i importa els fitxers nous. Cada import va al principi, fora de les classes:

```dart
import 'package:catalogo_widgets/ui/core/ui/imagen_ruta.dart';
import 'package:catalogo_widgets/ui/core/ui/imagen_remota.dart';
```

En un import `package:`, `catalogo_widgets` identifica el paquet i la ruta següent comença dins de `lib/`. Els imports fan accessibles les classes i els `enum` públics d’eixos fitxers.

Quan hages implementat els components, podràs utilitzar-los així dins de `children`:

```dart
const ImagenRuta(
  rutaAsset: 'assets/images/ruta.jpg',
  descripcion: 'Sendero entre árboles',
),
const ImagenRuta(
  rutaAsset: 'assets/images/ruta.jpg',
  descripcion: 'Sendero entre árboles',
  panoramica: true,
),
const ImagenRemota(
  url: 'https://example.invalid/imagen.jpg',
  descripcion: 'Fotografía de una ruta',
),
```

Mostra les dos proporcions locals, dos ajustos remots i un cas d’error. No faces dependre els tests d’Internet: demana una càrrega controlada a `test-widget` per a espera o error; revisa els retalls manualment.

Afig les combinacions que falten: els usos anteriors són només un començament. Identifica cada cas amb un títol i una explicació pròpia. No dupliques una classe per cada combinació ni copies els components dins de la pantalla. Pots utilitzar `create-component` per a revisar la teua implementació i `test-widget` per a generar proves amb criteris concrets. Executa `dart format lib`, `flutter analyze` i les proves que hages creat.

Referència: [Image](https://api.flutter.dev/flutter/widgets/Image-class.html).
