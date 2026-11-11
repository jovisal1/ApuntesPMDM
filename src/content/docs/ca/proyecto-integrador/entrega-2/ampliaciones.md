---
title: "Possibles ampliacions"
description: "Millores opcionals de la segona entrega."
sidebar:
  order: 4
---

Fes estes tasques després del mínim. Documenta quines implementes i comprova tot el recorregut. Es conserva la numeració de la proposta inicial.

## 4. Disponibilitat i solapaments

Exigix que l’interval càpia en una única franja lliure de la disponibilitat simulada i no se solape amb reserves actives de l’espai. Usa l’horitzó de set dies anterior; no cal combinar franges contigües.

Dos intervals se solapen quan `inicioA.isBefore(finB) && inicioB.isBefore(finA)`. Acabar exactament quan comença una altra reserva està permés. Pendents i confirmades bloquegen; cancel·lades no.

## 6. Modificació i cancel·lació

Edita reserves futures no cancel·lades de l’usuari actual amb el mateix formulari precarregat. Guardar conserva l’identificador i actualitza la llista. Aplica preus actuals i presenta el desglossament nou per a acceptar-lo; fins a guardar, l’original no canvia.

Cancel·lar requerix diàleg i canvia l’estat a `cancelada`, sense eliminar la targeta. Reserves passades i cancel·lades seran de consulta.

## 7. Edició del perfil

Valida nom i correu, permet guardar o descartar i actualitza sessió i Perfil. Rebutja un correu utilitzat per un altre usuari.

## 8. Opinions amb formulari

Exigix sessió, text amb contingut i puntuació entera d’1 a 5. Guarda en memòria i actualitza llista, mitjana i nombre d’opinions, també en reobrir l’espai.

## 9. Cerca i filtres

Busca per nom i filtra per activitat i capacitat mínima. Combina criteris, permet netejar-los i mostra absència de resultats. Pots afegir autocompleció d’ubicacions existents.
