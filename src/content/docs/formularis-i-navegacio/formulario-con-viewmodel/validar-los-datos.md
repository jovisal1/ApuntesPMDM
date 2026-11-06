---
title: "4. Conectar la validación"
sidebar:
  order: 5
---

Diferenciaremos dos errores: el formato de los campos y la ausencia de una ficha que coincida. Los primeros aparecen junto a cada campo mediante `validator`; el error de consulta aparecerá encima de Login. Ninguno abre el detalle.

## Conectar los campos con sus reglas

El ViewModel ya contiene `validarNombre` y `validarCorreo`. Devuelven un texto si hay un problema y `null` si se acepta el dato. Nombre exige dos caracteres sin contar espacios exteriores. La expresión regular del correo comprueba un formato básico; no garantiza que exista en la fuente.

Añade estas propiedades a los dos `TextFormField` existentes, sin duplicarlos:


```dart
// Nombre
validator: vm.validarNombre,

// Correo
validator: vm.validarCorreo,
```

En el `Form`, añade `autovalidateMode: AutovalidateMode.onUserInteraction`. Así los errores se actualizan al interactuar y corregir los campos. Al pulsar Login llamaremos además a `validate()` para comprobarlos todos, aunque alguno no se haya tocado.

## Comprobar la selección y la ficha

`validarTaller` exige que el identificador exista en `vm.talleres`: no basta con recibir un texto cualquiera. La casilla es opcional, así que `false` no produce error.

`login()` vuelve a comprobar estas reglas para proteger la acción cuando se utiliza sin la vista. Solo entonces llama a `buscarUsuario(nombre, correo)`. Por ejemplo, `Ana` y `pau@centro.es` tienen formato correcto pero no pertenecen a la misma ficha. El repositorio devuelve `null`, el ViewModel asigna `error` y llama a `notifyListeners()`. Una edición borra ese mensaje antiguo; un nuevo Login vuelve a consultar.

No añadimos una segunda copia de las reglas en el widget ni una lista de usuarios en el ViewModel. Continúa con [las opciones del formulario](../selecciones-y-saludo/).
