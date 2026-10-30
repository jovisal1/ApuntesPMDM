---
title: "Datos ficticios"
description: "Seis espacios, tres contactos, tres usuarios y cuatro reservas para el servicio local."
sidebar:
  order: 4
---

Este conjunto de referencia completa la fuente simulada de la [capa de datos](../datos/). Contiene **seis espacios, tres personas de contacto, tres usuarios, cuatro reservas, doce servicios adicionales, seis comentarios y disponibilidad para siete días**. Las relaciones, actividades, aforos, horarios y precios son coherentes. Puedes ampliarlo manteniendo sus contratos.

## Antes de copiar los datos

Implementa los DTO descritos en la capa de datos, con los mismos campos y constructores `const`. El archivo utiliza esos tipos; no sustituye su implementación ni la conversión en los repositorios. Los nombres y textos de esta fuente se comparten entre las dos versiones de los apuntes para utilizar el mismo código.

Copia el contenido en **`lib/data/services/datos_demo.dart`**. También puedes [descargar el archivo Dart](/ApuntesPMDM/proyecto-integrador/entrega-1/datos_demo.dart) y colocarlo en esa ruta. Sus imports son relativos a esa ubicación.

## Qué casos podrás mostrar

| Registro | Datos de ejemplo | Uso |
| --- | --- | --- |
| `e1`, Sala Ágora | 20 personas, 30,00 €/hora, contacto Ana Soler | Catálogo, detalle y reserva de reunión. |
| `e2`, Patio Llum | 40 personas, 45,00 €/hora, contacto Pau Vidal | Celebración exterior y segundo contacto. |
| `e3`, Aula Crea | 16 personas, 20,00 €/hora, contacto Ana Soler | Taller y contacto compartido con `e1`. |
| `e4`, Sala Mirador | 12 personas, 25,00 €/hora, contacto Nora Ferrer | Reserva de otro usuario. |
| `e5`, Salon Nexo | 60 personas, 60,00 €/hora, contacto Nora Ferrer | Espacio grande con tres actividades. |
| `e6`, Jardin Brisa | 30 personas, 35,00 €/hora, contacto Pau Vidal | Taller o celebración al aire libre. |

El usuario de demostración es **`u1`**. Tiene tres reservas: `r1` confirmada (75,00 € con limpieza), `r2` pendiente (195,00 € con decoración) y `r3` cancelada (40,00 €). `r4` pertenece a `u2` y cuesta 85,00 € con café; permite comprobar que `obtenerPorUsuario('u1')` no muestra reservas ajenas. `u3` no tiene reservas y permite probar el estado vacío con un usuario existente.

Los importes son tarifas finales con IVA incluido y se guardan en céntimos. Las fechas de las reservas y opiniones son fijas para obtener resultados reproducibles: no representan disponibilidad real ni deben clasificarse siempre como futuras. El estado cancelado conserva el importe original; no representa un cargo ni una devolución real.

## Galerías, servicios, opiniones y semana de ejemplo

Cada espacio contiene tres rutas en `imagenesAssets`, incluye la portada y ofrece dos servicios adicionales. Estos son importes por reserva, no por hora. `r3` no contrata extras; `r1`, `r2` y `r4` guardan una copia del servicio contratado y su precio.

Las webs usan `example.com` y son ficticias. `e3` y `e6` tienen `sitioWeb: null`. No es necesario abrirlas en un navegador ni buscar datos reales.

`e1` tiene dos opiniones, con puntuaciones 5 y 4: media 4,5. `e2`, `e3`, `e4` y `e5` tienen una opinión cada uno. `e6` no tiene comentarios y debe mostrar «Sin valoraciones». Cada autor existe en `usuariosDemo`.

`fechaReferenciaDemo` se captura una sola vez. `crearDisponibilidadDemo` genera 7 días para cada uno de los 6 espacios, con tres franjas por día, alternando disponibilidad mediante una regla determinista. Para probar una semana concreta, llama a la función con otra fecha. El calendario avanza por fechas locales, no sumando siempre 24 horas, y contempla cambios de mes y año. Es independiente de las reservas de fecha fija y no se modifica al confirmar una solicitud.

Las listas de imágenes contienen rutas propuestas: aporta también los archivos terminados en `_02.png` y `_03.png`, o adapta esas rutas a tus recursos. La fuente se puede leer aunque todavía utilices `Placeholder` en las vistas.

## Archivo de datos

Las constantes de contacto se reutilizan en varios espacios. Cada reserva referencia los identificadores de un espacio y un usuario existentes. Las listas `const` y la colección de disponibilidad de solo lectura no pueden modificarse; confirmar una solicitud simulada no añade elementos a `reservasDemo`.

```dart
import '../models/servicio_extra_dto.dart';
import '../models/servicio_contratado_dto.dart';
import '../models/comentario_dto.dart';
import '../models/disponibilidad_dia_dto.dart';
import '../models/franja_disponibilidad_dto.dart';
import '../models/contacto_local_dto.dart';
import '../models/espacio_dto.dart';
import '../models/reserva_dto.dart';
import '../models/usuario_dto.dart';

const contactoCentro = ContactoLocalDto(
  id: 'c1',
  nombre: 'Ana Soler',
  telefono: '600 000 101',
  correo: 'ana@example.com',
);

const contactoParque = ContactoLocalDto(
  id: 'c2',
  nombre: 'Pau Vidal',
  telefono: '600 000 102',
  correo: 'pau@example.com',
);

const contactoMirador = ContactoLocalDto(
  id: 'c3',
  nombre: 'Nora Ferrer',
  telefono: '600 000 103',
  correo: 'nora@example.com',
);

const e1_limpieza = ServicioExtraDto(
  id: 'e1_limpieza',
  nombre: 'Limpieza final',
  descripcion: 'Limpieza del espacio al terminar.',
  precioCentimos: 1500,
);

const e1_cafe = ServicioExtraDto(
  id: 'e1_cafe',
  nombre: 'Pausa cafe',
  descripcion: 'Bebidas calientes para el grupo.',
  precioCentimos: 1200,
);

const e2_decoracion = ServicioExtraDto(
  id: 'e2_decoracion',
  nombre: 'Decoracion',
  descripcion: 'Preparacion decorativa del patio.',
  precioCentimos: 6000,
);

const e2_limpieza = ServicioExtraDto(
  id: 'e2_limpieza',
  nombre: 'Limpieza final',
  descripcion: 'Recogida y limpieza posterior.',
  precioCentimos: 2500,
);

const e3_materiales = ServicioExtraDto(
  id: 'e3_materiales',
  nombre: 'Material de taller',
  descripcion: 'Material consumible para la actividad.',
  precioCentimos: 1000,
);

const e3_limpieza = ServicioExtraDto(
  id: 'e3_limpieza',
  nombre: 'Limpieza final',
  descripcion: 'Limpieza de mesas y utensilios.',
  precioCentimos: 1200,
);

const e4_cafe = ServicioExtraDto(
  id: 'e4_cafe',
  nombre: 'Pausa cafe',
  descripcion: 'Servicio de bebidas para la reunion.',
  precioCentimos: 1000,
);

const e4_grabacion = ServicioExtraDto(
  id: 'e4_grabacion',
  nombre: 'Grabacion',
  descripcion: 'Grabacion local de la sesion.',
  precioCentimos: 2000,
);

const e5_montaje = ServicioExtraDto(
  id: 'e5_montaje',
  nombre: 'Montaje especial',
  descripcion: 'Distribucion del mobiliario antes del acto.',
  precioCentimos: 8000,
);

const e5_limpieza = ServicioExtraDto(
  id: 'e5_limpieza',
  nombre: 'Limpieza final',
  descripcion: 'Limpieza al terminar la celebracion.',
  precioCentimos: 4500,
);

const e6_carpa = ServicioExtraDto(
  id: 'e6_carpa',
  nombre: 'Carpa',
  descripcion: 'Instalacion de una carpa de sombra.',
  precioCentimos: 4000,
);

const e6_limpieza = ServicioExtraDto(
  id: 'e6_limpieza',
  nombre: 'Limpieza final',
  descripcion: 'Recogida del jardin tras la actividad.',
  precioCentimos: 2000,
);

const usuariosDemo = <UsuarioDto>[
  UsuarioDto(id: 'u1', nombre: 'Alex Lopez', correo: 'alex@example.com'),
  UsuarioDto(id: 'u2', nombre: 'Cris Marin', correo: 'cris@example.com'),
  UsuarioDto(id: 'u3', nombre: 'Sam Roca', correo: 'sam@example.com'),
];

const espaciosDemo = <EspacioDto>[
  EspacioDto(
    id: 'e1',
    nombre: 'Sala Ágora',
    descripcion: 'Sala luminosa para reuniones de equipo y talleres de pequeño formato.',
    ubicacion: 'Centro · Calle del Encuentro, 12',
    horario: '09:00–20:00',
    condicionesUso: 'No fumar. Recoger el material al finalizar.',
    imagenAsset: 'assets/images/sala_agora.png',
    imagenesAssets: ['assets/images/sala_agora.png', 'assets/images/sala_agora_02.png', 'assets/images/sala_agora_03.png'],
    sitioWeb: 'https://example.com/espacios/e1',
    serviciosDisponibles: [e1_limpieza, e1_cafe],
    aforo: 20,
    precioHoraCentimos: 3000,
    actividades: ['Reunion', 'Taller'],
    equipamiento: ['Wi-Fi', 'Proyector', 'Acceso sin escalones'],
    contacto: contactoCentro,
    moneda: 'EUR',
  ),
  EspacioDto(
    id: 'e2',
    nombre: 'Patio Llum',
    descripcion: 'Patio exterior con zona cubierta para celebraciones y actividades en grupo.',
    ubicacion: 'Barrio del Parque · Plaza de la Luz, 4',
    horario: '10:00–22:00',
    condicionesUso: 'Respetar el horario y evitar musica amplificada.',
    imagenAsset: 'assets/images/patio_llum.png',
    imagenesAssets: ['assets/images/patio_llum.png', 'assets/images/patio_llum_02.png', 'assets/images/patio_llum_03.png'],
    sitioWeb: 'https://example.com/espacios/e2',
    serviciosDisponibles: [e2_decoracion, e2_limpieza],
    aforo: 40,
    precioHoraCentimos: 4500,
    actividades: ['Celebracion', 'Taller'],
    equipamiento: ['Mesas', 'Zona cubierta', 'Aseos accesibles'],
    contacto: contactoParque,
    moneda: 'EUR',
  ),
  EspacioDto(
    id: 'e3',
    nombre: 'Aula Crea',
    descripcion: 'Aula flexible para talleres creativos y encuentros de grupos reducidos.',
    ubicacion: 'Centro · Calle del Encuentro, 12',
    horario: '09:00–20:00',
    condicionesUso: 'Proteger las mesas y limpiar los utensilios utilizados.',
    imagenAsset: 'assets/images/aula_crea.png',
    imagenesAssets: ['assets/images/aula_crea.png', 'assets/images/aula_crea_02.png', 'assets/images/aula_crea_03.png'],
    sitioWeb: null,
    serviciosDisponibles: [e3_materiales, e3_limpieza],
    aforo: 16,
    precioHoraCentimos: 2000,
    actividades: ['Taller', 'Reunion'],
    equipamiento: ['Pizarra', 'Mesas moviles', 'Fregadero'],
    contacto: contactoCentro,
    moneda: 'EUR',
  ),
  EspacioDto(
    id: 'e4',
    nombre: 'Sala Mirador',
    descripcion: 'Espacio tranquilo con vistas para reuniones y presentaciones.',
    ubicacion: 'Barrio Alto · Paseo del Mirador, 8',
    horario: '08:00–19:00',
    condicionesUso: 'Mantener el volumen bajo y dejar las sillas ordenadas.',
    imagenAsset: 'assets/images/sala_mirador.png',
    imagenesAssets: ['assets/images/sala_mirador.png', 'assets/images/sala_mirador_02.png', 'assets/images/sala_mirador_03.png'],
    sitioWeb: 'https://example.com/espacios/e4',
    serviciosDisponibles: [e4_cafe, e4_grabacion],
    aforo: 12,
    precioHoraCentimos: 2500,
    actividades: ['Reunion'],
    equipamiento: ['Pantalla', 'Wi-Fi', 'Aire acondicionado'],
    contacto: contactoMirador,
    moneda: 'EUR',
  ),
  EspacioDto(
    id: 'e5',
    nombre: 'Salon Nexo',
    descripcion: 'Salon amplio para celebraciones, reuniones y talleres colectivos.',
    ubicacion: 'Barrio Alto · Paseo del Mirador, 10',
    horario: '10:00–23:00',
    condicionesUso: 'No utilizar confeti. Devolver el mobiliario a su posicion.',
    imagenAsset: 'assets/images/salon_nexo.png',
    imagenesAssets: ['assets/images/salon_nexo.png', 'assets/images/salon_nexo_02.png', 'assets/images/salon_nexo_03.png'],
    sitioWeb: 'https://example.com/espacios/e5',
    serviciosDisponibles: [e5_montaje, e5_limpieza],
    aforo: 60,
    precioHoraCentimos: 6000,
    actividades: ['Celebracion', 'Reunion', 'Taller'],
    equipamiento: ['Equipo de sonido', 'Sillas', 'Aseos accesibles'],
    contacto: contactoMirador,
    moneda: 'EUR',
  ),
  EspacioDto(
    id: 'e6',
    nombre: 'Jardin Brisa',
    descripcion: 'Jardin con sombra para talleres y celebraciones al aire libre.',
    ubicacion: 'Barrio del Parque · Camino de la Brisa, 3',
    horario: '09:00–21:00',
    condicionesUso: 'Cuidar la vegetacion y retirar todos los residuos.',
    imagenAsset: 'assets/images/jardin_brisa.png',
    imagenesAssets: ['assets/images/jardin_brisa.png', 'assets/images/jardin_brisa_02.png', 'assets/images/jardin_brisa_03.png'],
    sitioWeb: null,
    serviciosDisponibles: [e6_carpa, e6_limpieza],
    aforo: 30,
    precioHoraCentimos: 3500,
    actividades: ['Taller', 'Celebracion'],
    equipamiento: ['Bancos', 'Zona de sombra', 'Punto de agua'],
    contacto: contactoParque,
    moneda: 'EUR',
  ),
];

const reservasDemo = <ReservaDto>[
  ReservaDto(
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
  ),
  ReservaDto(
    id: 'r2',
    espacioId: 'e2',
    usuarioId: 'u1',
    actividad: 'Celebracion',
    inicioIso: '2026-11-20T17:00:00',
    finIso: '2026-11-20T20:00:00',
    asistentes: 25,
    codigoEstado: 'PEND',
    tarifaHoraCentimos: 4500,
    precioTotalCentimos: 19500,
    moneda: 'EUR',
    serviciosContratados: [
      ServicioContratadoDto(
        servicioId: 'e2_decoracion',
        nombre: 'Decoracion',
        precioCentimos: 6000,
      ),
    ],
  ),
  ReservaDto(
    id: 'r3',
    espacioId: 'e3',
    usuarioId: 'u1',
    actividad: 'Taller',
    inicioIso: '2026-11-08T16:00:00',
    finIso: '2026-11-08T18:00:00',
    asistentes: 10,
    codigoEstado: 'CANC',
    tarifaHoraCentimos: 2000,
    precioTotalCentimos: 4000,
    moneda: 'EUR',
    serviciosContratados: [],
  ),
  ReservaDto(
    id: 'r4',
    espacioId: 'e4',
    usuarioId: 'u2',
    actividad: 'Reunion',
    inicioIso: '2026-11-15T09:00:00',
    finIso: '2026-11-15T12:00:00',
    asistentes: 8,
    codigoEstado: 'CONF',
    tarifaHoraCentimos: 2500,
    precioTotalCentimos: 8500,
    moneda: 'EUR',
    serviciosContratados: [
      ServicioContratadoDto(
        servicioId: 'e4_cafe',
        nombre: 'Pausa cafe',
        precioCentimos: 1000,
      ),
    ],
  ),
];

const comentariosDemo = <ComentarioDto>[
  ComentarioDto(
    id: 'co1',
    espacioId: 'e1',
    autorId: 'u2',
    puntuacion: 5,
    texto: 'Sala comoda y luminosa. El contacto nos atendio muy bien.',
    fechaIso: '2026-10-20T18:00:00',
  ),
  ComentarioDto(
    id: 'co2',
    espacioId: 'e1',
    autorId: 'u3',
    puntuacion: 4,
    texto: 'Buen espacio para reuniones; se oye algo de ruido al entrar.',
    fechaIso: '2026-10-21T18:00:00',
  ),
  ComentarioDto(
    id: 'co3',
    espacioId: 'e2',
    autorId: 'u1',
    puntuacion: 4,
    texto: 'Patio amplio y agradable para una celebracion.',
    fechaIso: '2026-10-22T18:00:00',
  ),
  ComentarioDto(
    id: 'co4',
    espacioId: 'e3',
    autorId: 'u2',
    puntuacion: 5,
    texto: 'Las mesas moviles facilitan mucho los talleres.',
    fechaIso: '2026-10-23T18:00:00',
  ),
  ComentarioDto(
    id: 'co5',
    espacioId: 'e4',
    autorId: 'u3',
    puntuacion: 3,
    texto: 'Buenas vistas; resulta justo para grupos grandes.',
    fechaIso: '2026-10-24T18:00:00',
  ),
  ComentarioDto(
    id: 'co6',
    espacioId: 'e5',
    autorId: 'u1',
    puntuacion: 5,
    texto: 'El montaje especial nos ahorro mucho trabajo.',
    fechaIso: '2026-10-25T18:00:00',
  ),
];

// Fecha de referencia compartida por toda la demostracion.
final fechaReferenciaDemo = DateTime.now();
final disponibilidadDemo = crearDisponibilidadDemo(fechaReferenciaDemo);

List<DisponibilidadDiaDto> crearDisponibilidadDemo(DateTime referencia) {
  final resultado = <DisponibilidadDiaDto>[];
  for (var espacioIndex = 0; espacioIndex < espaciosDemo.length; espacioIndex++) {
    for (var diaIndex = 0; diaIndex < 7; diaIndex++) {
      final dia = DateTime(
        referencia.year,
        referencia.month,
        referencia.day + diaIndex,
      );
      final franjas = <FranjaDisponibilidadDto>[];
      const horasInicio = [10, 13, 17];
      for (var franjaIndex = 0; franjaIndex < horasInicio.length; franjaIndex++) {
        final hora = horasInicio[franjaIndex];
        franjas.add(
          FranjaDisponibilidadDto(
            inicioIso: DateTime(dia.year, dia.month, dia.day, hora).toIso8601String(),
            finIso: DateTime(dia.year, dia.month, dia.day, hora + 2).toIso8601String(),
            disponible: (espacioIndex + diaIndex + franjaIndex) % 4 != 0,
          ),
        );
      }
      resultado.add(
        DisponibilidadDiaDto(
          espacioId: espaciosDemo[espacioIndex].id,
          fechaIso: dia.toIso8601String(),
          franjas: List.unmodifiable(franjas),
        ),
      );
    }
  }
  return List.unmodifiable(resultado);
}
```

## Conectar los datos al servicio

En `lib/main.dart`, importa el archivo y crea el servicio una vez durante el arranque. Este **fragmento** presupone que has implementado `DatosSimuladosService` como se muestra en la capa de datos; no reemplaza tu `main` ni tu `MaterialApp`:

```dart
import 'data/services/datos_demo.dart';
import 'data/services/datos_simulados_service.dart';

final service = DatosSimuladosService(
  espacios: espaciosDemo,
  reservas: reservasDemo,
  usuarios: usuariosDemo,
  comentarios: comentariosDemo,
  disponibilidad: disponibilidadDemo,
);
```

Pasa después `service` a los constructores de tus repositorios. Los métodos del servicio devolverán los DTO de estas colecciones. Puedes comprobarlo con este fragmento, en el mismo ámbito donde exista `service`:

```dart
final espaciosDto = service.leerEspacios();
final reservasDto = service.leerReservas();
final usuariosDto = service.leerUsuarios();
final comentariosDto = service.leerComentarios();
final disponibilidadDto = service.leerDisponibilidad();

print(espaciosDto.length); // 6
print(reservasDto.length); // 4
print(usuariosDto.length); // 3
print(comentariosDto.length); // 6
print(disponibilidadDto.length); // 42
```

Las pantallas siguen consultando **repositorios y modelos de dominio**, no estas listas DTO. Mantén los datos fuera de `build` y no copies el mismo catálogo en cada pantalla.

## Recursos de imágenes

`imagenAsset` contiene rutas propuestas para el proyecto Flutter. **El archivo de datos no incluye fotografías**: añade tus imágenes con esos nombres en `assets/images/`, o adapta las rutas a los recursos que hayas elegido. Declara la carpeta en el apartado `flutter` de tu `pubspec.yaml`, conservando las demás opciones:

```yaml
flutter:
  assets:
    - assets/images/
```

Hasta que incorpores las imágenes, utiliza un `Placeholder` en la composición de las tarjetas. Los datos del servicio se pueden leer sin cargar imágenes; las rutas son texto que utilizará después la vista.

## Comprobación del conjunto

- El servicio devuelve 6 espacios, 4 reservas, 3 usuarios, 6 comentarios y 42 registros espacio–día (126 franjas).
- El repositorio obtiene 3 reservas de `u1`, 1 de `u2` y ninguna de `u3`.
- `r1` referencia `e1`, con Ana Soler como contacto: 2 horas × 3000 céntimos + 1500 de limpieza = 7500 céntimos.
- `r2` referencia `e2`, con Pau Vidal: 3 horas × 4500 céntimos + 6000 de decoración = 19500 céntimos.
- `r3` referencia `e3` y está cancelada; su precio de ejemplo sigue siendo 4000 céntimos.
- `r4` referencia `e4` y pertenece a `u2`; su total es 8500 céntimos, incluidos 1000 de café.
- Abre `e5` y `e6` desde el catálogo aunque no tengan reservas precargadas.
