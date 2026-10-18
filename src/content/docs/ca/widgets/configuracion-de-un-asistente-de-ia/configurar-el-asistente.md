---
title: "2. Configurar i comprovar l’assistent"
description: "2. Configurar i comprovar l’assistent · Assistent d’IA i catàleg de widgets per a 2n de DAM."
sidebar:
  order: 3
---

Recorda que el **context** és la informació que proporcionem a l’assistent perquè entenga la nostra situació i puga ajustar la resposta. En la nostra pràctica, inclou què sabem de Dart i Flutter, quina aplicació estem construint i en quina part del projecte estem treballant. Com més clar siga eixe context, més fàcil serà que les explicacions s’ajusten al que necessitem.

En esta secció recollirem eixe context en `ai/instrucciones.md`, juntament amb les regles sobre com volem que ens ajude. Després el proporcionarem a l’assistent i farem una prova amb un widget per a comprovar que adapta les explicacions al nostre nivell i ens oferix pistes abans de mostrar la solució.

## Escriu el context i les regles

Copia el contingut següent en `ai/instrucciones.md`. Llig cada regla: després hauràs de comprovar si l’assistent la respecta. La llista de coneixements és un punt de partida; ajusta-la al que ja has treballat.

```markdown
# Assistent de Flutter de 2n de DAM

## El meu nivell
Conec variables, llistes, funcions, classes i constructors de Dart.
Estic començant amb la composició de widgets de Flutter.
Si empre un concepte que no conec, explica’l abans de continuar.

## Projecte
Estem construint catalogo_widgets.
La pantalla principal mostra tipus de widgets.
En prémer un tipus, s’obri una pantalla amb diversos exemples.
El llistat i les pantalles buides ja estan implementats.
Completarem els exemples durant el curs.
No modifiques main.dart ni el llistat ni expliques navegació.

## Forma d’ajudar-me
1. Respon en l’idioma en què et pregunte i amb llenguatge senzill.
2. Abans de proposar un canvi, explica quin problema resol.
3. Dividix les tasques grans en passos que puga comprovar.
4. Quan estiga practicant, dona primer una pista i espera el meu intent.
5. Si demane una solució, mostra el canvi mínim i explica’n la causa.
6. No generes l’aplicació completa llevat que ho sol·licite expressament.
7. No afiges paquets externs ni gestió d’estat avançada.
8. Explica els widgets, les propietats i la sintaxi nova que utilitzes.
9. No modifiques fitxers si només he demanat una explicació o revisió.
10. Distingix què has comprovat de què només estàs proposant.

## Qualitat que revisarem
Noms clars, indentació, composició comprensible i const quan pertoque.
No proposes encara Riverpod, Bloc ni Clean Architecture.

## Resposta per a explicar un concepte
Explicació breu, exemple menut, lectura de l’exemple i mini exercici.
```

El context evita preguntes massa obertes. Per exemple, «fes una aplicació» permet moltes interpretacions; indicar que aprenem composició i que el catàleg creix per components delimita una tasca que podem revisar.

## Opció A. Utilitzar l’assistent des de qualsevol xat

1. Obri una conversa dedicada a esta pràctica.
2. Adjunta `ai/instrucciones.md` o apega’n el contingut complet.
3. Envia el missatge d’activació que apareix davall.
4. Per a consultar codi, adjunta el fitxer o apega el fragment rellevant, indicant-ne la ruta.
5. Quan comences una altra conversa, torna a proporcionar les instruccions i l’estat actual del projecte.

```text
Utilitza el fitxer instrucciones.md que t’he proporcionat com a guia d’esta pràctica.
Resumix el meu nivell, l’objectiu del catàleg i tres regles que seguiràs.
Després explica per a què servix Text i proposa un exercici menut.
No canvies fitxers ni resolgues l’exercici.
```

**Comprova el resultat:** ha d’explicar `Text`, proposar una tasca breu i deixar-te intentar-la. Si genera una aplicació sencera, assenyala la regla incomplida i demana que reduïsca la resposta. Tindre un fitxer guardat en l’ordinador no significa que un xat puga llegir-lo.

## Opció B. Carregar instruccions en un assistent integrat

Els noms dels fitxers depenen de l’eina. `ai/instrucciones.md` continua sent el nostre document de referència, però la càrrega automàtica no és universal.

### GitHub Copilot en VS Code

Crea `.github/copilot-instructions.md` en l’arrel del projecte i copia-hi el contingut de `ai/instrucciones.md`. Si ja existix, integra les regles de la pràctica sense esborrar les que tinga. Obri una conversa nova i envia la pregunta de control anterior.

Este és el fitxer d’[instruccions de projecte de Copilot](https://code.visualstudio.com/docs/agent-customization/custom-instructions). Quan actualitzes les instruccions, mantín sincronitzada esta còpia.

### Codex

Crea `AGENTS.md` en l’arrel de `catalogo_widgets` i copia-hi el contingut de les instruccions. Si ja existix, afig les instruccions de treball sense substituir les instruccions del projecte. Inicia una sessió nova des d’eixa carpeta i demana que resumixca les instruccions que ha carregat.

Codex descobrix [instruccions de projecte en `AGENTS.md`](https://learn.chatgpt.com/docs/agent-configuration/agents-md). No hem de suposar que llegirà automàticament qualsevol fitxer anomenat `instrucciones.md`.

## Comprova l’ajuda sobre un fragment

Apega este fragment **en el xat**, sense substituir fitxers del projecte base:

```dart
const Text('Ruta de la cascada', maxLines: 1)
```

Demana: «Vull que una descripció llarga mostre punts suspensius si no cap. Dona’m una pista sobre quina propietat falta i quines condicions d’espai he de revisar. No canvies fitxers ni resolgues encara l’exercici».

La resposta ha de deixar-te intentar-ho i distingir el límit de línies de l’espai disponible. Si genera una aplicació completa, recorda les regles i demana una pista concreta. Treballarem el resultat en el tutorial de `Text`.
