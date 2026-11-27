---
title: "8. Canvis sense guardar en tornar"
sidebar:
  order: 8
---

En este pas evitem que es perden sense voler les dades d’un formulari. Si algú escriu en Login i prem la fletxa de tornar o el botó Arrere d’Android, l’aplicació preguntarà abans d’eixir. Si el formulari està buit, eixirà sense preguntar.

Utilitzarem **`PopScope`**, un widget que decidix si la pàgina es pot tancar amb un retrocés i avisa quan s’intenta. El formulari de Login ja existix des del pas 6; només afegim la comprovació de canvis, el diàleg i el `PopScope`.

Arxius d’este pas:

```text
lib/
  ui/
    inscripcion/
      view_models/inscripcion_viewmodel.dart   ← indica si hi ha canvis
      ui/dialogos.dart                         ← nou diàleg de descart
      ui/inscripcion_pantalla.dart             ← PopScope al voltant del Scaffold
```

## Què intercepta `PopScope`

Un **retrocés** és una petició de tancar la pàgina actual. Arriba des de la fletxa de l’`AppBar`, des del botó o el gest Arrere d’Android i des de `Navigator.maybePop`. `PopScope` respon a tots amb dos propietats. Este fragment només mostra la seua estructura; no cal copiar-lo encara. En l’apartat 3 el col·locarem al voltant de l’`Scaffold` del formulari:

```dart
PopScope<Object?>(
  canPop: true,          // false bloqueja el retrocés
  onPopInvokedWithResult: (didPop, result) {
    // Es crida després de cada intent.
    // didPop indica si la pàgina s'ha tancat.
  },
  child: ...,
)
```

- Amb **`canPop: true`** la pàgina es tanca com sempre i `didPop` val `true`.
- Amb **`canPop: false`** la pàgina no es tanca i `didPop` val `false`. És el moment de preguntar i, si la resposta és afirmativa, tancar-la nosaltres.

`PopScope` només actua sobre els retrocessos. Una navegació amb `context.go`, un canvi de branca en la barra inferior o una redirecció del router **no** hi passen: si una d’eixes accions pot descartar dades, demana confirmació abans de cridar-la. Tampoc no intercepta el botó Arrere del navegador web, que canvia l’adreça directament.

## 1. El ViewModel sap si hi ha canvis

Hi ha canvis quan algun valor és diferent de l’inicial. Els valors inicials són els mateixos que restablix `limpiar()`.

En `lib/ui/inscripcion/view_models/inscripcion_viewmodel.dart`, afig este getter davall dels altres:

```dart
bool get tieneCambios =>
    _nombre.isNotEmpty ||
    _correo.isNotEmpty ||
    _tallerId != null ||
    _recordatorio;
```

El ViewModel no mostra diàlegs ni navega: només informa. Com que cada mètode `cambiar...` crida `notifyListeners()`, la vista sabrà en tot moment si ha de protegir l’eixida.

## 2. El diàleg de descart

En `lib/ui/inscripcion/ui/dialogos.dart`, l’arxiu de la unitat de [diàlegs](../../navegacion/dialogos/), afig esta funció:

```dart
Future<bool?> confirmarDescarte(BuildContext context) {
  return showDialog<bool>(
    context: context,
    builder: (dialogContext) => AlertDialog(
      title: const Text('Vols descartar els canvis?'),
      content: const Text('Si eixes ara, es perdran les dades escrites.'),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(dialogContext).pop(false),
          child: const Text('Continuar editant'),
        ),
        FilledButton(
          onPressed: () => Navigator.of(dialogContext).pop(true),
          child: const Text('Descartar canvis'),
        ),
      ],
    ),
  );
}
```

Les etiquetes expliquen la conseqüència de cada botó. Només «Descartar canvis» torna `true`; «Continuar editant» i tocar fora del diàleg deixen el formulari com estava.

## 3. Protegir l’eixida amb `PopScope`

En `lib/ui/inscripcion/ui/inscripcion_pantalla.dart`, comprova que importes `dialogos.dart` i afig este mètode abans de `build`:

```dart
Future<void> _intentarSalir(bool didPop, Object? result) async {
  if (didPop) return;
  final descartar = await confirmarDescarte(context);
  if (!mounted || descartar != true) return;
  Navigator.of(context).pop(result);
}
```

Després embolcalla el `Scaffold` de `build`. El `Scaffold` que ja tenies passa a ser el `child` del `ListenableBuilder`:

```dart
@override
Widget build(BuildContext context) {
  final vm = widget.viewModel;
  final colores = Theme.of(context).colorScheme;
  return ListenableBuilder(
    listenable: vm,
    builder: (context, child) => PopScope<Object?>(
      canPop: !vm.tieneCambios,
      onPopInvokedWithResult: _intentarSalir,
      child: child!,
    ),
    child: Scaffold(
      // ... el mateix Scaffold d'abans, sense canvis
    ),
  );
}
```

Com funciona:

- **`canPop: !vm.tieneCambios`**: amb el formulari buit la pàgina es tanca sense preguntar. Tan prompte com s’escriu alguna cosa, el retrocés queda bloquejat.
- **`ListenableBuilder`** torna a construir el `PopScope` cada vegada que el ViewModel notifica, perquè `canPop` seguisca sempre l’estat actual. El `Scaffold` es passa com a `child`, així que no es reconstruïx per això.
- **`_intentarSalir`** només actua quan el retrocés s’ha bloquejat (`didPop` és `false`). Si s’accepta el descart, tanca la pàgina amb `Navigator.of(context).pop`. Esta crida no consulta `canPop`, per la qual cosa no torna a obrir el diàleg.
- **`mounted`** es comprova després de l’`await`, com en els diàlegs: mentre el diàleg estava obert, la pàgina podria haver desaparegut.

El mateix formulari s’utilitza en la ruta `/login` i en la demo antiga oberta amb `Navigator.push`. `Navigator.of(context).pop` funciona en els dos casos: go_router actualitza la ubicació quan es tanca una de les seues pàgines.

Un login correcte no mostra el diàleg encara que hi haja canvis. En `/login`, el router substituïx la pàgina per Compte mitjançant `redirect`, i això no és un retrocés.

## 4. Reutilitzar el diàleg en netejar

Limpiar també descarta el que s’ha escrit. Substituïx l’`onPressed` del botó Limpiar perquè pregunte només quan hi ha canvis:

```dart
onPressed: () async {
  if (widget.viewModel.tieneCambios) {
    final descartar = await confirmarDescarte(context);
    if (!context.mounted || descartar != true) return;
  }
  _limpiar();
},
```

## Provar

Fes **hot restart** i obri Login des de **Mi cuenta protegida**:

| Situació | Resultat esperat |
| --- | --- |
| Formulari buit i fletxa de tornar | Torna al catàleg sense preguntar. |
| Escriure un nom i prémer la fletxa de tornar | Apareix «Vols descartar els canvis?». |
| Triar «Continuar editant» | El diàleg es tanca i el nom continua escrit. |
| Triar «Descartar canvis» | Torna al catàleg. En obrir Login de nou, el formulari està buit. |
| Botó o gest Arrere d’Android amb canvis | El mateix diàleg que amb la fletxa. |
| Login correcte amb canvis | Obri Compte sense preguntar. |
| Limpiar amb canvis | Pregunta abans de buidar el formulari. |
| Login de demostración (entrada antiga) amb canvis | També pregunta abans de tornar al catàleg. |

Referències: [PopScope](https://api.flutter.dev/flutter/widgets/PopScope-class.html) i [retrocés predictiu en Android](https://docs.flutter.dev/release/breaking-changes/android-predictive-back).
