---
title: "1. Preparar el proyecto"
description: "1. Preparar el proyecto · Asistente de IA y catálogo de widgets para 2.º de DAM."
sidebar:
  order: 2
---

Empezaremos creando **`catalogo_widgets`**, el proyecto de Flutter que ampliaremos a medida que aprendamos nuevos componentes. La pantalla principal mostrará una lista de widgets y cada entrada abrirá una pantalla con distintos ejemplos del componente seleccionado.

El primer paso es generar el proyecto, abrirlo en VS Code y comprobar que la aplicación inicial se ejecuta correctamente. Después prepararemos los archivos de instrucciones y habilidades del asistente de IA para trabajar sobre este mismo proyecto.

## Crea el proyecto del curso

Abre una terminal en la carpeta donde guardas tus prácticas. Ejecuta cada orden por separado:

```bash
flutter doctor
flutter create catalogo_widgets
cd catalogo_widgets
flutter devices
flutter run
```

`flutter doctor` comprueba las herramientas instaladas. Atiende los problemas de la plataforma que vayas a utilizar; para ejecutar en web no necesitas completar la instalación de iOS. `flutter create` crea un proyecto con ese nombre. `cd` entra en su carpeta y `flutter devices` muestra los destinos disponibles. Si hay varios, utiliza `flutter run -d ID`, sustituyendo `ID` por uno de los identificadores mostrados.

**Resultado esperado:** se abre la aplicación inicial de Flutter y puedes pulsar su botón. Haz esta comprobación antes de configurar la IA: así sabrás si un problema pertenece al entorno o al código que añadiremos.

En VS Code utiliza **Archivo → Abrir carpeta** y selecciona `catalogo_widgets`. Debes ver `pubspec.yaml` directamente en el explorador. Abre **Terminal → Nueva terminal** y comprueba que estás en esa carpeta.

## Organiza el material del asistente

Crea una carpeta `ai` junto a `lib`, no dentro de ella. Después crea `instrucciones.md` y una carpeta `skills`:

```text
catalogo_widgets/
├── ai/
│   ├── instrucciones.md
│   └── skills/
├── lib/
│   └── main.dart
├── test/
└── pubspec.yaml
```

Un archivo `.md` es texto con formato Markdown. Se puede editar con VS Code y abrir como texto. Estos archivos documentan cómo queremos trabajar con el asistente; Flutter no los ejecuta ni los muestra en la aplicación.

## Primera pregunta de control

Envía este mensaje sin pedir que cambie archivos:

```text
Estoy en 2.º de DAM y estoy empezando con Flutter.
Voy a crear catalogo_widgets, una aplicación con una lista de componentes
que abre una pantalla de ejemplos por cada tipo de widget.
Explica qué diferencia hay entre Dart, Flutter y un widget.
No generes código todavía.
```

Comprueba que la respuesta distingue el lenguaje, el framework y las piezas de la interfaz. En el siguiente apartado añadiremos instrucciones para que la ayuda se ajuste mejor a nuestro aprendizaje.
