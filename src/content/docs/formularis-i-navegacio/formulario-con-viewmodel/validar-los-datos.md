---
title: "4. Conectar la validación"
sidebar:
  order: 5
---

El formulario debe explicar qué necesita corregir la persona. Separaremos los errores de formato de cada campo del error de consulta del usuario. Los primeros se muestran bajo Nombre, Correo o Taller; el segundo se muestra cerca de Login.

## Por qué aparece el mensaje bajo el campo

`validarNombre` es una función del ViewModel: recibe un texto y devuelve un mensaje o `null`. **No dibuja nada ni muestra el error por sí misma.** Conectamos esa función al campo mediante `validator`:


```dart
TextFormField(
  initialValue: vm.nombre,
  decoration: const InputDecoration(labelText: 'Nombre'),
  onChanged: vm.cambiarNombre,
  validator: vm.validarNombre,
),
```

`validator: vm.validarNombre` entrega una referencia a la función; no la ejecuta al escribir esa línea. Cuando se valida el campo, Flutter la llama con su valor actual. El recorrido es:

1. Login llama a `_formKey.currentState?.validate()`.
2. `FormState` solicita la validación de todos sus campos.
3. El campo Nombre llama a `vm.validarNombre(valorActual)`.
4. Si recibe una cadena, la guarda en `FormFieldState.errorText`; `TextFormField` utiliza ese texto en su decoración y lo representa bajo el campo, con el estilo de error del tema.
5. Si recibe `null`, el campo es válido y retira el mensaje anterior. El `Form` devuelve `true` únicamente si no hay campos con error.

Por ejemplo, `A` devuelve «Introduce al menos dos caracteres»; `Ana` devuelve `null`. Llamar a `vm.validarNombre('A')` desde un test solo devuelve la cadena: no cambia el estado visual del campo. Tampoco hace falta `notifyListeners()` dentro del validador, porque Flutter gestiona y reconstruye el estado de validación del campo.

Añade `validator: vm.validarNombre` a Nombre y `validator: vm.validarCorreo` a Correo. El desplegable utilizará `vm.validarTaller`. La validación de correo comprueba formato básico, no que exista en la fuente.

## Configurar cuándo se valida

`autovalidateMode` controla las validaciones **automáticas**. `validate()` sigue funcionando al pulsar Login con cualquiera de estos modos.

| Modo | Cuándo aparece o se actualiza el error |
| --- | --- |
| `AutovalidateMode.disabled` | No valida automáticamente. El error se obtiene al llamar a `validate()`. |
| `AutovalidateMode.onUserInteraction` | Valida después de interactuar. En el `Form` es una política común: una edición puede hacer que se comprueben también otros campos. |
| `AutovalidateMode.always` | Valida al construir y reconstruir, incluso sin edición. Puede mostrar errores nada más abrir un formulario vacío. |

En nuestro ejemplo empezaremos con validación automática desactivada. Tras el primer Login, activaremos la actualización mientras se corrigen los datos. Añade al `State`:


```dart
bool _intentoLogin = false;
```

En el `Form`, añade esta propiedad:
```dart
autovalidateMode: _intentoLogin
    ? AutovalidateMode.onUserInteraction
    : AutovalidateMode.disabled,
```

En el paso de Login pondremos la variable a `true` mediante `setState` antes de llamar a `validate()`. Limpiar la devolverá a `false`. Si prefieres mostrar los mensajes **solo al pulsar Login**, utiliza siempre `AutovalidateMode.disabled`; los errores no se actualizarán al editar hasta la siguiente validación.

También existe `autovalidateMode` en cada campo. Si necesitas políticas distintas por campo, deja el `Form` en `disabled` y configura cada uno: así evitas que una validación automática del formulario compruebe todo el grupo.

## Configurar el texto y su aspecto

El contenido del mensaje se cambia en el `return` del validador. El aspecto pertenece a la vista: `InputDecoration.errorStyle` permite configurar el estilo y `errorMaxLines` permite envolver mensajes largos. Este fragmento de decoración utiliza el color de error del tema y permite hasta tres líneas:


```dart
decoration: InputDecoration(
  labelText: 'Nombre',
  errorStyle: TextStyle(color: Theme.of(context).colorScheme.error),
  errorMaxLines: 3,
),
```

No fijamos una altura al campo: debe poder crecer al aparecer el mensaje o al ampliar el texto. No uses `errorText: ''` para ocultar errores: una cadena vacía sigue siendo un error. Para aceptar el valor, el validador debe devolver `null`.

## Error de consulta del usuario

Si los campos tienen formato correcto, `login()` consulta el repositorio. `Ana` con `pau@centro.es` no corresponde a una misma ficha: el ViewModel asigna `error`, notifica y la vista muestra el mensaje de consulta cerca del botón. Ese mensaje no es `FormFieldState.errorText`; es estado de presentación del ViewModel. Las reglas siguen en el ViewModel y la búsqueda y transformación de datos en el repositorio.

Referencias: [validator](https://api.flutter.dev/flutter/widgets/FormField/validator.html), [FormState.validate](https://api.flutter.dev/flutter/widgets/FormState/validate.html) y [AutovalidateMode](https://api.flutter.dev/flutter/widgets/AutovalidateMode.html).
