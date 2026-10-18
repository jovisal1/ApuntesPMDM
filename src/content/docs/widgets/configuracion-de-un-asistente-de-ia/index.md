---
title: "Configuración de un asistente de IA"
description: "Configuración de un asistente de IA · Asistente de IA y catálogo de widgets para 2.º de DAM."
sidebar:
  order: 1
---

En esta práctica vamos a preparar un **asistente de Flutter** y organizar el trabajo sobre el proyecto base que crearemos en esta sección y ampliaremos en **Básicos**: el **Catálogo de widgets**. Su pantalla principal mostrará una lista de componentes. Al pulsar una entrada, abriremos una pantalla con varios ejemplos de ese widget. Cuando aprendamos un componente nuevo, ampliaremos el catálogo.

La IA nos ayudará a comprender código, encontrar errores y revisar cambios. Para aprender necesitamos comprobar sus propuestas, ejecutarlas y explicar lo que hemos construido. Una respuesta convincente puede contener un error.

## Qué necesitas saber antes de empezar

Debes haber preparado [el entorno de Flutter](../../introduccion-a-flutter/preparacion-del-entorno/) y practicado [las bases de Dart](../../introduccion-a-flutter/el-lenguaje-dart/): variables, listas, funciones, clases, constructores y parámetros nombrados. Antes de continuar, completa el [primer ejemplo de widgets](../primer-ejemplo/): esta es la segunda sección del recorrido.

No necesitas una clave de una API ni añadir paquetes de IA a `pubspec.yaml`. El asistente se utiliza durante el desarrollo; nuestra aplicación será un catálogo y no incorporará un chat.

## Recorrido de la práctica

1. [Preparar el proyecto](./preparar-el-proyecto/).
2. [Configurar y comprobar el asistente](./configurar-el-asistente/).
3. [Crear habilidades para componentes, pruebas y revisión](./crear-skills/).
4. [Planificar el catálogo que construiremos en Básicos](./el-proyecto-del-catalogo/).

## Cuatro conceptos que no debemos confundir

Al configurar un asistente aparecen cuatro palabras que describen cosas distintas: **agente, skill, regla y contexto**. Vamos a distinguirlas usando una misma tarea: añadir ejemplos de `Text` a nuestro catálogo de widgets.

### Agente: el asistente que lleva a cabo una tarea

Un **agente de IA** es un sistema que utiliza un modelo de IA para avanzar hacia un objetivo. Puede decidir qué pasos dar, utilizar las herramientas que tenga disponibles y revisar sus resultados antes de continuar.

Por ejemplo, ante la petición «Busca por qué no se abre la pantalla de ejemplos», un agente integrado en el editor podría leer el archivo de la lista, revisar el `onTap`, consultar los errores de Dart y proponer una corrección. Si tiene permiso para modificar archivos, también podría aplicar el cambio y comprobarlo.

El **modelo** genera respuestas y propone acciones; el **agente** incorpora además el funcionamiento que permite utilizar herramientas y encadenar esos pasos. Sus posibilidades dependen del entorno y de los permisos: un chat al que pegamos código puede explicarlo, pero eso no le da acceso a los archivos de nuestro ordenador.

Escribir «actúa como experto en Flutter» define un papel para el asistente. Esa frase, por sí sola, no le proporciona herramientas ni acceso al proyecto.

### Skill: un procedimiento reutilizable para una tarea concreta

Una **skill**, o habilidad, reúne instrucciones para realizar una tarea específica siguiendo un procedimiento que podemos reutilizar. Puede incluir ejemplos, referencias y, en algunos entornos, scripts de apoyo.

En nuestro proyecto, `explain-widget` será una skill para explicar widgets. Su procedimiento podría ser:

1. Explicar para qué sirve el widget.
2. Mostrar un ejemplo mínimo.
3. Describir las propiedades utilizadas.
4. Señalar un error frecuente.
5. Proponer una modificación para practicar.

Podemos aplicar el mismo procedimiento a `Text`, `Icon` o `Image`. Cambia el componente que estudiamos, pero mantenemos la forma de explicarlo.

**La skill indica cómo abordar una tarea; no es otro agente.** Tampoco es una función de Dart que se ejecute al abrir la aplicación. Hay que proporcionársela al asistente o guardarla en un formato y una ubicación que la herramienta reconozca, como veremos en el apartado de habilidades.

### Regla: una instrucción que orienta el comportamiento

Una **regla** indica cómo debe trabajar el asistente o qué límites debe respetar. Suele aplicarse a distintas tareas, mientras que una skill desarrolla el procedimiento de una tarea concreta.

Estas serían reglas de nuestro proyecto:

- «Explica la sintaxis nueva antes de utilizarla».
- «No añadas paquetes externos».
- «Si pido una revisión, no modifiques los archivos».

La regla «No añadas paquetes externos» sigue siendo relevante tanto al explicar `Text` como al revisar una pantalla de botones. No describe una secuencia de trabajo: establece una condición que deben respetar las propuestas.

Guardarla en un archivo no basta: el asistente debe recibir o cargar esas instrucciones. Además, una regla escrita en lenguaje natural **no equivale a un permiso técnico**. Pedir que no modifique archivos orienta su comportamiento; restringir la escritura desde la herramienta limita técnicamente lo que puede hacer.

### Contexto: la información disponible para resolver la tarea

El **contexto** es la información que el asistente tiene disponible al preparar una respuesta o decidir una acción. Puede incluir nuestra petición, mensajes anteriores, código adjunto, instrucciones cargadas y resultados de herramientas.

Para revisar el catálogo, aportaríamos este contexto:

```text
Estoy aprendiendo widgets básicos de Flutter.
La aplicación tiene una lista con las entradas Text e Icon.
Al pulsar Text no se abre su pantalla de ejemplos.
Este es el archivo catalogo_pantalla.dart y este es el error que aparece.
```

Indicar nuestro nivel ayuda a ajustar la explicación; describir el resultado esperado y aportar el código permite investigar el problema. El asistente no conoce automáticamente todo el proyecto ni lo que hicimos en otra conversación: debemos comprobar qué información tiene disponible.

Las reglas y las skills también pueden formar parte del contexto cuando se cargan. Las distinguimos por su función: **el contexto aporta información; una regla orienta el comportamiento; una skill organiza un procedimiento**.

### Cómo se relacionan en una misma petición

Imagina que escribimos: «Revisa la pantalla de ejemplos de `Text` y dime qué puedo mejorar sin cambiar archivos».

| Concepto | Qué aporta en este caso |
| --- | --- |
| **Agente** | Atiende la petición, examina la información disponible y elabora la revisión; utiliza herramientas si las necesita y las tiene disponibles. |
| **Skill** | `review-code` organiza la revisión: comprobar el objetivo, identificar problemas y justificar como máximo tres mejoras. |
| **Regla** | «No modifiques archivos cuando pida una revisión» limita las acciones que debe proponer o realizar. |
| **Contexto** | El código de la pantalla, nuestro nivel, la petición y los resultados del analizador permiten valorar el cambio. |

Una **herramienta** es otro elemento: permite realizar una operación, como leer un archivo o consultar el analizador. El agente la utiliza; la skill puede indicar cuándo conviene hacerlo. Tener una skill que diga «comprueba los errores» no proporciona por sí mismo una herramienta para consultar Dart.

**Comprueba que lo distingues:** «Conozco clases de Dart» aporta contexto sobre tu nivel; «No uses paquetes externos» es una regla; «Sigue estos pasos para revisar una pantalla» define un procedimiento que podemos guardar como skill. El agente es el sistema que utiliza esa información para realizar la tarea.

## De dónde parte este tutorial

La [guía oficial de Flutter para desarrollar con IA](https://docs.flutter.dev/ai/get-started) sirve de referencia para la conexión con el entorno de desarrollo. El catálogo y la secuencia de ejercicios permiten poner en práctica la configuración del asistente mientras construimos la aplicación.
