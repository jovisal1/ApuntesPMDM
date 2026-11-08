---
title: "4. Connectar la validació"
sidebar:
  order: 5
---

El formulari ha d’explicar què necessita corregir la persona. Separarem els errors de format de cada camp de l’error de consulta de l’usuari. Els primers es mostren davall de Nombre, Correo o Taller; el segon es mostra prop de Login.

## Per què apareix el missatge davall del camp

`validarNombre` és una funció del ViewModel: rep un text i retorna un missatge o `null`. **No dibuixa res ni mostra l’error per si mateixa.** Connectem eixa funció al camp amb `validator`:


```dart
TextFormField(
  initialValue: vm.nombre,
  decoration: const InputDecoration(labelText: 'Nombre'),
  onChanged: vm.cambiarNombre,
  validator: vm.validarNombre,
),
```

`validator: vm.validarNombre` entrega una referència a la funció; no l’executa en escriure eixa línia. Quan es valida el camp, Flutter la crida amb el valor actual. El recorregut és:

1. Login crida `_formKey.currentState?.validate()`.
2. `FormState` demana la validació de tots els camps.
3. El camp Nombre crida `vm.validarNombre(valorActual)`.
4. Si rep una cadena, la guarda en `FormFieldState.errorText`; `TextFormField` utilitza eixe text en la decoració i el representa davall del camp, amb l’estil d’error del tema.
5. Si rep `null`, el camp és vàlid i retira el missatge anterior. El `Form` retorna `true` únicament si no hi ha camps amb error.

Per exemple, `A` retorna «Introduce al menos dos caracteres»; `Ana` retorna `null`. Cridar `vm.validarNombre('A')` des d’un test només retorna la cadena: no canvia l’estat visual del camp. Tampoc cal `notifyListeners()` dins del validador, perquè Flutter gestiona i reconstruïx l’estat de validació del camp.

Afegix `validator: vm.validarNombre` a Nombre i `validator: vm.validarCorreo` a Correo. El desplegable utilitzarà `vm.validarTaller`. La validació de correu comprova format bàsic, no que existisca en la font.

## Configurar quan es valida

`autovalidateMode` controla les validacions **automàtiques**. `validate()` continua funcionant en polsar Login amb qualsevol d’estos modes.

| Mode | Quan apareix o s’actualitza l’error |
| --- | --- |
| `AutovalidateMode.disabled` | No valida automàticament. L’error s’obté en cridar `validate()`. |
| `AutovalidateMode.onUserInteraction` | Valida després d’interactuar. En el `Form` és una política comuna: una edició pot fer que es comproven també altres camps. |
| `AutovalidateMode.always` | Valida en construir i reconstruir, fins i tot sense edició. Pot mostrar errors en obrir un formulari buit. |

En el nostre exemple començarem amb validació automàtica desactivada. Després del primer Login, activarem l’actualització mentre es corregixen les dades. Afegix al `State`:


```dart
bool _intentoLogin = false;
```

En el `Form`, afegix esta propietat:
```dart
autovalidateMode: _intentoLogin
    ? AutovalidateMode.onUserInteraction
    : AutovalidateMode.disabled,
```

En el pas de Login posarem la variable a `true` amb `setState` abans de cridar `validate()`. Limpiar la tornarà a `false`. Si preferixes mostrar els missatges **només en polsar Login**, utilitza sempre `AutovalidateMode.disabled`; els errors no s’actualitzaran en editar fins a la validació següent.

També existix `autovalidateMode` en cada camp. Si necessites polítiques diferents per camp, deixa el `Form` en `disabled` i configura cadascun: així evites que una validació automàtica del formulari comprove tot el grup.

## Configurar el text i el seu aspecte

El contingut del missatge es canvia en el `return` del validador. L’aspecte pertany a la vista: `InputDecoration.errorStyle` permet configurar l’estil i `errorMaxLines` permet repartir missatges llargs en línies. Este fragment de decoració utilitza el color d’error del tema i permet fins a tres línies:


```dart
decoration: InputDecoration(
  labelText: 'Nombre',
  errorStyle: TextStyle(color: Theme.of(context).colorScheme.error),
  errorMaxLines: 3,
),
```

No fixem una altura al camp: ha de poder créixer en aparéixer el missatge o en ampliar el text. No utilitzes `errorText: ''` per a ocultar errors: una cadena buida continua sent un error. Per a acceptar el valor, el validador ha de retornar `null`.

## Error de consulta de l’usuari

Si els camps tenen format correcte, `login()` consulta el repositori. `Ana` amb `pau@centro.es` no correspon a una mateixa fitxa: el ViewModel assigna `error`, notifica i la vista mostra el missatge de consulta prop del botó. Eixe missatge no és `FormFieldState.errorText`; és estat de presentació del ViewModel. Les regles continuen en el ViewModel i la cerca i transformació de dades en el repositori.

Referències: [validator](https://api.flutter.dev/flutter/widgets/FormField/validator.html), [FormState.validate](https://api.flutter.dev/flutter/widgets/FormState/validate.html) i [AutovalidateMode](https://api.flutter.dev/flutter/widgets/AutovalidateMode.html).
