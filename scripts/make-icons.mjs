// Run once (node scripts/make-icons.mjs) to regenerate the app icons from the SVG.
import sharp from 'sharp';
const src = new URL('./icon-square.svg', import.meta.url).pathname;
const out = new URL('../public/icons/', import.meta.url).pathname;
for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  await sharp(src, { density: 400 }).resize(size, size).png().toFile(out + name);
}
console.log('icons written');
