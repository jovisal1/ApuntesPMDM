---
title: "Scaffold i AppBar: donar estructura a la pantalla"
sidebar:
  order: 8
---

**`Scaffold` organitza les zones d’una pantalla Material** i **`AppBar` configura la barra superior**. No són una altra aplicació: formen part del `MaterialApp` que ja inicia el catàleg.

```dart
Scaffold(
  appBar: AppBar(title: const Text('Mi pantalla')),
  body: const Text('Contenido de la pantalla'),
)
```

`Text` mostra el títol i el contingut. `appBar` i `body` reben widgets per a zones diferents. Estos exemples substituïxen el `Scaffold` retornat per `build` en `ScaffoldEjemplosPantalla`; no s’afegixen a la llista ni modifiquen la pantalla principal.

## 🔧 Propietats principals

### 1. `body` i `backgroundColor`: contingut i fons

`body` definix el contingut principal de la pantalla: un text, una llista o una composició de widgets. `backgroundColor` establix el fons de `Scaffold`; és útil per a diferenciar una secció o mantindre contrast amb el contingut.

```dart
Scaffold(
  backgroundColor: Colors.indigo.shade50,
  appBar: AppBar(title: const Text('Contenido centrado')),
  body: const Center(child: Text('Mi ejemplo')),
)
```

`Center` centra el `Text` dins del cos. `shade50` selecciona un to clar de la paleta. `Scaffold` no afig desplaçament per si mateix; per a contingut llarg pots utilitzar el `ListView` del projecte base.

### 2. `title`, `centerTitle` i colors d’AppBar

`title` identifica la pantalla amb un text o un altre widget, i `centerTitle` decidix si es centra en la barra. `backgroundColor` i `foregroundColor` ajusten el fons i el color habitual del contingut de la barra. Són útils per a donar identitat a una secció i mantindre títol i icones llegibles. `toolbarHeight` ajusta l’altura i `elevation` aporta separació visual respecte al cos.

```dart
Scaffold(
  appBar: AppBar(
    title: const Text('Barra destacada'),
    centerTitle: true,
    backgroundColor: Colors.indigo,
    foregroundColor: Colors.white,
    toolbarHeight: 72,
    elevation: 2,
  ),
  body: const Text('Compara el título, los colores y la altura'),
)
```

`foregroundColor` s’aplica habitualment a text i icones. `toolbarHeight` canvia l’altura de la zona d’eines i `elevation`, l’elevació visual. Compara una propietat cada vegada.

### 3. `actions` i `leading`: zones de la barra

`actions` permet situar accions freqüents de la pantalla al final de la barra, com buscar o consultar informació. `leading` configura l’element inicial, un lloc habitual per a un control de tornada o de menú. Servixen per a organitzar els controls sense barrejar-los amb el contingut principal.

```dart
Scaffold(
  appBar: AppBar(
    title: const Text('Acciones de la sección'),
    actions: [
      IconButton(
        tooltip: 'Información',
        icon: const Icon(Icons.info_outline),
        onPressed: () { debugPrint('Información'); },
      ),
    ],
  ),
  body: const Text('Prueba la acción de información'),
)
```

`IconButton` respon a la pulsació i `Icon` dibuixa el símbol. `debugPrint` permet observar l’acció en consola. Si no indiques `leading`, Flutter pot incorporar un control segons el context; `automaticallyImplyLeading` controla l’opció. Conserva eixe comportament per a mantindre el control de tornada.

### 4. `floatingActionButton` i la ubicació

`floatingActionButton` permet destacar una acció principal de la pantalla, com afegir un element, separada del cos. `floatingActionButtonLocation` tria on es col·loca; és útil per a adaptar l’acció a la composició sense posicionar-la manualment.

```dart
Scaffold(
  appBar: AppBar(title: const Text('Acción destacada')),
  body: const Text('Pulsa el botón +'),
  floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
  floatingActionButton: FloatingActionButton(
    tooltip: 'Añadir ejemplo',
    onPressed: () { debugPrint('Añadir ejemplo'); },
    child: const Icon(Icons.add),
  ),
)
```

`FloatingActionButton` és un botó per a una acció principal de pantalla. `Icon` aporta el símbol. Compara la ubicació central amb `endFloat`; encara no implementem una operació real d’afegir.

## Un avís com a resposta a una acció

En el cos o la llista de la pantalla pots utilitzar este botó:

```dart
FilledButton(
  onPressed: () {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Ejemplo completado'),
        duration: Duration(seconds: 3),
        behavior: SnackBarBehavior.floating,
      ),
    );
  },
  child: const Text('Mostrar aviso'),
)
```

`FilledButton` executa la funció en polsar; `ScaffoldMessenger.of(context)` localitza el gestor de missatges de l’aplicació. `showSnackBar` mostra una `SnackBar`, amb un `Text` en `content`. `Duration` és un objecte de temps, no un widget. `behavior` permet triar `floating` o `fixed`. L’avís no guarda dades. El fragment utilitza el `context` del `build` de la pantalla.

Zones com `drawer` i `bottomNavigationBar` s’estudiaran més avant. `resizeToAvoidBottomInset` ajusta el cos davant del teclat i `extendBodyBehindAppBar` permet estendre’l darrere de la barra; no cal canviar-les en esta activitat.


## ✍️ Activitat: crea components amb variants

Implementa **els dos components** següents com a `StatelessWidget`, cadascun en el fitxer indicat dins de `lib/componentes/`. Els noms i paràmetres són el contracte que has de complir, no una solució implementada. Usa camps `final`, paràmetres amb nom, `super.key` i constructor `const` quan siga possible. Les variants es trien amb paràmetres: no necessiten estat propi.

Els paràmetres sense valor predeterminat són obligatoris; marca’ls amb `required`, també si admeten `null`. Un tipus acabat en `?` admet `null`. Els `enum` proposats es declaren en el mateix fitxer que el component.

`Widget contenido` permet rebre una peça d’interfície com a paràmetre, igual que fan `child` o `body`.

Si necessites recordar com un paràmetre selecciona l’aspecte, consulta [Variants d’un component](../estilo-y-variantes/). La implementació d’estes propostes et correspon a tu.

### 1. `PantallaDemostracion`

`lib/componentes/pantalla_demostracion.dart`

Paràmetres: `String titulo`, `Widget contenido`, `bool destacada = false`, `bool centrarTitulo = false`.

Construïx un `Scaffold` amb `AppBar`. La variant destacada canvia els colors locals de la barra; `contenido` es mostra en `body` sense alterar-lo i `centrarTitulo` decidix l’alineació del títol. Conserva el comportament inicial de `leading`.

### 2. `BotonAviso`

`lib/componentes/boton_aviso.dart`

Paràmetres: `String etiqueta`, `String mensaje`, `bool flotante = false`, `int segundos = 3`.

Construïx un botó que mostre una `SnackBar`. `flotante` selecciona `floating` o `fixed`. La duració ha de ser positiva i el missatge mostrat ha de ser el rebut.

## 🧩 Mostra els components en el catàleg

En `lib/view/scaffold_ejemplos_pantalla.dart`, conserva `ScaffoldEjemplosPantalla` i importa els fitxers nous. Cada import va al principi, fora de les classes:

```dart
import '../componentes/pantalla_demostracion.dart';
import '../componentes/boton_aviso.dart';
```

`../` puja de `view` a `lib`; després entra en `componentes`. Els imports fan accessibles les classes i els `enum` públics d’eixos fitxers.

Quan hages implementat els components, podràs utilitzar-los així en el `build` de la pantalla:

```dart
return PantallaDemostracion(
  titulo: 'Variantes de pantalla',
  destacada: true,
  centrarTitulo: true,
  contenido: ListView(
    padding: const EdgeInsets.all(16),
    children: const [
      BotonAviso(etiqueta: 'Aviso fijo', mensaje: 'Primer mensaje'),
      BotonAviso(
        etiqueta: 'Aviso flotante',
        mensaje: 'Segundo mensaje',
        flotante: true,
      ),
    ],
  ),
);
```

L’exemple d’integració substituïx el `return` de `build` de `ScaffoldEjemplosPantalla`. `ListView` col·loca els botons en una llista desplaçable i `EdgeInsets.all(16)` afig espai interior. Prova les dos configuracions de `destacada` i `centrarTitulo`, mantenint el contingut. No poses la pantalla dins del `body` d’un altre `Scaffold`. Comprova els avisos, el missatge i la duració; les proves han de controlar el temps sense pauses reals.

Afig les combinacions que falten: els usos anteriors són només un començament. Identifica cada cas amb un títol i una explicació pròpia. No dupliques una classe per cada combinació ni copies els components dins de la pantalla. Pots utilitzar `create-component` per a revisar la teua implementació i `test-widget` per a generar proves amb criteris concrets. Executa `dart format lib`, `flutter analyze` i les proves que hages creat.

Referència: [Scaffold i AppBar](https://api.flutter.dev/flutter/material/Scaffold-class.html).
