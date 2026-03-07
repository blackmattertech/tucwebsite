/**
 * Migrate media to ImageKit: generate ImageKit URLs and insert into Supabase media_assets.
 * Idempotent: safe to run multiple times (upserts by folder + file_name).
 *
 * Usage:
 *   1. Run migrations/002_media_assets.sql in Supabase SQL Editor.
 *   2. Set env in .env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, VITE_IMAGEKIT_URL (or IMAGEKIT_ENDPOINT).
 *   3. npx tsx scripts/migrate-media-to-imagekit.ts
 */

import { config } from 'dotenv';

// Load .env from project root (cwd when run from repo root)
config();

const IMAGEKIT_ENDPOINT =
  process.env.VITE_IMAGEKIT_URL ||
  process.env.IMAGEKIT_ENDPOINT ||
  'https://ik.imagekit.io/tagunlimited';

/** All known media files that were in Supabase Storage (folder, file_name, type). */
const MEDIA_MANIFEST: { folder: string; file_name: string; type: 'image' | 'video' }[] = [
  // Other images (ImageKit folder: "other images" – capability + value-added + apparel icons)
  { folder: 'other images', file_name: 'Deep Design Proficiency.webp', type: 'image' },
  { folder: 'other images', file_name: 'Expert Product Development.webp', type: 'image' },
  { folder: 'other images', file_name: 'End-to-End Garment Manufacturing.webp', type: 'image' },
  { folder: 'other images', file_name: 'image.webp', type: 'image' },
  { folder: 'other images', file_name: 'embroidery.webp', type: 'image' },
  { folder: 'other images', file_name: 'DTF Printing.webp', type: 'image' },
  { folder: 'other images', file_name: 'Screen Printing.webp', type: 'image' },
  { folder: 'other images', file_name: 'vinayl printing.webp', type: 'image' },
  { folder: 'other images', file_name: 'fabric rolls.webp', type: 'image' },
  // Products (website videos / products)
  { folder: 'products', file_name: 'hoodies manufacturers in bangalore.mp4', type: 'video' },
  { folder: 'products', file_name: 'polo manufacturers in bangalore.mp4', type: 'video' },
  { folder: 'products', file_name: 'tshirt manufacturer in india- best thsirt manufacturer.mp4', type: 'video' },
  { folder: 'products', file_name: 'premium private label manufacturer.mp4', type: 'video' },
  { folder: 'products', file_name: 'cap manufacturer in bangalore cap manufacturer in india private label cap manufacturing.mp4', type: 'video' },
  { folder: 'products', file_name: 'jackets manufacturers in bangalore.mp4', type: 'video' },
  { folder: 'products', file_name: 'shirt manufacturers in india.mp4', type: 'video' },
  { folder: 'products', file_name: 'shirt manufacturer in bangalore- best manufacturer for apparel in india.mp4', type: 'video' },
  { folder: 'products', file_name: 'trackpant manufacturers in india- joggers manufacturer in bangalore- sportswear manufacturer.mp4', type: 'video' },
  { folder: 'products', file_name: 'sports apparel manufacturers in bangalore.mp4', type: 'video' },
  // Tag Factor (website videos / tagfactor)
  { folder: 'tagfactor', file_name: 'apparel manufacturer in bangalore.png', type: 'image' },
  // Hero (website videos / herosection)
  { folder: 'herosection', file_name: 'apparel-manufacturer-in-bangalore (2).mp4', type: 'video' },
  { folder: 'herosection', file_name: 'custom apparel manufacturer.mp4', type: 'video' },
  // Our principles (website images / our principles)
  { folder: 'our principles', file_name: 'best_tshirt_manufacturer_in_bangalore.png', type: 'image' },
  { folder: 'our principles', file_name: 'jacketmanufacturer in india.png', type: 'image' },
  { folder: 'our principles', file_name: 'white_label_hoodie_manufacturer.png', type: 'image' },
  { folder: 'our principles', file_name: 'best_cap_manufacturer in india.png', type: 'image' },
  // Client logos (website images / client-logos)
  { folder: 'client-logos', file_name: '1024px-Cisco_logo.svg_.png', type: 'image' },
  { folder: 'client-logos', file_name: '98b4e8_d71ea6626990460c8891b856b61618bamv2.webp', type: 'image' },
  { folder: 'client-logos', file_name: 'Acc_Logo_Black_Purple_RGB.png', type: 'image' },
  { folder: 'client-logos', file_name: 'Bank_of_Baroda_logo-3.svg', type: 'image' },
  { folder: 'client-logos', file_name: 'Tesco_Logo.svg_.png', type: 'image' },
  { folder: 'client-logos', file_name: 'Zomato-Logo.png', type: 'image' },
  { folder: 'client-logos', file_name: 'basf_logo.svg', type: 'image' },
  { folder: 'client-logos', file_name: 'download-17.png', type: 'image' },
  { folder: 'client-logos', file_name: 'huawei_  logo.svg', type: 'image' },
  { folder: 'client-logos', file_name: "john_deere logo.svg", type: 'image' },
  { folder: 'client-logos', file_name: "kellogg's_logo.svg", type: 'image' },
  { folder: 'client-logos', file_name: 'kfc_logo.svg', type: 'image' },
  { folder: 'client-logos', file_name: 'philips_logo.svg', type: 'image' },
  { folder: 'client-logos', file_name: 'pwc_logo.svg', type: 'image' },
  { folder: 'client-logos', file_name: 'red_bull logo.svg', type: 'image' },
  // Apparel icons (same ImageKit folder: "other images")
  { folder: 'other images', file_name: 'tshirt.png', type: 'image' },
  { folder: 'other images', file_name: 'jacket.png', type: 'image' },
  { folder: 'other images', file_name: 'hoodie.png', type: 'image' },
  { folder: 'other images', file_name: 'sweatshirt.png', type: 'image' },
  { folder: 'other images', file_name: 'polo-shirt.png', type: 'image' },
  { folder: 'other images', file_name: 'jersey.png', type: 'image' },
  { folder: 'other images', file_name: 'suit.png', type: 'image' },
  { folder: 'other images', file_name: 'dress.png', type: 'image' },
];

function buildUrl(folder: string, file_name: string): string {
  const encodedFolder = encodeURIComponent(folder);
  const encodedFile = encodeURIComponent(file_name);
  return `${IMAGEKIT_ENDPOINT.replace(/\/$/, '')}/${encodedFolder}/${encodedFile}`;
}

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('Missing SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, serviceKey);

  console.log(`ImageKit endpoint: ${IMAGEKIT_ENDPOINT}`);
  console.log(`Upserting ${MEDIA_MANIFEST.length} media_assets...`);

  let ok = 0;
  let err = 0;

  for (const row of MEDIA_MANIFEST) {
    const url = buildUrl(row.folder, row.file_name);
    const { error } = await supabase.from('media_assets').upsert(
      {
        folder: row.folder,
        file_name: row.file_name,
        type: row.type,
        url,
      },
      { onConflict: 'folder,file_name' }
    );

    if (error) {
      console.error(`Failed ${row.folder}/${row.file_name}:`, error.message);
      err++;
    } else {
      ok++;
    }
  }

  console.log(`Done. OK: ${ok}, Errors: ${err}`);
  if (err > 0) process.exit(1);
}

main();
