---
title: "Campos de selección y FormField"
sidebar:
  order: 4
---

Además del texto, un formulario puede pedir que el usuario **elija una opción** o **acepte una condición**. Vamos a añadir Turno y Acepto las condiciones a la pantalla de demostración del catálogo, después del campo Nombre.

Los dos participarán en las mismas operaciones: `validate()` comprobará sus reglas, `save()` recogerá sus valores en `_borrador` y `reset()` recuperará la selección inicial. La diferencia está en cómo los construimos:

- Para Turno usaremos **`DropdownButtonFormField<String>`**, que ya incorpora el comportamiento de un campo de formulario.
- Para las condiciones combinaremos **`FormField<bool>` y `CheckboxListTile`**: el primero gestiona el campo; el segundo dibuja la casilla.

## 🔽 1. Utilizar un campo que ya viene preparado

Añade este desplegable al `children` del `Column` que está dentro del `Form` de `controles_entrada_pantalla.dart`. Conserva Nombre y los botones de la base:

```dart
DropdownButtonFormField<String>(
  initialValue: null,
  decoration: const InputDecoration(labelText: 'Turno'),
  items: const [
    DropdownMenuItem(value: 'manana', child: Text('Mañana')),
    DropdownMenuItem(value: 'tarde', child: Text('Tarde')),
  ],
  onChanged: (valor) {},
  validator: widget.viewModel.validarTurno,
  onSaved: (valor) => _borrador['turno'] = valor,
),
```

`String` es el tipo de la selección. Cada `DropdownMenuItem` separa el valor que recogemos (`'manana'` o `'tarde'`) del texto mostrado («Mañana» o «Tarde»).

`initialValue: null` deja el campo sin selección. Al elegir, el widget actualiza su valor interno. El `onChanged` vacío lo mantiene habilitado, aunque aquí no necesitamos realizar ninguna acción adicional en ese momento; ponerlo a `null` lo deshabilitaría.

El `validator` recibe la selección actual y exige que no sea nula. Cuando el formulario llama a `save()`, `onSaved` la copia a `_borrador['turno']`. El campo ya sabe mostrar el error: no tenemos que construir ese texto ni añadir otro `FormField` alrededor.

**Pruébalo:** pulsa «Comprobar y recoger» sin elegir turno y observa el error. Elige uno y repite con Nombre válido: aparecerá en el mapa recogido.

## 2. Entender qué le falta a una casilla

`CheckboxListTile` permite marcar una casilla, pero no es un `FormField`. Colocarlo dentro de `Form` no le añade automáticamente `validator`, `onSaved` ni reinicio coordinado.

Para conseguirlo utilizamos `FormField<bool>`. El tipo `bool` indica que el dato del campo será verdadero o falso. Este widget mantiene un **`FormFieldState<bool>`** con el valor y el error; su `builder` recibe ese estado y lo utiliza para construir la parte visual.

Al incorporarse al árbol, el campo se registra en el `Form` antecesor más cercano. Por eso el formulario podrá validarlo, guardarlo y reiniciarlo junto al nombre y el turno. `FormState` coordina el conjunto; `FormFieldState<bool>` gestiona esta casilla concreta.

## 3. Construir la casilla como un campo propio

Añade este bloque después del desplegable, dentro del mismo `Form`:

```dart
FormField<bool>(
  initialValue: false,
  validator: widget.viewModel.validarCondiciones,
  onSaved: (valor) => _borrador['condiciones'] = valor ?? false,
  builder: (campo) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      CheckboxListTile(
        title: const Text('Acepto las condiciones'),
        value: campo.value ?? false,
        onChanged: (valor) => campo.didChange(valor ?? false),
        controlAffinity: ListTileControlAffinity.leading,
      ),
      if (campo.hasError)
        Text(
          campo.errorText!,
          style: TextStyle(color: Theme.of(context).colorScheme.error),
        ),
    ],
  ),
),
```

### Seguir el cambio de valor

1. `initialValue: false` establece que la casilla empieza desmarcada.
2. `builder` recibe el estado y lo llamamos `campo`. Es un parámetro del callback, no una variable que debamos declarar aparte.
3. `value: campo.value ?? false` indica a la casilla qué selección mostrar.
4. Al pulsar, `onChanged` recibe el valor nuevo y llama a `campo.didChange(...)`.
5. `didChange` actualiza el valor del campo y solicita su reconstrucción. La casilla vuelve a dibujarse con esa selección.

Si cambiáramos solo una variable externa, el `FormField` no conocería el nuevo valor. **`didChange` es la conexión entre el control que toca el usuario y el campo que conoce el formulario.**

### Comprobar, mostrar el error y recoger

Cuando pulsamos «Comprobar y recoger», `validate()` consulta el `validator` del campo. Este devuelve `null` si la casilla está aceptada o un mensaje si no lo está.

El `if (campo.hasError)` añade el texto del error debajo de la casilla. `campo.errorText!` contiene el mensaje que devolvió el validador. Aquí construimos esa presentación nosotros; el desplegable y `TextFormField` ya la traen preparada.

Si todos los campos son válidos, `save()` ejecuta `onSaved` y copiamos la selección a `_borrador['condiciones']`. No necesitamos crear una clase nueva para esta demostración: `FormField<bool>` aporta el comportamiento y `CheckboxListTile` la presentación.

## Comprobar el conjunto en el catálogo

Con Nombre y Turno válidos, intenta recoger los datos sin aceptar las condiciones. Debe aparecer el error de la casilla. Acepta y vuelve a pulsar: el resultado mostrará el nombre, el turno y `condiciones: true`. Pulsa «Reiniciar campos»: Nombre quedará vacío, Turno sin selección y la casilla desmarcada; también se vaciará la copia `_borrador`.

Referencias: [DropdownButtonFormField](https://api.flutter.dev/flutter/material/DropdownButtonFormField-class.html) y [FormField](https://api.flutter.dev/flutter/widgets/FormField-class.html).
