---
title: "4. Afegir el botó i el resultat"
sidebar:
  order: 5
---

Prepararem l’acció «Previsualizar»: quan les dades siguen vàlides, generarà un resum amb el nom i el correu. Si l’usuari modifica un camp després, el resum anterior ha de desaparéixer perquè no mostre informació desactualitzada.

Primer afegirem al ViewModel el resultat i el mètode que el genera. Després veurem com el botó sol·licita la validació i com la pantalla escolta els canvis. En acabar este pas, el botó i el resum ja funcionaran des del catàleg.

:::tip[Què aconseguirem]
En acabar, «Previsualizar» mostrarà errors si hi ha dades incorrectes o el resum si tot és vàlid. En editar un camp, desapareixerà el resum anterior.
:::

## 📝 1. Preparar el resultat

Afig al ViewModel el resultat i el getter:

```dart
String? _resumen;
String? get resumen => _resumen;
```

En els dos mètodes `cambiar...`, afig `_resumen = null;` abans de `notifyListeners()`. Així una edició descarta el resultat anterior. Després afig esta acció a la classe:

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

El botó primer demanarà a `Form` que valide els camps. Si tots són vàlids, cridarà `previsualizar()`. L’acció torna a comprovar les regles per a protegir-se també quan s’invoca directament.

## 2. Preparar l’acció del botó

En `lib/ui/inscripcion/ui/inscripcion_pantalla.dart`, afig este mètode **dins d’`_InscripcionPantallaState`, abans de `build`**. Conserva `_formKey` i la resta de la classe:

```dart
void _previsualizar() {
  FocusScope.of(context).unfocus();
  if (_formKey.currentState!.validate()) {
    widget.viewModel.previsualizar();
  }
}
```

Mantenim la validació prèvia de l’exemple anterior. Ací no cridem `save()`: el ViewModel ja rep el text amb `onChanged`, així que l’acció següent és `previsualizar()`. La primera línia retira el focus del camp abans de validar.

## 3. Escoltar els canvis i mostrar el resultat

Fins ara `SafeArea` contenia directament el `Form`. Col·locarem **`ListenableBuilder` entre els dos**. El formulari passa a ser el resultat de la seua funció `builder`:

```text
Scaffold
└── SafeArea
    └── ListenableBuilder  ← escolta el ViewModel
        └── Form
            └── ListView
                ├── Camp Nombre
                ├── Camp Correo
                ├── Botó Previsualizar
                └── Resum, només si existix
```

Substituïx **només el mètode `build`** per este codi. Ja inclou els camps anteriors, el botó i el resum; no els afiges una altra vegada fora d’este bloc:

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

A més activem `AutovalidateMode.onUserInteraction`: després d’interactuar amb els camps, els errors poden actualitzar-se mentre es corregixen, sense esperar una altra pulsació del botó.

### Què fa cada part

- **`final viewModel = widget.viewModel`** dona un nom més curt a la dependència rebuda per la pantalla; no crea un altre ViewModel.
- **`listenable: viewModel`** indica qui ha d’escoltar. Pot escoltar-lo perquè `InscripcionViewModel` hereta de `ChangeNotifier`.
- **`builder: (context, _) => Form(...)`** descriu què reconstruir quan arriba un avís. El segon paràmetre permet rebre un fill reutilitzable; ací no l’usem i l’anomenem `_`.
- **`if (viewModel.resumen != null)`** incorpora el resultat a la llista únicament quan existix. Al principi és `null`, així que no es mostra.
- **`...[...]`** afig els dos widgets de la llista interior —l’espai i el text— a `children`. `resumen!` permet usar el text després de comprovar que no és nul.

:::tip[Què provoca que aparega el resum]
`previsualizar()` assigna el resum i crida `notifyListeners()`. Eixe avís fa que `ListenableBuilder` torne a executar el seu `builder`. La condició ara es complix i apareix el text. En editar un camp, el seu mètode `cambiar...` posa el resum a `null` i torna a notificar: el text desapareix. No cal afegir `setState()` a este recorregut.
:::

## 4. Provar-ho ara en el catàleg

Obri «Formulario de inscripción». Prem «Previsualizar» amb els camps buits i observa els errors. Escriu `Ana` i `ana@centro.es`, torna a prémer i comprova el resum. Canvia una lletra del nom: el resum ha de desaparéixer fins que tornes a previsualitzar.

Esta versió encara usa `onChanged`. En el pas següent canviarem eixa connexió per controladors i listeners; el botó i `ListenableBuilder` continuaran al seu lloc.
