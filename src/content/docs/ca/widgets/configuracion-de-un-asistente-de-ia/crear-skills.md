---
title: "3. Skills per a crear components i proves"
sidebar:
  order: 4
---

Una skill guarda un procediment reutilitzable. En lloc de demanar «fes-ho bé», concretarem què vol dir qualitat en el nostre catàleg. Prepararem dos habilitats productives: **`create-component`** i **`test-widget`**; mantindrem també les d’explicació, pistes i revisió.

## Prepara els fitxers

Crea esta estructura en l’arrel del projecte. Cada bloc següent és el contingut complet del seu `SKILL.md`. Els noms de les skills, els fitxers i els identificadors del codi es mantenen igual en les dos versions; les instruccions i peticions estan traduïdes al valencià.

```text
.agents/skills/
├── create-component/SKILL.md
├── test-widget/SKILL.md
├── review-code/SKILL.md
├── explain-widget/SKILL.md
└── give-hints/SKILL.md
```

`name` identifica l’habilitat i coincidix amb la carpeta; `description` indica quan s’ha d’aplicar. Les instruccions del cos definixen el procediment. Si el teu xat no descobrix skills, adjunta el fitxer junt amb `.agents/instrucciones.md`.

## create-component

`.agents/skills/create-component/SKILL.md`

```markdown
---
name: create-component
description: Crea o adapta un component Flutter del catàleg amb paràmetres i estàndards del projecte. Utilitza-la quan es demane implementar o extraure un component.
---

# Crear components del catàleg
Llig el fitxer de destinació, les instruccions del projecte i el comportament demanat.
Si falten dades que canvien l’API pública o el resultat esperat, aclarix-les;
per a decisions menors, seguix les convencions existents.

## Estàndards del projecte
- Tota peça visual es guarda davall de lib/ui/: les compartides en lib/ui/core/ui/
  i les específiques en lib/ui/<funcionalitat>/ui/. No crees altres carpetes
  per a components visuals. Els ViewModels van en ui/<funcionalitat>/view_models/.
- Conserva les classes de pantalla i la infraestructura preparada. No canvies
  el llistat, main.dart ni el mecanisme entre pantalles per a afegir un exemple.
- Utilitza UpperCamelCase per a classes, lowerCamelCase per a membres i
  lower_case_with_underscores.dart per a fitxers. Respecta l’idioma del codi.
- Definix una responsabilitat per component i una API menuda: camps final,
  paràmetres amb nom, required per a dades obligatòries i valors predeterminats
  quan tinguen sentit. Accepta super.key i utilitza constructor const si correspon.
- Preferix StatelessWidget si només rep configuració. Utilitza StatefulWidget
  quan haja de conservar dades pròpies; no inicialitzes eixe estat en build.
- Rep les accions mitjançant callbacks tipats, com VoidCallback?, quan
  corresponga. No executes el callback en construir el widget.
- Expressa les variants visuals amb un paràmetre booleà o enum. Guarda cada
  component reutilitzable en el seu fitxer de lib/ui/core/ui/ i importa’l
  des de la pantalla. Definix l’estil dins del component; no crees temes globals
  ni fitxers d’estils en esta unitat.
- Mantín build sense efectes secundaris. Extrau un widget quan permeta reutilitzar
  una peça o aclarir responsabilitats; evita capes i paquets innecessaris.
- Aporta tooltip a les accions d’icona i descripció a les imatges informatives.
  No comuniques diferències rellevants només amb color.
- Considera text llarg i espai limitat; no fixes dimensions arbitràries
  llevat que formen part de la demostració.

## Entrega i comprovació
Implementa només el que s’ha demanat. Indica el fitxer, els paràmetres i un ús real
en la secció del catàleg, conservant els exemples anteriors. Explica la sintaxi nova.
Identifica quin comportament es podrà comprovar en cada variant.
Executa dart format sobre els fitxers modificats i flutter analyze si pots.
Comunica ordres i resultats reals; si no pots executar-les, indica-ho.
No generes proves extenses si no es demanen: pots proposar els casos útils.
```

## test-widget

`.agents/skills/test-widget/SKILL.md`

```markdown
---
name: test-widget
description: Genera o millora proves de widgets Flutter a partir de requisits observables. Utilitza-la quan es demanen tests de components o variants del catàleg.
---

# Proves precises de widgets
Llig els requisits, el component real, els usos i les proves existents.
No inventes noms de classes, rutes, claus ni comportaments inexistents.
Si falta un criteri d’acceptació essencial, pregunta abans de donar-lo per suposat.

## Dels requisits als casos
Prepara una taula: requisit, configuració/acció, resultat esperat i selector.
Cobrix les variants demanades i els límits rellevants, no combinacions sense sentit.
Cada prova ha de detectar una errada concreta; explica quina.
No deduïsques el resultat esperat copiant la lògica de la implementació.

## Construcció de les proves
- Guarda els tests d’interfície davall de test/ui/, reflectint la ruta de lib/ui/.
- Utilitza flutter_test i testWidgets. Munta el component aïllat amb l’entorn mínim
  necessari, com MaterialApp i Scaffold. No inclogues el llistat del catàleg
  si el requisit tracta del component.
- Organitza preparació, acció i comprovacions. Utilitza noms que descriguen la
  condició i el resultat. Crea una instància nova per a cada cas independent.
- Utilitza find.text, find.byTooltip o find.byKey si són inequívocs. Si hi ha duplicats,
  delimita el selector amb find.descendant; no utilitzes .first per a ocultar
  ambigüitats. Afig una Key estable només quan estiga justificada.
- Comprova contingut i comportament: un callback ha de comptar crides, no només
  existir. Per a la desactivació, comprova que no es crida. Prova els canvis de
  configuració del pare quan siguen part del contracte.
- Si l’estil és un requisit explícit, comprova els valors en l’element corresponent
  i les dos variants; no afirmes que això verifica tot l’aspecte representat.
  No inspecciones detalls privats ni arbres exactes.
- Utilitza pump per a reconstruccions i temps concrets per al comportament temporal.
  Reserva pumpAndSettle per a animacions finites: pot no acabar amb indicadors
  de progrés. No afegisques pauses arbitràries per a fer passar una prova.
- No depengues d’Internet, del rellotge real ni de recursos remots. Aïlla la càrrega
  amb una dependència controlable quan es demane provar imatges o errors de xarxa.
- Comprova l’absència d’excepcions com a complement, mai com a única asserció.
  No canvies el requisit, esborres assercions ni modifiques producció només
  per a aconseguir proves superades. Justifica els ajustos per a facilitar les proves.

## Validació i límits
Entrega fitxers de test executables amb imports reals i sense marcadors pendents.
Executa flutter test amb la ruta concreta i flutter analyze si l’entorn ho permet.
Indica què has executat, el resultat i què queda sense comprovar. No prometes
cobertura completa ni precisió visual perquè les proves passen; assenyala què
requerix revisió manual o proves visuals. Si no has executat, digues-ho expressament.
```

## review-code

`.agents/skills/review-code/SKILL.md`

```markdown
---
name: review-code
description: Revisa components del catàleg segons els requisits i estàndards, sense modificar fitxers. Utilitza-la quan es demane una revisió.
---

# Revisar components
Llig l’objectiu i els fitxers aportats. Comprova que l’API, els exemples i les proves
complixen els requisits. Revisa responsabilitat, paràmetres immutables, callbacks,
const, estil per variant, accessibilitat i espai limitat.
Prioritza les errades de comportament sobre les preferències d’estil. Per a cada
problema, indica fitxer, causa, efecte i una comprovació concreta. Si no hi ha
problemes, digues-ho sense inventar millores ni exigir canvis cosmètics.
No modifiques fitxers en una revisió. Distingix lectura, ordres executades i aspectes
no comprovats. No introduïsques navegació ni arquitectures noves.
```

## explain-widget

`.agents/skills/explain-widget/SKILL.md`

```markdown
---
name: explain-widget
description: Explica un widget o una propietat amb un exemple incremental del catàleg. Utilitza-la per a consultes de comprensió.
---

# Explicar un widget
Situa l’explicació en la secció i el fitxer actuals del catàleg.
Explica el propòsit i les propietats noves. Mostra el fragment mínim i on afegir-lo
sense esborrar les demostracions anteriors. Indica un resultat observable,
un error freqüent i una variació perquè la resolga l’alumne.
No reescrigues l’aplicació ni expliques navegació en esta unitat.
```

## give-hints

`.agents/skills/give-hints/SKILL.md`

```markdown
---
name: give-hints
description: Dona pistes progressives davant d’errors del catàleg. Utilitza-la quan l’alumne demane orientació sense una solució completa.
---

# Donar pistes
Demana el fragment, l’error exacte i el resultat esperat si falten.
Distingix errors d’anàlisi, d’execució i problemes visuals. Dona una pista concreta
sobre el fitxer o la propietat rellevant i espera l’intent de l’alumne.
Si demana la solució, mostra el canvi mínim i explica’n la causa.
No inventes execucions ni reconstruïsques l’aplicació completa.
```

## Prova una petició productiva

Després del tutorial d’estils, aporta el fitxer real i demana:

```text
Utilitza create-component i les instruccions del projecte.
Crea lib/ui/core/ui/etiqueta_catalogo.dart amb EtiquetaCatalogo.
Importa el component des de lib/ui/catalogo/ui/text_ejemplos_pantalla.dart.
Ha de rebre texto obligatori i destacada=false per defecte.
Normal: grandària 16 i pes normal. Destacada: grandària 22 i negreta.
Les dos variants han de mostrar exactament el text rebut.
Conserva la classe de pantalla i afig dos exemples del mateix contingut.
No canvies main.dart ni el llistat. Explica les decisions i valida el canvi.
```

Després aporta la implementació que has acceptat i demana les proves:

```text
Utilitza test-widget sobre l’EtiquetaCatalogo real que adjunte.
Genera test/ui/core/ui/etiqueta_catalogo_test.dart amb els imports del projecte.
Verifica el contingut, el valor predeterminat de destacada, les dos grandàries
i pesos, i que en rebre un altre text del pare s’actualitza el contingut.
Presenta primer la taula de casos. Comprova les dos variants de manera aïllada.
Executa la prova si pots i indica el resultat real i els límits.
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

Com a activitat, aplica `create-component` a una peça menuda que ja hages escrit. Definix dos criteris d’acceptació abans de generar proves amb `test-widget`. Revisa quina errada detectaria cada prova i executa-la. Si no hi ha entorn d’execució, conserva eixa limitació en l’entrega.

Referències: [Effective Dart](https://dart.dev/effective-dart/style) · [Proves de widgets en Flutter](https://docs.flutter.dev/cookbook/testing/widget/introduction).
