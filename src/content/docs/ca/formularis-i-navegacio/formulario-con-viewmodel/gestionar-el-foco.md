---
title: "7. Gestionar el focus"
sidebar:
  order: 8
---

El focus identifica quin camp rep l’escriptura. Nombre oferirà «Següent» per a passar a Correo; en Correo, «Fet» retirarà el teclat per a triar taller i recordatori. La consulta es fa únicament en polsar Login.

Afegix al `State` un `FocusNode` per a Correo:


```dart
final _correoFocus = FocusNode();
```

En Nombre afegix estes propietats:
```dart
textInputAction: TextInputAction.next,
onFieldSubmitted: (_) => _correoFocus.requestFocus(),
```

En Correo afegix estes propietats:
```dart
focusNode: _correoFocus,
textInputAction: TextInputAction.done,
onFieldSubmitted: (_) => FocusScope.of(context).unfocus(),
```

`requestFocus()` mou el teclat a Correo i `unfocus()` retira el focus actual. No envien el formulari. Afegix `_correoFocus.dispose();` al `dispose` existent abans de `super.dispose()`, al costat dels controladors. No cal un botó «Editar correo»: es pot tocar directament el camp.

El formulari continua en una llista desplaçable perquè el teclat no impedisca accedir a les seleccions ni a Login.

Referència: [Focus i camps de text](https://docs.flutter.dev/cookbook/forms/focus).
