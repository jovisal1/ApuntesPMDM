---
title: "Primer proyecto"
sidebar:
  label: "Primer proyecto"
  order: 2
---

Ahora que ya tenemos un entorno preparado. Empecemos por implementar una aplicación muy sencilla en Dart utilizando VSCode.

## Creación de un proyecto

Empezaremos creando un proyecto Dart utilizando el asistente de VSCode. Si pulsamos **`CTRL + MAYUS + P`** nos aparecerá un listado en el que seleccionaremos la opción **Dart: New Project**.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FSaQ6fFunJcDthbs7a8vm%2Fimage.png?alt=media&amp;token=14ee3706-36ba-4b79-8dbc-95f88391161e" alt="" width="563"><figcaption></figcaption></figure>

A continuación, deberemos seleccionar el tipo de aplicación a crear. En nuestro caso una **aplicación de  consola** será suficiente.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FuW0rRWarHaqVa0CmGaUV%2Fimage.png?alt=media&amp;token=6ec9d157-e2fd-4ea5-87f1-2b43d46cdab7" alt="" width="563"><figcaption></figcaption></figure>

El siguiente paso consistirá en seleccionar el directorio en donde queremos que se cree el contenido inicial de nuestro proyecto.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FRkF6fmnk3dmJxNbQS19y%2Fimage.png?alt=media&amp;token=0b0ef5c6-80e6-4938-bad1-2cd1b7e3458c" alt="" width="563"><figcaption></figcaption></figure>

Y por último, especificamos el nombre de la aplicación a generar.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FgaDiQQBqmgFOORH3dtVD%2Fimage.png?alt=media&amp;token=84c3c19a-d9e0-4dab-9189-a033a3d36168" alt="" width="563"><figcaption></figcaption></figure>

Ahora ya deberíamos disponer de un proyecto Dart en nuestro VSCode con un aspecto similar al siguiente:

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FIpiIxPKAm5bbOfPoELG3%2Fimage.png?alt=media&amp;token=4e68037b-f0d8-4814-9ed8-f53edd90e43d" alt="" width="563"><figcaption></figcaption></figure>

Entre los diferentes elementos que se han creado existen tres carpetas que nos interesan:

* **bin**: contiene el fichero ejecutable del proyecto. En nuestro caso *dart\_application\_2.dart* que incluye el **método main** que es el **punto de entrada de nuestro programa**.
* **lib**: en la que se incluyen ficheros .dart con implementaciones extra. En nuestro caso contiene otro fichero  *dart\_application\_2.dart* con la función `calculate` que se invoca desde el método **main**.&#x20;
* **test**: que incluye un pequeño test (*dart\_application\_2\_test.dart*) que verifica que el resultado de ejecutar la función `calculate` es el correcto.

## Ejecución

Para ejecutar el proyecto que acabamos de generar tenemos dos opciones:

* Hacer click en el botón de ejecutar que se encuentra en la parte superior derecha de VSCode&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FmslbhsdyF451Y1ty2eWn%2Fimage.png?alt=media&amp;token=9de1f4aa-bf41-40eb-8de1-945bc5465cb9" alt="" width="563"><figcaption></figcaption></figure>

* Dirigirnos a la sección de *Run and Debug* de la parte izquierda y ejecutar el botón de Run and Debug

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F2Ip7v6M9JDRXUpSI4NM1%2Fimage.png?alt=media&amp;token=b77f802f-eeed-4071-b320-ab3f4ed7fa73" alt="" width="563"><figcaption></figcaption></figure>

Si nos fijamos, en la pestaña de la consola de depuración se nos mostrará un mensaje que mostrará el texto ***Hello world: + valor numérico***.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FrWdAh2ltGsi44VdoUvUY%2Fimage.png?alt=media&amp;token=6bfdde7b-3806-42a7-9c34-1e13fc7bd4cc" alt="" width="563"><figcaption></figcaption></figure>

:::note

También podemos ejecutar un fichero .dart de forma manual. Simplemente abrimos una consola, nos dirigimos al directorio en el que se encuentra el fichero en cuestión y ejecutamos:

```bash
dart nombre_del_fichero.dart
```


:::
