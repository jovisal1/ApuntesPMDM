---
title: "3. ViewModel, pantalla i catàleg"
sidebar:
  order: 4
---

## Per a què serveix la capa d’interfície

La capa d’interfície converteix els articles en una experiència que permet consultar i filtrar. Inclou les vistes i el ViewModel, amb tasques diferents: les vistes organitzen widgets i recullen pulsacions; el ViewModel prepara la informació que han de mostrar i manté la selecció. Separar-los permet provar el filtre sense obrir una pantalla i canviar el disseny sense reescriure la lògica.

En polsar **Solo disponibles**, la vista crida `alternarFiltro`; el ViewModel canvia el seu estat i notifica; `ListenableBuilder` reconstrueix la llista llegint `visibles`. El repositori conserva els quatre articles durant tot el recorregut.

Filtrar no esborra articles ni canvia el seu estat. La selecció pertany a l’estat de presentació. Usarem `ChangeNotifier`, que avisa de canvis amb `notifyListeners`, i `ListenableBuilder`, que escolta eixe avís i reconstrueix el contingut. No fan falta paquets de gestió d’estat.

## 1. ViewModel

La seua responsabilitat és conservar l’estat de presentació i derivar les dades visibles a partir del repositori. Ací viu la regla del filtre perquè cap targeta haja de decidir si un article ha d’aparéixer.

`visibles` és un getter: calcula la col·lecció que es mostrarà. `where` conserva els articles que compleixen la condició; `!` nega un booleà i `||` accepta qualsevol de les dos condicions. Amb el filtre desactivat passen tots. Amb ell activat només passa `EstadoArticulo.disponible`.

`lib/ui/prestamos/view_models/prestamos_view_model.dart`

```dart
import 'package:flutter/foundation.dart';
import '../../../data/repositories/articulos_repository.dart';
import '../../../domain/models/articulo.dart';

class PrestamosViewModel extends ChangeNotifier {
  PrestamosViewModel({required ArticulosRepository repository})
      : _repository = repository;

  final ArticulosRepository _repository;
  bool _soloDisponibles = false;

  bool get soloDisponibles => _soloDisponibles;
  int get total => _repository.obtenerTodos().length;
  List<Articulo> get visibles => List<Articulo>.unmodifiable(
    _repository.obtenerTodos().where(
      (articulo) => !_soloDisponibles || articulo.estado == EstadoArticulo.disponible,
    ),
  );

  void alternarFiltro() {
    _soloDisponibles = !_soloDisponibles;
    notifyListeners();
  }
}
```

`alternarFiltro` canvia la selecció i després avisa. El ViewModel no crea widgets ni rep `BuildContext`. El repositori manté les dades originals i el ViewModel deriva la selecció sense modificar-la.

## 2. Targeta amb una acció rebuda des de fora

Esta vista representa el resum d’un únic article. Decideix la composició visual i comunica la intenció de veure el detall mitjançant un callback; obtindre la col·lecció i aplicar filtres correspon a les altres peces.

La targeta rep l’article i un `VoidCallback`: una funció sense arguments ni resultat, que executarà en polsar **Ver detalle**. La targeta no decideix la navegació. Així podrem utilitzar-la en un altre context i comprovar el callback de manera aïllada.

La funció `etiquetaEstado` transforma cada valor de l’enum en un text. L’expressió `switch` exigeix cobrir els tres casos. La declarem en este fitxer visual per a reutilitzar-la també en la fitxa, sense introduir textos de presentació en el model.

`lib/ui/prestamos/ui/tarjeta_articulo.dart`

```dart
import 'package:flutter/material.dart';
import '../../../domain/models/articulo.dart';

String etiquetaEstado(EstadoArticulo estado) => switch (estado) {
  EstadoArticulo.disponible => 'Disponible',
  EstadoArticulo.prestado => 'Prestado',
  EstadoArticulo.mantenimiento => 'En mantenimiento',
};

class TarjetaArticulo extends StatelessWidget {
  const TarjetaArticulo({
    super.key, required this.articulo, required this.onVerDetalle,
  });
  final Articulo articulo;
  final VoidCallback onVerDetalle;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(children: [
              CircleAvatar(child: Text(articulo.categoria.siglas)),
              const SizedBox(width: 12),
              Expanded(child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(articulo.nombre, style: Theme.of(context).textTheme.titleLarge),
                  Text(articulo.categoria.nombre),
                ],
              )),
            ]),
            const SizedBox(height: 12),
            Text(articulo.descripcion),
            const Divider(),
            Text('Estado: ${etiquetaEstado(articulo.estado)}'),
            const SizedBox(height: 8),
            OutlinedButton.icon(
              onPressed: onVerDetalle,
              icon: const Icon(Icons.info_outline),
              label: const Text('Ver detalle'),
            ),
          ],
        ),
      ),
    );
  }
}
```

L’`Expanded` de la fila deixa al títol l’amplària que queda al costat de l’avatar i permet diverses línies. El botó rep `onVerDetalle` sense executar-lo en `build`. L’estat s’expressa amb text perquè no depenga de reconéixer un color.

## 3. Pantalla, estat i obertura del detall

Esta vista coordina el llistat: connecta els controls amb el ViewModel, representa els resultats i obri el detall. També gestiona la vida del ViewModel perquè el filtre dure mentre la ruta continue oberta.

La pantalla rep el repositori i crea el seu ViewModel una sola vegada en `initState`. El seu `State` és el propietari i l’allibera en `dispose`. Crear-lo dins de `build` reiniciaria el filtre en reconstruir. En esta integració el repositori rebut es manté igual durant tota la vida de la ruta.

En polsar **Ver detalle**, `Navigator.of(context).push` obri una ruta damunt de la llista. `MaterialPageRoute<void>` construeix una pantalla que no retornarà un resultat; el seu `builder` crea `ArticuloDetallePantalla` passant l’article d’eixa targeta. És una integració acotada de navegació: no cal consultar dades noves ni enviar el nom per a buscar-lo després.

El fitxer següent importa la fitxa que crearem en l’apartat **Fitxa de detall i comprovacions**. Completa els dos abans d’executar l’aplicació.

`lib/ui/prestamos/ui/ejemplo_datos_pantalla.dart`

```dart
import 'package:flutter/material.dart';
import '../../../data/repositories/articulos_repository.dart';
import '../view_models/prestamos_view_model.dart';
import 'articulo_detalle_pantalla.dart';
import 'tarjeta_articulo.dart';

class EjemploDatosPantalla extends StatefulWidget {
  const EjemploDatosPantalla({super.key, required this.repository});
  final ArticulosRepository repository;

  @override
  State<EjemploDatosPantalla> createState() => _EjemploDatosPantallaState();
}

class _EjemploDatosPantallaState extends State<EjemploDatosPantalla> {
  late final PrestamosViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = PrestamosViewModel(repository: widget.repository);
  }

  @override
  void dispose() {
    _viewModel.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ejemplo con datos')),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, child) {
          final visibles = _viewModel.visibles;
          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              Text('Biblioteca de objetos del barrio',
                  style: Theme.of(context).textTheme.headlineSmall),
              const SizedBox(height: 8),
              Text('Mostrando ${visibles.length} de ${_viewModel.total} artículos'),
              const SizedBox(height: 12),
              FilledButton.icon(
                onPressed: _viewModel.alternarFiltro,
                icon: const Icon(Icons.filter_alt_outlined),
                label: Text(_viewModel.soloDisponibles
                    ? 'Mostrar todos' : 'Solo disponibles'),
              ),
              const SizedBox(height: 12),
              if (visibles.isEmpty) const Text('No hay artículos para este filtro.'),
              for (final articulo in visibles)
                TarjetaArticulo(
                  key: ValueKey(articulo.id),
                  articulo: articulo,
                  onVerDetalle: () {
                    Navigator.of(context).push(
                      MaterialPageRoute<void>(
                        builder: (context) => ArticuloDetallePantalla(articulo: articulo),
                      ),
                    );
                  },
                ),
            ],
          );
        },
      ),
    );
  }
}
```

`listenable` indica quin objecte escoltar; `builder` descriu què cal reconstruir. L’`if` afig el missatge buit i el `for` genera una targeta per article. `ValueKey` relaciona cada targeta amb el seu identificador estable. El callback de cada targeta captura el seu propi `articulo` i obri la fitxa corresponent.

Hi ha una única llista vertical per a desplaçar també la capçalera. Esta col·lecció és menuda; no necessitem llistes imbricades ni `shrinkWrap`. En obrir el detall la llista es manté davall de la nova ruta, de manera que conserva el ViewModel i el filtre.

## 4. Afig l’entrada al catàleg

El catàleg actua ací com a punt de composició: reuneix el servici, el repositori i la pantalla en obrir la funcionalitat. Construir i connectar estes dependències en l’entrada evita que cada targeta haja de crear-les.

En `lib/ui/catalogo/ui/catalogo_pantalla.dart`, afig estos imports conservant els anteriors:

```dart
import '../../../data/repositories/articulos_repository.dart';
import '../../../data/services/articulos_local_service.dart';
import '../../prestamos/ui/ejemplo_datos_pantalla.dart';
```

Després del `ListTile` d’**Otros**, incorpora esta fila a `children`. És un fragment d’integració, no un fitxer complet. Conserva `main.dart` i les altres entrades. Si ja afegires l’entrada d’una versió anterior d’este exemple, actualitza-la en lloc de duplicar-la.

```dart
ListTile(
  leading: const Icon(Icons.inventory_2_outlined),
  title: const Text('Ejemplo con datos'),
  trailing: const Icon(Icons.chevron_right),
  onTap: () {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (context) => EjemploDatosPantalla(
          repository: ArticulosRepository(service: const ArticulosLocalService()),
        ),
      ),
    );
  },
),
```

La ruta compon servici → repositori → pantalla. El ViewModel es crea en muntar la pantalla. El catàleg inicial passa de huit a nou entrades si no n’havies afegit altres. Tancar tota la miniaplicació allibera el seu ViewModel; tornar-la a obrir comença sense filtre.

Referència: [ListenableBuilder](https://api.flutter.dev/flutter/widgets/ListenableBuilder-class.html).
