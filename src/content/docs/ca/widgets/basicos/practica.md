---
title: "Practica amb els widgets bàsics"
sidebar:
  order: 9
---

El resultat d’esta unitat és un catàleg de **components propis amb variants**, construïts a partir dels widgets estudiats. Completa les activitats de cada apartat i revisa el conjunt.

## 🔎 Revisa els components

1. Cada component viu en el seu fitxer de `lib/componentes/`; les pantalles l’importen i mostren configuracions diferents.
2. Els paràmetres separen contingut, aspecte i accions. Una variant visual no altera el text o el callback rebut sense que el contracte ho indique.
3. Les variants es seleccionen amb booleans o `enum`, no amb classes duplicades per a cada combinació.
4. Mostra totes les variants demanades i algun cas límit: text llarg, imatge que falla, botó desactivat o espai reduït.
5. Cada exemple del catàleg té un títol i una explicació pròpia de què canvia i què cal observar.

## ✅ Comprova i entrega

Executa `dart format lib`, `flutter analyze` i les proves creades amb `test-widget`. Revisa que les proves es basen en requisits concrets i que distingixen les variants. Comprova també la llegibilitat i l’ajust visual en una finestra menuda.

Entrega un únic projecte amb els components, les pantalles del catàleg i les proves. Tria dos components i explica per què has triat els seus paràmetres, quines variants permeten i què detectaria una de les proves. No cal que hages implementat el mecanisme de pas entre pantalles.
