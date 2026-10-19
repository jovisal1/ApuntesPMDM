---
title: "Placeholder: reservar un espacio provisional"
sidebar:
  order: 7
---

**`Placeholder` dibuja un recuadro con diagonales para señalar una parte de la interfaz todavía pendiente.** Sirve, por ejemplo, para reservar el lugar de un mapa durante el desarrollo.

```dart
const SizedBox(height: 100, child: Placeholder())
```

`SizedBox` es un widget que limita aquí la altura a 100. `Placeholder` dibuja dentro de ese espacio. Incluimos ese límite para que el ejemplo sea seguro dentro de una lista vertical.

## 🔧 Propiedades principales

### 1. `color` y `strokeWidth`: aspecto del trazo

`color` y `strokeWidth` cambian el color y el grosor del recuadro y de sus diagonales. Son útiles para que el espacio pendiente se distinga del fondo o para identificar distintas piezas del prototipo durante el desarrollo. No cambian el tamaño reservado.

```dart
const SizedBox(
  height: 120,
  child: Placeholder(color: Colors.teal, strokeWidth: 3),
)
```

Mantén la misma altura y compara dos grosores. `strokeWidth` no cambia las dimensiones del hueco.

### 2. `fallbackWidth` y `fallbackHeight`: tamaño de reserva

`fallbackWidth` y `fallbackHeight` ofrecen un tamaño de reserva cuando el padre no limita el espacio en alguna dirección. Son útiles, por ejemplo, para dar una altura visible al marcador dentro de una lista vertical. No fuerzan el tamaño cuando las restricciones del padre ya lo determinan.

```dart
const Placeholder(fallbackHeight: 100, fallbackWidth: 200)
```

Dentro del `ListView` vertical del catálogo, la altura del hijo no está limitada: se usa `fallbackHeight`. El ancho lo determina la lista, por lo que `fallbackWidth` no hace que el marcador mida necesariamente 200 de ancho.

### 3. `child`: identificar qué falta

`child` permite colocar un widget dentro del marcador. Es útil para indicar qué pieza falta, por ejemplo «Aquí irá el mapa», de forma que quien revise el prototipo entienda el propósito del recuadro sin tener que consultar el código.

```dart
const SizedBox(
  height: 140,
  child: Placeholder(
    child: Center(child: Text('Aquí irá el mapa')),
  ),
)
```

`child` recibe un único widget. `Center` centra su hijo y `Text` muestra el mensaje; el recuadro sigue representando una pieza pendiente.

`Placeholder` no detecta una carga en curso ni es un indicador de progreso. Para esperar una imagen utiliza su `loadingBuilder`; para una pieza aún sin implementar, utiliza el marcador.

## ✍️ Actividad: crea componentes con variantes

Implementa **los dos componentes** siguientes como `StatelessWidget`, cada uno en el archivo indicado dentro de `lib/ui/core/ui/`. Los nombres y parámetros son el contrato que debes cumplir, no una solución implementada. Usa campos `final`, parámetros con nombre, `super.key` y constructor `const` cuando sea posible. Las variantes se eligen mediante parámetros: no necesitan estado propio.

Los parámetros sin valor predeterminado son obligatorios; márcalos con `required`, también si admiten `null`. Un tipo terminado en `?` admite `null`. Los `enum` propuestos se declaran en el mismo archivo que el componente.

Si necesitas recordar cómo un parámetro selecciona el aspecto, consulta [Variantes de un componente](../estilo-y-variantes/). La implementación de estas propuestas te corresponde a ti.

### 1. `EspacioPendiente`

`lib/ui/core/ui/espacio_pendiente.dart`

Parámetros: `String etiqueta`, `bool compacto = false`.

Combina `SizedBox`, `Placeholder`, `Center` y `Text`. El modo compacto tendrá altura 80; el normal, 160. La etiqueta debe permanecer legible en ambos.

### 2. `MarcadorPrototipo`

`lib/ui/core/ui/marcador_prototipo.dart`

Parámetros: `TipoMarcador tipo`, `double alto = 120`.

Define `enum TipoMarcador { imagen, mapa, grafico }`. Cada tipo selecciona su etiqueta y un estilo de trazo distinto. No debe cargar una imagen, un mapa ni un gráfico reales.

## 🧩 Muestra los componentes en el catálogo

En `lib/ui/catalogo/ui/placeholder_ejemplos_pantalla.dart`, conserva `PlaceholderEjemplosPantalla` e importa los archivos nuevos. Cada import va al principio, fuera de las clases:

```dart
import 'package:catalogo_widgets/ui/core/ui/espacio_pendiente.dart';
import 'package:catalogo_widgets/ui/core/ui/marcador_prototipo.dart';
```

En un import `package:`, `catalogo_widgets` identifica el paquete y la ruta siguiente comienza dentro de `lib/`. Los imports hacen accesibles las clases y los `enum` públicos de esos archivos.

Cuando hayas implementado los componentes, podrás utilizarlos así dentro de `children`:

```dart
const EspacioPendiente(etiqueta: 'Mapa pendiente'),
const EspacioPendiente(etiqueta: 'Mapa pendiente', compacto: true),
const MarcadorPrototipo(tipo: TipoMarcador.imagen),
const MarcadorPrototipo(tipo: TipoMarcador.mapa, alto: 180),
const MarcadorPrototipo(tipo: TipoMarcador.grafico),
```

Muestra ambos tamaños y los tres tipos. Comprueba altura, etiqueta y estilo sin cambiar el contenido del catálogo. Si añades parámetros de medidas, valida que sean positivos.

Añade las combinaciones que falten: los usos anteriores son solo un comienzo. Identifica cada caso con un título y una explicación propia. No dupliques una clase por cada combinación ni copies los componentes dentro de la pantalla. Puedes utilizar `create-component` para revisar tu implementación y `test-widget` para generar pruebas con criterios concretos. Ejecuta `dart format lib`, `flutter analyze` y las pruebas que hayas creado.

Referencia: [Placeholder](https://api.flutter.dev/flutter/widgets/Placeholder-class.html).
