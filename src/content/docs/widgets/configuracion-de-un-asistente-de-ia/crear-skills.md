---
title: "3. Crear habilidades para explicar, depurar y revisar"
description: "3. Crear habilidades para explicar, depurar y revisar · Asistente de IA y catálogo de widgets para 2.º de DAM."
sidebar:
  order: 4
---

## Empieza por el procedimiento

En una práctica repetimos peticiones parecidas: «explícame este widget», «dame una pista» o «revisa este cambio». Una **skill** guarda un procedimiento para no tener que redactarlo de nuevo cada vez. No es una función de Dart y no aparece en el árbol de widgets.

Primero utilizaremos tres archivos de texto desde cualquier chat. Después veremos cómo adaptar su formato para un asistente que descubra skills.

En este apartado aparecen dos carpetas con funciones distintas, ambas en la raíz de `catalogo_widgets`:

| Carpeta | Para qué la utilizaremos |
| --- | --- |
| `ai/skills/` | Guardar los procedimientos como archivos Markdown que proporcionamos al asistente manualmente. Es la carpeta `ai` que creamos en el apartado 1, **sin punto delante**. |
| `.agents/skills/` | Guardar las habilidades con el formato `nombre/SKILL.md` para que un asistente compatible pueda descubrirlas automáticamente. La carpeta `.agents` **sí lleva punto delante**. |

Empieza creando los siguientes archivos dentro de `ai/skills`. Al final del apartado prepararemos su versión en `.agents/skills`.

## Explicar un widget

Contenido de `ai/skills/explain-widget.md`:

```markdown
# Explicar un widget
Utiliza este procedimiento cuando te pida comprender un widget de Flutter.
1. Pregunta qué quiero conseguir si no he indicado el objetivo.
2. Explica para qué sirve con una situación del catálogo.
3. Muestra un ejemplo mínimo e indica dónde se puede colocar.
4. Explica las propiedades y la sintaxis empleadas.
5. Señala un error frecuente y cómo reconocerlo.
6. Propón una pequeña modificación y espera mi intento.
No generes una pantalla completa si basta con un fragmento.
```

Adjunta al chat `ai/instrucciones.md` y `ai/skills/explain-widget.md`. Después pregunta:

```text
Sigue instrucciones.md y el procedimiento explain-widget.md.
Quiero comprender la propiedad maxLines de Text para mi catálogo.
Muéstrame un ejemplo pequeño y deja una modificación para que la pruebe yo.
```

Debes poder indicar qué sucede si el texto no cabe. Para comprobarlo, utiliza un ancho limitado: si sobra espacio, cambiar `maxLines` puede no producir una diferencia visible.

## Dar pistas al depurar

Contenido de `ai/skills/give-hints.md`:

```markdown
# Dar pistas para depurar
Utiliza este procedimiento cuando comparta un error o un resultado inesperado.
1. Pide el fragmento, el resultado esperado y el observado si faltan.
2. Distingue un error del analizador de un problema visual o de ejecución.
3. Señala la zona que debo revisar sin dar la solución completa.
4. Da una primera pista y espera a que comparta mi intento.
5. Si sigo bloqueado, ofrece una pista más concreta.
6. Cuando solicite la solución, muestra el cambio mínimo y explica la causa.
No inventes una ejecución ni reescribas todo el proyecto.
```

Prueba con la alineación de `Column` del apartado anterior. Indica qué ves en pantalla y qué esperabas ver. «No funciona» da menos información que «los dos textos aparecen arriba y quiero que el conjunto quede centrado verticalmente».

Si ya has centrado los textos, elimina temporalmente la propiedad `mainAxisAlignment` de la `Column` de `lib/main.dart`, guarda y comprueba que vuelven a aparecer arriba. Adjunta al chat `ai/instrucciones.md`, `ai/skills/give-hints.md` y el `lib/main.dart` actual. Después envía:

```text
Sigue instrucciones.md y el procedimiento give-hints.md.
En lib/main.dart tengo dos textos dentro de una Column.
Al ejecutar la aplicación aparecen arriba, pero quiero que el conjunto
quede centrado verticalmente en el cuerpo de la pantalla.
Lee el archivo que adjunto y dame solo una primera pista.
No escribas la solución ni modifiques archivos. Espera a que pruebe un cambio.
```

Prueba la pista en `lib/main.dart` y ejecuta la aplicación. Si necesitas más ayuda, completa los corchetes con tu experiencia y envía:

```text
Continúa con el procedimiento give-hints.md.
He probado este cambio: [explica qué propiedad o valor has cambiado].
Ahora observo lo siguiente: [describe el resultado en la aplicación].
Te adjunto mi lib/main.dart actualizado.
Dame una pista más concreta, sin resolver todavía el ejercicio.
```

## Revisar un cambio

Contenido de `ai/skills/review-code.md`:

```markdown
# Revisar código de nivel inicial
Utiliza este procedimiento cuando te pida revisar un cambio de mi catálogo.
1. Lee el objetivo del cambio y los archivos que he proporcionado.
2. Comprueba si el comportamiento propuesto cumple ese objetivo.
3. Explica una decisión del código que esté bien justificada.
4. Señala como máximo tres mejoras, ordenadas por importancia.
5. Para cada mejora, indica el lugar, el motivo y cómo comprobarla.
6. Termina con una pregunta sobre el árbol de widgets.
Revisa nombres, indentación, duplicación, uso de const y composición.
No modifiques archivos ni introduzcas paquetes o arquitecturas avanzadas.
Distingue las comprobaciones ejecutadas de la lectura del código.
```

Antes de pedir la revisión, escribe tú una explicación de dos o tres frases sobre el cambio. Después compara lo que has razonado con los comentarios del asistente y decide qué mejora aplicar.

Cuando hayas conseguido centrar los textos, adjunta `ai/instrucciones.md`, `ai/skills/review-code.md` y tu `lib/main.dart` actualizado. Envía este mensaje, sustituyendo los corchetes por tu explicación:

```text
Sigue instrucciones.md y el procedimiento review-code.md.
Mi objetivo era centrar verticalmente los dos textos de la pantalla.
Este es el cambio que he realizado y por qué: [escribe dos o tres frases].
Al ejecutar la aplicación he observado: [describe dónde aparecen los textos].
Revisa el lib/main.dart que adjunto y valora si el código cumple el objetivo.
Explica una decisión que esté bien justificada y señala como máximo
tres mejoras, indicando dónde están, por qué convienen y cómo comprobarlas.
No modifiques archivos ni añadas paquetes.
Termina con una pregunta sobre el árbol de widgets para comprobar
si entiendo mi código.
```

Si propone una mejora que decides aplicar, haz el cambio tú y compruébalo en la aplicación. Para pedir una segunda revisión, adjunta el archivo actualizado y envía:

```text
Continúa con el procedimiento review-code.md.
He aplicado esta mejora: [describe el cambio y su motivo].
He comprobado lo siguiente en la aplicación: [describe tu comprobación].
Revisa el archivo actualizado y dime si he aplicado bien esa mejora.
No modifiques archivos.
```

## Convertir un procedimiento en una skill descubrible

Un archivo en `ai/skills` sirve como material que adjuntamos explícitamente. Para el descubrimiento por un editor compatible, utilizaremos una carpeta por habilidad y un archivo llamado exactamente `SKILL.md`:

```text
.agents/
└── skills/
    ├── explain-widget/
    │   └── SKILL.md
    ├── give-hints/
    │   └── SKILL.md
    └── review-code/
        └── SKILL.md
```

Crea `.agents` en la raíz de `catalogo_widgets`, al mismo nivel que `ai`, `lib` y `pubspec.yaml`. Dentro, crea la estructura anterior. Copia el contenido de cada archivo de `ai/skills/` al `SKILL.md` de su habilidad y añade al principio los metadatos correspondientes. Por ejemplo, el archivo `.agents/skills/explain-widget/SKILL.md` completo sería:

````markdown
---
name: explain-widget
description: Explica widgets de Flutter con ejemplos mínimos y un ejercicio. Utilizar cuando el estudiante pregunte para qué sirve un widget o una propiedad.
---

# Explicar un widget
1. Pregunta el objetivo si no se ha indicado.
2. Explica para qué sirve con una situación del catálogo.
3. Muestra un ejemplo mínimo e indica dónde colocarlo.
4. Explica las propiedades y la sintaxis nuevas.
5. Señala un error frecuente y cómo reconocerlo.
6. Propón una modificación y espera el intento del estudiante.
No generes una aplicación completa ni modifiques archivos sin que se solicite.
````

Para las otras dos carpetas utiliza estos metadatos, seguidos de su procedimiento anterior:

```yaml
---
name: give-hints
description: Da pistas progresivas para depurar Flutter. Utilizar cuando el estudiante comparta un error o una diferencia entre el resultado esperado y el observado.
---
```

```yaml
---
name: review-code
description: Revisa cambios pequeños de un catálogo de widgets de nivel inicial. Utilizar cuando el estudiante solicite una revisión razonada sin modificar archivos.
---
```

`name` identifica la habilidad y debe coincidir con su carpeta; `description` explica cuándo interesa usarla. Los tres guiones delimitan la cabecera YAML, no son código que deba ejecutarse.

VS Code y Codex documentan `.agents/skills` entre sus ubicaciones de descubrimiento: consulta [skills en VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills) y [skills en Codex](https://learn.chatgpt.com/docs/build-skills). Inicia una sesión nueva si no aparecen. Solicita expresamente la habilidad por su nombre y comprueba el procedimiento utilizado; que esté disponible no garantiza que se seleccione en todas las preguntas.

En un chat sin descubrimiento de skills puedes seguir adjuntando el archivo como texto e indicar que lo utilice. El procedimiento es el mismo; cambia la forma de proporcionar el contexto.

### Comprueba el descubrimiento en Copilot de VS Code

Haz esta prueba sin adjuntar ni pegar el contenido de `SKILL.md`: queremos comprobar que el editor encuentra la habilidad en el proyecto.

1. Abre la carpeta `catalogo_widgets` en VS Code y guarda los tres archivos `SKILL.md`.
2. Abre una conversación nueva en el chat de Copilot.
3. Escribe `/skills` para abrir **Configure Skills**. Comprueba que aparecen `explain-widget`, `give-hints` y `review-code`. Abre cada una para verificar que corresponde al archivo de tu proyecto.
4. Vuelve al cuadro del chat y escribe `/`. Busca y selecciona `explain-widget` en las sugerencias. Completa la petición y envíala:

```text
/explain-widget Quiero comprender la propiedad maxLines de Text para mi catálogo.
Muéstrame un ejemplo pequeño y deja una modificación para que la pruebe yo.
No modifiques archivos.
```

**Resultado esperado:** la habilidad aparece en el listado y puedes seleccionarla sin adjuntar su archivo. Después, la respuesta debe seguir su procedimiento: explicación, ejemplo, propiedades, error frecuente y ejercicio pendiente de tu intento. Que aparezca en el listado confirma el descubrimiento; revisar la respuesta permite comprobar cómo se ha aplicado.

Si no aparece, revisa que la ruta sea `.agents/skills/explain-widget/SKILL.md`, que el archivo tenga ese nombre exacto y que su cabecera contenga `name: explain-widget` y una `description`. Comprueba también que has abierto la raíz de `catalogo_widgets` y que utilizas una versión actualizada de VS Code y Copilot. Después abre una conversación nueva y repite la prueba.

Esta comprobación corresponde al chat de Copilot. La [documentación de skills de VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills) explica el listado y su invocación mediante `/`.
