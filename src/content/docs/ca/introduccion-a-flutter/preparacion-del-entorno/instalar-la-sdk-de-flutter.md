---
title: "Instal·lar l’SDK de Flutter"
sidebar:
  label: "Instal·lar l’SDK de Flutter"
  order: 3
---

Per a realitzar la instal·lació de l’SDK de Flutter, seguirem les instruccions que ens ofereix la [documentació oficial](https://docs.flutter.dev/install/quick).

:::note

Els passos descrits a continuació s'han realitzat assumint que el sistema operatiu sobre el qual volem instal·lar l’SDK de Flutter és Linux.&#x20;

:::

### Obtindre l’SDK

Simplement seleccionem el sistema operatiu on volem realitzar la instal·lació.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FUUj6BlXuMMuTNGB25PBD%2Fimage.png?alt=media&amp;token=3ab06645-1ef6-4a06-9a7c-d569069fa453" alt="" width="375"><figcaption><p><a href="https://docs.flutter.dev/get-started/install">https://docs.flutter.dev/get-started/install</a></p></figcaption></figure>

Com ja sabem, Flutter ens permet desenvolupar aplicacions per a diferents tipus de plataformes. En el següent pas, hem de triar en quina treballarem. En el nostre cas, triarem desenvolupament mòbil (Android). D'esta elecció dependrà quines parts de les eines de Flutter es configuren per a executar la nostra primera aplicació de Flutter. Per descomptat, podem configurar plataformes addicionals més endavant.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FaW8Kd7pA2GxaNkAyImOc%2Fimage.png?alt=media&amp;token=2ae8e2f2-ead3-48b9-9a7e-836b66b1e698" alt="" width="375"><figcaption><p><a href="https://docs.flutter.dev/get-started/install/linux">https://docs.flutter.dev/get-started/install/linux</a></p></figcaption></figure>

Arribats a este punt, se'ns mostrarà un llistat dels requisits necessaris per a una instal·lació correcta amb el sistema operatiu i la plataforma que hàgem seleccionat. Dins d'esta secció, ens dirigirem al punt ["Install the Flutter SDK"](https://docs.flutter.dev/get-started/install/linux/android#install-the-flutter-sdk) on el més senzill serà seguir els passos per a realitzar la instal·lació de manera manual. Això és, accedint a la pestanya "Download and Install" i descarregant el fitxer (flutter\_linux\_3.24.1-stable.tar.xz).

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FZWINrS2mUkWUCzXfFzMB%2Fimage.png?alt=media&amp;token=83122212-38b9-440c-ae07-23bcda8cee34" alt="" width="375"><figcaption></figcaption></figure>

### Descomprimir l’SDK

Una vegada descarregat el fitxer que conté l’SDK, hem de descomprimir-lo. En el nostre cas realitzarem la instal·lació dins d'un **directori** del nostre home denominat **development**. Per este motiu, **serà necessari que** prèviament **existisca**.&#x20;

```bash
mkdir ~/development
```

A continuació, hem de descomprimir el fitxer de flutter en el directori que acabem de crear. Per exemple, si la descàrrega s'ha realitzat en el directori Descàrregues del nostre home, en linux seria tan senzill com executar la següent instrucció:



```bash
tar -xf ~/Descargas/flutter_linux_3.24.1-stable.tar.xz -C ~/development/
```



Una vegada executat, l’SDK de Flutter hauria d'estar en el directori `~/development/flutter`.

### Configuració del PATH

Una vegada descomprimit, hem d'actualitzar el PATH perquè el nostre equip puga trobar fàcilment els executables de Flutter.

En Windows, això es fa a través de les variables d'entorn. Comprovem que existisca la variable PATH i li afegim el directori `flutter/bin` o el que corresponga segons la instal·lació que hàgem realitzat.

En Linux, necessitem afegir esta variable al PATH mitjançant la línia de ordes. Per a fer-ho, escriurem en la terminal:

```bash
export PATH="$HOME/development/flutter/bin:$PATH"
```

Este orde només estableix el PATH en la terminal actual. Perquè l'actualització del PATH siga permanent, hem d'incloure-la en el nostre perfil, modificant l'arxiu `~/.profile` en la nostra carpeta personal i afegint el següent codi al final:

```bash
# Afegir Flutter al PATH
FLUTTER_HOME="$HOME/development/flutter"
if [ -d $FLUTTER_HOME/bin ] ; then
    PATH=$FLUTTER_HOME/bin:$PATH
fi
```

D'esta manera, la carpeta de Flutter s'afegirà al PATH cada vegada que inicies sessió. Si no vols tancar la sessió per a carregar el perfil, pots fer-lo amb el orde `source ~/.profile`.

Si tot ha eixit bé, tindràs disponible el orde tant el orde `dart` com el orde `flutter` des de qualsevol directori del teu equip. Tots dos et permetran accedir al seu CLI.

### CLI de Dart

[Dart CL](https://dart.dev/tools/dart-tool)[I](https://dart.dev/tools/dart-tool) (Command Line Interface) és una eina de línia de ordes per a gestionar aplicacions i paquets escrits en Dart. Les seues principals opcions inclouen:

* `dart create <project_name>`: Crea un nou projecte Dart.
* `dart run`: Executa una aplicació Dart.
* `dart format`: Formata el codi font segons els estàndards d'estil.
* `dart analyze`: Analitza el codi a la recerca d'errors o advertiments.
* `dart compile:`permet compilar codi Dart a diferents formats executables. Les principals opcions de compilació són:
  * **`dart compile exe`**: Compila l'arxiu Dart en un executable nadiu. Funciona en sistemes com Linux, macOS i Windows, sense necessitat d'una màquina virtual (VM) per a executar-lo.
  * **`dart compile js`**: Transpila el codi Dart a JavaScript, útil per a aplicacions web.
  * **`dart compile jit-snapshot`**: Genera un "snapshot" que pot ser executat usant la VM de Dart, accelerant l'execució inicial.
  * **`dart compile aot-snapshot`**: Crea un snapshot en mode Ahead-of-Time (AOT), la qual cosa millora el rendiment en aplicacions en producció.

### CLI de Flutter

De manera similar, el [**Flutter CLI**](https://docs.flutter.dev/reference/flutter-cli) és l'eina de línia de ordes que permet gestionar projectes i fer diverses tasques relacionades amb el desenvolupament d'aplicacions Flutter. Algunes de les seues principals opcions són:

* **`flutter create <project_name>`**: Crea un nou projecte Flutter.
* **`flutter run`**: Executa l'aplicació en un emulador o dispositiu connectat.
* **`flutter build`**: Compila l'aplicació per a diferents plataformes (Android, iOS, web, etc.).
* **`flutter doctor`**: Diagnostica problemes a l'entorn de desenvolupament.
* **`flutter pub`**: Gestiona dependències del projecte.
* **`flutter clean:`**&#x65;limina els arxius generats en la carpeta `build/` d'un projecte. Això inclou els arxius temporals, les compilacions i les configuracions prèvies que hagen sigut creades durant el procés de desenvolupament.

### Comprovar requisits mínims amb Flutter Doctor

El següent pas serà utilitzar **`flutter doctor`** per a realitzar una comprovació dels requisits de programari del nostre entorn. Este orde generarà un informe en el qual es mostraran les dependències que ens falten per instal·lar i els passos que hem de seguir per a resoldre-les.

Així doncs, obrim una consola i executem el següent orde:

```bash
flutter doctor
```

La primera vegada que executem l'anterior orde, se'ns mostrarà un missatge de benvinguda i alguns advertiments. Tot seguit i després de realitzar les instal·lacions necessàries i comprovacions pertinents, el CLI de Flutter ens indicarà quins requisits satisfà el nostre sistema i quins no. Haurem d'aconseguir que tots estiguen correctes per a poder començar a treballar amb Flutter.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F7T9Ncqjr26mYckUB6npp%2FCaptura_tasca_2.png?alt=media&amp;token=d35b4249-7e7c-484d-9cc8-7536c3983de2" alt=""><figcaption></figcaption></figure>

:::note

Un error bastant comú és el que indica `"Unable to find bundled Java Version".` Una possible solució consisteix a copiar el contingut del directori jbr de la vostra instal·lació d'AndroidStudio (en Windows sol estar en /Program\_Files/Android/AndroidStudio) en la carpeta jre.&#x20;

![](https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FShVErt02devcG5IJgXvV%2Fimage.png?alt=media\&token=51fefe2c-fda6-4671-9572-af62f94fc958)

Un altre error que se sol produir és el relatiu a Android toolchain. Este es produeix perquè necessitem acceptar una sèrie de llicències d'android. Per a solucionar este error ha de bastar amb executar `flutter doctor --android-licenses`.

![](https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F9eXYnhGMf7T35haSxigm%2Fimage.png?alt=media\&token=9cf00623-d95a-41f2-8045-ab8485870347)

:::
