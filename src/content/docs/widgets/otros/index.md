---
title: "Otros widgets: presentación e interacción"
sidebar:
  label: Introducción
  order: 1
---

En esta sección reunimos widgets que complementan los básicos y los contenedores. Primero veremos cómo presentar información con elementos Material; después, cómo responder a gestos y solicitar una actualización del contenido.

| Necesidad | Widgets |
| --- | --- |
| Agrupar información relacionada | `Card` |
| Organizar una fila con título, detalle y elementos laterales | `ListTile` |
| Separar visualmente contenidos | `Divider` |
| Representar a una persona | `CircleAvatar` |
| Reconocer gestos sobre un hijo | `GestureDetector` |
| Responder a un toque con una onda Material | `InkWell` |
| Solicitar una actualización al arrastrar una lista | `RefreshIndicator` |

## 🧩 Su lugar en el catálogo

El [proyecto inicial del catálogo](../configuracion-de-un-asistente-de-ia/el-proyecto-del-catalogo/) incluye la entrada `Otros`. Sus actividades se muestran en `lib/ui/catalogo/ui/otros_ejemplos_pantalla.dart`. Esta es la pantalla de partida:

```dart
import 'package:flutter/material.dart';

class OtrosEjemplosPantalla extends StatelessWidget {
  const OtrosEjemplosPantalla({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ejemplos de Otros')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Añade aquí los componentes que implementes en las actividades.
        ],
      ),
    );
  }
}
```

Si tu catálogo todavía no tiene esta entrada, crea el archivo anterior, añade `import 'otros_ejemplos_pantalla.dart';` a `catalogo_pantalla.dart` e incorpora esta fila a su lista. El mecanismo está preparado y no necesitas estudiarlo todavía:

```dart
ListTile(
  leading: const Icon(Icons.more_horiz),
  title: const Text('Otros'),
  trailing: const Icon(Icons.chevron_right),
  onTap: () {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (context) => const OtrosEjemplosPantalla(),
      ),
    );
  },
),
```

Los componentes reutilizables se mantienen en `lib/ui/core/ui/`; aquí importaremos sus clases para comparar variantes sin borrar las demostraciones anteriores.

## Apartados

- [Card, ListTile, Divider y CircleAvatar](./tarjetas-y-elementos-material/)
- [Gestos: GestureDetector, InkWell y RefreshIndicator](./gestos-y-actualizacion/)
