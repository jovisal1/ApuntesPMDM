---
title: "4. Ficha de detalle y comprobaciones"
sidebar:
  order: 5
---

## Responsabilidad del detalle en la arquitectura

El detalle sigue siendo una vista de la capa de interfaz. Su propósito es presentar de forma legible un artículo que ya tenemos, agrupando sus condiciones y su punto de recogida. Recibe el modelo por constructor y decide cómo mostrarlo; no vuelve a leer el servicio ni mantiene otra copia de los datos. Que sea una pantalla nueva no obliga a crear una pieza nueva de cada capa.

## Una ficha para cualquier artículo

El listado permite comparar artículos; la ficha ofrece la información necesaria para preparar la recogida. Crearemos una sola pantalla que recibe un `Articulo` por constructor. El taladro mostrará tres días de préstamo y el centro La Plaza; el proyector, dos días y la Biblioteca del Parque.

La ficha es un `StatelessWidget`: no cambia datos ni mantiene selección propia. No necesita otro servicio, repositorio o ViewModel. Reutiliza el modelo inmutable que ya obtuvo la lista. Si más adelante añadimos una operación como reservar, habrá una nueva responsabilidad que diseñar.

## ¿Por qué `ListView` y no `Column`?

`Column` coloca widgets en vertical, pero no permite desplazarlos. En el `body` de esta ficha, una descripción larga, el móvil en horizontal o el texto ampliado pueden hacer que el contenido supere la altura disponible y aparezca un desbordamiento (`RenderFlex overflowed`). `mainAxisSize: MainAxisSize.min` no añade desplazamiento ni resuelve ese problema.

`ListView` también ordena sus hijos en vertical y permite desplazarse cuando no caben. No exige que sean artículos repetidos: aquí sus hijos son los bloques de una sola ficha. Usamos `ListView(children: ...)` porque conocemos de antemano este pequeño conjunto de bloques; no necesitamos `ListView.builder`. La elección responde al desplazamiento, no a una supuesta creación bajo demanda de los widgets de esta lista explícita.

Una **`Column` dentro de `SingleChildScrollView` también sería válida** para esta ficha breve. Permitiría usar `crossAxisAlignment: CrossAxisAlignment.start` para alinear los bloques al inicio. Mantendremos `ListView` porque resuelve la secuencia vertical y el desplazamiento con un solo widget. Si eliges la alternativa, aplica el margen con `padding` y evita `Expanded` o `Spacer` dentro de esa columna: el desplazamiento le da altura disponible sin límite.

La `Column` de `TarjetaArticulo` sí tiene sentido: organiza el contenido de una tarjeta y el `ListView` exterior desplaza la pantalla completa. Cada tarjeta no necesita su propio desplazamiento.

Puedes contrastar estas decisiones en la documentación de [Column](https://api.flutter.dev/flutter/widgets/Column-class.html), [ListView](https://api.flutter.dev/flutter/widgets/ListView-class.html) y [SingleChildScrollView](https://api.flutter.dev/flutter/widgets/SingleChildScrollView-class.html).

## Archivo completo de la ficha

La lista vertical permite leer toda la información en pantallas pequeñas y con texto ampliado. `show etiquetaEstado` importa solo esa función del archivo de la tarjeta para que ambos lugares expresen el estado de la misma forma.

`lib/ui/prestamos/ui/articulo_detalle_pantalla.dart`

```dart
import 'package:flutter/material.dart';
import '../../../domain/models/articulo.dart';
import 'tarjeta_articulo.dart' show etiquetaEstado;

class ArticuloDetallePantalla extends StatelessWidget {
  const ArticuloDetallePantalla({super.key, required this.articulo});
  final Articulo articulo;

  @override
  Widget build(BuildContext context) {
    final punto = articulo.puntoRecogida;
    return Scaffold(
      appBar: AppBar(title: const Text('Ficha del artículo')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(articulo.nombre, style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 8),
          Text('Categoría: ${articulo.categoria.nombre}'),
          Text('Estado: ${etiquetaEstado(articulo.estado)}'),
          const Divider(),
          Text(articulo.descripcion),
          const SizedBox(height: 16),
          Text('Condiciones del préstamo', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 8),
          Text('Plazo máximo: ${articulo.diasPrestamo} días'),
          Text(articulo.recomendaciones),
          const Divider(),
          Text('Punto de recogida', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 8),
          Text(punto.nombre),
          Text(punto.direccion),
          Text(punto.horario),
          const SizedBox(height: 16),
          const Text('Consulta informativa. El préstamo se solicita presencialmente en el centro.'),
        ],
      ),
    );
  }
}
```

## Abrir, leer y volver

La acción **Ver detalle** del listado ya pasa el artículo mediante `ArticuloDetallePantalla(articulo: articulo)`. No hay nombres de objeto escritos dentro de la ficha ni selección por índice. Por eso el mismo widget sirve para los cuatro artículos, incluidos los que no están disponibles: también puede interesar consultar sus condiciones.

Al abrirla desde la lista, `AppBar` muestra automáticamente la flecha para regresar. Esa acción cierra la ruta de detalle; no vuelve a construir una miniaplicación nueva. Por ejemplo, filtra por disponibles, abre el taladro y vuelve: deben permanecer los dos artículos disponibles y el botón **Mostrar todos**.

Referencias: [abrir una pantalla y volver](https://docs.flutter.dev/cookbook/navigation/navigation-basics) y [pasar datos a una pantalla](https://docs.flutter.dev/cookbook/navigation/passing-data).

## ✅ Comprueba la miniaplicación

Desde la raíz de `catalogo_widgets`, ejecuta:

```bash
dart format lib test
flutter analyze
flutter test
flutter run
```

El primer comando aplica formato; el segundo detecta problemas de Dart/Flutter; el tercero ejecuta las pruebas y el último abre la aplicación. Si la prueba inicial contaba exactamente ocho entradas del catálogo, actualízala para incluir la nueva.

| Acción | Resultado esperado |
| --- | --- |
| Abrir Ejemplo con datos | «Mostrando 4 de 4 artículos». |
| Pulsar Solo disponibles | Taladro y proyector; «Mostrando 2 de 4 artículos». |
| Abrir el detalle del taladro | Bricolaje, disponible, plazo de 3 días y Calle Mayor, 12. |
| Volver y abrir el proyector | Ocio, disponible, plazo de 2 días y Avenida del Parque, 8. |
| Regresar del detalle | Se conserva el filtro y siguen visibles dos artículos. |
| Pulsar Mostrar todos | Se recuperan los cuatro artículos. |
| Abrir la máquina de coser | Se puede consultar su ficha aunque esté prestada; plazo de 7 días. |
| Salir al catálogo y abrir de nuevo | Empieza con los cuatro artículos, sin filtro. |

Prueba lista y detalle a 320 píxeles de ancho y con texto ampliado. Desplázate hasta la tienda de campaña y hasta el horario de su ficha: no debe aparecer ningún desbordamiento.

Para comprobar el estado vacío, inyecta una subclase de `ArticulosLocalService` cuyo `leer` devuelva `[]`. Deben verse el resumen «Mostrando 0 de 0 artículos» y el mensaje vacío con ambos filtros. La subclase debe devolver `List<ArticuloDto>` e importar `data/models/articulo_dto.dart`. Comprueba también un DTO con código desconocido o con un plazo de 25 horas: el repositorio debe lanzar `FormatException`. Una fuente con dos artículos del mismo `id` debe provocar el `StateError` del repositorio. No cambies los datos de producción para cada prueba.

## ✍️ Ampliaciones que resolverás tú

1. **Nuevo centro y artículos:** añade un centro cívico y dos artículos con identificadores únicos; uno disponible y otro prestado. Resultado: seis en total y tres con el filtro. Sus fichas deben mostrar el nuevo centro sin cambiar la pantalla de detalle.
2. **Tarjeta compacta:** añade `bool compacta = false` a `TarjetaArticulo`. La variante compacta oculta solo la descripción. Muestra ambas variantes con el mismo artículo: deben conservar nombre, categoría, estado y botón de detalle. El modelo no debe almacenar esta preferencia visual.
3. **Filtrar por categoría:** añade al ViewModel una selección opcional por `Categoria.id`, combinada con disponibilidad. Con los datos iniciales, seleccionar Ocio y Solo disponibles debe mostrar únicamente el proyector. Una combinación sin resultados debe mostrar el mensaje vacío. Diseña el control de selección sin introducir acceso a datos en la tarjeta.

Entrega las clases en las rutas indicadas y justifica cada responsabilidad. Puedes utilizar `give-hints` para una pista, `review-code` para revisar dependencias y `test-widget` para preparar pruebas de filtros, detalle correcto y regreso con selección conservada.
