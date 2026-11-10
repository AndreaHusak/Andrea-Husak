// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL und BASE_PATH setzt der GitHub-Actions-Workflow automatisch
// (aus actions/configure-pages). Lokal wird localhost verwendet.
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
