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
El listado y las pantallas vacías vienen implementados.
Completaremos sus ejemplos conforme los estudiemos en clase.
No modifiques main.dart ni catalogo_pantalla.dart ni expliques navegación.

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

## Comprueba la ayuda sobre un fragmento

Pega este fragmento **en el chat**, sin sustituir archivos del proyecto base:

```dart
const Text('Ruta de la cascada', maxLines: 1)
```

Pide: «Quiero que una descripción larga muestre puntos suspensivos si no cabe. Dame una pista sobre qué propiedad falta y qué condiciones de espacio debo revisar. No cambies archivos ni resuelvas todavía el ejercicio».

La respuesta debe permitirte intentarlo y distinguir el límite de líneas del espacio disponible. Si genera una aplicación completa, recuerda las reglas y pide una pista concreta. Trabajaremos el resultado en el tutorial de `Text`.
