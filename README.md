# lottes.dev

Quellcode von [www.lottes.dev](https://www.lottes.dev/) — einem statischen, dreisprachigen
(DE/EN/FR) Blog über Agentic AI, KI-Applikationen und Human-Machine Collaboration.
Gebaut mit [Eleventy](https://www.11ty.dev/), eigenem CSS und ohne Frontend-Framework.

Der Code ist MIT-lizenziert. Wer einen mehrsprachigen Eleventy-Blog aufsetzen will,
kann sich hier bedienen — vor allem beim i18n-Setup, das in den meisten Eleventy-Startern fehlt.

> **Status:** Dies ist meine persönliche Website, kein gepflegtes Theme-Paket.
> Es gibt keine Support-Zusage und keine Rückwärtskompatibilität zwischen Commits.
> Aktuell läuft das Projekt auf Eleventy 2 — eine Migration auf Eleventy 3 steht noch aus.
> Fork und Weiterverwendung sind ausdrücklich erwünscht, Issues und PRs beantworte ich,
> wenn ich Zeit habe.

## Tech Stack

- Eleventy 2
- Nunjucks + Markdown
- Eigenes CSS (Design-Tokens, Light/Dark), keine CSS-Frameworks
- Inter + Source Serif 4 (selbst gehostet via Fontsource)
- Pagefind (Suche)
- Eleventy Navigation + Pagination
- RSS/JSON Feed + ICS Kalender

## Was hier drin steckt

- Dreisprachige Inhalte (DE/EN/FR) mit Sprachwechsel im Header, der auch auf
  Blog-Listings, Tag-Seiten und paginierten Seiten das richtige Pendant findet
- Blog inklusive Tags, Pagination und Feed (RSS + JSON)
- Volltextsuche über Pagefind, ohne externen Dienst
- Design-Token-System mit Light/Dark und `prefers-color-scheme`-Fallback
- Eigene Markdown-Container für Callouts, Alerts, Karten und Zitate
- ICS-Kalender-Ausgabe
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

### Übersetzungen für UI-Texte

- `_data/i18n/de/index.js`
- `_data/i18n/en/index.js`
- `_data/i18n/fr/index.js`

### Sprachwechsel bei Blogposts

Für korrekte Zuordnung derselben Artikel in unterschiedlichen Sprachen wird `translationKey` im Frontmatter verwendet.

Beispiel:

```yaml
translationKey: agent-workflow-in-practice
```

Wenn ein Artikel keine Übersetzung hat, ist der Sprachlink im Header auf der Zielsprache deaktiviert.

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

- Prüfen, ob die betroffenen Posts denselben `translationKey` nutzen.
- Prüfen, ob alle Sprachvarianten im passenden Ordner existieren.

### Pagefind meldet alte/unerwartete URLs

In seltenen Fällen liegen alte Dateien noch in `_site/`.

```bash
rm -rf _site
npm run build
```

## Herkunft

Dieses Projekt ist kein Neubau von Null, sondern das Ergebnis einer Fork-Kette:

1. [**eleventy-base-blog**](https://github.com/11ty/eleventy-base-blog) von Zach Leatherman —
   die Grundstruktur eines Eleventy-Blogs (Tags, Pagination, Feeds).
2. [**eleventy-dsfr**](https://github.com/codegouvfr/eleventy-dsfr) von DINUM/Etalab —
   das mehrsprachige Setup, die Navigations- und Übersetzungslogik sowie die
   Plugin-Auswahl (i18n, Kalender) stammen von hier.
3. **lottes.dev** — das französische Staats-Designsystem (DSFR) wurde vollständig
   entfernt und durch ein eigenes Design-Token-System, eigene Layout-Primitives und
   eigene Komponenten ersetzt. Die CSS- und Komponentenschicht ist damit neu,
   das mehrsprachige Fundament nicht.

Ein paar Kommentare im Code verweisen noch auf das DSFR-Original — sie dokumentieren,
was die jeweilige Datei ersetzt.

## Lizenz

- Code: MIT — siehe [`LICENSE.md`](LICENSE.md). Das Copyright liegt anteilig bei
  DINUM/Etalab (Original-Template) und bei mir.
- Weitere Lizenztexte der übernommenen Bestandteile: `LICENSES/`
- **Nicht mitlizenziert:** Blogartikel unter `content/`, Logos und Bilder in
  `public/img/`. Wenn du das Projekt als Basis nutzt, ersetze diese durch eigene
  Inhalte und tausche die Werte in `_data/metadata.js` aus.
