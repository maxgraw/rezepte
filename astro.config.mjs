import pagefind from "./src/integration/pagefind";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import purgecss from "astro-purgecss";

// https://astro.build/config
export default defineConfig({
    site: 'https://rezepte.maxgraw.com',
    build: {
        format: "file",
    },
    integrations: [pagefind(), sitemap(), purgecss()],
});