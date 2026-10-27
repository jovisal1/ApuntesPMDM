---
title: "4. Fitxa de detall i comprovacions"
sidebar:
  order: 5
---

## Responsabilitat del detall en l’arquitectura

El detall continua sent una vista de la capa d’interfície. El seu propòsit és presentar de manera llegible un article que ja tenim, agrupant les condicions i el punt d’arreplega. Rep el model per constructor i decideix com mostrar-lo; no torna a llegir el servici ni manté una altra còpia de les dades. Que siga una pantalla nova no obliga a crear una peça nova de cada capa.

## Una fitxa per a qualsevol article

El llistat permet comparar articles; la fitxa ofereix la informació necessària per a preparar l’arreplega. Crearem una sola pantalla que rep un `Articulo` per constructor. El trepant mostrarà tres dies de préstec i el centre La Plaza; el projector, dos dies i la Biblioteca del Parque.

La fitxa és un `StatelessWidget`: no canvia dades ni manté selecció pròpia. No necessita un altre servici, repositori o ViewModel. Reutilitza el model immutable que ja obtingué la llista. Si més avant afegim una operació com reservar, hi haurà una nova responsabilitat que dissenyar.

## Per què `ListView` i no `Column`?

`Column` col·loca widgets en vertical, però no permet desplaçar-los. En el `body` d’esta fitxa, una descripció llarga, el mòbil en horitzontal o el text ampliat poden fer que el contingut supere l’altura disponible i aparega un desbordament (`RenderFlex overflowed`). `mainAxisSize: MainAxisSize.min` no afig desplaçament ni resol eixe problema.

`ListView` també ordena els fills en vertical i permet desplaçar-se quan no caben. No exigeix que siguen articles repetits: ací els fills són els blocs d’una sola fitxa. Usem `ListView(children: ...)` perquè coneixem per endavant este conjunt menut de blocs; no necessitem `ListView.builder`. L’elecció respon al desplaçament, no a una suposada creació sota demanda dels widgets d’esta llista explícita.

Una **`Column` dins de `SingleChildScrollView` també seria vàlida** per a esta fitxa breu. Permetria usar `crossAxisAlignment: CrossAxisAlignment.start` per a alinear els blocs a l’inici. Mantindrem `ListView` perquè resol la seqüència vertical i el desplaçament amb un sol widget. Si tries l’alternativa, aplica el marge amb `padding` i evita `Expanded` o `Spacer` dins d’eixa columna: el desplaçament li dona altura disponible sense límit.

La `Column` de `TarjetaArticulo` sí que té sentit: organitza el contingut d’una targeta i el `ListView` exterior desplaça la pantalla completa. Cada targeta no necessita el seu propi desplaçament.

Pots contrastar estes decisions en la documentació de [Column](https://api.flutter.dev/flutter/widgets/Column-class.html), [ListView](https://api.flutter.dev/flutter/widgets/ListView-class.html) i [SingleChildScrollView](https://api.flutter.dev/flutter/widgets/SingleChildScrollView-class.html).

## Fitxer complet de la fitxa

La llista vertical permet llegir tota la informació en pantalles menudes i amb text ampliat. `show etiquetaEstado` importa només eixa funció del fitxer de la targeta perquè els dos llocs expressen l’estat de la mateixa manera.

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

## Obrir, llegir i tornar

L’acció **Ver detalle** del llistat ja passa l’article mitjançant `ArticuloDetallePantalla(articulo: articulo)`. No hi ha noms d’objecte escrits dins de la fitxa ni selecció per índex. Per això el mateix widget serveix per als quatre articles, inclosos els que no estan disponibles: també pot interessar consultar-ne les condicions.

En obrir-la des de la llista, `AppBar` mostra automàticament la fletxa per a tornar. Eixa acció tanca la ruta de detall; no torna a construir una miniaplicació nova. Per exemple, filtra per disponibles, obri el trepant i torna: han de romandre els dos articles disponibles i el botó **Mostrar todos**.

Referències: [obrir una pantalla i tornar](https://docs.flutter.dev/cookbook/navigation/navigation-basics) i [passar dades a una pantalla](https://docs.flutter.dev/cookbook/navigation/passing-data).

## ✅ Comprova la miniaplicació

Des de l’arrel de `catalogo_widgets`, executa:

```bash
dart format lib test
flutter analyze
flutter test
flutter run
```

El primer comandament aplica format; el segon detecta problemes de Dart/Flutter; el tercer executa les proves i l’últim obri l’aplicació. Si la prova inicial comptava exactament huit entrades del catàleg, actualitza-la per a incloure la nova.

| Acció | Resultat esperat |
| --- | --- |
| Obrir Ejemplo con datos | «Mostrando 4 de 4 artículos». |
| Polsar Solo disponibles | Trepant i projector; «Mostrando 2 de 4 artículos». |
| Obrir el detall del trepant | Bricolaje, disponible, termini de 3 dies i Calle Mayor, 12. |
| Tornar i obrir el projector | Ocio, disponible, termini de 2 dies i Avenida del Parque, 8. |
| Tornar del detall | Es conserva el filtre i continuen visibles dos articles. |
| Polsar Mostrar todos | Es recuperen els quatre articles. |
| Obrir la màquina de cosir | Es pot consultar la fitxa encara que estiga prestada; termini de 7 dies. |
| Eixir al catàleg i obrir de nou | Comença amb els quatre articles, sense filtre. |

Prova llista i detall a 320 píxels d’amplària i amb text ampliat. Desplaça’t fins a la tenda de campanya i fins a l’horari de la seua fitxa: no ha d’aparéixer cap desbordament.

Per a comprovar l’estat buit, injecta una subclasse d’`ArticulosLocalService` amb un `leer` que retorne `[]`. Han de veure’s el resum «Mostrando 0 de 0 artículos» i el missatge buit amb els dos filtres. La subclasse ha de retornar `List<ArticuloDto>` i importar `data/models/articulo_dto.dart`. Comprova també un DTO amb codi desconegut o amb un termini de 25 hores: el repositori ha de llançar `FormatException`. Una font amb dos articles del mateix `id` ha de provocar el `StateError` del repositori. No canvies les dades de producció per a cada prova.

## ✍️ Ampliacions que resoldràs tu

1. **Nou centre i articles:** afig un centre cívic i dos articles amb identificadors únics; un disponible i un altre prestat. Resultat: sis en total i tres amb el filtre. Les seues fitxes han de mostrar el nou centre sense canviar la pantalla de detall.
2. **Targeta compacta:** afig `bool compacta = false` a `TarjetaArticulo`. La variant compacta oculta només la descripció. Mostra les dos variants amb el mateix article: han de conservar nom, categoria, estat i botó de detall. El model no ha de guardar esta preferència visual.
3. **Filtrar per categoria:** afig al ViewModel una selecció opcional per `Categoria.id`, combinada amb disponibilitat. Amb les dades inicials, seleccionar Ocio i Solo disponibles ha de mostrar únicament el projector. Una combinació sense resultats ha de mostrar el missatge buit. Dissenya el control de selecció sense introduir accés a dades en la targeta.

Entrega les classes en les rutes indicades i justifica cada responsabilitat. Pots utilitzar `give-hints` per a una pista, `review-code` per a revisar dependències i `test-widget` per a preparar proves de filtres, detall correcte i retorn amb selecció conservada.
