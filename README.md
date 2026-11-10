# Andrea Husak-Ramesohl – Website

OnePager für die **Husak-Ramesohl GmbH**: Vorträge, Workshops und Gesundheitstage zu mentaler Stärke am Arbeitsplatz sowie Sprachaufnahmen.

## Live

| Umgebung | URL | Indexierung |
| --- | --- | --- |
| Staging / Vorschau (GitHub Pages) | **https://andreahusak.github.io/Andrea-Husak/** | `noindex, nofollow` |
| Produktion (später) | z. B. https://www.andreahusak.de/ | `index, follow` |

Jeder Push auf `main` baut und veröffentlicht die Seite automatisch über GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

## Technik

- [Astro](https://astro.build) (statisch, kein JavaScript-Framework)
- Schriften **Newsreader** (Headlines) und **Figtree** (Text), lokal gehostet über Fontsource – keine Verbindung zu Google-Servern
- Porträt wird beim Build automatisch in AVIF/WebP und mehreren Größen ausgeliefert
- Signet als Vektor (SVG) aus dem Original-Logo nachgezeichnet, Favicons daraus erzeugt

```
src/
  assets/       Signet (SVG) und Porträt
  components/   Header, Footer
  layouts/      Base (Meta, SEO, Indexierung), Legal (Rechtsseiten)
  lib/site.ts   Kontaktdaten + Indexierungs-Logik
  pages/        index, impressum, datenschutz, robots.txt, sitemap.xml
scripts/        einmalige Helfer (Logo vektorisieren, Favicons erzeugen)
```

## Lokal entwickeln

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # Ausgabe in dist/
```

## Suchmaschinen-Indexierung (automatisch)

Staging wird **nicht** indexiert, die Produktions-Domain **schon** – ohne manuelles Umschalten.

1. **Beim Build:** Der Workflow liest über `actions/configure-pages` die tatsächliche Pages-Adresse aus und übergibt sie als `SITE_URL`/`BASE_PATH`. [src/lib/site.ts](src/lib/site.ts) entscheidet:
   - Host endet auf `github.io`, `pages.dev`, `netlify.app`, `vercel.app` oder ist `localhost` → `<meta name="robots" content="noindex, nofollow">`, leere Sitemap
   - jede andere Domain → `index, follow`, Canonical-Link, `sitemap.xml`, Sitemap-Eintrag in `robots.txt`
2. **Zur Laufzeit (Sicherheitsnetz):** Ein kleines Inline-Script setzt auf Staging-Hosts immer `noindex` und entfernt den Canonical-Link – auch wenn ein Produktions-Build versehentlich unter einer Vorschau-Adresse läuft.

`robots.txt` sperrt auf Staging bewusst **nicht** das Crawling: Nur wenn Google die Seite abrufen darf, sieht es das `noindex` und lässt sie zuverlässig aus dem Index.

Optional lässt sich Indexierung mit der Umgebungsvariable `FORCE_NOINDEX=true` auch auf einer eigenen Domain abschalten.

### Umzug auf die Produktions-Domain

1. Im Repo unter **Settings → Pages → Custom domain** z. B. `www.andreahusak.de` eintragen.
2. Beim Domain-Anbieter einen CNAME-Eintrag `www` → `andreahusak.github.io` setzen.
3. Workflow einmal neu laufen lassen (Actions → „Deploy to GitHub Pages“ → *Run workflow*) oder etwas pushen.

Der nächste Build erkennt die eigene Domain automatisch und schaltet die Indexierung frei.

## Offene Punkte

- **Impressum und Datenschutz enthalten Platzhaltertexte** und müssen vor dem Livegang durch rechtlich geprüfte Texte ersetzt werden.
- Telefonnummer stammt aus dem Portfolio 2026 (+49 172 7144544); die alte Website nennt noch +49 151 236 166 93.
