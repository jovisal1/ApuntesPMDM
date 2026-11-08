---
title: "8. Netejar el formulari"
sidebar:
  order: 9
---

Login comprova les dades; **Limpiar** permet començar una altra vegada sense eixir de la pantalla. Ha de buidar nom i correu, llevar el taller, desmarcar el recordatori i retirar tots els errors. La font i la llista de tallers es conserven.

## Restablir el ViewModel

`limpiar()` ja està en el ViewModel del pas 2. Assigna els valors inicials als cinc camps i crida una vegada `notifyListeners()`. No accedix als controladors ni al `Form`, perquè pertanyen a la vista.

## Buidar els controls i els errors

En el `State`, la clau es declara com a `GlobalKey<FormState> _formKey = GlobalKey<FormState>();`, sense `final`: la substituirem en netejar. Afegix este mètode abans de `build`:


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

`clear()` buida els textos visibles; `_limpiando` evita que els listeners comuniquen estats intermedis. El ViewModel neteja els valors i l’error de consulta. `setState` desactiva la validació automàtica i assigna una clau nova: Flutter crea un estat nou del `Form` i els camps, sense errors ni interaccions prèvies. El desplegable torna al seu `initialValue`, ara `null`.

Per què no basta netejar el ViewModel? Els controladors i l’estat intern del desplegable i del `Form` continuarien conservant valors o missatges anteriors. Ací regenerem eixe estat d’una vegada; no utilitzem només `FormState.reset()`, que torna als valors inicials de cada camp i no neteja per si mateix l’estat extern del ViewModel.

Afegix el botó davall de Login:


```dart
OutlinedButton.icon(
  onPressed: _limpiar,
  icon: const Icon(Icons.restart_alt),
  label: const Text('Limpiar'),
),
```

Prova Limpiar abans i després d’un Login incorrecte. La pantalla ha de quedar buida i sense missatges; el Login següent amb dades buides ha de tornar a mostrar els errors.
