---
title: "3. ViewModel, pantalla y catálogo"
sidebar:
  order: 4
---

## Para qué sirve la capa de interfaz

La capa de interfaz convierte los artículos en una experiencia que permite consultar y filtrar. Incluye las vistas y el ViewModel, con tareas distintas: las vistas organizan widgets y recogen pulsaciones; el ViewModel prepara la información que deben mostrar y mantiene la selección. Separarlos permite probar el filtro sin abrir una pantalla y cambiar el diseño sin reescribir su lógica.

Al pulsar **Solo disponibles**, la vista llama a `alternarFiltro`; el ViewModel cambia su estado y notifica; `ListenableBuilder` reconstruye la lista leyendo `visibles`. El repositorio conserva los cuatro artículos durante todo el recorrido.

Filtrar no borra artículos ni cambia su estado. La selección pertenece al estado de presentación. Usaremos `ChangeNotifier`, que avisa de cambios con `notifyListeners`, y `ListenableBuilder`, que escucha ese aviso y reconstruye su contenido. No hacen falta paquetes de gestión de estado.

## 1. ViewModel

Su responsabilidad es conservar el estado de presentación y derivar los datos visibles a partir del repositorio. Aquí vive la regla del filtro para que ninguna tarjeta tenga que decidir si un artículo debe aparecer.

`visibles` es un getter: calcula la colección que se mostrará. `where` conserva los artículos que cumplen la condición; `!` niega un booleano y `||` acepta cualquiera de las dos condiciones. Con el filtro desactivado pasan todos. Con él activado solo pasa `EstadoArticulo.disponible`.

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

`alternarFiltro` cambia la selección y después avisa. El ViewModel no crea widgets ni recibe `BuildContext`. El repositorio mantiene los datos originales y el ViewModel deriva la selección sin modificarla.

## 2. Tarjeta con una acción recibida desde fuera

Esta vista representa el resumen de un único artículo. Decide la composición visual y comunica la intención de ver el detalle mediante un callback; obtener la colección y aplicar filtros corresponde a las otras piezas.

La tarjeta recibe el artículo y un `VoidCallback`: una función sin argumentos ni resultado, que ejecutará cuando se pulse **Ver detalle**. La tarjeta no decide la navegación. Así podremos utilizarla en otro contexto y comprobar su callback de forma aislada.

La función `etiquetaEstado` transforma cada valor del enum en un texto. La expresión `switch` exige cubrir los tres casos. La declaramos en este archivo visual para reutilizarla también en la ficha, sin introducir textos de presentación en el modelo.

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

El `Expanded` de la fila deja al título el ancho que queda junto al avatar, permitiendo varias líneas. El botón recibe `onVerDetalle` sin ejecutarlo en `build`. El estado se expresa con texto para que no dependa de reconocer un color.

## 3. Pantalla, estado y apertura del detalle

Esta vista coordina el listado: conecta los controles con el ViewModel, representa sus resultados y abre el detalle. También gestiona la vida del ViewModel para que el filtro dure mientras la ruta siga abierta.

La pantalla recibe el repositorio y crea su ViewModel una sola vez en `initState`. Su `State` es el propietario y lo libera en `dispose`. Crearlo dentro de `build` reiniciaría el filtro al reconstruir. En esta integración el repositorio recibido permanece igual durante toda la vida de la ruta.

Al pulsar **Ver detalle**, `Navigator.of(context).push` abre una ruta sobre la lista. `MaterialPageRoute<void>` construye una pantalla que no devolverá un resultado; su `builder` crea `ArticuloDetallePantalla` pasando el artículo de esa tarjeta. Es una integración acotada de navegación: no hay que consultar datos nuevos ni enviar el nombre para buscarlo después.

El siguiente archivo importa la ficha que crearemos en el apartado **Ficha de detalle y comprobaciones**. Completa ambos antes de ejecutar la aplicación.

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

`listenable` indica qué objeto escuchar; `builder` describe lo que debe reconstruirse. El `if` añade el mensaje vacío y el `for` genera una tarjeta por artículo. `ValueKey` relaciona cada tarjeta con su identificador estable. El callback de cada tarjeta captura su propio `articulo` y abre la ficha correspondiente.

Hay una única lista vertical para desplazar también la cabecera. Esta colección es pequeña; no necesitamos listas anidadas ni `shrinkWrap`. Al abrir el detalle la lista permanece debajo de la nueva ruta, de modo que conserva su ViewModel y el filtro.

## 4. Añade la entrada al catálogo

El catálogo actúa aquí como punto de composición: reúne el servicio, el repositorio y la pantalla al abrir la funcionalidad. Construir y conectar estas dependencias en la entrada evita que cada tarjeta tenga que crearlas.

En `lib/ui/catalogo/ui/catalogo_pantalla.dart`, añade estos imports conservando los anteriores:

```dart
import '../../../data/repositories/articulos_repository.dart';
import '../../../data/services/articulos_local_service.dart';
import '../../prestamos/ui/ejemplo_datos_pantalla.dart';
```

Después del `ListTile` de **Otros**, incorpora esta fila a `children`. Es un fragmento de integración, no un archivo completo. Conserva `main.dart` y las otras entradas. Si ya añadiste la entrada de una versión anterior de este ejemplo, actualízala en lugar de duplicarla.

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

La ruta compone servicio → repositorio → pantalla. El ViewModel se crea al montar la pantalla. El catálogo inicial pasa de ocho a nueve entradas si no habías añadido otras. Cerrar toda la miniaplicación libera su ViewModel; volver a abrirla comienza sin filtro.

Referencia: [ListenableBuilder](https://api.flutter.dev/flutter/widgets/ListenableBuilder-class.html).
