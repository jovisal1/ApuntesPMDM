---
title: "Placeholder: reservar un espai provisional"
sidebar:
  order: 7
---

**`Placeholder` dibuixa un requadre amb diagonals per a assenyalar una part de la interfície encara pendent.** Servix per a reservar el lloc d’un mapa durant el desenvolupament.

```dart
const SizedBox(height: 100, child: Placeholder())
```

`SizedBox` és un widget que limita ací l’altura a 100. `Placeholder` dibuixa dins d’eixe espai. El límit permet utilitzar l’exemple en una llista vertical.

## 🔧 Propietats principals

### 1. `color` i `strokeWidth`: aspecte del traç

`color` i `strokeWidth` canvien el color i el gruix del requadre i les diagonals. Són útils per a distingir l’espai pendent del fons o identificar peces del prototip durant el desenvolupament. No canvien la grandària reservada.

```dart
const SizedBox(
  height: 120,
  child: Placeholder(color: Colors.teal, strokeWidth: 3),
)
```

Mantín l’altura i compara dos gruixos. `strokeWidth` no canvia les dimensions del buit.

### 2. `fallbackWidth` i `fallbackHeight`: grandària de reserva

`fallbackWidth` i `fallbackHeight` oferixen una grandària de reserva quan el pare no limita l’espai en alguna direcció. Són útils per a donar una altura visible al marcador dins d’una llista vertical. No imposen la grandària quan les restriccions del pare ja la determinen.

```dart
const Placeholder(fallbackHeight: 100, fallbackWidth: 200)
```

Dins del `ListView` vertical, l’altura del fill no està limitada i s’utilitza `fallbackHeight`. L’amplària la determina la llista: `fallbackWidth` no fa que mesure necessàriament 200.

### 3. `child`: identificar què falta

`child` permet posar un widget dins del marcador. És útil per a indicar quina peça falta, com «Ací anirà el mapa», perquè qui revise el prototip entenga el propòsit del requadre sense consultar el codi.

```dart
const SizedBox(
  height: 140,
  child: Placeholder(
    child: Center(child: Text('Aquí irá el mapa')),
  ),
)
```

`child` rep un únic widget. `Center` centra el fill i `Text` mostra el missatge; el requadre continua representant una peça pendent.

`Placeholder` no detecta una càrrega en curs ni és un indicador de progrés. Per a esperar una imatge utilitza `loadingBuilder`; per a una peça encara sense implementar, utilitza el marcador.

## ✍️ Activitat: crea components amb variants

Implementa **els dos components** següents com a `StatelessWidget`, cadascun en el fitxer indicat dins de `lib/componentes/`. Els noms i paràmetres són el contracte que has de complir, no una solució implementada. Usa camps `final`, paràmetres amb nom, `super.key` i constructor `const` quan siga possible. Les variants es trien amb paràmetres: no necessiten estat propi.

Els paràmetres sense valor predeterminat són obligatoris; marca’ls amb `required`, també si admeten `null`. Un tipus acabat en `?` admet `null`. Els `enum` proposats es declaren en el mateix fitxer que el component.

Si necessites recordar com un paràmetre selecciona l’aspecte, consulta [Variants d’un component](../estilo-y-variantes/). La implementació d’estes propostes et correspon a tu.

### 1. `EspacioPendiente`

`lib/componentes/espacio_pendiente.dart`

Paràmetres: `String etiqueta`, `bool compacto = false`.

Combina `SizedBox`, `Placeholder`, `Center` i `Text`. El mode compacte tindrà altura 80; el normal, 160. L’etiqueta ha de ser llegible en els dos.

### 2. `MarcadorPrototipo`

`lib/componentes/marcador_prototipo.dart`

Paràmetres: `TipoMarcador tipo`, `double alto = 120`.

Definix `enum TipoMarcador { imagen, mapa, grafico }`. Cada tipus selecciona etiqueta i estil de traç. No ha de carregar una imatge, un mapa ni un gràfic reals.

## 🧩 Mostra els components en el catàleg

En `lib/pantallas/placeholder_ejemplos_pantalla.dart`, conserva `PlaceholderEjemplosPantalla` i importa els fitxers nous. Cada import va al principi, fora de les classes:

```dart
import '../componentes/espacio_pendiente.dart';
import '../componentes/marcador_prototipo.dart';
```

`../` puja de `pantallas` a `lib`; després entra en `componentes`. Els imports fan accessibles les classes i els `enum` públics d’eixos fitxers.

Quan hages implementat els components, podràs utilitzar-los així dins de `children`:

```dart
const EspacioPendiente(etiqueta: 'Mapa pendiente'),
const EspacioPendiente(etiqueta: 'Mapa pendiente', compacto: true),
const MarcadorPrototipo(tipo: TipoMarcador.imagen),
const MarcadorPrototipo(tipo: TipoMarcador.mapa, alto: 180),
const MarcadorPrototipo(tipo: TipoMarcador.grafico),
```

Mostra les dos grandàries i els tres tipus. Comprova altura, etiqueta i estil sense canviar el contingut del catàleg. Si afegixes paràmetres de mesures, valida que siguen positius.

Afig les combinacions que falten: els usos anteriors són només un començament. Identifica cada cas amb un títol i una explicació pròpia. No dupliques una classe per cada combinació ni copies els components dins de la pantalla. Pots utilitzar `create-component` per a revisar la teua implementació i `test-widget` per a generar proves amb criteris concrets. Executa `dart format lib`, `flutter analyze` i les proves que hages creat.

Referència: [Placeholder](https://api.flutter.dev/flutter/widgets/Placeholder-class.html).
