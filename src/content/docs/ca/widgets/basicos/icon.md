---
title: "Icon: representar una idea amb un símbol"
sidebar:
  order: 5
---

**`Icon` representa una idea mitjançant un símbol**. Rep un `IconData`, com els valors d’`Icons`. No utilitza una fotografia ni executa accions per si mateix.

```dart
const Icon(Icons.favorite)
```

`Icons.favorite` identifica el cor que dibuixarà `Icon`. Els projectes habituals inclouen `uses-material-design: true` en `pubspec.yaml`, necessari per a estos símbols.

## 🔧 Propietats principals

### 1. Símbol, `size` i `color`

El primer argument tria el símbol que representa la idea; `size` determina la grandària i `color`, el color. Són útils per a adaptar la mateixa icona a un indicador menut o a un element destacat, i per a diferenciar estats sense dependre només del color.

```dart
const Icon(Icons.terrain, size: 48, color: Colors.teal)
```

Compara’l amb `Icons.favorite` i canvia la grandària de 48 a 24. La mesura s’expressa en píxels lògics.

### 2. `semanticLabel`: explicar el significat

`semanticLabel` explica el significat de la icona a les tecnologies d’assistència. És útil quan el símbol comunica per si mateix un estat, com «ruta completada», i no hi ha un text pròxim que ja transmeta eixa informació.

```dart
const Icon(Icons.check_circle, semanticLabel: 'Ruta completada')
```

L’etiqueta ha de descriure el significat en l’aplicació; no cal dir «cercle amb marca». No apareix com a text visible.

### 3. `textDirection`: direcció de lectura

`textDirection` indica el sentit de lectura per a les icones que admeten reflex. És útil per a adaptar símbols direccionals, com una fletxa de retrocés, a interfícies que es lligen d’esquerra a dreta (`ltr`) o de dreta a esquerra (`rtl`). Normalment es pren del context, però podem fixar-lo per a comparar el resultat.

```dart
const Icon(
  Icons.arrow_back,
  textDirection: TextDirection.rtl,
  semanticLabel: 'Atrás',
)
```

Compara `rtl` amb `ltr`. L’efecte depén que el símbol admeta el reflex; no totes les icones canvien.

### 4. Si necessites una acció: `IconButton`

Un `Icon` només representa un símbol. Quan ha de permetre una acció, com guardar o buscar, utilitza `IconButton`: afig interacció amb `onPressed`. La propietat `tooltip` explica l’acció en situar el punter o mantindre polsat, i aporta una etiqueta accessible.

```dart
IconButton(
  tooltip: 'Guardar ruta',
  icon: const Icon(Icons.bookmark_border),
  onPressed: () {
    debugPrint('Pulsación en guardar ruta');
  },
)
```

`icon` rep l’`Icon` que es dibuixa. `onPressed` rep la funció que s’executarà en polsar; `debugPrint` escriu en consola, no guarda la ruta. `tooltip` ajuda a identificar l’acció. Estudiarem els botons després.

## ✍️ Activitat: crea components amb variants

Implementa **els dos components** següents com a `StatelessWidget`, cadascun en el fitxer indicat dins de `lib/componentes/`. Els noms i paràmetres són el contracte que has de complir, no una solució implementada. Usa camps `final`, paràmetres amb nom, `super.key` i constructor `const` quan siga possible. Les variants es trien amb paràmetres: no necessiten estat propi.

Els paràmetres sense valor predeterminat són obligatoris; marca’ls amb `required`, també si admeten `null`. Un tipus acabat en `?` admet `null`. Els `enum` proposats es declaren en el mateix fitxer que el component.

Si necessites recordar com un paràmetre selecciona l’aspecte, consulta [Variants d’un component](../estilo-y-variantes/). La implementació d’estes propostes et correspon a tu.

### 1. `IconoEstado`

`lib/componentes/icono_estado.dart`

Paràmetres: `EstadoRuta estado`, `double tamano = 32`.

Definix `enum EstadoRuta { pendiente, completada, error }`. Cada estat decidix símbol, color i etiqueta accessible. Han de distingir-se pel símbol a més del color.

### 2. `IconoFavorito`

`lib/componentes/icono_favorito.dart`

Paràmetres: `bool marcado = false`, `double tamano = 32`.

Mostra un cor buit o ple i una descripció segons `marcado`. És una representació: no canvies el valor en polsar ni afegisques estat intern.

## 🧩 Mostra els components en el catàleg

En `lib/pantallas/icon_ejemplos_pantalla.dart`, conserva `IconEjemplosPantalla` i importa els fitxers nous. Cada import va al principi, fora de les classes:

```dart
import '../componentes/icono_estado.dart';
import '../componentes/icono_favorito.dart';
```

`../` puja de `pantallas` a `lib`; després entra en `componentes`. Els imports fan accessibles les classes i els `enum` públics d’eixos fitxers.

Quan hages implementat els components, podràs utilitzar-los així dins de `children`:

```dart
const IconoEstado(estado: EstadoRuta.pendiente),
const IconoEstado(estado: EstadoRuta.completada, tamano: 48),
const IconoEstado(estado: EstadoRuta.error),
const IconoFavorito(),
const IconoFavorito(marcado: true),
```

Comprova els tres estats i les dos configuracions del favorit. El mateix estat ha de conservar el significat en canviar la grandària. Prova símbol i etiqueta accessible, a més del color.

Afig les combinacions que falten: els usos anteriors són només un començament. Identifica cada cas amb un títol i una explicació pròpia. No dupliques una classe per cada combinació ni copies els components dins de la pantalla. Pots utilitzar `create-component` per a revisar la teua implementació i `test-widget` per a generar proves amb criteris concrets. Executa `dart format lib`, `flutter analyze` i les proves que hages creat.

Referència: [Icon](https://api.flutter.dev/flutter/widgets/Icon-class.html).
