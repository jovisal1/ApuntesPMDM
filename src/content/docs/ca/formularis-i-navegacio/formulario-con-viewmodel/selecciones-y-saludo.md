---
title: "5. Afegir el desplegable i la casella"
sidebar:
  order: 6
---

Afegix un desplegable de tallers i una casella després del camp Correo, dins de `children`. Continuen formant part del mateix formulari i es comproven en polsar Login; Limpiar permet restablir-los.

## Tallers procedents de data

`DropdownButtonFormField<String>` integra la selecció en `Form`, per la qual cosa participa en `validate()`. `items` transforma `vm.talleres` en opcions: els títols venen del repositori, no d’una llista escrita en el widget. Cada opció mostra `titulo` i utilitza `id` com a valor estable.

`initialValue` establix la selecció inicial, que serà `null`. No imposa canvis posteriors sobre el camp. `onChanged` comunica la selecció al ViewModel i `validator` comprova que siga una opció existent. `isExpanded` permet utilitzar l’amplària disponible.

## Una preferència opcional

`CheckboxListTile` permet marcar la casella o polsar-ne l’etiqueta. `value` llig el ViewModel i `onChanged` comunica el nou valor; `valor ?? false` tracta el paràmetre anul·lable del callback. Una casella servix per a una preferència independent; els botons de ràdio s’utilitzen per a triar una opció excloent dins d’un grup.

El recordatori és simulat i opcional. Marcat o desmarcat, l’accés pot ser vàlid. No l’utilitzem com a prova d’identitat ni enviem missatges.


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

Afegir un altre taller al servici i tornar a obrir l’exemple ha d’afegir-ne l’opció sense modificar esta vista. En el detall mostrarem el taller i la preferència al costat de la fitxa de l’usuari.
