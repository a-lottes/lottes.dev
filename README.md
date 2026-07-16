# lottes.dev

Statische, mehrsprachige Website (DE/EN/FR) auf Basis von [Eleventy](https://www.11ty.dev/) mit eigenem, schlankem Design.

## Tech Stack

- Eleventy 2
- Nunjucks + Markdown
- Eigenes CSS (Design-Tokens, Light/Dark), keine CSS-Frameworks
- Inter + Source Serif 4 (selbst gehostet via Fontsource)
- Pagefind (Suche)
- Eleventy Navigation + Pagination
- RSS/JSON Feed + ICS Kalender

## Projektziele

- Mehrsprachige Inhalte in Deutsch, Englisch und Franzoesisch
- Saubere Navigation mit Sprachwechsel im Header
- Blog inklusive Tags, Pagination und Feed
- Deployment auf Netlify

## Schnellstart

### Voraussetzungen

- Node.js 20 empfohlen
- npm

### Installation

```bash
git clone https://github.com/a-lottes/lottes.dev.git
cd lottes.dev
npm install
```

### Lokale Entwicklung

```bash
npm start
```

### Build

```bash
npm run build
```

Build-Output liegt in `_site/`.

## NPM Scripts

- `npm start`: lokaler Dev-Server
- `npm run build`: Produktionsbuild (inkl. `postbuild`)
- `npm run debug`: Eleventy Debug-Ausgabe
- `npm run debugstart`: Dev-Server mit Debug-Ausgabe
- `npm run benchmark`: Eleventy Benchmark-Ausgabe

## Wichtige Verzeichnisse

- `content/`: Seiten und Blog-Inhalte pro Sprache
- `_data/`: globale Daten, Metadaten, i18n-Strings
- `_includes/`: Layouts, Templates und Komponenten
- `public/`: statische Assets (CSS, JS, Bilder, Icons)
- `_site/`: generierter Output

## Design

Das CSS liegt in `public/css/` und wird von `_includes/layouts/base.njk` inline gebundelt:

- `tokens.css`: Design-Tokens (Farben, Fonts, Abstände) inkl. Light/Dark
- `fonts.css`: `@font-face` für die selbst gehosteten Schriften
- `base.css`: Reset und Grundelemente
- `layout.css`: Layout-Primitives (`.container`, `.grid`, `.cluster`, `.hero`)
- `prose.css`: Artikeltypografie (`.prose`)
- `components.css`: Header, Nav, Cards, Footer usw.

JavaScript in `public/js/` (vanilla, ohne Dependencies): `theme.js` (Light/Dark/System-Toggle),
`nav.js` (Menüs und Sprachwechsler), `network.js` (animiertes Netzwerk im Hero der Startseiten,
aktiviert über `heroCanvas: true` im Frontmatter).

## Mehrsprachigkeit

### Sprachinhalte

- DE: `content/de/`
- EN: `content/en/`
- FR: `content/fr/`

### Uebersetzungen fuer UI-Texte

- `_data/i18n/de/index.js`
- `_data/i18n/en/index.js`
- `_data/i18n/fr/index.js`

### Sprachwechsel bei Blogposts

Fuer korrekte Zuordnung derselben Artikel in unterschiedlichen Sprachen wird `translationKey` im Frontmatter verwendet.

Beispiel:

```yaml
translationKey: agent-workflow-in-practice
```

Wenn ein Artikel keine Uebersetzung hat, ist der Sprachlink im Header auf der Zielsprache deaktiviert.

## Deployment (Netlify)

Die Netlify-Konfiguration ist in `netlify.toml` hinterlegt:

- Build Command: `npm run build`
- Publish Directory: `_site`
- Node Version: `20`

Wichtig: Im Netlify UI darf Publish Directory nicht auf `public` stehen, sonst wird nur die Asset-Struktur statt der generierten Website ausgeliefert.

## Content-Pflege

### Neue Seite anlegen

1. Datei im passenden Sprachordner unter `content/{lang}/...` erstellen.
2. Frontmatter setzen (`title`, `layout`, optional `eleventyNavigation`).
3. Bei Navigationsseiten `eleventyNavigation` sauber pflegen.

### Neuen Blogpost anlegen

1. Datei in `content/{lang}/blog/posts/` anlegen.
2. Frontmatter mit `title`, `description`, `date`, `tags` setzen.
3. Bei mehrsprachigen Pendants den gleichen `translationKey` verwenden.

## Troubleshooting

### Sprachwechsel zeigt falsche oder deaktivierte Blog-Links

- Pruefen, ob die betroffenen Posts denselben `translationKey` nutzen.
- Pruefen, ob alle Sprachvarianten im passenden Ordner existieren.

### Pagefind meldet alte/unerwartete URLs

In seltenen Faellen liegen alte Dateien noch in `_site/`.

```bash
rm -rf _site
npm run build
```

## Lizenz

- Code: MIT
- Inhalte/Assets: siehe Dateien unter `LICENSES/`
