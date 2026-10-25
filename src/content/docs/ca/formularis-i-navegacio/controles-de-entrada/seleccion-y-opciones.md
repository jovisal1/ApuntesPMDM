---
title: "Camps de selecció i FormField"
sidebar:
  order: 4
---

A més del text, un formulari pot demanar que l’usuari **trie una opció** o **accepte una condició**. Afegirem Turno i Acepto las condiciones a la pantalla de demostració del catàleg, després del camp Nombre.

Els dos participaran en les mateixes operacions: `validate()` comprovarà les regles, `save()` arreplegarà els valors en `_borrador` i `reset()` recuperarà la selecció inicial. La diferència està en com els construïm:

- Per a Turno usarem **`DropdownButtonFormField<String>`**, que ja incorpora el comportament d’un camp de formulari.
- Per a les condicions combinarem **`FormField<bool>` i `CheckboxListTile`**: el primer gestiona el camp; el segon dibuixa la casella.

## 🔽 1. Usar un camp que ja ve preparat

Afig este desplegable al `children` del `Column` que està dins del `Form` de `controles_entrada_pantalla.dart`. Conserva Nombre i els botons de la base:

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

`String` és el tipus de la selecció. Cada `DropdownMenuItem` separa el valor que arrepleguem (`'manana'` o `'tarde'`) del text mostrat («Mañana» o «Tarde»).

`initialValue: null` deixa el camp sense selecció. En triar, el widget actualitza el valor intern. L’`onChanged` buit el manté habilitat, encara que ací no necessitem fer cap acció addicional en eixe moment; posar-lo a `null` el deshabilitaria.

El `validator` rep la selecció actual i exigix que no siga nul·la. Quan el formulari crida `save()`, `onSaved` la copia a `_borrador['turno']`. El camp ja sap mostrar l’error: no hem de construir eixe text ni afegir un altre `FormField` al voltant.

**Prova-ho:** prem «Comprobar y recoger» sense triar torn i observa l’error. Tria’n un i repetix amb Nombre vàlid: apareixerà en el mapa arreplegat.

## 2. Entendre què li falta a una casella

`CheckboxListTile` permet marcar una casella, però no és un `FormField`. Col·locar-lo dins de `Form` no li afig automàticament `validator`, `onSaved` ni reinici coordinat.

Per a aconseguir-ho usem `FormField<bool>`. El tipus `bool` indica que la dada del camp serà verdadera o falsa. Este widget manté un **`FormFieldState<bool>`** amb el valor i l’error; el seu `builder` rep eixe estat i l’usa per a construir la part visual.

En incorporar-se a l’arbre, el camp es registra en el `Form` antecessor més pròxim. Per això el formulari podrà validar-lo, guardar-lo i reiniciar-lo junt amb el nom i el torn. `FormState` coordina el conjunt; `FormFieldState<bool>` gestiona esta casella concreta.

## 3. Construir la casella com un camp propi

Afig este bloc després del desplegable, dins del mateix `Form`:

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

### Seguir el canvi de valor

1. `initialValue: false` establix que la casella comença desmarcada.
2. `builder` rep l’estat i l’anomenem `campo`. És un paràmetre del callback, no una variable que hàgem de declarar a banda.
3. `value: campo.value ?? false` indica a la casella quina selecció mostrar.
4. En prémer, `onChanged` rep el valor nou i crida `campo.didChange(...)`.
5. `didChange` actualitza el valor del camp i sol·licita que es reconstruïsca. La casella torna a dibuixar-se amb eixa selecció.

Si canviàrem només una variable externa, el `FormField` no coneixeria el valor nou. **`didChange` és la connexió entre el control que toca l’usuari i el camp que coneix el formulari.**

### Comprovar, mostrar l’error i arreplegar

Quan premem «Comprobar y recoger», `validate()` consulta el `validator` del camp. Este retorna `null` si la casella està acceptada o un missatge si no ho està.

L’`if (campo.hasError)` afig el text de l’error davall de la casella. `campo.errorText!` conté el missatge que ha retornat el validador. Ací construïm eixa presentació nosaltres; el desplegable i `TextFormField` ja la porten preparada.

Si tots els camps són vàlids, `save()` executa `onSaved` i copiem la selecció a `_borrador['condiciones']`. No necessitem crear una classe nova per a esta demostració: `FormField<bool>` aporta el comportament i `CheckboxListTile` la presentació.

## Comprovar el conjunt en el catàleg

Amb Nombre i Turno vàlids, intenta arreplegar les dades sense acceptar les condicions. Ha d’aparéixer l’error de la casella. Accepta i torna a prémer: el resultat mostrarà el nom, el torn i `condiciones: true`. Prem «Reiniciar campos»: Nombre quedarà buit, Turno sense selecció i la casella desmarcada; també es buidarà la còpia `_borrador`.

Referències: [DropdownButtonFormField](https://api.flutter.dev/flutter/material/DropdownButtonFormField-class.html) i [FormField](https://api.flutter.dev/flutter/widgets/FormField-class.html).
