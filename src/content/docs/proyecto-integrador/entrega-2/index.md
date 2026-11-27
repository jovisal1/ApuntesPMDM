---
title: "Entrega 2"
description: "Formularios validados, reservas en memoria y navegación con go_router."
sidebar:
  order: 1
---

En esta segunda entrega ampliarás la aplicación de reserva de espacios de la [primera entrega](../entrega-1/) con los contenidos de [Formularios y navegación](../../formularis-i-navegacio/). Al terminarla, el usuario podrá iniciar sesión o registrarse, rellenar una solicitud de reserva, corregir los errores que detecte la aplicación, revisar el desglose del precio y confirmar la reserva, que aparecerá en Mis reservas.

El trabajo se divide en dos partes:

1. **Configuración de rutas:** centralizar la navegación con `go_router` y proteger las pantallas personales.
2. **Formularios:** desarrollar los formularios de acceso, registro y reserva, con su validación y su revisión final.

## Antes de empezar

Partirás de la aplicación que entregaste en la Entrega 1: modelos de dominio, repositorios, datos ficticios y pantallas. No empiezas de cero: añadirás pantallas, rutas y ViewModels sobre esa base, y modificarás los repositorios cuando sea necesario. Los datos se siguen guardando **en memoria**: no se usa ninguna base de datos ni almacenamiento persistente, de modo que al cerrar la aplicación se pierden los usuarios y las reservas creados.

Algunos comportamientos de la Entrega 1 cambian:

- El acceso y el registro dejan de ser simulados. Se hacen con nombre y correo, sin contraseña, y `Usuario` sigue sin guardar contraseñas.
- Confirmar una reserva ya no es una simulación: la reserva se guarda y aparece en Mis reservas.
- El catálogo y el detalle de un espacio se pueden consultar sin iniciar sesión.
- Las pantallas reciben identificadores a través de la ruta, en lugar del objeto `Espacio` por constructor.
- Añade la dependencia `go_router` en `pubspec.yaml`.

## Parte 1. Configuración de rutas

Implementa una navegación centralizada con `go_router`. La aplicación debe cumplir los siguientes requisitos.

### Mapa de destinos

La aplicación dispone de un único `MaterialApp.router` y de un mapa de rutas que incluye, al menos, estos destinos:

- acceso,
- registro,
- lista de espacios,
- detalle de un espacio,
- formulario de reserva,
- revisión de la reserva,
- lista de reservas del usuario (Mis reservas),
- perfil.

Incluye también la confirmación o el detalle de una reserva propia y una pantalla de «Página no encontrada». El catálogo y el detalle de un espacio son públicos; el resto de destinos, salvo acceso y registro, exigen sesión.

### Parámetros y errores

- Las rutas del detalle y del formulario de reserva reciben el identificador del espacio; la de una reserva concreta recibe el identificador de la reserva. La pantalla obtiene el modelo correspondiente a través del repositorio.
- Si el usuario accede a una ruta que no existe, la aplicación muestra una pantalla de error con una forma clara de volver al inicio.
- Si el identificador no corresponde a ningún espacio o reserva, la aplicación lo indica con un mensaje y ofrece una forma de volver. Una reserva de otro usuario se trata igual que una inexistente, sin revelar a quién pertenece.

### Secciones con estado conservado

Las secciones Espacios, Mis reservas y Perfil se muestran como secciones de la aplicación entre las que se puede alternar. Al cambiar de una a otra, cada sección conserva su posición de desplazamiento y su pila de navegación.

### Sesión y rutas protegidas

- La sesión del usuario se guarda en memoria y se comparte entre todas las pantallas que la necesitan.
- Las rutas personales (como Mis reservas y Perfil) solo son accesibles con la sesión iniciada. Si no la hay, la aplicación lleva al acceso y, una vez iniciada la sesión, devuelve al usuario al destino que había solicitado. Esto incluye el formulario y la revisión de la reserva: si se pulsa Reservar sin sesión, tras el acceso se abre el formulario de ese espacio.
- Al cerrar sesión se elimina el estado privado del usuario y el botón Atrás no permite volver a las pantallas personales.
- Con la sesión iniciada, acceso y registro redirigen al catálogo. Las redirecciones no deben producir bucles.

En [Configuración de rutas](./rutas/) encontrarás el mapa de destinos completo y el comportamiento esperado ante accesos incorrectos o sin permisos.

## Parte 2. Formularios

Implementa los formularios de acceso, de registro y de reserva, y el recorrido que lleva desde la solicitud hasta la confirmación.

### Requisitos comunes

- Cada formulario usa `Form`, campos con etiqueta y los controles adecuados para cada dato (texto, fecha, hora, desplegable, casilla…).
- Los mensajes de validación aparecen junto al campo afectado y permiten corregir el error antes de continuar.

### Acceso

El usuario introduce su nombre y su correo. La aplicación comprueba en el repositorio de usuarios que ambos datos corresponden a un usuario registrado.

Ver el [formulario de acceso](./formularios/#formulario-de-acceso).

- Campos: nombre y correo, ambos obligatorios; el correo con formato válido.
- Validaciones: se ignoran los espacios de los extremos y el correo se compara sin distinguir mayúsculas. Si los datos no corresponden a un usuario, se muestra «Los datos de acceso no son correctos» y se conservan los valores.
- Si todo es correcto, se inicia la sesión y se abre el destino pendiente o, si no lo hay, el catálogo.

### Registro

Ver el [formulario de registro](./formularios/#formulario-de-registro).

- Campos: nombre, correo, confirmación del correo y aceptación de las condiciones.
- Validaciones: el correo y su confirmación coinciden, el correo no está ya registrado y las condiciones están aceptadas.
- Si todo es correcto, se da de alta al usuario y la aplicación vuelve a la pantalla de acceso, con el nombre y el correo precargados y el mensaje «Cuenta creada. Ya puedes iniciar sesión». No se inicia la sesión automáticamente.

### Reserva

Ver el [formulario de reserva](./formularios/#formulario-de-reserva).

- Campos: actividad, fecha, hora de inicio y de fin, número de asistentes y extras. Los extras son los servicios adicionales que ofrece cada espacio desde la Entrega 1.
- Validaciones: el número de asistentes está entre 1 y el aforo del espacio; la fecha y la hora de inicio son futuras; las horas son en punto y el fin es posterior al inicio el mismo día, con una duración mínima de una hora; y los extras seleccionados son los que ofrece ese espacio.
- El formulario muestra un desglose provisional del precio (duración, tarifa por hora, alquiler, extras y total), que se actualiza al cambiar el horario o los extras, y ofrece tres acciones: continuar con la revisión, limpiar el formulario o volver al detalle del espacio.

### Revisión y confirmación

- El precio se calcula en céntimos, como número entero (tarifa por hora × horas + precio de cada extra, que se cobra una sola vez), con una única lógica de cálculo que se reutiliza tanto en el formulario como en la revisión.
- La pantalla de revisión muestra el desglose del precio. Si el usuario vuelve a editar, el formulario conserva los valores introducidos.
- Al confirmar, la reserva se crea una sola vez, aunque el botón se pulse varias veces, y se guarda en el repositorio en memoria. Su autor es siempre el usuario de la sesión. Después se abre la confirmación con el mensaje «Reserva confirmada», y el botón Atrás no vuelve a la revisión ni repite el envío.
- Mis reservas se actualiza de inmediato y muestra únicamente las reservas del usuario actual.

### Diálogos de confirmación

- Antes de limpiar un formulario, o de abandonarlo cuando tiene cambios sin confirmar, la aplicación pide confirmación mediante un diálogo.
- Si el usuario cancela, no se pierde ningún dato.
- Cerrar sesión también pide confirmación. Los diálogos aparecen tanto con los botones de la pantalla como con el botón Atrás del sistema (con `PopScope`, como en [Cambios sin guardar al volver](../../formularis-i-navegacio/navegacion-avanzada/cambios-sin-guardar/)) y comparten el mismo estilo.
- Decide qué ocurre con un borrador al cambiar de sección y documenta la decisión en el README.

En [Formularios](./formularios/) tienes los requisitos de cada pantalla y su comportamiento esperado.

## Mejoras opcionales

Las mejoras opcionales se describen en [Posibles ampliaciones](./ampliaciones/).
