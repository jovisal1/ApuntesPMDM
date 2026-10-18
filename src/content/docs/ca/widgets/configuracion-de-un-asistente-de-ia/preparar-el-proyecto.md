---
title: "1. Preparar el projecte"
description: "1. Preparar el projecte · Assistent d’IA i catàleg de widgets per a 2n de DAM."
sidebar:
  order: 2
---

Prepara una carpeta de treball per a **`catalogo_widgets`** i comprova l’entorn amb `flutter doctor`. Si ja has creat el projecte, obri’l en VS Code. En [El projecte del catàleg](../el-proyecto-del-catalogo/) trobaràs els passos de creació, el `main.dart` complet i les pantalles inicials. Abans prepararem les instruccions i habilitats que utilitzarem durant el desenvolupament.

## Organitza el material de l’assistent

Dins de `catalogo_widgets`, crea una carpeta `ai`. Quan generes el projecte Flutter, quedarà al costat de `lib`, no dins. Després crea `instrucciones.md` i una carpeta `skills`:

```text
catalogo_widgets/
├── ai/
│   ├── instrucciones.md
│   └── skills/
├── lib/
│   └── main.dart
├── test/
└── pubspec.yaml
```

Un fitxer `.md` és text amb format Markdown. Es pot editar amb VS Code i obrir com a text. Estos fitxers documenten com volem treballar amb l’assistent; Flutter no els executa ni els mostra en l’aplicació.


## Primera pregunta de control

Envia este missatge sense demanar que canvie fitxers:

```text
Estic en 2n de DAM i estic començant amb Flutter.
Crearé catalogo_widgets, una aplicació amb una llista de components
que obri una pantalla d’exemples per cada tipus de widget.
Explica quina diferència hi ha entre Dart, Flutter i un widget.
No generes codi encara.
```

Comprova que la resposta distingix el llenguatge, el framework i les peces de la interfície. En l’apartat següent afegirem instruccions perquè l’ajuda s’ajuste millor al nostre aprenentatge.
