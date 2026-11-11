---
title: "Entrega 2"
description: "Formularis validats, reserves en memòria i navegació amb go_router."
sidebar:
  order: 1
---

En esta segona entrega ampliaràs l’aplicació de reserva d’espais de la [primera entrega](../entrega-1/) amb els continguts de [Formularis i navegació](../../formularis-i-navegacio/). El treball es dividix en dos parts: configurar les rutes que connecten les pantalles i desenvolupar els formularis d’accés, registre i reserva. L’usuari podrà introduir les dades, corregir els errors que detecte l’aplicació i revisar la informació i el preu abans de confirmar una reserva, que apareixerà en Les meues reserves.

## Configuració de rutes

Configura amb `go_router` les rutes de tota l’aplicació. La navegació ha de complir els requisits següents:

- Un únic `MaterialApp.router` i un mapa de rutes per a accés, registre, espais, detall, reserva, revisió, reserves de l’usuari i perfil.
- Paràmetres d’identificador per a consultar espais i reserves mitjançant repositoris; tractament de rutes desconegudes i elements inexistents.
- Seccions Espais, Les meues reserves i Perfil amb conservació del desplaçament i la navegació en alternar.
- Sessió compartida en memòria, protecció de les opcions personals i retorn a la destinació sol·licitada després de l’accés.
- Tancament de sessió que netege l’estat privat i impedisca recuperar-lo amb Arrere.

Consulta [Configuració de rutes](./rutas/) per als requisits detallats, el mapa de destinacions i el comportament davant d’accessos incorrectes o sense permisos.

## Formularis

Desenvolupa els formularis d’accés, registre i reserva. Han de complir els requisits següents:

- `Form`, camps etiquetats, controls adequats i missatges de validació que permeten corregir errors abans de continuar.
- Els ViewModels gestionen els valors, les validacions i les operacions del formulari. Les pantalles s’encarreguen de mostrar els resultats i de la navegació, i els repositoris proporcionen els models de domini. La vista gestiona els controladors i els allibera amb `dispose`.
- Accés amb nom i correu comprovat contra el repositori d’usuaris.
- [Formulari de registre](./formularios/#formulari-de-registre): nom, correu, confirmació del correu i acceptació de condicions; validació de duplicats, alta de l’usuari i retorn a Accés.
- [Formulari de reserva](./formularios/#formulari-de-reserva): activitat, data, hores, assistents i extres editables; validació d’aforament, interval i opcions admeses per l’espai. Inclou resum de preu i accions per a continuar a revisió, netejar o tornar al detall.
- Càlcul compartit del preu en cèntims, revisió del desglossament i retorn a edició conservant els valors.
- Alta única en confirmar, emmagatzematge local compartit i actualització immediata de Les meues reserves per a l’usuari actual.
- Diàlegs per a netejar o descartar formularis modificats, sense perdre canvis en cancel·lar.

Consulta [Formularis](./formularios/) per a conéixer els camps, les validacions i les accions de cada pantalla.

Les millores opcionals es descriuen en [Possibles ampliacions](./ampliaciones/).
