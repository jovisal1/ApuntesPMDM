---
title: "Formularios"
description: "Requisitos técnicos y orientaciones para la segunda entrega."
sidebar:
  order: 3
---

Desarrolla los formularios de acceso, registro y reserva para que el usuario pueda introducir información, corregir errores y completar cada operación. En la reserva, añade un paso de revisión antes de guardar. Los apartados siguientes detallan los campos, las validaciones y el resultado de cada acción.

:::note[Recordatorio para todos los formularios]
Aplica estas pautas a todos los formularios de la entrega.

Cada formulario debe tener un ViewModel que gestione sus valores, selecciones, errores y operaciones. La pantalla contiene el `Form`, su clave y los `TextEditingController`. Mantén sincronizados los controladores y el ViewModel al editar, precargar o limpiar los campos, y libera los controladores con `dispose`.

El ViewModel gestiona los valores, las validaciones y las operaciones del formulario y notifica los cambios como en los apuntes. La pantalla muestra los resultados, abre los diálogos y se encarga de la navegación. El ViewModel obtiene los modelos de dominio a través de los repositorios y utiliza las reglas que correspondan. Un formulario inválido no permite continuar. En la reserva, tampoco muestra un precio que parezca definitivo.
:::

## Formulario de acceso

El formulario debe permitir el acceso con cualquiera de los usuarios disponibles: los incluidos en los datos iniciales y los creados desde Registro.

### Campos y validaciones

| Dato | Control sugerido | Validación obligatoria |
| --- | --- | --- |
| Nombre | Campo de texto con etiqueta visible | Obligatorio; rechaza un valor vacío o formado solo por espacios. |
| Correo | Campo de texto con teclado de correo y etiqueta visible | Obligatorio y con formato válido. |

Elimina espacios en los extremos y compara los correos sin distinguir mayúsculas, aplicando el mismo criterio que en Registro. Muestra los errores de obligatoriedad y formato junto a cada campo. Cuando ambos sean válidos, comprueba en el repositorio que nombre y correo corresponden al mismo usuario.

Si el nombre y el correo no corresponden al mismo usuario, muestra «Los datos de acceso no son correctos». Conserva los valores para que se puedan corregir, sin iniciar sesión. No construyas un usuario nuevo a partir de los datos escritos.

### Acciones del formulario

| Acción | Comportamiento esperado |
| --- | --- |
| Entrar con campos incorrectos | Permanece en el formulario y muestra los errores junto a los campos. |
| Entrar con nombre y correo que no corresponden a un usuario | Muestra el error de acceso, sin iniciar sesión ni perder el destino pendiente. |
| Entrar con datos correctos | Establece la sesión con el usuario obtenido del repositorio. Recupera el destino protegido pendiente; si no existe, abre `/espacios`. La pantalla de destino comprueba también los permisos del usuario. |
| Limpiar | Restablece los campos y elimina los mensajes de error. Si hay cambios, pide confirmación y solo limpia si se acepta. Conserva el destino pendiente. |
| Crear cuenta | Abre `/registro` y conserva el destino pendiente para recuperarlo después del registro y del acceso correcto. |
| Explorar espacios | Abre `/espacios` y permite consultar el catálogo público sin iniciar sesión. |

Para conectar el acceso con la sesión, utiliza [Acceso a rutas protegidas de los apuntes](../../../formularis-i-navegacio/navegacion-avanzada/rutas-protegidas/).

## Formulario de registro

Completa la pantalla de Registro de la primera entrega para crear usuarios que puedan acceder después con su nombre y correo. El alta debe quedar disponible en el mismo repositorio que consulta el formulario de acceso.

### Campos y validaciones

| Dato | Control sugerido | Validación obligatoria |
| --- | --- | --- |
| Nombre y apellidos | Campo de texto | Obligatorio; rechaza un valor vacío o formado solo por espacios. |
| Correo | Campo de texto con teclado de correo | Obligatorio, con formato válido y no utilizado por otro usuario. |
| Confirmación de correo | Campo de texto | Obligatorio; debe coincidir con el correo introducido. |
| Aceptación de condiciones | Casilla con etiqueta visible | Debe estar marcada para crear la cuenta. |

Elimina espacios en los extremos antes de validar y compara los correos sin distinguir mayúsculas. Comprueba duplicados tanto con los usuarios iniciales como con los creados durante la ejecución. Muestra los errores junto a los campos y conserva los valores para que puedan corregirse.

### Acciones y resultado del registro

| Acción o situación | Comportamiento esperado |
| --- | --- |
| Crear cuenta con datos incorrectos | Permanece en el formulario, muestra los errores y no crea ningún usuario. |
| Correo ya registrado | Muestra «Este correo ya está registrado» y permite corregirlo. |
| Crear cuenta con datos válidos | Guarda un único usuario con identificador propio y vuelve a `/acceso`. En Acceso muestra «Cuenta creada. Ya puedes iniciar sesión» y precarga el nombre y el correo. No inicia sesión automáticamente. |
| Pulsar repetidamente Crear cuenta | Evita altas duplicadas mientras se completa la operación. |
| Volver a Acceso | Regresa a `/acceso` sin crear la cuenta; si hay cambios, aplica la confirmación de descarte. |
| Limpiar | Restablece campos, casilla y errores, con confirmación si hay cambios. |

Si se había llegado a Acceso por una ruta protegida, conserva ese destino durante el registro y el regreso. Solo se recupera después de iniciar sesión correctamente.

El usuario creado debe estar disponible en el mismo repositorio que consulta el formulario de acceso y conservarse durante la ejecución. Reiniciar restaura los datos iniciales. En el primer acceso, Perfil muestra los datos de la nueva cuenta y Mis reservas muestra el estado vacío hasta que cree una reserva. La confirmación del correo y la casilla son datos del formulario; la cuenta utiliza el modelo `Usuario` con identificador, nombre y correo, sin contraseñas.

## Formulario de reserva

Completa la pantalla Nueva reserva de la primera entrega para que el usuario pueda elegir los datos de su solicitud. El formulario debe validar esos datos y calcular el precio antes de pasar a la revisión. La reserva se guardará únicamente después de confirmarla.

### Entrada e información del espacio

El botón **Reservar** del detalle abre `/espacios/:id/reservar` con el identificador del espacio seleccionado. Si no hay sesión, sigue el retorno tras el acceso definido en [Configuración de rutas](../rutas/). El ViewModel consulta el espacio mediante el repositorio.

Muestra el nombre del espacio, su aforo y la tarifa por hora para que el usuario sepa qué está reservando. Estos valores son informativos; no se pueden modificar desde el formulario.

### Campos y validaciones

| Dato | Control sugerido | Validación mínima |
| --- | --- | --- |
| Actividad | Desplegable | Selección entre las actividades del espacio. |
| Fecha | Selector de fecha | Permite un inicio futuro. |
| Inicio y fin | Selectores de hora | Horas en punto, mismo día, fin posterior e inicio futuro. |
| Asistentes | Campo numérico | Entero entre 1 y aforo. |
| Extras | Casillas u opciones múltiples | Solo los del espacio, sin duplicados. |

Puedes limitar los selectores a valores válidos; muestra también errores si el estado recibido incumple las reglas. Convierte los selectores a `DateTime` antes de construir la solicitud; el dominio no necesita `TimeOfDay`.

### Precio y acciones del formulario

Muestra la duración, la tarifa por hora, el subtotal del alquiler, el subtotal de extras, el total y la moneda. Actualiza los importes cuando cambie el horario o la selección de extras. El número de asistentes no modifica el precio de los extras. La tabla siguiente concreta las acciones del formulario.

Las nuevas reservas deben comenzar en el futuro, con inicio y fin en el mismo día y horas en punto, sin segundos ni fracciones. La duración será de una o más horas completas. Rechaza extras desconocidos o duplicados. Calcula los importes en céntimos: total = tarifa por hora × horas + extras. Cada extra se cobra una sola vez por reserva.

| Acción | Comportamiento esperado |
| --- | --- |
| Continuar | Valida todos los datos. Si hay errores, permanece en el formulario y los muestra. Si son válidos, abre `/espacios/:id/reservar/revision` conservando los valores. Todavía no guarda la reserva. |
| Limpiar | Pide confirmación si hay cambios y restablece los valores iniciales y los errores solo si se acepta. |
| Volver | Regresa al detalle del mismo espacio; si se van a perder cambios, pide confirmación de descarte. |

## Revisión y creación de la reserva

La pantalla de revisión debe mostrar el espacio, la actividad, la fecha, el horario, los asistentes, los extras, el contacto y el desglose del precio. Permite volver al formulario para corregir datos sin perder los valores introducidos. Conserva un mismo borrador durante el recorrido. Si utilizas `extra` para pasar información entre pantallas, contempla también el acceso directo a la ruta de revisión, como se indica en Configuración de rutas.

Al confirmar, comprueba de nuevo la sesión, la validez de los datos y los importes. Guarda la reserva mediante el repositorio y evita que varias pulsaciones creen reservas duplicadas. Si la operación falla, conserva el borrador y permite corregir los datos o volver a intentarlo.

Al pulsar **Confirmar reserva**, si la operación termina correctamente, navega a la **pantalla de confirmación o detalle de la reserva creada**, en `/reservas/:id`, utilizando su identificador. Muestra el mensaje «Reserva confirmada» y los datos guardados. Incluye un botón **Ver mis reservas** que lleve a `/reservas`, donde ya debe aparecer la nueva reserva junto a las anteriores del usuario. Sustituye el recorrido de edición para que Atrás no vuelva a la revisión ni repita el envío.

## Diálogos y cambios sin guardar

Considera que un formulario tiene cambios cuando sus valores son distintos de los iniciales. Si una acción va a eliminar esos cambios, solicita confirmación antes de realizarla, tanto desde los botones como desde Atrás del sistema. Puedes utilizar `PopScope`, siguiendo los apuntes. Volver de la revisión al formulario mantiene el borrador y no requiere confirmar un descarte.

| Acción | Respuestas | Resultado |
| --- | --- | --- |
| Abandonar formulario modificado | Seguir editando / Descartar | Solo descartar elimina el borrador y sale. |
| Limpiar formulario modificado | Cancelar / Limpiar | Solo limpiar restablece valores y errores. |
| Cerrar sesión | Cancelar / Cerrar sesión | Solo confirmar elimina sesión y estado privado. |

Aplica la política al cambiar de sección: si abandonas el formulario, confirma; si conservas el recorrido, puedes mantener su borrador. Documenta la decisión y no pierdas cambios silenciosamente. Un formulario intacto no necesita diálogo.

:::note[Un estilo común para los diálogos]
Es conveniente que todos los diálogos mantengan el mismo estilo: tipografía, colores, bordes, espaciado y disposición de los botones. Conserva también la posición y la jerarquía de acciones como Cancelar y Confirmar, y utiliza etiquetas que expliquen qué ocurrirá, como «Descartar cambios» o «Cerrar sesión».

Esta coherencia ayuda al usuario a reconocer rápidamente un diálogo y a entender sus opciones sin tener que aprender una distribución distinta cada vez. También reduce las pulsaciones por error, especialmente en acciones que eliminan cambios. Puedes destacar las acciones destructivas con un color específico, manteniendo el resto del diseño común.
:::
