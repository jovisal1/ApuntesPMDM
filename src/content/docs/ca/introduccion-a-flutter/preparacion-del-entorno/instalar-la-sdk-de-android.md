---
title: "Instal·lar l’SDK d’Android"
sidebar:
  label: "Instal·lar l’SDK d’Android"
  order: 2
---

En Flutter, és necessari instal·lar l’SDK d'Android quan es desitja desenvolupar aplicacions per a dispositius amb este sistema operatiu. El SDK d'Android proporciona les eines necessàries per a compilar, depurar i executar aplicacions en dispositius o emuladors Android. Encara que Flutter és multiplataforma, les eines específiques d'Android, com l’SDK, ADB (Android Debug Bridge) i els emuladors, són indispensables per a provar i desplegar aplicacions en este sistema operatiu.&#x20;

Depenent de si ja disposes d'una instal·lació prèvia de [**Android Studio** ](https://developer.android.com/studio?hl=es-419)o necessites realitzar una nova instal·lació, hauràs de seguir un procediment diferent. En cas de realitzar una instal·lació des de zero en Linux, serà necessari **descarregar i descomprimir el paquet d'Android Studio en una ubicació adequada del sistema**, des d'on podrem executar posteriorment l'IDE. A continuació, es detallen els passos que hem de seguir en cada cas.


### No dispose d'Android Studio

Descarrega i instal·la Android Studio tenint en compte:

* &#x20;Seleccionar tipus d'instal·lació **Standard**

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F36X3FIxyGqVthHgBSBge%2Fksnip_20240912-133709.png?alt=media&amp;token=5ab8ecdc-b69c-4a05-8cd6-a73082bfcc96" alt=""><figcaption></figcaption></figure>

* Prémer *Següent* fins a arribar a la pantalla de Termes i condicions. Seleccionar **Acceptar** i prémer *Següent*.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2Fh2mRJi9dBeF92iicSO0e%2Fksnip_20240912-133902.png?alt=media&amp;token=8aa3977f-0f5e-4d99-b131-2362df4f3632" alt=""><figcaption></figcaption></figure>

* Seguir amb la resta de passos fins a finalitzar la instal·lació

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FMrXDTy7e2XkMAM3tcF1n%2Fksnip_20240912-134059.png?alt=media&amp;token=e0b312c5-9e81-4c07-b67a-d3df5baf6bdf" alt=""><figcaption></figcaption></figure>

Després de realitzar estos passos es mostrarà el diàleg de benvinguda d'Android Studio. Des d'ací accedirem al **SDKManager**

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FX4uAEkiidIqDIMoGbHng%2Fksnip_20240912-134416.png?alt=media&amp;token=d47f8376-b0e3-4c56-a665-d4573d99351c" alt=""><figcaption></figcaption></figure>

Una vegada dins de la pantalla de benvinguda, accedeix al **SDKManager, instal·la** els següents **components**:

* Android SDK Platform, API 35.0.1 (Pestanya SDK Platfroms)

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FH2lMJ6YXWS2UWUmvLt8t%2Fksnip_20240912-134618.png?alt=media&amp;token=fb233b22-7f93-4147-9c33-e7c69c55cf61" alt=""><figcaption></figcaption></figure>

* Android SDK Command-line Tools (Pestanya SDK Tools)
* Android SDK Build-Tools (Pestanya SDK Tools)
* Android SDK Platform-Tools (Pestanya SDK Tools)
* Android Emulator (Pestanya SDK Tools)

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FOGswxoKemIKpCr0N7iII%2Fksnip_20240912-134650.png?alt=media&amp;token=3c5702c6-5cdb-4c9e-98a7-7c55e7bb7531" alt=""><figcaption></figcaption></figure>


### Dispose d'Android Studio

Segueix els següents passos:

* Inicia Android Studio.
* Ves al diàleg de Configuració per a veure l’**Administrador de SDK**
  * Si tens un projecte previ obert el trobaràs en l'opció de menú Eines -> Administrador de SDK.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FCVM97LyBxXcEFez33CE8%2Fimage.png?alt=media&amp;token=f456cf2b-8439-4c55-9e14-e9cf1a5ba8da" alt="" width="153"><figcaption></figcaption></figure>

* Si apareix el diàleg de benvinguda d'Android Studio, fes clic en la icona de Més opcions que apareix al costat del botó Obrir i selecciona Administrador de SDK en el menú desplegable.
* Fes clic en **SDK Platforms**.
* Verifica que **Android API 35.0.1** estiga seleccionat (si la columna Estat mostra "Actualització disponible" o "No instal·lat", selecciona Android API 35.0.1 i fes clic a Aplicar).

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FH2lMJ6YXWS2UWUmvLt8t%2Fksnip_20240912-134618.png?alt=media&amp;token=fb233b22-7f93-4147-9c33-e7c69c55cf61" alt=""><figcaption></figcaption></figure>

* Després d'instal·lar l'últim SDK, és possible que la columna Estat mostre "Actualització disponible". Això significa que algunes imatges del sistema addicionals poden no estar instal·lades. Pots ignorar això i continuar.
* Fes clic en **SDK Tools**.

**Verifica** que les següents **eines** de SDK estiguen seleccionades:

1. Android SDK Command-line Tools
2. Android SDK Build-Tools
3. Android SDK Platform-Tools
4. Android Emulator

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FOGswxoKemIKpCr0N7iII%2Fksnip_20240912-134650.png?alt=media&amp;token=3c5702c6-5cdb-4c9e-98a7-7c55e7bb7531" alt=""><figcaption></figcaption></figure>

Si la columna Estat d'alguna de les eines esmentades mostra "Actualització disponible" o "No instal·lat", selecciona les eines necessàries i fes clic a Aplicar.



#### Emuladors

Abans de finalitzar la configuració d'Android Studio, comprovarem que disposem d'un **dispositiu virtual** en el qual podrem executar i provar les nostres aplicacions sense necessitat d'utilitzar un dispositiu físic.

Per a això, des de la pantalla principal d'Android Studio podem accedir al **Virtual Device Manager** a través de l'opció **More Actions**. Des d'este apartat podrem consultar i gestionar els dispositius virtuals disponibles en el nostre sistema.

Durant la instal·lació d'Android Studio és possible que s'haja creat automàticament un **dispositiu virtual d'Android (AVD)**. En cas contrari, podrem crear un manualment seleccionant el model de dispositiu i la versió d'Android que desitgem utilitzar.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2Fi2zU8L9ypWblzDAQC8uH%2Femuladores_1.png?alt=media&amp;token=cbc63912-8baa-4e7f-b510-315ae9d8992e" alt=""><figcaption></figcaption></figure>

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FIjunOJsWTU2coCNt7dbx%2Femuladores_2.png?alt=media&amp;token=6c4f1e7b-476b-447b-896b-525f509bd5ab" alt=""><figcaption></figcaption></figure>
