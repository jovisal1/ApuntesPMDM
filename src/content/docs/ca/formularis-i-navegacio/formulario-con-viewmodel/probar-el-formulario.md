---
title: "10. Provar el recorregut"
sidebar:
  order: 11
---

Des de l’arrel de `catalogo_widgets`, executa `dart format lib` per a formatar el codi, `flutter analyze` per a detectar problemes i `flutter run` per a obrir el catàleg. Entra en Login de demostración i comprova el mateix recorregut que hem construït des del primer pas.

| Prova | Resultat esperat |
| --- | --- |
| Login amb camps buits | Errors en nom, correu i taller. Es queda en el formulari. |
| Nom d’un caràcter o correu sense `@` | Error al costat del camp corresponent. |
| Ana i ana@centro.es sense taller | Error de selecció, sense obrir el detall. |
| Ana i pau@centro.es amb taller | Error de consulta: no corresponen a la mateixa fitxa. |
| Nom i correu desconeguts amb format correcte | Usuari no trobat, sense navegar. |
| Ana, ana@centro.es i Cerámica | Detall amb «¡Hola, Ana García Pérez!», telèfon 600 000 001, localitat Xàtiva i tots els altres camps de la fitxa. |
| Pau, pau@centro.es i un taller | Detall amb Pau Soler Vidal, telèfon 600 000 002 i localitat Alzira. |
| Recordatori marcat o desmarcat | Les dos opcions permeten Login; el detall reflectix la preferència. |
| Corregir un error de consulta i polsar Login | S’utilitzen els valors actuals, sense conservar el missatge antic. |
| Tornar des del detall | Conserva nom, correu, taller i casella. |
| Eixir al catàleg i tornar a obrir Login | Comença sense text, sense taller i amb la casella desmarcada. |

Prova nom i correu amb espais exteriors i majúscules: la cerca ha de continuar trobant la fitxa. Revisa també una finestra estreta, el teclat obert i text al 150 %: tot el contingut s’ha de poder desplaçar sense overflow.

## Comprova l’arquitectura

Afegix un taller i una tercera persona en el servici. En tornar a obrir l’exemple, el desplegable ha d’incloure la nova opció i el detall ha de mostrar la fitxa completa de la tercera persona sense editar els widgets. No copies eixes dades en el ViewModel.

Explica per què la clau del `Form`, els controladors, el focus i `Navigator` estan en la vista, mentre que la consulta es fa a través del contracte de domini. Indica on canviaries la conversió si la font deixara d’utilitzar el camp `email`.
