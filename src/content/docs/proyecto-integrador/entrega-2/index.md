---
title: "Entrega 2"
description: "Formularios validados, reservas en memoria y navegación con go_router."
sidebar:
  order: 1
---

En esta segunda entrega ampliarás la aplicación de reserva de espacios de la [primera entrega](../entrega-1/) con los contenidos de [Formularios y navegación](../../formularis-i-navegacio/). El trabajo se divide en dos partes: configurar las rutas que conectan las pantallas y desarrollar los formularios de acceso, registro y reserva. El usuario podrá introducir sus datos, corregir los errores que detecte la aplicación y revisar la información y el precio antes de confirmar una reserva, que aparecerá en Mis reservas.

## Configuración de rutas

Implementa una navegación centralizada con `go_router` que cumpla estos requisitos técnicos:

- Un único `MaterialApp.router` y un mapa de rutas para acceso, registro, espacios, detalle, reserva, revisión, reservas del usuario y perfil.
- Parámetros de identificador para consultar espacios y reservas mediante repositorios; tratamiento de rutas desconocidas y elementos inexistentes.
- Secciones Espacios, Mis reservas y Perfil con conservación del desplazamiento y la navegación al alternar.
- Sesión compartida en memoria, protección de las opciones personales y retorno al destino solicitado después del acceso.
- Cierre de sesión que limpie el estado privado e impida recuperarlo con Atrás.

Consulta [Configuración de rutas](./rutas/) para los requisitos detallados, el mapa de destinos y el comportamiento ante accesos incorrectos o sin permisos.

## Formularios

Implementa el acceso y el recorrido de reserva con estos requisitos técnicos:

- `Form`, campos etiquetados, controles adecuados y mensajes de validación que permitan corregir errores antes de continuar.
- Los ViewModels gestionan los valores, las validaciones y las operaciones del formulario. Las pantallas se encargan de mostrar los resultados y de la navegación, y los repositorios proporcionan los modelos de dominio. La vista gestiona los controladores y los libera con `dispose`.
- Acceso con nombre y correo comprobado contra el repositorio de usuarios.
- [Formulario de registro](./formularios/#formulario-de-registro): nombre, correo, confirmación del correo y aceptación de condiciones; validación de duplicados, alta del usuario y regreso a Acceso.
- [Formulario de reserva](./formularios/#formulario-de-reserva): actividad, fecha, horas, asistentes y extras editables; validación de aforo, intervalo y opciones admitidas por el espacio. Incluye resumen de precio y acciones para continuar a revisión, limpiar o volver al detalle.
- Cálculo compartido del precio en céntimos, revisión del desglose y regreso a edición conservando los valores.
- Alta única al confirmar, almacenamiento local compartido y actualización inmediata de Mis reservas para el usuario actual.
- Diálogos para limpiar o descartar formularios modificados, sin perder cambios al cancelar.

Consulta [Formularios](./formularios/) para los requisitos de cada pantalla, el comportamiento esperado.

Las mejoras opcionales se describen en [Posibles ampliaciones](./ampliaciones/).
