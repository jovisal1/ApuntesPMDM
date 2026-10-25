---
title: "Altres widgets: presentació i interacció"
sidebar:
  label: Introducció
  order: 1
---

En esta secció reunim widgets que complementen els bàsics i els contenidors. Primer veurem com presentar informació amb elements Material; després, com respondre a gestos i demanar una actualització del contingut.

## 🎯 Què aprendràs

- Presentar informació amb targetes, files, separadors i avatars.
- Respondre a gestos i pulsacions amb GestureDetector i InkWell.
- Sol·licitar una actualització del contingut en arrossegar una llista.

| Necessitat | Widgets |
| --- | --- |
| Agrupar informació relacionada | `Card` |
| Organitzar una fila amb títol, detall i elements laterals | `ListTile` |
| Separar visualment continguts | `Divider` |
| Representar una persona | `CircleAvatar` |
| Reconéixer gestos sobre un fill | `GestureDetector` |
| Respondre a un toc amb una ona Material | `InkWell` |
| Demanar una actualització en arrossegar una llista | `RefreshIndicator` |

## 🧩 El seu lloc en el catàleg

El [projecte inicial del catàleg](../configuracion-de-un-asistente-de-ia/el-proyecto-del-catalogo/) inclou `Otros`. Les activitats es mostren en `lib/ui/catalogo/ui/otros_ejemplos_pantalla.dart`. Esta és la pantalla inicial:

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

Si el catàleg encara no té esta entrada, crea el fitxer anterior, afig `import 'otros_ejemplos_pantalla.dart';` a `catalogo_pantalla.dart` i incorpora esta fila a la llista. El mecanisme està preparat i no cal estudiar-lo encara:

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

Els components reutilitzables es mantenen en `lib/ui/core/ui/`; ací importarem les classes per a comparar variants sense esborrar les demostracions anteriors. Els identificadors i les cadenes Dart són comuns a les dos versions.

## Apartats

- [Card, ListTile, Divider i CircleAvatar](./tarjetas-y-elementos-material/)
- [Gestos: GestureDetector, InkWell i RefreshIndicator](./gestos-y-actualizacion/)
