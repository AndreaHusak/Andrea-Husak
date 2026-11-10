import type { APIRoute } from 'astro';
import { isIndexable, absolute } from '../lib/site';

export const GET: APIRoute = () => {
  // Staging: Crawling bewusst NICHT sperren – nur so können Suchmaschinen das
  // noindex-Meta-Tag lesen und die Seite zuverlässig aus dem Index lassen.
  const body = isIndexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${absolute('sitemap.xml')}\n`
    : `# Staging/Vorschau: alle Seiten tragen "noindex, nofollow"\nUser-agent: *\nAllow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
