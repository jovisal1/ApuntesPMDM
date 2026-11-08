---
title: "6. Conectar los controladores"
sidebar:
  order: 7
---

Los controladores pertenecen a la vista: conservan el texto editable y permiten leerlo sin hacer que el dominio conozca Flutter. Utilizaremos listeners para comunicar los cambios al ViewModel; no añadiremos botones para leer o rellenar los campos.

Dentro de `_InscripcionPantallaState`, añade estos miembros y métodos. Sustituye cualquier `initState` o `dispose` anterior; no declares dos versiones. El paso de limpieza reutilizará estos controladores.


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

`initState` crea cada controlador una vez e inicializa su texto con el ViewModel. `addListener` ejecuta el método registrado al cambiar el controlador, incluso si el cambio se produce desde código. Como también puede notificar cambios de selección, comparamos el texto antes de comunicar una edición.

En los campos, sustituye `initialValue` por `controller: _nombreController` y `controller: _correoController`, respectivamente. Elimina sus dos `onChanged`: los listeners ya realizan esa comunicación. Conserva los validadores, el desplegable y la casilla.

`dispose` libera los controladores cuando la pantalla deja de utilizarse. Los controles y sus listeners siguen en `ui`; al repositorio solo llegan cadenas a través del ViewModel al pulsar Login.

`_limpiando` evita comunicar cambios intermedios mientras el botón Limpiar vacía los dos controladores. Al terminar, el ViewModel notificará un único estado limpio. La acción se explica en el paso 8.
