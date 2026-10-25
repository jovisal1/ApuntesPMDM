---
title: "8. Provar el formulari"
sidebar:
  order: 9
---

El formulari ja està muntat. Comprovarem que respon correctament tant quan les dades són vàlides com quan estan incompletes, i que una edició no deixa visible un resum antic.

Executa `catalogo_widgets` i obri «Formulario de inscripción». Seguix els casos en ordre i compara el que veus amb el resultat indicat. En este pas comprovarem el comportament abans de donar l’exemple per acabat.

:::tip[Què aconseguirem]
En acabar hauràs revisat la validació, el resum, la lectura del correu, els canvis des del codi i el recorregut del teclat dins del mateix exemple del catàleg.
:::

1. Prem «Previsualizar» sense escriure: han d’aparéixer els errors.
2. Introduïx un nom d’un caràcter i un correu sense `@`: continuen sent incorrectes.
3. Escriu un nom i un correu vàlids: apareix el resum sense espais exteriors.
4. Canvia el nom: el resum anterior desapareix fins que tornes a prémer el botó.

5. Prem «Leer correo» abans de validar: el missatge mostra el text actual.
6. Prem «Usar correo de ejemplo»: canvien el camp i la dada que es previsualitza; desapareix el resum anterior.
7. Reinicia i comprova el focus inicial en Nombre, el salt amb «Siguiente» i el botó «Editar correo».
