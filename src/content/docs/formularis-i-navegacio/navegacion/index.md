---
title: "Introducción"
sidebar:
  order: 1
---

El catálogo ya permite abrir las pantallas de ejemplos. Ahora vamos a estudiar ese mecanismo y ampliarlo dentro de **`catalogo_widgets`**. Una aplicación también necesita abrir un detalle, volver al listado, cambiar de sección o pedir una confirmación. En esta subsección construiremos esos recorridos con las herramientas de Flutter.

Conviene distinguir tres situaciones: **abrir una pantalla con `push`** añade una ruta a la pila; **cambiar de sección** sustituye el contenido principal; **abrir un diálogo** plantea una interacción breve sobre la pantalla actual. Elegiremos una herramienta para cada caso.

## 🎯 Qué aprenderás

- Abrir y cerrar pantallas y pasar argumentos y resultados entre ellas.
- Organizar secciones con barras de navegación, un panel lateral o pestañas.
- Pedir confirmaciones y recoger respuestas con diálogos.

Los ejemplos se añaden como nuevas entradas del catálogo, conservando las demostraciones anteriores y su `main.dart`. Las pantallas de navegación se guardan en `lib/ui/navegacion/ui/`; los diálogos amplían el formulario de inscripción ya existente.
