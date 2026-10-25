---
title: "Actividades de formularios"
---

## ✍️ Amplía el catálogo con tus formularios

Resuelve estas actividades en **`catalogo_widgets`**, conservando los ejemplos de la unidad. Añade una entrada en `catalogo_pantalla.dart` para cada pantalla nueva. No necesitas otro proyecto ni paquetes adicionales. Las instrucciones describen el resultado que debes construir; la implementación te corresponde a ti.

En cada funcionalidad, coloca la View en `lib/ui/<funcionalidad>/ui/` y el ViewModel en `lib/ui/<funcionalidad>/view_models/`. La vista mantiene la clave del `Form`, los controladores y el foco; el ViewModel contiene las reglas de validación, los datos recogidos y la preparación del resultado. Crea el ViewModel una vez y libera sus recursos cuando deje de utilizarse, como en el ejemplo de inscripción.

### 1. Formulario de reserva

Crea `ReservaPantalla` y `ReservaViewModel` dentro de `lib/ui/reserva/`.

- Pide el nombre mediante `TextFormField`: tras quitar los espacios exteriores, debe tener al menos dos caracteres.
- Permite elegir Mañana o Tarde con `DropdownButtonFormField<String>`. Al principio no hay turno seleccionado y es obligatorio elegir uno.
- Añade la aceptación de condiciones con `FormField<bool>` y `CheckboxListTile`. Muestra un error si no se aceptan.
- Al pulsar «Reservar», valida todos los campos. Solo si son válidos, recoge sus valores con `save()` y entrégalos al ViewModel para preparar el mensaje de confirmación.
- Muestra la confirmación en un `SnackBar`, incluyendo el nombre y el turno.
- Añade «Reiniciar»: restablece los campos y limpia también los datos guardados fuera del `Form`.

:::tip[Resultado esperado]
Una reserva incompleta muestra errores y no genera confirmación. Una reserva válida recoge los tres valores. Después de reiniciar, el nombre queda vacío, no hay turno seleccionado y las condiciones vuelven a estar desmarcadas.
:::

### 2. Editar una ficha

Crea `FichaPantalla` y `FichaViewModel` dentro de `lib/ui/ficha/`. Utiliza lo aprendido con los controladores para editar una ficha con Nombre y Correo.

- Inicializa los dos campos con los datos que proporciona el ViewModel.
- Comunica los cambios al ViewModel sin crear controladores en `build`.
- Añade «Usar datos de ejemplo» para cambiar ambos textos desde código. Los valores del ViewModel también deben quedar actualizados.
- Añade «Guardar»: valida los campos con las reglas del ejemplo de inscripción y muestra debajo un resumen preparado por el ViewModel.
- Si se modifica cualquier campo, oculta el resumen anterior hasta que se vuelva a guardar. Conecta las notificaciones con `ListenableBuilder`.
- Configura «Siguiente» para pasar de Nombre a Correo y añade un botón «Editar correo» que solicite el foco de ese campo.

:::tip[Resultado esperado]
El resumen corresponde siempre a los últimos datos guardados. Escribir o cargar datos de ejemplo retira el resumen anterior. El botón de foco permite editar el correo sin tocar directamente el campo.
:::

## 🧩 Muestra los resultados en el catálogo

Mantén disponibles «Formulario de inscripción», «Reserva» y «Editar ficha». En cada pantalla incluye una breve explicación de lo que permite probar. Ejecuta `dart format lib` y `flutter analyze`.

Prueba datos vacíos, valores incorrectos y valores válidos. Revisa también la carga desde código, el reinicio y la edición posterior al guardado: cada acción debe dejar coherentes los campos, los datos del ViewModel y el resultado visible.
