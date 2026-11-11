---
title: "Formularis"
description: "Requisits tècnics i orientacions per a la segona entrega."
sidebar:
  order: 3
---

Desenvolupa els formularis d’accés, registre i reserva perquè l’usuari puga introduir informació, corregir errors i completar cada operació. En la reserva, afig un pas de revisió abans de guardar. Els apartats següents detallen els camps, les validacions i el resultat de cada acció.

:::note[Recordatori per a tots els formularis]
Aplica estes pautes a tots els formularis de l’entrega.

Cada formulari ha de tindre un ViewModel que gestione els valors, les seleccions, els errors i les operacions. La pantalla conté el `Form`, la clau i els `TextEditingController`. Mantín sincronitzats els controladors i el ViewModel en editar, precarregar o netejar els camps, i allibera els controladors amb `dispose`.

El ViewModel gestiona els valors, les validacions i les operacions del formulari i notifica els canvis com en els apunts. La pantalla mostra els resultats, obri els diàlegs i s’encarrega de la navegació. El ViewModel obté els models de domini a través dels repositoris i utilitza les regles que corresponguen. Un formulari invàlid no permet continuar. En la reserva, tampoc mostra un preu que parega definitiu.
:::

## Formulari d’accés

El formulari ha de permetre l’accés amb qualsevol dels usuaris disponibles: els inclosos en les dades inicials i els creats des de Registre.

### Camps i validacions

| Dada | Control suggerit | Validació obligatòria |
| --- | --- | --- |
| Nom | Camp de text amb etiqueta visible | Obligatori; rebutja un valor buit o format només per espais. |
| Correu | Camp de text amb teclat de correu i etiqueta visible | Obligatori i amb format vàlid. |

Elimina espais als extrems i compara els correus sense distingir majúscules, aplicant el mateix criteri que en Registre. Mostra els errors d’obligatorietat i format al costat de cada camp. Quan els dos siguen vàlids, comprova al repositori que nom i correu corresponen al mateix usuari.

Si no coincidixen, mostra «Les dades d’accés no són correctes», conserva els valors per a poder corregir-los i no inicia sessió. No construïsques un usuari nou a partir de les dades escrites.

### Accions del formulari

| Acció | Comportament esperat |
| --- | --- |
| Entrar amb camps incorrectes | Es queda al formulari i mostra els errors al costat dels camps. |
| Entrar amb nom i correu que no corresponen a un usuari | Mostra l’error d’accés, sense iniciar sessió ni perdre la destinació pendent. |
| Entrar amb dades correctes | Establix la sessió amb l’usuari obtingut del repositori. Recupera la destinació protegida pendent; si no n’hi ha, obri `/espacios`. La pantalla de destinació comprova també els permisos de l’usuari. |
| Netejar | Restablix els camps i elimina els missatges d’error. Si hi ha canvis, demana confirmació i només neteja si s’accepta. Conserva la destinació pendent. |
| Crear compte | Obri `/registro` i conserva la destinació pendent per a recuperar-la després del registre i de l’accés correcte. |
| Explorar espais | Obri `/espacios` i permet consultar el catàleg públic sense iniciar sessió. |

Per a connectar l’accés amb la sessió, utilitza [Accés a rutes protegides dels apunts](../../../formularis-i-navegacio/navegacion-avanzada/rutas-protegidas/).

## Formulari de registre

Completa la pantalla de Registre de la primera entrega per a crear usuaris que puguen accedir després amb el nom i el correu. L’alta ha de quedar disponible al mateix repositori que consulta el formulari d’accés.

### Camps i validacions

| Dada | Control suggerit | Validació obligatòria |
| --- | --- | --- |
| Nom i cognoms | Camp de text | Obligatori; rebutja un valor buit o format només per espais. |
| Correu | Camp de text amb teclat de correu | Obligatori, amb format vàlid i no utilitzat per un altre usuari. |
| Confirmació de correu | Camp de text | Obligatori; ha de coincidir amb el correu introduït. |
| Acceptació de condicions | Casella amb etiqueta visible | Ha d’estar marcada per a crear el compte. |

Elimina espais als extrems abans de validar i compara els correus sense distingir majúscules. Comprova duplicats tant amb els usuaris inicials com amb els creats durant l’execució. Mostra els errors al costat dels camps i conserva els valors perquè es puguen corregir.

### Accions i resultat del registre

| Acció o situació | Comportament esperat |
| --- | --- |
| Crear compte amb dades incorrectes | Es queda al formulari, mostra els errors i no crea cap usuari. |
| Correu ja registrat | Mostra «Este correu ja està registrat» i permet corregir-lo. |
| Crear compte amb dades vàlides | Guarda un únic usuari amb identificador propi i torna a `/acceso`. En Accés mostra «Compte creat. Ja pots iniciar sessió» i precàrrega el nom i el correu. No inicia sessió automàticament. |
| Polsar repetidament Crear compte | Evita altes duplicades mentre es completa l’operació. |
| Tornar a Accés | Torna a `/acceso` sense crear el compte; si hi ha canvis, aplica la confirmació de descart. |
| Netejar | Restablix camps, casella i errors, amb confirmació si hi ha canvis. |

Si s’havia arribat a Accés per una ruta protegida, conserva eixa destinació durant el registre i el retorn. Només es recupera després d’iniciar sessió correctament.

L’usuari creat ha d’estar disponible al mateix repositori que consulta el formulari d’accés i conservar-se durant l’execució. Reiniciar restaura les dades inicials. En el primer accés, el Perfil mostra les dades del compte nou i Les meues reserves mostra l’estat buit fins que cree una reserva. La confirmació del correu i la casella són dades del formulari; el compte utilitza el model `Usuario` amb identificador, nom i correu, sense contrasenyes.

## Formulari de reserva

Completa la pantalla Nova reserva de la primera entrega perquè l’usuari puga triar les dades de la sol·licitud. El formulari ha de validar eixes dades i calcular el preu abans de passar a la revisió. La reserva es guardarà únicament després de confirmar-la.

### Entrada i informació de l’espai

El botó **Reservar** del detall obri `/espacios/:id/reservar` amb l’identificador de l’espai seleccionat. Si no hi ha sessió, seguix el retorn després de l’accés definit en [Configuració de rutes](../rutas/). El ViewModel consulta l’espai mitjançant el repositori.

Mostra el nom de l’espai, l’aforament i la tarifa per hora perquè l’usuari sàpia què està reservant. Estos valors són informatius; no es poden modificar des del formulari.

### Camps i validacions

| Dada | Control suggerit | Validació mínima |
| --- | --- | --- |
| Activitat | Desplegable | Selecció entre les activitats de l’espai. |
| Data | Selector de data | Permet un inici futur. |
| Inici i final | Selectors d’hora | Hores en punt, mateix dia, final posterior i inici futur. |
| Assistents | Camp numèric | Enter entre 1 i aforament. |
| Extres | Caselles o opcions múltiples | Només els de l’espai, sense duplicats. |

Pots limitar els selectors a valors vàlids; mostra errors si l’estat rebut incomplix les regles. Convertix les seleccions a `DateTime` abans de construir la sol·licitud; el domini no necessita `TimeOfDay`.

### Preu i accions del formulari

Mostra la duració, la tarifa per hora, el subtotal del lloguer, el subtotal d’extres, el total i la moneda. Actualitza els imports en canviar l’horari o la selecció d’extres. El nombre d’assistents no modifica el preu dels extres. La taula següent concreta les accions del formulari.

Les reserves noves han de començar en el futur, amb inici i final el mateix dia i hores en punt, sense segons ni fraccions. La duració serà d’una o més hores completes. Rebutja extres desconeguts o duplicats. Calcula els imports en cèntims: total = tarifa per hora × hores + extres. Cada extra es cobra una vegada per reserva.

| Acció | Comportament esperat |
| --- | --- |
| Continuar | Valida totes les dades. Si hi ha errors, es queda al formulari i els mostra. Si són vàlides, obri `/espacios/:id/reservar/revision` conservant els valors. Encara no guarda la reserva. |
| Netejar | Demana confirmació si hi ha canvis i restablix els valors inicials i els errors només si s’accepta. |
| Tornar | Torna al detall del mateix espai; si es perden canvis, demana confirmació de descart. |

## Revisió i creació de la reserva

La pantalla de revisió ha de mostrar l’espai, l’activitat, la data, l’horari, els assistents, els extres, el contacte i el desglossament del preu. Permet tornar al formulari per a corregir dades sense perdre els valors introduïts. Conserva un mateix esborrany durant el recorregut. Si utilitzes `extra` per a passar informació entre pantalles, contempla també l’accés directe a la ruta de revisió, com s’indica en Configuració de rutes.

En confirmar, comprova de nou la sessió, la validesa de les dades i els imports. Guarda la reserva mitjançant el repositori i evita que diverses pulsacions creen reserves duplicades. Si l’operació falla, conserva l’esborrany i permet corregir les dades o tornar a intentar-ho.

En polsar **Confirmar reserva**, si l’operació acaba correctament, navega a la **pantalla de confirmació o detall de la reserva creada**, en `/reservas/:id`, utilitzant-ne l’identificador. Mostra el missatge «Reserva confirmada» i les dades guardades. Inclou un botó **Veure les meues reserves** que porte a `/reservas`, on ja ha d’aparéixer la reserva nova al costat de les anteriors de l’usuari. Substituïx el recorregut d’edició perquè Arrere no torne a la revisió ni repetisca l’enviament.

## Diàlegs i canvis sense guardar

Considera que un formulari té canvis quan els valors són diferents dels inicials. Si una acció eliminarà eixos canvis, demana confirmació abans de fer-la, tant des dels botons com des d’Arrere del sistema. Pots utilitzar `PopScope`, seguint els apunts. Tornar de la revisió al formulari manté l’esborrany i no requerix confirmar un descart.

| Acció | Respostes | Resultat |
| --- | --- | --- |
| Abandonar formulari modificat | Continuar editant / Descartar | Només descartar elimina l’esborrany i ix. |
| Netejar formulari modificat | Cancel·lar / Netejar | Només netejar restablix valors i errors. |
| Tancar sessió | Cancel·lar / Tancar sessió | Només confirmar elimina sessió i estat privat. |

Aplica la política en canviar de secció: si abandones el formulari, confirma; si conserves el recorregut, pots mantindre l’esborrany. Documenta la decisió i no perdes canvis silenciosament. Un formulari intacte no necessita diàleg.

:::note[Un estil comú per als diàlegs]
És convenient que tots els diàlegs mantinguen el mateix estil: tipografia, colors, vores, espaiat i disposició dels botons. Conserva també la posició i la jerarquia d’accions com Cancel·lar i Confirmar, i utilitza etiquetes que expliquen què passarà, com «Descartar canvis» o «Tancar sessió».

Esta coherència ajuda l’usuari a reconéixer ràpidament un diàleg i a entendre les opcions sense haver d’aprendre una distribució diferent cada vegada. També reduïx les pulsacions per error, especialment en accions que eliminen canvis. Pots destacar les accions destructives amb un color específic, mantenint la resta del disseny comú.
:::
