---
title: "1. Preparar el proyecto"
description: "1. Preparar el proyecto · Asistente de IA y catálogo de widgets para 2.º de DAM."
sidebar:
  order: 2
---

Prepara una carpeta de trabajo para **`catalogo_widgets`** y comprueba el entorno con `flutter doctor`. Si ya has creado el proyecto, ábrelo en VS Code. En [El proyecto del catálogo](../el-proyecto-del-catalogo/) encontrarás los pasos de creación, el `main.dart` completo y las pantallas iniciales. Antes prepararemos las instrucciones y habilidades que utilizaremos durante el desarrollo.

## Organiza el material del asistente

Dentro de `catalogo_widgets`, crea una carpeta `ai`. Cuando generes el proyecto Flutter, quedará junto a `lib`, no dentro de ella. Después crea `instrucciones.md` y una carpeta `skills`:

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
Trabajo sobre el proyecto base catalogo_widgets, una aplicación con una lista de componentes
que abre una pantalla de ejemplos por cada tipo de widget.
Explica qué diferencia hay entre Dart, Flutter y un widget.
No generes código todavía.
```

Comprueba que la respuesta distingue el lenguaje, el framework y las piezas de la interfaz. En el siguiente apartado añadiremos instrucciones para que la ayuda se ajuste mejor a nuestro aprendizaje.
