---
title: "Dispositius físics"
sidebar:
  label: "Dispositius físics"
  order: 6
---

Encara que els emuladors d'Android, tant l'inclòs amb Android Studio com alternatives com Genymotion, són eines molt útils durant el desenvolupament, també és important **provar les nostres aplicacions en dispositius reals**.

Un dispositiu físic ens permet comprovar com es comporta realment l'aplicació i detectar problemes que poden no aparéixer durant l'emulació.

Entre els seus principals avantatges trobem:

* **Rendiment real**, ja que l'aplicació s'executa directament sobre el maquinari del dispositiu, sense la sobrecàrrega associada a la virtualització.
* **Accés real al maquinari**, com la càmera, GPS, sensors, Bluetooth o gestos multitàctils.
* **Proves en condicions reals**, incloent aspectes com el rendiment gràfic, les notificacions o el comportament en diferents versions d'Android.
* **Absència de problemes associats a la virtualització**, com a incompatibilitats amb determinats processadors, controladors gràfics o sistemes d'acceleració per maquinari.
* **Depuració sobre dispositius concrets**, especialment útil per a localitzar errors que únicament apareixen en determinats models o versions d'Android.

Per este motiu, durant el desenvolupament és habitual **combinar emuladors i dispositius físics**: els primers resulten especialment còmodes per al treball diari, mentre que els dispositius reals ens permeten verificar el comportament de l'aplicació en un entorn real.

Per a establir la comunicació entre el nostre ordinador i un dispositiu Android utilitzarem [**ADB (*****Android Debug Bridge*****)**](https://developer.android.com/tools/adb?hl=es-419), una eina inclosa en l’SDK d'Android que permet **detectar, controlar i comunicar-se amb dispositius Android** des del nostre equip.

L'eina `adb` forma part de les **Android SDK Platform-Tools**, un dels components que instal·lem juntament amb l’SDK d'Android. Si el orde `adb` no està disponible directament des de la terminal, haurem de localitzar el directori `platform-tools` dins de la instal·lació de l’SDK d'Android i executar-lo des d'allí. També podem **afegir este directori a la variable d'entorn `PATH`**, la qual cosa ens permetrà utilitzar el orde `adb` des de qualsevol ubicació de la terminal.

### Configuració del dispositiu Android

Android incorpora una sèrie d'opcions destinades al desenvolupament i la depuració que, per motius de seguretat, es troben ocultes de manera predeterminada.

#### Activar les opcions de desenvolupador

El procediment pot variar lleugerament depenent del fabricant i de la versió d'Android, però generalment haurem de:

1. Accedir a **Ajustos** en el nostre dispositiu.
2. Entrar en **Sobre el telèfon** o **Informació del telèfon**.
3. Localitzar l'opció **Número de compilació**.
4. Prémer **set vegades consecutives** sobre esta opció. Una vegada fet això, Android ens indicarà que s'han habilitat les opcions per a desenvolupadors. A partir d'este moment apareixerà una nova secció denominada **Opcions de desenvolupador** dins dels ajustos del sistema.

:::note

La ubicació i el nom exacte d'estes opcions poden variar depenent del fabricant i de la versió d'Android instal·lada.

:::

#### Activar la depuració USB

Si connectarem el dispositiu mitjançant cable, dins de **Opcions de desenvolupador** haurem de localitzar i activar:

**Depuració USB**

Esta opció permet que el nostre dispositiu accepte connexions ADB procedents de l'ordinador.

### Connexió mitjançant cable USB

La connexió mitjançant **USB** és generalment la forma més senzilla i estable de treballar amb un dispositiu físic.

Per a establir-la:

1. Connectem el dispositiu Android a l'ordinador mitjançant un **cable USB que permeta transferència de dades**.
2. Android mostrarà un missatge sol·licitant autorització per a permetre la depuració USB des d'eixe ordinador.
3. Acceptem l'autorització. Si es tracta del nostre equip habitual, podem seleccionar també **Permetre sempre des d'este ordinador**.

Una vegada connectat, podem comprovar que ADB reconeix correctament el dispositiu:

```bash
adb devices
```

Si la connexió s'ha establit correctament, obtindrem una eixida similar a:

```
List of devices attached
10HF8ACCUX000F9    device
```

L'identificador de l'esquerra correspon al dispositiu i l'estat `device` indica que està correctament connectat i autoritzat.

#### Comprovar el dispositiu des de Flutter

Que ADB reconega el dispositiu significa que Android pot comunicar-se correctament amb ell. El següent pas serà comprovar que **Flutter també el detecta**.

Per a això executem:

```bash
flutter devices
```

Flutter mostrarà tots els dispositius compatibles disponibles en el nostre equip. Per exemple:

```
Found 3 connected devices:
  V2420 (mobile)  • 10HF8ACCUX000F9 • android-arm64   • Android 16
  Linux (desktop) • linux           • linux-x64
  Chrome (web)    • chrome          • web-javascript
```

Com podem observar, Flutter no mostra únicament dispositius Android. Depenent del nostre entorn, també poden aparéixer altres destinacions disponibles, com el sistema d'escriptori o un navegador web.

#### Executar la nostra aplicació

Una vegada detectat el dispositiu, podrem executar el nostre projecte de la forma habitual:

```bash
flutter run
```

Si tenim diversos dispositius disponibles, Flutter ens permetrà seleccionar en quin volem executar l'aplicació.

També podem especificar-ho directament mitjançant el seu identificador:

```bash
flutter run -d <device_id>
```

on `<device_id>` correspon a l'identificador mostrat prèviament per `flutter devices`.

#### Què ocorre si el dispositiu no apareix?

Si `adb devices` no mostra el nostre dispositiu, convé comprovar:

* que la **depuració USB** està activada;
* que hem acceptat l'autorització de depuració en el dispositiu;
* que el cable USB utilitzat **permet transferència de dades** i no únicament càrrega;
* que el mode de connexió USB del dispositiu permet la transferència de dades;
* que el sistema operatiu reconeix correctament el dispositiu.

Si ADB detecta el dispositiu però Flutter no el mostra, podem utilitzar:

```bash
flutter doctor
```

per a comprovar si existeix algun problema amb la nostra instal·lació o configuració de l'entorn Android.

### Connexió sense fil (ADB over Wi-Fi)

Android també permet establir una connexió ADB **sense necessitat de mantindre el dispositiu connectat mitjançant un cable USB**.

Esta possibilitat resulta especialment còmoda quan volem provar contínuament una aplicació en un dispositiu real o realitzar demostracions en les quals el cable pot resultar molest.

En versions modernes d'Android podem utilitzar la funcionalitat de **depuració sense fil (*****Wireless debugging*****)**.

Per a realitzar la connexió, l'ordinador i el dispositiu hauran de trobar-se normalment en la **mateixa xarxa Wi-Fi**.

#### Aparellar el dispositiu des d'Android Studio

Android Studio facilita considerablement este procés.

* Obrim **Device Manager**.
* Seleccionem l'opció **Pair Devices Using Wi-Fi**.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F4tlibJemWNhG0ER5g9zp%2Fandroid_studio_2.png?alt=media&amp;token=d933e7c2-8aac-4b2b-9448-d00e896d2645" alt=""><figcaption></figcaption></figure>

* Android Studio ens permetrà realitzar l'aparellament mitjançant un **codi QR** o utilitzant un **codi d'aparellament**.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FR4dEjOIGQhP15ewRjCwj%2Fandroid_studio_3.png?alt=media&amp;token=c3454b03-7b03-41bf-ada3-f485dd5e78cd" alt=""><figcaption></figcaption></figure>

Si utilitzem el codi QR, des del nostre dispositiu Android accedirem a:

**Opcions de desenvolupador → Depuració sense fil → Vincular dispositiu amb codi QR**

Escanegem el codi mostrat per Android Studio i autoritzem la connexió.

Una vegada completat el procés podem comprovar novament els dispositius connectats:

```bash
adb devices
```

El dispositiu sense fil hauria d'aparéixer en la llista.

També podem comprovar-ho directament des de Flutter:

```bash
flutter devices
```

Flutter identificarà el dispositiu com una connexió sense fil i podrem executar la nostra aplicació normalment:

```bash
flutter run
```

#### Consideracions sobre la connexió Wi-Fi

La connexió sense fil resulta molt còmoda, però hem de tindre en compte algunes diferències respecte a USB:

* pot presentar una **latència lleugerament superior**;
* la seua estabilitat depén de la qualitat de la xarxa;
* l'ordinador i el dispositiu han de poder comunicar-se a través de la xarxa;
* determinades xarxes públiques, educatives o empresarials poden impedir la comunicació directa entre dispositius;
* en determinades situacions pot ser necessari tornar a realitzar l'aparellament.

Per això, la connexió USB continua sent una bona opció quan busquem **màxima estabilitat**, mentre que la connexió sense fil resulta especialment còmoda per al desenvolupament quotidià i les demostracions.

### Mirroring del dispositiu

Una vegada connectat un dispositiu físic mitjançant USB o Wi-Fi, podem anar un pas més enllà i **visualitzar la seua pantalla directament en el nostre ordinador i interactuar amb ella**.

Esta tècnica es coneix com ***screen mirroring*** i resulta especialment útil per a realitzar demostracions, explicar el funcionament d'una aplicació o treballar amb el dispositiu sense haver de manipular-lo constantment.

Per a això utilitzarem **`scrcpy`**, una eina lliure i multiplataforma que permet visualitzar i controlar un dispositiu Android des del nostre ordinador utilitzant ADB.

Per a utilitzar `scrcpy` necessitarem que:

* el dispositiu estiga correctament configurat per a utilitzar ADB;
* `adb devices` puga detectar el dispositiu;
* existisca una connexió mitjançant USB o depuració sense fil.

#### Descàrrega i execució de `scrcpy`

Podem obtindre `scrcpy` des dla seua [pàgina oficial](https://scrcpy.org/download/)o utilitzar algun dels mètodes d'instal·lació disponibles per al nostre sistema operatiu.

Una vegada instal·lat o descomprimit, podrem executar-lo simplement amb:

```bash
scrcpy
```

Si tenim un únic dispositiu connectat, `scrcpy` obrirà una finestra mostrant automàticament la seua pantalla.

Quan tinguem diversos dispositius disponibles, podrem indicar quin volem utilitzar mitjançant el seu identificador:

```bash
scrcpy -s <device_id>
```

Podem consultar prèviament estos identificadors mitjançant:

```bash
adb devices
```

#### Algunes opcions útils de `scrcpy`

`scrcpy` disposa de nombroses opcions que permeten adaptar el seu comportament. Algunes de les quals poden resultar-nos útils durant el desenvolupament són:

| Orde                            | Descripció                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------------- |
| `scrcpy -h`                        | Mostra l'ajuda i les opcions disponibles.                                       |
| `scrcpy --always-on-top`           | Manté la finestra del dispositiu per damunt de la resta.                          |
| `scrcpy --stay-awake`              | Evita que el dispositiu entre en repòs mentre està connectat.                  |
| `scrcpy --max-size 1024`           | Limita la resolució per a reduir el consum de recursos i millorar el rendiment. |
| `scrcpy --show-touches`            | Mostra visualment les pulsacions realitzades sobre la pantalla.                  |
| `scrcpy --record demo_flutter.mp4` | Grava la pantalla del dispositiu en un arxiu de vídeo.                          |

Per a les nostres classes, `scrcpy` serà especialment útil quan vulguem **executar una aplicació Flutter en un dispositiu físic i mostrar simultàniament el seu funcionament en la pantalla de l'ordinador**.
