---
title: "Posibles ampliaciones"
description: "Mejoras opcionales de la segunda entrega."
sidebar:
  order: 4
---

Realiza estas tareas después del mínimo. Documenta cuáles implementas y comprueba su recorrido completo. Se conserva la numeración de la propuesta inicial.

## 4. Disponibilidad y solapamientos

Exige que el intervalo quepa en una única franja libre de la disponibilidad simulada y no se solape con reservas activas del espacio. Usa el horizonte de siete días anterior; no necesitas combinar franjas contiguas.

Dos intervalos se solapan cuando `inicioA.isBefore(finB) && inicioB.isBefore(finA)`. Terminar exactamente cuando comienza otra reserva está permitido. Pendientes y confirmadas bloquean; canceladas no.

## 6. Modificación y cancelación

Edita reservas futuras no canceladas del usuario actual mediante el mismo formulario precargado. Guardar conserva el identificador y actualiza el listado. Aplica precios actuales y presenta el nuevo desglose para aceptarlo; hasta guardar, el original no cambia.

Cancelar requiere diálogo y cambia el estado a `cancelada`, sin eliminar la tarjeta. Reservas pasadas y canceladas serán de consulta.

## 7. Edición del perfil

Valida nombre y correo, permite guardar o descartar y actualiza sesión y Perfil. Rechaza un correo utilizado por otro usuario.

## 8. Opiniones con formulario

Exige sesión, texto con contenido y puntuación entera de 1 a 5. Guarda en memoria y actualiza lista, media y número de opiniones, también al reabrir el espacio.

## 9. Búsqueda y filtros

Busca por nombre y filtra por actividad y capacidad mínima. Combina criterios, permite limpiarlos y muestra ausencia de resultados. Puedes añadir autocompletado de ubicaciones existentes.
