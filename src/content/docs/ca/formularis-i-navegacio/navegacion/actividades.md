---
title: "Activitats de navegació"
sidebar:
  order: 5
---

## ✍️ Amplia els exemples de navegació

Realitza estes activitats dins de **`catalogo_widgets`**. Conserva les pantalles de barra inferior, rail, calaix i pestanyes: els exercicis s’afigen al catàleg sense substituir-les. Usa únicament les ferramentes estudiades en esta secció; no necessites instal·lar paquets.

### Triar un component i rebre la resposta

Crea `SelectorComponentePantalla` i `DetalleComponentePantalla` en `lib/ui/navegacion/ui/`, i afig «Selector de components» al catàleg.

- El selector mostra Text, Image i Icon. En prémer-ne un, obri el detall amb `Navigator.push` i passa el nom pel constructor.
- El detall mostra el nom rebut i una descripció breu del component.
- El botó «Triar» tanca el detall amb `pop` i retorna el nom.
- En el selector, espera el resultat de `push` i, després de comprovar `context.mounted`, mostra l’elecció en un `SnackBar`.
- Si es torna amb la fletxa sense triar, el resultat és `null`: no mostres un missatge d’elecció.

:::tip[Resultat esperat]
Catàleg → Selector → Detall. «Triar» retorna la dada al selector; la fletxa només torna. Un nou retrocés des del selector porta al catàleg.
:::

### Organitzar una biblioteca d’exemples

Afig `BibliotecaEjemplosPantalla` en `lib/ui/navegacion/ui/`, amb una entrada pròpia en el catàleg.

- Utilitza una `NavigationBar` amb tres destinacions: Text, Imatge i Disseny. Cada selecció ha d’actualitzar el títol i el contingut central.
- En Text, afig dos pestanyes: «Guiats» i «Els meus exemples». Usa `DefaultTabController`, `TabBar` i `TabBarView` amb el mateix nombre d’elements.
- Mostra almenys un contingut distint en cada destinació i en cada pestanya; no basta amb canviar l’indicador de selecció.
- Mantín la barra inferior en canviar de secció. No utilitzes `push` per a cada selecció de la barra o de les pestanyes.

:::tip[Resultat esperat]
Pots canviar de destinació i de pestanya sense acumular pantalles. En tornar des de la biblioteca regressaràs al catàleg, sense recórrer les seleccions anteriors.
:::

### Demanar una elecció i confirmar una acció

Afig `AccionesEjemploPantalla` en `lib/ui/navegacion/ui/`, amb una entrada pròpia en el catàleg i dos botons independents.

- «Triar torn» obri un full inferior modal amb Matí i Vesprada. Cada opció tanca el full i retorna el valor; la pantalla mostra l’elecció en un `SnackBar`.
- Si es tanca el full sense triar, no mostres una confirmació.
- «Buidar selecció» obri un `AlertDialog` amb «Cancel·lar» i «Buidar». El diàleg retorna un booleà.
- Només una confirmació explícita mostra «Selecció buidada» en un `SnackBar`. Cancel·lar o tancar el diàleg no executa eixa acció.
- Després de cada espera, comprova que el context continua muntat abans d’utilitzar-lo.

En esta activitat basta amb mostrar les respostes: no necessites implementar emmagatzematge ni un formulari nou.

:::tip[Resultat esperat]
El full i el diàleg es tanquen abans de mostrar la resposta. L’usuari es manté en la pantalla d’accions; tancar una interacció sense confirmar no produïx un missatge d’èxit.
:::

## 🧩 Conserva totes les demostracions

El catàleg ha de permetre obrir per separat els exemples originals i les tres activitats. Afig un títol i una explicació breu a cada pantalla. Executa `dart format lib` i `flutter analyze`.

Revisa tant els botons de confirmació com la fletxa de retrocés i el tancament sense triar. Comprova que cada resposta s’utilitza en la pantalla que va obrir la interacció i que el retrocés conserva l’ordre esperat.
