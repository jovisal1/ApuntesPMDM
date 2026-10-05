---
title: "Instalar la SDK de Android"
sidebar:
  label: "Instalar la SDK de Android"
  order: 2
---

En Flutter, es necesario instalar el SDK de Android cuando se desea desarrollar aplicaciones para dispositivos con este sistema operativo. El SDK de Android proporciona las herramientas necesarias para compilar, depurar y ejecutar aplicaciones en dispositivos o emuladores Android. Aunque Flutter es multiplataforma, las herramientas específicas de Android, como el SDK, ADB (Android Debug Bridge) y los emuladores, son indispensables para probar y desplegar aplicaciones en este sistema operativo.&#x20;

Dependiendo de si ya dispones de una instalación previa de [**Android Studio** ](https://developer.android.com/studio?hl=es-419)o necesitas realizar una nueva instalación, deberás seguir un procedimiento diferente. En caso de realizar una instalación desde cero en Linux, será necesario **descargar y descomprimir el paquete de Android Studio en una ubicación adecuada del sistema**, desde donde podremos ejecutar posteriormente el IDE. A continuación, se detallan los pasos que debemos seguir en cada caso.


### No dispongo de Android Studio

Descarga e Instala Android Studio teniendo en cuenta:

* &#x20;Seleccionar tipo de instalación **Standard**

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F36X3FIxyGqVthHgBSBge%2Fksnip_20240912-133709.png?alt=media&amp;token=5ab8ecdc-b69c-4a05-8cd6-a73082bfcc96" alt=""><figcaption></figcaption></figure>

* Pulsar *Siguiente* hasta llegar a la pantalla de Términos y condiciones. Seleccionar **Aceptar** y pulsar *Siguiente*.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2Fh2mRJi9dBeF92iicSO0e%2Fksnip_20240912-133902.png?alt=media&amp;token=8aa3977f-0f5e-4d99-b131-2362df4f3632" alt=""><figcaption></figcaption></figure>

* Seguir con el resto de pasos hasta finalizar la instalación

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FMrXDTy7e2XkMAM3tcF1n%2Fksnip_20240912-134059.png?alt=media&amp;token=e0b312c5-9e81-4c07-b67a-d3df5baf6bdf" alt=""><figcaption></figcaption></figure>

Tras realizar estos pasos se mostrará el diálogo de bienvenida de Android Studio. Desde aquí accederemos al **SDKManager**

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FX4uAEkiidIqDIMoGbHng%2Fksnip_20240912-134416.png?alt=media&amp;token=d47f8376-b0e3-4c56-a665-d4573d99351c" alt=""><figcaption></figcaption></figure>

Una vez dentro de la pantalla de bienvenida, accede al **SDKManager, instala** los siguientes **componentes**:

* Android SDK Platform, API 35.0.1 (Pestaña SDK Platfroms)

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FH2lMJ6YXWS2UWUmvLt8t%2Fksnip_20240912-134618.png?alt=media&amp;token=fb233b22-7f93-4147-9c33-e7c69c55cf61" alt=""><figcaption></figcaption></figure>

* Android SDK Command-line Tools (Pestaña SDK Tools)
* Android SDK Build-Tools (Pestaña SDK Tools)
* Android SDK Platform-Tools (Pestaña SDK Tools)
* Android Emulator (Pestaña SDK Tools)

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FOGswxoKemIKpCr0N7iII%2Fksnip_20240912-134650.png?alt=media&amp;token=3c5702c6-5cdb-4c9e-98a7-7c55e7bb7531" alt=""><figcaption></figcaption></figure>


### Dispongo de Android Studio

Sigue los siguientes pasos:

* Inicia Android Studio.
* Ve al diálogo de Configuración para ver el **Administrador de SDK**
  * Si tienes un proyecto previo abierto lo encontrarás en la opción de menú Herramientas -> Administrador de SDK.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FCVM97LyBxXcEFez33CE8%2Fimage.png?alt=media&amp;token=f456cf2b-8439-4c55-9e14-e9cf1a5ba8da" alt="" width="153"><figcaption></figcaption></figure>

* Si aparece el diálogo de bienvenida de Android Studio, haz clic en el icono de Más opciones que aparece junto al botón Abrir y selecciona Administrador de SDK en el menú desplegable.
* Haz clic en **SDK Platforms**.
* Verifica que **Android API 35.0.1** esté seleccionado (si la columna Estado muestra "Actualización disponible" o "No instalado", selecciona Android API 35.0.1 y haz clic en Aplicar).

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FH2lMJ6YXWS2UWUmvLt8t%2Fksnip_20240912-134618.png?alt=media&amp;token=fb233b22-7f93-4147-9c33-e7c69c55cf61" alt=""><figcaption></figcaption></figure>

* Después de instalar el último SDK, es posible que la columna Estado muestre "Actualización disponible". Esto significa que algunas imágenes del sistema adicionales pueden no estar instaladas. Puedes ignorar esto y continuar.
* Haz clic en **SDK Tools**.

**Verifica** que las siguientes **herramientas** de SDK estén seleccionadas:

1. Android SDK Command-line Tools
2. Android SDK Build-Tools
3. Android SDK Platform-Tools
4. Android Emulator

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FOGswxoKemIKpCr0N7iII%2Fksnip_20240912-134650.png?alt=media&amp;token=3c5702c6-5cdb-4c9e-98a7-7c55e7bb7531" alt=""><figcaption></figcaption></figure>

Si la columna Estado de alguna de las herramientas mencionadas muestra "Actualización disponible" o "No instalado", selecciona las herramientas necesarias y haz clic en Aplicar.



#### Emuladores

Antes de finalizar la configuración de Android Studio, comprobaremos que disponemos de un **dispositivo virtual** en el que podremos ejecutar y probar nuestras aplicaciones sin necesidad de utilizar un dispositivo físico.

Para ello, desde la pantalla principal de Android Studio podemos acceder al **Virtual Device Manager** a través de la opción **More Actions**. Desde este apartado podremos consultar y gestionar los dispositivos virtuales disponibles en nuestro sistema.

Durante la instalación de Android Studio es posible que se haya creado automáticamente un **dispositivo virtual de Android (AVD)**. En caso contrario, podremos crear uno manualmente seleccionando el modelo de dispositivo y la versión de Android que deseemos utilizar.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2Fi2zU8L9ypWblzDAQC8uH%2Femuladores_1.png?alt=media&amp;token=cbc63912-8baa-4e7f-b510-315ae9d8992e" alt=""><figcaption></figcaption></figure>

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FIjunOJsWTU2coCNt7dbx%2Femuladores_2.png?alt=media&amp;token=6c4f1e7b-476b-447b-896b-525f509bd5ab" alt=""><figcaption></figcaption></figure>
