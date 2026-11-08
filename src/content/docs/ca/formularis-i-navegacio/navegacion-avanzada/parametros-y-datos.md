---
title: "4. Paràmetres i consulta de dades"
sidebar:
  order: 4
---

Una URL ha de permetre reconstruir la destinació. En `/talleres/20`, `20` identifica el registre que consultarem. En `/talleres?q=cer`, `q` indica un filtre del llistat. Cap d’ells transporta una fitxa personal completa.

## Reutilitzar la capa de dades

Conserva `Taller` en `domain/models/taller.dart`, el contracte `InscripcionesRepository` i el seu servici i repositori locals del formulari. La llista d’opcions procedix de `data`, mitjançant DTO i conversió a domini. No copies els tallers dins del router.

Estos dos ViewModels reben el contracte. El llistat filtra sense alterar la font i el detall busca per identitat. Són objectes síncrons que representen els paràmetres rebuts; no necessiten `ChangeNotifier` perquè esta versió no modifica l’estat després de crear-se.


`lib/ui/navegacion_avanzada/view_models/talleres_viewmodel.dart`

```dart
import '../../../domain/models/taller.dart';
import '../../../domain/repositories/inscripciones_repository.dart';

class TalleresViewModel {
  TalleresViewModel(InscripcionesRepository repository, {String consulta = ''})
    : talleres = List.unmodifiable(
        repository.obtenerTalleres().where(
          (t) => t.titulo.toLowerCase().contains(consulta.trim().toLowerCase()),
        ),
      );
  final List<Taller> talleres;
}
```


`lib/ui/navegacion_avanzada/view_models/detalle_taller_viewmodel.dart`

```dart
import '../../../domain/models/taller.dart';
import '../../../domain/repositories/inscripciones_repository.dart';

class DetalleTallerViewModel {
  DetalleTallerViewModel(InscripcionesRepository repository, this.id) {
    for (final candidato in repository.obtenerTalleres()) {
      if (candidato.id == id) {
        taller = candidato;
        break;
      }
    }
  }
  final String id;
  Taller? taller;
}
```

## Mostrar llistat i detall

Crea estes vistes completes. Reben els ViewModels i no importen el servici ni DTO. La pulsació utilitza el nom `taller` i l’identificador; no l’índex de la llista.


`lib/ui/navegacion_avanzada/ui/talleres_pantalla.dart`

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../view_models/talleres_viewmodel.dart';

class TalleresPantalla extends StatelessWidget {
  const TalleresPantalla({super.key, required this.viewModel});
  final TalleresViewModel viewModel;
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      title: const Text('Talleres'),
      actions: [
        IconButton(
          tooltip: 'Catálogo',
          icon: const Icon(Icons.home_outlined),
          onPressed: () => context.go('/'),
        ),
      ],
    ),
    body: viewModel.talleres.isEmpty
        ? const Center(child: Text('No hay talleres para esta búsqueda'))
        : ListView.builder(
            itemCount: viewModel.talleres.length,
            itemBuilder: (context, index) {
              final taller = viewModel.talleres[index];
              return ListTile(
                title: Text(taller.titulo),
                subtitle: Text('Identificador: ${taller.id}'),
                trailing: const Icon(Icons.chevron_right),
                onTap: () => context.goNamed(
                  'taller',
                  pathParameters: {'id': taller.id},
                ),
              );
            },
          ),
  );
}
```


`lib/ui/navegacion_avanzada/ui/detalle_taller_pantalla.dart`

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../view_models/detalle_taller_viewmodel.dart';

class DetalleTallerPantalla extends StatelessWidget {
  const DetalleTallerPantalla({super.key, required this.viewModel});
  final DetalleTallerViewModel viewModel;
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Detalle del taller')),
    body: ListView(
      padding: const EdgeInsets.all(24),
      children: [
        Text(
          viewModel.taller?.titulo ?? 'No existe el taller ${viewModel.id}',
          style: Theme.of(context).textTheme.headlineSmall,
        ),
        const SizedBox(height: 16),
        FilledButton(
          onPressed: () {
            if (context.canPop()) {
              context.pop();
            } else {
              context.go('/talleres');
            }
          },
          child: const Text('Volver al listado'),
        ),
      ],
    ),
  );
}
```

## Declarar la ruta amb els paràmetres

Crea esta funció de configuració. La filla `:id` no comença per `/`: s’unix al pare `/talleres`. `state.pathParameters['id']` conté el segment reconegut; utilitzem `!` perquè el patró exigix eixe segment. Això no garantix que existisca en el repositori: eixa absència la representa el ViewModel.

`state.uri.queryParameters['q'] ?? ''` obté el filtre opcional. El router convertix la URL en arguments i compon la destinació; el filtratge i la cerca continuen fora dels widgets.


`lib/app/router/ruta_talleres.dart`

```dart
import 'package:go_router/go_router.dart';
import '../../domain/repositories/inscripciones_repository.dart';
import '../../ui/navegacion_avanzada/ui/talleres_pantalla.dart';
import '../../ui/navegacion_avanzada/ui/detalle_taller_pantalla.dart';
import '../../ui/navegacion_avanzada/view_models/talleres_viewmodel.dart';
import '../../ui/navegacion_avanzada/view_models/detalle_taller_viewmodel.dart';

GoRoute rutaTalleres(InscripcionesRepository repository) => GoRoute(
  path: '/talleres',
  name: 'talleres',
  builder: (context, state) => TalleresPantalla(
    viewModel: TalleresViewModel(
      repository,
      consulta: state.uri.queryParameters['q'] ?? '',
    ),
  ),
  routes: [
    GoRoute(
      path: ':id',
      name: 'taller',
      builder: (context, state) => DetalleTallerPantalla(
        viewModel: DetalleTallerViewModel(
          repository,
          state.pathParameters['id']!,
        ),
      ),
    ),
  ],
);
```

En `app_router.dart`, importa `../../domain/repositories/inscripciones_repository.dart` i `ruta_talleres.dart`. Canvia la signatura a `GoRouter crearRouter(InscripcionesRepository repository)` i afegix `rutaTalleres(repository)` a `routes`, conservant `/` i `/ayuda`.

En l’arrancada, importa el servici i repositori de `data` i substituïx només `initState` per este muntatge:


```dart
@override
void initState() {
  super.initState();
  final repository = InscripcionesLocalRepository(const InscripcionesLocalService());
  _router = crearRouter(repository);
}
```

Afegix una entrada al catàleg amb `onTap: () => context.go('/talleres')`. Per a provar una cerca sense concatenar manualment la URL:


```dart
context.goNamed('talleres', queryParameters: {'q': 'cer'});
context.goNamed('taller', pathParameters: {'id': '20'});
```

## Quan utilitzar extra

`extra` permet adjuntar un objecte: `context.go('/talleres/20', extra: taller)`. La destinació pot llegir `state.extra`, però l’objecte no queda descrit per la URL. No el faces obligatori per a reconstruir un detall: un enllaç copiat o una entrada directa poden no portar-lo. En web, els objectes complexos poden requerir un codec per a serialitzar-los. En este exemple utilitzem sempre l’identificador i consultem el repositori, per la qual cosa no necessitem `extra`.

Els paràmetres són text no fiable: si un camp futur requerix un número, utilitza `int.tryParse` i representa l’error; no utilitzes `int.parse` sense tractament. No poses contrasenyes ni fitxes personals en la URL.

Referències: [navegació i extra](https://pub.dev/documentation/go_router/latest/topics/Navigation-topic.html) i [GoRouterState](https://pub.dev/documentation/go_router/latest/go_router/GoRouterState-class.html).
