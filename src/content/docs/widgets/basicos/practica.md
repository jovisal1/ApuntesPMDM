---
title: "Practica con los widgets básicos"
sidebar:
  order: 10
---

El resultado de esta unidad es un catálogo de **componentes propios con variantes**, construidos a partir de los widgets estudiados. Completa las actividades de cada apartado y revisa el conjunto.

## 🔎 Revisa los componentes

1. Cada componente vive en su archivo de `lib/ui/core/ui/`; las pantallas lo importan y muestran distintas configuraciones.
2. Los parámetros separan contenido, aspecto y acciones. Una variante visual no altera el texto o el callback recibido sin que lo indique su contrato.
3. Las variantes se seleccionan mediante booleanos o `enum`, sin duplicar clases para cada combinación.
4. Muestra todas las variantes pedidas y algún caso límite: texto largo, imagen que falla, botón desactivado o espacio reducido.
5. Cada ejemplo del catálogo tiene un título y una explicación propia de qué cambia y qué debemos observar.

## ✅ Comprueba y entrega

Ejecuta `dart format lib`, `flutter analyze` y las pruebas creadas con `test-widget`. Revisa que las pruebas se basan en requisitos concretos y distinguen las variantes. Comprueba también la legibilidad y el ajuste visual en una ventana pequeña.

Entrega un único proyecto con los componentes, las pantallas del catálogo y las pruebas. Elige dos componentes y explica por qué has elegido sus parámetros, qué variantes permiten y qué detectaría una de sus pruebas. No necesitas haber implementado el mecanismo de paso entre pantallas.

Incluye también las actividades de [Contenedores](../../contenedores/), comprobando las variantes en ventanas de distintos tamaños.
