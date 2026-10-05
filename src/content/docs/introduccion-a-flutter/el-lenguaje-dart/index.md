---
title: "El lenguaje Dart"
sidebar:
  label: "El lenguaje Dart"
  order: 1
---

**Dart** es un lenguaje de programación moderno, orientado a objetos y con tipado estático, desarrollado por Google. Es el lenguaje utilizado por **Flutter** para implementar la lógica y construir las aplicaciones que desarrollaremos a lo largo del curso.

Su sintaxis comparte muchos conceptos con lenguajes como **Java, JavaScript, C# o Kotlin**, por lo que buena parte de sus estructuras nos resultarán familiares.

Algunas de las características más importantes del lenguaje Dart son:

* **Orientado a objetos**: Dart es un lenguaje orientado a objetos basado en clases. Utilizaremos clases, objetos, constructores, herencia y otros conceptos de POO constantemente en Flutter.
* **Tipado estático**: las variables tienen un tipo determinado, lo que permite detectar numerosos errores antes de ejecutar la aplicación.
* **Inferencia de tipos**: aunque es un lenguaje tipado, Dart puede deducir automáticamente el tipo de muchas variables mediante `var`.

```
var nombre = 'Flutter'; // Dart infiere Stringvar edad = 20;          // Dart infiere int
```

* **Null Safety**: distingue entre variables que pueden contener `null` y aquellas que no, ayudando a prevenir uno de los errores más habituales durante la ejecución.

```
String nombre = 'Ana';String? segundoNombre;
```

* **Todo son objetos**: prácticamente todos los valores con los que trabajamos son objetos, incluidos números, cadenas de texto, funciones y colecciones.
* **Funciones como objetos de primera clase**: podemos almacenar funciones en variables, pasarlas como argumentos y devolverlas desde otras funciones. Esto será especialmente importante en Flutter para trabajar con *callbacks*.
* **Programación asíncrona**: proporciona `Future`, `async` y `await` para realizar operaciones asíncronas de forma sencilla. Será fundamental cuando accedamos a APIs, bases de datos o archivos.

```
final datos = await cargarDatos();
```

* **Colecciones potentes**: incorpora `List`, `Set` y `Map`, junto con operaciones como `map()`, `where()` o `forEach()` para trabajar cómodamente con conjuntos de datos.
* **Compilación adaptada al desarrollo y producción**: Dart está diseñado para proporcionar un **ciclo de desarrollo rápido** y, al mismo tiempo, permitir generar aplicaciones optimizadas para producción. Esta característica es clave para funcionalidades de Flutter como **Hot Reload**.
* **Gestor de paquetes integrado**: mediante **Pub** y el repositorio `pub.dev` podemos incorporar fácilmente librerías y paquetes desarrollados por la comunidad.

En esta unidad conoceremos los **fundamentos de Dart necesarios para trabajar con Flutter**, prestando especial atención a sus características propias y a aquellos elementos que utilizaremos posteriormente en el desarrollo de nuestras aplicaciones.<br>
