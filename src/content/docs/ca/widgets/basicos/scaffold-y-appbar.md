---
title: "Scaffold i AppBar: donar estructura a la pantalla"
sidebar:
  order: 8
---

Fins ara hem provat peces dins del cos d’una pantalla. **`Scaffold` oferix les zones habituals d’una pantalla Material**, i `AppBar` configura la barra superior:

```dart
Scaffold(
  appBar: AppBar(
    title: const Text('Les meues rutes'),
    actions: [
      IconButton(
        tooltip: 'Buscar rutes',
        icon: const Icon(Icons.search),
        onPressed: () {
          debugPrint('Buscar rutes');
        },
      ),
    ],
  ),
  body: const Center(child: Text('Tria la teua pròxima ruta')),
  floatingActionButton: FloatingActionButton(
    tooltip: 'Afegir ruta',
    onPressed: () {
      debugPrint('Afegir ruta');
    },
    child: const Icon(Icons.add),
  ),
)
```

En este cas, reemplaça el `Scaffold` complet del programa de prova. `Scaffold` no substituïx `MaterialApp`: el primer organitza una pantalla; el segon configura l’aplicació.

| Zona de `Scaffold` | Contingut habitual |
| --- | --- |
| `appBar` | Una barra superior, normalment `AppBar`. |
| `body` | El contingut principal. |
| `floatingActionButton` | Un botó per a una acció destacada. |
| `drawer` | Un panell lateral de navegació. |
| `bottomNavigationBar` | Navegació en la part inferior; per exemple, `NavigationBar`. |

Altres propietats útils de [`Scaffold`](https://api.flutter.dev/flutter/material/Scaffold-class.html):

| Propietat | Per a què servix |
| --- | --- |
| `backgroundColor` | Configura el fons de la pantalla. |
| `floatingActionButtonLocation` | Indica on es col·loca el botó flotant. |
| `resizeToAvoidBottomInset` | Controla si el cos ajusta el seu espai per a evitar el teclat en pantalla. |
| `extendBodyBehindAppBar` | Permet estendre el cos per darrere de la barra; cal cuidar la llegibilitat. |

En `AppBar`, `title` rep el títol, `actions` una llista d’accions al final i `leading` un widget al principi. Quan no configures `leading`, Flutter pot afegir un botó per a tornar o obrir el panell lateral, segons el context.

:::note[Una pantalla no es desplaça per tindre Scaffold]
`Scaffold` organitza zones, però el seu `body` no es torna desplaçable automàticament. Si el contingut no cap, necessites una solució com `ListView` o `SingleChildScrollView`.
:::

### Propietats útils d’AppBar

Documentació oficial: [`AppBar`](https://api.flutter.dev/flutter/material/AppBar-class.html).

| Propietat | Per a què servix |
| --- | --- |
| `title` | Rep el widget del títol. |
| `leading` | Col·loca un widget al principi de la barra. |
| `actions` | Rep els widgets d’acció situats al final. |
| `centerTitle` | Controla si el títol se centra. |
| `backgroundColor / foregroundColor` | Configuren el fons i el color habitual del text i les icones. |
| `elevation` | Configura l’elevació visual de la barra. |
| `toolbarHeight` | Establix l’altura de la zona de ferramentes. |
| `automaticallyImplyLeading` | Controla la incorporació automàtica del botó de tornar o obrir el panell lateral. |

### Mostrar un avís amb SnackBar

Per a donar una resposta breu a una acció, podem mostrar una **`SnackBar` mitjançant `ScaffoldMessenger`**. Este fragment pot substituir el text del programa de prova:

```dart
FilledButton(
  onPressed: () {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Ruta guardada')),
    );
  },
  child: const Text('Guardar ruta'),
)
```

`ScaffoldMessenger.of(context)` localitza el gestor de missatges més pròxim. En este programa, `MaterialApp` el proporciona i el `Scaffold` s’hi registra. **Mostrar «Ruta guardada» no persistix la ruta**: l’operació de guardat s’ha de programar per separat.

Una `SnackBar` servix per a una resposta temporal. Un `MaterialBanner` presenta un avís en la part superior del cos i es manté fins que es retire, per exemple mitjançant `hideCurrentMaterialBanner`. Si n’utilitzes un, proporciona una acció per a tancar-lo o atendre l’avís. Consulta les referències de [Scaffold](https://api.flutter.dev/flutter/material/Scaffold-class.html) i [ScaffoldMessenger](https://api.flutter.dev/flutter/material/ScaffoldMessenger-class.html).

### Propietats dels avisos

En [`SnackBar`](https://api.flutter.dev/flutter/material/SnackBar-class.html), estes propietats permeten ajustar el missatge:

| Propietat | Per a què servix |
| --- | --- |
| `content` | Rep el contingut de l’avís. |
| `duration` | Configura el temps de presentació, subjecte al comportament d’accessibilitat. |
| `action` | Afig una acció mitjançant `SnackBarAction`, per exemple «Desfer». |
| `behavior` | Permet triar entre `SnackBarBehavior.fixed` i `floating`. |

En [`MaterialBanner`](https://api.flutter.dev/flutter/material/MaterialBanner-class.html), destaquen `content` (missatge), `actions` (accions disponibles), `leading` (icona o element inicial) i `backgroundColor` (color de fons).
