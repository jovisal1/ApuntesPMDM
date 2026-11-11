---
title: "Posibles ampliaciones"
description: "Mejoras opcionales de la segunda entrega."
sidebar:
  order: 4
---

Estas mejoras son opcionales. Puedes incorporarlas después de completar los requisitos de rutas y formularios. Indica cuáles has desarrollado y comprueba que se integren con el resto de la aplicación.

## Disponibilidad y solapamientos

Comprueba que el intervalo solicitado esté contenido en una única franja libre y que no se solape con reservas activas del mismo espacio. Utiliza la disponibilidad de siete días definida en la primera entrega. No es necesario combinar franjas contiguas.

Dos intervalos se solapan cuando `inicioA.isBefore(finB) && inicioB.isBefore(finA)`. Terminar exactamente cuando comienza otra reserva está permitido. Las reservas pendientes y confirmadas ocupan su intervalo; las canceladas lo dejan libre.

## Modificación y cancelación

Edita reservas futuras no canceladas del usuario actual mediante el mismo formulario precargado. Guardar conserva el identificador y actualiza el listado. Aplica precios actuales y presenta el nuevo desglose para aceptarlo; hasta guardar, el original no cambia.

Antes de cancelar, solicita confirmación. Si se acepta, cambia el estado a `cancelada` y conserva la tarjeta en el listado. Las reservas pasadas o canceladas solo se pueden consultar.

## Edición del perfil

Valida nombre y correo, permite guardar o descartar y actualiza sesión y Perfil. Rechaza un correo utilizado por otro usuario.

## Opiniones con formulario

Permite publicar una opinión al usuario que haya iniciado sesión. Valida que el comentario contenga texto y que la puntuación sea un entero de 1 a 5. Guarda la opinión en memoria y actualiza el listado, la media y el número de valoraciones. Los cambios deben mantenerse al salir del detalle y volver a abrirlo.

## Búsqueda y filtros

Busca por nombre y filtra por actividad y capacidad mínima. Aplica los criterios de forma conjunta, permite restablecerlos y muestra un mensaje cuando ningún espacio cumpla los filtros. Puedes añadir autocompletado de ubicaciones existentes.
