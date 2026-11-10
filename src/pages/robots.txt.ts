import type { APIRoute } from 'astro';
import { isProduction, siteUrl, url } from '../site';

export const GET: APIRoute = () => {
  // Staging: Crawling bewusst NICHT sperren. Nur wenn Suchmaschinen die Seiten abrufen dürfen,
  // sehen sie das <meta name="robots" content="noindex, nofollow"> und lassen sie sicher aus dem Index.
  const body = isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL(url('sitemap.xml'), siteUrl).href}\n`
    : `# Staging/Vorschau – alle Seiten tragen "noindex, nofollow"\nUser-agent: *\nAllow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
