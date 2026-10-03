---
title: Flutter
description: Introducción al desarrollo de interfaces gráficas con Flutter y a su enfoque declarativo basado en widgets.
---

En las unidades anteriores hemos trabajado los fundamentos del lenguaje **Dart**, aprendiendo los conceptos necesarios para estructurar y desarrollar nuestros programas. A partir de este punto damos un paso más: utilizaremos estos conocimientos para comenzar a desarrollar **aplicaciones con interfaz gráfica mediante Flutter**.

Flutter propone una forma de construir interfaces diferente a la programación gráfica tradicional. En lugar de indicar paso a paso cómo debe modificarse la interfaz, utiliza un enfoque **declarativo**: describimos cómo queremos que sea la interfaz en función del estado de la aplicación y Flutter se encarga de representarla y actualizarla cuando sea necesario.

![Logotipo de Flutter](../../../assets/flutter-logo.png)

El elemento fundamental sobre el que se construye cualquier interfaz en Flutter es el **widget**. Prácticamente todo lo que aparece en pantalla es un widget: un texto, un botón, una imagen, un campo de entrada, una fila de elementos o incluso la propia estructura de una pantalla. A su vez, los widgets pueden contener otros widgets, formando una **jerarquía o árbol de widgets** (*widget tree*).

A lo largo de esta unidad aprenderemos a construir interfaces combinando diferentes tipos de widgets. Veremos cómo organizar y distribuir los elementos en pantalla, cómo aplicar estilos y, progresivamente, cómo conseguir que nuestras interfaces puedan responder a las acciones del usuario y a los cambios que se produzcan en la aplicación.

El objetivo no será únicamente conocer una colección de widgets, sino comprender **cómo piensa Flutter a la hora de construir una interfaz**, ya que esta filosofía será la base sobre la que desarrollaremos nuestras aplicaciones.
