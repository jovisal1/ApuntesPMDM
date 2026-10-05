---
title: "Primer projecte"
sidebar:
  label: "Primer projecte"
  order: 2
---

Ara que ja tenim un entorn preparat. Comencem per implementar una aplicació molt senzilla en Dart utilitzant VSCode.

## Creació d'un projecte

Començarem creant un projecte Dart utilitzant l'assistent de VSCode. Si premem **`CTRL + MAYUS + P`** ens apareixerà un llistat en el qual seleccionarem l'opció **Dart: New Project**.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FSaQ6fFunJcDthbs7a8vm%2Fimage.png?alt=media&amp;token=14ee3706-36ba-4b79-8dbc-95f88391161e" alt="" width="563"><figcaption></figcaption></figure>

A continuació, haurem de seleccionar el tipus d'aplicació a crear. En el nostre cas una **aplicació de  consola** serà suficient.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FuW0rRWarHaqVa0CmGaUV%2Fimage.png?alt=media&amp;token=6ec9d157-e2fd-4ea5-87f1-2b43d46cdab7" alt="" width="563"><figcaption></figcaption></figure>

El següent pas consistirà a seleccionar el directori on volem que es cree el contingut inicial del nostre projecte.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FRkF6fmnk3dmJxNbQS19y%2Fimage.png?alt=media&amp;token=0b0ef5c6-80e6-4938-bad1-2cd1b7e3458c" alt="" width="563"><figcaption></figcaption></figure>

I finalment, especifiquem el nom de l'aplicació a generar.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FgaDiQQBqmgFOORH3dtVD%2Fimage.png?alt=media&amp;token=84c3c19a-d9e0-4dab-9189-a033a3d36168" alt="" width="563"><figcaption></figcaption></figure>

Ara ja hauríem de disposar d'un projecte Dart en el nostre VSCode amb un aspecte similar al següent:

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FIpiIxPKAm5bbOfPoELG3%2Fimage.png?alt=media&amp;token=4e68037b-f0d8-4814-9ed8-f53edd90e43d" alt="" width="563"><figcaption></figcaption></figure>

Entre els diferents elements que s'han creat existeixen tres carpetes que ens interessen:

* **bin**: conté el fitxer executable del projecte. En el nostre cas *dart\_application\_2.dart* que inclou el **mètode main** que és el **punt d'entrada del nostre programa**.
* **lib**: en la qual s'inclouen fitxers `.dart` amb implementacions extra. En el nostre cas conté un altre fitxer  *dart\_application\_2.dart* amb la funció `calculate` que s'invoca des del mètode **main**.&#x20;
* **test**: que inclou un xicotet test (*dart\_application\_2\_test.dart*) que verifica que el resultat d'executar la funció `calculate` és el correcte.

## Execució

Per a executar el projecte que acabem de generar tenim dues opcions:

* Fer clic en el botó d'executar que es troba en la part superior dreta de VSCode&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FmslbhsdyF451Y1ty2eWn%2Fimage.png?alt=media&amp;token=9de1f4aa-bf41-40eb-8de1-945bc5465cb9" alt="" width="563"><figcaption></figcaption></figure>

* Dirigir-nos a la secció de *Run and Debug* de la part esquerra i executar el botó de Run and Debug

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F2Ip7v6M9JDRXUpSI4NM1%2Fimage.png?alt=media&amp;token=b77f802f-eeed-4071-b320-ab3f4ed7fa73" alt="" width="563"><figcaption></figcaption></figure>

Si ens fixem, en la pestanya de la consola de depuració se'ns mostrarà un missatge que mostrarà el text ***Hello world: + valor numèric***.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FrWdAh2ltGsi44VdoUvUY%2Fimage.png?alt=media&amp;token=6bfdde7b-3806-42a7-9c34-1e13fc7bd4cc" alt="" width="563"><figcaption></figcaption></figure>

:::note

També podem executar un fitxer .dart de manera manual. Simplement obrim una consola, ens dirigim al directori en el qual es troba el fitxer en qüestió i executem:

```bash
dart nombre_del_fichero.dart
```


:::
