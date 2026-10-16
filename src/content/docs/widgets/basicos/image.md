---
title: "Image: incorporar imágenes"
sidebar:
  order: 4
---

**`Image` muestra una imagen**, pero necesitamos indicar de dónde procede. Sus constructores con nombre permiten elegir el origen:

Documentación oficial: [`Image`](https://api.flutter.dev/flutter/widgets/Image-class.html).

| Propiedad | Para qué sirve |
| --- | --- |
| `width / height` | Solicitan el ancho y la altura de la imagen. |
| `fit` | Ajusta la imagen a su espacio con valores de `BoxFit`. |
| `alignment` | Indica cómo alinear la imagen dentro de su espacio. |
| `semanticLabel` | Describe el contenido para tecnologías de asistencia. |
| `excludeFromSemantics` | Excluye una imagen decorativa de la descripción accesible. |
| `errorBuilder` | Devuelve un widget alternativo si falla la carga. |
| `loadingBuilder` | Personaliza lo que se muestra mientras se carga la imagen. |

| Constructor | Origen | Ejemplo de uso |
| --- | --- | --- |
| `Image.asset` | Un recurso incluido en la aplicación. | Un logotipo o una ilustración. |
| `Image.network` | Una dirección de Internet. | Una fotografía de un catálogo. |
| `Image.file` | Un archivo del dispositivo. | Una fotografía local en plataformas compatibles; no se admite en Flutter web. |
| `Image.memory` | Bytes almacenados en memoria. | Una imagen recibida o generada como datos. |

### Imágenes de la aplicación

Para usar una fotografía local, crea la carpeta `assets/images/` en la raíz del proyecto y coloca en ella un archivo llamado `ruta.jpg`. Después declara la carpeta en **el bloque `flutter` que ya existe** en `pubspec.yaml`:

```yaml
flutter:
  uses-material-design: true
  assets:
    - assets/images/
```

Respeta la indentación: YAML utiliza espacios para expresar la estructura. Ejecuta `flutter pub get` después de modificar la configuración y vuelve a iniciar la aplicación si el recurso nuevo no aparece. Esta preparación requiere un proyecto local; DartPad no incorpora los archivos de tu ordenador.

```dart
Image.asset(
  'assets/images/ruta.jpg',
  width: 300,
  height: 180,
  fit: BoxFit.cover,
  semanticLabel: 'Sendero entre árboles junto a una cascada',
)
```

`width` y `height` definen el espacio solicitado. **`fit` indica cómo ajustar la imagen a ese espacio**:

| Valor | Resultado |
| --- | --- |
| `BoxFit.cover` | Mantiene la proporción y cubre el espacio; puede recortar los bordes. |
| `BoxFit.contain` | Mantiene la proporción y muestra la imagen completa; puede dejar espacio libre. |
| `BoxFit.fill` | Llena el espacio deformando la imagen si las proporciones no coinciden. |

`semanticLabel` describe la imagen para las tecnologías de asistencia. Si es puramente decorativa, puedes usar `excludeFromSemantics: true`. La [referencia de `Image.asset`](https://api.flutter.dev/flutter/widgets/Image/Image.asset.html) explica la carga de recursos.

### Imágenes de Internet

Una imagen remota necesita conexión y puede fallar. Podemos reservar su tamaño y ofrecer una alternativa mediante `errorBuilder`:

```dart
Image.network(
  'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
  width: 300,
  height: 180,
  fit: BoxFit.cover,
  semanticLabel: 'Un búho posado en una rama',
  errorBuilder: (context, error, stackTrace) => const SizedBox(
    width: 300,
    height: 180,
    child: Center(child: Text('No se pudo cargar la imagen')),
  ),
)
```

`errorBuilder` recibe información del fallo y devuelve el widget que se mostrará en su lugar. También existe `loadingBuilder` para personalizar la espera. En web, el servidor de origen debe permitir la carga según las restricciones del navegador; en otras plataformas revisa la configuración de acceso a Internet. Consulta la [referencia de `Image.network`](https://api.flutter.dev/flutter/widgets/Image/Image.network.html).

:::caution[Si un recurso no aparece]
Comprueba la ruta, las mayúsculas y minúsculas del nombre y la declaración en `pubspec.yaml`. La ruta se escribe desde la raíz del proyecto, no desde `lib/main.dart`.
:::
