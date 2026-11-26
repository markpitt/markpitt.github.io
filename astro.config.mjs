// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://markpitt.dev",
  output: "static",
  // #30. Astro 7 defaults this to 'jsx', which strips whitespace between inline elements.
  // This restores the v6 behaviour, measured, and pinned by tests/e2e/astro-7.spec.ts.
  // See docs/specs/astro-7.md for the ruling.
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
