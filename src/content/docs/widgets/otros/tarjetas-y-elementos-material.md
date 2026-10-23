---
title: "Card, ListTile, Divider y CircleAvatar"
sidebar:
  order: 2
---

**`Card` agrupa información relacionada en una superficie Material.** `ListTile` organiza una fila de información, `Divider` separa grupos y `CircleAvatar` representa a una persona. Estos widgets complementan la composición; no todos son contenedores de layout.

```dart
const Card(child: Padding(padding: EdgeInsets.all(16), child: Text('Grupo de senderismo')))
```

`Card.child` recibe un widget. `Padding` añade espacio interior, porque una tarjeta no aporta automáticamente el margen que necesita cualquier contenido.

## 🔧 Propiedades principales

### 1. Card: `color`, `elevation`, `margin` y `shape`

Permiten diferenciar una ficha sin reconstruir su contenido. La elevación afecta a la sombra y `shape` define la forma del contorno.

```dart
Card(
  color: Colors.teal.shade50,
  elevation: 3,
  margin: const EdgeInsets.symmetric(vertical: 8),
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
  child: const Padding(padding: EdgeInsets.all(16), child: Text('Salida del sábado')),
)
```

`RoundedRectangleBorder` y `BorderRadius` describen la forma. `margin` es separación exterior; el `Padding` del hijo controla el interior. Si necesitas recortar un hijo a la forma de la tarjeta, configura también `clipBehavior`.

### 2. ListTile: `title`, `subtitle`, `leading` y `trailing`

Ordena información principal y secundaria junto a símbolos opcionales. Es útil para miembros de un grupo, ajustes o resúmenes de rutas.

```dart
const ListTile(
  leading: Icon(Icons.hiking),
  title: Text('Ruta de la fuente'),
  subtitle: Text('Sábado · 9:00'),
  trailing: Icon(Icons.info_outline),
)
```

`Text` aporta los dos niveles de información e `Icon` los símbolos. El icono final no ejecuta una acción por sí mismo. `ListTile` necesita ancho limitado: dentro de una fila, envuélvelo en `Expanded`.

### 3. `onTap`, `enabled` e `isThreeLine`

Permiten que la fila responda a una acción, indicar su disponibilidad y reservar espacio para un subtítulo de dos líneas. Son útiles para filas que necesitan más explicación.

```dart
ListTile(
  title: const Text('Ruta de la fuente'),
  subtitle: const Text('Punto de encuentro: plaza del pueblo.\nLleva agua y calzado cómodo.'),
  isThreeLine: true,
  enabled: true,
  onTap: () { debugPrint('Consultar detalles de la ruta'); },
)
```

`isThreeLine` no añade un salto de línea ni recorta el texto: reserva una disposición de tres líneas en total. En el ejemplo incluimos `\n` en el subtítulo. `enabled: false` desactiva la interacción; `visualDensity: VisualDensity.compact` permite comparar una presentación más compacta.

### 4. Divider: `height`, `thickness`, `indent` y `endIndent`

Separa visualmente secciones relacionadas. La altura es el espacio reservado y el grosor es la línea que se dibuja dentro.

```dart
const Divider(height: 24, thickness: 2, indent: 16, endIndent: 16, color: Colors.teal)
```

Los márgenes de los extremos acortan la línea sin reducir todo el bloque. No dependas del color de la línea como única señal de agrupación: acompáñala de títulos si hace falta.

### 5. CircleAvatar: `radius`, `backgroundColor` y `child`

Representa una persona con iniciales cuando no tenemos fotografía. Es útil para identificar participantes sin depender de una imagen remota.

```dart
const ListTile(
  leading: CircleAvatar(
    radius: 20,
    backgroundColor: Colors.indigo,
    foregroundColor: Colors.white,
    child: Text('ML'),
  ),
  title: Text('Mar López'),
  subtitle: Text('Guía del grupo'),
)
```

`CircleAvatar` ocupa el `leading` de la fila; el nombre completo queda en `title`. `backgroundImage: AssetImage(...)` permite usar una foto local: `AssetImage` es un proveedor de imagen, no un widget. `foregroundImage` añade una imagen de primer plano; no necesitas ninguna para el ejemplo con iniciales.

## ✍️ Actividad: crea componentes con variantes

Implementa los dos componentes en archivos de `lib/ui/core/ui/`. Cada clase recibe la configuración mediante parámetros con nombre y campos `final`; utiliza `StatelessWidget` y constructor `const` cuando sea posible. Los parámetros sin valor predeterminado son obligatorios (`required`), aunque admitan `null`. Las variantes deciden la presentación sin duplicar la clase.

`VoidCallback` es el tipo de una función sin argumentos ni valor devuelto; `VoidCallback?` permite también `null`, como indica el contrato de `FilaParticipante`.

### 1. `TarjetaSalida`

`lib/ui/core/ui/tarjeta_salida.dart`

Parámetros: `String titulo`, `String detalle`, `bool destacada = false`, `bool compacta = false`.

Combina `Card`, `ListTile` y, si lo necesitas, `Padding`. Cambia elevación y fondo según el énfasis, y densidad según el modo compacto, conservando los datos.

### 2. `FilaParticipante`

`lib/ui/core/ui/fila_participante.dart`

Parámetros: `String nombre`, `String iniciales`, `bool guia = false`, `VoidCallback? onTap`.

Usa un avatar y muestra el papel del participante con palabras. La condición de guía cambia la información secundaria; el callback se entrega desde la pantalla.

## 🧩 Muestra las variantes en el catálogo

En `lib/ui/catalogo/ui/otros_ejemplos_pantalla.dart`, importa los archivos de los componentes al principio:

```dart
import 'package:catalogo_widgets/ui/core/ui/tarjeta_salida.dart';
import 'package:catalogo_widgets/ui/core/ui/fila_participante.dart';
```

Después de implementarlos, estos usos pueden formar parte de la lista de ejemplos:

```dart
const TarjetaSalida(titulo: 'Ruta de la fuente', detalle: 'Sábado · 9:00', destacada: true),
FilaParticipante(
  nombre: 'Mar López',
  iniciales: 'ML',
  guia: true,
  onTap: () { debugPrint('Participante seleccionado'); },
),
```

Muestra las cuatro combinaciones de tarjeta y dos participantes con distinto papel. Prueba un nombre largo y un callback nulo. El avatar y la fila no deben perder legibilidad con la densidad compacta.

Completa las variantes que falten con títulos y explicaciones propias. Utiliza `create-component` para revisar tu intento y `test-widget` para comprobar requisitos concretos. Ejecuta `dart format lib test`, `flutter analyze` y las pruebas. Revisa también el resultado visual: una prueba superada no garantiza que el texto se lea bien.

Referencias: [Card](https://api.flutter.dev/flutter/material/Card-class.html) · [ListTile](https://api.flutter.dev/flutter/material/ListTile-class.html) · [Divider](https://api.flutter.dev/flutter/material/Divider-class.html) · [CircleAvatar](https://api.flutter.dev/flutter/material/CircleAvatar-class.html).
