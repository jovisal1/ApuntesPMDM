---
title: "Form y FormState"
sidebar:
  order: 2
---

`Form` es la agrupación visual; `FormState` es el objeto que coordina sus campos. Flutter crea el estado al incorporar el formulario al árbol: no necesitamos construir un `FormState` manualmente.

## 🧩 Form: agrupar campos

La base del catálogo contiene esta estructura. Los campos se añadirán a la lista interior; los botones pueden estar fuera del `Form` porque acceden a su estado mediante la clave:

```dart
Form(
  key: _formKey,
  child: Column(
    children: [
      // Campos que participan en el formulario.
    ],
  ),
)
```

## FormState: acceder con una clave

Este miembro se declara en el `State` de nuestra pantalla, fuera de `build`:

```dart
final _formKey = GlobalKey<FormState>();
```

La clave identifica ese `Form` y `_formKey.currentState` permite obtener su `FormState` cuando está montado. Puede ser `null` antes de construirlo o después de retirarlo. Conservar la clave evita perder la asociación al reconstruir la pantalla. La clave no guarda los textos ni es el estado del formulario: permite acceder a él.

## Tres operaciones distintas

| Operación sobre `FormState` | Efecto en los campos registrados |
| --- | --- |
| `validate()` | Ejecuta los `validator`, actualiza los errores y devuelve si todos son válidos. |
| `save()` | Ejecuta el `onSaved` de cada campo con su valor actual. |
| `reset()` | Devuelve cada campo a su valor inicial y reinicia su estado de interacción y error; la autovalidación puede volver a mostrar errores. |

Este es el recorrido que ya usa `_recogerDatos()` en la base:

```dart
final formulario = _formKey.currentState;
if (formulario == null || !formulario.validate()) return;
_borrador.clear();
formulario.save();
widget.viewModel.guardarDatos(_borrador);
```

El botón realiza dos tareas en orden. Primero, `validate()` pregunta a cada campo si su valor cumple las reglas de su `validator`. Si encuentra un error, lo muestra y el `return` detiene el método: las líneas siguientes no se ejecutan y el resultado anterior del ViewModel permanece sin cambios.

Si todos los campos son válidos, vaciamos `_borrador` y llamamos a `save()`. Esta llamada ejecuta el `onSaved` de cada campo. Esos callbacks copiarán los valores al mapa, como veremos a continuación. **Validar comprueba; guardar ejecuta los callbacks que recogen los valores.** Por eso llamamos a los dos métodos: ejecutar solo `save()` permitiría recoger valores que no hemos comprobado.

En este ejemplo, «guardar» significa conservar una copia en memoria. Para almacenar los datos en un archivo, una base de datos o un servidor necesitaríamos programar esa operación aparte.

Después de `save()`, `guardarDatos(_borrador)` entrega los valores a `ElementosFormularioViewModel`. Este los conserva en su mapa privado `_datos`; la View solo puede leerlos mediante `datos`.

## Cómo llega el valor de cada campo a `_borrador`

`_borrador` es un mapa que hemos creado nosotros en el `State` de la pantalla:

```dart
final _borrador = <String, Object?>{};
```

Cada entrada relaciona una clave de texto, como `'nombre'`, con un valor. El tipo `Object?` permite recoger datos distintos: un nombre de tipo `String`, una condición de tipo `bool` o un valor nulo. `final` impide sustituir el mapa por otro, pero permite añadir, cambiar o borrar sus entradas.

**Flutter no asocia automáticamente ese mapa con los campos.** La asociación la escribimos en el `onSaved` de cada uno. Por ejemplo, estos son los callbacks que utilizaremos en Nombre y Turno:

```dart
// Dentro del TextFormField de Nombre:
onSaved: (valor) {
  _borrador['nombre'] = (valor ?? '').trim();
},

// Dentro del DropdownButtonFormField<String> de Turno:
onSaved: (valor) {
  _borrador['turno'] = valor;
},
```

En cada callback, `valor` es el dato actual de **ese campo**. La asignación decide dónde copiarlo: Nombre escribe en `_borrador['nombre']` y Turno en `_borrador['turno']`. Ambos callbacks pueden acceder a `_borrador` porque construimos los campos dentro del mismo `State` que declara el mapa.

Las claves `'nombre'` y `'turno'` las elegimos nosotros: no se deducen de `labelText`, del nombre de una variable ni de la clave del formulario. Utiliza una clave distinta para cada dato que quieras conservar; si dos campos escriben en la misma, una asignación sobrescribirá la otra.

### Qué ocurre al pulsar «Comprobar y recoger»

1. Mientras escribes, cada campo mantiene su valor; `_borrador` todavía no recibe esos cambios.
2. `validate()` comprueba los campos. Si alguno falla, el método termina sin recogerlos.
3. Si todos son válidos, `_borrador.clear()` prepara el mapa temporal para la nueva recogida.
4. `formulario.save()` ejecuta el `onSaved` de cada campo registrado.
5. Cada callback copia su valor a la entrada que hemos indicado, y después entregamos el borrador al ViewModel, que guarda su copia. La View lee `viewModel.datos` y muestra un `SnackBar` con esos valores.

Por ejemplo, con el nombre «Ana» y el turno de tarde, el mapa contendrá:

```dart
{
  'nombre': 'Ana',
  'turno': 'tarde',
}
```

:::tip[El enlace está en onSaved]
El formulario sabe qué campos tiene registrados, pero no conoce nuestro mapa `_borrador`. `save()` llama a sus callbacks; **el código que escribimos dentro de cada `onSaved` es el que copia el dato**. Un campo sin ese callback no añadirá ninguna entrada al mapa.
:::

Si editas un campo después de recoger los datos, el ViewModel conserva el resultado anterior hasta que vuelvas a pulsar el botón. El borrador solo se rellena durante `save()`; no es una conexión permanente con el texto del campo.

## Qué reinicia cada instrucción

Después de recoger los datos existen dos lugares con información: **los campos que vemos en pantalla** y **el resultado guardado en el ViewModel**; además, la View utiliza `_borrador` durante la recogida. El botón «Reiniciar campos» debe restablecer los campos, vaciar el borrador y pedir al ViewModel que borre el resultado:

```dart
void _reiniciar() {
  _formKey.currentState?.reset(); // Restablece los campos del formulario.
  _borrador.clear();                // Vacía la recogida temporal.
  widget.viewModel.reiniciar();     // Borra el resultado del ViewModel.
  ScaffoldMessenger.of(context).hideCurrentSnackBar();
}
```

`reset()` devuelve cada campo a su valor inicial: por ejemplo, Nombre vuelve a estar vacío y la casilla vuelve a estar desmarcada. También reinicia su estado de interacción y error; si hay autovalidación, esta puede volver a mostrar errores. Sin embargo, el mapa es una variable que hemos creado nosotros: el formulario no conoce las asignaciones que hicimos en `onSaved`, así que no puede deshacerlas. Por eso vaciamos el borrador y llamamos explícitamente a `viewModel.reiniciar()`.

## Qué ocurre mientras el formulario está vacío

La pantalla base todavía no contiene campos. Si pulsas «Comprobar y recoger», `validate()` no encuentra ninguna regla que incumplir y devuelve `true`; el ViewModel recibirá un mapa vacío y el `SnackBar` mostrará `Valores recogidos: {}`. Eso no comprueba que se haya escrito un nombre: todavía no hemos añadido el campo ni su regla.

Cuando incorpores el `TextFormField` del siguiente apartado, su `validator` rechazará el nombre vacío. Al pulsar el mismo botón, aparecerá el error y el método terminará antes de llamar a `save()`.

## Otra forma de acceder a FormState

En estos ejemplos usamos `_formKey.currentState` porque nuestros botones están fuera del `Form`. La clave permite localizar su estado desde esos botones.

Si un botón se construye **dentro del formulario**, puede obtener el estado mediante `Form.of(context)`. Esta llamada busca un `Form` entre los antecesores del widget al que pertenece ese `context`. Por ejemplo:

```dart
Form(
  child: Builder(
    builder: (contextoDelFormulario) => FilledButton(
      onPressed: () {
        Form.of(contextoDelFormulario).validate();
      },
      child: const Text('Comprobar'),
    ),
  ),
)
```

Aquí `Builder` nos proporciona un contexto situado dentro de `Form`. El contexto del `build` de la pantalla está por encima del formulario que devuelve, por lo que no serviría para encontrarlo con `Form.of`. Este fragmento solo ilustra esa diferencia: **en la demostración del catálogo conservamos la clave y los botones de la base**.

Referencias: [Form](https://api.flutter.dev/flutter/widgets/Form-class.html) y [FormState](https://api.flutter.dev/flutter/widgets/FormState-class.html).
