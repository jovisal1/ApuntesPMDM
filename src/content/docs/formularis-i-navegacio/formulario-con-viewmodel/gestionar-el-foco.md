---
title: "7. Gestionar el foco"
sidebar:
  order: 8
---

El foco identifica qué campo recibe la escritura. Nombre ofrecerá «Siguiente» para pasar a Correo; en Correo, «Hecho» retirará el teclado para elegir taller y recordatorio. La consulta se realiza únicamente al pulsar Login.

Añade al `State` un `FocusNode` para Correo:


```dart
final _correoFocus = FocusNode();
```

En Nombre añade estas propiedades:
```dart
textInputAction: TextInputAction.next,
onFieldSubmitted: (_) => _correoFocus.requestFocus(),
```

En Correo añade estas propiedades:
```dart
focusNode: _correoFocus,
textInputAction: TextInputAction.done,
onFieldSubmitted: (_) => FocusScope.of(context).unfocus(),
```

`requestFocus()` mueve el teclado a Correo y `unfocus()` retira el foco actual. No envían el formulario. Añade `_correoFocus.dispose();` al `dispose` existente antes de `super.dispose()`, junto a los controladores. No hace falta un botón «Editar correo»: se puede tocar directamente el campo.

El formulario permanece en una lista desplazable para que el teclado no impida acceder a las selecciones ni a Login.

Referencia: [Foco y campos de texto](https://docs.flutter.dev/cookbook/forms/focus).
