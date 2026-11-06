---
title: "1. Preparar data y domain"
sidebar:
  order: 2
---

Antes de dibujar el formulario, preparamos los datos que consultará Login. Crea estos ocho archivos completos. El servicio conoce la fuente, el repositorio la transforma y `domain` define lo que consume la aplicación. No añadimos datos ficticios dentro de los widgets.

La consulta es inmediata y síncrona porque trabaja en memoria. Los talleres del desplegable y la ficha del usuario procederán de esta misma capa de datos. Primero consulta los modelos de dominio; después el contrato y su implementación.

## 1. Modelos que utiliza la aplicación

`UsuarioInscripcion` contiene la ficha completa. `Taller` representa una opción del desplegable. `DatosAcceso` reúne el usuario encontrado, el taller y la opción marcada para pasarlos a la pantalla de detalle. Representa el resultado del acceso de demostración; no guarda una inscripción. Estos modelos no importan Flutter.


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

## 2. Contrato del repositorio

El contrato describe las consultas disponibles sin exponer cómo se obtienen los datos. `buscarUsuario` devuelve `null` si no hay coincidencia; un correo con formato correcto no garantiza que exista en la fuente.


`lib/domain/repositories/inscripciones_repository.dart`

```dart
import '../models/usuario_inscripcion.dart';
import '../models/taller.dart';

abstract class InscripcionesRepository {
  List<Taller> obtenerTalleres();
  UsuarioInscripcion? buscarUsuario(String nombre, String correo);
}
```

## 3. Modelos de la fuente y servicio local

Los DTO describen el formato del proveedor ficticio: códigos numéricos, `email`, `poblacion` y `etiqueta`. El dominio utiliza identificadores de texto, `correo`, `localidad` y `titulo`. La conversión queda en el repositorio, de modo que un cambio del proveedor no obliga a modificar los widgets. Cada DTO vive en su propio archivo, igual que los modelos de dominio.


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

El servicio es el único lugar donde escribimos las fichas y las opciones de muestra. Los datos son ficticios y no se envía ningún mensaje.


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

## 4. Implementación y transformación

La implementación lee el servicio una vez al construirse, transforma las dos colecciones y las conserva como listas no modificables. `map` convierte cada DTO; `List.unmodifiable` impide que un consumidor añada o elimine opciones. Los objetos también tienen propiedades `final`.

Para esta demostración, la búsqueda exige que nombre y correo coincidan con la misma persona. Quitamos espacios exteriores e ignoramos mayúsculas; no eliminamos acentos. No es un sistema de autenticación: no hay contraseñas ni comprobación de identidad.


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


Continúa con [el ViewModel](../recoger-los-datos/).
