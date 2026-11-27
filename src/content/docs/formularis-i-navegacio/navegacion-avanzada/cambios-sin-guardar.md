---
title: "8. Cambios sin guardar al volver"
sidebar:
  order: 8
---

En este paso evitamos que se pierdan los datos de un formulario sin querer. Si alguien escribe en Login y pulsa la flecha de volver o el botón Atrás de Android, la aplicación preguntará antes de salir. Si el formulario está vacío, saldrá sin preguntar.

Usaremos **`PopScope`**, un widget que decide si la página puede cerrarse con un retroceso y avisa cuando se intenta. El formulario de Login ya existe desde el paso 6; solo añadimos la comprobación de cambios, el diálogo y el `PopScope`.

Archivos de este paso:

```text
lib/
  ui/
    inscripcion/
      view_models/inscripcion_viewmodel.dart   ← indica si hay cambios
      ui/dialogos.dart                         ← nuevo diálogo de descarte
      ui/inscripcion_pantalla.dart             ← PopScope alrededor del Scaffold
```

## Qué intercepta `PopScope`

Un **retroceso** es una petición de cerrar la página actual. Llega desde la flecha de la `AppBar`, desde el botón o el gesto Atrás de Android y desde `Navigator.maybePop`. `PopScope` responde a todos ellos con dos propiedades. Este fragmento solo muestra su estructura; no hay que copiarlo todavía. En el apartado 3 lo colocaremos alrededor del `Scaffold` del formulario:

```dart
PopScope<Object?>(
  canPop: true,          // false bloquea el retroceso
  onPopInvokedWithResult: (didPop, result) {
    // Se llama después de cada intento.
    // didPop indica si la página se ha cerrado.
  },
  child: ...,
)
```

- Con **`canPop: true`** la página se cierra como siempre y `didPop` vale `true`.
- Con **`canPop: false`** la página no se cierra y `didPop` vale `false`. Es el momento de preguntar y, si la respuesta es afirmativa, cerrarla nosotros.

`PopScope` solo actúa sobre los retrocesos. Una navegación con `context.go`, un cambio de rama en la barra inferior o una redirección del router **no** pasan por él: si una de esas acciones puede descartar datos, pide confirmación antes de llamarla. Tampoco intercepta el botón Atrás del navegador web, que cambia la dirección directamente.

## 1. El ViewModel sabe si hay cambios

Hay cambios cuando algún valor es distinto del inicial. Los valores iniciales son los mismos que restablece `limpiar()`.

En `lib/ui/inscripcion/view_models/inscripcion_viewmodel.dart`, añade este getter debajo de los demás:

```dart
bool get tieneCambios =>
    _nombre.isNotEmpty ||
    _correo.isNotEmpty ||
    _tallerId != null ||
    _recordatorio;
```

El ViewModel no muestra diálogos ni navega: solo informa. Como cada método `cambiar...` llama a `notifyListeners()`, la vista sabrá en todo momento si debe proteger la salida.

## 2. El diálogo de descarte

En `lib/ui/inscripcion/ui/dialogos.dart`, el archivo de la unidad de [diálogos](../../navegacion/dialogos/), añade esta función:

```dart
Future<bool?> confirmarDescarte(BuildContext context) {
  return showDialog<bool>(
    context: context,
    builder: (dialogContext) => AlertDialog(
      title: const Text('¿Descartar los cambios?'),
      content: const Text('Si sales ahora, se perderán los datos escritos.'),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(dialogContext).pop(false),
          child: const Text('Seguir editando'),
        ),
        FilledButton(
          onPressed: () => Navigator.of(dialogContext).pop(true),
          child: const Text('Descartar cambios'),
        ),
      ],
    ),
  );
}
```

Las etiquetas explican la consecuencia de cada botón. Solo «Descartar cambios» devuelve `true`; «Seguir editando» y tocar fuera del diálogo dejan el formulario como estaba.

## 3. Proteger la salida con `PopScope`

En `lib/ui/inscripcion/ui/inscripcion_pantalla.dart`, comprueba que importas `dialogos.dart` y añade este método antes de `build`:

```dart
Future<void> _intentarSalir(bool didPop, Object? result) async {
  if (didPop) return;
  final descartar = await confirmarDescarte(context);
  if (!mounted || descartar != true) return;
  Navigator.of(context).pop(result);
}
```

Después envuelve el `Scaffold` de `build`. El `Scaffold` que ya tenías pasa a ser el `child` del `ListenableBuilder`:

```dart
@override
Widget build(BuildContext context) {
  final vm = widget.viewModel;
  final colores = Theme.of(context).colorScheme;
  return ListenableBuilder(
    listenable: vm,
    builder: (context, child) => PopScope<Object?>(
      canPop: !vm.tieneCambios,
      onPopInvokedWithResult: _intentarSalir,
      child: child!,
    ),
    child: Scaffold(
      // ... el mismo Scaffold de antes, sin cambios
    ),
  );
}
```

Cómo funciona:

- **`canPop: !vm.tieneCambios`**: con el formulario vacío la página se cierra sin preguntar. En cuanto se escribe algo, el retroceso queda bloqueado.
- **`ListenableBuilder`** vuelve a construir el `PopScope` cada vez que el ViewModel notifica, para que `canPop` siga siempre el estado actual. El `Scaffold` se pasa como `child`, así que no se reconstruye por esto.
- **`_intentarSalir`** solo actúa cuando el retroceso se ha bloqueado (`didPop` es `false`). Si se acepta el descarte, cierra la página con `Navigator.of(context).pop`. Esta llamada no consulta `canPop`, por lo que no vuelve a abrir el diálogo.
- **`mounted`** se comprueba después del `await`, como en los diálogos: mientras el diálogo estaba abierto, la página podría haber desaparecido.

El mismo formulario se usa en la ruta `/login` y en la demo antigua abierta con `Navigator.push`. `Navigator.of(context).pop` funciona en los dos casos: go_router actualiza la ubicación cuando se cierra una de sus páginas.

Un login correcto no muestra el diálogo aunque haya cambios. En `/login`, el router sustituye la página por Cuenta mediante `redirect`, y eso no es un retroceso.

## 4. Reutilizar el diálogo al limpiar

Limpiar también descarta lo escrito. Sustituye el `onPressed` del botón Limpiar para preguntar solo cuando hay cambios:

```dart
onPressed: () async {
  if (widget.viewModel.tieneCambios) {
    final descartar = await confirmarDescarte(context);
    if (!context.mounted || descartar != true) return;
  }
  _limpiar();
},
```

## Probar

Haz **hot restart** y abre Login desde **Mi cuenta protegida**:

| Situación | Resultado esperado |
| --- | --- |
| Formulario vacío y flecha de volver | Vuelve al catálogo sin preguntar. |
| Escribir un nombre y pulsar la flecha de volver | Aparece «¿Descartar los cambios?». |
| Elegir «Seguir editando» | El diálogo se cierra y el nombre sigue escrito. |
| Elegir «Descartar cambios» | Vuelve al catálogo. Al abrir Login de nuevo, el formulario está vacío. |
| Botón o gesto Atrás de Android con cambios | El mismo diálogo que con la flecha. |
| Login correcto con cambios | Abre Cuenta sin preguntar. |
| Limpiar con cambios | Pregunta antes de vaciar el formulario. |
| Login de demostración (entrada antigua) con cambios | También pregunta antes de volver al catálogo. |

Referencias: [PopScope](https://api.flutter.dev/flutter/widgets/PopScope-class.html) y [retroceso predictivo en Android](https://docs.flutter.dev/release/breaking-changes/android-predictive-back).
