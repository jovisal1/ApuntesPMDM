---
title: "Configuració de VSCode"
sidebar:
  label: "Configuració de VSCode"
  order: 4
---

Per a implementar els nostres desenvolupaments en Flutter utilitzarem VSCode però necessitarem afegir una sèrie de plugins i canvis en la configuració perquè la nostra experiència de desenvolupament siga la més òptima.

* [**Flutter**](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter), que implementa el suport per a edició, refactorització, execució i recàrrega en calent (*hot reload*) d'aplicacions desenvolupades en Flutter.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FALG5nzMDSQ05PJprAA7i%2Fimage.png?alt=media&amp;token=57752b44-8950-4762-a70f-ee4ef792c1e7" alt="" width="374"><figcaption></figcaption></figure>

* [**Dart**](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code), que ofereix suport per al llenguatge Dart en VSCode, amb eines per a l'edició, depuració i ressaltat de sintaxi del llenguatge. Este plugin és una dependència directa del plugin de Flutter.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FnFtmKIlxVglpPDPBFlkz%2Fimage.png?alt=media&amp;token=c2350ef4-afb1-47b1-8ee1-cbbb6e3433a9" alt="" width="367"><figcaption></figcaption></figure>

Encara que estos són els plugins necessaris per al desenvolupament amb Flutter, existeixen uns altres que poden ser útils, com:

* [**Pubspec Assist**](https://marketplace.visualstudio.com/items?itemName=jeroen-meijer.pubspec-assist): facilita la incorporació de dependències en l'arxiu de configuració del projecte.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FD3vZ90Wyq0X51SdRXduc%2Fimage.png?alt=media&amp;token=4223c1e8-517b-4ea3-91bf-834f0f69079d" alt="" width="371"><figcaption></figcaption></figure>

* [**Awesome Flutter Snippets**](https://marketplace.visualstudio.com/items?itemName=Nash.awesome-flutter-snippets): els *snippets* són fragments de codi comú que serveixen com a plantilles. Esta extensió proporciona un conjunt més ampli de *snippets*, incloses plantilles de classes i mètodes, que permeten un desenvolupament més ràpid i eficient en crear components.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F2VvbZ73Gc3ER8mZTX4tU%2Fimage.png?alt=media&amp;token=0e64c31a-8db2-4c47-b68b-87a39726ef20" alt="" width="375"><figcaption></figcaption></figure>

### Podem utilitzar Android Studio?

Sí. Encara que durant el curs utilitzarem **Visual Studio Code com a editor principal**, Flutter també disposa d'una bona integració amb **Android Studio**, per la qual cosa podem utilitzar-ho com a alternativa per a desenvolupar els nostres projectes.

Per a habilitar el suport per a Flutter haurem d'accedir a **Settings → Plugins** i instal·lar el plugin **Flutter**. Este requereix també el plugin de **Dart**, que proporciona a l'IDE les eines necessàries per a treballar amb este llenguatge.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F2RZfVJQi1QAWN8v8AObr%2Fandroid_studio.png?alt=media&amp;token=2611ff81-482d-49a8-8437-2a89cd2cdb2a" alt=""><figcaption></figcaption></figure>

Una vegada instal·lats, podrem **crear, executar i depurar projectes Flutter directament des d'Android Studio**.

Android Studio pot resultar especialment útil per la seua **integració amb l’SDK d'Android, els dispositius virtuals i l'emulador**. A més, en ser l'IDE oficial per al desenvolupament Android, podrem recórrer a ell quan necessitem treballar amb la **part nativa d'un projecte Flutter**, modificar configuracions específiques d'Android o integrar funcionalitats pròpies d'esta plataforma.
