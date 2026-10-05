---
title: "Emulador Genymotion"
sidebar:
  label: "Emulador Genymotion"
  order: 5
---

Para probar nuestras aplicaciones Android no es imprescindible disponer de un dispositivo físico. Además de los emuladores incluidos en Android Studio, existen otras soluciones que nos permiten **crear y ejecutar dispositivos Android virtuales** con diferentes características.

Una de las más conocidas es [**Genymotion**](https://docs.genymotion.com/desktop/), una plataforma de virtualización orientada al desarrollo y las pruebas de aplicaciones Android. Mediante Genymotion podemos disponer de dispositivos virtuales con **diferentes versiones de Android, tamaños y resoluciones de pantalla y configuraciones de hardware**, lo que facilita comprobar el funcionamiento de nuestras aplicaciones en distintos escenarios.

Genymotion dispone de diferentes soluciones en función de **dónde y cómo queramos ejecutar los dispositivos virtuales**:

1. **Device Image**: Dispositivos virtuales en la nube bajo demanda.
2. **SaaS**: Facilita pruebas en el ciclo de desarrollo con funciones colaborativas.
3. **Genymotion Desktop**: Un emulador para Android con sensores avanzados, compatible con VirtualBox y Qemu.

En nuestro caso vamos a utilizar **Genymotion Desktop**. Si seguimos el proceso de instalación que se describe en su documentación oficial, esta se compone de los siguientes pasos:

## Obtener el instalable

Para ello será necesario acceder al siguiente [enlace](https://www-v1.genymotion.com/account/create/) y completar toda la información que se nos solicite.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2Fc8fxS0I25QoJp5fCXY2d%2Fksnip_20240912-125633.png?alt=media&amp;token=74d52f51-2489-4aff-ba66-dac1a6a5ed89" alt="" width="563"><figcaption></figcaption></figure>

Una vez registrados, podremos acceder a la web a través de la página de [login](https://www-v1.genymotion.com/account/login/). Una vez hecho el login, tendremos disponible una sección de descargas desde donde podremos obtener el instalable de Genymotion Desktop.

## Instalación

Ahora que ya tenemos instalado Genymotion Desktop, procederemos a ejecutarlo. Por ser la primera vez que ejecutamos la aplicación, se nos guiará a través de una serie de pasos. En primer lugar, deberemos **introducir** **nuestras credenciales** y pulsar *Siguiente*.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FwGfiuNWQVi1v5MOKSoXu%2FFirst_time_opening.png?alt=media&amp;token=9d57330f-31f4-403c-abb9-165a7596de34" alt="" width="563"><figcaption></figcaption></figure>

Acto seguido, especificaremos que el **uso** será **personal**.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FtY3YjAnDidcvldQ2aEyk%2Fimage.png?alt=media&amp;token=fbcd9bdb-b00f-4ad9-95b3-eed8ef80d804" alt="" width="553"><figcaption></figcaption></figure>

Aceptaremos las condiciones de uso y pulsaremos Siguiente. Si todo ha funcionado correctamente, deberíamos poder ver la pantalla principal de Genymotion.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FWMAPl3ltnzNJ1V3Xyn2T%2FEULA.png?alt=media&amp;token=ed97636e-f165-411f-87c0-9b71a7f99d16" alt="" width="563"><figcaption></figcaption></figure>

## Creación un nuevo dispositivo

Para crear un nuevo dispositivo, hacemos clic en el botón “+” ubicado en la parte superior derecha.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FuuPKzjPLREHKnjxWetys%2Fimage.png?alt=media&amp;token=3891972b-5e12-411d-ae23-0367bfd9cde0" alt="" width="563"><figcaption></figcaption></figure>

Aparecerá una nueva ventana donde podremos elegir entre varios dispositivos. Cada uno se muestra en una fila junto con información sobre el tipo (móvil, tableta), el nombre, el tamaño de la pantalla, la resolución, la densidad y la fuente.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2Fffgrne0SweMsXghcTick%2Fimage.png?alt=media&amp;token=cbd2c3e1-73f1-4b49-9b1d-844206f215e9" alt="" width="563"><figcaption></figcaption></figure>

Ahora tenemos dos opciones, seleccionar un registro y hacer click en el botón de *Siguiente* o hacer doble click en cualquiera de los registros. En ambos casos se iniciará el proceso de creación de un emulador del dispositivo seleccionado donde podremos modifcar alguna de sus propiedades si así lo deseamos. &#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F2OG1fpZCPxFNd3H2YGha%2Fimage.png?alt=media&amp;token=b7abd9bf-d288-48d2-abd9-31c7df1564b2" alt="" width="563"><figcaption></figcaption></figure>

Una vez hayamos configurado todos los parámetros de nuestro dispositivo, pulsaremos *Siguiente* para iniciar la creación. Una vez el proceso finalice, se mostrará el nuevo dispositivo en el listado de la pantalla inicial de genymotion.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FjTU2vOStbVfTtwoYdEB1%2Fimage.png?alt=media&amp;token=cf2cfd9a-6fc4-4959-94c2-b034a1a6dd5d" alt="" width="563"><figcaption></figcaption></figure>

## Ejecutar un dispositivo

Para poder ejecutar un dispositivo del listado simplemente deberemos pulsar su botón de play o hacer doble click sobre el registro.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FBEw4OWg0wzY1hSKs2Qek%2Fimage.png?alt=media&amp;token=e45d5434-1445-433a-bb76-f13179b5693a" alt="" width="375"><figcaption></figcaption></figure>
