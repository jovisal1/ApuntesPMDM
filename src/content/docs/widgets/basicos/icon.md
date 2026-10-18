---
title: "Icon: representar una idea con un símbolo"
sidebar:
  order: 5
---

**`Icon` representa una idea mediante un símbolo**. Recibe un `IconData`, como los valores de `Icons`. No utiliza una fotografía ni ejecuta acciones por sí mismo.

```dart
const Icon(Icons.favorite)
```

`Icons.favorite` identifica el corazón que dibujará `Icon`. Los proyectos habituales incluyen `uses-material-design: true` en `pubspec.yaml`, necesario para estos símbolos.

## 🔧 Propiedades principales

### 1. Símbolo, `size` y `color`

El primer argumento elige el símbolo que representa la idea; `size` determina su tamaño y `color`, su color. Son útiles para adaptar el mismo icono a un indicador pequeño o a un elemento destacado, y para diferenciar estados sin depender únicamente del color.

```dart
const Icon(Icons.terrain, size: 48, color: Colors.teal)
```

Compara este símbolo con `Icons.favorite` y cambia el tamaño de 48 a 24. La medida se expresa en píxeles lógicos.

### 2. `semanticLabel`: explicar el significado

`semanticLabel` explica el significado del icono a las tecnologías de asistencia. Es útil cuando el símbolo comunica por sí solo un estado, como «ruta completada», y no hay un texto cercano que ya transmita esa información.

```dart
const Icon(Icons.check_circle, semanticLabel: 'Ruta completada')
```

La etiqueta debe describir el significado en la aplicación; no hace falta decir «círculo con marca». No aparece como texto visible.

### 3. `textDirection`: dirección de lectura

`textDirection` indica el sentido de lectura que se utilizará para los iconos que admiten reflejo. Es útil al adaptar símbolos direccionales, como una flecha de retroceso, a interfaces que se leen de izquierda a derecha (`ltr`) o de derecha a izquierda (`rtl`). Habitualmente se toma del contexto, pero podemos fijarlo para comparar el resultado.

```dart
const Icon(
  Icons.arrow_back,
  textDirection: TextDirection.rtl,
  semanticLabel: 'Atrás',
)
```

Compara `rtl` con `ltr`. El efecto depende de que el símbolo admita ese reflejo; no todos los iconos cambian.

### 4. Si necesitas una acción: `IconButton`

Un `Icon` solo representa un símbolo. Cuando ese símbolo debe permitir una acción, como guardar o buscar, utiliza `IconButton`: añade la interacción mediante `onPressed`. Su propiedad `tooltip` permite explicar la acción al situar el puntero o mantener pulsado, además de aportar una etiqueta accesible.

```dart
IconButton(
  tooltip: 'Guardar ruta',
  icon: const Icon(Icons.bookmark_border),
  onPressed: () {
    debugPrint('Pulsación en guardar ruta');
  },
)
```

`icon` recibe el `Icon` que se dibuja. `onPressed` recibe la función que se ejecutará al pulsar; `debugPrint` escribe en consola, no guarda la ruta. `tooltip` ayuda a identificar la acción. Estudiaremos los botones con más detalle después.

## ✍️ Actividad: crea componentes con variantes

Implementa **los dos componentes** siguientes como `StatelessWidget`, cada uno en el archivo indicado dentro de `lib/componentes/`. Los nombres y parámetros son el contrato que debes cumplir, no una solución implementada. Usa campos `final`, parámetros con nombre, `super.key` y constructor `const` cuando sea posible. Las variantes se eligen mediante parámetros: no necesitan estado propio.

Los parámetros sin valor predeterminado son obligatorios; márcalos con `required`, también si admiten `null`. Un tipo terminado en `?` admite `null`. Los `enum` propuestos se declaran en el mismo archivo que el componente.

Si necesitas recordar cómo un parámetro selecciona el aspecto, consulta [Variantes de un componente](../estilo-y-variantes/). La implementación de estas propuestas te corresponde a ti.

### 1. `IconoEstado`

`lib/componentes/icono_estado.dart`

Parámetros: `EstadoRuta estado`, `double tamano = 32`.

Define `enum EstadoRuta { pendiente, completada, error }`. Cada estado decide símbolo, color y etiqueta accesible. Deben distinguirse por el símbolo además del color.

### 2. `IconoFavorito`

`lib/componentes/icono_favorito.dart`

Parámetros: `bool marcado = false`, `double tamano = 32`.

Muestra corazón vacío o relleno y una descripción acorde a `marcado`. Es una representación: no cambies el valor al pulsar ni añadas estado interno.

## 🧩 Muestra los componentes en el catálogo

En `lib/view/icon_ejemplos_pantalla.dart`, conserva `IconEjemplosPantalla` e importa los archivos nuevos. Cada import va al principio, fuera de las clases:

```dart
import '../componentes/icono_estado.dart';
import '../componentes/icono_favorito.dart';
```

`../` sube de `view` a `lib`; después entra en `componentes`. Los imports hacen accesibles las clases y los `enum` públicos de esos archivos.

Cuando hayas implementado los componentes, podrás utilizarlos así dentro de `children`:

```dart
const IconoEstado(estado: EstadoRuta.pendiente),
const IconoEstado(estado: EstadoRuta.completada, tamano: 48),
const IconoEstado(estado: EstadoRuta.error),
const IconoFavorito(),
const IconoFavorito(marcado: true),
```

Comprueba los tres estados y las dos configuraciones del favorito. El mismo estado debe conservar su significado al cambiar el tamaño. Prueba símbolo y etiqueta accesible, además del color.

Añade las combinaciones que falten: los usos anteriores son solo un comienzo. Identifica cada caso con un título y una explicación propia. No dupliques una clase por cada combinación ni copies los componentes dentro de la pantalla. Puedes utilizar `create-component` para revisar tu implementación y `test-widget` para generar pruebas con criterios concretos. Ejecuta `dart format lib`, `flutter analyze` y las pruebas que hayas creado.

Referencia: [Icon](https://api.flutter.dev/flutter/widgets/Icon-class.html).
