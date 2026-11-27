// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

// The markpitt.dev chrome kit (header, footer, tokens). A release copies it into src/chrome/;
// in the monorepo it is read from the one shared copy at the root. Both resolve through the
// same alias, so a dev build and a release build read the same files.
const vendored = fileURLToPath(new URL("./src/chrome", import.meta.url));
const shared = fileURLToPath(new URL("../site-chrome", import.meta.url));
const chrome = existsSync(vendored) ? vendored : shared;

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
    resolve: { alias: { "@chrome": chrome } },
  },
});
