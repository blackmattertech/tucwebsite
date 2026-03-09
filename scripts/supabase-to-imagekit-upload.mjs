#!/usr/bin/env node
/**
 * Migrate Supabase storage assets to ImageKit.
 * Uploads each asset from its Supabase public URL to ImageKit.
 *
 * Usage:
 *   IMAGEKIT_PRIVATE_KEY=xxx node scripts/supabase-to-imagekit-upload.mjs
 *   IMAGEKIT_PRIVATE_KEY=xxx node scripts/supabase-to-imagekit-upload.mjs --local-fallback=scripts/source-assets
 *
 * --local-fallback=DIR  When URL upload fails, try local file at DIR/{folder}/{fileName}
 *
 * Requires: IMAGEKIT_PRIVATE_KEY (from ImageKit dashboard)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ImageKit from '@imagekit/nodejs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const manifestPath = path.join(projectRoot, 'scripts', 'supabase-to-imagekit-manifest.json');

const SUPABASE_BASE = 'https://vwpseddaghxktpjtriaj.supabase.co/storage/v1/object/public';

/** Map ImageKit folder -> Supabase bucket path (bucket/folder) */
const folderToSupabasePath = {
  capabilities: 'websiteblog%20images/capabilites',
  products: 'website%20videos/products',
  tagfactor: 'website%20videos/tagfactor',
  'client-logos': 'website%20images/client-logos',
  herosection: 'website%20videos/herosection',
  principles: 'website%20images/our%20principles',
};

function buildSupabaseUrl(folder, fileName) {
  const supabasePath = folderToSupabasePath[folder];
  if (!supabasePath) throw new Error(`Unknown folder: ${folder}`);
  const encodedFileName = encodeURIComponent(fileName);
  return `${SUPABASE_BASE}/${supabasePath}/${encodedFileName}`;
}

function getLocalFallbackDir() {
  const arg = process.argv.find((a) => a.startsWith('--local-fallback='));
  if (!arg) return null;
  const dir = arg.split('=')[1];
  return path.isAbsolute(dir) ? dir : path.join(projectRoot, dir);
}

async function main() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const localFallbackDir = getLocalFallbackDir();

  if (!privateKey) {
    console.error('Missing IMAGEKIT_PRIVATE_KEY. Set it in env or .env');
    process.exit(1);
  }

  if (localFallbackDir) {
    console.log(`Local fallback: ${localFallbackDir}\n`);
  }

  const imagekit = new ImageKit({ privateKey });
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const results = [];
  let ok = 0;
  let fail = 0;

  for (let i = 0; i < manifest.length; i++) {
    const { folder, fileName } = manifest[i];
    const supabaseUrl = buildSupabaseUrl(folder, fileName);
    const key = `${folder}/${fileName}`;
    let uploaded = false;

    try {
      const data = await imagekit.files.upload({
        file: supabaseUrl,
        fileName,
        folder,
        useUniqueFileName: false,
        overwriteFile: true,
      });
      results.push({ key, url: data.url, filePath: data.filePath, ok: true });
      ok++;
      console.log(`[${i + 1}/${manifest.length}] OK: ${key}`);
      uploaded = true;
    } catch (err) {
      if (localFallbackDir) {
        const localPath = path.join(localFallbackDir, folder, fileName);
        if (fs.existsSync(localPath)) {
          try {
            const data = await imagekit.files.upload({
              file: fs.createReadStream(localPath),
              fileName,
              folder,
              useUniqueFileName: false,
              overwriteFile: true,
            });
            results.push({ key, url: data.url, filePath: data.filePath, ok: true });
            ok++;
            console.log(`[${i + 1}/${manifest.length}] OK (local): ${key}`);
            uploaded = true;
          } catch (localErr) {
            err = localErr;
          }
        }
      }
      if (!uploaded) {
        results.push({ key, error: err.message, ok: false });
        fail++;
        console.error(`[${i + 1}/${manifest.length}] FAIL: ${key} - ${err.message}`);
      }
    }
  }

  const mappingPath = path.join(projectRoot, 'scripts', 'imagekit-urls.json');
  const mapping = {};
  for (const r of results) {
    if (r.ok) mapping[r.key] = r.url;
  }
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), 'utf8');

  console.log(`\nDone: ${ok} ok, ${fail} failed`);
  if (ok > 0) {
    const sample = results.find((r) => r.ok);
    console.log(`Sample ImageKit URL: ${sample.url}`);
    console.log(`Mapping saved to ${mappingPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
