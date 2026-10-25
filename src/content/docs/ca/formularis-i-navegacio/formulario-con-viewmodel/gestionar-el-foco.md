---
title: "6. Gestionar el focus"
sidebar:
  order: 7
---

Ara facilitarem el recorregut en omplir la inscripció: començar a escriure en Nombre, passar a Correo i tornar a editar-lo quan siga necessari. El camp que rep l’escriptura en cada moment és el que té el focus.

En `inscripcion_pantalla.dart` usarem `autofocus` per al camp inicial i un `FocusNode` per a identificar Correo. Després connectarem l’acció «Siguiente» del teclat i el botó «Editar correo» amb eixe camp.

:::tip[Què aconseguirem]
En provar el muntatge final, Nombre rebrà el focus inicial i podràs passar a Correo sense haver de tocar-lo. El botó «Editar correo» permetrà recuperar el focus en eixe camp.
:::

## ⌨️ 1. Triar el camp inicial

Afig `autofocus: true` al `TextFormField` de Nombre. En obrir esta pantalla podrà rebre l’escriptura sense tocar-lo abans. Només usarem focus automàtic en eixe camp.

## 2. Identificar el camp de correu

Afig este membre al `State`, fora de `build`:

```dart
final _correoFocus = FocusNode();
```

En el camp Correo afig `focusNode: _correoFocus`. En el `dispose()` existent afig `_correoFocus.dispose();` abans de `super.dispose()`, al costat de l’alliberament dels controladors. No declares un segon `dispose()`.

## 3. Donar-li el focus des d’un botó

Afig a `children`, al costat dels altres botons:

```dart
TextButton(
  onPressed: () => _correoFocus.requestFocus(),
  child: const Text('Editar correo'),
),
```

`requestFocus()` sol·licita que Correo reba el teclat. També pots afegir `onFieldSubmitted: (_) => _correoFocus.requestFocus()` a Nombre, amb `textInputAction: TextInputAction.next`, per a passar al correu des del teclat.

El mètode `_previsualizar()` ja usa `FocusScope.of(context).unfocus()` per a retirar el focus abans de comprovar les dades. El focus, els controladors i els recursos es gestionen en la pantalla; les regles del formulari continuen en el ViewModel.

:::note[Prova el recorregut]
Reinicia l’aplicació per a observar `autofocus`. Escriu el nom, usa «Siguiente», edita el correu i prem «Previsualizar». Després prem «Editar correo»: el cursor ha de tornar a eixe camp.
:::

Referència: [Focus i camps de text](https://docs.flutter.dev/cookbook/forms/focus).
