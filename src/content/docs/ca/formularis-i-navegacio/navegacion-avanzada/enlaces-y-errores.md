---
title: "7. Enllaços directes i errors"
sidebar:
  order: 7
---

Un enllaç directe identifica una destinació sense exigir passar abans pel catàleg. El router pot interpretar `/talleres/20`, però han d’existir la ruta i les dades. L’entrada per URL ha de produir les mateixes comprovacions que un botó.

## Ruta desconeguda i dada inexistent

Són casos diferents:

- `/no-existe` no coincidix amb la configuració: `errorBuilder` mostra una eixida comprensible.
- `/talleres/999` coincidix amb el patró, però el repositori no té eixe identificador: el detall mostra l’absència del taller.
- `/talleres?q=zzzz` és un llistat vàlid sense coincidències: es mostra l’estat buit.

Crea esta destinació per als errors de ruta. No presenta l’excepció tècnica a l’usuari; permet tornar al catàleg.


`lib/ui/navegacion_avanzada/ui/ruta_no_encontrada_pantalla.dart`

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class RutaNoEncontradaPantalla extends StatelessWidget {
  const RutaNoEncontradaPantalla({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Ruta no encontrada')),
    body: Center(
      child: FilledButton(
        onPressed: () => context.go('/'),
        child: const Text('Volver al catálogo'),
      ),
    ),
  );
}
```

Afegix l’import de la vista en `app_router.dart` i, com a propietat del `GoRouter`, `errorBuilder: (context, state) => const RutaNoEncontradaPantalla()`. Un error de programació de les rutes, com noms duplicats o paths incorrectes, es corregix en el codi; no es considera resolt perquè existisca una pantalla d’error.

## Comprovar en web i mòbil

Des de l’arrel del catàleg executa `flutter run -d chrome`. Amb l’estratègia de URL amb fragment, prova adreces com `http://localhost:PORT/#/talleres/20`; substituïx `PORT` pel que mostra Flutter. Entra directament, copia l’enllaç i recarrega. El detall ha de poder reconstruir-se sense `extra`.

Una estratègia sense `#` requerix configurar també el servidor per a entregar l’aplicació en recarregar una ruta. Eixa configuració no la fa `go_router` per si sol. En Android i iOS, associar enllaços externs a l’app requerix la configuració de plataforma corresponent; declarar `GoRoute` no registra automàticament dominis ni esquemes del sistema.

La sessió d’este exemple només existix en memòria: recarregar `/cuenta` torna al login. És el resultat esperat, no un motiu per a passar la fitxa de l’usuari per la URL. Prova també arrere i avant després d’entrar, eixir i canviar de secció.

Referències: [tractament d’errors](https://pub.dev/documentation/go_router/latest/topics/Error%20handling-topic.html), [web](https://pub.dev/documentation/go_router/latest/topics/Web-topic.html) i [enllaços directes de Flutter](https://docs.flutter.dev/ui/navigation/deep-linking).
