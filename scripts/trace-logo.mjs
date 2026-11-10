// Vektorisiert das Eichhörnchen-Signet aus Uploads/ zu einem SVG (einmalig ausgeführt).
import sharp from 'sharp';
import potrace from 'potrace';
import { writeFileSync } from 'node:fs';

const src = process.argv[2];
const buf = await sharp(src).resize(1600).grayscale().threshold(160).png().toBuffer();
potrace.trace(buf, { threshold: 128, turdSize: 20, optTolerance: 0.4, color: '#02947D', background: 'transparent' }, (err, svg) => {
  if (err) throw err;
  writeFileSync(process.argv[3], svg);
  console.log('ok', svg.length);
});
