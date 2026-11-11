---
title: "Capa de presentación"
description: "Estilo coherente, componentes reutilizables y al menos siete pantallas navegables."
sidebar:
  order: 5
---

La capa de presentación vive en `lib/ui/`. Las pantallas muestran modelos de dominio, comunican acciones y permiten recorrer la aplicación. Los componentes visuales se agrupan por funcionalidad o se comparten en `lib/ui/core/ui/`.

## Libertad de diseño y pantallas mínimas

Debes implementar **al menos siete pantallas**: login, registro, principal, detalle de un espacio, nueva reserva, mis reservas y perfil con ajustes. Puedes añadir otras, como una confirmación independiente, siempre que las siete mínimas sigan siendo identificables y cumplan sus requisitos.

**Los mockups y las propuestas de distribución son orientativos.** Puedes diseñar las pantallas como consideres, elegir otra identidad y cambiar su composición. Mantén los datos mínimos, las acciones y la navegación exigidos. No se evaluará que tu aplicación copie los dibujos, sino que resuelva el recorrido y sea legible y coherente.

## Un estilo coherente en toda la aplicación

Antes de implementar las pantallas, acuerda unos criterios visuales sencillos y anótalos en el `README`. Deben aplicarse también a las pantallas que añadas. Como punto de partida:

- Elige una paleta reducida con un color principal, colores de fondo y texto y colores para los estados. Mantén el mismo significado en toda la aplicación y acompaña los estados con texto.
- Define una jerarquía de textos: título de pantalla, título de sección, texto normal y texto secundario. Repite los tamaños y pesos elegidos para cada función.
- Utiliza una escala pequeña de separaciones, por ejemplo 8, 16 y 24 píxeles lógicos. Mantén márgenes y alineaciones consistentes.
- Da el mismo aspecto a las acciones equivalentes. El botón principal debe destacar de la misma forma; los secundarios y las acciones de volver deben resultar reconocibles.
- Conserva criterios comunes para tarjetas, bordes, esquinas, iconos e imágenes. Comprueba contraste, lectura de textos largos y desplazamiento en pantallas pequeñas.

Estas son pautas de coherencia para esta entrega. **Cuando aprendamos a gestionar los estilos de Flutter de forma adecuada, centralizaremos su configuración.** Ahora aplica los criterios elegidos en tus componentes; no se exige implementar todavía un sistema global de temas ni paquetes de estilos.

## Crear los componentes que se repiten

Si detectas un patrón reutilizable, **debes extraerlo a un componente propio**, igual que estamos haciendo en el [catálogo de componentes](../../../widgets/configuracion-de-un-asistente-de-ia/el-proyecto-del-catalogo/). No te limites a las tarjetas propuestas: revisa también los botones, los tipos de texto, los campos con una apariencia común o las filas de icono y etiqueta.

Por ejemplo, un `BotonPrincipal` puede recibir el texto y la acción, un `TituloSeccion` el texto que debe mostrar, y `EspacioTarjeta` los datos del espacio y la acción de abrirlo. Utiliza parámetros para expresar las variantes de contenido, aspecto y comportamiento; evita crear una clase distinta para cada texto o color. Reutilizar significa utilizar ese mismo componente en los lugares donde se repite el patrón.

- Guarda los componentes compartidos en `lib/ui/core/ui/` y los específicos en `lib/ui/<funcionalidad>/ui/`.
- Separa el contenido del aspecto: el texto o el espacio recibido no deben quedar fijados dentro de una pieza reutilizable.
- Haz que las pantallas compongan esos componentes, en lugar de copiar su árbol de widgets en varios archivos.
- Comprueba sus variantes con datos distintos, como en el catálogo: textos largos, botones principales y secundarios, estados de reserva y tarjetas con diferente información.

La extracción de componentes ya permite aplicar las mismas decisiones visuales en varios lugares. Es compatible con centralizar los estilos más adelante.

## Recorrido obligatorio


Login ↔ Registro; Login → Principal → Detalle → Nueva reserva → confirmación simulada → Mis reservas. Desde Principal, Mis reservas y Perfil debe poder cambiarse entre esas tres secciones mediante una navegación coherente. Puedes usar NavigationBar, Drawer o un menú equivalente.

Usa Navigator y MaterialPageRoute o una solución equivalente que puedas explicar. Detalle y Nueva reserva deben permitir volver. Tras entrar, Atrás no debe regresar al login; al cerrar sesión debe volver al login y limpiar las pantallas anteriores. El espacio seleccionado debe conservarse durante el recorrido.

## Login

Acceso simulado a la aplicación.

![Acceso con correo, contraseña y opciones sociales de demostración](../../../../assets/proyecto-integrador/entrega-1/figma/01-acceso.png)


### Requisitos mínimos

- Muestra el nombre o logotipo, un mensaje de bienvenida, los campos de correo y contraseña y un botón de acceso. La contraseña debe aparecer oculta.
- Incluye al menos dos botones de acceso social, por ejemplo Google y Apple. Al pulsarlos se accede con el usuario ficticio y se identifica el acceso como simulado; no se conectan cuentas externas.
- Permite acceder con datos de demostración sin comprobar credenciales ni conectarse a un servidor. Identifica el acceso como simulado.
- El botón abre la pantalla principal. Configura la navegación para que Atrás no vuelva a esta pantalla después del acceso.
- Incluye un enlace Registrarse que abra la pantalla de registro y permita volver al login.
- Adapta el contenido al teclado y al alto disponible mediante desplazamiento cuando sea necesario.

Comprobación: Pulsa Entrar y comprueba que se abre el catálogo. Vuelve al login desde Cerrar sesión y revisa que puedes acceder otra vez.

## Registro

Presentación de un alta de usuario ficticia.

![Registro con nombre completo, correo, contraseña, confirmación y creación de cuenta de demostración](../../../../assets/proyecto-integrador/entrega-1/figma/11-registro.png)


### Requisitos mínimos

- Muestra nombre y apellidos, correo, contraseña y repetición de contraseña con etiquetas visibles. Los campos de contraseña deben ocultar el texto.
- Puedes precargar los campos; no se exige validación, guardar los datos ni crear una cuenta real. Identifica el registro como una simulación.
- Permite regresar al login. Entrar en la aplicación sigue realizándose desde el login.
- Incluye Volver al inicio de sesión y permite regresar mediante Atrás. No almacenes contraseñas en `Usuario` ni en su DTO.

Comprobación: Abre Registro desde Login, activa la confirmación y regresa al acceso. Comprueba también el botón Atrás.

## Pantalla principal

Catálogo de espacios disponibles en la demostración.

<div role="group" aria-label="Inicio, catálogo y filtros" tabindex="0" style="display: grid; grid-template-columns: repeat(3, minmax(180px, 1fr)); gap: 1rem; overflow-x: auto; margin-block: 1rem;">

<figure style="margin: 0;">

![Inicio con búsqueda, tipos de evento, lugares cercanos y navegación inferior](../../../../assets/proyecto-integrador/entrega-1/figma/02-inicio.png)

</figure>

<figure style="margin: 0;">

![Catálogo de espacios con búsqueda y filtros](../../../../assets/proyecto-integrador/entrega-1/figma/03-espacios.png)

</figure>

<figure style="margin: 0;">

![Filtro detallado por tipo de evento, servicios, fecha y hora](../../../../assets/proyecto-integrador/entrega-1/figma/10-filtros.png)

</figure>

</div>


### Requisitos mínimos

- Muestra al menos seis espacios distintos mediante una lista o cuadrícula desplazable, con datos procedentes de los modelos.
- Cada tarjeta incluye imagen, nombre, ubicación, aforo y al menos una actividad admitida. Reutiliza un componente `EspacioTarjeta`.
- La pulsación sobre cualquier tarjeta abre el detalle de ese espacio. Comprueba también una tarjeta situada al `final` del listado.
- Ofrece acceso visible a Mis reservas y Perfil. Si añades categorías o un buscador decorativo, indícalo como vista de ejemplo; los filtros funcionales son una ampliación.

Comprobación: Abre dos espacios diferentes y comprueba que sus detalles cambian. Revisa el desplazamiento hasta el último elemento.

## Detalle de un espacio

Información completa del espacio seleccionado.

![Detalle de La Fábrica con servicios, salas, precios y acceso a disponibilidad](../../../../assets/proyecto-integrador/entrega-1/figma/04-detalle.png)


### Requisitos mínimos

- Muestra nombre, descripción, ubicación, aforo y actividades admitidas. Sustituye la imagen única por un carrusel con al menos tres imágenes del espacio recibido, desplazable horizontalmente y con indicador de posición.
- Incluye al menos tres elementos de equipamiento o servicios, representados mediante iconos y texto.
- Muestra la tarifa por hora con moneda, y la persona de contacto del local con nombre, teléfono y correo. Usa datos ficticios.
- Presenta condiciones y horario de uso. Muestra la web del local si existe y «Sin sitio web» si es `null`; basta mostrarla como texto, sin incorporar paquetes para abrir enlaces.
- Muestra la disponibilidad de hoy y los seis días siguientes, con fecha y franjas libres u ocupadas. Usa texto además del color e indica «Disponibilidad simulada»; no se exige bloquear franjas ni enlazarlas con una reserva real.
- Muestra las opiniones con autor, fecha, comentario y puntuación de 1 a 5; incluye media y número de valoraciones, o «Sin valoraciones». Permite añadir una opinión de prueba con texto y puntuación, utilizando estado local.
- El botón Reservar abre Nueva reserva con el mismo espacio. La acción de volver regresa al catálogo.

Comprobación: Abre dos espacios. Cambian la galería, los comentarios, la media, la web y la disponibilidad. En Jardin Brisa debe aparecer «Sin valoraciones». Añade una opinión de prueba y comprueba que desaparece al salir y volver a abrir el detalle. Reserva Patio Llum y comprueba que se conserva ese espacio.

## Nueva reserva

Presentación de una solicitud de reserva de prueba.

<div role="group" aria-label="Sala, disponibilidad y resumen" tabindex="0" style="display: grid; grid-template-columns: repeat(3, minmax(180px, 1fr)); gap: 1rem; overflow-x: auto; margin-block: 1rem;">

<figure style="margin: 0;">

![Nueva reserva con selector de recinto y selección de sala](../../../../assets/proyecto-integrador/entrega-1/figma/07-nueva-reserva.png)

</figure>

<figure style="margin: 0;">

![Disponibilidad con selección de día y franja horaria](../../../../assets/proyecto-integrador/entrega-1/figma/05-disponibilidad.png)

</figure>

<figure style="margin: 0;">

![Resumen de reserva con sala, fecha, horario, importe total y aviso de demostración](../../../../assets/proyecto-integrador/entrega-1/figma/06-resumen.png)

</figure>

</div>


### Requisitos mínimos

- Identifica el espacio elegido e incluye actividad, fecha, hora de inicio, hora de fin y número de asistentes.
- Presenta actividad, fecha, horario y asistentes mediante controles con etiquetas visibles. Puedes precargarlos sin edición. La selección de servicios adicionales sí debe responder a las pulsaciones; no se exige validación completa de formularios.
- El ejemplo debe ser coherente: actividad admitida, asistentes dentro del aforo y hora de fin posterior a la de inicio. Puedes generar el ejemplo a partir del espacio recibido.
- Muestra los servicios que ofrece ese espacio mediante opciones seleccionables con su nombre y precio final por reserva. Permite elegir ninguno, uno o varios; no confundas los extras con el equipamiento incluido.
- Muestra duración, tarifa por hora, subtotal de alquiler, subtotal de extras, total y moneda, además del contacto del local. Actualiza los importes con cada selección: total = tarifa × horas + extras.
- La confirmación debe conservar el mismo espacio, los servicios seleccionados y el desglose de precio; no añade una reserva a la fuente simulada.


## Mis reservas

Consulta de reservas ficticias precargadas.

![Mis reservas con próximas reservas, estado, horarios y precios](../../../../assets/proyecto-integrador/entrega-1/figma/08-mis-reservas.png)


### Requisitos mínimos

- Muestra al menos dos reservas con nombre del espacio, actividad, fecha, horario, asistentes, estado y precio total con moneda. Incluye los servicios contratados y su coste, o «Sin extras».
- Diferencia visualmente al menos dos estados, como Confirmada y Pendiente. Acompaña el color con texto legible.
- Incluye el nombre y al menos un medio de contacto de la persona responsable del local, accesibles en la tarjeta o en un detalle de la reserva.
- Reutiliza un componente `ReservaTarjeta`. Los datos deben relacionarse con espacios existentes del catálogo.
- Incluye navegación hacia Espacios y Perfil. No se exige cancelar o modificar reservas; si añades estos botones, deben explicar su comportamiento simulado.

Comprobación: Comprueba que ambas reservas se leen completas y que sus estados se distinguen sin depender exclusivamente del color.

## Perfil y ajustes

Información del usuario y de la aplicación.

![Perfil de Álex García con estadísticas, preferencias y regreso al acceso](../../../../assets/proyecto-integrador/entrega-1/figma/09-perfil.png)


### Requisitos mínimos

- Muestra avatar o iniciales, nombre y correo de un usuario ficticio coherente en toda la aplicación.
- Incluye una sección de preferencias y otra con nombre de la aplicación, versión y breve descripción del proyecto.
- Puedes representar una preferencia con un valor fijo identificado como ejemplo. En esta entrega basta mostrar ese valor de ejemplo.
- El botón Cerrar sesión vuelve al login y elimina las rutas anteriores. Tras salir, Atrás no debe reabrir el perfil ni el catálogo.
- Incluye acceso a Espacios y Mis reservas con el mismo patrón de navegación que el resto de secciones principales.

Comprobación: Cierra sesión y pulsa Atrás. Comprueba que las pantallas de la sesión cerrada no quedan accesibles.
