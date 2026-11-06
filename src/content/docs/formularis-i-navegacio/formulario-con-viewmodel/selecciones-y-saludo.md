---
title: "5. Añadir el desplegable y la casilla"
sidebar:
  order: 6
---

Añade un desplegable de talleres y una casilla después del campo Correo, dentro de `children`. Siguen formando parte del mismo formulario y se envían con su único botón Login.

## Talleres procedentes de data

`DropdownButtonFormField<String>` integra la selección en `Form`, por lo que participa en `validate()`. `items` transforma `vm.talleres` en opciones: los títulos vienen del repositorio, no de una lista escrita en el widget. Cada opción muestra `titulo` y utiliza `id` como valor estable.

`initialValue` establece la selección inicial, que será `null`. No impone cambios posteriores sobre el campo. `onChanged` comunica la selección al ViewModel y `validator` comprueba que sea una opción existente. `isExpanded` permite utilizar el ancho disponible.

## Una preferencia opcional

`CheckboxListTile` permite marcar la casilla o pulsar su etiqueta. `value` lee el ViewModel y `onChanged` comunica el nuevo valor; `valor ?? false` trata el parámetro anulable del callback. Una casilla sirve para una preferencia independiente; los botones de radio se utilizan para elegir una opción excluyente dentro de un grupo.

El recordatorio es simulado y opcional. Marcado o desmarcado, el acceso puede ser válido. No lo usamos como prueba de identidad ni enviamos mensajes.


```dart
DropdownButtonFormField<String>(
  initialValue: vm.tallerId,
  isExpanded: true,
  decoration: const InputDecoration(labelText: 'Taller'),
  items: vm.talleres
      .map(
        (taller) => DropdownMenuItem<String>(
          value: taller.id,
          child: Text(taller.titulo),
        ),
      )
      .toList(),
  onChanged: vm.cambiarTaller,
  validator: vm.validarTaller,
),
CheckboxListTile(
  contentPadding: EdgeInsets.zero,
  title: const Text('Quiero recibir un recordatorio'),
  subtitle: const Text(
    'Opcional. No se enviará ningún mensaje.',
  ),
  value: vm.recordatorio,
  onChanged: (valor) => vm.cambiarRecordatorio(valor ?? false),
),
```

Añadir otro taller al servicio y volver a abrir el ejemplo debe añadir su opción sin modificar esta vista. En el detalle mostraremos el taller y la preferencia junto a la ficha del usuario.
