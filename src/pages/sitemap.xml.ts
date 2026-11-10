import type { APIRoute } from 'astro';
import { isProduction, siteUrl, url } from '../site';

const pages = ['', 'impressum/', 'datenschutz/'];

export const GET: APIRoute = () => {
  const entries = isProduction
    ? pages.map((p) => `  <url><loc>${new URL(url(p), siteUrl).href}</loc></url>`).join('\n')
    : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
