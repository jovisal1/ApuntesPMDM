---
title: "6. Gestionar el foco"
sidebar:
  order: 7
---

Ahora vamos a facilitar el recorrido al rellenar la inscripción: empezar a escribir en Nombre, pasar a Correo y volver a editarlo cuando sea necesario. El campo que recibe la escritura en cada momento es el que tiene el foco.

En `inscripcion_pantalla.dart` utilizaremos `autofocus` para el campo inicial y un `FocusNode` para identificar Correo. Después conectaremos la acción «Siguiente» del teclado y el botón «Editar correo» con ese campo.

:::tip[Qué conseguiremos]
Al probar el montaje final, Nombre recibirá el foco inicial y podrás pasar a Correo sin tener que tocarlo. El botón «Editar correo» permitirá recuperar el foco en ese campo.
:::

## ⌨️ 1. Elegir el campo inicial

Añade `autofocus: true` al `TextFormField` de Nombre. Al abrir esta pantalla podrá recibir la escritura sin tocarlo antes. Solo utilizaremos foco automático en ese campo.

## 2. Identificar el campo de correo

Añade este miembro al `State`, fuera de `build`:

```dart
final _correoFocus = FocusNode();
```

En el campo Correo añade `focusNode: _correoFocus`. En el `dispose()` existente añade `_correoFocus.dispose();` antes de `super.dispose()`, junto a la liberación de los controladores. No declares un segundo `dispose()`.

## 3. Darle el foco desde un botón

Añade a `children`, junto a los otros botones:

```dart
TextButton(
  onPressed: () => _correoFocus.requestFocus(),
  child: const Text('Editar correo'),
),
```

`requestFocus()` solicita que Correo reciba el teclado. También puedes añadir `onFieldSubmitted: (_) => _correoFocus.requestFocus()` a Nombre, con `textInputAction: TextInputAction.next`, para pasar al correo desde el teclado.

El método `_previsualizar()` ya utiliza `FocusScope.of(context).unfocus()` para retirar el foco antes de comprobar los datos. El foco, los controladores y sus recursos se gestionan en la pantalla; las reglas del formulario siguen en el ViewModel.

:::note[Prueba el recorrido]
Reinicia la aplicación para observar `autofocus`. Escribe el nombre, usa «Siguiente», edita el correo y pulsa «Previsualizar». Después pulsa «Editar correo»: el cursor debe volver a ese campo.
:::

Referencia: [Foco y campos de texto](https://docs.flutter.dev/cookbook/forms/focus).
