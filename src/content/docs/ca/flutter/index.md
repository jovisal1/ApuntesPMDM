---
title: Flutter
description: Introducció al desenvolupament d’interfícies gràfiques amb Flutter i al seu enfocament declaratiu basat en widgets.
---

En les unitats anteriors hem treballat els fonaments del llenguatge **Dart**, aprenent els conceptes necessaris per a estructurar i desenvolupar els nostres programes. A partir d’este punt fem un pas més: utilitzarem estos coneixements per a començar a desenvolupar **aplicacions amb interfície gràfica mitjançant Flutter**.

Flutter proposa una manera de construir interfícies diferent de la programació gràfica tradicional. En lloc d’indicar pas a pas com s’ha de modificar la interfície, utilitza un enfocament **declaratiu**: descrivim com volem que siga la interfície en funció de l’estat de l’aplicació i Flutter s’encarrega de representar-la i actualitzar-la quan siga necessari.

![Logotip de Flutter](../../../../assets/flutter-logo.png)

L’element fonamental sobre el qual es construïx qualsevol interfície en Flutter és el **widget**. Pràcticament tot el que apareix en pantalla és un widget: un text, un botó, una imatge, un camp d’entrada, una fila d’elements o, fins i tot, la mateixa estructura d’una pantalla. Al seu torn, els widgets poden contindre altres widgets, formant una **jerarquia o arbre de widgets** (*widget tree*).

Al llarg d’esta unitat aprendrem a construir interfícies combinant diferents tipus de widgets. Veurem com organitzar i distribuir els elements en pantalla, com aplicar estils i, progressivament, com aconseguir que les nostres interfícies puguen respondre a les accions de l’usuari i als canvis que es produïsquen en l’aplicació.

L’objectiu no serà únicament conéixer una col·lecció de widgets, sinó comprendre **com pensa Flutter a l’hora de construir una interfície**, ja que esta filosofia serà la base sobre la qual desenvoluparem les nostres aplicacions.
