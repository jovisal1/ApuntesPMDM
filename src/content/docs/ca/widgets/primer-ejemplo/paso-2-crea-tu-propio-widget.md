---
title: "Pas 2. Crea el teu propi widget"
sidebar:
  order: 4
---

Podem donar un nom a esta composició. Substituïx **tot `lib/main.dart`** per:

```dart
import 'package:flutter/material.dart';

void main() => runApp(const EntrenamentApp());

class EntrenamentApp extends StatelessWidget {
  const EntrenamentApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        'Anem a entrenar!',
        textDirection: TextDirection.ltr,
      ),
    );
  }
}
```

`EntrenamentApp` hereta de `StatelessWidget` perquè de moment només descriu una salutació. `build` retorna el widget que representa la interfície i `@override` indica que implementem un mètode de la classe base. La funció fletxa de `main` és una forma abreviada d’escriure una única expressió.

El constructor `const EntrenamentApp({super.key})` permet crear instàncies constants i passar la clau opcional al constructor de la classe base. **`key` ajuda Flutter a identificar elements en actualitzar l’arbre**; no és un identificador per a buscar controls com en HTML. Si l’omets, normalment el seu valor és `null`: Flutter no genera una `Key` per tu.

### Què representa BuildContext

`context` representa **la ubicació d’este widget en l’arbre**. Permet consultar informació proporcionada pels antecessors, com el tema mitjançant `Theme.of(context)`. No conté per si mateix totes les variables de l’aplicació.

Això explica una regla pràctica: un context pot consultar el que hi ha per damunt d’ell, però no un widget que acabem de retornar per davall. En separar l’aplicació i la pantalla en el següent pas, el context de la pantalla quedarà davall de `MaterialApp`.

### Ferramentes de l’editor

Amb el cursor sobre un widget, obri les accions de codi amb la bombeta o `Ctrl + .`:

| Acció | Què facilita |
| --- | --- |
| **Wrap with Center / Column** | Embolica una peça en un altre widget. |
| **Extract Widget** | Convertix una part de l’arbre en una classe amb nom. |
| **Convert to StatefulWidget** | Genera la separació entre widget i estat. |

Les extensions també oferixen plantilles en escriure prefixos com `stless` o `stful`; els noms disponibles depenen de les extensions instal·lades. Revisa el resultat generat: has d’entendre el constructor i completar `build`. Si apareix `throw UnimplementedError()`, encara falta implementar la interfície.
