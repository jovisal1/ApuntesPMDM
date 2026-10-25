---
title: "1. Preparar la pantalla"
sidebar:
  order: 2
---

Crearem el lloc on l’usuari omplirà la inscripció. Començarem amb una pantalla que conté un únic camp, Nombre, i afegirem una entrada per a obrir-la des del catàleg. Així podrem provar la interfície abans d’arreplegar o comprovar dades.

Treballarem en `inscripcion_pantalla.dart` i en el menú `catalogo_pantalla.dart`. `Form` agruparà els camps que afegim durant el recorregut.

:::tip[Què aconseguirem]
En acabar podràs obrir «Formulario de inscripción» des del catàleg, escriure en Nombre i tornar al llistat.
:::

Crea `lib/ui/inscripcion/ui/inscripcion_pantalla.dart` amb esta primera versió:

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

La base aplica l’estructura i la decoració ja estudiades. De moment Nombre només permet editar; connectarem les dades i el validador en els passos 2 i 3.

## 🧩 Afegir l’entrada al catàleg

En `lib/ui/catalogo/ui/catalogo_pantalla.dart`, afig este import al costat dels existents:

```dart
import '../../inscripcion/ui/inscripcion_pantalla.dart';
```

Afig a `children` del seu `ListView` esta entrada, conservant les anteriors:

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

Executa `flutter run`, obri «Formulario de inscripción» i escriu en Nombre. Torna al llistat amb la fletxa. El pas següent adaptarà esta entrada per a entregar les dades que necessita el formulari.
