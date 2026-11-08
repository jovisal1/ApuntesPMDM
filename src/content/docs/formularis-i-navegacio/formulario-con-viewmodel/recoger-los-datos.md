---
title: "2. Crear el ViewModel"
sidebar:
  order: 3
---

El ViewModel conecta los datos del formulario con el contrato de dominio. Recibe `InscripcionesRepository` por constructor, obtiene los talleres una vez y conserva nombre, correo, taller seleccionado, casilla y error. No recibe un servicio ni DTO.

Crea este archivo completo. En el paso de validación explicaremos sus reglas y, al conectar Login, seguiremos el resultado de `login()` hasta la pantalla de detalle. Tener la clase completa desde ahora evita mantener dos implementaciones distintas durante el recorrido.


`lib/ui/inscripcion/view_models/inscripcion_viewmodel.dart`

```dart
import 'package:flutter/foundation.dart';
import '../../../domain/models/datos_acceso.dart';
import '../../../domain/models/taller.dart';
import '../../../domain/repositories/inscripciones_repository.dart';

class InscripcionViewModel extends ChangeNotifier {
  InscripcionViewModel(this._repository)
    : talleres = List.unmodifiable(_repository.obtenerTalleres());

  final InscripcionesRepository _repository;
  final List<Taller> talleres;
  String _nombre = '';
  String _correo = '';
  String? _tallerId;
  bool _recordatorio = false;
  String? _error;

  String get nombre => _nombre;
  String get correo => _correo;
  String? get tallerId => _tallerId;
  bool get recordatorio => _recordatorio;
  String? get error => _error;

  void _avisarCambio() {
    _error = null;
    notifyListeners();
  }

  void cambiarNombre(String valor) {
    _nombre = valor;
    _avisarCambio();
  }

  void cambiarCorreo(String valor) {
    _correo = valor;
    _avisarCambio();
  }

  void cambiarTaller(String? valor) {
    _tallerId = valor;
    _avisarCambio();
  }

  void cambiarRecordatorio(bool valor) {
    _recordatorio = valor;
    _avisarCambio();
  }

  void limpiar() {
    _nombre = '';
    _correo = '';
    _tallerId = null;
    _recordatorio = false;
    _error = null;
    notifyListeners();
  }

  String? validarNombre(String? valor) => (valor ?? '').trim().length < 2
      ? 'Introduce al menos dos caracteres'
      : null;

  String? validarCorreo(String? valor) =>
      RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$').hasMatch((valor ?? '').trim())
      ? null
      : 'Introduce un correo con formato nombre@dominio.ext';

  String? validarTaller(String? valor) => talleres.any((t) => t.id == valor)
      ? null
      : 'Selecciona un taller de la lista';

  DatosAcceso? login() {
    if (validarNombre(_nombre) != null ||
        validarCorreo(_correo) != null ||
        validarTaller(_tallerId) != null) {
      _error = 'Revisa el nombre, el correo y el taller';
      notifyListeners();
      return null;
    }
    final usuario = _repository.buscarUsuario(_nombre, _correo);
    if (usuario == null) {
      _error = 'No hay un usuario de ejemplo con ese nombre y correo';
      notifyListeners();
      return null;
    }
    _error = null;
    return DatosAcceso(
      usuario: usuario,
      taller: talleres.firstWhere((t) => t.id == _tallerId),
      recordatorio: _recordatorio,
    );
  }
}
```

## Estado y notificaciones

Los getters permiten leer el estado sin sustituirlo desde fuera. Los métodos `cambiar...` guardan una edición y retiran el error anterior mediante `_avisarCambio()`. `notifyListeners()` avisa a la vista; esta lo escuchará con `ListenableBuilder`. No abre ninguna pantalla.

`talleres` contiene modelos de dominio del repositorio, en una lista no modificable. `_tallerId` empieza en `null`: todavía no hay selección. La casilla empieza en `false`, que es una respuesta válida porque es opcional.

`login()` devuelve `DatosAcceso?`: un resultado completo si las comprobaciones y la consulta tienen éxito, o `null` con un error. No inventa apellidos, teléfono ni localidad a partir del texto escrito.

Continúa con [la vista y su montaje](../preparar-la-pantalla/).

`limpiar()` restablece los textos, las selecciones y el error en una sola acción y notifica el cambio. Conserva los talleres del repositorio: limpiar un formulario no borra el catálogo ni modifica la fuente. Lo conectaremos al botón Limpiar en el paso 8.
