---
title: "5. Ampliar el catálogo y comprobar lo aprendido"
description: "5. Ampliar el catálogo y comprobar lo aprendido · Asistente de IA y catálogo de widgets para 2.º de DAM."
sidebar:
  order: 6
---

## Sustituye la prueba del contador

Una prueba de widgets construye parte de la interfaz y simula acciones para comprobar resultados. No hace falta un emulador para ejecutarla. En esta primera prueba comprobaremos la lista y el viaje de ida y vuelta a las dos pantallas.

Sustituye **todo** el contenido de `test/widget_test.dart` por lo siguiente:

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

La importación `package:catalogo_widgets/main.dart` utiliza el nombre del proyecto definido en `pubspec.yaml`. Si has elegido otro nombre, ajústala. `pumpWidget` monta la aplicación de prueba, `tap` simula la pulsación y `pumpAndSettle` avanza los fotogramas hasta que termina la transición. `expect` expresa el resultado esperado; `pageBack` pulsa el control para volver.

Ejecuta desde la raíz:

```bash
dart format lib test
flutter analyze
flutter test
```

El resultado esperado es un análisis sin problemas y las pruebas superadas. La prueba confirma este recorrido concreto; revisa también visualmente la legibilidad, el desplazamiento y los ejemplos en el destino donde ejecutas la aplicación.

## Añade una entrada sin empezar de nuevo

Cuando estudiemos **botones**, ampliaremos el mismo proyecto. Antes de escribir código, apunta qué deberá mostrar su pantalla: un botón de acción principal, otro con borde y un botón con icono, cada uno con una respuesta observable.

1. Crea `lib/pantallas/botones_ejemplos_pantalla.dart` con una clase `BotonesEjemplosPantalla`.
2. Utiliza `Scaffold`, un `AppBar` con título y una lista desplazable de demostraciones.
3. Añade la importación del nuevo archivo a `catalogo_pantalla.dart`.
4. Incorpora un tercer `ListTile` a `children` con el título `Botones`.
5. En su `onTap`, abre `BotonesEjemplosPantalla` con el patrón de navegación que ya conoces.
6. Verifica las dos entradas anteriores, la nueva y la vuelta al catálogo.
7. Amplía la prueba para abrir `Botones`, comprobar un ejemplo y volver.

Cada pantalla de ejemplos tendrá su responsabilidad. No copies un segundo `main` ni un segundo `MaterialApp` dentro de ella. De momento no necesitamos paquetes de rutas ni una arquitectura con muchas capas.

Puedes pedir ayuda así:

```text
Sigue instrucciones.md y give-hints.md. Estoy añadiendo Botones al catálogo.
Ya he creado BotonesEjemplosPantalla y la importación.
No sé qué debo cambiar en la lista principal.
Dame una pista sobre el lugar del cambio; no escribas el ListTile completo.
```

## Hoja de ruta del catálogo

| Lo que aprendamos | Qué añadiremos | Qué podremos comprobar |
| --- | --- | --- |
| Text e Icon | Las dos primeras pantallas. | Variantes visuales y navegación de ida y vuelta. |
| Imágenes | Una pantalla de recursos locales e imágenes de red. | Configuración de recursos y estado de error. |
| Botones | Una pantalla con varios tipos de acciones. | Callbacks y respuesta a la pulsación. |
| Composición | Ejemplos de Row, Column, Padding y Container. | Alineación y restricciones de espacio. |
| Estado | Un contador y controles que cambian un valor. | StatefulWidget, setState y reconstrucción. |
| Formularios | Ejemplos de entrada y validación. | Mensajes ante datos válidos e inválidos. |

La lista es una planificación del curso, no un conjunto de pantallas que debas crear ahora. Actualiza `ai/instrucciones.md` al aprender un concepto e indica qué widgets puedes emplear en el próximo ejercicio. Si copiaste las reglas a un archivo de instrucciones del editor, actualízalo también.

## Depura con pruebas pequeñas

| Síntoma | Primera comprobación |
| --- | --- |
| No encuentra una pantalla | Comprueba el nombre de la clase, la ruta y su `import`. |
| La fila se ve pero no abre nada | Comprueba que la función está en `onTap` y que llama a `push`. |
| Aparece un error al usar `const` | Busca qué argumento no es constante; no quites todos los `const` sin entenderlo. |
| No aparecen puntos suspensivos | Comprueba el ancho disponible y que el texto supere el límite de líneas. |
| Las pruebas todavía buscan el contador | Revisa que has sustituido la prueba de la plantilla. |
| La IA afirma que lo ha probado | Pide el comando o la herramienta y su salida; ejecútalo tú si no existe esa evidencia. |

Al solicitar ayuda aporta el archivo, el fragmento, el mensaje exacto, lo que esperabas y lo que ha ocurrido. Aplica un cambio cada vez para poder relacionar la causa con el resultado.

## Revisión y entrega

Solicita una revisión con `review-code`, el objetivo de tu cambio y los archivos afectados. Aplica dos mejoras que puedas justificar; si no hacen falta dos cambios, explica qué decisiones del código has revisado y por qué las mantienes.

Entrega el proyecto y los archivos de instrucciones y habilidades del asistente. Añade una captura de la lista y otra de una pantalla de ejemplos.

Antes de dar por terminada la práctica, comprueba que puedes:

- Explicar qué instrucciones recibe tu asistente y cómo se cargan.
- Dibujar el árbol desde `MaterialApp` hasta una fila del catálogo.
- Seguir el recorrido desde `onTap` hasta la pantalla de ejemplos.
- Cambiar una propiedad de un ejemplo y predecir su efecto.
- Abrir y cerrar ambas pantallas sin errores.
- Ejecutar el análisis y la prueba e interpretar su resultado.

La pregunta final del asistente será: «Si mañana añadimos otro widget, ¿qué archivo nuevo crearías y qué archivo existente tendrías que modificar?». Respóndela con tus propias palabras antes de pedir otra funcionalidad.
