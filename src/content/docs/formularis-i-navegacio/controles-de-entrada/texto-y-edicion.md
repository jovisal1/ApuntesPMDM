---
title: "TextFormField: texto y edición"
sidebar:
  order: 3
---

`TextFormField` es un campo de texto preparado para participar en `Form`. Combina la edición de `TextField` con el valor, la validación y el guardado de un `FormField<String>`. No tenemos que envolverlo en otro `FormField`.

## ✏️ Un campo concreto

Añade este ejemplo al `Column` interior del `Form` de la pantalla de demostración. Conserva los botones de la base:

```dart
TextFormField(
  initialValue: '',
  decoration: const InputDecoration(
    labelText: 'Nombre',
    hintText: 'Por ejemplo, Ana',
    helperText: 'Introduce al menos dos caracteres',
    prefixIcon: Icon(Icons.person_outline),
    border: OutlineInputBorder(),
  ),
  textInputAction: TextInputAction.next,
  validator: widget.viewModel.validarNombre,
  onSaved: (valor) => _borrador['nombre'] = (valor ?? '').trim(),
),
```

## Presentación, valor y acciones

| Propiedad | Papel en el campo |
| --- | --- |
| `decoration` | Etiqueta, ejemplo, ayuda, icono y borde. No constituye el valor escrito. |
| `initialValue` | Texto inicial cuando no se proporciona un controlador. |
| `validator` | Devuelve un error o `null`. Se consulta al validar; no debe guardar ni modificar datos. |
| `onSaved` | Recibe el valor al ejecutar `FormState.save()`. Aquí lo copia a `_borrador`. |
| `keyboardType` | Solicita un teclado adecuado; no valida el contenido. |
| `textInputAction` | Configura acciones del teclado como «Siguiente» o «Hecho». |

En el ejemplo, `trim()` elimina los espacios exteriores antes de comprobar y recoger el nombre. El texto de ayuda describe la regla; `validator` consulta `viewModel.validarNombre`, donde está escrita la comprobación.

## Controlar la edición desde código

Hasta ahora el campo gestiona el texto que escribe el usuario y `onSaved` nos entrega ese valor al recoger el formulario. Pero ¿cómo rellenar Nombre con «Ana» desde un botón, o vaciarlo sin reiniciar todos los campos?

Para esas operaciones utilizamos un **`TextEditingController`**. Es un objeto que se conecta al campo: permite leer su texto actual y cambiar el texto que aparece en pantalla. No dibuja nada ni sustituye al validador.

### 1. Crear el controlador una sola vez

En `controles_entrada_pantalla.dart`, añade este miembro a `_ControlesEntradaPantallaState`, junto a `_formKey` y `_borrador`, **fuera de `build`**:

```dart
final _nombreController = TextEditingController();
```

Se crea vacío y se conserva mientras exista el `State` de la pantalla. No lo crees dentro de `build`: una reconstrucción podría crear otro controlador y perder la edición actual.

### 2. Conectarlo al campo Nombre

En el `TextFormField` anterior, elimina `initialValue: ''` y añade `controller: _nombreController`. El campo queda así; puedes conservar la decoración más completa del primer ejemplo:

```dart
TextFormField(
  controller: _nombreController,
  decoration: const InputDecoration(
    labelText: 'Nombre',
    border: OutlineInputBorder(),
  ),
  textInputAction: TextInputAction.next,
  validator: widget.viewModel.validarNombre,
  onSaved: (valor) => _borrador['nombre'] = (valor ?? '').trim(),
),
```

Ahora, al escribir, el texto actual también está disponible en `_nombreController.text`. Si modificamos esa propiedad desde código, el campo muestra el nuevo contenido. La conexión funciona en ambos sentidos.

No combines `controller` e `initialValue`: cuando hay controlador, este proporciona el texto inicial. Por ejemplo, `TextEditingController(text: 'Ana')` crearía el campo con ese nombre; en nuestra demostración lo dejamos vacío.

### 3. Leer, rellenar y vaciar desde botones

Añade estos tres botones al `Column` exterior, después de los botones de la base. Los callbacks se ejecutan al pulsarlos:

```dart
TextButton(
  onPressed: () {
    final texto = _nombreController.text;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(texto.isEmpty ? 'Nombre vacío' : texto)),
    );
  },
  child: const Text('Leer nombre'),
),
TextButton(
  onPressed: () => _nombreController.text = 'Ana',
  child: const Text('Usar Ana'),
),
TextButton(
  onPressed: () => _nombreController.clear(),
  child: const Text('Vaciar nombre'),
),
```

- **Leer nombre** consulta `.text` y lo muestra en un `SnackBar`. No valida ni recoge el resto del formulario.
- **Usar Ana** asigna un texto nuevo a `.text`; verás «Ana» dentro del campo.
- **Vaciar nombre** llama a `clear()`; el campo queda vacío, sin modificar Turno ni la casilla.

No necesitas `setState()` para cambiar el texto del campo mediante su controlador. El propio campo escucha esos cambios. Las reglas siguen en el ViewModel y `onSaved` sigue funcionando: al pulsar «Comprobar y recoger» recibirá el texto actual, tanto si lo escribió el usuario como si lo rellenó un botón.

Cambiar el texto no ejecuta `onSaved` ni actualiza los datos recogidos anteriormente. Para entregar el valor nuevo al ViewModel hay que volver a pulsar «Comprobar y recoger».

### 4. Liberar el controlador al salir

Añade este método al `State`. Si ya tiene un `dispose()`, incorpora la llamada al existente en lugar de declarar otro:

```dart
@override
void dispose() {
  _nombreController.dispose();
  super.dispose();
}
```

El controlador es un recurso de edición de la View. Lo crea la pantalla y lo libera cuando su `State` se retira definitivamente; no lo pasamos al ViewModel.

**Comprueba la conexión:** escribe un nombre y pulsa «Leer nombre». Después pulsa «Usar Ana» y observa el campo. Por último pulsa «Vaciar nombre» y «Comprobar y recoger»: debe aparecer el error de nombre obligatorio de al menos dos caracteres.

:::note[TextField no equivale a TextFormField]
Un `TextField` sirve para editar texto, pero no se registra por sí solo como campo del `Form`. Utiliza `TextFormField` cuando necesites esa integración con `validator` y `onSaved`.
:::

Pulsa «Comprobar y recoger» con el nombre vacío, después escribe `Ana` y repite. Finalmente reinicia: el campo debe regresar a su texto inicial. La demostración no tiene autovalidación; el error se comprueba al pulsar el botón.

Referencias: [TextFormField](https://api.flutter.dev/flutter/material/TextFormField-class.html) y [TextEditingController](https://api.flutter.dev/flutter/widgets/TextEditingController-class.html).
