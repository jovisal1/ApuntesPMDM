---
title: "Emulador Genymotion"
sidebar:
  label: "Emulador Genymotion"
  order: 5
---

Per a provar les nostres aplicacions Android no és imprescindible disposar d'un dispositiu físic. A més dels emuladors inclosos en Android Studio, existeixen altres solucions que ens permeten **crear i executar dispositius Android virtuals** amb diferents característiques.

Una de les més conegudes és [**Genymotion**](https://docs.genymotion.com/desktop/), una plataforma de virtualització orientada al desenvolupament i les proves d'aplicacions Android. Mitjançant Genymotion podem disposar de dispositius virtuals amb **diferents versions d'Android, grandàries i resolucions de pantalla i configuracions de maquinari**, la qual cosa facilita comprovar el funcionament de les nostres aplicacions en diferents escenaris.

Genymotion disposa de diferents solucions en funció de **on i com vulguem executar els dispositius virtuals**:

1. **Device Image**: Dispositius virtuals en el núvol sota demanda.
2. **SaaS**: Facilita proves en el cicle de desenvolupament amb funcions col·laboratives.
3. **Genymotion Desktop**: Un emulador per a Android amb sensors avançats, compatible amb VirtualBox i Qemu.

En el nostre cas utilitzarem **Genymotion Desktop**. Si seguim el procés d'instal·lació que es descriu en la seua documentació oficial, esta es compon dels següents passos:

## Obtindre l'instal·lable

Per a això serà necessari accedir al següent [enllaç](https://www-v1.genymotion.com/account/create/) i completar tota la informació que se'ns sol·licite.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2Fc8fxS0I25QoJp5fCXY2d%2Fksnip_20240912-125633.png?alt=media&amp;token=74d52f51-2489-4aff-ba66-dac1a6a5ed89" alt="" width="563"><figcaption></figcaption></figure>

Una vegada registrats, podrem accedir a la web a través de la pàgina de [login](https://www-v1.genymotion.com/account/login/). Una vegada fet el login, tindrem disponible una secció de descàrregues des d'on podrem obtindre l'instal·lable de Genymotion Desktop.

## Instal·lació

Ara que ja tenim instal·lat Genymotion Desktop, procedirem a executar-lo. Per ser la primera vegada que executem l'aplicació, se'ns guiarà a través d'una sèrie de passos. En primer lloc, haurem de **introduir** **les nostres credencials** i prémer *Següent*.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FwGfiuNWQVi1v5MOKSoXu%2FFirst_time_opening.png?alt=media&amp;token=9d57330f-31f4-403c-abb9-165a7596de34" alt="" width="563"><figcaption></figcaption></figure>

Tot seguit, especificarem que l’**ús** serà **personal**.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FtY3YjAnDidcvldQ2aEyk%2Fimage.png?alt=media&amp;token=fbcd9bdb-b00f-4ad9-95b3-eed8ef80d804" alt="" width="553"><figcaption></figcaption></figure>

Acceptarem les condicions d'ús i premerem Següent. Si tot ha funcionat correctament, hauríem de poder veure la pantalla principal de Genymotion.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FWMAPl3ltnzNJ1V3Xyn2T%2FEULA.png?alt=media&amp;token=ed97636e-f165-411f-87c0-9b71a7f99d16" alt="" width="563"><figcaption></figcaption></figure>

## Creació d’un nou dispositiu

Per a crear un nou dispositiu, fem clic en el botó “+” situat en la part superior dreta.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FuuPKzjPLREHKnjxWetys%2Fimage.png?alt=media&amp;token=3891972b-5e12-411d-ae23-0367bfd9cde0" alt="" width="563"><figcaption></figcaption></figure>

Apareixerà una nova finestra on podrem triar entre diversos dispositius. Cadascun es mostra en una fila juntament amb informació sobre el tipus (mòbil, tauleta), el nom, la grandària de la pantalla, la resolució, la densitat i la font.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2Fffgrne0SweMsXghcTick%2Fimage.png?alt=media&amp;token=cbd2c3e1-73f1-4b49-9b1d-844206f215e9" alt="" width="563"><figcaption></figcaption></figure>

Ara tenim dues opcions, seleccionar un registre i fer clic en el botó de *Següent* o fer doble clic en qualsevol dels registres. En tots dos casos s'iniciarà el procés de creació d'un emulador del dispositiu seleccionat on podrem modificar alguna de les seues propietats si així ho desitgem. &#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F2OG1fpZCPxFNd3H2YGha%2Fimage.png?alt=media&amp;token=b7abd9bf-d288-48d2-abd9-31c7df1564b2" alt="" width="563"><figcaption></figcaption></figure>

Una vegada hàgem configurat tots els paràmetres del nostre dispositiu, premerem *Següent* per a iniciar la creació. Una vegada el procés finalitze, es mostrarà el nou dispositiu en el llistat de la pantalla inicial de genymotion.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FjTU2vOStbVfTtwoYdEB1%2Fimage.png?alt=media&amp;token=cf2cfd9a-6fc4-4959-94c2-b034a1a6dd5d" alt="" width="563"><figcaption></figcaption></figure>

## Executar un dispositiu

Per a poder executar un dispositiu del llistat simplement haurem de prémer el seu botó de play o fer doble clic sobre el registre.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FBEw4OWg0wzY1hSKs2Qek%2Fimage.png?alt=media&amp;token=e45d5434-1445-433a-bb76-f13179b5693a" alt="" width="375"><figcaption></figcaption></figure>
