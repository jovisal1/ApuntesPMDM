---
title: "Introducció"
sidebar:
  order: 1
---

Construirem un únic formulari d’accés de demostració en **`catalogo_widgets`**. La persona escriu nom i correu, tria un taller i marca, si vol, un recordatori. L’únic botó del formulari és **Login**: valida els camps, consulta la font fictícia i, si troba l’usuari, obri el seu detall amb una salutació i totes les seues dades. Si hi ha errors, es queda en el formulari i els mostra.

El nom i el correu es comparen amb dades locals: no implementem autenticació real, contrasenyes, sessions ni enviament de missatges. El taller i el recordatori són les seleccions d’esta visita; no formen part de la identitat de l’usuari.

## Arquitectura des del principi

Seguim l’arquitectura de l’[exemple amb dades](../../widgets/ejemplo-con-datos/). Primer prepararem les dependències; després construirem la interfície que les utilitza.

| Capa | Responsabilitat en l’exemple |
| --- | --- |
| `data/models` | DTO amb el format de la font fictícia. |
| `data/services` | Font local d’usuaris i tallers. |
| `domain/models` | Fitxa completa, taller i resultat de l’accés que utilitza l’aplicació. |
| `domain/repositories` | Contracte de consulta, independent de Flutter i de l’origen. |
| `data/repositories` | Implementació del contracte, conversió de DTO i cerca de la fitxa. |
| `ui/inscripcion/view_models` | Text, seleccions, validació i consulta al contracte. |
| `ui/inscripcion/ui` | Camps, errors, controladors, focus, botó Login i navegació al detall. |

La funcionalitat conserva el nom tècnic `inscripcion`, compartit amb altres exemples del catàleg. La pantalla representa un accés simulat als tallers.

```text
Vista → ViewModel → contracte del repositori (domain)
                              ↑ implementa
                   repositori local (data) → servici → DTO

DTO → repositori → models de domini → ViewModel → vista de detall
```

La vista no construïx fitxes amb el text escrit ni consulta directament el servici. El ViewModel no importa `data` ni utilitza `BuildContext`. Només l’arrel de composició `InscripcionEjemploPantalla` connecta servici, repositori i ViewModel una vegada per visita. El domini no importa Flutter.

## Fitxers que anirem completant

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

Mantín `main.dart` i les entrades anteriors del catàleg. Els fitxers de codi es compartixen entre les dos llengües, inclosos els textos de demostració, per a comprovar una mateixa implementació.

## Passos del formulari

1. [Preparar data i domain](./datos-por-capas/).
2. [Crear el ViewModel](./recoger-los-datos/).
3. [Preparar la vista i les seues dependències](./preparar-la-pantalla/).
4. [Connectar la validació](./validar-los-datos/).
5. [Afegir el desplegable i la casella](./selecciones-y-saludo/).
6. [Connectar els controladors](./controladores-y-cambios/).
7. [Gestionar el focus](./gestionar-el-foco/).
8. [Login i detall de l’usuari](./boton-y-resultado/).
9. [Completar la pantalla](./completar-la-pantalla/).
10. [Provar el recorregut](./probar-el-formulario/).
