---
title: "3. Comprovar les dades"
sidebar:
  order: 4
---

Ja arrepleguem el nom i el correu, però l’usuari pot deixar-los buits o escriure dades incorrectes. En este pas definirem què acceptem: un nom d’almenys dos caràcters sense comptar els espais exteriors i un correu amb un format bàsic.

Afegirem dos mètodes de validació a `InscripcionViewModel` i els connectarem a la propietat `validator` de cada camp. La regla de Nombre és la mateixa que ja coneixem; afegim ara la comprovació del correu.

:::tip[Què aconseguirem]
En acabar estaran preparades les regles i els missatges. S’executaran en sol·licitar la validació des del botó que incorporarem després.
:::

Dins d’`InscripcionViewModel`, afig estos dos mètodes, abans de la clau final de la classe:

```dart
  String? validarNombre(String? valor) {
    if ((valor ?? '').trim().length < 2) {
      return 'Introduce al menos dos caracteres';
    }
    return null;
  }

  String? validarCorreo(String? valor) {
    final correo = (valor ?? '').trim();
    if (!RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$').hasMatch(correo)) {
      return 'Introduce un correo con formato nombre@dominio.ext';
    }
    return null;
  }

```

La novetat és `RegExp` en `validarCorreo`: exigix text abans i després d’`@`, seguit d’un punt i una extensió, sense espais interiors. És una comprovació bàsica de format; no confirma que l’adreça existisca.

Afig `validator: widget.viewModel.validarNombre` al camp Nombre i `validator: widget.viewModel.validarCorreo` al camp Correo. Així cada camp sap quina comprovació executar.
