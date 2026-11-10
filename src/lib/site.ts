/**
 * Indexierungs-Steuerung (automatisch, ohne manuelles Umschalten):
 *
 *  - Staging / Vorschau = *.github.io, *.pages.dev, *.netlify.app, *.vercel.app, localhost
 *    -> <meta name="robots" content="noindex, nofollow">
 *  - Produktion = jede andere (eigene) Domain, z. B. www.andreahusak.de -> index, follow
 *
 * Entschieden wird zweimal:
 *  1. beim Build anhand der Ziel-URL (SITE_URL aus dem Deploy-Workflow)
 *  2. zur Laufzeit im Browser anhand von location.hostname (Sicherheitsnetz,
 *     falls derselbe Build unter einer Staging-Adresse ausgeliefert wird)
 */
export const STAGING_HOST_PATTERNS = ['github.io', 'pages.dev', 'netlify.app', 'vercel.app', 'localhost', '127.0.0.1'];

export function isStagingHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return STAGING_HOST_PATTERNS.some((p) => h === p || h.endsWith('.' + p));
}

export const siteUrl = new URL(import.meta.env.SITE);
export const isIndexable = import.meta.env.FORCE_NOINDEX !== 'true' && !isStagingHost(siteUrl.hostname);

/** Pfad inkl. Base (wichtig für die GitHub-Pages-Unteradresse /Andrea-Husak/) */
export function href(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function absolute(path = ''): string {
  return new URL(href(path), siteUrl.origin).href;
}

export const contact = {
  name: 'Andrea Husak-Ramesohl',
  company: 'Husak-Ramesohl GmbH',
  phoneDisplay: '+49 (0)172 7144544',
  phoneHref: 'tel:+491727144544',
  email: ['mail', 'andreahusak.de'].join('@'),
  street: 'Am Waldrain 8',
  city: '71120 Grafenau',
  register: 'Amtsgericht Stuttgart, HRB 794114',
  vat: 'DE367491555',
};
