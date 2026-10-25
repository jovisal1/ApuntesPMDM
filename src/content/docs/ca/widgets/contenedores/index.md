---
title: "Contenidors: organitzar la interfície"
sidebar:
  label: Introducció
  order: 1
---

Un text, una icona o un botó resolen peces concretes. Els **widgets de composició** decidixen com s’agrupen, quin espai ocupen i com accedim al contingut que no cap. Construirem panells, fitxes i col·leccions per al catàleg.

## 🎯 Què aprendràs

- Distribuir widgets, ajustar-ne la grandària i aplicar espais i alineacions.
- Combinar files, columnes i superposicions respectant les restriccions de grandària.
- Presentar llistes i graelles i permetre el desplaçament del contingut.

## 🧭 Triar la peça segons el problema

| Necessitat | Widgets |
| --- | --- |
| Grandària, separació i decoració d’un fill | `Container`, `SizedBox`, `Padding` |
| Alineació d’un fill | `Center`, `Align` |
| Distribució en una direcció | `Row`, `Column`, `Expanded`, `Flexible`, `Spacer` |
| Salt a línies noves | `Wrap` |
| Superposició | `Stack`, `Positioned` |
| Col·leccions desplaçables | `ListView`, `GridView` |
| Desplaçar una composició breu | `SingleChildScrollView` |

`child` rep un widget i `children`, una llista. Tindre diversos fills **no significa poder desplaçar-se**: `Row`, `Column`, `Wrap` i `Stack` no incorporen scroll.

## 📐 Una idea abans de començar: les restriccions

El pare comunica al fill les grandàries permeses. El fill tria la grandària dins dels límits i el pare el col·loca. Per això `width: 200` és una petició que depén de l’espai rebut, no una orde que ignore les restriccions.

Una fila té normalment amplària finita; una llista vertical deixa créixer els fills en altura. Això explica dos errors freqüents: demanar a `Expanded` que repartisca altura il·limitada o posar una llista vertical sense altura dins d’una altra. Els exemples reserven altura quan cal; conserva eixos límits en provar-los.

## 🧩 La secció del catàleg

La base d’[El projecte del catàleg](../configuracion-de-un-asistente-de-ia/el-proyecto-del-catalogo/) ja inclou `Contenedores`. Treballarem en `lib/ui/catalogo/ui/contenedores_ejemplos_pantalla.dart`. Esta és l’estructura inicial:

```dart
import 'package:flutter/material.dart';

class ContenedoresEjemplosPantalla extends StatelessWidget {
  const ContenedoresEjemplosPantalla({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ejemplos de Contenedores')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Añade aquí los componentes que implementes en las actividades.
        ],
      ),
    );
  }
}
```

Si ja tens una versió anterior amb només sis entrades, crea el fitxer anterior, afig `import 'contenedores_ejemplos_pantalla.dart';` al principi de `catalogo_pantalla.dart` i incorpora esta fila a `children` del seu `ListView`. És codi preparat: encara no cal estudiar el mecanisme entre pantalles.

```dart
ListTile(
  leading: const Icon(Icons.dashboard_outlined),
  title: const Text('Contenedores'),
  trailing: const Icon(Icons.chevron_right),
  onTap: () {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (context) => const ContenedoresEjemplosPantalla(),
      ),
    );
  },
),
```

Els noms de classes, fitxers i les cadenes Dart es mantenen igual en els dos idiomes. Cada activitat crea components en `lib/ui/core/ui/`; la pantalla els importa i mostra diverses configuracions. Conserva les demostracions anteriors i identifica cada grup amb un títol.

## Apartats

- [Espai, grandària i decoració](./espacio-y-decoracion/)
- [Files, columnes i repartiment flexible](./filas-columnas-y-reparto/)
- [Capes amb Stack i Positioned](./capas-con-stack/)
- [Llistes, graelles i desplaçament](./listas-cuadriculas-y-scroll/)
