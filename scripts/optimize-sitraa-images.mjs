/**
 * Compress Sitraa product photos for faster deploy + mobile load.
 * Keeps max 1200px width, outputs WebP (~80% smaller).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '../public/products');

const FOLDERS = ['taqm-al-iffa', 'ensemble-two-piece', 'abaya-two-piece'];

async function optimizeFile(filePath) {
  const before = fs.statSync(filePath).size;
  const outPath = filePath.replace(/\.png$/i, '.webp');

  await sharp(filePath)
    .rotate()
    .resize({ width: 1200, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(outPath);

  const after = fs.statSync(outPath).size;
  fs.unlinkSync(filePath);
  console.log(
    `${path.relative(ROOT, filePath)}: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB (.webp)`,
  );
}

async function main() {
  for (const folder of FOLDERS) {
    const dir = path.join(ROOT, folder);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png'));
    for (const file of files) {
      await optimizeFile(path.join(dir, file));
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
