---
title: "5. Leer y modificar los campos"
sidebar:
  order: 6
---

Hasta ahora recogíamos la escritura con `onChanged`. Vamos a ampliar la edición para poder consultar el correo al pulsar un botón y rellenarlo con un valor de ejemplo desde el código.

Aplicaremos los controladores que ya probamos en [Texto y edición](../../controles-de-entrada/texto-y-edicion/). La novedad será `addListener`: mantendrá el ViewModel sincronizado incluso cuando un botón cambie el texto desde código.

:::tip[Qué conseguiremos]
Al integrar estos cambios podrás leer el correo actual y cambiarlo desde un botón. Tanto la escritura como los cambios desde código actualizarán el dato que se usa para previsualizar.
:::

## 🎛️ 1. Crear y escuchar los controladores

Añade estos miembros a `_InscripcionPantallaState`, junto a `_formKey`. Los inicializamos con los valores del ViewModel y registramos un listener por campo:

```dart
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
  final texto = _nombreController.text;
  if (texto != widget.viewModel.nombre) {
    widget.viewModel.cambiarNombre(texto);
  }
}

void _actualizarCorreo() {
  final texto = _correoController.text;
  if (texto != widget.viewModel.correo) {
    widget.viewModel.cambiarCorreo(texto);
  }
}

@override
void dispose() {
  _nombreController.dispose();
  _correoController.dispose();
  super.dispose();
}
```

`addListener` registra el método que se ejecutará cuando el controlador notifique un cambio. También puede notificar cambios de selección; la comparación evita tratar como texto nuevo un simple movimiento del cursor.

## 2. Conectarlos a los campos

En Nombre sustituye `initialValue` por `controller: _nombreController`; en Correo, por `controller: _correoController`. **Elimina los dos `onChanged`**: los listeners ya comunican el texto al ViewModel. Conserva las decoraciones y los validadores.

:::tip[Dos formas de observar la edición]
El paso 2 utiliza `onChanged` para la escritura del usuario. Aquí lo sustituimos por `addListener`, que también observa cambios realizados desde código. No mantengas ambas conexiones para ejecutar dos veces la misma actualización.
:::

## 3. Leer el contenido al pulsar un botón

Añade este método al `State`:

```dart
void _leerCorreo() {
  final correo = _correoController.text;
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text(correo.isEmpty ? 'Correo vacío' : correo)),
  );
}
```

Después del botón de previsualizar, añade `TextButton(onPressed: _leerCorreo, child: const Text('Leer correo'))`. Prueba a escribir un correo y leerlo sin previsualizar: `.text` devuelve el contenido actual aunque todavía no sea válido.

## 4. Modificar el campo desde código

Para probar la diferencia con `onChanged`, añade también este botón:

```dart
TextButton(
  onPressed: () => _correoController.text = 'ana@centro.es',
  child: const Text('Usar correo de ejemplo'),
),
```

El listener actualiza el ViewModel y descarta el resumen anterior. No cambies `.text` dentro del propio listener: podrías generar notificaciones repetidas.

Referencias: [Detectar cambios](https://docs.flutter.dev/cookbook/forms/text-field-changes) y [Recuperar el texto](https://docs.flutter.dev/cookbook/forms/retrieve-input).
