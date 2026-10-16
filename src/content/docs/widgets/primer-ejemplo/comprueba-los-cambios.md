---
title: "Comprueba los cambios durante el desarrollo"
sidebar:
  order: 9
---

| Operación | Qué observarás en este ejemplo |
| --- | --- |
| **Hot reload** | Aplica cambios compatibles en la interfaz conservando el contador. En `flutter run`, pulsa `r`. |
| **Hot restart** | Reinicia la aplicación Dart y el contador vuelve a cero. En `flutter run`, pulsa `R`. |
| **Detener y ejecutar de nuevo** | Inicia una nueva ejecución; también es necesario para aplicar determinados cambios en código nativo. |

Prueba a registrar dos vueltas y cambiar el texto «Vueltas completadas» por «Vueltas de hoy». Con hot reload debe mantenerse el dos. Hot reload no vuelve a ejecutar `main` ni `initState`; los cambios que necesitan repetir la inicialización requieren un reinicio. Consulta la [guía oficial de hot reload](https://docs.flutter.dev/tools/hot-reload).

:::caution[Si algo no funciona]
Si falla un import, comprueba el nombre del paquete y la ruta. Si aparece un error al utilizar `const`, revisa si has incluido una variable de ejecución. Si el botón escribe en la consola pero el número no cambia, comprueba que modificas el campo de `State` y llamas a `setState`. Lee el primer error de la consola antes de hacer más cambios.
:::
