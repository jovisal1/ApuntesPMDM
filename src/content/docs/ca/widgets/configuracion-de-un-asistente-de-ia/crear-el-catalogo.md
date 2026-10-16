---
title: "4. Construir el catàleg de widgets"
description: "4. Construir el catàleg de widgets · Assistent d’IA i catàleg de widgets per a 2n de DAM."
sidebar:
  order: 5
---

## Què construirem

La primera versió tindrà dos entrades, **Text** i **Icon**. Cadascuna obrirà una pantalla amb exemples diferents. Comencem amb poques entrades per a poder seguir el recorregut complet des d’una pulsació fins al resultat.

```text
Catàleg de widgets
├── Text → Exemples de Text
│          ├── Text senzill
│          ├── Grandària, pes i color
│          ├── Alineació
│          └── Límit de línies
└── Icon → Exemples de Icon
           ├── Símbol senzill
           ├── Grandària i color
           └── Diversos símbols en una fila
```

En esta pràctica avancem una navegació mínima. Més avant estudiarem rutes, devolució de dades i altres formes d’organitzar la navegació. Ara necessitem entendre que la llista obri una altra pantalla i que podem tornar.

## Abans de copiar codi

Dins de `lib`, crea la carpeta `pantallas` i els tres fitxers que apareixen ací. Substituirem el contingut complet de `lib/main.dart` pel programa d’este apartat. Conserva `pubspec.yaml` i els fitxers de plataforma generats per Flutter.

```text
lib/
├── main.dart
└── pantallas/
    ├── catalogo_pantalla.dart
    ├── text_ejemplos_pantalla.dart
    └── icon_ejemplos_pantalla.dart
```

Els noms i les cadenes del programa es mantenen igual en les dos versions dels apunts perquè puguem compartir el mateix projecte i la mateixa prova. Primer llig cada fitxer i escriu-lo al seu lloc. Quan existisquen els quatre, executarem l’aplicació. Si guardes `main.dart` abans de crear les dependències, apareixeran temporalment errors d’importació.

:::tip[Treballa amb l’assistent]
Abans de cada bloc, demana: «Explica’m quina responsabilitat té este fitxer i una pregunta que haja de poder respondre sobre ell. No afiges més funcionalitats». Després intenta respondre sense mirar el xat.
:::

## Pas 1. El punt d’entrada

Contingut complet de `lib/main.dart`:

```dart
import 'package:flutter/material.dart';

import 'pantallas/catalogo_pantalla.dart';

void main() => runApp(const CatalogoApp());

class CatalogoApp extends StatelessWidget {
  const CatalogoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Catálogo de widgets',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
        useMaterial3: true,
      ),
      home: const CatalogoPantalla(),
    );
  }
}
```

`main` inicia Flutter amb `runApp`. `CatalogoApp` configura l’aplicació mitjançant `MaterialApp`; `home` indica la primera pantalla. `ThemeData` reunix ajustos visuals comuns i `ColorScheme.fromSeed` obté una combinació de colors a partir d’un d’inicial. No necessites memoritzar eixes opcions per a entendre la navegació.

L’`import` relatiu busca `pantallas/catalogo_pantalla.dart` des d’este fitxer. Les classes són `StatelessWidget` perquè la configuració no guarda ací un comptador o una altra dada que hàgem de canviar amb `setState`. Els constructors accepten `super.key` i permeten crear instàncies constants.

**Comprova que ho entens:** quina classe decidix la primera pantalla i quina propietat utilitza?

## Pas 2. La llista principal

Contingut complet de `lib/pantallas/catalogo_pantalla.dart`:

```dart
import 'package:flutter/material.dart';

import 'icon_ejemplos_pantalla.dart';
import 'text_ejemplos_pantalla.dart';

class CatalogoPantalla extends StatelessWidget {
  const CatalogoPantalla({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Catálogo de widgets')),
      body: ListView(
        children: [
          ListTile(
            leading: const Icon(Icons.text_fields),
            title: const Text('Text'),
            subtitle: const Text('Estilo, alineación y texto largo'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const TextEjemplosPantalla(),
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.star_outline),
            title: const Text('Icon'),
            subtitle: const Text('Símbolos, tamaños y colores'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const IconEjemplosPantalla(),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
```

### Com es construïx una entrada

`Scaffold` organitza la pantalla i `AppBar` mostra el títol. `ListView` col·loca els fills en una llista vertical que pot desplaçar-se. Al principi escrivim dos entrades explícites; quan estudiem models i col·leccions podrem generar estes files des de dades.

Cada `ListTile` representa una fila. `leading` és l’element inicial; `title`, el nom; `subtitle`, l’explicació breu; i `trailing`, la icona final que suggerix que podem avançar. La fletxa dibuixada no navega per si mateixa: l’acció està en `onTap`.

### Què passa en prémer

`onTap` rep una funció sense arguments: `() { ... }`. Flutter la crida **quan premem**, no mentre construïx la llista. `Navigator.of(context)` obté el navegador associat a eixe lloc de l’arbre. `push` afig una ruta, és a dir, una pantalla nova damunt de l’actual.

`MaterialPageRoute<void>` descriu la ruta amb comportament Material. Ací `void` indica que no esperem recuperar una dada en tancar-la. `builder` rep un context i retorna el widget de la pantalla nova. L’expressió `=> const TextEjemplosPantalla()` és una funció abreviada que el retorna.

En obrir una ruta, el seu `AppBar` incorpora normalment el botó per a tornar si el navegador pot retrocedir. Tornar retira la ruta superior i deixa visible el catàleg. No necessitem crear un altre `MaterialApp` en cada pantalla.

La documentació de Flutter desenvolupa [la navegació entre dos pantalles](https://docs.flutter.dev/cookbook/navigation/navigation-basics) i l’ús de [llistes amb files](https://docs.flutter.dev/cookbook/lists/basic-list). El codi d’esta pràctica aplica eixes peces al nostre catàleg.

## Pas 3. Diverses demostracions de Text

Contingut complet de `lib/pantallas/text_ejemplos_pantalla.dart`:

```dart
import 'package:flutter/material.dart';

class TextEjemplosPantalla extends StatelessWidget {
  const TextEjemplosPantalla({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ejemplos de Text')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          Text('1. Un texto sencillo'),
          SizedBox(height: 8),
          Text('Estoy aprendiendo Flutter'),
          SizedBox(height: 24),
          Text('2. Tamaño, peso y color'),
          SizedBox(height: 8),
          Text(
            'Una ruta por la montaña',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.indigo,
            ),
          ),
          SizedBox(height: 24),
          Text('3. Alineación dentro de un ancho'),
          SizedBox(height: 8),
          Center(
            child: SizedBox(
              width: 220,
              child: Text(
                'Este mensaje queda centrado dentro de su espacio.',
                textAlign: TextAlign.center,
              ),
            ),
          ),
          SizedBox(height: 24),
          Text('4. Texto largo con límite de líneas'),
          SizedBox(height: 8),
          Center(
            child: SizedBox(
              width: 220,
              child: Text(
                'Esta descripción es larga para mostrar qué sucede '
                'cuando limitamos el texto a dos líneas en un espacio pequeño.',
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

`padding` deixa marge interior al voltant de la llista. `EdgeInsets.all(16)` indica 16 píxels lògics per cada costat. `SizedBox(height: ...)` reserva espai entre demostracions. `TextStyle` agrupa les propietats visuals del text: grandària, pes i color.

En els dos últims exemples, `Center` permet que el `SizedBox` interior tinga una amplària limitada de 220; l’amplària efectiva també depén de l’espai disponible. `textAlign` alinea les línies **dins de l’espai del text**. No col·loca tot el widget en el centre de la pantalla: eixe és el paper de `Center` en este exemple.

`maxLines: 2` limita les línies visibles i `TextOverflow.ellipsis` indica que s’afigen punts suspensius quan no cap tot. Les dos cadenes de la descripció, escrites una al costat de l’altra, formen una sola cadena en Dart; no creen dos widgets.

**Prova raonada:** prediu què passarà si canvies `maxLines` a `1`, executa-ho i explica la diferència. Després prova `TextAlign.right` en la tercera demostració.

## Pas 4. Diverses demostracions de Icon

Contingut complet de `lib/pantallas/icon_ejemplos_pantalla.dart`:

```dart
import 'package:flutter/material.dart';

class IconEjemplosPantalla extends StatelessWidget {
  const IconEjemplosPantalla({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ejemplos de Icon')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          Text('1. Un símbolo conocido'),
          SizedBox(height: 8),
          Icon(Icons.home, semanticLabel: 'Inicio'),
          SizedBox(height: 24),
          Text('2. Otro tamaño y otro color'),
          SizedBox(height: 8),
          Icon(
            Icons.favorite,
            size: 48,
            color: Colors.red,
            semanticLabel: 'Favorito',
          ),
          SizedBox(height: 24),
          Text('3. Varios iconos en una fila'),
          SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Icon(Icons.directions_walk, semanticLabel: 'Caminar'),
              Icon(Icons.directions_bike, semanticLabel: 'Bicicleta'),
              Icon(Icons.directions_bus, semanticLabel: 'Autobús'),
            ],
          ),
        ],
      ),
    );
  }
}
```

`Icons` proporciona els símbols i `Icon` els mostra. `size` canvia la grandària i `color` el color. `semanticLabel` aporta un nom per a tecnologies d’assistència; no és un text visible al costat de la icona. La fila distribuïx tres icones amb `MainAxisAlignment.spaceEvenly`, deixant espais iguals entre elles i en els extrems.

Un `Icon` mostra un símbol; no incorpora una acció de pulsació per si mateix. Quan estudiem botons, compararem `Icon` amb `IconButton` i afegirem la seua pantalla al catàleg.

## Pas 5. Executa i recorre l’aplicació

Guarda els quatre fitxers. Des de l’arrel de `catalogo_widgets` executa:

```bash
dart format lib
flutter analyze
flutter run
```

`dart format` ajusta el format i pot modificar els fitxers. `flutter analyze` busca problemes sense obrir l’aplicació. `flutter run` la inicia en el destí triat. Si la tenies executant-se amb l’exemple anterior, fes un **hot restart** per a reiniciar des de `main`.

:::note[La prova que va crear Flutter també compta]
El projecte inicial sol incloure `test/widget_test.dart`, que comprova el seu comptador. En substituir eixa aplicació, la prova deixa de representar el nostre comportament i pot referir-se a una classe que ja no existix. Abans d’exigir una anàlisi sense errors, substituïx-ne el contingut per la prova de l’[apartat següent](../practicar-y-verificar/). No esborres les proves per a ocultar l’error.
:::

Comprova este recorregut: apareixen `Text` i `Icon`; en prémer `Text` veus quatre demostracions; pots tornar; en prémer `Icon` veus tres; pots tornar una altra vegada. Reduïx l’altura de la finestra o gira el dispositiu i comprova que pots desplaçar-te fins a l’últim exemple.

Pregunta a l’assistent per un sol bloc cada vegada. Si proposa substituir tota l’aplicació per una altra solució, torna a delimitar la tasca i comprova el canvi mínim que necessites.
