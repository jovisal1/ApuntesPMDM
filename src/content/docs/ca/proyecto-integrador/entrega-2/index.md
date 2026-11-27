---
title: "Entrega 2"
description: "Formularis validats, reserves en memòria i navegació amb go_router."
sidebar:
  order: 1
---

En esta segona entrega ampliaràs l’aplicació de reserva d’espais de la [primera entrega](../entrega-1/) amb els continguts de [Formularis i navegació](../../formularis-i-navegacio/). En acabar-la, l’usuari podrà iniciar sessió o registrar-se, emplenar una sol·licitud de reserva, corregir els errors que detecte l’aplicació, revisar el desglossament del preu i confirmar la reserva, que apareixerà en Les meues reserves.

El treball es dividix en dos parts:

1. **Configuració de rutes:** centralitzar la navegació amb `go_router` i protegir les pantalles personals.
2. **Formularis:** desenvolupar els formularis d’accés, registre i reserva, amb la validació i la revisió final.

## Abans de començar

Partiràs de l’aplicació que vas lliurar en l’Entrega 1: models de domini, repositoris, dades fictícies i pantalles. No comences de zero: afegiràs pantalles, rutes i ViewModels sobre eixa base, i modificaràs els repositoris quan siga necessari. Les dades es continuen guardant **en memòria**: no s’utilitza cap base de dades ni emmagatzematge persistent, de manera que en tancar l’aplicació es perden els usuaris i les reserves creats.

Alguns comportaments de l’Entrega 1 canvien:

- L’accés i el registre deixen de ser simulats. Es fan amb nom i correu, sense contrasenya, i `Usuario` continua sense guardar contrasenyes.
- Confirmar una reserva ja no és una simulació: la reserva es guarda i apareix en Les meues reserves.
- El catàleg i el detall d’un espai es poden consultar sense iniciar sessió.
- Les pantalles reben identificadors a través de la ruta, en lloc de l’objecte `Espacio` per constructor.
- Afig la dependència `go_router` en `pubspec.yaml`.

## Part 1. Configuració de rutes

Implementa una navegació centralitzada amb `go_router`. L’aplicació ha de complir els requisits següents.

### Mapa de destinacions

L’aplicació disposa d’un únic `MaterialApp.router` i d’un mapa de rutes que inclou, almenys, estes destinacions:

- accés,
- registre,
- llista d’espais,
- detall d’un espai,
- formulari de reserva,
- revisió de la reserva,
- llista de reserves de l’usuari (Les meues reserves),
- perfil.

Inclou també la confirmació o el detall d’una reserva pròpia i una pantalla de «Pàgina no trobada». El catàleg i el detall d’un espai són públics; la resta de destinacions, excepte accés i registre, exigixen sessió.

### Paràmetres i errors

- Les rutes del detall i del formulari de reserva reben l’identificador de l’espai; la d’una reserva concreta rep l’identificador de la reserva. La pantalla obté el model corresponent a través del repositori.
- Si l’usuari accedix a una ruta que no existix, l’aplicació mostra una pantalla d’error amb una forma clara de tornar a l’inici.
- Si l’identificador no correspon a cap espai o reserva, l’aplicació ho indica amb un missatge i oferix una forma de tornar. Una reserva d’un altre usuari es tracta igual que una inexistent, sense revelar a qui pertany.

### Seccions amb estat conservat

Les seccions Espais, Les meues reserves i Perfil es mostren com a seccions de l’aplicació entre les quals es pot alternar. En canviar d’una a una altra, cada secció conserva la posició de desplaçament i la pila de navegació.

### Sessió i rutes protegides

- La sessió de l’usuari es guarda en memòria i es compartix entre totes les pantalles que la necessiten.
- Les rutes personals (com Les meues reserves i Perfil) només són accessibles amb la sessió iniciada. Si no n’hi ha, l’aplicació porta a l’accés i, una vegada iniciada la sessió, torna l’usuari a la destinació que havia sol·licitat. Açò inclou el formulari i la revisió de la reserva: si es prem Reservar sense sessió, després de l’accés s’obri el formulari d’eixe espai.
- En tancar la sessió s’elimina l’estat privat de l’usuari i el botó Arrere no permet tornar a les pantalles personals.
- Amb la sessió iniciada, accés i registre redirigixen al catàleg. Les redireccions no han de produir bucles.

En [Configuració de rutes](./rutas/) trobaràs el mapa de destinacions complet i el comportament esperat davant d’accessos incorrectes o sense permisos.

## Part 2. Formularis

Implementa els formularis d’accés, de registre i de reserva, i el recorregut que porta des de la sol·licitud fins a la confirmació.

### Requisits comuns

- Cada formulari utilitza `Form`, camps amb etiqueta i els controls adequats per a cada dada (text, data, hora, desplegable, casella…).
- Els missatges de validació apareixen al costat del camp afectat i permeten corregir l’error abans de continuar.

### Accés

L’usuari introduïx el nom i el correu. L’aplicació comprova en el repositori d’usuaris que les dos dades corresponen a un usuari registrat.

Vegeu el [formulari d’accés](./formularios/#formulari-daccés).

- Camps: nom i correu, tots dos obligatoris; el correu amb un format vàlid.
- Validacions: s’ignoren els espais dels extrems i el correu es compara sense distingir majúscules. Si les dades no corresponen a cap usuari, es mostra «Les dades d’accés no són correctes» i es conserven els valors.
- Si tot és correcte, s’inicia la sessió i s’obri la destinació pendent o, si no n’hi ha, el catàleg.

### Registre

Vegeu el [formulari de registre](./formularios/#formulari-de-registre).

- Camps: nom, correu, confirmació del correu i acceptació de les condicions.
- Validacions: el correu i la confirmació coincidixen, el correu no està ja registrat i les condicions estan acceptades.
- Si tot és correcte, es dona d’alta l’usuari i l’aplicació torna a la pantalla d’accés, amb el nom i el correu precarregats i el missatge «Compte creat. Ja pots iniciar sessió». No s’inicia la sessió automàticament.

### Reserva

Vegeu el [formulari de reserva](./formularios/#formulari-de-reserva).

- Camps: activitat, data, hora d’inici i de fi, nombre d’assistents i extres. Els extres són els serveis addicionals que oferix cada espai des de l’Entrega 1.
- Validacions: el nombre d’assistents està entre 1 i l’aforament de l’espai; la data i l’hora d’inici són futures; les hores són en punt i la fi és posterior a l’inici el mateix dia, amb una durada mínima d’una hora; i els extres seleccionats són els que oferix eixe espai.
- El formulari mostra un desglossament provisional del preu (durada, tarifa per hora, lloguer, extres i total), que s’actualitza en canviar l’horari o els extres, i oferix tres accions: continuar amb la revisió, netejar el formulari o tornar al detall de l’espai.

### Revisió i confirmació

- El preu es calcula en cèntims, com a nombre enter (tarifa per hora × hores + preu de cada extra, que es cobra una sola vegada), amb una única lògica de càlcul que es reutilitza tant en el formulari com en la revisió.
- La pantalla de revisió mostra el desglossament del preu. Si l’usuari torna a editar, el formulari conserva els valors introduïts.
- En confirmar, la reserva es crea una sola vegada, encara que el botó es prema diverses vegades, i es guarda en el repositori en memòria. El seu autor és sempre l’usuari de la sessió. Després s’obri la confirmació amb el missatge «Reserva confirmada», i el botó Arrere no torna a la revisió ni repetix l’enviament.
- Les meues reserves s’actualitza immediatament i mostra només les reserves de l’usuari actual.

### Diàlegs de confirmació

- Abans de netejar un formulari, o d’abandonar-lo quan té canvis sense confirmar, l’aplicació demana confirmació mitjançant un diàleg.
- Si l’usuari cancel·la, no es perd cap dada.
- Tancar la sessió també demana confirmació. Els diàlegs apareixen tant amb els botons de la pantalla com amb el botó Arrere del sistema (amb `PopScope`, com en [Canvis sense guardar en tornar](../../formularis-i-navegacio/navegacion-avanzada/cambios-sin-guardar/)) i compartixen el mateix estil.
- Decidix què passa amb un esborrany en canviar de secció i documenta la decisió en el README.

En [Formularis](./formularios/) tens els requisits de cada pantalla i el seu comportament esperat.

## Millores opcionals

Les millores opcionals es descriuen en [Possibles ampliacions](./ampliaciones/).
