// Erzeugt zugeschnittenes Signet-SVG (currentColor) + Favicons aus src/assets/signet.svg.
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const raw = readFileSync('src/assets/signet.svg', 'utf8');
const { info } = await sharp(Buffer.from(raw)).flatten({ background: '#fff' }).trim().toBuffer({ resolveWithObject: true });
const x = -info.trimOffsetLeft, y = -info.trimOffsetTop, w = info.width, h = info.height;
const path = raw.match(/<path[^>]*d="([^"]+)"/)[1];
const pad = 8;
const vb = `${x - pad} ${y - pad} ${w + 2 * pad} ${h + 2 * pad}`;
writeFileSync('src/assets/signet.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><path fill="currentColor" fill-rule="evenodd" d="${path}"/></svg>\n`);
const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><path fill="#02947D" fill-rule="evenodd" d="${path}"/></svg>\n`;
writeFileSync('public/favicon.svg', fav);
for (const [name, size, bg] of [['apple-touch-icon.png', 180, '#ffffff'], ['icon-512.png', 512, '#ffffff'], ['favicon-32.png', 32, null]]) {
  const inner = Math.round(size * (bg ? 0.72 : 1));
  const img = await sharp(Buffer.from(fav)).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: bg ?? { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: img, gravity: 'center' }]).png().toFile('public/' + name);
}
console.log('viewBox', vb);
