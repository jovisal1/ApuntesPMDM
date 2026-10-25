---
title: "Introducció"
sidebar:
  order: 1
---

El catàleg ja permet obrir les pantalles d’exemples. Ara estudiarem eixe mecanisme i l’ampliarem dins de **`catalogo_widgets`**. Una aplicació també necessita obrir un detall, tornar al llistat, canviar de secció o demanar una confirmació. En esta subsecció construirem eixos recorreguts amb les eines de Flutter.

Convé distingir tres situacions: **obrir una pantalla amb `push`** afig una ruta a la pila; **canviar de secció** substituïx el contingut principal; **obrir un diàleg** planteja una interacció breu sobre la pantalla actual. Triarem una eina per a cada cas.

## 🎯 Què aprendràs

- Obrir i tancar pantalles i passar arguments i resultats entre elles.
- Organitzar seccions amb barres de navegació, un panell lateral o pestanyes.
- Demanar confirmacions i arreplegar respostes amb diàlegs.

Els exemples s’afigen com a entrades noves del catàleg, conservant les demostracions anteriors i el seu `main.dart`. Les pantalles de navegació es guarden en `lib/ui/navegacion/ui/`; els diàlegs amplien el formulari d’inscripció ja existent.
