---
title: "Configuración de VSCode"
sidebar:
  label: "Configuración de VSCode"
  order: 4
---

Para implementar nuestros desarrollos en Flutter utilizaremos VSCode pero necesitaremos añadir una serie de plugins y cambios en la configuración para que nuestra experiencia de desarrollo sea la más óptima.

* [**Flutter**](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter), que implementa el soporte para edición, refactoritzación, ejecución y recarga en caliente (*hot reload*) de aplicaciones desarrolladas en Flutter.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FALG5nzMDSQ05PJprAA7i%2Fimage.png?alt=media&amp;token=57752b44-8950-4762-a70f-ee4ef792c1e7" alt="" width="374"><figcaption></figcaption></figure>

* [**Dart**](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code), que ofrece soporte para el lenguaje Dart en VSCode, con herramientas para la edición, depuración y resaltado de sintaxis del lenguaje. Este plugin es una dependencia directa del plugin de Flutter.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FnFtmKIlxVglpPDPBFlkz%2Fimage.png?alt=media&amp;token=c2350ef4-afb1-47b1-8ee1-cbbb6e3433a9" alt="" width="367"><figcaption></figcaption></figure>

Aunque estos son los plugins necesarios para el desarrollo con Flutter, existen otros que pueden ser útiles, como:

* [**Pubspec Assist**](https://marketplace.visualstudio.com/items?itemName=jeroen-meijer.pubspec-assist): facilita la incorporación de dependencias en el archivo de configuración del proyecto.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FD3vZ90Wyq0X51SdRXduc%2Fimage.png?alt=media&amp;token=4223c1e8-517b-4ea3-91bf-834f0f69079d" alt="" width="371"><figcaption></figcaption></figure>

* [**Awesome Flutter Snippets**](https://marketplace.visualstudio.com/items?itemName=Nash.awesome-flutter-snippets): los *snippets* son fragmentos de código común que sirven como plantillas. Esta extensión proporciona un conjunto más amplio de *snippets*, incluidos plantillas de clases y métodos, que permiten un desarrollo más rápido y eficiente al crear componentes.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F2VvbZ73Gc3ER8mZTX4tU%2Fimage.png?alt=media&amp;token=0e64c31a-8db2-4c47-b68b-87a39726ef20" alt="" width="375"><figcaption></figcaption></figure>

### ¿Podemos utilizar Android Studio?

Sí. Aunque durante el curso utilizaremos **Visual Studio Code como editor principal**, Flutter también dispone de una buena integración con **Android Studio**, por lo que podemos utilizarlo como alternativa para desarrollar nuestros proyectos.

Para habilitar el soporte para Flutter tendremos que acceder a **Settings → Plugins** e instalar el plugin **Flutter**. Este requiere también el plugin de **Dart**, que proporciona al IDE las herramientas necesarias para trabajar con este lenguaje.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F2RZfVJQi1QAWN8v8AObr%2Fandroid_studio.png?alt=media&amp;token=2611ff81-482d-49a8-8437-2a89cd2cdb2a" alt=""><figcaption></figcaption></figure>

Una vez instalados, podremos **crear, ejecutar y depurar proyectos Flutter directamente desde Android Studio**.

Android Studio puede resultar especialmente útil por su **integración con el SDK de Android, los dispositivos virtuales y el emulador**. Además, al ser el IDE oficial para el desarrollo Android, podremos recurrir a él cuando necesitemos trabajar con la **parte nativa de un proyecto Flutter**, modificar configuraciones específicas de Android o integrar funcionalidades propias de esta plataforma.
