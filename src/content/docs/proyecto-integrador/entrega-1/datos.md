---
title: "Capa de datos"
description: "DTO, servicio local, repositorios y consultas para las pantallas."
sidebar:
  order: 3
---

Antes de comenzar, repasa [Ejemplo con datos](../../../widgets/ejemplo-con-datos/), especialmente [Modelos relacionados](../../../widgets/ejemplo-con-datos/modelos/) y [Servicio local y repositorio](../../../widgets/ejemplo-con-datos/datos-locales/). Utilizaremos la misma separación de responsabilidades, adaptada a las reservas de espacios.

## Del origen simulado a las pantallas

La capa de datos vive en `lib/data/`. El servicio conoce el formato del origen y entrega DTO. Los repositorios convierten esos DTO, comprueban su coherencia y ofrecen modelos de dominio. La pantalla principal pide espacios; Mis reservas pide las reservas del usuario. Ninguna de ellas debería recorrer DTO ni interpretar códigos como `CONF`.

Las consultas serán síncronas: los datos están ya en memoria. No se necesitan `Future`, peticiones de red, JSON, paquetes ni persistencia. Los ejemplos siguientes muestran contratos y piezas de referencia; **debes completar los modelos y la integración, y puedes partir de los datos ficticios proporcionados**. No constituyen la solución completa del proyecto.

## Los DTO describen el contrato de la fuente

Los DTO viven en `lib/data/models/`, usan campos `final` y constructores con parámetros nombrados y no heredan de los modelos de dominio. En este proyecto la fuente identifica el espacio y el usuario de una reserva mediante cadenas; también entrega fechas en texto y un código de estado. El dominio utiliza objetos relacionados, `DateTime` y un enum. La conversión tiene, por tanto, una finalidad concreta.

### ContactoLocalDto y UsuarioDto

`ContactoLocalDto`, en `contacto_local_dto.dart`, contiene `String id`, `String nombre`, `String telefono` y `String correo`: los datos de contacto que entrega la fuente. El repositorio construye un `ContactoLocal` a partir de ellos. `UsuarioDto`, en `usuario_dto.dart`, contiene `String id`, `String nombre` y `String correo`; representa al usuario ficticio de la fuente y se transforma en `Usuario`. Ninguno guarda contraseñas.

### EspacioDto

`EspacioDto`, en `espacio_dto.dart`, conserva todos los campos escalares y listas de `Espacio`: `id`, `nombre`, `descripcion`, `ubicacion`, `horario`, `condicionesUso`, `imagenAsset` y `moneda` son `String`; `aforo` y `precioHoraCentimos` son `int`; `actividades` y `equipamiento` son `List<String>`. La diferencia es que `contacto` es un `ContactoLocalDto`. El servicio describe la fuente; todavía no crea objetos de dominio.

### ReservaDto

`ReservaDto`, en `reserva_dto.dart`, debe conservar los siguientes datos de entrada. Presta atención a las diferencias con `Reserva`:

| Campos mínimos | Tipo | Qué recibe el repositorio |
| --- | --- | --- |
| `id`, `espacioId`, `usuarioId` | `String` | La identidad de la reserva y las referencias que debe resolver. |
| `actividad` | `String` | El uso solicitado. |
| `inicioIso`, `finIso` | `String` | Fechas como `2026-11-12T10:00:00`, sin zona horaria para esta simulación local. |
| `asistentes` | `int` | Número de personas previstas. |
| `codigoEstado` | `String` | `CONF`, `PEND` o `CANC`, que se convertirá en enum. |
| `tarifaHoraCentimos`, `precioTotalCentimos` | `int` | Los importes de esa reserva, ya expresados en céntimos. |
| `serviciosContratados` | `List<ServicioContratadoDto>` | Copias de los servicios seleccionados; puede estar vacía. |
| `moneda` | `String` | `EUR` en los ejemplos. |

Después de implementar su constructor, un **fragmento de datos ficticios** podría ser el siguiente. Requiere que `e1` y `u1` existan en las colecciones de espacios y usuarios:

```dart
const reservaDemo = ReservaDto(
  id: 'r1',
  espacioId: 'e1',
  usuarioId: 'u1',
  actividad: 'Reunion',
  inicioIso: '2026-11-12T10:00:00',
  finIso: '2026-11-12T12:00:00',
  asistentes: 12,
  codigoEstado: 'CONF',
  tarifaHoraCentimos: 3000,
  precioTotalCentimos: 7500,
  moneda: 'EUR',
  serviciosContratados: [
    ServicioContratadoDto(
      servicioId: 'e1_limpieza',
      nombre: 'Limpieza final',
      precioCentimos: 1500,
    ),
  ],
);
```

El código mantiene identificadores y cadenas de ejemplo compartidos entre idiomas. `Reunion` debe aparecer también en las actividades admitidas por `e1`. El servicio entrega `CONF` y los identificadores; es el repositorio quien interpretará su significado para la aplicación.

## Un servicio local para leer los datos

Proponemos `DatosSimuladosService`, en `lib/data/services/datos_simulados_service.dart`. Recibe las colecciones de ejemplo y ofrece métodos de lectura. Así puedes sustituir un conjunto de datos por otro al comprobar casos como una lista de reservas vacía. El servicio no filtra por pantalla, no navega ni crea widgets. Este **archivo completo de referencia** funciona cuando hayas implementado los DTO importados:

```dart
import '../models/comentario_dto.dart';
import '../models/disponibilidad_dia_dto.dart';
import '../models/espacio_dto.dart';
import '../models/reserva_dto.dart';
import '../models/usuario_dto.dart';

class DatosSimuladosService {
  DatosSimuladosService({
    required List<EspacioDto> espacios,
    required List<ReservaDto> reservas,
    required List<UsuarioDto> usuarios,
    required List<ComentarioDto> comentarios,
    required List<DisponibilidadDiaDto> disponibilidad,
  }) : _espacios = List.unmodifiable(espacios),
       _reservas = List.unmodifiable(reservas),
       _usuarios = List.unmodifiable(usuarios),
       _comentarios = List.unmodifiable(comentarios),
       _disponibilidad = List.unmodifiable(disponibilidad);

  final List<EspacioDto> _espacios;
  final List<ReservaDto> _reservas;
  final List<UsuarioDto> _usuarios;
  final List<ComentarioDto> _comentarios;
  final List<DisponibilidadDiaDto> _disponibilidad;

  List<EspacioDto> leerEspacios() => _espacios;
  List<ReservaDto> leerReservas() => _reservas;
  List<UsuarioDto> leerUsuarios() => _usuarios;
  List<ComentarioDto> leerComentarios() => _comentarios;
  List<DisponibilidadDiaDto> leerDisponibilidad() => _disponibilidad;
}
```

El constructor recibe dependencias mediante parámetros, sin paquetes. `List.unmodifiable` toma una colección que no se puede añadir, borrar o reordenar desde fuera; los DTO también deben proteger sus listas anidadas si las exponen. El prefijo `_` hace privados los campos de la biblioteca. Las llamadas sucesivas leen los mismos datos; no generan nuevas reservas.

Dispones de un [conjunto de datos ficticios listo para copiar](../datos-ficticios/) en `lib/data/services/datos_demo.dart`, con seis espacios, tres contactos, tres usuarios, cuatro reservas, extras, opiniones y disponibilidad de siete días. En esa página encontrarás el archivo completo y la conexión con este servicio. Puedes ampliarlo manteniendo identificadores únicos y referencias válidas.

## Repositorios para consultar el dominio

Como base, proponemos tres clases dentro de `lib/data/repositories/`: `EspaciosRepository`, `UsuariosRepository` y `ReservasRepository`. Cada una convierte y conserva la colección que necesita, leyéndola una vez al construirse. `ReservasRepository` recibe además los repositorios de espacios y usuarios para resolver sus relaciones.

Estos son **contratos que debes implementar**, no clases ya proporcionadas. Puedes ampliar la propuesta, manteniendo las responsabilidades separadas:

| Clase y método | Retorno | Uso en las pantallas |
| --- | --- | --- |
| `EspaciosRepository.obtenerTodos()` | `List<Espacio>` | Cargar el catálogo de la principal. |
| `EspaciosRepository.obtenerPorId(String id)` | `Espacio?` | Resolver el espacio de una reserva o una selección. |
| `UsuariosRepository.obtenerPorId(String id)` | `Usuario?` | Resolver el usuario referenciado en una reserva. |
| `UsuariosRepository.obtenerUsuarioDemo()` | `Usuario` | Obtener `u1` para login, acceso social y perfil; falla si no existe. |
| `ReservasRepository.obtenerPorUsuario(String usuarioId)` | `List<Reserva>` | Mostrar únicamente las reservas del usuario de la demostración. |
| `ReservasRepository.obtenerPorId(String id)` | `Reserva?` | Consultar una reserva por su identidad, si añades un detalle. |

El sufijo `?` indica que una búsqueda puede no encontrar el objeto. Una lista sin resultados se representa con `[]`, no con `null`. La ausencia de `u1` o una referencia inválida en una reserva es un error de nuestros datos ficticios: no lo ocultes inventando un espacio o un usuario de reemplazo.

### Una consulta de espacios

Tras crear y convertir la colección privada `_espacios`, estos **fragmentos dentro de `EspaciosRepository`** muestran cómo ofrecerla y localizar un elemento. Utilizan campos y modelos que debes implementar:

```dart
List<Espacio> obtenerTodos() => _espacios;

Espacio? obtenerPorId(String id) {
  for (final espacio in _espacios) {
    if (espacio.id == id) return espacio;
  }
  return null;
}
```

Conserva `_espacios` como una lista de solo lectura. `obtenerPorId` devuelve el mismo modelo que usa el catálogo. Para abrir el detalle desde una tarjeta también puedes pasar ese `Espacio` directamente al constructor de la pantalla; no es necesario volver a consultar el servicio.

### Convertir el contacto junto con el espacio

El siguiente **fragmento dentro del repositorio** muestra una conversión completa de un contacto. Importa `ContactoLocalDto` desde `../models/contacto_local_dto.dart` y `ContactoLocal` desde `../../domain/models/contacto_local.dart`:

```dart
static ContactoLocal _convertirContacto(ContactoLocalDto dto) {
  return ContactoLocal(
    id: dto.id,
    nombre: dto.nombre,
    telefono: dto.telefono,
    correo: dto.correo,
  );
}
```

Al construir cada `Espacio`, copia los campos compatibles y utiliza `contacto: _convertirContacto(dto.contacto)`. Las listas del dominio pueden copiarse con `List.unmodifiable(dto.actividades)` y `List.unmodifiable(dto.equipamiento)`. Comprueba aforo positivo, tarifa no negativa y moneda `EUR`. `static` indica que la conversión no necesita acceder al estado de una instancia.

### Resolver una reserva

En el constructor de `ReservasRepository`, lee `service.leerReservas()` y convierte sus resultados. El repositorio recibe `EspaciosRepository espacios` y `UsuariosRepository usuarios`; el siguiente **fragmento pertenece al método de conversión** y presupone un parámetro `ReservaDto dto`:

```dart
final espacio = espacios.obtenerPorId(dto.espacioId);
final usuario = usuarios.obtenerPorId(dto.usuarioId);
if (espacio == null || usuario == null) {
  throw StateError('Referencia de reserva inexistente');
}
final inicio = DateTime.parse(dto.inicioIso);
final fin = DateTime.parse(dto.finIso);
final estado = switch (dto.codigoEstado) {
  'CONF' => EstadoReserva.confirmada,
  'PEND' => EstadoReserva.pendiente,
  'CANC' => EstadoReserva.cancelada,
  _ => throw FormatException('Estado de reserva desconocido'),
};
```

`DateTime.parse` transforma la fecha de texto en un objeto; si el texto no se puede interpretar, lanza `FormatException`. La expresión `switch` traduce los tres códigos admitidos. `_` cubre los demás y evita aceptar un estado desconocido. Superada la comprobación de `null`, Dart permite utilizar `espacio` y `usuario` como objetos existentes.

Completa el método construyendo `Reserva` con esos objetos y con los importes del DTO. Antes de aceptar la reserva, comprueba el intervalo, la duración en horas completas, los asistentes, la actividad, los importes y la moneda según la [capa de dominio](../dominio/). Rechaza identificadores duplicados al cargar cada colección y conserva las reservas convertidas en una lista de solo lectura. Son comprobaciones de la fuente ficticia, no formularios ni consulta real de disponibilidad.

Una vez preparada `_reservas`, este **fragmento dentro de `ReservasRepository`** obtiene la lista que necesita Mis reservas:

```dart
List<Reserva> obtenerPorUsuario(String usuarioId) {
  return List<Reserva>.unmodifiable(
    _reservas.where((reserva) => reserva.usuario.id == usuarioId),
  );
}
```

`where` selecciona las reservas que cumplen la condición y `List.unmodifiable` prepara el resultado como lista de solo lectura. Un usuario sin reservas obtiene una lista vacía. El método no cambia el estado de las reservas ni añade la solicitud que se acaba de confirmar de forma simulada.

## DTO de servicios, opiniones y disponibilidad

Añade a `EspacioDto` los campos `List<String> imagenesAssets`, `String? sitioWeb` y `List<ServicioExtraDto> serviciosDisponibles`, además de la portada `imagenAsset`. `ServicioExtraDto`, en `servicio_extra_dto.dart`, contiene `String id`, `String nombre`, `String descripcion` e `int precioCentimos`.

Añade a `ReservaDto` `List<ServicioContratadoDto> serviciosContratados`. `ServicioContratadoDto`, en `servicio_contratado_dto.dart`, contiene `String servicioId`, `String nombre` e `int precioCentimos`: conserva la copia del extra aplicado. En la conversión, comprueba que los servicios no se repiten, pertenecen al espacio y tienen importes no negativos. El total incluye el alquiler y los extras; para estos ejemplos la copia coincide con la oferta actual, pero una reserva histórica conserva su propio precio.

`ComentarioDto`, en `comentario_dto.dart`, contiene `String id`, `String espacioId`, `String autorId`, `int puntuacion`, `String texto` y `String fechaIso`. Resuelve `autorId` con `UsuariosRepository`, comprueba el espacio, convierte la fecha y rechaza puntuaciones fuera de 1–5 o textos vacíos después de `trim()`.

`DisponibilidadDiaDto`, en `disponibilidad_dia_dto.dart`, contiene `String espacioId`, `String fechaIso` y `List<FranjaDisponibilidadDto> franjas`. `FranjaDisponibilidadDto`, en `franja_disponibilidad_dto.dart`, contiene `String inicioIso`, `String finIso` y `bool disponible`. Convierte las fechas al dominio y comprueba los intervalos. Un par espacio–día debe ser único; no hay un único día compartido por todos los espacios.

| Repositorio y método propuesto | Retorno | Uso |
| --- | --- | --- |
| `ComentariosRepository.obtenerPorEspacio(String espacioId)` | `List<Comentario>` | Opiniones del detalle, ordenadas de más reciente a más antigua. |
| `ComentariosRepository.obtenerMedia(String espacioId)` | `double?` | Media; `null` si no hay opiniones. |
| `DisponibilidadRepository.obtenerSieteDias(String espacioId, DateTime desde)` | `List<DisponibilidadDia>` | Hoy y seis días más, ordenados por fecha. |

Guarda las clases en `comentarios_repository.dart` y `disponibilidad_repository.dart`. La primera recibe el servicio y `UsuariosRepository`; la segunda recibe el servicio. Ambas reciben también `EspaciosRepository` para comprobar las referencias. Lee y convierte una vez en el constructor, como en los otros repositorios. No inventes días libres si faltan datos: detecta una semana incompleta y corrige la fuente de ejemplo.

Un **fragmento de cálculo dentro de `ComentariosRepository`**, después de implementar `obtenerPorEspacio`, podría ser:

```dart
double? obtenerMedia(String espacioId) {
  final comentarios = obtenerPorEspacio(espacioId);
  if (comentarios.isEmpty) return null;
  final suma = comentarios.fold<int>(0, (total, c) => total + c.puntuacion);
  return suma / comentarios.length;
}
```

## Conectar las clases con las pantallas

Crea el servicio y los repositorios una vez en el arranque de la aplicación y pásalos por constructor a quien los necesite. Este **fragmento de composición** presupone las colecciones DTO y los constructores propuestos; complétalos antes de utilizarlo:

```dart
final service = DatosSimuladosService(
  espacios: espaciosDemo,
  reservas: reservasDemo,
  usuarios: usuariosDemo,
  comentarios: comentariosDemo,
  disponibilidad: disponibilidadDemo,
);
final espacios = EspaciosRepository(service: service);
final usuarios = UsuariosRepository(service: service);
final reservas = ReservasRepository(
  service: service,
  espacios: espacios,
  usuarios: usuarios,
);
final comentarios = ComentariosRepository(
  service: service,
  usuarios: usuarios,
  espacios: espacios,
);
final disponibilidad = DisponibilidadRepository(
  service: service,
  espacios: espacios,
);
```

No construyas un servicio nuevo dentro de cada `build`. La principal consulta `espacios.obtenerTodos()`. Login y Perfil reciben el resultado de `usuarios.obtenerUsuarioDemo()`. Mis reservas consulta `reservas.obtenerPorUsuario(usuario.id)`. Detalle y Nueva reserva reciben el `Espacio` seleccionado; para mostrar contacto y tarifa no necesitan datos duplicados ni otra lectura de DTO.

## Comprobaciones de tu implementación

- Abre dos espacios distintos y verifica que detalle y solicitud muestran sus propios datos y contactos.
- Busca un identificador inexistente: el método de búsqueda debe devolver `null`.
- Consulta reservas de un usuario sin registros: devuelve una lista vacía.
- Prueba temporalmente un DTO con un espacio inexistente, un código desconocido o un precio incoherente: la carga debe detectar el error. Corrige después los datos.
- Comprueba que confirmar una solicitud de prueba no cambia las reservas precargadas.
- Explica dónde se convierte cada campo del DTO y qué método utiliza cada pantalla.
