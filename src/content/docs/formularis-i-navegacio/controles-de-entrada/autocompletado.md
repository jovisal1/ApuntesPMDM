---
title: "Autocompletado"
sidebar:
  order: 6
---

`Autocomplete<T>` ofrece sugerencias a partir del texto escrito. Por ejemplo, al escribir «te» podemos proponer `Text` y `TextField`. Es útil cuando interesa elegir un elemento de una lista sin recorrerla completa.


Estos recursos complementan la entrada, pero no sustituyen las cuatro piezas del formulario. Este ejemplo se coloca fuera de `Form` y no participa en sus operaciones de validación o guardado.

## 🔎 Filtrar y elegir una opción

En la [pantalla de controles del catálogo](../), añade este fragmento al `children` del `Column` exterior, en el lugar indicado para ejemplos complementarios:

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

| Propiedad | Qué hace en este ejemplo |
| --- | --- |
| `<String>` | Indica el tipo de las opciones. |
| `optionsBuilder` | Recibe el texto editado y devuelve las opciones que deben aparecer. |
| `onSelected` | Recibe la opción que el usuario elige, no cada letra escrita. |

El campo y la lista de sugerencias se construyen automáticamente. La consulta se convierte a minúsculas para que «TE» y «te» encuentren las mismas opciones. Al elegir una, se rellena el campo y mostramos un mensaje.

Puedes personalizar el campo con `fieldViewBuilder`. Si lo haces, utiliza el controlador y el foco recibidos por ese callback para conservar su conexión con las sugerencias. Para objetos distintos de `String`, `displayStringForOption` decide el texto que verá el usuario.

:::note[Escribir no equivale a elegir]
Una persona puede escribir algo sin seleccionar una sugerencia. Este ejemplo no obliga a elegir una opción válida: si esa es una regla del formulario, hay que comprobarla expresamente.
:::

Prueba «te», «im» y una palabra sin coincidencias. Selecciona `TextField` y comprueba el mensaje. No hace falta otro proyecto ni un nuevo `main.dart`.

Referencia: [Autocomplete](https://api.flutter.dev/flutter/material/Autocomplete-class.html).
