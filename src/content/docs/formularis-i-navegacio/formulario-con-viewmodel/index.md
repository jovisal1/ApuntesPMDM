---
title: "Introducción"
sidebar:
  order: 1
---

Construiremos un único formulario de acceso de demostración en **`catalogo_widgets`**. La persona escribe nombre y correo, elige un taller y marca, si quiere, un recordatorio. El único botón del formulario es **Login**: valida los campos, consulta la fuente ficticia y, si encuentra al usuario, abre su detalle con un saludo y todos sus datos. Si hay errores, permanece en el formulario y los muestra.

El nombre y el correo se comparan con datos locales: no implementamos autenticación real, contraseñas, sesiones ni envío de mensajes. El taller y el recordatorio son las selecciones de esta visita; no forman parte de la identidad del usuario.

## Arquitectura desde el principio

Seguimos la arquitectura del [ejemplo con datos](../../widgets/ejemplo-con-datos/). Primero prepararemos las dependencias; después construiremos la interfaz que las utiliza.

| Capa | Responsabilidad en el ejemplo |
| --- | --- |
| `data/models` | DTO con el formato de la fuente ficticia. |
| `data/services` | Fuente local de usuarios y talleres. |
| `domain/models` | Ficha completa, taller y resultado del acceso que utiliza la aplicación. |
| `domain/repositories` | Contrato de consulta, independiente de Flutter y del origen. |
| `data/repositories` | Implementación del contrato, conversión de DTO y búsqueda de la ficha. |
| `ui/inscripcion/view_models` | Texto, selecciones, validación y consulta al contrato. |
| `ui/inscripcion/ui` | Campos, errores, controladores, foco, botón Login y navegación al detalle. |

La funcionalidad conserva el nombre técnico `inscripcion`, compartido con otros ejemplos del catálogo. La pantalla representa un acceso simulado a los talleres.

```text
Vista → ViewModel → contrato del repositorio (domain)
                              ↑ implementa
                   repositorio local (data) → servicio → DTO

DTO → repositorio → modelos de dominio → ViewModel → vista de detalle
```

La vista no construye fichas con lo escrito ni consulta directamente el servicio. El ViewModel no importa `data` ni utiliza `BuildContext`. Solo la raíz de composición `InscripcionEjemploPantalla` conecta servicio, repositorio y ViewModel una vez por visita. El dominio no importa Flutter.

## Archivos que iremos completando

```text
lib/
  data/
    models/usuario_inscripcion_dto.dart
    models/taller_dto.dart
    services/inscripciones_local_service.dart
    repositories/inscripciones_local_repository.dart
  domain/
    models/usuario_inscripcion.dart
    models/taller.dart
    models/datos_acceso.dart
    repositories/inscripciones_repository.dart
  ui/inscripcion/
    view_models/inscripcion_viewmodel.dart
    ui/inscripcion_ejemplo_pantalla.dart
    ui/inscripcion_pantalla.dart
    ui/detalle_usuario_pantalla.dart
```

Mantén `main.dart` y las entradas anteriores del catálogo. Los archivos de código se comparten entre las dos lenguas, incluidos los textos de demostración, para comprobar una misma implementación.

## Pasos del formulario

1. [Preparar data y domain](./datos-por-capas/).
2. [Crear el ViewModel](./recoger-los-datos/).
3. [Preparar la vista y sus dependencias](./preparar-la-pantalla/).
4. [Conectar la validación](./validar-los-datos/).
5. [Añadir el desplegable y la casilla](./selecciones-y-saludo/).
6. [Conectar los controladores](./controladores-y-cambios/).
7. [Gestionar el foco](./gestionar-el-foco/).
8. [Login y detalle del usuario](./boton-y-resultado/).
9. [Completar la pantalla](./completar-la-pantalla/).
10. [Probar el recorrido](./probar-el-formulario/).
