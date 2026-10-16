---
title: "2. Configurar y comprobar el asistente"
description: "2. Configurar y comprobar el asistente · Asistente de IA y catálogo de widgets para 2.º de DAM."
sidebar:
  order: 3
---

Recuerda que el **contexto** es la información que proporcionamos al asistente para que entienda nuestra situación y pueda ajustar su respuesta. En nuestra práctica, incluye qué sabemos de Dart y Flutter, qué aplicación estamos construyendo y en qué parte del proyecto estamos trabajando. Cuanto más claro sea ese contexto, más fácil será que sus explicaciones se ajusten a lo que necesitamos.

En esta sección vamos a recoger ese contexto en `ai/instrucciones.md`, junto con las reglas sobre cómo queremos que nos ayude. Después se lo proporcionaremos al asistente y haremos una prueba con un widget para comprobar que adapta sus explicaciones a nuestro nivel y nos ofrece pistas antes de mostrar la solución.

## Escribe el contexto y las reglas

Copia el siguiente contenido en `ai/instrucciones.md`. Lee cada regla: después tendrás que comprobar si el asistente la respeta. La lista de conocimientos es un punto de partida; ajústala a lo que ya has trabajado.

```markdown
# Asistente de Flutter de 2.º de DAM

## Mi nivel
Conozco variables, listas, funciones, clases y constructores de Dart.
Estoy empezando con la composición de widgets de Flutter.
Si empleo un concepto que no conozco, explícalo antes de continuar.

## Proyecto
Estamos construyendo catalogo_widgets.
La pantalla principal muestra tipos de widgets.
Al pulsar un tipo, se abre una pantalla con varios ejemplos.
Añadiremos entradas conforme las estudiemos en clase.

## Forma de ayudarme
1. Responde en el idioma en el que te pregunto y con lenguaje sencillo.
2. Antes de proponer un cambio, explica qué problema resuelve.
3. Divide las tareas grandes en pasos que pueda comprobar.
4. Cuando esté practicando, da primero una pista y espera mi intento.
5. Si pido una solución, muestra el cambio mínimo y explica su causa.
6. No generes la aplicación completa salvo que lo solicite expresamente.
7. No añadas paquetes externos ni gestión de estado avanzada.
8. Explica los widgets, las propiedades y la sintaxis nueva que utilices.
9. No modifiques archivos si solo te he pedido una explicación o revisión.
10. Distingue lo que has comprobado de lo que solo estás proponiendo.

## Calidad que revisaremos
Nombres claros, indentación, composición comprensible y const cuando proceda.
No propongas todavía Riverpod, Bloc ni Clean Architecture.

## Respuesta para explicar un concepto
Explicación breve, ejemplo pequeño, lectura del ejemplo y mini ejercicio.
```

El contexto evita preguntas demasiado abiertas. Por ejemplo, «haz una aplicación» permite muchas interpretaciones; indicar que estamos aprendiendo composición y que el catálogo crece por componentes delimita una tarea que podemos revisar.

## Opción A. Utilizar el asistente desde cualquier chat

1. Abre una conversación dedicada a esta práctica.
2. Adjunta `ai/instrucciones.md` o pega su contenido completo.
3. Envía el mensaje de activación que aparece debajo.
4. Para consultar código, adjunta el archivo o pega el fragmento relevante, indicando su ruta.
5. Al empezar otra conversación, vuelve a proporcionar las instrucciones y el estado actual del proyecto.

```text
Utiliza el instrucciones.md que te he proporcionado como guía de esta práctica.
Resume mi nivel, el objetivo del catálogo y tres reglas que vas a seguir.
Después explica para qué sirve Text y propón un ejercicio pequeño.
No cambies archivos ni resuelvas el ejercicio.
```

**Comprueba el resultado:** debe explicar `Text`, proponer una tarea breve y dejarte intentarla. Si genera una aplicación entera, señala la regla incumplida y pide que reduzca la respuesta. Tener un archivo guardado en tu ordenador no significa que un chat pueda leerlo.

## Opción B. Cargar instrucciones en un asistente integrado

Los nombres de los archivos dependen de la herramienta. `ai/instrucciones.md` sigue siendo nuestro documento de referencia, pero su carga automática no es universal.

### GitHub Copilot en VS Code

Crea `.github/copilot-instructions.md` en la raíz del proyecto y copia en él el contenido de `ai/instrucciones.md`. Si ya existe, integra las reglas de la práctica sin borrar las que ya tenga. Abre una conversación nueva y envía la pregunta de control anterior.

Este es el archivo de [instrucciones de proyecto de Copilot](https://code.visualstudio.com/docs/agent-customization/custom-instructions). Cuando actualices las instrucciones, mantén sincronizada esta copia.

### Codex

Crea `AGENTS.md` en la raíz de `catalogo_widgets` y copia allí el contenido de las instrucciones. Si ya existe, añade las instrucciones de trabajo sin sustituir las instrucciones del proyecto. Inicia una sesión nueva desde esa carpeta y pide que resuma las instrucciones que ha cargado.

Codex descubre [instrucciones de proyecto en `AGENTS.md`](https://learn.chatgpt.com/docs/agent-configuration/agents-md). No debemos suponer que leerá automáticamente cualquier archivo llamado `instrucciones.md`.

## Una prueba de que el asistente da pistas

Vamos a comprobar si el asistente respeta la regla de dar pistas antes de resolver un ejercicio. Utiliza la conversación en la que ya has cargado las instrucciones del apartado anterior.

### 1. Prepara el ejemplo en la aplicación

Abre `lib/main.dart` en VS Code, selecciona todo su contenido y bórralo. Después copia este código completo en el archivo:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Catálogo de widgets',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Catálogo de widgets'),
        ),
        body: Center(
          child: Column(
            children: const [
              Text('Catálogo de widgets'),
              Text('Estoy aprendiendo Flutter'),
            ],
          ),
        ),
      ),
    );
  }
}
```

Esta aplicación muestra una barra de título y dos textos organizados en una `Column`. Será nuestro punto de partida para la prueba con el asistente.

Guarda `lib/main.dart` y ejecuta la aplicación con `flutter run`. Si ya estaba en marcha, haz un **reinicio en caliente (hot restart)** para cargar la nueva estructura.

Verás los dos textos centrados horizontalmente y situados en la parte superior del cuerpo de la pantalla. El objetivo del ejercicio es conseguir que también queden centrados verticalmente.

### 2. Pide una pista en el chat

Copia el código completo de `lib/main.dart` y pégalo **en el chat del asistente**, acompañado de este mensaje:

```text
Este es el contenido actual de mi archivo lib/main.dart.
Quiero centrar los dos textos verticalmente en el cuerpo de la pantalla.
Dame solo una primera pista sobre la propiedad que debo investigar.
No escribas todavía la solución ni modifiques archivos.
```

Comprueba su respuesta: debe orientarte hacia una propiedad de alineación de `Column` y dejar que tú busques cómo utilizarla. Si devuelve el código resuelto, recuérdale que has pedido solo una pista.

### 3. Prueba tu cambio

Vuelve a **`lib/main.dart`** y modifica la `Column` a partir de la pista. Guarda y comprueba el resultado en la aplicación antes de pedir más ayuda. Después explica al asistente qué has cambiado y qué ha ocurrido. Si necesitas otra pista, cuenta también qué has intentado.

