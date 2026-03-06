# Plan: Fix `net::ERR_BLOCKED_BY_ORB` for Supabase Product Videos

## Problem Summary

Product carousel videos loaded from Supabase storage (`website videos` bucket) fail with **`net::ERR_BLOCKED_BY_ORB`** in the browser Network tab. This prevents videos from playing in `ProductCarouselSection.tsx`.

**Root cause:** Opaque Response Blocking (ORB) — the browser blocks cross-origin media when the server does not send appropriate CORS headers. Your site (e.g. `http://localhost:5173`) and Supabase (`https://vwpseddaghxktpjtriaj.supabase.co`) are different origins.

---

## Codebase Analysis

### Current Flow

| File | Role |
|------|------|
| `src/app/lib/supabaseStorage.ts` | Builds public URLs for Supabase storage. `productVideoUrl()` returns `{project}/storage/v1/object/public/website%20videos/{filename}` |
| `src/app/components/ProductCarouselSection.tsx` | Uses `productVideoUrl()` for 10 product videos, renders them in `<video>` via `LazyCarouselVideo` |
| `SUPABASE_STORAGE_CORS.md` | Existing notes on CORS fix (Settings → API → CORS) |

### URL Path Mismatch (Important)

You stated videos live in the **`products`** folder inside the **`website videos`** bucket. The current code does **not** include the `products/` subfolder:

- **Current:** `.../website%20videos/hoodies%20manufacturers%20in%20bangalore.mp4`
- **Expected:** `.../website%20videos/products/hoodies%20manufacturers%20in%20bangalore.mp4`

If your files are under `products/`, the URLs are wrong and will 404 even before ORB. Fix this first.

---

## Remediation Steps

### Step 1: Fix Video URL Path (Code Change)

**File:** `src/app/lib/supabaseStorage.ts`

Add the `products/` folder to the base path for product videos:

```ts
// Before
export const WEBSITE_VIDEOS_BASE = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/website%20videos/`;

// After (if videos are in products subfolder)
export const WEBSITE_VIDEOS_BASE = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/website%20videos/products/`;
```

**Verify:** If your bucket has no subfolder and files are at the root, keep the original. Check your Supabase Storage UI to confirm the exact path.

---

### Step 2: Configure CORS in Supabase Dashboard

This is the main fix for `ERR_BLOCKED_BY_ORB`.

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → select project `vwpseddaghxktpjtriaj`.
2. Go to **Settings** (gear) → **API**.
3. Find **CORS** / **Allowed origins**.
4. Add every origin where the site runs:
   - **Local dev:** `http://localhost:5173` (or the port Vite shows)
   - **Network dev (if used):** `http://192.168.x.x:5173` (from `host: true` in Vite)
   - **Production:** `https://yourdomain.com` (no trailing slash)
5. Save changes.

After saving, do a **hard refresh** (Ctrl+Shift+R / Cmd+Shift+R).

---

### Step 3: Ensure Bucket Is Public

1. Go to **Storage** in the Supabase Dashboard.
2. Select the **website videos** bucket.
3. Confirm it is **Public** so files can be read without auth.
4. If using RLS, ensure a policy allows public `SELECT` on the objects (or the bucket is explicitly public).

---

### Step 4: Verify File Layout and Content-Type

1. In Storage → **website videos** → **products** (or root), confirm the video files exist with the exact filenames used in `ProductCarouselSection.tsx`:
   - `hoodies manufacturers in bangalore.mp4`
   - `polo manufacturers in bangalore.mp4`
   - `tshirt manufacturer in india- best thsirt manufacturer.mp4`
   - etc.
2. Supabase sets `Content-Type` from the file extension. Ensure files are real `.mp4` videos, not renamed non-video files.
3. In the Network tab, after CORS is fixed, check that responses have `Content-Type: video/mp4`.

---

### Step 5: Optional — Proxy Fallback (If CORS Cannot Be Changed)

If you cannot change Supabase CORS (e.g. shared project), add a proxy:

**Option A: Vite proxy (dev only)**

In `vite.config.ts`:

```ts
server: {
  host: true,
  proxy: {
    '/api/supabase-storage': {
      target: 'https://vwpseddaghxktpjtriaj.supabase.co',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/supabase-storage/, '/storage/v1/object/public'),
    },
  },
},
```

Then in `supabaseStorage.ts`, use `/api/supabase-storage/website%20videos/products/` for dev. This only works in development.

**Option B: Supabase Edge Function**

Create an Edge Function that fetches the video from storage and streams it with correct CORS headers. Use this function URL as the video `src`. Works in both dev and production.

---

## Verification Checklist

- [ ] Step 1: URL path includes `products/` if that matches your bucket layout
- [ ] Step 2: CORS origins include `http://localhost:5173` and production domain
- [ ] Step 3: **website videos** bucket is public
- [ ] Step 4: Video filenames match exactly; files are valid MP4
- [ ] Hard refresh after CORS changes
- [ ] Network tab: video requests return 200 (or 304) instead of `ERR_BLOCKED_BY_ORB`

---

## Files to Modify

| File | Change |
|------|--------|
| `src/app/lib/supabaseStorage.ts` | Add `products/` to `WEBSITE_VIDEOS_BASE` if videos are in that folder |
| Supabase Dashboard | CORS allowed origins, bucket public |
| `vite.config.ts` | (Optional) Proxy for dev if CORS cannot be configured |

---

## Reference

- `SUPABASE_STORAGE_CORS.md` — existing CORS notes
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- ORB blocks cross-origin media when `Access-Control-Allow-Origin` is missing or does not include the requesting origin
