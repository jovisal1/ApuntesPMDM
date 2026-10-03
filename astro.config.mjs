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
              label: "Widgets",
              translations: { ca: "Widgets" },
              items: [{ autogenerate: { directory: "widgets" } }],
            },
            {
              label: "Formularios y navegación",
              translations: { ca: "Formularis i navegació" },
              items: [
                { autogenerate: { directory: "formularis-i-navegacio" } },
              ],
            },
            {
              label: "Gestión del estado",
              translations: { ca: "Gestió de l'estat" },
              items: [{ autogenerate: { directory: "gestio-de-l-estat" } }],
            },
            {
              label: "Persistencia",
              translations: { ca: "Persistència" },
              items: [{ autogenerate: { directory: "persistencia" } }],
            },
            {
              label: "Paquetes y recursos",
              translations: { ca: "Paquets i recursos" },
              items: [{ autogenerate: { directory: "paquets-i-recursos" } }],
            },
            {
              label: "Desarrollo de juegos en 2D y 3D",
              translations: { ca: "Desenvolupament de jocs en 2D i 3D" },
              items: [
                { autogenerate: { directory: "desenvolupament-de-jocs" } },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
