---
title: "1. Preparar data i domain"
sidebar:
  order: 2
---

Abans de dibuixar el formulari, preparem les dades que consultarà Login. Crea estos huit fitxers complets. El servici coneix la font, el repositori la transforma i `domain` definix allò que consumix l’aplicació. No afegim dades fictícies dins dels widgets.

La consulta és immediata i síncrona perquè treballa en memòria. Els tallers del desplegable i la fitxa de l’usuari procediran d’esta mateixa capa de dades. Primer consulta els models de domini; després el contracte i la seua implementació.

## 1. Models que utilitza l’aplicació

`UsuarioInscripcion` conté la fitxa completa. `Taller` representa una opció del desplegable. `DatosAcceso` reunix l’usuari trobat, el taller i l’opció marcada per a passar-los a la pantalla de detall. Representa el resultat de l’accés de demostració; no guarda una inscripció. Estos models no importen Flutter.


`lib/domain/models/usuario_inscripcion.dart`

```dart
class UsuarioInscripcion {
  const UsuarioInscripcion({
    required this.id,
    required this.nombre,
    required this.apellidos,
    required this.correo,
    required this.telefono,
    required this.localidad,
  });
  final String id;
  final String nombre;
  final String apellidos;
  final String correo;
  final String telefono;
  final String localidad;
  String get nombreCompleto => '$nombre $apellidos';
}
```

`lib/domain/models/taller.dart`

```dart
class Taller {
  const Taller({required this.id, required this.titulo});
  final String id;
  final String titulo;
}
```

`lib/domain/models/datos_acceso.dart`

```dart
import 'usuario_inscripcion.dart';
import 'taller.dart';

class DatosAcceso {
  const DatosAcceso({
    required this.usuario,
    required this.taller,
    required this.recordatorio,
  });
  final UsuarioInscripcion usuario;
  final Taller taller;
  final bool recordatorio;
}
```

## 2. Contracte del repositori

El contracte descriu les consultes disponibles sense exposar com s’obtenen les dades. `buscarUsuario` retorna `null` si no hi ha coincidència; un correu amb format correcte no garantix que existisca en la font.


`lib/domain/repositories/inscripciones_repository.dart`

```dart
import '../models/usuario_inscripcion.dart';
import '../models/taller.dart';

abstract class InscripcionesRepository {
  List<Taller> obtenerTalleres();
  UsuarioInscripcion? buscarUsuario(String nombre, String correo);
}
```

## 3. Models de la font i servici local

Els DTO descriuen el format del proveïdor fictici: codis numèrics, `email`, `poblacion` i `etiqueta`. El domini utilitza identificadors de text, `correo`, `localidad` i `titulo`. La conversió queda en el repositori, de manera que un canvi del proveïdor no obliga a modificar els widgets. Cada DTO viu en el seu propi fitxer, igual que els models de domini.


`lib/data/models/usuario_inscripcion_dto.dart`

```dart
class UsuarioInscripcionDto {
  const UsuarioInscripcionDto({
    required this.codigo,
    required this.nombrePila,
    required this.apellidos,
    required this.email,
    required this.telefono,
    required this.poblacion,
  });
  final int codigo;
  final String nombrePila;
  final String apellidos;
  final String email;
  final String telefono;
  final String poblacion;
}
```

`lib/data/models/taller_dto.dart`

```dart
class TallerDto {
  const TallerDto({required this.codigo, required this.etiqueta});
  final int codigo;
  final String etiqueta;
}
```

El servici és l’únic lloc on escrivim les fitxes i les opcions de mostra. Les dades són fictícies i no s’envia cap missatge.


`lib/data/services/inscripciones_local_service.dart`

```dart
import '../models/usuario_inscripcion_dto.dart';
import '../models/taller_dto.dart';

class InscripcionesLocalService {
  const InscripcionesLocalService();

  List<UsuarioInscripcionDto> leerUsuarios() => const [
    UsuarioInscripcionDto(
      codigo: 1,
      nombrePila: 'Ana',
      apellidos: 'García Pérez',
      email: 'ana@centro.es',
      telefono: '600 000 001',
      poblacion: 'Xàtiva',
    ),
    UsuarioInscripcionDto(
      codigo: 2,
      nombrePila: 'Pau',
      apellidos: 'Soler Vidal',
      email: 'pau@centro.es',
      telefono: '600 000 002',
      poblacion: 'Alzira',
    ),
  ];

  List<TallerDto> leerTalleres() => const [
    TallerDto(codigo: 10, etiqueta: 'Fotografía'),
    TallerDto(codigo: 20, etiqueta: 'Cerámica'),
    TallerDto(codigo: 30, etiqueta: 'Huerto urbano'),
  ];
}
```

## 4. Implementació i transformació

La implementació llig el servici una vegada en construir-se, transforma les dos col·leccions i les conserva com a llistes no modificables. `map` convertix cada DTO; `List.unmodifiable` impedix que un consumidor afija o elimine opcions. Els objectes també tenen propietats `final`.

Per a esta demostració, la cerca exigix que nom i correu coincidisquen amb la mateixa persona. Eliminem espais exteriors i ignorem majúscules; no eliminem accents. No és un sistema d’autenticació: no hi ha contrasenyes ni comprovació d’identitat.


`lib/data/repositories/inscripciones_local_repository.dart`

```dart
import '../../domain/models/usuario_inscripcion.dart';
import '../../domain/models/taller.dart';
import '../../domain/repositories/inscripciones_repository.dart';
import '../services/inscripciones_local_service.dart';

class InscripcionesLocalRepository implements InscripcionesRepository {
  InscripcionesLocalRepository(InscripcionesLocalService servicio)
    : _usuarios = List.unmodifiable(
        servicio.leerUsuarios().map(
          (dto) => UsuarioInscripcion(
            id: dto.codigo.toString(),
            nombre: dto.nombrePila,
            apellidos: dto.apellidos,
            correo: dto.email,
            telefono: dto.telefono,
            localidad: dto.poblacion,
          ),
        ),
      ),
      _talleres = List.unmodifiable(
        servicio.leerTalleres().map(
          (dto) => Taller(id: dto.codigo.toString(), titulo: dto.etiqueta),
        ),
      );

  final List<UsuarioInscripcion> _usuarios;
  final List<Taller> _talleres;

  @override
  List<Taller> obtenerTalleres() => _talleres;

  @override
  UsuarioInscripcion? buscarUsuario(String nombre, String correo) {
    final nombreBuscado = nombre.trim().toLowerCase();
    final correoBuscado = correo.trim().toLowerCase();
    for (final usuario in _usuarios) {
      if (usuario.nombre.toLowerCase() == nombreBuscado &&
          usuario.correo.toLowerCase() == correoBuscado) {
        return usuario;
      }
    }
    return null;
  }
}
```


Continua amb [el ViewModel](../recoger-los-datos/).
