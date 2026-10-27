import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeRapide from "starlight-theme-rapide";

export default defineConfig({
  site: "https://jovisal1.github.io",
  base: "/ApuntesPMDM",
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "PMDM · 2DAM",
      description:
        "Apuntes de Programación Multimedia y Dispositivos Móviles de 2.º de DAM.",
      defaultLocale: "root",
      locales: {
        root: { label: "Español", lang: "es" },
        ca: { label: "Valencià", lang: "ca" },
      },
      plugins: [starlightThemeRapide({})],
      sidebar: [
        {
          label: "Flutter",
          items: [
            {
              label: "Introducción",
              translations: { ca: "Introducció" },
              slug: "flutter",
            },
            {
              label: "Introducción a Flutter",
              collapsed: true,
              translations: { ca: "Introducció a Flutter" },
              items: [
                { label: "Introducción", translations: { ca: "Introducció" }, slug: "introduccion-a-flutter" },
                {
                  label: "Preparación del entorno",
                  collapsed: true,
                  translations: { ca: "Preparació de l’entorn" },
                  items: [{ autogenerate: { directory: "introduccion-a-flutter/preparacion-del-entorno", collapsed: true } }],
                },
                {
                  label: "El lenguaje Dart",
                  collapsed: true,
                  translations: { ca: "El llenguatge Dart" },
                  items: [{ autogenerate: { directory: "introduccion-a-flutter/el-lenguaje-dart", collapsed: true } }],
                },
                { label: "Actividad", translations: { ca: "Activitat" }, slug: "introduccion-a-flutter/actividad" },
              ],
            },
            {
              label: "Widgets",
              collapsed: true,
              translations: { ca: "Widgets" },
              items: [
                { label: "Introducción", translations: { ca: "Introducció" }, slug: "widgets" },
                {
                  label: "Primer ejemplo",
                  collapsed: true,
                  translations: { ca: "Primer exemple" },
                  items: [{ autogenerate: { directory: "widgets/primer-ejemplo", collapsed: true } }],
                },
                {
                  label: "Configuración de un asistente de IA",
                  collapsed: true,
                  translations: { ca: "Configuració d’un assistent d’IA" },
                  items: [{ autogenerate: { directory: "widgets/configuracion-de-un-asistente-de-ia", collapsed: true } }],
                },
                {
                  label: "Básicos",
                  collapsed: true,
                  translations: { ca: "Bàsics" },
                  items: [
                    { slug: "widgets/basicos" },
                    { slug: "widgets/basicos/estilo-y-variantes" },
                    { slug: "widgets/basicos/text" },
                    { slug: "widgets/basicos/image" },
                    { slug: "widgets/basicos/icon" },
                    { slug: "widgets/basicos/botones" },
                    { slug: "widgets/basicos/placeholder" },
                    { slug: "widgets/basicos/scaffold-y-appbar" },
                    { slug: "widgets/basicos/practica" },
                  ],
                },
                {
                  label: "Contenedores",
                  translations: { ca: "Contenidors" },
                  collapsed: true,
                  items: [{ autogenerate: { directory: "widgets/contenedores", collapsed: true } }],
                },
                {
                  label: "Otros",
                  translations: { ca: "Altres" },
                  collapsed: true,
                  items: [{ autogenerate: { directory: "widgets/otros", collapsed: true } }],
                },
                {
                  label: "Ejemplo con datos",
                  translations: { ca: "Exemple amb dades" },
                  collapsed: true,
                  items: [{ autogenerate: { directory: "widgets/ejemplo-con-datos", collapsed: true } }],
                },
              ],
            },
            {
              label: "Formularios y navegación",
              collapsed: true,
              translations: { ca: "Formularis i navegació" },
              items: [
                { slug: "formularis-i-navegacio" },
                {
                  label: "Formularios",
                  translations: { ca: "Formularis" },
                  collapsed: true,
                  items: [
                    {
                      label: "Elementos de un formulario",
                      translations: { ca: "Elements d’un formulari" },
                      collapsed: true,
                      items: [{ autogenerate: { directory: "formularis-i-navegacio/controles-de-entrada" } }],
                    },
                    {
                      label: "Crear un formulario",
                      translations: { ca: "Crear un formulari" },
                      collapsed: true,
                      items: [{ autogenerate: { directory: "formularis-i-navegacio/formulario-con-viewmodel" } }],
                    },
                    { slug: "formularis-i-navegacio/formularios-actividades" },
                  ],
                },
                {
                  label: "Navegación",
                  translations: { ca: "Navegació" },
                  collapsed: true,
                  items: [
                    { slug: "formularis-i-navegacio/navegacion" },
                    {
                      label: "Navigator",
                      collapsed: true,
                      items: [{
                        slug: "formularis-i-navegacio/navegacion/entre-pantallas",
                        label: "Abrir pantallas y volver",
                        translations: { ca: "Obrir pantalles i tornar" },
                      }],
                    },
                    {
                      label: "Secciones",
                      translations: { ca: "Seccions" },
                      collapsed: true,
                      items: [{
                        slug: "formularis-i-navegacio/navegacion/widgets-de-navegacion",
                        label: "Organizar las secciones",
                        translations: { ca: "Organitzar les seccions" },
                      }],
                    },
                    {
                      label: "Diálogos",
                      translations: { ca: "Diàlegs" },
                      collapsed: true,
                      items: [{
                        slug: "formularis-i-navegacio/navegacion/dialogos",
                        label: "Mostrar diálogos",
                        translations: { ca: "Mostrar diàlegs" },
                      }],
                    },
                    { slug: "formularis-i-navegacio/navegacion/actividades" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
