---
title: "4. Parámetros y consulta de datos"
sidebar:
  order: 4
---

Una URL debe permitir reconstruir el destino. En `/talleres/20`, `20` identifica el registro que consultaremos. En `/talleres?q=cer`, `q` indica un filtro del listado. Ninguno transporta una ficha personal completa.

## Reutilizar la capa de datos

Conserva `Taller` en `domain/models/taller.dart`, el contrato `InscripcionesRepository` y su servicio y repositorio locales del formulario. La lista de opciones procede de `data`, mediante DTO y conversión a dominio. No copies los talleres dentro del router.

Estos dos ViewModels reciben el contrato. El listado filtra sin alterar la fuente y el detalle busca por identidad. Son objetos síncronos que representan los parámetros recibidos; no necesitan `ChangeNotifier` porque esta versión no modifica su estado después de crearse.


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

## Mostrar listado y detalle

Crea estas vistas completas. Reciben sus ViewModels y no importan el servicio ni DTO. La pulsación utiliza el nombre `taller` y su identificador; no el índice de la lista.


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

## Declarar la ruta con sus parámetros

Crea esta función de configuración. La hija `:id` no empieza por `/`: se une al padre `/talleres`. `state.pathParameters['id']` contiene el segmento reconocido; usamos `!` porque el patrón exige ese segmento. Esto no garantiza que exista en el repositorio: esa ausencia la representa el ViewModel.

`state.uri.queryParameters['q'] ?? ''` obtiene el filtro opcional. El router convierte la URL en argumentos y compone el destino; el filtrado y la búsqueda siguen fuera de los widgets.


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

En `app_router.dart`, importa `../../domain/repositories/inscripciones_repository.dart` y `ruta_talleres.dart`. Cambia la firma a `GoRouter crearRouter(InscripcionesRepository repository)` y añade `rutaTalleres(repository)` a `routes`, conservando `/` y `/ayuda`.

En el arranque, importa el servicio y repositorio de `data` y sustituye solo `initState` por este montaje:


```dart
@override
void initState() {
  super.initState();
  final repository = InscripcionesLocalRepository(const InscripcionesLocalService());
  _router = crearRouter(repository);
}
```

Añade una entrada al catálogo con `onTap: () => context.go('/talleres')`. Para probar una búsqueda sin concatenar manualmente la URL:


```dart
context.goNamed('talleres', queryParameters: {'q': 'cer'});
context.goNamed('taller', pathParameters: {'id': '20'});
```

## Cuándo utilizar extra

`extra` permite adjuntar un objeto: `context.go('/talleres/20', extra: taller)`. El destino puede leer `state.extra`, pero el objeto no queda descrito por la URL. No lo hagas obligatorio para reconstruir un detalle: un enlace copiado o una entrada directa pueden no traerlo. En web, los objetos complejos pueden requerir un codec para su serialización. En este ejemplo usamos siempre el identificador y consultamos el repositorio, por lo que no necesitamos `extra`.

Los parámetros son texto no confiable: si un futuro campo requiere un número, utiliza `int.tryParse` y representa el error; no uses `int.parse` sin tratamiento. No pongas contraseñas ni fichas personales en la URL.

Referencias: [navegación y extra](https://pub.dev/documentation/go_router/latest/topics/Navigation-topic.html) y [GoRouterState](https://pub.dev/documentation/go_router/latest/go_router/GoRouterState-class.html).
