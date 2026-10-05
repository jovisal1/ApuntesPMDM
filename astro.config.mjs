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
              items: [{ autogenerate: { directory: "widgets", collapsed: true } }],
            },
            {
              label: "Formularios y navegación",
              collapsed: true,
              translations: { ca: "Formularis i navegació" },
              items: [
                { autogenerate: { directory: "formularis-i-navegacio", collapsed: true } },
              ],
            },
            {
              label: "Gestión del estado",
              collapsed: true,
              translations: { ca: "Gestió de l'estat" },
              items: [{ autogenerate: { directory: "gestio-de-l-estat", collapsed: true } }],
            },
            {
              label: "Persistencia",
              collapsed: true,
              translations: { ca: "Persistència" },
              items: [{ autogenerate: { directory: "persistencia", collapsed: true } }],
            },
            {
              label: "Paquetes y recursos",
              collapsed: true,
              translations: { ca: "Paquets i recursos" },
              items: [{ autogenerate: { directory: "paquets-i-recursos", collapsed: true } }],
            },
            {
              label: "Desarrollo de juegos en 2D y 3D",
              collapsed: true,
              translations: { ca: "Desenvolupament de jocs en 2D i 3D" },
              items: [
                { autogenerate: { directory: "desenvolupament-de-jocs", collapsed: true } },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
