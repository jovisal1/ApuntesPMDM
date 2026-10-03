# Apuntes de PMDM · 2.º DAM

Documentación de **Programación Multimedia y Dispositivos Móviles**, creada con [Astro](https://astro.build/), [Starlight](https://starlight.astro.build/) y el tema [Starlight Black](https://starlight-theme-black.vercel.app/).

## Desarrollo local

Requiere Node.js 22.12.0 o superior.

```sh
npm install
npm run dev
```

Abre la dirección que indique Astro en la terminal (habitualmente `http://localhost:4321/ApuntesPMDM/`).

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run dev` | Iniciar el servidor de desarrollo. |
| `npm run check` | Comprobar los tipos y la configuración de Astro. |
| `npm run build` | Generar la web estática en `dist/`, incluido el índice de búsqueda. |
| `npm run preview` | Previsualizar la compilación. |

## Añadir documentación

Las páginas se escriben en Markdown (`.md`) o MDX (`.mdx`) dentro de `src/content/docs/`. Cada sección genera automáticamente sus entradas en el menú lateral.

| Sección en valenciano | Carpeta |
| --- | --- |
| Widgets | `widgets/` |
| Formularis i navegació | `formularis-i-navegacio/` |
| Gestió de l'estat | `gestio-de-l-estat/` |
| Persistència | `persistencia/` |
| Paquets i recursos | `paquets-i-recursos/` |
| Desenvolupament de jocs en 2D i 3D | `desenvolupament-de-jocs/` |

Por ejemplo, crea `src/content/docs/widgets/primera-unidad.md`:

```md
---
title: Primera unidad
description: Descripción breve de la unidad.
sidebar:
  order: 2
---

## Introducción

Contenido de la unidad.
```

La portada está en `src/content/docs/index.mdx` y la configuración del sitio en `astro.config.mjs`.

## Idiomas

El castellano se publica en `/ApuntesPMDM/` y el valenciano en `/ApuntesPMDM/ca/`, con selector de idioma, navegación e interfaz traducidas.

Para traducir una página, conserva su ruta relativa dentro de `src/content/docs/ca/`. Por ejemplo, la traducción de `widgets/primera-unidad.md` se guarda en `ca/widgets/primera-unidad.md`. Si falta una traducción, Starlight muestra el contenido en castellano con un aviso.

Las traducciones de la interfaz en valenciano están en `src/content/i18n/ca.json`. Los enlaces internos del contenido deben incluir `/ApuntesPMDM/` y, en valenciano, `/ApuntesPMDM/ca/`.

## GitHub Pages

El sitio está configurado para **https://jovisal1.github.io/ApuntesPMDM/**.

En GitHub, selecciona **Settings → Pages → Build and deployment → Source → GitHub Actions**. Como el despliegue se ejecuta en cualquier rama, el entorno **Settings → Environments → github-pages** debe permitir las ramas desde las que quieras publicar.

El workflow `.github/workflows/deploy.yml` comprueba el proyecto, genera la web y la publica automáticamente con **cada push a cualquier rama**. También puede ejecutarse manualmente desde Actions. La versión publicada corresponde al push que despliegue el workflow; incluye `package-lock.json` en los commits para instalar las dependencias de forma reproducible.
