---
title: "3. Navegar entre pantalles"
sidebar:
  order: 3
---

Ja tenim dos pantalles: el catàleg (`/`) i Ajuda (`/ayuda`). Ara provarem **dos formes d’obrir la mateixa pantalla** i observarem què ocorre en tornar. Encara no afegirem Tallers ni el login.

En la primera prova, anirem a Ajuda com a destinació i oferirem un botó per a tornar al catàleg. En la segona, obrirem Ajuda damunt del catàleg i retornarem el missatge «Consejo leído» en tancar-la. Són proves alternatives: canviarem el callback de la mateixa entrada, no crearem diversos botons d’accés.

## 1. Anar a Ajuda amb `go`

En `catalogo_pantalla.dart`, el callback de l’entrada **Ayuda con go_router** que afegírem en el pas anterior és:

```dart
onTap: () => context.go('/ayuda'),
```

En polsar, el router busca `/ayuda` en la configuració i mostra `AyudaPantalla`. Amb les dos rutes independents que tenim ara, la pila de pàgines passa del catàleg a Ajuda: **el catàleg no queda davall com una pàgina a la qual fer `pop`**. L’historial del navegador web és un mecanisme diferent.

Perquè l’usuari puga tornar, afig este widget a `children` del `ListView` d’`AyudaPantalla`, després de l’interruptor i del consell condicional. Afig també `import 'package:go_router/go_router.dart';` al principi del fitxer:

```dart
FilledButton(
  onPressed: () => context.go('/'),
  child: const Text('Volver al catálogo'),
),
```

Prova el recorregut: **catàleg → Ajuda → activar el consell → Volver al catálogo**. En tornar a obrir Ajuda amb esta configuració, es crea de nou la pantalla i l’interruptor comença desactivat. Més avant aprendrem a conservar-lo entre pestanyes.

## 2. Obrir Ajuda amb `push` i retornar una resposta

Ara volem que el catàleg espere una resposta d’Ajuda. `push` afig la pantalla damunt del recorregut actual; en tancar-la amb `pop`, reapareix la pàgina anterior. En esta prova la pila serà **catàleg davall i Ajuda damunt**.

En `catalogo_pantalla.dart`, substituïx l’`onTap` anterior per este. L’import de go_router ja ha d’estar afegit en esta vista:

```dart
onTap: () async {
  final elegido = await context.push<String>('/ayuda');
  if (!context.mounted || elegido == null) return;
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(elegido)));
},
```

`<String>` indica que esperem un text. `await` espera que Ajuda es tanque, sense bloquejar la interfície. Si torna un text, el mostrem en una `SnackBar` del catàleg. Si es tanca sense resposta, rebem `null`. La comprovació `context.mounted` evita utilitzar el context si la vista que esperava ja s’ha retirat.

En Ajuda, substituïx el botó de la primera prova per este:

```dart
FilledButton(
  onPressed: context.canPop() ? () => context.pop('Consejo leído') : null,
  child: const Text('He leído el consejo'),
),
```

`canPop()` comprova que hi ha una pàgina anterior. Si n’hi ha, el botó està habilitat: `pop` retira Ajuda i retorna el text. Si entrem directament en `/ayuda` sense una pàgina davall, es deshabilita este botó de resposta.

Prova **catàleg → Ajuda → He leído el consejo**. Has de tornar al catàleg i veure «Consejo leído» en una `SnackBar`. El text no es guarda en les dades ni inicia sessió: només demostra com una pantalla retorna un resultat a la que l’ha oberta. `go` no retorna este tipus de resposta.

## Triar l’operació segons el recorregut

| Operació | Resultat en estes proves |
| --- | --- |
| `go('/ayuda')` | Configura les pàgines que corresponen a la ubicació d’Ajuda. |
| `go('/')` | Configura la destinació del catàleg. |
| `push<String>('/ayuda')` | Obri Ajuda damunt del catàleg i espera un text en tancar-la. |
| `pop('Consejo leído')` | Tanca Ajuda i entrega eixe text a qui ha fet `push`. |
| `canPop()` | Comprova si hi ha una pàgina que puguem retirar. |
| `goNamed('ayuda')` | Busca la ruta registrada amb `name: 'ayuda'`; en esta configuració té la mateixa destinació que `go('/ayuda')`. |

`go` pot configurar diverses pàgines quan la ubicació té rutes pare i filles. Ho veurem en afegir `/talleres/20`; l’explicació d’una sola pàgina de la primera prova correspon a les dos rutes independents d’este pas.

## Què conservem per a continuar

Estes dos proves servixen per a comparar operacions. Abans del pas següent, restaura l’accés del catàleg amb `context.go('/ayuda')` i retira el botó de prova afegit a Ajuda. Mantín l’interruptor i el consell, tal com estaven en el pas 2. Així continuarem tots des del mateix exemple.

En web, comprova per separat els botons arrere i avant del navegador i la recàrrega: les operacions imperatives poden tindre matisos amb eixe historial. Un diàleg breu pot continuar obrint-se amb `showDialog`; no necessita una ruta pròpia per a esta pràctica.

Referències: [navegació i retorn de valors](https://pub.dev/documentation/go_router/latest/topics/Navigation-topic.html) i [rutes amb nom](https://pub.dev/documentation/go_router/latest/topics/Named%20routes-topic.html).
