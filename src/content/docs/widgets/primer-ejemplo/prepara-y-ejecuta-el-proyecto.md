---
title: "Prepara y ejecuta el proyecto"
sidebar:
  order: 2
---

Necesitas Flutter instalado y un destino disponible: un navegador compatible, un emulador o un dispositivo configurado. Puedes comprobar la instalación con `flutter doctor`.

### Desde VS Code

Con las extensiones de Dart y Flutter instaladas:

1. Abre la paleta de comandos con `Ctrl + Shift + P` y busca **Flutter: New Project**.
2. Elige la plantilla **Application**, una carpeta para tus proyectos y el nombre **`contador_vueltas`**.
3. Abre el proyecto generado, selecciona un destino con **Flutter: Select Device** y pulsa `F5` para ejecutarlo.

El nombre del proyecto utiliza minúsculas y guiones bajos. No lo confundas con el título que aparecerá en la interfaz, que puede incluir espacios y tildes.

### Desde la terminal

Sitúate en la carpeta donde guardas tus proyectos y ejecuta estas órdenes, una por una:

```bash
flutter create contador_vueltas
cd contador_vueltas
flutter devices
flutter run
```

`flutter create` genera el proyecto y resuelve sus dependencias. `flutter devices` muestra los destinos disponibles; si tienes varios, puedes seleccionar uno mediante `flutter run -d ID`, sustituyendo `ID` por su identificador real.

Para consultar y arrancar un emulador configurado, utiliza `flutter emulators` y después `flutter emulators --launch ID`. Un navegador o un dispositivo físico no necesitan ese paso.

:::note[Elegir las plataformas 📱]
Si solo necesitas Android y web, puedes crear el proyecto con `flutter create --platforms=android,web contador_vueltas`. Para añadir Android a un proyecto que no lo incluye, ejecuta `flutter create --platforms=android .` desde su raíz y revisa los archivos generados. Crear las carpetas de una plataforma no instala sus herramientas de compilación.
:::

La primera ejecución puede tardar más porque prepara y descarga componentes. Detén la aplicación desde el editor o pulsa `q` en la sesión de `flutter run`. La [referencia de la herramienta Flutter](https://docs.flutter.dev/reference/flutter-cli) reúne estas órdenes.

Si Flutter anuncia una actualización, `flutter upgrade` actualiza el SDK. No es necesario hacerlo para seguir este ejemplo si tu instalación ya funciona; en el aula utiliza la versión acordada para el curso.

### Localiza lo que vamos a modificar

| Ruta | Para qué sirve |
| --- | --- |
| `lib/main.dart` | Contiene el punto de entrada y el código inicial de la aplicación. |
| `pubspec.yaml` | Declara el nombre del paquete, dependencias y recursos. |
| `test/` | Contiene las pruebas del proyecto. |
| `android/`, `web/`, etc. | Contienen la configuración de las plataformas generadas. |

Vamos a sustituir el código de muestra de `lib/main.dart`. Si la plantilla incluye una prueba del contador original, esa prueba dejará de corresponder a nuestra aplicación: tendrás que adaptarla antes de utilizar `flutter test` como comprobación del nuevo proyecto.
