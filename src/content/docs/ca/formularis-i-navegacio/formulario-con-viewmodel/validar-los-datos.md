---
title: "4. Connectar la validació"
sidebar:
  order: 5
---

Diferenciarem dos errors: el format dels camps i l’absència d’una fitxa que coincidisca. Els primers apareixen al costat de cada camp amb `validator`; l’error de consulta apareixerà damunt de Login. Cap d’ells obri el detall.

## Connectar els camps amb les regles

El ViewModel ja conté `validarNombre` i `validarCorreo`. Retornen un text si hi ha un problema i `null` si s’accepta la dada. Nombre exigix dos caràcters sense comptar espais exteriors. L’expressió regular del correu comprova un format bàsic; no garantix que existisca en la font.

Afegix estes propietats als dos `TextFormField` existents, sense duplicar-los:


```dart
// Nombre
validator: vm.validarNombre,

// Correo
validator: vm.validarCorreo,
```

En el `Form`, afegix `autovalidateMode: AutovalidateMode.onUserInteraction`. Així els errors s’actualitzen en interactuar i corregir els camps. En polsar Login cridarem també `validate()` per a comprovar-los tots, encara que algun no s’haja tocat.

## Comprovar la selecció i la fitxa

`validarTaller` exigix que l’identificador existisca en `vm.talleres`: no basta rebre un text qualsevol. La casella és opcional, per tant `false` no produïx error.

`login()` torna a comprovar estes regles per a protegir l’acció quan s’utilitza sense la vista. Només després crida `buscarUsuario(nombre, correo)`. Per exemple, `Ana` i `pau@centro.es` tenen format correcte però no pertanyen a la mateixa fitxa. El repositori retorna `null`, el ViewModel assigna `error` i crida `notifyListeners()`. Una edició esborra eixe missatge antic; un nou Login torna a consultar.

No afegim una segona còpia de les regles al widget ni una llista d’usuaris al ViewModel. Continua amb [les opcions del formulari](../selecciones-y-saludo/).
