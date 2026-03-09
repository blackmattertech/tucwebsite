#!/usr/bin/env node
/**
 * Copy Latin subset of Inter, Montserrat, Khand from node_modules to public/assets/fonts.
 * Run after updating @fontsource packages: npm run copy-fonts
 */
import { cpSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'assets', 'fonts');
const files = [
  ...['400', '500', '600', '700'].map((w) => `inter/files/inter-latin-${w}-normal.woff2`),
  ...['400', '500', '600', '700', '800'].map((w) => `montserrat/files/montserrat-latin-${w}-normal.woff2`),
  ...['400', '500', '600', '700'].map((w) => `khand/files/khand-latin-${w}-normal.woff2`),
];

mkdirSync(out, { recursive: true });
for (const f of files) {
  const src = join(root, 'node_modules', '@fontsource', f);
  if (!existsSync(src)) {
    console.warn('copy-fonts: skip (not found)', f);
    continue;
  }
  const name = f.split('/').pop();
  cpSync(src, join(out, name));
  console.log('copy-fonts:', name);
}
console.log('copy-fonts: done → public/assets/fonts/');
