---
title: "5. Ampliar el catàleg i comprovar què has aprés"
description: "5. Ampliar el catàleg i comprovar què has aprés · Assistent d’IA i catàleg de widgets per a 2n de DAM."
sidebar:
  order: 6
---

## Substituïx la prova del comptador

Una prova de widgets construïx part de la interfície i simula accions per a comprovar resultats. No cal un emulador per a executar-la. En esta primera prova comprovarem la llista i el viatge d’anada i tornada a les dos pantalles.

Substituïx **tot** el contingut de `test/widget_test.dart` pel següent:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:catalogo_widgets/main.dart';

void main() {
  testWidgets('El catálogo abre ejemplos y permite volver', (tester) async {
    await tester.pumpWidget(const CatalogoApp());

    expect(find.text('Catálogo de widgets'), findsOneWidget);
    expect(find.text('Text'), findsOneWidget);
    expect(find.text('Icon'), findsOneWidget);

    await tester.tap(find.text('Text'));
    await tester.pumpAndSettle();
    expect(find.text('Ejemplos de Text'), findsOneWidget);
    expect(find.text('Estoy aprendiendo Flutter'), findsOneWidget);

    await tester.pageBack();
    await tester.pumpAndSettle();
    expect(find.text('Catálogo de widgets'), findsOneWidget);

    await tester.tap(find.text('Icon'));
    await tester.pumpAndSettle();
    expect(find.text('Ejemplos de Icon'), findsOneWidget);
    expect(find.byIcon(Icons.home), findsOneWidget);

    await tester.pageBack();
    await tester.pumpAndSettle();
    expect(find.text('Catálogo de widgets'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}

```

La importació `package:catalogo_widgets/main.dart` utilitza el nom del projecte definit en `pubspec.yaml`. Si has triat un altre nom, ajusta-la. `pumpWidget` munta l’aplicació de prova, `tap` simula la pulsació i `pumpAndSettle` avança els fotogrames fins que acaba la transició. `expect` expressa el resultat esperat; `pageBack` prem el control per a tornar.

Executa des de l’arrel:

```bash
dart format lib test
flutter analyze
flutter test
```

El resultat esperat és una anàlisi sense problemes i les proves superades. La prova confirma este recorregut concret; revisa també visualment la llegibilitat, el desplaçament i els exemples en el destí on executes l’aplicació.

## Afig una entrada sense començar de nou

Quan estudiem **botons**, ampliarem el mateix projecte. Abans d’escriure codi, apunta què haurà de mostrar la pantalla: un botó d’acció principal, un altre amb vora i un botó amb icona, cadascun amb una resposta observable.

1. Crea `lib/pantallas/botones_ejemplos_pantalla.dart` amb una classe `BotonesEjemplosPantalla`.
2. Utilitza `Scaffold`, un `AppBar` amb títol i una llista desplaçable de demostracions.
3. Afig la importació del fitxer nou a `catalogo_pantalla.dart`.
4. Incorpora un tercer `ListTile` a `children` amb el títol `Botones`.
5. En el seu `onTap`, obri `BotonesEjemplosPantalla` amb el patró de navegació que ja coneixes.
6. Verifica les dos entrades anteriors, la nova i la tornada al catàleg.
7. Amplia la prova per a obrir `Botones`, comprovar un exemple i tornar.

Cada pantalla d’exemples tindrà la seua responsabilitat. No copies un segon `main` ni un segon `MaterialApp` dins. De moment no necessitem paquets de rutes ni una arquitectura amb moltes capes.

Pots demanar ajuda així:

```text
Seguix instrucciones.md i give-hints.md. Estic afegint Botones al catàleg.
Ja he creat BotonesEjemplosPantalla i la importació.
No sé què he de canviar en la llista principal.
Dona’m una pista sobre el lloc del canvi; no escrigues el ListTile complet.
```

## Full de ruta del catàleg

| Què aprenguem | Què afegirem | Què podrem comprovar |
| --- | --- | --- |
| Text i Icon | Les dos primeres pantalles. | Variants visuals i navegació d’anada i tornada. |
| Imatges | Una pantalla de recursos locals i imatges de xarxa. | Configuració de recursos i estat d’error. |
| Botons | Una pantalla amb diversos tipus d’accions. | Callbacks i resposta a la pulsació. |
| Composició | Exemples de Row, Column, Padding i Container. | Alineació i restriccions d’espai. |
| Estat | Un comptador i controls que canvien un valor. | StatefulWidget, setState i reconstrucció. |
| Formularis | Exemples d’entrada i validació. | Missatges davant de dades vàlides i invàlides. |

La llista és una planificació del curs, no un conjunt de pantalles que hages de crear ara. Actualitza `ai/instrucciones.md` quan aprengues un concepte i indica quins widgets pots emprar en el pròxim exercici. Si vas copiar les regles a un fitxer d’instruccions de l’editor, actualitza’l també.

## Depura amb proves menudes

| Símptoma | Primera comprovació |
| --- | --- |
| No troba una pantalla | Comprova el nom de la classe, la ruta i el seu `import`. |
| La fila es veu però no obri res | Comprova que la funció està en `onTap` i que crida `push`. |
| Apareix un error en usar `const` | Busca quin argument no és constant; no lleves tots els `const` sense entendre-ho. |
| No apareixen punts suspensius | Comprova l’amplària disponible i que el text supere el límit de línies. |
| Les proves encara busquen el comptador | Revisa que has substituït la prova de la plantilla. |
| La IA afirma que ho ha provat | Demana el comandament o l’eina i l’eixida; executa’l tu si no existix eixa evidència. |

Quan sol·licites ajuda aporta el fitxer, el fragment, el missatge exacte, què esperaves i què ha passat. Aplica un canvi cada vegada per a poder relacionar la causa amb el resultat.

## Revisió i entrega

Sol·licita una revisió amb `review-code`, l’objectiu del canvi i els fitxers afectats. Aplica dos millores que pugues justificar; si no calen dos canvis, explica quines decisions del codi has revisat i per què les mantens.

Entrega el projecte i els fitxers d’instruccions i habilitats de l’assistent. Afig una captura de la llista i una altra d’una pantalla d’exemples.

Abans de donar per acabada la pràctica, comprova que pots:

- Explicar quines instruccions rep l’assistent i com es carreguen.
- Dibuixar l’arbre des de `MaterialApp` fins a una fila del catàleg.
- Seguir el recorregut des de `onTap` fins a la pantalla d’exemples.
- Canviar una propietat d’un exemple i predir-ne l’efecte.
- Obrir i tancar les dos pantalles sense errors.
- Executar l’anàlisi i la prova i interpretar-ne el resultat.

La pregunta final de l’assistent serà: «Si demà afegim un altre widget, quin fitxer nou crearies i quin fitxer existent hauries de modificar?». Respon amb les teues paraules abans de demanar una altra funcionalitat.
