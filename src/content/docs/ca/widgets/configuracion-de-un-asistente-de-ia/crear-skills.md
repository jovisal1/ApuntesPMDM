---
title: "3. Crear habilitats per a explicar, depurar i revisar"
description: "3. Crear habilitats per a explicar, depurar i revisar · Assistent d’IA i catàleg de widgets per a 2n de DAM."
sidebar:
  order: 4
---

## Comença pel procediment

En una pràctica repetim peticions semblants: «explica’m este widget», «dona’m una pista» o «revisa este canvi». Una **skill** guarda un procediment per a no haver de redactar-lo de nou cada vegada. No és una funció de Dart i no apareix en l’arbre de widgets.

Primer utilitzarem tres fitxers de text des de qualsevol xat. Després veurem com adaptar-ne el format per a un assistent que descobrisca skills. 

En este apartat apareixen dos carpetes amb funcions distintes, les dos en l’arrel de `catalogo_widgets`:

| Carpeta | Per a què la utilitzarem |
| --- | --- |
| `ai/skills/` | Guardar els procediments com a fitxers Markdown que proporcionem a l’assistent manualment. És la carpeta `ai` que vam crear en l’apartat 1, **sense punt davant**. |
| `.agents/skills/` | Guardar les habilitats amb el format `nom/SKILL.md` perquè un assistent compatible puga descobrir-les automàticament. La carpeta `.agents` **sí que porta punt davant**. |

Comença creant els fitxers següents dins de `ai/skills`. Al final de l’apartat prepararem la seua versió en `.agents/skills`.

## Explicar un widget

Contingut de `ai/skills/explain-widget.md`:

```markdown
# Explicar un widget
Utilitza este procediment quan et demane comprendre un widget de Flutter.
1. Pregunta què vull aconseguir si no he indicat l’objectiu.
2. Explica per a què servix amb una situació del catàleg.
3. Mostra un exemple mínim i indica on es pot col·locar.
4. Explica les propietats i la sintaxi emprades.
5. Assenyala un error freqüent i com reconéixer-lo.
6. Proposa una modificació menuda i espera el meu intent.
No generes una pantalla completa si és suficient un fragment.
```

Adjunta al xat `ai/instrucciones.md` i `ai/skills/explain-widget.md`. Després pregunta:

```text
Seguix instrucciones.md i el procediment explain-widget.md.
Vull comprendre la propietat maxLines de Text per al meu catàleg.
Mostra’m un exemple menut i deixa una modificació perquè la prove jo.
```

Has de poder indicar què passa si el text no cap. Per a comprovar-ho, utilitza una amplària limitada: si sobra espai, canviar `maxLines` pot no produir una diferència visible.

## Donar pistes per a depurar

Contingut de `ai/skills/give-hints.md`:

```markdown
# Donar pistes per a depurar
Utilitza este procediment quan compartisca un error o un resultat inesperat.
1. Demana el fragment, el resultat esperat i l’observat si falten.
2. Distingix un error de l’analitzador d’un problema visual o d’execució.
3. Assenyala la zona que he de revisar sense donar la solució completa.
4. Dona una primera pista i espera que compartisca el meu intent.
5. Si continue bloquejat, oferix una pista més concreta.
6. Quan sol·licite la solució, mostra el canvi mínim i explica’n la causa.
No inventes una execució ni reescrigues tot el projecte.
```

Prova amb l’alineació de `Column` de l’apartat anterior. Indica què veus en pantalla i què esperaves veure. «No funciona» dona menys informació que «els dos textos apareixen dalt i vull que el conjunt quede centrat verticalment».


Si ja has centrat els textos, elimina temporalment la propietat `mainAxisAlignment` de la `Column` de `lib/main.dart`, guarda i comprova que tornen a aparéixer dalt. Adjunta al xat `ai/instrucciones.md`, `ai/skills/give-hints.md` i el `lib/main.dart` actual. Després envia:

```text
Seguix instrucciones.md i el procediment give-hints.md.
En lib/main.dart tinc dos textos dins d’una Column.
En executar l’aplicació apareixen dalt, però vull que el conjunt
quede centrat verticalment en el cos de la pantalla.
Llig el fitxer que adjunte i dona’m només una primera pista.
No escrigues la solució ni modifiques fitxers. Espera que prove un canvi.
```

Prova la pista en `lib/main.dart` i executa l’aplicació. Si necessites més ajuda, completa els claudàtors amb la teua experiència i envia:

```text
Continua amb el procediment give-hints.md.
He provat este canvi: [explica quina propietat o valor has canviat].
Ara observe el següent: [descriu el resultat en l’aplicació].
T’adjunte el meu lib/main.dart actualitzat.
Dona’m una pista més concreta, sense resoldre encara l’exercici.
```

## Revisar un canvi

Contingut de `ai/skills/review-code.md`:

```markdown
# Revisar codi de nivell inicial
Utilitza este procediment quan et demane revisar un canvi del meu catàleg.
1. Llig l’objectiu del canvi i els fitxers que he proporcionat.
2. Comprova si el comportament proposat complix eixe objectiu.
3. Explica una decisió del codi que estiga ben justificada.
4. Assenyala com a màxim tres millores, ordenades per importància.
5. Per a cada millora, indica el lloc, el motiu i com comprovar-la.
6. Acaba amb una pregunta sobre l’arbre de widgets.
Revisa noms, indentació, duplicació, ús de const i composició.
No modifiques fitxers ni introduïsques paquets o arquitectures avançades.
Distingix les comprovacions executades de la lectura del codi.
```

Abans de demanar la revisió, escriu tu una explicació de dos o tres frases sobre el canvi. Després compara què has raonat amb els comentaris de l’assistent i decidix quina millora aplicar.


Quan hages aconseguit centrar els textos, adjunta `ai/instrucciones.md`, `ai/skills/review-code.md` i el teu `lib/main.dart` actualitzat. Envia este missatge, substituint els claudàtors per la teua explicació:

```text
Seguix instrucciones.md i el procediment review-code.md.
El meu objectiu era centrar verticalment els dos textos de la pantalla.
Este és el canvi que he fet i per què: [escriu dos o tres frases].
En executar l’aplicació he observat: [descriu on apareixen els textos].
Revisa el lib/main.dart que adjunte i valora si el codi complix l’objectiu.
Explica una decisió que estiga ben justificada i assenyala com a màxim
tres millores, indicant on estan, per què convenen i com comprovar-les.
No modifiques fitxers ni afiges paquets.
Acaba amb una pregunta sobre l’arbre de widgets per a comprovar
si entenc el meu codi.
```

Si proposa una millora que decidixes aplicar, fes el canvi tu i comprova’l en l’aplicació. Per a demanar una segona revisió, adjunta el fitxer actualitzat i envia:

```text
Continua amb el procediment review-code.md.
He aplicat esta millora: [descriu el canvi i el seu motiu].
He comprovat el següent en l’aplicació: [descriu la teua comprovació].
Revisa el fitxer actualitzat i dis-me si he aplicat bé eixa millora.
No modifiques fitxers.
```

## Convertir un procediment en una skill descobrible

Un fitxer en `ai/skills` servix com a material que adjuntem explícitament. Per al descobriment per un editor compatible, utilitzarem una carpeta per habilitat i un fitxer anomenat exactament `SKILL.md`:

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

Crea `.agents` en l’arrel de `catalogo_widgets`, al mateix nivell que `ai`, `lib` i `pubspec.yaml`. Dins, crea l’estructura anterior. Copia el contingut de cada fitxer de `ai/skills/` al `SKILL.md` de la seua habilitat i afig al principi les metadades corresponents. Per exemple, el fitxer `.agents/skills/explain-widget/SKILL.md` complet seria:

````markdown
---
name: explain-widget
description: Explica widgets de Flutter amb exemples mínims i un exercici. Utilitzar quan l’estudiant pregunte per a què servix un widget o una propietat.
---

# Explicar un widget
1. Pregunta l’objectiu si no s’ha indicat.
2. Explica per a què servix amb una situació del catàleg.
3. Mostra un exemple mínim i indica on col·locar-lo.
4. Explica les propietats i la sintaxi noves.
5. Assenyala un error freqüent i com reconéixer-lo.
6. Proposa una modificació i espera l’intent de l’estudiant.
No generes una aplicació completa ni modifiques fitxers sense que se sol·licite.
````

Per a les altres dos carpetes utilitza estes metadades, seguides del seu procediment anterior:

```yaml
---
name: give-hints
description: Dona pistes progressives per a depurar Flutter. Utilitzar quan l’estudiant compartisca un error o una diferència entre el resultat esperat i l’observat.
---
```

```yaml
---
name: review-code
description: Revisa canvis menuts d’un catàleg de widgets de nivell inicial. Utilitzar quan l’estudiant sol·licite una revisió raonada sense modificar fitxers.
---
```

`name` identifica l’habilitat i ha de coincidir amb la carpeta; `description` explica quan interessa usar-la. Els tres guions delimiten la capçalera YAML, no són codi que haja d’executar-se.

VS Code i Codex documenten `.agents/skills` entre les ubicacions de descobriment: consulta [skills en VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills) i [skills en Codex](https://learn.chatgpt.com/docs/build-skills). Inicia una sessió nova si no apareixen. Sol·licita expressament l’habilitat pel nom i comprova el procediment utilitzat; que estiga disponible no garantix que se seleccione en totes les preguntes.

En un xat sense descobriment de skills pots continuar adjuntant el fitxer com a text i indicar que l’utilitze. El procediment és el mateix; canvia la forma de proporcionar el context.

### Comprova el descobriment en Copilot de VS Code

Fes esta prova sense adjuntar ni apegar el contingut de `SKILL.md`: volem comprovar que l’editor troba l’habilitat en el projecte.

1. Obri la carpeta `catalogo_widgets` en VS Code i guarda els tres fitxers `SKILL.md`.
2. Obri una conversa nova en el xat de Copilot.
3. Escriu `/skills` per a obrir **Configure Skills**. Comprova que apareixen `explain-widget`, `give-hints` i `review-code`. Obri cada una per a verificar que correspon al fitxer del teu projecte.
4. Torna al quadre del xat i escriu `/`. Busca i selecciona `explain-widget` en els suggeriments. Completa la petició i envia-la:

```text
/explain-widget Vull comprendre la propietat maxLines de Text per al meu catàleg.
Mostra’m un exemple menut i deixa una modificació perquè la prove jo.
No modifiques fitxers.
```

**Resultat esperat:** l’habilitat apareix en la llista i pots seleccionar-la sense adjuntar el fitxer. Després, la resposta ha de seguir el seu procediment: explicació, exemple, propietats, error freqüent i exercici pendent del teu intent. Que aparega en la llista confirma el descobriment; revisar la resposta permet comprovar com s’ha aplicat.

Si no apareix, revisa que la ruta siga `.agents/skills/explain-widget/SKILL.md`, que el fitxer tinga eixe nom exacte i que la capçalera continga `name: explain-widget` i una `description`. Comprova també que has obert l’arrel de `catalogo_widgets` i que utilitzes una versió actualitzada de VS Code i Copilot. Després obri una conversa nova i repetix la prova.

Esta comprovació correspon al xat de Copilot. La [documentació de skills de VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills) explica la llista i la invocació mitjançant `/`.
