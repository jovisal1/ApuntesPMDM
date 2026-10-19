---
title: "4. El projecte del catàleg"
sidebar:
  order: 5
---

## De quin projecte partim

Crearem **`catalogo_widgets`** amb una pantalla principal i un llistat de famílies de widgets. En este apartat tens el codi inicial complet: copiaràs la base i prepararàs una pantalla buida per a cada família. Després les completaràs durant els tutorials.

La teua tasca serà convertir les seccions buides en un **catàleg d’exemples executables**. No has de construir el menú ni programar el pas entre pantalles. Eixe mecanisme ja està preparat i l’estudiarem en navegació. Ara centra’t en el contingut de cada secció.

## Així serà el catàleg

![Esquema del catàleg: llistat inicial a l’esquerra i secció de Text amb exemples guiats i casos de l’alumne a la dreta](../../../../../assets/widgets/catalogo-ca.svg)

L’esquerra representa la pantalla que posaràs en marxa amb el codi d’este apartat. La dreta mostra el treball que completaràs. Cada família tindrà exemples guiats i, al final, els casos que afegisques tu. La fletxa relaciona l’entrada del llistat amb la seua secció; encara no necessitem estudiar-ne la implementació.

Cada demostració inclourà un títol identificable, el widget real i una explicació breu del canvi que volem observar. En `Text` compararem un títol amb estil, una descripció limitada i una frase amb diversos estils. Després afegiràs casos nous com a activitat.

## 1. Crea i obri el projecte

En la carpeta on guardes les pràctiques, executa estes ordres una a una. Si ja tens `catalogo_widgets` dels apartats anteriors, conserva’l i continua amb el pas 2; no el tornes a crear.

```bash
flutter create catalogo_widgets
cd catalogo_widgets
flutter pub get
```

Obri en VS Code la carpeta que conté `pubspec.yaml`. Conserva les instruccions i skills que ja has preparat.

### 📁 Estructura de carpetes del catàleg

Organitzarem la interfície davall de **`lib/ui/`**, agrupada per funcionalitat, i les peces visuals compartides en **`lib/ui/core/ui/`**. Seguim l’organització del [cas pràctic d’arquitectura de Flutter](https://docs.flutter.dev/app-architecture/case-study). En el curs també anomenarem `ui` la subcarpeta visual de cada funcionalitat, en lloc de `widgets`, per a mantindre una única convenció.

Este serà l’arbre en completar les primeres activitats. Afegirem components i proves quan els implementem:

```text
catalogo_widgets/
├── lib/
│   ├── main.dart
│   └── ui/
│       ├── core/
│       │   └── ui/
│       │       └── etiqueta_catalogo.dart
│       └── catalogo/
│           └── ui/
│               ├── catalogo_pantalla.dart
│               ├── text_ejemplos_pantalla.dart
│               ├── image_ejemplos_pantalla.dart
│               ├── icon_ejemplos_pantalla.dart
│               ├── botones_ejemplos_pantalla.dart
│               ├── placeholder_ejemplos_pantalla.dart
│               └── scaffold_ejemplos_pantalla.dart
├── test/
│   ├── widget_test.dart
│   └── ui/
│       └── core/
│           └── ui/
│               └── etiqueta_catalogo_test.dart
├── assets/
│   └── images/                 Amb les imatges locals
├── .agents/
│   ├── instrucciones.md
│   └── skills/
├── android/, ios/, web/, ...    Configuració de plataformes
└── pubspec.yaml
```

| Lloc | Responsabilitat | Exemple |
| --- | --- | --- |
| `lib/main.dart` | Iniciar i configurar l’aplicació. Importa la pantalla principal. | Cridar `runApp`. |
| `lib/ui/catalogo/ui/` | Contindre pantalles i peces visuals específiques del catàleg. | Mostrar les variants d’una etiqueta. |
| `lib/ui/core/ui/` | Contindre components visuals reutilitzables per diverses pantalles o funcionalitats. | Definir `EtiquetaCatalogo` i els paràmetres. |
| `test/ui/` | Provar la interfície reflectint les rutes de `lib/ui/`. | Comprovar un component aïllat. |
| `assets/images/` | Guardar imatges locals declarades en `pubspec.yaml`. | Una fotografia del projecte. |
| `.agents/` | Guardar instruccions de l’assistent fora del codi de l’aplicació. | Regles i procediments de revisió. |
| Carpetes de plataforma i `pubspec.yaml` | Configurar destins, dependències i recursos. | Registrar imatges o configurar Android. |

**Tota peça visual es guarda en una carpeta anomenada `ui`**: si només pertany a una funcionalitat, en `lib/ui/<funcionalitat>/ui/`; si és compartida, en `lib/ui/core/ui/`. El primer projecte utilitza `lib/ui/entrenamiento/ui/`. El nom de funcionalitat indica quina part de l’aplicació agrupa, no un altre nom per a la capa visual.

Crea ara la ruta del catàleg en el pas 2. La ruta compartida, les proves i les imatges s’incorporaran segons les activitats. Els fitxers utilitzen `snake_case`, com `etiqueta_catalogo.dart`, i les classes, `UpperCamelCase`, com `EtiquetaCatalogo`.

### 🧭 Què afegirem quan apareguen altres responsabilitats

La interfície s’organitza per funcionalitat; les dades, per responsabilitat. Mantindrem les rutes visuals des de l’inici i ampliarem l’estructura quan calga:

```text
lib/
├── main.dart
├── ui/
│   ├── core/
│   │   ├── ui/                  Components compartits
│   │   └── themes/              Configuració visual compartida, més avant
│   └── favoritos/
│       ├── ui/
│       │   └── favoritos_screen.dart
│       └── view_models/
│           └── favoritos_view_model.dart
├── domain/
│   └── models/                  Tipus de dades de l’aplicació
└── data/
    ├── repositories/            Gestió de dades
    ├── services/                Accés a API, fitxers o altres orígens
    └── model/                   Models d’una API, si calen
```

El segon arbre és una previsió: encara no has de crear eixes classes. La vista mostra dades i comunica accions; el ViewModel manté l’estat de presentació; el repositori gestiona dades i el servici accedix a l’origen. Els models de domini representen les dades de l’aplicació; no impliquen afegir una capa de casos d’ús. Consulta la [guia d’arquitectura de Flutter](https://docs.flutter.dev/app-architecture/guide).

Ara separarem la pantalla dels components reutilitzables. Triar la grandària d’una etiqueta és visual; guardar favorits no ho és. Les dependències es rebran des de fora per a substituir-les en proves. Afegirem ViewModels i repositoris en treballar estat i persistència, mantenint `ui` per a totes les peces visuals.

Els noms de fitxers, classes i paràmetres del catàleg, i les cadenes dels exemples Dart, es mantenen igual en les dos versions dels apunts per a compartir el mateix projecte i les mateixes proves. Les explicacions estan en valencià.

## 2. Prepara les pantalles buides

Crea `lib/ui/catalogo/ui/` i els sis fitxers de la taula. Copia la plantilla següent en cadascun: canvia **les dos aparicions del nom de classe** i el títol d’`AppBar` segons la fila. No canvies la resta.

| Fitxer dins de `lib/ui/catalogo/ui/` | Classe i constructor | Títol |
| --- | --- | --- |
| `text_ejemplos_pantalla.dart` | `TextEjemplosPantalla` | `Ejemplos de Text` |
| `image_ejemplos_pantalla.dart` | `ImageEjemplosPantalla` | `Ejemplos de Image` |
| `icon_ejemplos_pantalla.dart` | `IconEjemplosPantalla` | `Ejemplos de Icon` |
| `botones_ejemplos_pantalla.dart` | `BotonesEjemplosPantalla` | `Ejemplos de Botones` |
| `placeholder_ejemplos_pantalla.dart` | `PlaceholderEjemplosPantalla` | `Ejemplos de Placeholder` |
| `scaffold_ejemplos_pantalla.dart` | `ScaffoldEjemplosPantalla` | `Ejemplos de Scaffold y AppBar` |

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
        children: [
          // Aquí añadiremos los ejemplos del tutorial.
        ],
      ),
    );
  }
}
```

`children` queda buit a propòsit: ací afegiràs els exemples. `ListView` és el suport per a posar-los en vertical i poder desplaçar-te si no caben. Cada tutorial indicarà quin fitxer has de modificar.

## 3. Completa el llistat i el punt d’entrada

Crea `lib/ui/catalogo/ui/catalogo_pantalla.dart` amb este contingut complet. Les sis pantalles del pas anterior estan en la mateixa carpeta; per això els imports només indiquen el nom del fitxer. El mecanisme entre pantalles ja està resolt i l’estudiarem més avant:

```dart
import 'package:flutter/material.dart';

import 'text_ejemplos_pantalla.dart';
import 'image_ejemplos_pantalla.dart';
import 'icon_ejemplos_pantalla.dart';
import 'botones_ejemplos_pantalla.dart';
import 'placeholder_ejemplos_pantalla.dart';
import 'scaffold_ejemplos_pantalla.dart';

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
            leading: const Icon(Icons.image_outlined),
            title: const Text('Image'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const ImageEjemplosPantalla(),
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.star_outline),
            title: const Text('Icon'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const IconEjemplosPantalla(),
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.smart_button_outlined),
            title: const Text('Botones'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const BotonesEjemplosPantalla(),
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.crop_square),
            title: const Text('Placeholder'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const PlaceholderEjemplosPantalla(),
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.web_asset),
            title: const Text('Scaffold y AppBar'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (context) => const ScaffoldEjemplosPantalla(),
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

Ara substituïx `lib/main.dart` pel codi d’arrancada. Importa el llistat des d’`ui` i configura l’aplicació:

```dart
import 'package:flutter/material.dart';

import 'ui/catalogo/ui/catalogo_pantalla.dart';

void main() => runApp(const CatalogoApp());

class CatalogoApp extends StatelessWidget {
  const CatalogoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Catálogo de widgets',
      home: CatalogoPantalla(),
    );
  }
}
```

## 4. Comprova el punt de partida

Guarda els huit fitxers i executa des de l’arrel del projecte:

```bash
dart format lib
flutter run
```

`dart format lib` aplica el format estàndard de Dart a tots els fitxers `.dart` de la carpeta `lib` i les subcarpetes. Ajusta la indentació, els espais i els salts de línia, i guarda els canvis en eixos fitxers. No executa l’aplicació ni comprova el comportament. Després, `flutter run` inicia l’aplicació per a revisar el resultat en pantalla.

Has de veure les sis entrades. Obri cadascuna i comprova el títol i el cos buit; torna al llistat amb el control de la barra. Si un import falla, revisa que el nom del fitxer i el de classe coincidisquen amb la taula.

Per a comprovar este punt de partida, pots demanar a `test-widget` que prepare `test/widget_test.dart` i verifique que `CatalogoApp` mostra el títol i les sis etiquetes. Executa `flutter analyze` per a detectar problemes en el codi i `flutter test` per a executar les proves, sense estudiar encara el mecanisme entre pantalles.

## 5. 🤖 Avança en el catàleg amb l’assistent

L’assistent configurat pot ajudar-te en cada activitat: comprendre una propietat, implementar una peça amb els estàndards del projecte, localitzar un error o comprovar les variants. **Treballa sobre un component i un objectiu cada vegada**, conservant els exemples que ja funcionen.

### Prepara el context de la tasca

Utilitza les [instruccions del projecte](../configurar-el-asistente/) i les [skills que has creat](../crear-skills/). Si treballes en un xat, adjunta `.agents/instrucciones.md`, el `SKILL.md` corresponent i els fitxers de la tasca. Si l’editor descobrix les skills, demana-la pel nom i indica quins fitxers ha de consultar. No dones per fet que l’assistent coneix els canvis d’una altra sessió.

Abans de demanar ajuda, escriu quatre dades: **què vols aconseguir, quin fitxer modifiques, què has intentat i què hauria de passar**. Per exemple:

```text
Treballe en el catàleg de widgets i seguisc .agents/instrucciones.md.
Estic en l’apartat Variants d’un component.
Fitxer: lib/ui/core/ui/etiqueta_catalogo.dart.
Vull mostrar el mateix text com a etiqueta normal o destacada.
Ja he escrit la classe i el constructor; em falta triar l’estil.
Conec classes, paràmetres amb nom i StatelessWidget.
```

### Tria la skill segons el que necessites

| Situació | Skill | Resultat que has de demanar |
| --- | --- | --- |
| No entens una propietat o una expressió. | `explain-widget` | Explicació del fragment i un exemple menut. |
| Vols implementar o extraure un component amb requisits definits. | `create-component` | Un component en el seu fitxer d’`ui`, amb paràmetres i integració limitada al catàleg. |
| El resultat no coincidix amb l’esperat. | `give-hints` | Una primera pista a partir del codi, l’error i el teu intent. |
| Vols revisar el que has escrit. | `review-code` | Problemes concrets, la causa i com comprovar-los, sense modificar fitxers. |
| Necessites comprovar un comportament. | `test-widget` | Casos derivats dels requisits i proves que detecten errades reals. |

No cal utilitzar les cinc en cada tasca. Si necessites comprendre `destacada ? 22 : 16`, demana a `explain-widget` que explique l’expressió abans de sol·licitar una implementació. Si resols l’activitat pel teu compte, utilitza `give-hints` quan et bloqueges.

### Passa d’una idea a un canvi concret

Escriu primer els requisits del component. Així podràs valorar el resultat en lloc d’acceptar qualsevol proposta que compile. Quan la tasca siga implementar o adaptar codi, una petició concreta seria:

```text
Utilitza create-component i les instruccions del projecte.
Revisa el meu intent d’EtiquetaCatalogo en el fitxer adjunt i completa’l.
Requisits:
- texto és obligatori; destacada val false per defecte.
- La variant normal utilitza grandària 16 i pes normal.
- La destacada utilitza grandària 22 i negreta.
- Les dos mostren exactament el text rebut.
Conserva el component en lib/ui/core/ui/etiqueta_catalogo.dart.
En lib/ui/catalogo/ui/text_ejemplos_pantalla.dart mostra les dos variants
sense esborrar els exemples existents. No canvies el llistat ni main.dart.
Explica els canvis i indica què he de comprovar en executar-los.
```

Si només vols orientació, canvia la petició per: «Utilitza `give-hints`. Amb el codi actual passa això: […]; esperava això: […]. He provat […]. Dona’m una pista i espera el meu intent; no modifiques fitxers». Adjunta l’error exacte si n’hi ha.

Després de cada canvi, obri la secció del catàleg i comprova el resultat. Abans de demanar a `review-code` que revise els fitxers, escriu per què has triat eixos paràmetres i què fa cada variant. Contrasta l’explicació amb la revisió.

### Demana proves dels requisits, no només del codi

Proporciona a `test-widget` la implementació actual i els requisits escrits. Per exemple, una vegada acceptat el component anterior:

```text
Utilitza test-widget. Adjunte EtiquetaCatalogo i els requisits.
Crea test/ui/core/ui/etiqueta_catalogo_test.dart amb els imports reals.
Comprova el text rebut, la variant normal en ometre destacada,
i les grandàries i pesos de les dos variants. Comprova també que canviar
el text des del pare actualitza el contingut mostrat.
Presenta els casos i explica quina errada detectaria cadascun.
No canvies el component per a alterar els requisits.
Executa les proves si pots i distingix el resultat real del que no has comprovat.
```

Executa des de l’arrel `dart format lib test`, `flutter analyze` i `flutter test`. El primer ajusta el format; el segon detecta problemes de codi; el tercer executa les proves. Si l’assistent afirma haver-los executat, revisa l’eixida. Si no té terminal, executa’ls tu i aporta el resultat en demanar més ajuda. Les proves de propietats no substituïxen la revisió visual del catàleg.

### Conserva el que has aprés

En acabar, anota quin component has afegit, quins paràmetres seleccionen les variants i què has comprovat. Actualitza el context de l’assistent en avançar d’apartat. Has de poder explicar el component sense llegir el xat: per a què servix, on decidix l’aspecte i com s’utilitza des de la pantalla.

## Com avançarem en cada apartat

1. Comprén per a què servix el widget i prova’n l’exemple mínim.
2. Estudia les propietats principals i els exemples; identifica també els widgets auxiliars que utilitzen.
3. Implementa els components proposats en fitxers propis de `lib/ui/core/ui/`, amb variants seleccionades per paràmetres.
4. Importa’ls des de la pantalla corresponent i mostra diverses configuracions de cadascun en el catàleg.
5. Comprova els requisits i utilitza les skills per a revisar codi i generar proves concretes.

La pantalla és el lloc on mostrem els casos; el component és la peça reutilitzable que rep dades. No cal modificar el llistat principal. Comença per [Variants d’un component](../../basicos/estilo-y-variantes/), on prepararem una primera peça reutilitzable abans d’estudiar cada widget bàsic.
