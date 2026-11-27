# Site chrome kit

The markpitt.dev header, project sub-bar, footer, theme control, tokens, fonts and icons, as Astro
components. The main site and every project site render their chrome from this one kit, so the
nav cannot drift between them.

This folder is the source. `node designs/build.mjs` copies it to `designs/generated/site-chrome/`
with the brand's `tokens.css` added, and `--check` fails if the copy is stale or a stylesheet or
component hard-codes a colour. The generated folder is what the sites take: the monorepo holds one
copy at `site-chrome/`, and each release ships that copy into the twin as `src/chrome/`. Change
the source here, rebuild, then refresh the monorepo copy with `mise run chrome:refresh`.

## Use

```astro
---
import ThemeScript from '../chrome/ThemeScript.astro';
import Header from '../chrome/Header.astro';
import SubBar from '../chrome/SubBar.astro';
import Footer from '../chrome/Footer.astro';
import '../chrome/fonts.css';
import '../chrome/tokens.css';
import '../chrome/chrome.css';
---
<html lang="en-GB">
  <head><ThemeScript /></head>
  <body>
    <a class="mpc-skip" href="#main">Skip to content</a>
    <Header current="projects" />
    <SubBar name="claude-overview" href="/claude-overview/" links={[{ href: '/claude-overview/install/', label: 'Install' }]} />
    <main id="main">…</main>
    <Footer licence="MIT" repo="markpitt/claude-overview" />
  </body>
</html>
```

| File | What it is |
| --- | --- |
| `Header.astro` | Lockup, site nav, theme control and the collapsed menu. Props: `home` (the main site's origin, default `https://markpitt.dev`), `local` (true on the main site's home page, so section links are in-page anchors), `current` (`skills` or `projects`), `position` (`sticky` by default, `fixed` on the main site). |
| `SubBar.astro` | A project's name and its own links. Props: `name`, `href`, `links` (`{ href, label, current? }`), `label`. |
| `Footer.astro` | Name on the left; licence and repository on the right, or the default slot instead. Props: `home`, `local`, `licence`, `repo`. |
| `ThemeScript.astro` | The blocking theme script for `<head>`: same `theme` key and cycle as the main site. System is the absence of `data-theme`. |
| `nav.ts` | The site nav, in order. Adding an item moves the collapse width in `chrome.css`: re-measure it. |
| `chrome.css` | The chrome's styles, tokens only, every rule scoped to a chrome element. |
| `tokens.css` | Generated: the brand tokens, dark by default, light under `[data-theme="light"]` and under a light system preference when no theme is chosen. |
| `fonts.css`, `fonts/` | Inter and JetBrains Mono, self-hosted, OFL. |
| `icons/` | Mark, wordmark, menu and theme icons, inlined by the components. |
