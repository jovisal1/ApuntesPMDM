---
title: "Introducción a Flutter"
sidebar:
  label: "Introducción"
  order: 1
---

El desarrollo de aplicaciones móviles es fundamental en el mundo actual ya que facilita la vida cotidiana al mejorar procesos y tareas que realizamos a diario. Estas aplicaciones nos permiten gestionar nuestras finanzas, organizar el trabajo, aprender o comunicarnos de forma sencilla e inmediata. Debido a su importancia, la asignatura de **Programación Multimedia y Dispositivos Móviles** se centra en enseñar lo necesario para ser capaces de diseñar y desarrollar aplicaciones que puedan funcionar en dispositivos móviles.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F3xUnXi4uVVuk35lr65s5%2FLogoAssignatura.jpg?alt=media&amp;token=f6427cd8-acf5-4037-801d-c676830b4788" alt="" width="375"><figcaption></figcaption></figure>

## Enfoques para el desarrollo multiplataforma

Con el objetivo de reducir el desarrollo específico para cada plataforma y, por tanto, los costes asociados, han aparecido diferentes soluciones para crear aplicaciones multiplataforma. Muchas de ellas tienen su origen en las tecnologías web.

Podemos distinguir diferentes aproximaciones:

* **Aplicaciones web responsivas**: aplicaciones desarrolladas con tecnologías web como HTML, CSS y JavaScript cuya interfaz se adapta al dispositivo en el que se visualizan mediante técnicas de diseño *responsive*. Se ejecutan directamente en el navegador, por lo que permiten mantener una única base de código. Sin embargo, su integración con el sistema operativo y el hardware del dispositivo es más limitada que en una aplicación nativa.
* **Aplicaciones híbridas**: son aplicaciones desarrolladas principalmente con tecnologías web que se ejecutan dentro de un componente nativo denominado *WebView*. Esto permite distribuirlas como aplicaciones convencionales y acceder a determinadas características del dispositivo, como la ubicación o el acelerómetro. Uno de los frameworks más conocidos para este tipo de desarrollo es **Ionic**, que puede utilizarse junto con tecnologías como Angular, React o Vue.
* **Aplicaciones web progresivas (PWA)**: siguen siendo aplicaciones web, pero incorporan tecnologías como los *Service Workers* que permiten aproximar su comportamiento al de una aplicación nativa. Entre otras características, pueden ofrecer funcionamiento sin conexión o con conectividad limitada, instalación en el dispositivo y notificaciones.

Aunque estas soluciones permiten reutilizar gran parte del código, siguen dependiendo en mayor o menor medida de tecnologías propias de la web.

Otra aproximación consiste en utilizar **frameworks multiplataforma** capaces de generar aplicaciones para diferentes sistemas operativos a partir de una misma base de código.

Entre las tecnologías más conocidas encontramos:

* **React Native** y **NativeScript**: utilizan JavaScript o TypeScript y permiten construir aplicaciones móviles mediante componentes proporcionados por el propio framework, evitando que toda la interfaz dependa de un *WebView*.
* **Flutter**: framework creado por Google que utiliza **Dart** como lenguaje de programación y permite desarrollar aplicaciones para Android, iOS, web y sistemas de escritorio a partir de una misma base de código.

## Flutter

[**Flutter**](https://flutter.dev/) es un kit de desarrollo de software (SDK) y un **framework** de código abierto **creado por Google** en 2017 para el desarrollo de aplicaciones multiplataforma con un único código base.&#x20;

Aunque su núcleo está desarrollado en C++, Flutter utiliza el lenguaje de programación **Dart**. Este es un **lenguaje moderno orientado a objetos** con una **sintaxis similar a la de JavaScript** lo que lo hace accesible para desarrolladores con experiencia en este lenguaje.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2Fd0CTDmDJAvB1d4HdYwCA%2Fimage.png?alt=media&amp;token=df776664-192c-4e62-b023-510c436001de" alt="" width="375"><figcaption></figcaption></figure>

Tal y como se define en su [blog oficial](https://dart.dev/), Dart se caracteriza por:

* **Accesible**: Dart ofrece un **sistema de tipos** estático y dinámico, soporte para **programación asincrónica** con *`async`* y *`await`*, y características propias de un lenguaje moderno como la posibilidad de realizar destructuraciones por medio de patrones o la prevención de errores derivados de asignar el valor null a variables.&#x20;
* **Que permite un desarrollo más fluido**: una de las características más importantes de Dart es el "**Hot Reload**" que permite que **cualquier cambio realizado en el código se refleje de inmediato** en la aplicación en ejecución, sin necesidad de reiniciarla completamente. Esto no solo agiliza el proceso de desarrollo, sino que también facilita una iteración más eficiente.
* **Portable y de rápida ejecución**: Dart dispone de **su propia SDK** en la que, entre otras opciones, ofrece la posibilidad de realizar compilación just-in-time (JIT) para desarrollo y ahead-of-time (AOT) para producción. Esto permite un rápido tiempo de ejecución y tiempos de arranque rápidos en las aplicaciones. Además, puede transformar el código fuente en código nativo para varios sistemas operativos, así como en código JavaScript para ejecutarse en navegadores web.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FZXFhRd0bt2iwbwokVhVh%2Fimage.png?alt=media&amp;token=fe256e21-32f4-47f9-a1c7-8c6685c54a32" alt=""><figcaption><p><a href="https://dart.dev/">https://dart.dev/</a></p></figcaption></figure>

Aunque Flutter ofrece muchas ventajas, no estamos trabajando en un entorno completamente nativo. Por ello, debemos considerar algunas **limitaciones**:

* Las nuevas funcionalidades de Android o iOS pueden tardar cierto tiempo en estar disponibles directamente desde Flutter o desde sus paquetes.
* Las aplicaciones pueden tener un tamaño superior al de aplicaciones nativas equivalentes, debido a los componentes necesarios para ejecutar Flutter.
* Aunque su rendimiento es muy elevado, determinadas aplicaciones con necesidades muy específicas de procesamiento, gráficos o integración con el sistema pueden beneficiarse del desarrollo nativo.

Cuando necesitamos acceder a una funcionalidad específica de una plataforma, Flutter permite **integrar código nativo**. De esta forma podemos mantener las ventajas del desarrollo multiplataforma y, al mismo tiempo, utilizar las APIs específicas de Android, iOS u otras plataformas cuando sea necesario.

### Arquitectura de Flutter

Para entender como funciona Flutter, necesitamos echar un vistazo a su arquitectura:

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FNA7DNuwz5jEBQUbGELzv%2Fimage.png?alt=media&amp;token=8ed82ded-53a1-46ea-9a23-dddba8d348bd" alt=""><figcaption></figcaption></figure>

Como podemos observar, esta se compone de tres partes principalmente:

* **Framework**: es la capa más accesible para los desarrolladores, escrita en Dart. Proporciona un conjunto de bibliotecas de widgets, herramientas de animación y gestión de estado para crear la interfaz de usuario.
* **Engine**: escrito en C++, el **motor** se encarga de renderizar gráficos, gestionar gestos y ejecutar el código Dart. Flutter utiliza **Impeller** como motor de renderizado moderno en las plataformas compatibles, manteniendo otros mecanismos de renderizado según la plataforma y configuración.
* **Embedder**: es el encargado de integrar Flutter con plataformas específicas, como Android, iOS, Windows, entre otros. Maneja interacciones con el sistema operativo, como eventos de teclado o ratón.

### Flutter en web y escritorio

Aunque Flutter nació principalmente orientado al desarrollo de aplicaciones móviles, actualmente permite desarrollar también para:

* **Web**
* **Windows**
* **macOS**
* **Linux**

Flutter adapta su funcionamiento a las características de cada plataforma, manteniendo el mismo modelo de programación y permitiendo reutilizar gran parte del código de la aplicación.
