---
title: "5. Llegir i modificar els camps"
sidebar:
  order: 6
---

Fins ara arreplegàvem l’escriptura amb `onChanged`. Ampliarem l’edició per a poder consultar el correu en prémer un botó i omplir-lo amb un valor d’exemple des del codi.

Aplicarem els controladors que ja vam provar en [Text i edició](../../controles-de-entrada/texto-y-edicion/). La novetat serà `addListener`: mantindrà el ViewModel sincronitzat fins i tot quan un botó canvie el text des del codi.

:::tip[Què aconseguirem]
En integrar estos canvis podràs llegir el correu actual i canviar-lo des d’un botó. Tant l’escriptura com els canvis des del codi actualitzaran la dada que s’usa per a previsualitzar.
:::

## 🎛️ 1. Crear i escoltar els controladors

Afig estos membres a `_InscripcionPantallaState`, al costat de `_formKey`. Els inicialitzem amb els valors del ViewModel i registrem un listener per camp:

```dart
late final TextEditingController _nombreController;
late final TextEditingController _correoController;

@override
void initState() {
  super.initState();
  _nombreController = TextEditingController(text: widget.viewModel.nombre);
  _correoController = TextEditingController(text: widget.viewModel.correo);
  _nombreController.addListener(_actualizarNombre);
  _correoController.addListener(_actualizarCorreo);
}

void _actualizarNombre() {
  final texto = _nombreController.text;
  if (texto != widget.viewModel.nombre) {
    widget.viewModel.cambiarNombre(texto);
  }
}

void _actualizarCorreo() {
  final texto = _correoController.text;
  if (texto != widget.viewModel.correo) {
    widget.viewModel.cambiarCorreo(texto);
  }
}

@override
void dispose() {
  _nombreController.dispose();
  _correoController.dispose();
  super.dispose();
}
```

`addListener` registra el mètode que s’executarà quan el controlador notifique un canvi. També pot notificar canvis de selecció; la comparació evita tractar com a text nou un simple moviment del cursor.

## 2. Connectar-los als camps

En Nombre substituïx `initialValue` per `controller: _nombreController`; en Correo, per `controller: _correoController`. **Elimina els dos `onChanged`**: els listeners ja comuniquen el text al ViewModel. Conserva les decoracions i els validadors.

:::tip[Dos formes d’observar l’edició]
El pas 2 usa `onChanged` per a l’escriptura de l’usuari. Ací el substituïm per `addListener`, que també observa canvis realitzats des del codi. No mantingues les dos connexions per a executar dos vegades la mateixa actualització.
:::

## 3. Llegir el contingut en prémer un botó

Afig este mètode al `State`:

```dart
void _leerCorreo() {
  final correo = _correoController.text;
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text(correo.isEmpty ? 'Correo vacío' : correo)),
  );
}
```

Després del botó de previsualitzar, afig `TextButton(onPressed: _leerCorreo, child: const Text('Leer correo'))`. Prova a escriure un correu i llegir-lo sense previsualitzar: `.text` retorna el contingut actual encara que no siga vàlid.

## 4. Modificar el camp des del codi

Per a provar la diferència amb `onChanged`, afig també este botó:

```dart
TextButton(
  onPressed: () => _correoController.text = 'ana@centro.es',
  child: const Text('Usar correo de ejemplo'),
),
```

El listener actualitza el ViewModel i descarta el resum anterior. No canvies `.text` dins del mateix listener: podries generar notificacions repetides.

Referències: [Detectar canvis](https://docs.flutter.dev/cookbook/forms/text-field-changes) i [Recuperar el text](https://docs.flutter.dev/cookbook/forms/retrieve-input).
