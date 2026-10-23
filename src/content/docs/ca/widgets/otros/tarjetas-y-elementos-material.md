---
title: "Card, ListTile, Divider i CircleAvatar"
sidebar:
  order: 2
---

**`Card` agrupa informació relacionada en una superfície Material.** `ListTile` organitza una fila, `Divider` separa grups i `CircleAvatar` representa una persona. Complementen la composició; no tots són contenidors de disposició.

```dart
const Card(child: Padding(padding: EdgeInsets.all(16), child: Text('Grupo de senderismo')))
```

`Card.child` rep un widget. `Padding` afig espai interior: una targeta no aporta automàticament l’espai necessari per a qualsevol contingut.

## 🔧 Propietats principals

### 1. Card: `color`, `elevation`, `margin` i `shape`

Permeten diferenciar una fitxa sense reconstruir el contingut. L’elevació afecta l’ombra i `shape` definix el contorn.

```dart
Card(
  color: Colors.teal.shade50,
  elevation: 3,
  margin: const EdgeInsets.symmetric(vertical: 8),
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
  child: const Padding(padding: EdgeInsets.all(16), child: Text('Salida del sábado')),
)
```

`RoundedRectangleBorder` i `BorderRadius` descriuen la forma. `margin` és separació exterior; `Padding` controla l’interior. Per a retallar el fill a la forma, configura també `clipBehavior`.

### 2. ListTile: `title`, `subtitle`, `leading` i `trailing`

Organitza la informació principal i secundària amb símbols opcionals. És útil per a mostrar membres d’un grup, ajustos o resums de rutes.

```dart
const ListTile(
  leading: Icon(Icons.hiking),
  title: Text('Ruta de la fuente'),
  subtitle: Text('Sábado · 9:00'),
  trailing: Icon(Icons.info_outline),
)
```

`Text` aporta els nivells d’informació i `Icon`, els símbols. La icona final no executa accions per si mateixa. `ListTile` necessita amplària limitada: dins d’una fila, embolcalla’l amb `Expanded`.

### 3. `onTap`, `enabled` i `isThreeLine`

Permeten configurar l’acció de la fila, indicar si està disponible i reservar espai per a un subtítol de dos línies. Són útils per a files amb més explicació.

```dart
ListTile(
  title: const Text('Ruta de la fuente'),
  subtitle: const Text('Punto de encuentro: plaza del pueblo.\nLleva agua y calzado cómodo.'),
  isThreeLine: true,
  enabled: true,
  onTap: () { debugPrint('Consultar detalles de la ruta'); },
)
```

`isThreeLine` no afig salts de línia ni retalla el text: reserva una disposició de tres línies en total. L’exemple inclou `\n` en el subtítol. `enabled: false` desactiva la interacció; `visualDensity: VisualDensity.compact` permet comparar una presentació compacta.

### 4. Divider: `height`, `thickness`, `indent` i `endIndent`

Separa visualment seccions relacionades. L’altura és l’espai reservat i el gruix és la línia dibuixada dins.

```dart
const Divider(height: 24, thickness: 2, indent: 16, endIndent: 16, color: Colors.teal)
```

Els marges dels extrems acurten la línia sense reduir el bloc. No depengues del color com a únic senyal d’agrupació: acompanya-la de títols si cal.

### 5. CircleAvatar: `radius`, `backgroundColor` i `child`

Representa una persona amb inicials quan no tenim fotografia. És útil per a identificar participants sense imatges remotes.

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

`CircleAvatar` ocupa el `leading`; el nom complet queda en `title`. `backgroundImage: AssetImage(...)` permet una foto local: `AssetImage` és un proveïdor d’imatge, no un widget. `foregroundImage` afig una imatge de primer pla; per a mostrar inicials no necessitem cap proveïdor d’imatge.

## ✍️ Activitat: crea components amb variants

Implementa els dos components en fitxers de `lib/ui/core/ui/`. Cada classe rep la configuració amb paràmetres amb nom i camps `final`; utilitza `StatelessWidget` i constructor `const` quan siga possible. Els paràmetres sense valor predeterminat són obligatoris (`required`), encara que admeten `null`. Les variants decidixen la presentació sense duplicar la classe.

`VoidCallback` és el tipus d’una funció sense arguments ni valor retornat; `VoidCallback?` admet també `null`, com indica el contracte de `FilaParticipante`.

### 1. `TarjetaSalida`

`lib/ui/core/ui/tarjeta_salida.dart`

Paràmetres: `String titulo`, `String detalle`, `bool destacada = false`, `bool compacta = false`.

Combina `Card`, `ListTile` i, si cal, `Padding`. Canvia elevació i fons segons l’èmfasi i densitat segons el mode compacte, conservant les dades.

### 2. `FilaParticipante`

`lib/ui/core/ui/fila_participante.dart`

Paràmetres: `String nombre`, `String iniciales`, `bool guia = false`, `VoidCallback? onTap`.

Utilitza un avatar i indica amb paraules el paper del participant. El paràmetre `guia` canvia la informació secundària; la pantalla proporciona el callback.

## 🧩 Mostra les variants en el catàleg

En `lib/ui/catalogo/ui/otros_ejemplos_pantalla.dart`, importa els fitxers dels components al principi:

```dart
import 'package:catalogo_widgets/ui/core/ui/tarjeta_salida.dart';
import 'package:catalogo_widgets/ui/core/ui/fila_participante.dart';
```

Després d’implementar-los, estos usos poden formar part de la llista d’exemples:

```dart
const TarjetaSalida(titulo: 'Ruta de la fuente', detalle: 'Sábado · 9:00', destacada: true),
FilaParticipante(
  nombre: 'Mar López',
  iniciales: 'ML',
  guia: true,
  onTap: () { debugPrint('Participante seleccionado'); },
),
```

Mostra les quatre combinacions de la targeta i dos participants amb papers diferents. Prova un nom llarg i un callback nul. Comprova que l’avatar i el text continuen sent llegibles amb la densitat compacta.

Completa les variants que falten amb títols i explicacions pròpies. Utilitza `create-component` per a revisar el teu intent i `test-widget` per a comprovar requisits concrets. Executa `dart format lib test`, `flutter analyze` i les proves. Revisa també el resultat visual: una prova superada no garantix que el text es llija bé.

Referències: [Card](https://api.flutter.dev/flutter/material/Card-class.html) · [ListTile](https://api.flutter.dev/flutter/material/ListTile-class.html) · [Divider](https://api.flutter.dev/flutter/material/Divider-class.html) · [CircleAvatar](https://api.flutter.dev/flutter/material/CircleAvatar-class.html).
