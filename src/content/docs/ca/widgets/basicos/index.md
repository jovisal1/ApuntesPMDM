---
title: "Widgets bàsics"
description: "Text, imatges, icones, botons i l’estructura d’una pantalla Flutter, amb exemples per a practicar."
sidebar:
  label: Bàsics
  order: 1
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

Treballarem directament sobre el projecte base que crearem en la secció de configuració de l’assistent. La pantalla principal, el llistat i les seccions buides ja estan preparats. Cada apartat explica el widget amb un exemple mínim i les propietats principals. Després crearàs components amb paràmetres en fitxers de `lib/componentes/` i mostraràs les variants en la pantalla corresponent del catàleg. Els exemples de propietats ajuden a comprendre el widget; el resultat de l’activitat són els teus components reutilitzables. Consulta l’[esquema del projecte](../configuracion-de-un-asistente-de-ia/el-proyecto-del-catalogo/).

## 🔎 Claus per a llegir i entendre un widget

Llig el codi **de fora cap a dins**: identifica primer quin widget es crea i després quina configuració rep. Este fragment podria ser un element de la llista d’exemples:

```dart
const Center(
  child: Text(
    'Ruta de la cascada', // Contingut: argument posicional.
    maxLines: 2, // Paràmetre amb nom: valor.
    textAlign: TextAlign.center,
    style: TextStyle(
      fontSize: 24,
      fontWeight: FontWeight.bold,
    ),
  ),
)
```

| Clau | Com llegir-la | Exemple |
| --- | --- | --- |
| Nom i parèntesis | El nom identifica el constructor i els parèntesis contenen els arguments. No tots els objectes que creem són widgets: `TextStyle` configura un estil. | `Text('Hola')` crea un widget; `TextStyle(fontSize: 24)` crea un estil. |
| Paràmetres amb nom | S’escriuen com **`nom: valor`**. Els dos punts separen el nom de l’argument i el valor; no són una assignació amb `=`. | En `maxLines: 2`, configurem el límit de línies amb el valor `2`. |
| Arguments posicionals | Es reconeixen per la posició i no porten nom ni dos punts. | `'Ruta de la cascada'` és el primer argument de `Text`. |
| Comes | Separen els arguments. Pot haver-hi una coma després de l’últim. Un salt de línia no substituïx una coma. | `fontSize: 24, fontWeight: FontWeight.bold,` |
| Parèntesis i indentació | Cada `(` té el seu `)`. La indentació ajuda a distingir quins arguments pertanyen a cada objecte. | `Center(child: Text('Hola'))` conté un `Text` dins d’un `Center`. |
| Valors | Poden ser números, cadenes, booleans, variables, expressions o objectes, inclosos altres widgets. | `24`, `'Hola'`, `true`, `TextAlign.center` o `Text('Hola')`. |
| Un fill | `child` sol rebre un widget. Altres paràmetres, com `body`, `title` o `icon`, reben widgets per a zones concretes. | `child: Text('Hola')` |
| Diversos fills | `children` rep una llista entre claudàtors, amb els widgets separats per comes. | `children: [Text('Un'), Text('Dos')]` |
| Accions | Un esdeveniment rep una funció per a executar-la després. Les claus delimiten el cos d’una funció anònima. | `onPressed: () { guardar(); }` o `onPressed: guardar`. Escriure `guardar()` executa la funció en eixe moment. |
| Configuració constant | `const` crea un objecte amb configuració constant i establix un context constant per als objectes niats. No pot utilitzar-se si un argument requerix un valor calculat durant l’execució. | En `const Center(child: Text('Hola'))`, no cal repetir `const` davant de `Text`. |

Abans de modificar un exemple, intenta respondre: **quin widget configure, quin argument canviaré i quin resultat espere observar?** Canvia una propietat cada vegada i compara el resultat amb la predicció.

## Apartats

- [Variants d’un component](./estilo-y-variantes/)
- [Text: mostrar i donar format al text](./text/)
- [Image: incorporar imatges](./image/)
- [Icon: representar una idea amb un símbol](./icon/)
- [Botons: respondre a una acció](./botones/)
- [Placeholder: reservar un espai provisional](./placeholder/)
- [Scaffold i AppBar: donar estructura a la pantalla](./scaffold-y-appbar/)
- [Practica amb els widgets bàsics](./practica/)
