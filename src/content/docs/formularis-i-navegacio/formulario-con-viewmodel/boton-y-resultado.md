---
title: "4. Añadir el botón y el resultado"
sidebar:
  order: 5
---

Vamos a preparar la acción «Previsualizar»: cuando los datos sean válidos, generará un resumen con el nombre y el correo. Si el usuario modifica un campo después, el resumen anterior debe desaparecer para que no muestre información desactualizada.

Primero añadiremos al ViewModel el resultado y el método que lo genera. Después veremos cómo el botón solicita la validación y cómo la pantalla escucha los cambios. Al acabar este paso, el botón y el resumen ya funcionarán desde el catálogo.

:::tip[Qué conseguiremos]
Al terminar, «Previsualizar» mostrará errores si hay datos incorrectos o el resumen si todo es válido. Al editar un campo, desaparecerá el resumen anterior.
:::

## 📝 1. Preparar el resultado

Añade al ViewModel el resultado y su getter:

```dart
String? _resumen;
String? get resumen => _resumen;
```

En ambos métodos `cambiar...`, añade `_resumen = null;` antes de `notifyListeners()`. Así una edición descarta el resultado anterior. Después añade esta acción a la clase:

```dart
  bool previsualizar() {
    // La acción también protege sus reglas si se llama sin la vista.
    if (validarNombre(_nombre) != null || validarCorreo(_correo) != null) {
      return false;
    }
    _resumen = '${_nombre.trim()} · ${_correo.trim()}';
    notifyListeners();
    return true;
  }
```

El botón primero pedirá a `Form` que valide los campos. Si todos son válidos, llamará a `previsualizar()`. La acción vuelve a comprobar las reglas para protegerse también cuando se invoca directamente.

## 2. Preparar la acción del botón

En `lib/ui/inscripcion/ui/inscripcion_pantalla.dart`, añade este método **dentro de `_InscripcionPantallaState`, antes de `build`**. Conserva `_formKey` y el resto de la clase:

```dart
void _previsualizar() {
  FocusScope.of(context).unfocus();
  if (_formKey.currentState!.validate()) {
    widget.viewModel.previsualizar();
  }
}
```

Mantenemos la validación previa del ejemplo anterior. Aquí no llamamos a `save()`: el ViewModel ya recibe el texto mediante `onChanged`, así que la acción siguiente es `previsualizar()`. La primera línea retira el foco del campo antes de validar.

## 3. Escuchar los cambios y mostrar el resultado

Hasta ahora `SafeArea` contenía directamente el `Form`. Vamos a colocar **`ListenableBuilder` entre ambos**. El formulario pasa a ser el resultado de su función `builder`:

```text
Scaffold
└── SafeArea
    └── ListenableBuilder  ← escucha el ViewModel
        └── Form
            └── ListView
                ├── Campo Nombre
                ├── Campo Correo
                ├── Botón Previsualizar
                └── Resumen, solo si existe
```

Sustituye **solo el método `build`** por este código. Ya incluye los campos anteriores, el botón y el resumen; no los añadas otra vez fuera de este bloque:

```dart
@override
Widget build(BuildContext context) {
  final viewModel = widget.viewModel;
  return Scaffold(
    appBar: AppBar(title: const Text('Inscripción')),
    body: SafeArea(
      child: ListenableBuilder(
        listenable: viewModel,
        builder: (context, _) => Form(
          key: _formKey,
          autovalidateMode: AutovalidateMode.onUserInteraction,
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              TextFormField(
                initialValue: viewModel.nombre,
                decoration: const InputDecoration(
                  labelText: 'Nombre',
                  hintText: 'Por ejemplo, Ana',
                  helperText: 'Escribe al menos dos caracteres',
                  prefixIcon: Icon(Icons.person_outline),
                  border: OutlineInputBorder(),
                ),
                textInputAction: TextInputAction.next,
                onChanged: viewModel.cambiarNombre,
                validator: viewModel.validarNombre,
              ),
              const SizedBox(height: 16),
              TextFormField(
                initialValue: viewModel.correo,
                decoration: const InputDecoration(labelText: 'Correo'),
                keyboardType: TextInputType.emailAddress,
                textInputAction: TextInputAction.done,
                onChanged: viewModel.cambiarCorreo,
                validator: viewModel.validarCorreo,
                onFieldSubmitted: (_) => _previsualizar(),
              ),
              const SizedBox(height: 24),
              FilledButton(
                onPressed: _previsualizar,
                child: const Text('Previsualizar'),
              ),
              if (viewModel.resumen != null) ...[
                const SizedBox(height: 16),
                Text(viewModel.resumen!),
              ],
            ],
          ),
        ),
      ),
    ),
  );
}
```

Además activamos `AutovalidateMode.onUserInteraction`: después de interactuar con los campos, sus errores pueden actualizarse mientras se corrigen, sin esperar a otra pulsación del botón.

### Qué hace cada parte

- **`final viewModel = widget.viewModel`** da un nombre más corto a la dependencia recibida por la pantalla; no crea otro ViewModel.
- **`listenable: viewModel`** indica a quién escuchar. Puede escucharlo porque `InscripcionViewModel` hereda de `ChangeNotifier`.
- **`builder: (context, _) => Form(...)`** describe qué reconstruir cuando llega un aviso. El segundo parámetro permite recibir un hijo reutilizable; aquí no lo utilizamos y lo nombramos `_`.
- **`if (viewModel.resumen != null)`** incorpora el resultado a la lista únicamente cuando existe. Al principio es `null`, así que no se muestra.
- **`...[...]`** añade los dos widgets de la lista interior —el espacio y el texto— a `children`. `resumen!` permite utilizar el texto tras comprobar que no es nulo.

:::tip[Qué provoca que aparezca el resumen]
`previsualizar()` asigna el resumen y llama a `notifyListeners()`. Ese aviso hace que `ListenableBuilder` vuelva a ejecutar su `builder`. La condición ahora se cumple y aparece el texto. Al editar un campo, su método `cambiar...` pone el resumen a `null` y vuelve a notificar: el texto desaparece. No hace falta añadir `setState()` a este recorrido.
:::

## 4. Probarlo ahora en el catálogo

Abre «Formulario de inscripción». Pulsa «Previsualizar» con los campos vacíos y observa los errores. Escribe `Ana` y `ana@centro.es`, vuelve a pulsar y comprueba el resumen. Cambia una letra del nombre: el resumen debe desaparecer hasta que vuelvas a previsualizar.

Esta versión todavía utiliza `onChanged`. En el siguiente paso cambiaremos esa conexión por controladores y listeners; el botón y `ListenableBuilder` seguirán en su sitio.
