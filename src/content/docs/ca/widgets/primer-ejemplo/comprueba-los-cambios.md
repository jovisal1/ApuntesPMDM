---
title: "Comprova els canvis durant el desenvolupament"
sidebar:
  order: 9
---

| Operació | Què observaràs en este exemple |
| --- | --- |
| **Hot reload** | Aplica canvis compatibles en la interfície conservant el comptador. En `flutter run`, prem `r`. |
| **Hot restart** | Reinicia l’aplicació Dart i el comptador torna a zero. En `flutter run`, prem `R`. |
| **Parar i executar de nou** | Inicia una nova execució; també és necessari per a aplicar determinats canvis en codi natiu. |

Prova a registrar dos voltes i canviar el text «Voltes completades» per «Voltes de hui». Amb hot reload s’ha de mantindre el dos. Hot reload no torna a executar `main` ni `initState`; els canvis que necessiten repetir la inicialització requerixen un reinici. Consulta la [guia oficial de hot reload](https://docs.flutter.dev/tools/hot-reload).

:::caution[Si alguna cosa no funciona]
Si falla un import, comprova el nom del paquet i la ruta. Si apareix un error en utilitzar `const`, revisa si has inclòs una variable d’execució. Si el botó escriu en la consola però el número no canvia, comprova que modifies el camp de `State` i crides `setState`. Llig el primer error de la consola abans de fer més canvis.
:::
