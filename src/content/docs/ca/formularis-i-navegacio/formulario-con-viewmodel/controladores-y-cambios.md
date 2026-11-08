---
title: "6. Connectar els controladors"
sidebar:
  order: 7
---

Els controladors pertanyen a la vista: conserven el text editable i permeten llegir-lo sense fer que el domini conega Flutter. Utilitzarem listeners per a comunicar els canvis al ViewModel; no afegirem botons per a llegir o omplir els camps.

Dins de `_InscripcionPantallaState`, afegix estos membres i mètodes. Substituïx qualsevol `initState` o `dispose` anterior; no declares dos versions. El pas de neteja reutilitzarà estos controladors.


```dart
bool _limpiando = false;
  late final TextEditingController _nombreController;
  late final TextEditingController _correoController;

  @override
  void initState() {
    super.initState();
    _nombreController = TextEditingController(text: widget.viewModel.nombre);
    _correoController = TextEditingController(text: widget.viewModel.correo);
    _nombreController.addListener(_actualizarNombre);
    _correoController.addListener(_actualizarCorreo);
  }

  void _actualizarNombre() {
    if (!_limpiando && _nombreController.text != widget.viewModel.nombre) {
      widget.viewModel.cambiarNombre(_nombreController.text);
    }
  }

  void _actualizarCorreo() {
    if (!_limpiando && _correoController.text != widget.viewModel.correo) {
      widget.viewModel.cambiarCorreo(_correoController.text);
    }
  }

  @override
  void dispose() {
    _nombreController.dispose();
    _correoController.dispose();
    super.dispose();
  }
```

`initState` crea cada controlador una vegada i inicialitza el text amb el ViewModel. `addListener` executa el mètode registrat quan canvia el controlador, fins i tot si el canvi es produïx des de codi. Com que també pot notificar canvis de selecció, comparem el text abans de comunicar una edició.

En els camps, substituïx `initialValue` per `controller: _nombreController` i `controller: _correoController`, respectivament. Elimina els dos `onChanged`: els listeners ja fan eixa comunicació. Conserva els validadors, el desplegable i la casella.

`dispose` allibera els controladors quan la pantalla deixa d’utilitzar-se. Els controls i els listeners continuen en `ui`; al repositori només arriben cadenes a través del ViewModel en polsar Login.

`_limpiando` evita comunicar canvis intermedis mentre el botó Limpiar buida els dos controladors. En acabar, el ViewModel notificarà un únic estat net. L’acció s’explica en el pas 8.
