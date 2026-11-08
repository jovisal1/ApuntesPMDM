---
title: "8. Limpiar el formulario"
sidebar:
  order: 9
---

Login comprueba los datos; **Limpiar** permite empezar otra vez sin salir de la pantalla. Debe vaciar nombre y correo, quitar el taller, desmarcar el recordatorio y retirar todos los errores. La fuente y la lista de talleres se conservan.

## Restablecer el ViewModel

`limpiar()` ya está en el ViewModel del paso 2. Asigna los valores iniciales a sus cinco campos y llama una vez a `notifyListeners()`. No accede a los controladores ni al `Form`, porque pertenecen a la vista.

## Vaciar los controles y sus errores

En el `State`, la clave se declara como `GlobalKey<FormState> _formKey = GlobalKey<FormState>();`, sin `final`: la sustituiremos al limpiar. Añade este método antes de `build`:


```dart
void _limpiar() {
    _limpiando = true;
    _nombreController.clear();
    _correoController.clear();
    widget.viewModel.limpiar();
    setState(() {
      _intentoLogin = false;
      _formKey = GlobalKey<FormState>();
    });
    _limpiando = false;
  }
```

`clear()` vacía los textos visibles; `_limpiando` evita que sus listeners comuniquen estados intermedios. El ViewModel limpia sus valores y el error de consulta. `setState` desactiva la validación automática y asigna una clave nueva: Flutter crea un estado nuevo del `Form` y sus campos, sin errores ni interacciones previas. El desplegable vuelve a su `initialValue`, ahora `null`.

¿Por qué no basta con limpiar el ViewModel? Los controladores y el estado interno del desplegable y del `Form` seguirían conservando valores o mensajes anteriores. Aquí regeneramos ese estado de una vez; no usamos solamente `FormState.reset()`, que vuelve a los valores iniciales de cada campo y no limpia por sí solo el estado externo del ViewModel.

Añade el botón debajo de Login:


```dart
OutlinedButton.icon(
  onPressed: _limpiar,
  icon: const Icon(Icons.restart_alt),
  label: const Text('Limpiar'),
),
```

Prueba Limpiar antes y después de un Login incorrecto. La pantalla debe quedar vacía y sin mensajes; el siguiente Login con datos vacíos debe volver a mostrar los errores.
