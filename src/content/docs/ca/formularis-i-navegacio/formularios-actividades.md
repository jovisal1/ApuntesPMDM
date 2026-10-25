---
title: "Activitats de formularis"
---

## ✍️ Amplia el catàleg amb els teus formularis

Resol estes activitats en **`catalogo_widgets`**, conservant els exemples de la unitat. Afig una entrada en `catalogo_pantalla.dart` per a cada pantalla nova. No necessites un altre projecte ni paquets addicionals. Les instruccions descriuen el resultat que has de construir; la implementació et correspon a tu.

En cada funcionalitat, col·loca la View en `lib/ui/<funcionalitat>/ui/` i el ViewModel en `lib/ui/<funcionalitat>/view_models/`. La vista manté la clau del `Form`, els controladors i el focus; el ViewModel conté les regles de validació, les dades recollides i la preparació del resultat. Crea el ViewModel una vegada i allibera els recursos quan deixe d’utilitzar-se, com en l’exemple d’inscripció.

### 1. Formulari de reserva

Crea `ReservaPantalla` i `ReservaViewModel` dins de `lib/ui/reserva/`.

- Demana el nom amb `TextFormField`: després de llevar els espais exteriors, ha de tindre almenys dos caràcters.
- Permet triar Matí o Vesprada amb `DropdownButtonFormField<String>`. Al principi no hi ha torn seleccionat i és obligatori triar-ne un.
- Afig l’acceptació de condicions amb `FormField<bool>` i `CheckboxListTile`. Mostra un error si no s’accepten.
- En prémer «Reservar», valida tots els camps. Només si són vàlids, recull els valors amb `save()` i entrega’ls al ViewModel per a preparar el missatge de confirmació.
- Mostra la confirmació en un `SnackBar`, incloent-hi el nom i el torn.
- Afig «Reiniciar»: restablix els camps i neteja també les dades guardades fora del `Form`.

:::tip[Resultat esperat]
Una reserva incompleta mostra errors i no genera confirmació. Una reserva vàlida recull els tres valors. Després de reiniciar, el nom queda buit, no hi ha torn seleccionat i les condicions tornen a estar desmarcades.
:::

### 2. Editar una fitxa

Crea `FichaPantalla` i `FichaViewModel` dins de `lib/ui/ficha/`. Utilitza el que has aprés amb els controladors per a editar una fitxa amb Nom i Correu.

- Inicialitza els dos camps amb les dades que proporciona el ViewModel.
- Comunica els canvis al ViewModel sense crear controladors en `build`.
- Afig «Usar dades d’exemple» per a canviar els dos textos des de codi. Els valors del ViewModel també han de quedar actualitzats.
- Afig «Guardar»: valida els camps amb les regles de l’exemple d’inscripció i mostra davall un resum preparat pel ViewModel.
- Si es modifica qualsevol camp, amaga el resum anterior fins que es torne a guardar. Connecta les notificacions amb `ListenableBuilder`.
- Configura «Següent» per a passar de Nom a Correu i afig un botó «Editar correu» que sol·licite el focus d’eixe camp.

:::tip[Resultat esperat]
El resum correspon sempre a les últimes dades guardades. Escriure o carregar dades d’exemple retira el resum anterior. El botó de focus permet editar el correu sense tocar directament el camp.
:::

## 🧩 Mostra els resultats en el catàleg

Mantín disponibles «Formulari d’inscripció», «Reserva» i «Editar fitxa». En cada pantalla inclou una explicació breu del que permet provar. Executa `dart format lib` i `flutter analyze`.

Prova dades buides, valors incorrectes i valors vàlids. Revisa també la càrrega des de codi, el reinici i l’edició posterior al guardat: cada acció ha de deixar coherents els camps, les dades del ViewModel i el resultat visible.
