---
title: "Configuració d’un assistent d’IA"
description: "Configuració d’un assistent d’IA · Assistent d’IA i catàleg de widgets per a 2n de DAM."
sidebar:
  order: 1
---

En esta pràctica prepararem un **assistent de Flutter** i començarem una aplicació que utilitzarem durant el curs: el **Catàleg de widgets**. La pantalla principal mostrarà una llista de components. En prémer una entrada, obrirem una pantalla amb diversos exemples d’eixe widget. Quan aprenguem un component nou, ampliarem el catàleg.

La IA ens ajudarà a comprendre codi, trobar errors i revisar canvis. Per a aprendre hem de comprovar les propostes, executar-les i explicar què hem construït. Una resposta convincent pot contindre un error.

## Què has de saber abans de començar

Has d’haver preparat [l’entorn de Flutter](../../introduccion-a-flutter/preparacion-del-entorno/) i practicat [les bases de Dart](../../introduccion-a-flutter/el-lenguaje-dart/): variables, llistes, funcions, classes, constructors i paràmetres amb nom. Convé completar també el [primer exemple de widgets](../primer-ejemplo/). Si encara no has arribat als widgets, pots configurar l’assistent ara i tornar a l’aplicació després.

No necessites una clau d’una API ni afegir paquets d’IA a `pubspec.yaml`. L’assistent s’utilitza durant el desenvolupament; la nostra aplicació serà un catàleg i no incorporarà un xat.

## Recorregut de la pràctica

1. [Preparar el projecte](./preparar-el-proyecto/).
2. [Configurar i comprovar l’assistent](./configurar-el-asistente/).
3. [Crear habilitats per a explicar, depurar i revisar](./crear-skills/).
4. [Construir el catàleg de widgets](./crear-el-catalogo/).

## Quatre conceptes que no hem de confondre

Quan configurem un assistent apareixen quatre paraules que descriuen coses diferents: **agent, skill, regla i context**. Les distingirem utilitzant una mateixa tasca: afegir exemples de `Text` al nostre catàleg de widgets.

### Agent: l’assistent que du a terme una tasca

Un **agent d’IA** és un sistema que utilitza un model d’IA per a avançar cap a un objectiu. Pot decidir quins passos fer, utilitzar les eines que tinga disponibles i revisar els resultats abans de continuar.

Per exemple, davant de la petició «Busca per què no s’obri la pantalla d’exemples», un agent integrat en l’editor podria llegir el fitxer de la llista, revisar l’`onTap`, consultar els errors de Dart i proposar una correcció. Si té permís per a modificar fitxers, també podria aplicar el canvi i comprovar-lo.

El **model** genera respostes i proposa accions; l’**agent** incorpora a més el funcionament que permet utilitzar eines i encadenar eixos passos. Les possibilitats depenen de l’entorn i dels permisos: un xat al qual apeguem codi pot explicar-lo, però això no li dona accés als fitxers del nostre ordinador.

Escriure «actua com a expert en Flutter» definix un paper per a l’assistent. Eixa frase, per si sola, no li proporciona eines ni accés al projecte.

### Skill: un procediment reutilitzable per a una tasca concreta

Una **skill**, o habilitat, reunix instruccions per a fer una tasca específica seguint un procediment que podem reutilitzar. Pot incloure exemples, referències i, en alguns entorns, scripts de suport.

En el nostre projecte, `explain-widget` serà una skill per a explicar widgets. El procediment podria ser:

1. Explicar per a què servix el widget.
2. Mostrar un exemple mínim.
3. Descriure les propietats utilitzades.
4. Assenyalar un error freqüent.
5. Proposar una modificació per a practicar.

Podem aplicar el mateix procediment a `Text`, `Icon` o `Image`. Canvia el component que estudiem, però mantenim la forma d’explicar-lo.

**La skill indica com abordar una tasca; no és un altre agent.** Tampoc és una funció de Dart que s’execute en obrir l’aplicació. Hem de proporcionar-la a l’assistent o guardar-la en un format i una ubicació que l’eina reconega, com veurem en l’apartat d’habilitats.

### Regla: una instrucció que orienta el comportament

Una **regla** indica com ha de treballar l’assistent o quins límits ha de respectar. Sol aplicar-se a tasques diferents, mentre que una skill desenvolupa el procediment d’una tasca concreta.

Estes serien regles del nostre projecte:

- «Explica la sintaxi nova abans d’utilitzar-la».
- «No afiges paquets externs».
- «Si demane una revisió, no modifiques els fitxers».

La regla «No afiges paquets externs» continua sent rellevant tant quan expliquem `Text` com quan revisem una pantalla de botons. No descriu una seqüència de treball: establix una condició que han de respectar les propostes.

Guardar-la en un fitxer no és suficient: l’assistent ha de rebre o carregar eixes instruccions. A més, una regla escrita en llenguatge natural **no equival a un permís tècnic**. Demanar que no modifique fitxers orienta el seu comportament; restringir l’escriptura des de l’eina limita tècnicament què pot fer.

### Context: la informació disponible per a resoldre la tasca

El **context** és la informació que l’assistent té disponible quan prepara una resposta o decidix una acció. Pot incloure la nostra petició, missatges anteriors, codi adjunt, instruccions carregades i resultats d’eines.

Per a revisar el catàleg, aportaríem este context:

```text
Estic aprenent widgets bàsics de Flutter.
L’aplicació té una llista amb les entrades Text i Icon.
En prémer Text no s’obri la seua pantalla d’exemples.
Este és el fitxer catalogo_pantalla.dart i este és l’error que apareix.
```

Indicar el nostre nivell ajuda a ajustar l’explicació; descriure el resultat esperat i aportar el codi permet investigar el problema. L’assistent no coneix automàticament tot el projecte ni què vam fer en una altra conversa: hem de comprovar quina informació té disponible.

Les regles i les skills també poden formar part del context quan es carreguen. Les distingim per la seua funció: **el context aporta informació; una regla orienta el comportament; una skill organitza un procediment**.

### Com es relacionen en una mateixa petició

Imagina que escrivim: «Revisa la pantalla d’exemples de `Text` i dis-me què puc millorar sense canviar fitxers».

| Concepte | Què aporta en este cas |
| --- | --- |
| **Agent** | Atén la petició, examina la informació disponible i elabora la revisió; utilitza eines si les necessita i les té disponibles. |
| **Skill** | `review-code` organitza la revisió: comprovar l’objectiu, identificar problemes i justificar com a màxim tres millores. |
| **Regla** | «No modifiques fitxers quan demane una revisió» limita les accions que ha de proposar o fer. |
| **Context** | El codi de la pantalla, el nostre nivell, la petició i els resultats de l’analitzador permeten valorar el canvi. |

Una **eina** és un altre element: permet fer una operació, com llegir un fitxer o consultar l’analitzador. L’agent la utilitza; la skill pot indicar quan convé fer-ho. Tindre una skill que diga «comprova els errors» no proporciona per si mateix una eina per a consultar Dart.

**Comprova que ho distingixes:** «Conec classes de Dart» aporta context sobre el teu nivell; «No uses paquets externs» és una regla; «Seguix estos passos per a revisar una pantalla» definix un procediment que podem guardar com a skill. L’agent és el sistema que utilitza eixa informació per a fer la tasca.

## D’on partix este tutorial

La [guia oficial de Flutter per a desenvolupar amb IA](https://docs.flutter.dev/ai/get-started) servix de referència per a la connexió amb l’entorn de desenvolupament. El catàleg i la seqüència d’exercicis permeten posar en pràctica la configuració de l’assistent mentre construïm l’aplicació.
