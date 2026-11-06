---
title: "10. Probar el recorrido"
sidebar:
  order: 11
---

Desde la raíz de `catalogo_widgets`, ejecuta `dart format lib` para formatear el código, `flutter analyze` para detectar problemas y `flutter run` para abrir el catálogo. Entra en Login de demostración y comprueba el mismo recorrido que hemos construido desde el primer paso.

| Prueba | Resultado esperado |
| --- | --- |
| Login con campos vacíos | Errores en nombre, correo y taller. Permanece en el formulario. |
| Nombre de un carácter o correo sin `@` | Error junto al campo correspondiente. |
| Ana y ana@centro.es sin taller | Error de selección, sin abrir detalle. |
| Ana y pau@centro.es con taller | Error de consulta: no corresponden a la misma ficha. |
| Nombre y correo desconocidos con formato correcto | Usuario no encontrado, sin navegar. |
| Ana, ana@centro.es y Cerámica | Detalle con «¡Hola, Ana García Pérez!», teléfono 600 000 001, localidad Xàtiva y todos los demás campos de su ficha. |
| Pau, pau@centro.es y un taller | Detalle con Pau Soler Vidal, teléfono 600 000 002 y localidad Alzira. |
| Recordatorio marcado o desmarcado | Ambas opciones permiten Login; el detalle refleja la preferencia. |
| Corregir un error de consulta y pulsar Login | Se utilizan los valores actuales, sin conservar el mensaje antiguo. |
| Volver desde el detalle | Conserva nombre, correo, taller y casilla. |
| Salir al catálogo y volver a abrir Login | Empieza sin texto, sin taller y con la casilla desmarcada. |

Prueba nombre y correo con espacios exteriores y mayúsculas: la búsqueda debe seguir encontrando la ficha. Revisa también una ventana estrecha, el teclado abierto y texto al 150 %: todo el contenido debe poder desplazarse sin overflow.

## Comprueba la arquitectura

Añade un taller y una tercera persona en el servicio. Al volver a abrir el ejemplo, el desplegable debe incluir la nueva opción y el detalle debe mostrar la ficha completa de la tercera persona sin editar los widgets. No copies esos datos en el ViewModel.

Explica por qué la clave del `Form`, los controladores, el foco y `Navigator` están en la vista, mientras que la consulta se hace a través del contrato de dominio. Indica dónde cambiarías la conversión si la fuente dejase de utilizar el campo `email`.
