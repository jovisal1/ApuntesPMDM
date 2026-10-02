import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeBlack from "starlight-theme-black";

export default defineConfig({
  site: "https://jovisal1.github.io",
  base: "/ApuntesPMDM",
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "PMDM · 2DAM",
      description: "Apuntes de Programación Multimedia y Dispositivos Móviles de 2.º de DAM.",
      defaultLocale: "root",
      locales: {
        root: { label: "Español", lang: "es" },
        ca: { label: "Valencià", lang: "ca" },
      },
      plugins: [starlightThemeBlack({})],
      sidebar: [
        { label: "Presentación", translations: { ca: "Presentació" }, slug: "presentacion" },
        {
          label: "Apuntes",
          translations: { ca: "Apunts" },
          items: [{ autogenerate: { directory: "apuntes" } }],
        },
        {
          label: "Prácticas",
          translations: { ca: "Pràctiques" },
          items: [{ autogenerate: { directory: "practicas" } }],
        },
        {
          label: "Recursos",
          items: [{ autogenerate: { directory: "recursos" } }],
        },
      ],
    }),
  ],
});
