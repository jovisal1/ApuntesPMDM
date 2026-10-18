---
title: "Botons: respondre a una acció"
sidebar:
  order: 6
---

**Un botó permet executar una acció en polsar-lo.** Utilitzarem `FilledButton` com a primer exemple: `child` descriu el contingut i `onPressed` rep la funció que s’executarà després.

```dart
FilledButton(
  onPressed: () { debugPrint('Hola'); },
  child: const Text('Saludar'),
)
```

`Text` mostra l’etiqueta del botó. `() { ... }` és una funció anònima i `debugPrint` escriu en consola. El missatge apareix en polsar, no en construir el botó.

## 🔧 Propietats principals

### 1. `onPressed`: acció o desactivació

`onPressed` definix què ha de passar en polsar el botó, com guardar una dada o iniciar una operació. També permet indicar que una acció encara no està disponible: si val `null`, el botó queda desactivat. És útil per a impedir una descàrrega sense recurs o un enviament abans de completar les dades.

```dart
const FilledButton(onPressed: null, child: Text('Descargar'))
```

Amb una funció `guardarRuta` ja definida, utilitzaries `onPressed: guardarRuta`. No escrigues `guardarRuta()` si vols entregar-la per a després.

### 2. `child`, o `icon` i `label`

`child` permet triar el contingut del botó, habitualment una etiqueta de text. Si volem combinar un símbol amb l’etiqueta per a reconéixer l’acció, el constructor `.icon` oferix `icon` i `label` per separat i els col·loca junts.

```dart
FilledButton.icon(
  onPressed: () { debugPrint('Acción de guardar'); },
  icon: const Icon(Icons.bookmark_add_outlined),
  label: const Text('Guardar'),
)
```

`Icon` dibuixa el símbol d’`Icons`; `Text` mostra l’etiqueta. En este constructor utilitzem `label` en lloc de `child`. El missatge no guarda dades.

### 3. `style`: aspecte del botó

`style` personalitza l’aspecte d’un botó concret. És útil per a crear variants d’un component, com una acció destacada amb més espai interior i colors diferents. `FilledButton.styleFrom` crea el `ButtonStyle` amb valors senzills; és un objecte de configuració, no un altre widget.

```dart
FilledButton(
  style: FilledButton.styleFrom(
    backgroundColor: Colors.indigo,
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
  ),
  onPressed: () { debugPrint('Comenzar'); },
  child: const Text('Comenzar'),
)
```

`backgroundColor` és el fons i `foregroundColor`, el color del contingut. `EdgeInsets.symmetric` configura l’espai interior horitzontal i vertical; és un objecte de mesures, no un widget. Són ajustos locals del botó.

### 4. `onLongPress`: pulsació prolongada

`onLongPress` definix una acció en mantindre polsat el botó. Pot ser útil per a oferir una acció secundària relacionada amb la pulsació normal, sempre que l’usuari tinga una altra manera clara de descobrir-la. Les dos accions poden conviure i produir respostes diferents.

```dart
FilledButton(
  onPressed: () { debugPrint('Pulsación normal'); },
  onLongPress: () { debugPrint('Pulsación prolongada'); },
  child: const Text('Mantén pulsado'),
)
```

Prova una pulsació breu i una de mantinguda. No faces que la pulsació prolongada siga l’única manera d’accedir a una acció imprescindible.

### 5. `tooltip` i `iconSize` en IconButton

`tooltip` explica què fa un botó que només mostra un símbol, com una lupa sense la paraula «Buscar». És útil per a evitar accions ambigües i aportar una etiqueta accessible. `iconSize` ajusta la grandària del símbol segons la importància visual, sense canviar-ne el significat.

```dart
IconButton(
  tooltip: 'Buscar rutas',
  iconSize: 32,
  onPressed: () { debugPrint('Buscar'); },
  icon: const Icon(Icons.search),
)
```

`IconButton` gestiona la interacció; `Icon` només dibuixa el símbol. `tooltip` identifica l’acció i `iconSize` configura la grandària de la icona.

## Triar el tipus de botó

| Tipus | Ús habitual | Exemple de constructor |
| --- | --- | --- |
| `FilledButton` | Acció principal amb farciment. | `FilledButton(onPressed: ..., child: ...)` |
| `ElevatedButton` | Acció que destaca amb elevació. | `ElevatedButton(onPressed: ..., child: ...)` |
| `OutlinedButton` | Acció secundària amb vora. | `OutlinedButton(onPressed: ..., child: ...)` |
| `TextButton` | Acció de menys èmfasi visual. | `TextButton(onPressed: ..., child: ...)` |
| `IconButton` | Acció compacta amb símbol i tooltip. | `IconButton(onPressed: ..., icon: ..., tooltip: ...)` |
| `FloatingActionButton` | Acció destacada de la pantalla. | Normalment en `Scaffold.floatingActionButton`. |

Els punts suspensius representen valors que falten, no codi per a copiar. Substituïx `FilledButton` per `OutlinedButton` en l’exemple mínim sense canviar-ne l’acció. `onPressed`, `child` i `style` són comuns als quatre primers tipus, però no tots els botons tenen la mateixa API.


## ✍️ Activitat: crea components amb variants

Implementa **els dos components** següents com a `StatelessWidget`, cadascun en el fitxer indicat dins de `lib/componentes/`. Els noms i paràmetres són el contracte que has de complir, no una solució implementada. Usa camps `final`, paràmetres amb nom, `super.key` i constructor `const` quan siga possible. Les variants es trien amb paràmetres: no necessiten estat propi.

Els paràmetres sense valor predeterminat són obligatoris; marca’ls amb `required`, també si admeten `null`. Un tipus acabat en `?` admet `null`. Els `enum` proposats es declaren en el mateix fitxer que el component.

`VoidCallback` és el tipus d’una funció sense arguments ni valor retornat; `VoidCallback?` permet també `null`. `IconData` és el tipus dels símbols d’`Icons`.

Si necessites recordar com un paràmetre selecciona l’aspecte, consulta [Variants d’un component](../estilo-y-variantes/). La implementació d’estes propostes et correspon a tu.

### 1. `BotonAccion`

`lib/componentes/boton_accion.dart`

Paràmetres: `String texto`, `VoidCallback? onPressed`, `bool destacado = false`.

Utilitza `FilledButton` amb estil local: la variant destacada tindrà més espai interior i altres colors. Si el callback és `null`, ha de quedar desactivat. La variant visual no pot canviar l’acció.

### 2. `BotonConIcono`

`lib/componentes/boton_con_icono.dart`

Paràmetres: `String texto`, `IconData icono`, `VoidCallback? onPressed`, `bool secundario = false`.

Selecciona `FilledButton.icon` per a l’acció principal i `OutlinedButton.icon` per a la secundària. Mantín text, icona i callback rebuts.

## 🧩 Mostra els components en el catàleg

En `lib/view/botones_ejemplos_pantalla.dart`, conserva `BotonesEjemplosPantalla` i importa els fitxers nous. Cada import va al principi, fora de les classes:

```dart
import '../componentes/boton_accion.dart';
import '../componentes/boton_con_icono.dart';
```

`../` puja de `view` a `lib`; després entra en `componentes`. Els imports fan accessibles les classes i els `enum` públics d’eixos fitxers.

Quan hages implementat els components, podràs utilitzar-los així dins de `children`:

```dart
BotonAccion(
  texto: 'Comenzar',
  destacado: true,
  onPressed: () { debugPrint('Comenzar desde el catálogo'); },
),
const BotonAccion(texto: 'No disponible', onPressed: null),
BotonConIcono(
  texto: 'Guardar',
  icono: Icons.bookmark_border,
  secundario: true,
  onPressed: () { debugPrint('Guardar desde el catálogo'); },
),
```

Mostra les dos variants de cada component i un cas desactivat. Una pulsació ha d’invocar el callback exactament una vegada; canviar l’estil no ha de canviar-lo. Comprova que el botó desactivat no executa cap acció.

Afig les combinacions que falten: els usos anteriors són només un començament. Identifica cada cas amb un títol i una explicació pròpia. No dupliques una classe per cada combinació ni copies els components dins de la pantalla. Pots utilitzar `create-component` per a revisar la teua implementació i `test-widget` per a generar proves amb criteris concrets. Executa `dart format lib`, `flutter analyze` i les proves que hages creat.

Referència: [Botons](https://api.flutter.dev/flutter/material/FilledButton-class.html).
