---
title: "Image: incorporar imatges"
sidebar:
  order: 4
---

**`Image` mostra una imatge**, però necessitem indicar d’on procedix. Els constructors amb nom permeten triar l’origen:

Documentació oficial: [`Image`](https://api.flutter.dev/flutter/widgets/Image-class.html).

| Propietat | Per a què servix |
| --- | --- |
| `width / height` | Sol·liciten l’amplària i l’altura de la imatge. |
| `fit` | Ajusta la imatge al seu espai amb valors de `BoxFit`. |
| `alignment` | Indica com alinear la imatge dins del seu espai. |
| `semanticLabel` | Descriu el contingut per a tecnologies d’assistència. |
| `excludeFromSemantics` | Exclou una imatge decorativa de la descripció accessible. |
| `errorBuilder` | Retorna un widget alternatiu si falla la càrrega. |
| `loadingBuilder` | Personalitza el que es mostra mentre es carrega la imatge. |

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
