---
title: "Contenedores: organizar la interfaz"
sidebar:
  label: Introducción
  order: 1
---

Un texto, un icono o un botón resuelven piezas concretas. Los **widgets de composición** deciden cómo se agrupan, qué espacio ocupan y cómo se accede al contenido que no cabe. En esta sección construiremos paneles, fichas y colecciones para nuestro catálogo.

## 🎯 Qué aprenderás

- Distribuir widgets, ajustar su tamaño y aplicar espacios y alineaciones.
- Combinar filas, columnas y superposiciones respetando las restricciones de tamaño.
- Presentar listas y cuadrículas y permitir el desplazamiento del contenido.

## 🧭 Elegir la pieza según el problema

| Necesidad | Widgets |
| --- | --- |
| Tamaño, separación y decoración de un hijo | `Container`, `SizedBox`, `Padding` |
| Alineación de un hijo | `Center`, `Align` |
| Distribución en una dirección | `Row`, `Column`, `Expanded`, `Flexible`, `Spacer` |
| Salto a nuevas líneas | `Wrap` |
| Superposición | `Stack`, `Positioned` |
| Colecciones desplazables | `ListView`, `GridView` |
| Desplazar una composición breve | `SingleChildScrollView` |

`child` recibe un widget y `children`, una lista. Tener varios hijos **no significa poder desplazarse**: `Row`, `Column`, `Wrap` y `Stack` no incorporan scroll.

## 📐 Una idea antes de empezar: las restricciones

El padre comunica al hijo los tamaños permitidos. El hijo elige su tamaño dentro de esos límites y el padre lo coloca. Por eso `width: 200` es una petición que depende del espacio recibido, no una orden que pueda saltarse cualquier restricción.

Una fila dispone normalmente de un ancho finito; una lista vertical deja que cada hijo crezca en altura. Esta diferencia explica dos errores frecuentes: pedir a `Expanded` que reparta una altura ilimitada o poner una lista vertical sin altura dentro de otra. Los ejemplos reservan altura cuando la necesitan; conserva esos límites al probarlos.

## 🧩 La sección del catálogo

La base de [El proyecto del catálogo](../configuracion-de-un-asistente-de-ia/el-proyecto-del-catalogo/) ya incluye la entrada `Contenedores`. Trabajaremos en `lib/ui/catalogo/ui/contenedores_ejemplos_pantalla.dart`. Su estructura inicial es:

```dart
import 'package:flutter/material.dart';

class ContenedoresEjemplosPantalla extends StatelessWidget {
  const ContenedoresEjemplosPantalla({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ejemplos de Contenedores')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Añade aquí los componentes que implementes en las actividades.
        ],
      ),
    );
  }
}
```

Si ya tienes una versión anterior con solo seis entradas, crea el archivo anterior, añade `import 'contenedores_ejemplos_pantalla.dart';` al principio de `catalogo_pantalla.dart` e incorpora esta fila a `children` de su `ListView`. Es código preparado: todavía no necesitas estudiar el mecanismo entre pantallas.

```dart
ListTile(
  leading: const Icon(Icons.dashboard_outlined),
  title: const Text('Contenedores'),
  trailing: const Icon(Icons.chevron_right),
  onTap: () {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (context) => const ContenedoresEjemplosPantalla(),
      ),
    );
  },
),
```

Cada actividad crea componentes en `lib/ui/core/ui/`; la pantalla los importa y muestra varias configuraciones. Conserva las demostraciones anteriores e identifica cada grupo con un título.

## Apartados

- [Espacio, tamaño y decoración](./espacio-y-decoracion/)
- [Filas, columnas y reparto flexible](./filas-columnas-y-reparto/)
- [Capas con Stack y Positioned](./capas-con-stack/)
- [Listas, cuadrículas y desplazamiento](./listas-cuadriculas-y-scroll/)
