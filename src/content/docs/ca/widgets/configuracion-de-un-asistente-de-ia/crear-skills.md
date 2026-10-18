---
title: "3. Skills per a crear components i proves"
sidebar:
  order: 4
---

Una skill guarda un procediment reutilitzable. En lloc de demanar «fes-ho bé», concretarem què vol dir qualitat en el nostre catàleg. Prepararem dos habilitats productives: **`create-component`** i **`test-widget`**; mantindrem també les d’explicació, pistes i revisió.

## Prepara els fitxers

Crea esta estructura en l’arrel del projecte. Cada bloc següent és el contingut complet del seu `SKILL.md`. Els procediments es mantenen en castellà en les dos versions per a compartir-los a classe; pots demanar les respostes en valencià.

```text
.agents/skills/
├── create-component/SKILL.md
├── test-widget/SKILL.md
├── review-code/SKILL.md
├── explain-widget/SKILL.md
└── give-hints/SKILL.md
```

`name` identifica l’habilitat i coincidix amb la carpeta; `description` indica quan s’ha d’aplicar. Les instruccions del cos definixen el procediment. Si el teu xat no descobrix skills, adjunta el fitxer junt amb `ai/instrucciones.md`. No necessites mantindre una segona còpia en `ai/skills`.

## create-component

`.agents/skills/create-component/SKILL.md`

```markdown
---
name: create-component
description: Crea o adapta un componente Flutter del catálogo con parámetros y estándares del proyecto. Usar al solicitar implementación o extracción de un componente.
---

# Crear componentes del catálogo
Lee el archivo de destino, las instrucciones del proyecto y el comportamiento pedido.
Si faltan datos que cambian la API pública o el resultado esperado, acláralos;
para decisiones menores sigue las convenciones existentes.

## Estándares de este proyecto
- Conserva las clases de pantalla y la infraestructura entregada. No cambies el
  listado, main.dart ni el mecanismo entre pantallas para añadir un ejemplo.
- Usa UpperCamelCase para clases, lowerCamelCase para miembros y
  lower_case_with_underscores.dart para archivos. Respeta el idioma del código.
- Define una responsabilidad por componente y una API pequeña: campos final,
  parámetros nombrados, required para datos obligatorios y valores predeterminados
  cuando tengan sentido. Acepta super.key y usa constructor const si procede.
- Prefiere StatelessWidget si solo recibe configuración. Usa StatefulWidget
  cuando deba conservar datos propios; no inicialices ese estado en build.
- Recibe las acciones mediante callbacks tipados, como VoidCallback?, cuando
  correspondan. No ejecutes el callback al construir el widget.
- Expresa las variantes visuales con un parámetro booleano o enum. Guarda cada
  componente reutilizable en su archivo dentro de lib/componentes/ e impórtalo
  desde su pantalla. Define el estilo dentro del componente; no crees temas
  globales ni archivos de estilos en esta unidad.
- Mantén build sin efectos secundarios. Extrae un widget cuando permita reutilizar
  una pieza o aclarar responsabilidades; evita capas y paquetes innecesarios.
- Aporta tooltip a acciones de icono y descripción a imágenes informativas.
  No comuniques diferencias relevantes solo mediante color.
- Considera texto largo y espacio limitado; no fijes dimensiones arbitrarias
  salvo que formen parte de la demostración.

## Entrega y comprobación
Implementa solo lo pedido. Indica el archivo, los parámetros y un uso real en
la sección del catálogo, conservando los ejemplos anteriores. Explica la sintaxis
nueva. Identifica qué comportamiento se podrá comprobar en cada variante.
Ejecuta dart format sobre los archivos modificados y flutter analyze si puedes.
Comunica comandos y resultados reales; si no puedes ejecutarlos, indícalo.
No generes pruebas extensas salvo que se pidan: puedes proponer los casos útiles.
```

## test-widget

`.agents/skills/test-widget/SKILL.md`

```markdown
---
name: test-widget
description: Genera o mejora pruebas de widgets Flutter a partir de requisitos observables. Usar al pedir tests de componentes o variantes del catálogo.
---

# Pruebas precisas de widgets
Lee los requisitos, el componente real, sus usos y las pruebas existentes.
No inventes nombres de clases, rutas, claves ni comportamientos ausentes.
Si falta un criterio de aceptación esencial, pregunta antes de darlo por supuesto.

## De requisitos a casos
Prepara una tabla: requisito, configuración/acción, resultado esperado y selector.
Cubre las variantes solicitadas y los límites relevantes, no combinaciones sin
sentido. Cada prueba debe detectar un fallo concreto; explica cuál.
No deduzcas el resultado esperado copiando la lógica de la implementación.

## Construcción de las pruebas
- Usa flutter_test y testWidgets. Monta el componente aislado con el entorno mínimo
  necesario (por ejemplo MaterialApp y Scaffold). No incluyas el listado del catálogo
  si el requisito trata del componente.
- Organiza preparación, acción y comprobaciones. Usa nombres que describan la
  condición y el resultado. Crea una instancia nueva para cada caso independiente.
- Usa find.text, find.byTooltip o find.byKey si son inequívocos. Si hay duplicados,
  acota el selector al componente con find.descendant; no uses .first para ocultar
  ambigüedades. Añade una Key estable solo cuando esté justificada.
- Comprueba contenido y comportamiento: un callback debe contar llamadas, no solo
  existir. Para desactivación comprueba que no se llama. Prueba cambios de
  configuración del padre cuando sean parte del contrato.
- Si el estilo es requisito explícito, comprueba sus valores en el elemento
  correspondiente y ambas variantes; no afirmes que eso verifica el aspecto
  renderizado completo. No inspecciones detalles privados ni árboles exactos.
- Usa pump para reconstrucciones y tiempos concretos para comportamiento temporal.
  Reserva pumpAndSettle para animaciones finitas: puede no terminar con indicadores
  de progreso. No añadas pausas arbitrarias para hacer pasar una prueba.
- No dependas de Internet, reloj real ni recursos remotos. Aísla la carga con una
  dependencia controlable cuando se solicite probar imágenes o errores de red.
- Comprueba ausencia de excepciones como complemento, nunca como única aserción.
  No cambies el requisito, borres aserciones ni modifiques producción solo para
  conseguir pruebas verdes. Justifica cualquier ajuste de testabilidad.

## Validación y límites
Entrega archivos de test ejecutables con imports reales y sin marcadores pendientes.
Ejecuta flutter test con la ruta concreta y flutter analyze si el entorno lo permite.
Indica qué ejecutaste, el resultado y qué quedó sin comprobar. No prometas cobertura
completa ni precisión visual por tener pruebas verdes; señala qué requiere revisión
manual o pruebas visuales. Si no ejecutaste, dilo expresamente.
```

## review-code

`.agents/skills/review-code/SKILL.md`

```markdown
---
name: review-code
description: Revisa componentes del catálogo frente a sus requisitos y estándares, sin modificar archivos. Usar cuando se solicite una revisión.
---

# Revisar componentes
Lee el objetivo y los archivos aportados. Comprueba que la API, los ejemplos y las
pruebas cumplen los requisitos. Revisa responsabilidad, parámetros inmutables,
callbacks, const, estilo por variante, accesibilidad y espacio limitado.
Prioriza fallos de comportamiento sobre preferencias de estilo. Para cada hallazgo
indica archivo, causa, efecto y una comprobación concreta. Si no hay problemas,
dilo sin inventar mejoras ni exigir cambios cosméticos.
No modifiques archivos en una revisión. Distingue lectura, comandos ejecutados y
aspectos no comprobados. No introduzcas navegación ni arquitecturas nuevas.
```

## explain-widget

`.agents/skills/explain-widget/SKILL.md`

```markdown
---
name: explain-widget
description: Explica un widget o propiedad con un ejemplo incremental del catálogo. Usar para consultas de comprensión.
---

# Explicar un widget
Sitúa la explicación en la sección y archivo actuales del catálogo.
Explica el propósito y las propiedades nuevas. Muestra el fragmento mínimo y dónde
añadirlo sin borrar las demostraciones anteriores. Indica un resultado observable,
un error frecuente y una variación para que la resuelva el alumno.
No reescribas la aplicación ni expliques navegación en esta unidad.
```

## give-hints

`.agents/skills/give-hints/SKILL.md`

```markdown
---
name: give-hints
description: Da pistas progresivas ante errores del catálogo. Usar cuando el alumno pida orientación sin solución completa.
---

# Dar pistas
Pide el fragmento, el error exacto y el resultado esperado si faltan.
Distingue error de análisis, ejecución y problema visual. Da una pista concreta
sobre el archivo o propiedad relevante y espera el intento del alumno.
Si pide la solución, muestra el cambio mínimo y explica su causa.
No inventes ejecuciones ni reconstruyas la aplicación completa.
```

## Prova una petició productiva

Després del tutorial d’estils, aporta el fitxer real i demana:

```text
Utiliza create-component y las instrucciones del proyecto.
Crea lib/componentes/etiqueta_catalogo.dart con EtiquetaCatalogo.
Importa el componente desde text_ejemplos_pantalla.dart para mostrarlo.
Debe recibir texto obligatorio y destacada=false por defecto.
Normal: tamaño 16 y peso normal. Destacada: tamaño 22 y negrita.
Ambas deben mostrar exactamente el texto recibido.
Conserva la clase de pantalla y añade dos ejemplos del mismo contenido.
No cambies main.dart ni el listado. Explica las decisiones y valida el cambio.
```

Després aporta la implementació que has acceptat i demana les proves:

```text
Utiliza test-widget sobre el EtiquetaCatalogo real que adjunto.
Genera test/etiqueta_catalogo_test.dart con los imports del proyecto.
Verifica el contenido, el valor predeterminado de destacada, los dos tamaños
y pesos, y que al recibir otro texto del padre se actualiza el contenido.
Presenta primero la tabla de casos. Comprueba ambas variantes de forma aislada.
Ejecuta la prueba si puedes e indica el resultado real y sus límites.
```

## Comprova que les skills són útils

| Requisit | Comprovació que esperem |
| --- | --- |
| Text rebut | El contingut concret apareix una sola vegada dins del component. |
| Variant normal per defecte | Sense indicar `destacada`, grandària 16 i pes normal. |
| Variant destacada | Amb `true`, grandària 22 i negreta, conservant el contingut. |
| Configuració nova | Canvia el text rebut i desapareix l’anterior. |
| Botó actiu, quan l’estudiem | Una pulsació incrementa en una el comptador de crides. |
| Botó desactivat | La interacció no invoca el callback. |

Una prova que només troba `Text` no distingix estes variants. Tampoc comprova el retall visual d’una frase: això requerix revisar la representació. Les proves han de verificar el contracte demanat, sense convertir-se en una còpia del codi.

Obri una conversa nova en un editor compatible i demana explícitament la skill pel nom. En VS Code comprova que les cinc apareixen entre les habilitats disponibles; si no, revisa la carpeta oberta, el nom `SKILL.md` i la capçalera. El descobriment i el procediment seguit són comprovacions diferents. Consulta la [documentació de skills de VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills).

Com a activitat, aplica `create-component` a una peça menuda que ja hages escrit. Defineix dos criteris d’acceptació abans de generar proves amb `test-widget`. Revisa quina errada detectaria cada prova i executa-la. Si no hi ha entorn d’execució, conserva eixa limitació en l’entrega.

Referències: [Effective Dart](https://dart.dev/effective-dart/style) · [Pruebas de widgets en Flutter](https://docs.flutter.dev/cookbook/testing/widget/introduction).
