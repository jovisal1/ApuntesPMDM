---
title: "Capa de dades"
description: "DTO, servici local, repositoris i consultes per a les pantalles."
sidebar:
  order: 3
---

Abans de començar, repassa [Exemple amb dades](../../../widgets/ejemplo-con-datos/), especialment [Models relacionats](../../../widgets/ejemplo-con-datos/modelos/) i [Servici local i repositori](../../../widgets/ejemplo-con-datos/datos-locales/). Utilitzarem la mateixa separació de responsabilitats, adaptada a les reserves d’espais.

## De l’origen simulat a les pantalles

La capa de dades viu en `lib/data/`. El servici coneix el format de l’origen i entrega DTO. Els repositoris convertixen eixos DTO, comproven la coherència i oferixen models de domini. La pantalla principal demana espais; Les meues reserves demana les reserves de l’usuari. Cap d’elles hauria de recórrer DTO ni interpretar codis com `CONF`.

Les consultes seran síncrones: les dades ja estan en memòria. No calen `Future`, peticions de xarxa, JSON, paquets ni persistència. Els exemples següents mostren contractes i peces de referència; **has de completar els models i la integració, i pots partir de les dades fictícies proporcionades**. No constituïxen la solució completa del projecte.

## Els DTO descriuen el contracte de la font

Els DTO viuen en `lib/data/models/`, usen camps `final` i constructors amb paràmetres amb nom i no hereten dels models de domini. En este projecte la font identifica l’espai i l’usuari d’una reserva mitjançant cadenes; també entrega dates en text i un codi d’estat. El domini utilitza objectes relacionats, `DateTime` i un enum. La conversió té, per tant, una finalitat concreta.

### ContactoLocalDto i UsuarioDto

`ContactoLocalDto`, en `contacto_local_dto.dart`, conté `String id`, `String nombre`, `String telefono` i `String correo`: les dades de contacte que entrega la font. El repositori construïx un `ContactoLocal` a partir d’elles. `UsuarioDto`, en `usuario_dto.dart`, conté `String id`, `String nombre` i `String correo`; representa l’usuari fictici de la font i es transforma en `Usuario`. Cap d’ells guarda contrasenyes.

### EspacioDto

`EspacioDto`, en `espacio_dto.dart`, conserva tots els camps escalars i llistes d’`Espacio`: `id`, `nombre`, `descripcion`, `ubicacion`, `horario`, `condicionesUso`, `imagenAsset` i `moneda` són `String`; `aforo` i `precioHoraCentimos` són `int`; `actividades` i `equipamiento` són `List<String>`. La diferència és que `contacto` és un `ContactoLocalDto`. El servici descriu la font; encara no crea objectes de domini.

### ReservaDto

`ReservaDto`, en `reserva_dto.dart`, ha de conservar les dades d’entrada següents. Para atenció a les diferències amb `Reserva`:

| Camps mínims | Tipus | Què rep el repositori |
| --- | --- | --- |
| `id`, `espacioId`, `usuarioId` | `String` | La identitat de la reserva i les referències que ha de resoldre. |
| `actividad` | `String` | L’ús sol·licitat. |
| `inicioIso`, `finIso` | `String` | Dates com `2026-11-12T10:00:00`, sense zona horària per a esta simulació local. |
| `asistentes` | `int` | Nombre de persones previstes. |
| `codigoEstado` | `String` | `CONF`, `PEND` o `CANC`, que es convertirà en enum. |
| `tarifaHoraCentimos`, `precioTotalCentimos` | `int` | Els imports d’eixa reserva, ja expressats en cèntims. |
| `serviciosContratados` | `List<ServicioContratadoDto>` | Còpies dels servicis seleccionats; pot estar buida. |
| `moneda` | `String` | `EUR` en els exemples. |

Després d’implementar-ne el constructor, un **fragment de dades fictícies** podria ser el següent. Requerix que `e1` i `u1` existisquen en les col·leccions d’espais i usuaris:

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

El codi manté identificadors i cadenes d’exemple compartits entre idiomes. `Reunion` ha d’aparéixer també en les activitats admeses per `e1`. El servici entrega `CONF` i els identificadors; és el repositori qui interpretarà el significat per a l’aplicació.

## Un servici local per a llegir les dades

Proposem `DatosSimuladosService`, en `lib/data/services/datos_simulados_service.dart`. Rep les col·leccions d’exemple i oferix mètodes de lectura. Així pots substituir un conjunt de dades per un altre en comprovar casos com una llista de reserves buida. El servici no filtra per pantalla, no navega ni crea widgets. Este **fitxer complet de referència** funciona quan hages implementat els DTO importats:

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

El constructor rep dependències mitjançant paràmetres, sense paquets. `List.unmodifiable` pren una col·lecció a la qual no es poden afegir o eliminar elements ni reordenar-los des de fora; els DTO també han de protegir les llistes internes si les exposen. El prefix `_` fa privats els camps de la biblioteca. Les crides successives lligen les mateixes dades; no generen reserves noves.

Disposes d’un [conjunt de dades fictícies preparat per a copiar](../datos-ficticios/) en `lib/data/services/datos_demo.dart`, amb sis espais, tres contactes, tres usuaris, quatre reserves, extres, opinions i disponibilitat de set dies. En eixa pàgina trobaràs el fitxer complet i la connexió amb este servici. Pots ampliar-lo mantenint identificadors únics i referències vàlides.

## Repositoris per a consultar el domini

Com a base, proposem tres classes dins de `lib/data/repositories/`: `EspaciosRepository`, `UsuariosRepository` i `ReservasRepository`. Cada una convertix i conserva la col·lecció que necessita, llegint-la una vegada en construir-se. `ReservasRepository` rep també els repositoris d’espais i usuaris per a resoldre les relacions.

Estos són **contractes que has d’implementar**, no classes ja proporcionades. Pots ampliar la proposta, mantenint separades les responsabilitats:

| Classe i mètode | Retorn | Ús en les pantalles |
| --- | --- | --- |
| `EspaciosRepository.obtenerTodos()` | `List<Espacio>` | Carregar el catàleg de la principal. |
| `EspaciosRepository.obtenerPorId(String id)` | `Espacio?` | Resoldre l’espai d’una reserva o una selecció. |
| `UsuariosRepository.obtenerPorId(String id)` | `Usuario?` | Resoldre l’usuari referenciat en una reserva. |
| `UsuariosRepository.obtenerUsuarioDemo()` | `Usuario` | Obtindre `u1` per a login, accés social i perfil; falla si no existix. |
| `ReservasRepository.obtenerPorUsuario(String usuarioId)` | `List<Reserva>` | Mostrar únicament les reserves de l’usuari de la demostració. |
| `ReservasRepository.obtenerPorId(String id)` | `Reserva?` | Consultar una reserva per la seua identitat, si afiges un detall. |

El sufix `?` indica que una cerca pot no trobar l’objecte. Una llista sense resultats es representa amb `[]`, no amb `null`. L’absència d’`u1` o una referència invàlida en una reserva és un error de les nostres dades fictícies: no l’ocultes inventant un espai o un usuari de substitució.

### Una consulta d’espais

Després de crear i convertir la col·lecció privada `_espacios`, estos **fragments dins d’`EspaciosRepository`** mostren com oferir-la i localitzar un element. Utilitzen camps i models que has d’implementar:

```dart
List<Espacio> obtenerTodos() => _espacios;

Espacio? obtenerPorId(String id) {
  for (final espacio in _espacios) {
    if (espacio.id == id) return espacio;
  }
  return null;
}
```

Conserva `_espacios` com una llista de només lectura. `obtenerPorId` retorna el mateix model que usa el catàleg. Per a obrir el detall des d’una targeta també pots passar eixe `Espacio` directament al constructor de la pantalla; no cal tornar a consultar el servici.

### Convertir el contacte juntament amb l’espai

El **fragment següent dins del repositori** mostra una conversió completa d’un contacte. Importa `ContactoLocalDto` des de `../models/contacto_local_dto.dart` i `ContactoLocal` des de `../../domain/models/contacto_local.dart`:

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

En construir cada `Espacio`, copia els camps compatibles i utilitza `contacto: _convertirContacto(dto.contacto)`. Les llistes del domini es poden copiar amb `List.unmodifiable(dto.actividades)` i `List.unmodifiable(dto.equipamiento)`. Comprova aforament positiu, tarifa no negativa i moneda `EUR`. `static` indica que la conversió no necessita accedir a l’estat d’una instància.

### Resoldre una reserva

En el constructor de `ReservasRepository`, llig `service.leerReservas()` i convertix-ne els resultats. El repositori rep `EspaciosRepository espacios` i `UsuariosRepository usuarios`; el **fragment següent pertany al mètode de conversió** i pressuposa un paràmetre `ReservaDto dto`:

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

`DateTime.parse` transforma la data de text en un objecte; si el text no es pot interpretar, llança `FormatException`. L’expressió `switch` traduïx els tres codis admesos. `_` cobrix la resta i evita acceptar un estat desconegut. Superada la comprovació de `null`, Dart permet utilitzar `espacio` i `usuario` com a objectes existents.

Completa el mètode construint `Reserva` amb eixos objectes i amb els imports del DTO. Abans d’acceptar la reserva, comprova l’interval, la duració en hores completes, els assistents, l’activitat, els imports i la moneda segons la [capa de domini](../dominio/). Rebutja identificadors duplicats en carregar cada col·lecció i conserva les reserves convertides en una llista de només lectura. Són comprovacions de la font fictícia, no formularis ni consulta real de disponibilitat.

Una vegada preparada `_reservas`, este **fragment dins de `ReservasRepository`** obté la llista que necessita Les meues reserves:

```dart
List<Reserva> obtenerPorUsuario(String usuarioId) {
  return List<Reserva>.unmodifiable(
    _reservas.where((reserva) => reserva.usuario.id == usuarioId),
  );
}
```

`where` selecciona les reserves que complixen la condició i `List.unmodifiable` prepara el resultat com una llista de només lectura. Un usuari sense reserves obté una llista buida. El mètode no canvia l’estat de les reserves ni afig la sol·licitud que s’acaba de confirmar de manera simulada.

## DTO de servicis, opinions i disponibilitat

Afig a `EspacioDto` els camps `List<String> imagenesAssets`, `String? sitioWeb` i `List<ServicioExtraDto> serviciosDisponibles`, a més de la portada `imagenAsset`. `ServicioExtraDto`, en `servicio_extra_dto.dart`, conté `String id`, `String nombre`, `String descripcion` i `int precioCentimos`.

Afig a `ReservaDto` `List<ServicioContratadoDto> serviciosContratados`. `ServicioContratadoDto`, en `servicio_contratado_dto.dart`, conté `String servicioId`, `String nombre` i `int precioCentimos`: conserva la còpia de l’extra aplicat. En la conversió, comprova que els servicis no es repetixen, pertanyen a l’espai i tenen imports no negatius. El total inclou el lloguer i els extres; per a estos exemples la còpia coincidix amb l’oferta actual, però una reserva històrica conserva el seu propi preu.

`ComentarioDto`, en `comentario_dto.dart`, conté `String id`, `String espacioId`, `String autorId`, `int puntuacion`, `String texto` i `String fechaIso`. Resol `autorId` amb `UsuariosRepository`, comprova l’espai, convertix la data i rebutja puntuacions fora d’1–5 o textos buits després de `trim()`.

`DisponibilidadDiaDto`, en `disponibilidad_dia_dto.dart`, conté `String espacioId`, `String fechaIso` i `List<FranjaDisponibilidadDto> franjas`. `FranjaDisponibilidadDto`, en `franja_disponibilidad_dto.dart`, conté `String inicioIso`, `String finIso` i `bool disponible`. Convertix les dates al domini i comprova els intervals. Un parell espai–dia ha de ser únic; no hi ha un únic dia compartit per tots els espais.

| Repositori i mètode proposat | Retorn | Ús |
| --- | --- | --- |
| `ComentariosRepository.obtenerPorEspacio(String espacioId)` | `List<Comentario>` | Opinions del detall, ordenades de més recent a més antiga. |
| `ComentariosRepository.obtenerMedia(String espacioId)` | `double?` | Mitjana; `null` si no hi ha opinions. |
| `DisponibilidadRepository.obtenerSieteDias(String espacioId, DateTime desde)` | `List<DisponibilidadDia>` | Hui i sis dies més, ordenats per data. |

Guarda les classes en `comentarios_repository.dart` i `disponibilidad_repository.dart`. La primera rep el servici i `UsuariosRepository`; la segona rep el servici. Totes dos reben també `EspaciosRepository` per a comprovar les referències. Llig i convertix una vegada en el constructor, com en els altres repositoris. No inventes dies lliures si falten dades: detecta una setmana incompleta i corregix la font d’exemple.

Un **fragment de càlcul dins de `ComentariosRepository`**, després d’implementar `obtenerPorEspacio`, podria ser:

```dart
double? obtenerMedia(String espacioId) {
  final comentarios = obtenerPorEspacio(espacioId);
  if (comentarios.isEmpty) return null;
  final suma = comentarios.fold<int>(0, (total, c) => total + c.puntuacion);
  return suma / comentarios.length;
}
```

## Connectar les classes amb les pantalles

Crea el servici i els repositoris una vegada en l’arrancada de l’aplicació i passa’ls per constructor a qui els necessite. Este **fragment de composició** pressuposa les col·leccions DTO i els constructors proposats; completa’ls abans d’utilitzar-lo:

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

No construïsques un servici nou dins de cada `build`. La principal consulta `espacios.obtenerTodos()`. Login i Perfil reben el resultat d’`usuarios.obtenerUsuarioDemo()`. Les meues reserves consulta `reservas.obtenerPorUsuario(usuario.id)`. Detall i Nova reserva reben l’`Espacio` seleccionat; per a mostrar contacte i tarifa no necessiten dades duplicades ni una altra lectura de DTO.

## Comprovacions de la teua implementació

- Obri dos espais diferents i verifica que detall i sol·licitud mostren les seues dades i contactes.
- Busca un identificador inexistent: el mètode de cerca ha de retornar `null`.
- Consulta reserves d’un usuari sense registres: retorna una llista buida.
- Prova temporalment un DTO amb un espai inexistent, un codi desconegut o un preu incoherent: la càrrega ha de detectar l’error. Corregix després les dades.
- Comprova que confirmar una sol·licitud de prova no canvia les reserves precarregades.
- Explica on es convertix cada camp del DTO i quin mètode utilitza cada pantalla.
