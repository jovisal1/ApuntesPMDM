---
title: "1. Models relacionats"
sidebar:
  order: 2
---

## Per a què serveixen els models en l’arquitectura

Els models defineixen la informació amb què treballa l’aplicació: què és un article i com es relaciona amb la categoria i el centre. Són el vocabulari comú del repositori i la interfície; el servici retornarà els seus propis models de la font (DTO), que convertirem en l’apartat següent. Així, la llista i el detall reben el mateix `Articulo`, en lloc d’interpretar posicions d’una llista de textos.

En este pas desenvolupem les dades del domini. La carpeta `domain/models` agrupa estes classes; no estem afegint una capa de casos d’ús. Els models desconeixen d’on arriben les dades i com es dibuixen. Per exemple, `diasPrestamo` pertany a l’article, mentre que la grandària del text pertany a la vista. Esta separació permet comprovar les relacions amb Dart sense construir una pantalla.

Un article pertany a una categoria i s’arreplega en un centre. Usarem tres models relacionats per a evitar repetir adreces i mantindre llistes paral·leles que podrien desordenar-se. La fitxa de detall utilitzarà estos mateixos objectes.

`Categoria` agrupa el nom i les sigles que mostrarem en l’avatar. `PuntoRecogida` conté el centre, l’adreça i l’horari. `Articulo` relaciona els dos i afig les condicions del préstec. Diversos articles poden compartir una categoria o un punt d’arreplega.

## Crea els tres fitxers complets

Els camps `final` no es reassignen i els constructors `const` permeten crear dades constants. `required` exigeix proporcionar cada valor. L’`enum EstadoArticulo` limita l’estat a tres opcions vàlides: disponible, prestat o en manteniment.

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

Els models no importen Flutter. Les sigles són dades de la categoria; la grandària, el color i la forma de l’avatar seran decisions de la vista. La mateixa regla s’aplica a l’estat: el model conté el valor i la vista decideix l’etiqueta.
