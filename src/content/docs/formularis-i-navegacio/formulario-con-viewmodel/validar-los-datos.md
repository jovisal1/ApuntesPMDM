---
title: "3. Comprobar los datos"
sidebar:
  order: 4
---

Ya recogemos el nombre y el correo, pero el usuario puede dejarlos vacíos o escribir datos incorrectos. En este paso definiremos qué aceptamos: un nombre de al menos dos caracteres sin contar los espacios exteriores y un correo con un formato básico.

Añadiremos dos métodos de validación a `InscripcionViewModel` y los conectaremos a la propiedad `validator` de cada campo. La regla de Nombre es la misma que ya conocemos; añadimos ahora la comprobación del correo.

:::tip[Qué conseguiremos]
Al terminar estarán preparadas las reglas y sus mensajes. Se ejecutarán al solicitar la validación desde el botón que incorporaremos después.
:::

Dentro de `InscripcionViewModel`, añade estos dos métodos, antes de la llave final de la clase:

```dart
  String? validarNombre(String? valor) {
    if ((valor ?? '').trim().length < 2) {
      return 'Introduce al menos dos caracteres';
    }
    return null;
  }

  String? validarCorreo(String? valor) {
    final correo = (valor ?? '').trim();
    if (!RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$').hasMatch(correo)) {
      return 'Introduce un correo con formato nombre@dominio.ext';
    }
    return null;
  }

```

La novedad es `RegExp` en `validarCorreo`: exige texto antes y después de `@`, seguido de un punto y una extensión, sin espacios interiores. Es una comprobación básica de formato; no confirma que la dirección exista.

Añade `validator: widget.viewModel.validarNombre` al campo Nombre y `validator: widget.viewModel.validarCorreo` al campo Correo. Así cada campo sabe qué comprobación ejecutar.
