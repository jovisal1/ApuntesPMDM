---
title: "Introducció a Flutter"
sidebar:
  label: "Introducció"
  order: 1
---

El desenvolupament d'aplicacions mòbils és fonamental en el món actual ja que facilita la vida quotidiana en millorar processos i tasques que realitzem diàriament. Estes aplicacions ens permeten gestionar les nostres finances, organitzar el treball, aprendre o comunicar-nos de manera senzilla i immediata. A causa de la seua importància, l'assignatura de **Programació Multimèdia i Dispositius Mòbils** se centra en ensenyar el necessari per a ser capaços de dissenyar i desenvolupar aplicacions que puguen funcionar en dispositius mòbils.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2F3xUnXi4uVVuk35lr65s5%2FLogoAssignatura.jpg?alt=media&amp;token=f6427cd8-acf5-4037-801d-c676830b4788" alt="" width="375"><figcaption></figcaption></figure>

## Enfocaments per al desenvolupament multiplataforma

Amb l'objectiu de reduir el desenvolupament específic per a cada plataforma i, per tant, els costos associats, han aparegut diferents solucions per a crear aplicacions multiplataforma. Moltes d'elles tenen el seu origen en les tecnologies web.

Podem distingir diferents aproximacions:

* **Aplicacions web adaptables**: aplicacions desenvolupades amb tecnologies web com HTML, CSS i JavaScript, amb una interfície que s'adapta al dispositiu en el qual es visualitzen mitjançant tècniques de disseny *responsive*. S'executen directament en el navegador, per la qual cosa permeten mantindre una única base de codi. No obstant això, la seua integració amb el sistema operatiu i el maquinari del dispositiu és més limitada que en una aplicació nativa.
* **Aplicacions híbrides**: són aplicacions desenvolupades principalment amb tecnologies web que s'executen dins d'un component natiu denominat *WebView*. Això permet distribuir-les com a aplicacions convencionals i accedir a determinades característiques del dispositiu, com la ubicació o l'acceleròmetre. Un dels frameworks més coneguts per a esta mena de desenvolupament és **Ionic**, que pot utilitzar-se juntament amb tecnologies com Angular, React o Vue.
* **Aplicacions web progressives (PWA)**: continuen sent aplicacions web, però incorporen tecnologies com els *Service Workers* que permeten aproximar el seu comportament al d'una aplicació nativa. Entre altres característiques, poden oferir funcionament sense connexió o amb connectivitat limitada, instal·lació en el dispositiu i notificacions.

Encara que estes solucions permeten reutilitzar gran part del codi, continuen depenent en major o menor mesura de tecnologies pròpies de la web.

Una altra aproximació consisteix a utilitzar **frameworks multiplataforma** capaços de generar aplicacions per a diferents sistemes operatius a partir d'una mateixa base de codi.

Entre les tecnologies més conegudes trobem:

* **React Native** i **NativeScript**: utilitzen JavaScript o TypeScript i permeten construir aplicacions mòbils mitjançant components proporcionats pel propi framework, evitant que tota la interfície depenga d'un *WebView*.
* **Flutter**: framework creat per Google que utilitza **Dart** com a llenguatge de programació i permet desenvolupar aplicacions per a Android, iOS, web i sistemes d'escriptori a partir d'una mateixa base de codi.

## Flutter

[**Flutter**](https://flutter.dev/) és un kit de desenvolupament de programari (SDK) i un **framework** de codi obert **creat per Google** en 2017 per al desenvolupament d'aplicacions multiplataforma amb un únic codi base.&#x20;

Encara que el seu nucli està desenvolupat en C++, Flutter utilitza el llenguatge de programació **Dart**. Este és un **llenguatge modern orientat a objectes** amb una **sintaxi similar a la de JavaScript** cosa que el fa accessible per a desenvolupadors amb experiència en este llenguatge.

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2Fd0CTDmDJAvB1d4HdYwCA%2Fimage.png?alt=media&amp;token=df776664-192c-4e62-b023-510c436001de" alt="" width="375"><figcaption></figcaption></figure>

Tal com es defineix en el seu [blog oficial](https://dart.dev/), Dart es caracteritza per:

* **Accessible**: Dart ofereix un **sistema de tipus** estàtic i dinàmic, suport per a **programació asincrònica** amb *`async`* i *`await`*, i característiques pròpies d'un llenguatge modern com la possibilitat de realitzar desestructuracions per mitjà de patrons o la prevenció d'errors derivats d'assignar el valor null a variables.&#x20;
* **Que permet un desenvolupament més fluid**: una de les característiques més importants de Dart és el "**Hot Reload**" que permet que **qualsevol canvi realitzat en el codi es reflectisca immediatament** en l'aplicació en execució, sense necessitat de reiniciar-la completament. Això no sols agilita el procés de desenvolupament, sinó que també facilita una iteració més eficient.
* **Portable i de ràpida execució**: Dart disposa **del seu propi SDK**, en el qual, entre altres opcions, ofereix la possibilitat de realitzar compilació just-in-time (JIT) per a desenvolupament i ahead-of-time (AOT) per a producció. Això permet un ràpid temps d'execució i temps d'arrencada ràpids en les aplicacions. A més, pot transformar el codi font en codi natiu per a diversos sistemes operatius, així com en codi JavaScript per a executar-se en navegadors web.&#x20;

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FZXFhRd0bt2iwbwokVhVh%2Fimage.png?alt=media&amp;token=fe256e21-32f4-47f9-a1c7-8c6685c54a32" alt=""><figcaption><p><a href="https://dart.dev/">https://dart.dev/</a></p></figcaption></figure>

Encara que Flutter ofereix molts avantatges, no estem treballant en un entorn completament natiu. Per això, hem de considerar algunes **limitacions**:

* Les noves funcionalitats d'Android o iOS poden tardar cert temps a estar disponibles directament des de Flutter o des dels seus paquets.
* Les aplicacions poden tindre una grandària superior a la d'aplicacions natives equivalents, a causa dels components necessaris per a executar Flutter.
* Encara que el seu rendiment és molt elevat, determinades aplicacions amb necessitats molt específiques de processament, gràfics o integració amb el sistema poden beneficiar-se del desenvolupament natiu.

Quan necessitem accedir a una funcionalitat específica d'una plataforma, Flutter permet **integrar codi natiu**. D'esta forma podem mantindre els avantatges del desenvolupament multiplataforma i, al mateix temps, utilitzar les APIs específiques d'Android, iOS o altres plataformes quan siga necessari.

### Arquitectura de Flutter

Per a entendre com funciona Flutter, necessitem donar una ullada a la seua arquitectura:

<figure><img src="https://3028613194-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fo3ypBHctTBoV6BFwWe0Y%2Fuploads%2FNA7DNuwz5jEBQUbGELzv%2Fimage.png?alt=media&amp;token=8ed82ded-53a1-46ea-9a23-dddba8d348bd" alt=""><figcaption></figcaption></figure>

Com podem observar, esta es compon de tres parts principalment:

* **Framework**: és la capa més accessible per als desenvolupadors, escrita en Dart. Proporciona un conjunt de biblioteques de widgets, eines d'animació i gestió d'estat per a crear la interfície d'usuari.
* **Engine**: escrit en C++, el **motor** s'encarrega de renderitzar gràfics, gestionar gestos i executar el codi Dart. Flutter utilitza **Impeller** com a motor de renderitzat modern en les plataformes compatibles, mantenint altres mecanismes de renderitzat segons la plataforma i configuració.
* **Embedder**: és l'encarregat d'integrar Flutter amb plataformes específiques, com Android, iOS, Windows, entre altres. Gestiona interaccions amb el sistema operatiu, com ara esdeveniments de teclat o ratolí.

### Flutter en web i escriptori

Encara que Flutter va nàixer principalment orientat al desenvolupament d'aplicacions mòbils, actualment permet desenvolupar també per a:

* **Web**
* **Windows**
* **macOS**
* **Linux**

Flutter adapta el seu funcionament a les característiques de cada plataforma, mantenint el mateix model de programació i permetent reutilitzar gran part del codi de l'aplicació.
