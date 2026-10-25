---
title: "TextFormField: text i edició"
sidebar:
  order: 3
---

`TextFormField` és un camp de text preparat per a participar en `Form`. Combina l’edició de `TextField` amb el valor, la validació i el guardat d’un `FormField<String>`. No hem d’envoltar-lo en un altre `FormField`.

## ✏️ Un camp concret

Afig este exemple al `Column` interior del `Form` de la pantalla de demostració. Conserva els botons de la base:

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

## Presentació, valor i accions

| Propietat | Paper en el camp |
| --- | --- |
| `decoration` | Etiqueta, exemple, ajuda, icona i vora. No constituïx el valor escrit. |
| `initialValue` | Text inicial quan no es proporciona un controlador. |
| `validator` | Retorna un error o `null`. Es consulta en validar; no ha de guardar ni modificar dades. |
| `onSaved` | Rep el valor en executar `FormState.save()`. Ací el copia a `_borrador`. |
| `keyboardType` | Sol·licita un teclat adequat; no valida el contingut. |
| `textInputAction` | Configura accions del teclat com «Siguiente» o «Hecho». |

En l’exemple, `trim()` elimina els espais exteriors abans de comprovar i arreplegar el nom. El text d’ajuda descriu la regla; `validator` consulta `viewModel.validarNombre`, on està escrita la comprovació.

## Controlar l’edició des del codi

Fins ara el camp gestiona el text que escriu l’usuari i `onSaved` ens entrega eixe valor en arreplegar el formulari. Però com podem omplir Nombre amb «Ana» des d’un botó, o buidar-lo sense reiniciar tots els camps?

Per a eixes operacions usem un **`TextEditingController`**. És un objecte que es connecta al camp: permet llegir-ne el text actual i canviar el text que apareix en pantalla. No dibuixa res ni substituïx el validador.

### 1. Crear el controlador una sola vegada

En `controles_entrada_pantalla.dart`, afig este membre a `_ControlesEntradaPantallaState`, al costat de `_formKey` i `_borrador`, **fora de `build`**:

```dart
final _nombreController = TextEditingController();
```

Es crea buit i es conserva mentre existisca el `State` de la pantalla. No el crees dins de `build`: una reconstrucció podria crear un altre controlador i perdre l’edició actual.

### 2. Connectar-lo al camp Nombre

En el `TextFormField` anterior, elimina `initialValue: ''` i afig `controller: _nombreController`. El camp queda així; pots conservar la decoració més completa del primer exemple:

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

Ara, en escriure, el text actual també està disponible en `_nombreController.text`. Si modifiquem eixa propietat des del codi, el camp mostra el contingut nou. La connexió funciona en els dos sentits.

No combines `controller` i `initialValue`: quan hi ha controlador, este proporciona el text inicial. Per exemple, `TextEditingController(text: 'Ana')` crearia el camp amb eixe nom; en la demostració el deixem buit.

### 3. Llegir, omplir i buidar des de botons

Afig estos tres botons al `Column` exterior, després dels botons de la base. Els callbacks s’executen en prémer-los:

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

- **Leer nombre** consulta `.text` i el mostra en un `SnackBar`. No valida ni arreplega la resta del formulari.
- **Usar Ana** assigna un text nou a `.text`; veuràs «Ana» dins del camp.
- **Vaciar nombre** crida `clear()`; el camp queda buit, sense modificar Turno ni la casella.

No necessites `setState()` per a canviar el text del camp amb el controlador. El mateix camp escolta eixos canvis. Les regles continuen en el ViewModel i `onSaved` continua funcionant: en prémer «Comprobar y recoger» rebrà el text actual, tant si l’ha escrit l’usuari com si l’ha omplit un botó.

Canviar el text no executa `onSaved` ni actualitza les dades arreplegades anteriorment. Per a entregar el valor nou al ViewModel cal tornar a prémer «Comprobar y recoger».

### 4. Alliberar el controlador en eixir

Afig este mètode al `State`. Si ja té un `dispose()`, incorpora la crida a l’existent en lloc de declarar-ne un altre:

```dart
@override
void dispose() {
  _nombreController.dispose();
  super.dispose();
}
```

El controlador és un recurs d’edició de la View. El crea la pantalla i l’allibera quan el seu `State` es retira definitivament; no el passem al ViewModel.

**Comprova la connexió:** escriu un nom i prem «Leer nombre». Després prem «Usar Ana» i observa el camp. Finalment prem «Vaciar nombre» i «Comprobar y recoger»: ha d’aparéixer l’error de nom obligatori d’almenys dos caràcters.

:::note[TextField no equival a TextFormField]
Un `TextField` servix per a editar text, però no es registra per si sol com a camp del `Form`. Usa `TextFormField` quan necessites eixa integració amb `validator` i `onSaved`.
:::

Prem «Comprobar y recoger» amb el nom buit, després escriu `Ana` i repetix. Finalment reinicia: el camp ha de tornar al text inicial. La demostració no té autovalidació; l’error es comprova en prémer el botó.

Referències: [TextFormField](https://api.flutter.dev/flutter/material/TextFormField-class.html) i [TextEditingController](https://api.flutter.dev/flutter/widgets/TextEditingController-class.html).
