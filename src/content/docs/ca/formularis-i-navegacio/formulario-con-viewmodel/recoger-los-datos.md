---
title: "2. Crear el ViewModel"
sidebar:
  order: 3
---

El ViewModel connecta les dades del formulari amb el contracte de domini. Rep `InscripcionesRepository` per constructor, obté els tallers una vegada i conserva nom, correu, taller seleccionat, casella i error. No rep un servici ni DTO.

Crea este fitxer complet. En el pas de validació explicarem les regles i, en connectar Login, seguirem el resultat de `login()` fins a la pantalla de detall. Tindre la classe completa des d’ara evita mantindre dos implementacions diferents durant el recorregut.


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

## Estat i notificacions

Els getters permeten llegir l’estat sense substituir-lo des de fora. Els mètodes `cambiar...` guarden una edició i retiren l’error anterior amb `_avisarCambio()`. `notifyListeners()` avisa la vista; esta l’escoltarà amb `ListenableBuilder`. No obri cap pantalla.

`talleres` conté models de domini del repositori, en una llista no modificable. `_tallerId` comença en `null`: encara no hi ha selecció. La casella comença en `false`, que és una resposta vàlida perquè és opcional.

`login()` retorna `DatosAcceso?`: un resultat complet si les comprovacions i la consulta tenen èxit, o `null` amb un error. No inventa cognoms, telèfon ni localitat a partir del text escrit.

Continua amb [la vista i el seu muntatge](../preparar-la-pantalla/).

`limpiar()` restablix els textos, les seleccions i l’error en una sola acció i notifica el canvi. Conserva els tallers del repositori: netejar un formulari no esborra el catàleg ni modifica la font. El connectarem al botó Limpiar en el pas 8.
