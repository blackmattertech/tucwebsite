#!/usr/bin/env node
/**
 * Injects preload for critical font (Plus Jakarta Sans 400) into dist/index.html.
 * Run after vite build. Reduces LCP by loading primary font earlier.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const assetsDir = path.join(distDir, 'assets');
const indexPath = path.join(distDir, 'index.html');

const CRITICAL_FONT_PATTERNS = [
  /plus-jakarta-sans-latin-400-normal-[a-zA-Z0-9_-]+\.woff2/,
  /plus-jakarta-sans-latin-600-normal-[a-zA-Z0-9_-]+\.woff2/,
  /plus-jakarta-sans-latin-800-normal-[a-zA-Z0-9_-]+\.woff2/,
];

function run() {
  if (!fs.existsSync(assetsDir)) {
    console.warn('dist/assets not found, skipping font preload');
    return;
  }
  const files = fs.readdirSync(assetsDir);
  const fontFiles = CRITICAL_FONT_PATTERNS
    .map((p) => files.find((f) => p.test(f)))
    .filter(Boolean);
  if (fontFiles.length === 0) {
    return;
  }
  const preloadLines = fontFiles
    .map((f) => `    <link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
    .join('\n');
  if (!fs.existsSync(indexPath)) {
    console.warn('dist/index.html not found');
    return;
  }
  let html = fs.readFileSync(indexPath, 'utf8');
  const marker = '<!-- Fonts: self-hosted via @fontsource';
  if (html.includes(marker)) {
    html = html.replace(marker, `${preloadLines}\n    ${marker}`);
  } else {
    html = html.replace('</head>', `  ${preloadLines}\n  </head>`);
  }
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Font preload injected:', fontFiles.join(', '));
}

run();
