---
title: "Dispositivos físicos"
sidebar:
  label: "Dispositivos físicos"
  order: 6
---

Aunque los emuladores de Android, tanto el incluido con Android Studio como alternativas como Genymotion, son herramientas muy útiles durante el desarrollo, también es importante **probar nuestras aplicaciones en dispositivos reales**.

Un dispositivo físico nos permite comprobar cómo se comporta realmente la aplicación y detectar problemas que pueden no aparecer durante la emulación.

Entre sus principales ventajas encontramos:

* **Rendimiento real**, ya que la aplicación se ejecuta directamente sobre el hardware del dispositivo, sin la sobrecarga asociada a la virtualización.
* **Acceso real al hardware**, como la cámara, GPS, sensores, Bluetooth o gestos multitáctiles.
* **Pruebas en condiciones reales**, incluyendo aspectos como el rendimiento gráfico, las notificaciones o el comportamiento en diferentes versiones de Android.
* **Ausencia de problemas asociados a la virtualización**, como incompatibilidades con determinados procesadores, controladores gráficos o sistemas de aceleración por hardware.
* **Depuración sobre dispositivos concretos**, especialmente útil para localizar errores que únicamente aparecen en determinados modelos o versiones de Android.

Por este motivo, durante el desarrollo es habitual **combinar emuladores y dispositivos físicos**: los primeros resultan especialmente cómodos para el trabajo diario, mientras que los dispositivos reales nos permiten verificar el comportamiento de la aplicación en un entorno real.

Para establecer la comunicación entre nuestro ordenador y un dispositivo Android utilizaremos [**ADB (*****Android Debug Bridge*****)**](https://developer.android.com/tools/adb?hl=es-419), una herramienta incluida en el SDK de Android que permite **detectar, controlar y comunicarse con dispositivos Android** desde nuestro equipo.

La herramienta `adb` forma parte de las **Android SDK Platform-Tools**, uno de los componentes que instalamos junto con el SDK de Android. Si el comando `adb` no está disponible directamente desde la terminal, tendremos que localizar el directorio `platform-tools` dentro de la instalación del SDK de Android y ejecutarlo desde allí. También podemos **añadir este directorio a la variable de entorno `PATH`**, lo que nos permitirá utilizar el comando `adb` desde cualquier ubicación de la terminal.

### Configuración del dispositivo Android

Android incorpora una serie de opciones destinadas al desarrollo y la depuración que, por motivos de seguridad, se encuentran ocultas de forma predeterminada.

#### Activar las opciones de desarrollador

El procedimiento puede variar ligeramente dependiendo del fabricante y de la versión de Android, pero generalmente tendremos que:

1. Acceder a **Ajustes** en nuestro dispositivo.
2. Entrar en **Acerca del teléfono** o **Información del teléfono**.
3. Localizar la opción **Número de compilación**.
4. Pulsar **siete veces consecutivas** sobre esta opción. Una vez hecho esto, Android nos indicará que se han habilitado las opciones para desarrolladores. A partir de este momento aparecerá una nueva sección denominada **Opciones de desarrollador** dentro de los ajustes del sistema.

:::note

La ubicación y el nombre exacto de estas opciones pueden variar dependiendo del fabricante y de la versión de Android instalada.

:::

#### Activar la depuración USB

Si vamos a conectar el dispositivo mediante cable, dentro de **Opciones de desarrollador** tendremos que localizar y activar:

**Depuración USB**

Esta opción permite que nuestro dispositivo acepte conexiones ADB procedentes del ordenador.

### Conexión mediante cable USB

La conexión mediante **USB** es generalmente la forma más sencilla y estable de trabajar con un dispositivo físico.

Para establecerla:

1. Conectamos el dispositivo Android al ordenador mediante un **cable USB que permita transferencia de datos**.
2. Android mostrará un mensaje solicitando autorización para permitir la depuración USB desde ese ordenador.
3. Aceptamos la autorización. Si se trata de nuestro equipo habitual, podemos seleccionar también **Permitir siempre desde este ordenador**.

Una vez conectado, podemos comprobar que ADB reconoce correctamente el dispositivo:

```bash
adb devices
```

Si la conexión se ha establecido correctamente, obtendremos una salida similar a:

```
List of devices attached
10HF8ACCUX000F9    device
```

El identificador de la izquierda corresponde al dispositivo y el estado `device` indica que está correctamente conectado y autorizado.

#### Comprobar el dispositivo desde Flutter

Que ADB reconozca el dispositivo significa que Android puede comunicarse correctamente con él. El siguiente paso será comprobar que **Flutter también lo detecta**.

Para ello ejecutamos:

```bash
flutter devices
```

Flutter mostrará todos los dispositivos compatibles disponibles en nuestro equipo. Por ejemplo:

```
Found 3 connected devices:
  V2420 (mobile)  • 10HF8ACCUX000F9 • android-arm64   • Android 16
  Linux (desktop) • linux           • linux-x64
  Chrome (web)    • chrome          • web-javascript
```

Como podemos observar, Flutter no muestra únicamente dispositivos Android. Dependiendo de nuestro entorno, también pueden aparecer otros destinos disponibles, como el sistema de escritorio o un navegador web.

#### Ejecutar nuestra aplicación

Una vez detectado el dispositivo, podremos ejecutar nuestro proyecto de la forma habitual:

```bash
flutter run
```

Si tenemos varios dispositivos disponibles, Flutter nos permitirá seleccionar en cuál queremos ejecutar la aplicación.

También podemos especificarlo directamente mediante su identificador:

```bash
flutter run -d <device_id>
```

donde `<device_id>` corresponde al identificador mostrado previamente por `flutter devices`.

#### ¿Qué ocurre si el dispositivo no aparece?

Si `adb devices` no muestra nuestro dispositivo, conviene comprobar:

* que la **depuración USB** está activada;
* que hemos aceptado la autorización de depuración en el dispositivo;
* que el cable USB utilizado **permite transferencia de datos** y no únicamente carga;
* que el modo de conexión USB del dispositivo permite la transferencia de datos;
* que el sistema operativo reconoce correctamente el dispositivo.

Si ADB detecta el dispositivo pero Flutter no lo muestra, podemos utilizar:

```bash
flutter doctor
```

para comprobar si existe algún problema con nuestra instalación o configuración del entorno Android.

### Conexión inalámbrica (ADB over Wi-Fi)

Android también permite establecer una conexión ADB **sin necesidad de mantener el dispositivo conectado mediante un cable USB**.

Esta posibilidad resulta especialmente cómoda cuando queremos probar continuamente una aplicación en un dispositivo real o realizar demostraciones en las que el cable puede resultar molesto.

En versiones modernas de Android podemos utilizar la funcionalidad de **depuración inalámbrica (*****Wireless debugging*****)**.

Para realizar la conexión, el ordenador y el dispositivo deberán encontrarse normalmente en la **misma red Wi-Fi**.

#### Emparejar el dispositivo desde Android Studio

Android Studio facilita considerablemente este proceso.

* Abrimos **Device Manager**.
* Seleccionamos la opción **Pair Devices Using Wi-Fi**.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F4tlibJemWNhG0ER5g9zp%2Fandroid_studio_2.png?alt=media&amp;token=d933e7c2-8aac-4b2b-9448-d00e896d2645" alt=""><figcaption></figcaption></figure>

* Android Studio nos permitirá realizar el emparejamiento mediante un **código QR** o utilizando un **código de emparejamiento**.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FR4dEjOIGQhP15ewRjCwj%2Fandroid_studio_3.png?alt=media&amp;token=c3454b03-7b03-41bf-ada3-f485dd5e78cd" alt=""><figcaption></figcaption></figure>

Si utilizamos el código QR, desde nuestro dispositivo Android accederemos a:

**Opciones de desarrollador → Depuración inalámbrica → Vincular dispositivo con código QR**

Escaneamos el código mostrado por Android Studio y autorizamos la conexión.

Una vez completado el proceso podemos comprobar nuevamente los dispositivos conectados:

```bash
adb devices
```

El dispositivo inalámbrico debería aparecer en la lista.

También podemos comprobarlo directamente desde Flutter:

```bash
flutter devices
```

Flutter identificará el dispositivo como una conexión inalámbrica y podremos ejecutar nuestra aplicación normalmente:

```bash
flutter run
```

#### Consideraciones sobre la conexión Wi-Fi

La conexión inalámbrica resulta muy cómoda, pero debemos tener en cuenta algunas diferencias respecto a USB:

* puede presentar una **latencia ligeramente superior**;
* su estabilidad depende de la calidad de la red;
* el ordenador y el dispositivo deben poder comunicarse a través de la red;
* determinadas redes públicas, educativas o empresariales pueden impedir la comunicación directa entre dispositivos;
* en determinadas situaciones puede ser necesario volver a realizar el emparejamiento.

Por ello, la conexión USB sigue siendo una buena opción cuando buscamos **máxima estabilidad**, mientras que la conexión inalámbrica resulta especialmente cómoda para el desarrollo cotidiano y las demostraciones.

### Mirroring del dispositivo

Una vez conectado un dispositivo físico mediante USB o Wi-Fi, podemos ir un paso más allá y **visualizar su pantalla directamente en nuestro ordenador e interactuar con ella**.

Esta técnica se conoce como ***screen mirroring*** y resulta especialmente útil para realizar demostraciones, explicar el funcionamiento de una aplicación o trabajar con el dispositivo sin tener que manipularlo constantemente.

Para ello utilizaremos **`scrcpy`**, una herramienta libre y multiplataforma que permite visualizar y controlar un dispositivo Android desde nuestro ordenador utilizando ADB.

Para utilizar `scrcpy` necesitaremos que:

* el dispositivo esté correctamente configurado para utilizar ADB;
* `adb devices` pueda detectar el dispositivo;
* exista una conexión mediante USB o depuración inalámbrica.

#### Descarga y ejecución de `scrcpy`

Podemos obtener `scrcpy` desde su[ página oficial ](https://scrcpy.org/download/)o utilizar alguno de los métodos de instalación disponibles para nuestro sistema operativo.

Una vez instalado o descomprimido, podremos ejecutarlo simplemente con:

```bash
scrcpy
```

Si tenemos un único dispositivo conectado, `scrcpy` abrirá una ventana mostrando automáticamente su pantalla.

Cuando tengamos varios dispositivos disponibles, podremos indicar cuál queremos utilizar mediante su identificador:

```bash
scrcpy -s <device_id>
```

Podemos consultar previamente estos identificadores mediante:

```bash
adb devices
```

#### Algunas opciones útiles de `scrcpy`

`scrcpy` dispone de numerosas opciones que permiten adaptar su comportamiento. Algunas de las que pueden resultarnos útiles durante el desarrollo son:

| Comando                            | Descripción                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------------- |
| `scrcpy -h`                        | Muestra la ayuda y las opciones disponibles.                                       |
| `scrcpy --always-on-top`           | Mantiene la ventana del dispositivo por encima del resto.                          |
| `scrcpy --stay-awake`              | Evita que el dispositivo entre en reposo mientras está conectado.                  |
| `scrcpy --max-size 1024`           | Limita la resolución para reducir el consumo de recursos y mejorar el rendimiento. |
| `scrcpy --show-touches`            | Muestra visualmente las pulsaciones realizadas sobre la pantalla.                  |
| `scrcpy --record demo_flutter.mp4` | Graba la pantalla del dispositivo en un archivo de vídeo.                          |

Para nuestras clases, `scrcpy` será especialmente útil cuando queramos **ejecutar una aplicación Flutter en un dispositivo físico y mostrar simultáneamente su funcionamiento en la pantalla del ordenador**.
