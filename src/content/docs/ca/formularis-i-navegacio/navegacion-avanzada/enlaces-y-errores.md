---
title: "7. Enllaços directes i errors"
sidebar:
  order: 7
---

Un **enllaç directe** (*deep link*) obri l’aplicació directament en una destinació, sense passar pel catàleg: per exemple, `/talleres/20` compartit per un company. Gràcies al mapa de rutes, un enllaç directe i un botó produïxen el mateix resultat: la mateixa pila, els mateixos paràmetres i les mateixes comprovacions de `redirect`.

En este pas afegim una pantalla per a les adreces que no existixen i aprenem a provar enllaços directes.

## Tres situacions diferents

Abans de crear la pantalla d’error convé distingir què és realment un error de navegació. Una adreça pot no existir, o existir i no tindre dades per mostrar:

| Ubicació | Coincidix amb una ruta? | Hi ha dades? | Qui respon |
| --- | --- | --- | --- |
| `/no-existe` | No | — | El router, amb `errorBuilder`. |
| `/talleres/999` | Sí (`/talleres/:id`) | No hi ha taller 999 | El ViewModel del detall: «No existe el taller 999». |
| `/talleres?q=zzz` | Sí (`/talleres`) | Llista buida | El llistat: «No hay talleres para esta búsqueda». |

Només el primer cas és un error de navegació. Els altres dos són rutes vàlides el contingut de les quals ha de representar la pantalla.

## 1. La pantalla de ruta no trobada

Esta pantalla es mostrarà quan l’adreça no coincidisca amb cap ruta del mapa. És una pantalla normal; de go_router només utilitza `context.go` per a tornar al catàleg.

`lib/ui/navegacion_avanzada/ui/ruta_no_encontrada_pantalla.dart`

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class RutaNoEncontradaPantalla extends StatelessWidget {
  const RutaNoEncontradaPantalla({super.key, required this.ubicacion});
  final String ubicacion;

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Ruta no encontrada')),
    body: Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'La dirección $ubicacion no existe en esta aplicación.',
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            FilledButton(
              onPressed: () => context.go('/'),
              child: const Text('Volver al catálogo'),
            ),
          ],
        ),
      ),
    ),
  );
}
```

Mostra l’adreça sol·licitada i oferix una eixida. No mostra l’excepció tècnica: eixa és informació per a qui programa, no per a qui utilitza l’app.

## 2. Registrar `errorBuilder`

Perquè el router utilitze esta pantalla, li la indiquem en la seua configuració.

En `app_router.dart`, afig l’import i la propietat `errorBuilder` al `GoRouter`, just després de `redirect`:

```dart
import '../navegacion_avanzada/ui/ruta_no_encontrada_pantalla.dart';
```

```dart
  errorBuilder: (context, state) =>
      RutaNoEncontradaPantalla(ubicacion: state.uri.toString()),
```

`errorBuilder` s’utilitza quan cap ruta coincidix amb la ubicació. Si no el declarem, go_router mostra una pàgina d’error genèrica. En `state.error` hi ha el detall tècnic, útil per a depurar.

`errorBuilder` no substituïx una bona configuració: si dos rutes tenen el mateix `name` o un `path` està mal escrit, go_router avisa amb una excepció en arrancar, i això es corregix en el codi.

## 3. Provar enllaços directes en web

La manera més còmoda de provar enllaços directes és la versió web, perquè podem escriure qualsevol adreça en la barra del navegador.

Executa l’app en Chrome:

```bash
flutter run -d chrome
```

Per defecte, Flutter web utilitza l’**estratègia d’URL amb coixinet**: la ubicació va després de `#`. Amb el port que indique Flutter, prova d’escriure en la barra d’adreces:

| Adreça | Resultat |
| --- | --- |
| `http://localhost:PORT/#/talleres/20` | Detall de Cerámica amb barra inferior i fletxa per a tornar al llistat. |
| `http://localhost:PORT/#/talleres?q=foto` | Llistat filtrat i el cercador amb el text «foto». |
| `http://localhost:PORT/#/talleres/999` | «No existe el taller 999». |
| `http://localhost:PORT/#/no-existe` | Pantalla de ruta no trobada. |
| `http://localhost:PORT/#/cuenta` | Login, perquè en carregar la pàgina no hi ha sessió. |

Prova també de recarregar i d’utilitzar els botons arrere i avant del navegador: el router rep eixes ubicacions igual que un enllaç i aplica les mateixes regles. Com que la sessió viu en memòria, recarregar en `/cuenta` porta de nou a Login.

:::note[URL sense coixinet]
Amb `usePathUrlStrategy()` les adreces queden com `/talleres/20`, sense `#`. Aleshores el **servidor web** també ha d’estar configurat per a retornar l’aplicació en qualsevol ruta en recarregar; això no ho fa go_router.
:::

## 4. Enllaços directes en Android i iOS

El mapa de rutes ja sap interpretar `/talleres/20`, però perquè un enllaç extern (una web, un correu) òbriga l’app instal·lada cal **registrar-lo en la plataforma**: App Links en Android i Universal Links en iOS. Declarar un `GoRoute` no registra dominis en el sistema. Eixa configuració queda fora d’esta secció; la [guia d’enllaços directes de Flutter](https://docs.flutter.dev/ui/navigation/deep-linking) explica els passos.

Per a provar en el mòbil sense configurar res, pots canviar temporalment `initialLocation` a l’adreça que vulgues comprovar (per exemple `'/talleres/20?q=cer'`) i fer hot restart.

Referències: [tractament d’errors](https://pub.dev/documentation/go_router/latest/topics/Error%20handling-topic.html) i [go_router en web](https://pub.dev/documentation/go_router/latest/topics/Web-topic.html).
