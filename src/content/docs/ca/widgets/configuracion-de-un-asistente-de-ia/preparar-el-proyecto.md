---
title: "1. Preparar el projecte"
description: "1. Preparar el projecte · Assistent d’IA i catàleg de widgets per a 2n de DAM."
sidebar:
  order: 2
---

Començarem creant **`catalogo_widgets`**, el projecte de Flutter que ampliarem a mesura que aprenguem components nous. La pantalla principal mostrarà una llista de widgets i cada entrada obrirà una pantalla amb exemples diferents del component seleccionat.

El primer pas és generar el projecte, obrir-lo en VS Code i comprovar que l’aplicació inicial s’executa correctament. Després prepararem els fitxers d’instruccions i habilitats de l’assistent d’IA per a treballar sobre este mateix projecte.

## Crea el projecte del curs

Obri una terminal en la carpeta on guardes les pràctiques. Executa cada ordre per separat:

```bash
flutter doctor
flutter create catalogo_widgets
cd catalogo_widgets
flutter devices
flutter run
```

`flutter doctor` comprova les eines instal·lades. Atén els problemes de la plataforma que utilitzaràs; per a executar en web no necessites completar la instal·lació d’iOS. `flutter create` crea un projecte amb eixe nom. `cd` entra en la carpeta i `flutter devices` mostra els destins disponibles. Si n’hi ha diversos, utilitza `flutter run -d ID`, substituint `ID` per un dels identificadors mostrats.

**Resultat esperat:** s’obri l’aplicació inicial de Flutter i pots prémer el seu botó. Fes esta comprovació abans de configurar la IA: així sabràs si un problema pertany a l’entorn o al codi que afegirem.

En VS Code utilitza **Fitxer → Obrir carpeta** i selecciona `catalogo_widgets`. Has de veure `pubspec.yaml` directament en l’explorador. Obri **Terminal → Nova terminal** i comprova que estàs en eixa carpeta.

## Organitza el material de l’assistent

Crea una carpeta `ai` al costat de `lib`, no dins. Després crea `instrucciones.md` i una carpeta `skills`:

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
