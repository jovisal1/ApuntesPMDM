---
title: "Paso 6. Guarda el dato y actualiza la interfaz"
sidebar:
  order: 8
---

Podríamos intentar declarar `int vueltas = 0` dentro de `build`, mostrarlo con `Text('$vueltas')` e incrementarlo en el botón. Esto presenta **dos problemas distintos**:

- Cambiar una variable no solicita por sí solo que Flutter reconstruya la interfaz. La consola puede mostrar un número nuevo mientras el texto sigue mostrando el anterior.
- Una variable local de `build` vuelve a inicializarse cuando se ejecuta ese método. No es un lugar adecuado para conservar el contador entre reconstrucciones.

Necesitamos guardar el dato en un objeto `State` y solicitar la actualización con `setState`. **Sustituye todo `lib/presentation/screens/pantalla_entrenamiento.dart`** por esta versión final:

```dart
import 'package:flutter/material.dart';

class PantallaEntrenamiento extends StatefulWidget {
  const PantallaEntrenamiento({super.key});

  @override
  State<PantallaEntrenamiento> createState() => _PantallaEntrenamientoState();
}

class _PantallaEntrenamientoState extends State<PantallaEntrenamiento> {
  int _vueltas = 0;

  void _registrarVuelta() {
    setState(() {
      _vueltas++;
    });
    debugPrint('Vueltas completadas: $_vueltas');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Mi entrenamiento')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Vueltas completadas'),
            const SizedBox(height: 12),
            Text('$_vueltas', style: const TextStyle(fontSize: 56)),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Registrar una vuelta',
        onPressed: _registrarVuelta,
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

En **`lib/main.dart`**, el contenido final debe ser:

```dart
import 'package:flutter/material.dart';
import 'package:contador_vueltas/presentation/screens/pantalla_entrenamiento.dart';

void main() => runApp(const EntrenamientoApp());

class EntrenamientoApp extends StatelessWidget {
  const EntrenamientoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Contador de vueltas',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
      ),
      home: const PantallaEntrenamiento(),
    );
  }
}
```

Al cambiar de `StatelessWidget` a `StatefulWidget`, haz un **hot restart** para empezar con la nueva estructura. Pulsa tres veces el botón: el número debe pasar por 1, 2 y 3 y coincidir con los mensajes de la consola.

### Qué ocurre en cada pulsación

1. `onPressed: _registrarVuelta` entrega la función al botón, sin ejecutarla durante `build`.
2. La pulsación ejecuta la función, y el callback de `setState` incrementa `_vueltas`.
3. `setState` solicita una reconstrucción; `build` lee el nuevo dato.
4. `Text('$_vueltas')` convierte el número en texto mediante interpolación.

`_vueltas` pertenece al objeto `State`, así que se conserva entre reconstrucciones mientras Flutter mantenga ese estado en el árbol. El guion bajo indica privacidad dentro de la biblioteca de Dart. El contador vive en memoria: no se guarda al cerrar la aplicación.

:::note[Qué cambia y qué sigue siendo constante]
`PantallaEntrenamiento` sigue siendo una configuración inmutable, aunque tenga estado asociado. Lo mutable es `_vueltas` en `State`. El `Text` que muestra el número no puede ser `const`, pero su `TextStyle` sí. `EntrenamientoApp` puede continuar siendo un `StatelessWidget`: no necesita gestionar el contador.
:::

### Un widget propio que recibe datos

También podemos extraer el número a un componente sin estado propio. Añade esta clase al final del archivo de la pantalla:

```dart
class NumeroVueltas extends StatelessWidget {
  final int valor;

  const NumeroVueltas({super.key, required this.valor});

  @override
  Widget build(BuildContext context) {
    return Text('$valor', style: const TextStyle(fontSize: 56));
  }
}
```

Después sustituye `Text('$_vueltas', style: const TextStyle(fontSize: 56))` por `NumeroVueltas(valor: _vueltas)`.

`required` obliga a proporcionar el valor y `final` impide reasignarlo en esa instancia. **El componente puede mostrar otro número cuando el padre le entrega una nueva configuración**. No necesita estado propio para reflejar datos que cambian. Su constructor admite `const`, pero esta llamada utiliza `_vueltas`, un dato de ejecución, y por eso no lleva `const`.
