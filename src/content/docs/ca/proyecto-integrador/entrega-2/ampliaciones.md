---
title: "Possibles ampliacions"
description: "Millores opcionals de la segona entrega."
sidebar:
  order: 4
---

Estes millores són opcionals. Pots incorporar-les després de completar els requisits de rutes i formularis. Indica quines has desenvolupat i comprova que s’integren amb la resta de l’aplicació.

## Disponibilitat i solapaments

Comprova que l’interval sol·licitat estiga contingut en una única franja lliure i que no se solape amb reserves actives del mateix espai. Utilitza la disponibilitat de set dies definida en la primera entrega. No cal combinar franges contigües.

Dos intervals se solapen quan `inicioA.isBefore(finB) && inicioB.isBefore(finA)`. Acabar exactament quan comença una altra reserva està permés. Les reserves pendents i confirmades ocupen l’interval; les cancel·lades el deixen lliure.

## Modificació i cancel·lació

Edita reserves futures no cancel·lades de l’usuari actual amb el mateix formulari precarregat. Guardar conserva l’identificador i actualitza la llista. Aplica preus actuals i presenta el desglossament nou per a acceptar-lo; fins a guardar, l’original no canvia.

Abans de cancel·lar, demana confirmació. Si s’accepta, canvia l’estat a `cancelada` i conserva la targeta en la llista. Les reserves passades o cancel·lades només es poden consultar.

## Edició del perfil

Valida nom i correu, permet guardar o descartar i actualitza sessió i Perfil. Rebutja un correu utilitzat per un altre usuari.

## Opinions amb formulari

Permet publicar una opinió a l’usuari que haja iniciat sessió. Valida que el comentari continga text i que la puntuació siga un enter d’1 a 5. Guarda l’opinió en memòria i actualitza la llista, la mitjana i el nombre de valoracions. Els canvis s’han de mantindre en eixir del detall i tornar a obrir-lo.

## Cerca i filtres

Busca per nom i filtra per activitat i capacitat mínima. Combina criteris, permet netejar-los i mostra absència de resultats. Pots afegir autocompleció d’ubicacions existents.
