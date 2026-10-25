---
title: "8. Probar el formulario"
sidebar:
  order: 9
---

El formulario ya está montado. Vamos a comprobar que responde correctamente tanto cuando los datos son válidos como cuando están incompletos, y que una edición no deja visible un resumen antiguo.

Ejecuta `catalogo_widgets` y abre «Formulario de inscripción». Sigue los casos en orden y compara lo que ves con el resultado indicado. En este paso comprobaremos el comportamiento antes de dar el ejemplo por terminado.

:::tip[Qué conseguiremos]
Al terminar habrás revisado la validación, el resumen, la lectura del correo, los cambios desde código y el recorrido del teclado dentro del mismo ejemplo del catálogo.
:::

1. Pulsa «Previsualizar» sin escribir: deben aparecer los errores.
2. Introduce un nombre de un carácter y un correo sin `@`: siguen siendo incorrectos.
3. Escribe un nombre y un correo válidos: aparece el resumen sin espacios exteriores.
4. Cambia el nombre: el resumen anterior desaparece hasta volver a pulsar el botón.

5. Pulsa «Leer correo» antes de validar: el mensaje muestra el texto actual.
6. Pulsa «Usar correo de ejemplo»: cambian el campo y el dato que se previsualiza; desaparece el resumen anterior.
7. Reinicia y comprueba el foco inicial en Nombre, el salto con «Siguiente» y el botón «Editar correo».
