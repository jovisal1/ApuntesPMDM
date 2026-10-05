---
title: "Instalar la SDK de Flutter"
sidebar:
  label: "Instalar la SDK de Flutter"
  order: 3
---

Para realizar la instalación de la SDK de Flutter, seguiremos las instrucciones que nos ofrece la [documentación oficial](https://docs.flutter.dev/install/quick).

:::note

Los pasos descritos a continuación se han realizado asumiendo que el sistema operativo sobre el que queremos instalar el SDK de Flutter es Linux.&#x20;

:::

### Obtener la SDK

Simplemente seleccionamos el sistema operativo donde queremos realizar la instalación.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FUUj6BlXuMMuTNGB25PBD%2Fimage.png?alt=media&amp;token=3ab06645-1ef6-4a06-9a7c-d569069fa453" alt="" width="375"><figcaption><p><a href="https://docs.flutter.dev/get-started/install">https://docs.flutter.dev/get-started/install</a></p></figcaption></figure>

Como ya sabemos, Flutter nos permite desarrollar aplicaciones para distintos tipos de plataformas. En el siguiente paso, debemos elegir en cuál vamos a trabajar. En nuestro caso, elegiremos desarrollo móvil (Android). De esta elección dependerá qué partes de las herramientas de Flutter se configuran para ejecutar nuestra primera aplicación de Flutter. Por supuesto, podemos configurar plataformas adicionales más adelante.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FaW8Kd7pA2GxaNkAyImOc%2Fimage.png?alt=media&amp;token=2ae8e2f2-ead3-48b9-9a7e-836b66b1e698" alt="" width="375"><figcaption><p><a href="https://docs.flutter.dev/get-started/install/linux">https://docs.flutter.dev/get-started/install/linux</a></p></figcaption></figure>

Llegados a este punto, se nos mostrará un listado de los requisitos necesarios para una instalación correcta con el sistema operativo y la plataforma que hayamos seleccionado. Dentro de esta sección, nos dirigiremos al punto ["Install the Flutter SDK"](https://docs.flutter.dev/get-started/install/linux/android#install-the-flutter-sdk) en donde lo más sencillo será seguir los pasos para realizar la instalación de forma manual. Esto es, accediendo a la pestaña "Download and Install" y descargando el fichero (flutter\_linux\_3.24.1-stable.tar.xz).

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FZWINrS2mUkWUCzXfFzMB%2Fimage.png?alt=media&amp;token=83122212-38b9-440c-ae07-23bcda8cee34" alt="" width="375"><figcaption></figcaption></figure>

### Descomprimir la SDK

Una vez descargado el fichero que contiene la SDK, debemos descomprimirlo. En nuestro caso vamos a realizar la instalación dentro de un **directorio** de nuestro home denominado **development**. Por este motivo, **será necesario que** previamente **exista**.&#x20;

```bash
mkdir ~/development
```

A continuación, debemos descomprimir el fichero de flutter en el directorio que acabamos de crear. Por ejemplo, si la descarga se ha realizado en el directorio Descargas de nuestro home, en linux sería tan sencillo como ejecutar la siguiente instrucción:



```bash
tar -xf ~/Descargas/flutter_linux_3.24.1-stable.tar.xz -C ~/development/
```



Una vez ejecutado, el SDK de Flutter debería estar en el directorio `~/development/flutter`.

### Configuración del PATH

Una vez descomprimido, debemos actualizar el PATH para que nuestro equipo pueda encontrar fácilmente los ejecutables de Flutter.

En Windows, esto se hace a través de las variables de entorno. Comprobamos que exista la variable PATH y le añadimos el directorio `flutter/bin` o el que corresponda según la instalación que hayamos realizado.

En Linux, necesitamos añadir esta variable al PATH mediante la línea de comandos. Para hacerlo, escribiremos en la terminal:

```bash
export PATH="$HOME/development/flutter/bin:$PATH"
```

Este comando solo establece el PATH en la terminal actual. Para que la actualización del PATH sea permanente, debemos incluirla en nuestro perfil, modificando el archivo `~/.profile` en nuestra carpeta personal y añadiendo el siguiente código al final:

```bash
# Añadir Flutter al PATH
FLUTTER_HOME="$HOME/development/flutter"
if [ -d $FLUTTER_HOME/bin ] ; then
    PATH=$FLUTTER_HOME/bin:$PATH
fi
```

De esta manera, la carpeta de Flutter se añadirá al PATH cada vez que inicies sesión. Si no quieres cerrar la sesión para cargar el perfil, puedes hacerlo con el comando `source ~/.profile`.

Si todo ha salido bien, tendrás disponible el comando tanto el comando `dart` como el comando `flutter` desde cualquier directorio de tu equipo. Ambos te permitirán acceder a su CLI.

### CLI de Dart

[Dart CL](https://dart.dev/tools/dart-tool)[I](https://dart.dev/tools/dart-tool) (Command Line Interface) es una herramienta de línea de comandos para gestionar aplicaciones y paquetes escritos en Dart. Sus principales opciones incluyen:

* `dart create <project_name>`: Crea un nuevo proyecto Dart.
* `dart run`: Ejecuta una aplicación Dart.
* `dart format`: Formatea el código fuente según los estándares de estilo.
* `dart analyze`: Analiza el código en busca de errores o advertencias.
* `dart compile:`permite compilar código Dart a distintos formatos ejecutables. Las principales opciones de compilación son:
  * **`dart compile exe`**: Compila el archivo Dart en un ejecutable nativo. Funciona en sistemas como Linux, macOS y Windows, sin necesidad de una máquina virtual (VM) para ejecutarlo.
  * **`dart compile js`**: Transpila el código Dart a JavaScript, útil para aplicaciones web.
  * **`dart compile jit-snapshot`**: Genera un "snapshot" que puede ser ejecutado usando la VM de Dart, acelerando la ejecución inicial.
  * **`dart compile aot-snapshot`**: Crea un snapshot en modo Ahead-of-Time (AOT), lo que mejora el rendimiento en aplicaciones en producción.

### CLI de Flutter

De forma similar, el [**Flutter CLI**](https://docs.flutter.dev/reference/flutter-cli) es la herramienta de línea de comandos que permite gestionar proyectos y realizar diversas tareas relacionadas con el desarrollo de aplicaciones Flutter. Algunas de sus principales opciones son:

* **`flutter create <project_name>`**: Crea un nuevo proyecto Flutter.
* **`flutter run`**: Ejecuta la aplicación en un emulador o dispositivo conectado.
* **`flutter build`**: Compila la aplicación para diferentes plataformas (Android, iOS, web, etc.).
* **`flutter doctor`**: Diagnostica problemas en el entorno de desarrollo.
* **`flutter pub`**: Gestiona dependencias del proyecto.
* **`flutter clean:`**&#x65;limina los archivos generados en la carpeta `build/` de un proyecto. Esto incluye los archivos temporales, las compilaciones y las configuraciones previas que hayan sido creadas durante el proceso de desarrollo.

### Comprobar requisítos mínimos con Flutter Doctor

El siguiente paso será utilizar **`flutter doctor`** para realizar una comprobación de los requisitos de software de nuestro entorno. Este comando generará un informe en el que se mostrarán las dependencias que nos faltan por instalar y los pasos que debemos seguir para resolverlas.

Así pues, abrimos una consola y ejecutamos el siguiente comando:

```bash
flutter doctor
```

La primera vez que ejecutamos el anterior comando, se nos mostrará un mensaje de bienvenida y algunas advertencias. Acto seguido y tras realizar las instalaciones necesarias y comprobaciones pertinentes, el CLI de Flutter nos indicará qué requisitos satisface nuestro sistema y cuáles no. Deberemos conseguir que todos estén correctos para poder empezar a trabajar con Flutter.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F7T9Ncqjr26mYckUB6npp%2FCaptura_tasca_2.png?alt=media&amp;token=d35b4249-7e7c-484d-9cc8-7536c3983de2" alt=""><figcaption></figcaption></figure>

:::note

Un error bastante común es el que indica `"Unable to find bundled Java Version".` Una posible solución consiste en copiar el contenido del directorio jbr de vuestra instalación de AndroidStudio (en Windows suele estar en /Program\_Files/Android/AndroidStudio) en la carpeta jre.&#x20;

![](https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FShVErt02devcG5IJgXvV%2Fimage.png?alt=media\&token=51fefe2c-fda6-4671-9572-af62f94fc958)

Otro error que se suele producir es el relativo a Android toolchain. Este se produce porque necesitamos aceptar una serie de licencias de android. Para solventar este error debe bastar con ejecutar `flutter doctor --android-licenses`.

![](https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F9eXYnhGMf7T35haSxigm%2Fimage.png?alt=media\&token=9cf00623-d95a-41f2-8045-ab8485870347)

:::
