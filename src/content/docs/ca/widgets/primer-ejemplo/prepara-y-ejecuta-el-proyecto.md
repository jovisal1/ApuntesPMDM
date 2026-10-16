---
title: "Prepara i executa el projecte"
sidebar:
  order: 2
---

Necessites Flutter instal·lat i una destinació disponible: un navegador compatible, un emulador o un dispositiu configurat. Pots comprovar la instal·lació amb `flutter doctor`.

### Des de VS Code

Amb les extensions de Dart i Flutter instal·lades:

1. Obri la paleta d’ordres amb `Ctrl + Shift + P` i busca **Flutter: New Project**.
2. Tria la plantilla **Application**, una carpeta per als projectes i el nom **`contador_vueltas`**.
3. Obri el projecte generat, selecciona una destinació amb **Flutter: Select Device** i prem `F5` per a executar-lo.

El nom del projecte utilitza minúscules i guions baixos. No el confongues amb el títol que apareixerà en la interfície, que pot incloure espais i accents. Mantindrem el mateix nom de paquet que en la versió en castellà perquè les rutes dels imports coincidisquen.

### Des de la terminal

Situa’t en la carpeta on guardes els projectes i executa estes ordres, una per una:

```bash
flutter create contador_vueltas
cd contador_vueltas
flutter devices
flutter run
```

`flutter create` genera el projecte i resol les dependències. `flutter devices` mostra les destinacions disponibles; si en tens diverses, pots seleccionar-ne una mitjançant `flutter run -d ID`, substituint `ID` pel seu identificador real.

Per a consultar i arrancar un emulador configurat, utilitza `flutter emulators` i després `flutter emulators --launch ID`. Un navegador o un dispositiu físic no necessiten eixe pas.

:::note[Triar les plataformes 📱]
Si només necessites Android i web, pots crear el projecte amb `flutter create --platforms=android,web contador_vueltas`. Per a afegir Android a un projecte que no l’inclou, executa `flutter create --platforms=android .` des de l’arrel i revisa els arxius generats. Crear les carpetes d’una plataforma no instal·la les seues ferramentes de compilació.
:::

La primera execució pot tardar més perquè prepara i descarrega components. Para l’aplicació des de l’editor o prem `q` en la sessió de `flutter run`. La [referència de la ferramenta Flutter](https://docs.flutter.dev/reference/flutter-cli) reunix estes ordres.

Si Flutter anuncia una actualització, `flutter upgrade` actualitza l’SDK. No és necessari fer-ho per a seguir este exemple si la instal·lació ja funciona; a l’aula utilitza la versió acordada per al curs.

### Localitza el que modificarem

| Ruta | Per a què servix |
| --- | --- |
| `lib/main.dart` | Conté el punt d’entrada i el codi inicial de l’aplicació. |
| `pubspec.yaml` | Declara el nom del paquet, dependències i recursos. |
| `test/` | Conté les proves del projecte. |
| `android/`, `web/`, etc. | Contenen la configuració de les plataformes generades. |

Substituirem el codi de mostra de `lib/main.dart`. Si la plantilla inclou una prova del comptador original, eixa prova deixarà de correspondre a la nostra aplicació: hauràs d’adaptar-la abans d’utilitzar `flutter test` com a comprovació del nou projecte.
