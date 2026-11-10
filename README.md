# Andrea Husak-Ramesohl – Website

OnePager für die **Husak-Ramesohl GmbH**: Vorträge, Workshops und Gesundheitstage zu mentaler Gesundheit am Arbeitsplatz sowie professionelle Sprachaufnahmen.

**Live (Staging):** https://andreahusak.github.io/Andrea-Husak/  
Repository: https://github.com/AndreaHusak/Andrea-Husak

Geplante Produktions-Domain: https://andreahusak.de/

## Technik

- [Astro](https://astro.build) (statische Seite), Schrift *Figtree* lokal eingebunden (kein Google-Fonts-Abruf)
- Deployment automatisch per GitHub Actions auf GitHub Pages bei jedem Push auf `main` ([.github/workflows/deploy.yml](.github/workflows/deploy.yml))

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Ausgabe in dist/
```

## Struktur

| Pfad | Inhalt |
| --- | --- |
| `src/pages/index.astro` | OnePager (Hero, Formate, Themen, Arbeitsweise, Qualifikation, Sprecherin, Kontakt) |
| `src/pages/impressum.astro`, `datenschutz.astro` | Rechtsseiten (**Platzhaltertexte – vor Livegang prüfen**) |
| `src/site.ts` | Kontaktdaten, Produktions-Domains, Indexierungslogik |
| `src/styles/global.css` | Design-Tokens und Styles |
| `src/assets/` | Porträt, Signet (SVG) |

## Suchmaschinen: Staging vs. Produktion

Die Indexierung wird **automatisch** anhand der Domain gesteuert, für die gebaut wird. Es muss nichts manuell umgestellt werden.

| Domain | `<meta name="robots">` | `robots.txt` | Sitemap |
| --- | --- | --- | --- |
| `andreahusak.github.io` (Staging), localhost, jede andere | `noindex, nofollow` | `Allow: /` (damit `noindex` gelesen wird) | leer |
| `andreahusak.de` / `www.andreahusak.de` | `index, follow` + Canonical | `Allow: /` | alle Seiten |

So funktioniert es:

1. Der Workflow liest die Pages-URL über `actions/configure-pages` und übergibt sie als `SITE`/`BASE` an den Build.
2. `src/site.ts` vergleicht den Hostnamen mit `PRODUCTION_HOSTS`. Nur dort wird die Seite indexierbar gebaut.
3. Sicherheitsnetz: Ein kleines Inline-Script setzt `noindex`, falls ein Produktions-Build unter einer anderen Adresse ausgeliefert wird.

**Umzug auf die Produktions-Domain:** In GitHub unter *Settings → Pages → Custom domain* `andreahusak.de` eintragen und DNS setzen. Der nächste Deploy baut automatisch die indexierbare Version. Wird die Seite woanders gehostet, beim Build `SITE=https://andreahusak.de` setzen.

`robots.txt` sperrt auf Staging bewusst nicht das Crawling: Nur wenn Suchmaschinen die Seite abrufen dürfen, sehen sie das `noindex` und nehmen sie zuverlässig nicht in den Index auf.

## Historie

- Basis übernommen von https://waltermelcher.github.io/Andrea-Husak/ (Repo `waltermelcher/Andrea-Husak`), ergänzt um die Sektion *Sprecherin* und die Telefonnummer der bisherigen Website.
- Die erste, eigenständige Glow-up-Version ist als Git-Tag `v1-erste-version` gesichert.
