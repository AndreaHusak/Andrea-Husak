// Zentrale Seiten- und Indexierungs-Konfiguration.
//
// Indexierung erfolgt NUR, wenn die Seite für eine der Produktions-Domains gebaut wird.
// Jede andere Adresse (GitHub Pages, localhost, Vorschau-Deployments) erhält automatisch
// <meta name="robots" content="noindex, nofollow"> und eine sperrende robots.txt.
export const PRODUCTION_HOSTS = ['andreahusak.de', 'www.andreahusak.de'];

export const siteUrl = new URL(import.meta.env.SITE ?? 'http://localhost:4321');
export const isProduction = PRODUCTION_HOSTS.includes(siteUrl.hostname);

/** Pfad relativ zur Base (z. B. /Andrea-Husak/) auflösen */
export const url = (path = '') =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

export const contact = {
  name: 'Andrea Husak-Ramesohl',
  company: 'Husak-Ramesohl GmbH',
  email: 'mail@andreahusak.de',
  phone: '+49 151 236 166 93',
  phoneHref: 'tel:+4915123616693',
  phoneNote: 'Bitte hinterlassen Sie eine Nachricht auf der Mailbox – SMS kann ich nicht empfangen.',
  street: 'Am Waldrain 8',
  city: '71120 Grafenau',
  court: 'Amtsgericht Stuttgart',
  hrb: 'HRB 794114',
  vat: 'DE367491555',
  claim: 'Beweglich im Kopf, stark im Alltag.',
};
