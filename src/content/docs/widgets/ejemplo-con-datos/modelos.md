---
title: "1. Modelos relacionados"
sidebar:
  order: 2
---

## Para qué sirven los modelos en la arquitectura

Los modelos definen la información con la que trabaja la aplicación: qué es un artículo y cómo se relaciona con su categoría y su centro. Son el vocabulario común del repositorio y la interfaz; el servicio devolverá sus propios modelos de la fuente (DTO), que convertiremos en el siguiente apartado. Así, la lista y el detalle reciben el mismo `Articulo`, en lugar de interpretar posiciones de una lista de textos.

En este paso desarrollamos los datos del dominio. La carpeta `domain/models` agrupa estas clases; no estamos añadiendo una capa de casos de uso. Los modelos desconocen de dónde llegan los datos y cómo se dibujan. Por ejemplo, `diasPrestamo` pertenece al artículo, mientras que el tamaño del texto pertenece a la vista. Esta separación permite comprobar las relaciones con Dart sin construir una pantalla.

Un artículo pertenece a una categoría y se recoge en un centro. Usaremos tres modelos relacionados para evitar repetir direcciones y mantener listas paralelas que podrían desordenarse. La ficha de detalle utilizará esos mismos objetos.

`Categoria` agrupa el nombre y las siglas que mostraremos en el avatar. `PuntoRecogida` contiene el centro, dirección y horario. `Articulo` relaciona ambos y añade las condiciones del préstamo. Varios artículos pueden compartir una categoría o un punto de recogida.

## Crea los tres archivos completos

Los campos `final` no se reasignan y los constructores `const` permiten crear datos constantes. `required` exige proporcionar cada valor. El `enum EstadoArticulo` limita el estado a tres opciones válidas: disponible, prestado o en mantenimiento.

`lib/domain/models/categoria.dart`

```dart
class Categoria {
  const Categoria({required this.id, required this.nombre, required this.siglas});
  final String id;
  final String nombre;
  final String siglas;
}
```

`lib/domain/models/punto_recogida.dart`

```dart
class PuntoRecogida {
  const PuntoRecogida({
    required this.id,
    required this.nombre,
    required this.direccion,
    required this.horario,
  });
  final String id;
  final String nombre;
  final String direccion;
  final String horario;
}
```

`lib/domain/models/articulo.dart`

```dart
import 'categoria.dart';
import 'punto_recogida.dart';

enum EstadoArticulo { disponible, prestado, mantenimiento }

class Articulo {
  const Articulo({
    required this.id,
    required this.nombre,
    required this.descripcion,
    required this.categoria,
    required this.puntoRecogida,
    required this.estado,
    required this.diasPrestamo,
    required this.recomendaciones,
  });
  final String id;
  final String nombre;
  final String descripcion;
  final Categoria categoria;
  final PuntoRecogida puntoRecogida;
  final EstadoArticulo estado;
  final int diasPrestamo;
  final String recomendaciones;
}
```

Los modelos no importan Flutter. Las siglas son datos de la categoría; el tamaño, color y forma del avatar serán decisiones de la vista. La misma regla se aplica al estado: el modelo contiene el valor y la vista decide su etiqueta.
