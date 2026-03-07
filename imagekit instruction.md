# ImageKit CDN – Instructions for Future Use

This document explains how media is served from ImageKit and what you need to do when adding or changing images and videos.

---

## 1. Overview

- **All site media** (images and videos) is served from **ImageKit CDN**, not from the app server or Supabase Storage.
- The app gets media URLs from the **Supabase `media_assets` table** (or falls back to building ImageKit URLs from folder + file name).
- **URL format:** `https://ik.imagekit.io/tagunlimited/<folder>/<filename>`
- **ImageKit ID:** `tagunlimited`  
- **URL endpoint:** `https://ik.imagekit.io/tagunlimited`

---

## 2. Folder Structure on ImageKit

Create these **exact folder names** in your ImageKit media library and upload files as listed. Folder and file names are case-sensitive and must match.

| Folder name on ImageKit | Contents | Used on site |
|-------------------------|----------|--------------|
| **other images** | Capability images, value-added services images, apparel icons | About, Capabilities, Products sections; Principles section (background icons) |
| **products** | Product carousel videos (e.g. hoodies, polos, t-shirts) | Product carousel on home |
| **tagfactor** | Tag Factor section image | Tag Factor section |
| **herosection** | Hero desktop and mobile videos | Hero section |
| **our principles** | Four principle images | Principles section (main images) |
| **client-logos** | Client logo images | Clientele / logo marquee |

### Files per folder (reference)

- **other images:**  
  `Deep Design Proficiency.webp`, `Expert Product Development.webp`, `End-to-End Garment Manufacturing.webp`, `image.webp`, `embroidery.webp`, `DTF Printing.webp`, `Screen Printing.webp`, `vinayl printing.webp`, `fabric rolls.webp`, `tshirt.png`, `jacket.png`, `hoodie.png`, `sweatshirt.png`, `polo-shirt.png`, `jersey.png`, `suit.png`, `dress.png`
- **products:**  
  All product carousel video filenames (see `scripts/migrate-media-to-imagekit.ts`).
- **tagfactor:**  
  `apparel manufacturer in bangalore.png`
- **herosection:**  
  `apparel-manufacturer-in-bangalore (2).mp4`, `custom apparel manufacturer.mp4`
- **our principles:**  
  `best_tshirt_manufacturer_in_bangalore.png`, `jacketmanufacturer in india.png`, `white_label_hoodie_manufacturer.png`, `best_cap_manufacturer in india.png`
- **client-logos:**  
  All client logo filenames used in the Clientele section (see migration script).

---

## 3. Environment Variables

In the project root `.env`:

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_IMAGEKIT_URL` | Yes (for app) | ImageKit URL endpoint. Set to `https://ik.imagekit.io/tagunlimited` |
| `VITE_SUPABASE_URL` | Yes (for app) | Supabase project URL (app reads `media_assets` with anon key) |
| `VITE_SUPABASE_ANON_KEY` | Yes (for app) | Supabase anon key |
| `SUPABASE_URL` | For migration script | Same as `VITE_SUPABASE_URL` (used when running the script locally) |
| `SUPABASE_SERVICE_ROLE_KEY` | For migration script | Supabase service role key (to upsert into `media_assets`) |

The app uses `VITE_*` only. The migration script uses `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` and loads `.env` via `dotenv`.

---

## 4. Supabase: `media_assets` Table

### Purpose

Stores one row per media file: folder, file name, type (image/video), and the full ImageKit URL. The frontend loads this table on startup and uses it to resolve URLs.

### Migrations to run (once per environment)

1. **Create the table**  
   In Supabase → SQL Editor, run:  
   `migrations/002_media_assets.sql`

2. **Allow the app to read the table**  
   In Supabase → SQL Editor, run:  
   `migrations/003_media_assets_rls.sql`  
   (This enables RLS and adds a policy so `anon` can SELECT. If you skip this, media may not show.)

### Table structure

- `id` (uuid, primary key)
- `file_name` (text) – e.g. `fabric rolls.webp`
- `folder` (text) – e.g. `other images`
- `type` (text) – `image` or `video`
- `url` (text) – full ImageKit URL
- `created_at` (timestamptz)

Unique on `(folder, file_name)` so the migration script can upsert safely.

---

## 5. Migration Script (Populate / Update `media_assets`)

The script generates ImageKit URLs for every known file and upserts them into `media_assets`.

### When to run

- After creating the table and RLS (first-time setup).
- Whenever you **add new media** to ImageKit and add them to the script’s manifest (see below).
- Whenever you **change folder or file names** on ImageKit and update the manifest accordingly.

### How to run

1. Ensure `.env` has:
   - `VITE_IMAGEKIT_URL` (or `IMAGEKIT_ENDPOINT`)
   - `SUPABASE_URL` (or `VITE_SUPABASE_URL`)
   - `SUPABASE_SERVICE_ROLE_KEY`
2. From the project root:
   ```bash
   npx tsx scripts/migrate-media-to-imagekit.ts
   ```
   Or:
   ```bash
   pnpm run migrate-media
   ```
3. The script is **idempotent**: safe to run multiple times; it upserts by `(folder, file_name)`.

### Adding new files to the script

Edit `scripts/migrate-media-to-imagekit.ts` and add a new entry to the `MEDIA_MANIFEST` array:

```ts
{ folder: 'other images', file_name: 'your-new-file.webp', type: 'image' },
```

Use the **exact folder name** as on ImageKit and the **exact file name**. Then run the script again so `media_assets` gets the new URL.

---

## 6. Using Media in the App

- The app uses **`useMediaAssets()`** and **`getUrl(folder, file_name)`** to resolve URLs.
- If a row exists in `media_assets`, that URL is used; otherwise the app falls back to `https://ik.imagekit.io/tagunlimited/<folder>/<filename>` (with encoding).

### Where each folder is used

| Folder | Component(s) |
|--------|----------------|
| **other images** | AboutSection, CapabilitiesSection, ProductsSection, PrinciplesSection (apparel icons) |
| **products** | ProductCarouselSection |
| **tagfactor** | TagFactorSection |
| **herosection** | HeroSection |
| **our principles** | PrinciplesSection (main principle images) |
| **client-logos** | ClienteleSection |

To add a **new** image or video in the UI:

1. Upload the file to the correct **folder** on ImageKit (same name as in the table above).
2. Add the file to `MEDIA_MANIFEST` in `scripts/migrate-media-to-imagekit.ts` (correct `folder` and `file_name`).
3. Run the migration script.
4. In the component, use `getUrl('folder name', 'exact file name')` (e.g. `getUrl('other images', 'new-image.webp')`).

Keep **file names** identical on ImageKit and in the code (including spaces and extension).

---

## 7. Checklist: Adding New Media in the Future

1. **Upload** the file to the right **folder** in ImageKit (folder name must match exactly, e.g. `other images`).
2. **Add** an entry to `MEDIA_MANIFEST` in `scripts/migrate-media-to-imagekit.ts`:
   - `folder`: same as the ImageKit folder name  
   - `file_name`: exact filename  
   - `type`: `'image'` or `'video'`
3. **Run** the migration script:  
   `npx tsx scripts/migrate-media-to-imagekit.ts`
4. **Use** the media in the app via `getUrl('folder name', 'file name')` in the right component (see table in section 6).
5. If the app already fetches `media_assets`, a refresh is enough; no redeploy needed for URL changes that are only in the DB.

---

## 8. Troubleshooting

| Issue | What to check |
|-------|----------------|
| **404 on an image/video** | Folder and file name on ImageKit must match exactly (including spaces, e.g. `other images`). Check the URL in the browser and compare with the path in ImageKit. |
| **Media in table but not on site** | Run `migrations/003_media_assets_rls.sql` so the app (anon) can read `media_assets`. |
| **New file not showing** | Add it to `MEDIA_MANIFEST` in the migration script, run the script, and use `getUrl(folder, file_name)` in the component. |
| **Wrong image or old URL** | Re-run the migration script after fixing folder/file name in the manifest; it will overwrite the URL for that `(folder, file_name)`. |
| **Migration script fails** | Ensure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set in `.env` and the script is run from the project root (so `.env` is loaded). |

---

## 9. Quick Reference

- **ImageKit URL endpoint:** `https://ik.imagekit.io/tagunlimited`
- **URL pattern:** `https://ik.imagekit.io/tagunlimited/<folder>/<filename>` (folder and filename are URL-encoded.)
- **Main folder for capability/value-added/apparel icons:** `other images`
- **Migration script:** `scripts/migrate-media-to-imagekit.ts`  
- **RLS for app read access:** `migrations/003_media_assets_rls.sql`
