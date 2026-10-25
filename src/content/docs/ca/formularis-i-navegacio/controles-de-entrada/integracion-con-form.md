---
title: "Form i FormState"
sidebar:
  order: 2
---

`Form` és l’agrupació visual; `FormState` és l’objecte que coordina els camps. Flutter crea l’estat en incorporar el formulari a l’arbre: no necessitem construir un `FormState` manualment.

## 🧩 Form: agrupar camps

La base del catàleg conté esta estructura. Els camps s’afegiran a la llista interior; els botons poden estar fora del `Form` perquè accedixen al seu estat amb la clau:

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

## FormState: accedir amb una clau

Este membre es declara en el `State` de la nostra pantalla, fora de `build`:

```dart
final _formKey = GlobalKey<FormState>();
```

La clau identifica eixe `Form` i `_formKey.currentState` permet obtindre el seu `FormState` quan està muntat. Pot ser `null` abans de construir-lo o després de retirar-lo. Conservar la clau evita perdre l’associació en reconstruir la pantalla. La clau no guarda els textos ni és l’estat del formulari: permet accedir-hi.

## Tres operacions diferents

| Operació sobre `FormState` | Efecte en els camps registrats |
| --- | --- |
| `validate()` | Executa els `validator`, actualitza els errors i retorna si tots són vàlids. |
| `save()` | Executa l’`onSaved` de cada camp amb el seu valor actual. |
| `reset()` | Retorna cada camp al valor inicial i reinicia l’estat d’interacció i error; l’autovalidació pot tornar a mostrar errors. |

Este és el recorregut que ja usa `_recogerDatos()` en la base:

```dart
final formulario = _formKey.currentState;
if (formulario == null || !formulario.validate()) return;
_borrador.clear();
formulario.save();
widget.viewModel.guardarDatos(_borrador);
```

El botó fa dos tasques en ordre. Primer, `validate()` pregunta a cada camp si el valor complix les regles del seu `validator`. Si troba un error, el mostra i el `return` deté el mètode: les línies següents no s’executen i el resultat anterior del ViewModel es manté sense canvis.

Si tots els camps són vàlids, buidem `_borrador` i cridem `save()`. Esta crida executa l’`onSaved` de cada camp. Eixos callbacks copiaran els valors al mapa, com veurem a continuació. **Validar comprova; guardar executa els callbacks que arrepleguen els valors.** Per això cridem els dos mètodes: executar només `save()` permetria arreplegar valors que no hem comprovat.

En este exemple, «guardar» significa conservar una còpia en memòria. Per a emmagatzemar les dades en un arxiu, una base de dades o un servidor necessitaríem programar eixa operació a banda.

Després de `save()`, `guardarDatos(_borrador)` entrega els valors a `ElementosFormularioViewModel`. Este els conserva en el mapa privat `_datos`; la View només pot llegir-los amb `datos`.

## Com arriba el valor de cada camp a `_borrador`

`_borrador` és un mapa que hem creat nosaltres en el `State` de la pantalla:

```dart
final _borrador = <String, Object?>{};
```

Cada entrada relaciona una clau de text, com `'nombre'`, amb un valor. El tipus `Object?` permet arreplegar dades diferents: un nom de tipus `String`, una condició de tipus `bool` o un valor nul. `final` impedix substituir el mapa per un altre, però permet afegir, canviar o esborrar les entrades.

**Flutter no associa automàticament eixe mapa amb els camps.** L’associació l’escrivim en l’`onSaved` de cada un. Per exemple, estos són els callbacks que usarem en Nombre i Turno:

```dart
// Dins del TextFormField de Nombre:
onSaved: (valor) {
  _borrador['nombre'] = (valor ?? '').trim();
},

// Dins del DropdownButtonFormField<String> de Turno:
onSaved: (valor) {
  _borrador['turno'] = valor;
},
```

En cada callback, `valor` és la dada actual d’**eixe camp**. L’assignació decidix on copiar-la: Nombre escriu en `_borrador['nombre']` i Turno en `_borrador['turno']`. Els dos callbacks poden accedir a `_borrador` perquè construïm els camps dins del mateix `State` que declara el mapa.

Les claus `'nombre'` i `'turno'` les triem nosaltres: no es deduïxen de `labelText`, del nom d’una variable ni de la clau del formulari. Usa una clau diferent per a cada dada que vulgues conservar; si dos camps escriuen en la mateixa, una assignació sobreescriurà l’altra.

### Què passa en prémer «Comprobar y recoger»

1. Mentre escrius, cada camp manté el valor; `_borrador` encara no rep eixos canvis.
2. `validate()` comprova els camps. Si algun falla, el mètode acaba sense arreplegar-los.
3. Si tots són vàlids, `_borrador.clear()` prepara el mapa temporal per a la nova recollida.
4. `formulario.save()` executa l’`onSaved` de cada camp registrat.
5. Cada callback copia el valor a l’entrada que hem indicat, i després entreguem l’esborrany al ViewModel, que guarda la còpia. La View llig `viewModel.datos` i mostra un `SnackBar` amb eixos valors.

Per exemple, amb el nom «Ana» i el torn de vesprada, el mapa contindrà:

```dart
{
  'nombre': 'Ana',
  'turno': 'tarde',
}
```

:::tip[L’enllaç està en onSaved]
El formulari sap quins camps té registrats, però no coneix el nostre mapa `_borrador`. `save()` crida els callbacks; **el codi que escrivim dins de cada `onSaved` és el que copia la dada**. Un camp sense eixe callback no afegirà cap entrada al mapa.
:::

Si edites un camp després d’arreplegar les dades, el ViewModel conserva el resultat anterior fins que tornes a prémer el botó. L’esborrany només s’ompli durant `save()`; no és una connexió permanent amb el text del camp.

## Què reinicia cada instrucció

Després d’arreplegar les dades existixen dos llocs amb informació: **els camps que veiem en pantalla** i **el resultat guardat en el ViewModel**; a més, la View usa `_borrador` durant la recollida. El botó «Reiniciar campos» ha de restablir els camps, buidar l’esborrany i demanar al ViewModel que esborre el resultat:

```dart
void _reiniciar() {
  _formKey.currentState?.reset(); // Restablix els camps del formulari.
  _borrador.clear();                // Buida la recollida temporal.
  widget.viewModel.reiniciar();     // Esborra el resultat del ViewModel.
  ScaffoldMessenger.of(context).hideCurrentSnackBar();
}
```

`reset()` retorna cada camp al valor inicial: per exemple, Nombre torna a estar buit i la casella torna a estar desmarcada. També reinicia l’estat d’interacció i error; si hi ha autovalidació, esta pot tornar a mostrar errors. Però el mapa és una variable que hem creat nosaltres: el formulari no coneix les assignacions que vam fer en `onSaved`, així que no pot desfer-les. Per això buidem l’esborrany i cridem explícitament `viewModel.reiniciar()`.

## Què passa mentre el formulari està buit

La pantalla base encara no conté camps. Si prems «Comprobar y recoger», `validate()` no troba cap regla que incomplir i retorna `true`; el ViewModel rebrà un mapa buit i l’`SnackBar` mostrarà `Valores recogidos: {}`. Això no comprova que s’haja escrit un nom: encara no hem afegit el camp ni la regla.

Quan incorpores el `TextFormField` de l’apartat següent, el seu `validator` rebutjarà el nom buit. En prémer el mateix botó, apareixerà l’error i el mètode acabarà abans de cridar `save()`.

## Una altra forma d’accedir a FormState

En estos exemples usem `_formKey.currentState` perquè els nostres botons estan fora del `Form`. La clau permet localitzar-ne l’estat des d’eixos botons.

Si un botó es construïx **dins del formulari**, pot obtindre l’estat amb `Form.of(context)`. Esta crida busca un `Form` entre els antecessors del widget al qual pertany eixe `context`. Per exemple:

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

Ací `Builder` ens proporciona un context situat dins de `Form`. El context del `build` de la pantalla està per damunt del formulari que retorna, així que no serviria per a trobar-lo amb `Form.of`. Este fragment només il·lustra eixa diferència: **en la demostració del catàleg conservem la clau i els botons de la base**.

Referències: [Form](https://api.flutter.dev/flutter/widgets/Form-class.html) i [FormState](https://api.flutter.dev/flutter/widgets/FormState-class.html).
