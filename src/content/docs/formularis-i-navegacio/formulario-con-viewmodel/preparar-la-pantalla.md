---
title: "1. Preparar la pantalla"
sidebar:
  order: 2
---

Vamos a crear el lugar donde el usuario rellenará la inscripción. Empezaremos con una pantalla que contiene un único campo, Nombre, y añadiremos una entrada para abrirla desde el catálogo. Así podremos probar la interfaz antes de recoger o comprobar datos.

Trabajaremos en `inscripcion_pantalla.dart` y en el menú `catalogo_pantalla.dart`. `Form` agrupará los campos que añadamos durante el recorrido.

:::tip[Qué conseguiremos]
Al terminar podrás abrir «Formulario de inscripción» desde el catálogo, escribir en Nombre y regresar al listado.
:::

Crea `lib/ui/inscripcion/ui/inscripcion_pantalla.dart` con esta primera versión:

```dart
import 'package:flutter/material.dart';

class InscripcionPantalla extends StatefulWidget {
  const InscripcionPantalla({super.key});

  @override
  State<InscripcionPantalla> createState() => _InscripcionPantallaState();
}

class _InscripcionPantallaState extends State<InscripcionPantalla> {
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Inscripción')),
      body: SafeArea(
        child: Form(
          key: _formKey,
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              TextFormField(
                decoration: const InputDecoration(
                  labelText: 'Nombre',
                  hintText: 'Por ejemplo, Ana',
                  helperText: 'Escribe al menos dos caracteres',
                  prefixIcon: Icon(Icons.person_outline),
                  border: OutlineInputBorder(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

La base aplica la estructura y la decoración ya estudiadas. Por ahora Nombre solo permite editar; conectaremos sus datos y su validador en los pasos 2 y 3.

## 🧩 Añadir la entrada al catálogo

En `lib/ui/catalogo/ui/catalogo_pantalla.dart`, añade este import junto a los existentes:

```dart
import '../../inscripcion/ui/inscripcion_pantalla.dart';
```

Añade a `children` de su `ListView` esta entrada, conservando las anteriores:

```dart
ListTile(
  leading: const Icon(Icons.assignment_outlined),
  title: const Text('Formulario de inscripción'),
  trailing: const Icon(Icons.chevron_right),
  onTap: () {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => const InscripcionPantalla(),
      ),
    );
  },
),
```

Ejecuta `flutter run`, abre «Formulario de inscripción» y escribe en Nombre. Vuelve al listado con la flecha. El siguiente paso adaptará esta entrada para entregar los datos que necesita el formulario.
