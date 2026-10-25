---
title: "Autocompletat"
sidebar:
  order: 6
---

`Autocomplete<T>` oferix suggeriments a partir del text escrit. Per exemple, en escriure «te» podem proposar `Text` i `TextField`. És útil quan interessa triar un element d’una llista sense recórrer-la completa.


Estos recursos complementen l’entrada, però no substituïxen les quatre peces del formulari. Este exemple es col·loca fora de `Form` i no participa en les operacions de validació o guardat.

## 🔎 Filtrar i triar una opció

En la pantalla de controls del catàleg descrita en la [introducció](../), afig este fragment al `children` del `Column` exterior, en el lloc indicat per als exemples complementaris:

```dart
Autocomplete<String>(
  optionsBuilder: (entrada) {
    const opciones = ['Text', 'TextField', 'Image', 'Icon'];
    final consulta = entrada.text.trim().toLowerCase();
    if (consulta.isEmpty) return const Iterable<String>.empty();
    return opciones.where(
      (opcion) => opcion.toLowerCase().contains(consulta),
    );
  },
  onSelected: (opcion) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Has elegido $opcion')),
    );
  },
),
```

| Propietat | Què fa en este exemple |
| --- | --- |
| `<String>` | Indica el tipus de les opcions. |
| `optionsBuilder` | Rep el text editat i retorna les opcions que han d’aparéixer. |
| `onSelected` | Rep l’opció que l’usuari tria, no cada lletra escrita. |

El camp i la llista de suggeriments es construïxen automàticament. La consulta es convertix a minúscules perquè «TE» i «te» troben les mateixes opcions. En triar-ne una, s’ompli el camp i mostrem un missatge.

Pots personalitzar el camp amb `fieldViewBuilder`. Si ho fas, usa el controlador i el focus rebuts per eixe callback per a conservar la connexió amb els suggeriments. Per a objectes diferents de `String`, `displayStringForOption` decidix el text que veurà l’usuari.

:::note[Escriure no equival a triar]
Una persona pot escriure alguna cosa sense seleccionar un suggeriment. Este exemple no obliga a triar una opció vàlida: si eixa és una regla del formulari, cal comprovar-la expressament.
:::

Prova «te», «im» i una paraula sense coincidències. Selecciona `TextField` i comprova el missatge. No cal un altre projecte ni un nou `main.dart`.

Referència: [Autocomplete](https://api.flutter.dev/flutter/material/Autocomplete-class.html).
