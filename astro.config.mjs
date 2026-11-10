// @ts-check
import { defineConfig } from 'astro/config';

// SITE und BASE werden beim Deployment gesetzt (siehe .github/workflows/deploy.yml).
// Lokal: http://localhost:4321/
const site = process.env.SITE || 'http://localhost:4321';
const base = process.env.BASE || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
