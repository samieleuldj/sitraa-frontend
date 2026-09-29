import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(__dirname, 'communes-source.json');
const outPath = path.join(__dirname, '../src/data/communes-by-wilaya.json');

const raw = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const map = {};

for (const commune of raw) {
  const code = String(commune.wilaya_id).padStart(2, '0');
  if (!map[code]) map[code] = [];
  map[code].push(commune.ar_name || commune.name);
}

for (const code of Object.keys(map)) {
  map[code].sort((a, b) => a.localeCompare(b, 'ar'));
}

fs.writeFileSync(outPath, JSON.stringify(map));
console.log(`Wrote ${Object.keys(map).length} wilayas, ${raw.length} communes`);
