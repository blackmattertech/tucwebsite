# Fixing `net::ERR_BLOCKED_BY_ORB` for Supabase Storage

When media (images, videos) from your Supabase buckets fail to load with **`net::ERR_BLOCKED_BY_ORB`** in the Network tab, the browser is blocking cross-origin responses. Fix it by allowing your site’s origin in Supabase.

## 1. Add your site to CORS allowed origins

1. Open **[Supabase Dashboard](https://supabase.com/dashboard)** and select your project.
2. Go to **Settings** (gear) → **API**.
3. Find **CORS** (or **Allowed origins**).
4. Add every origin where the site runs, for example:
   - **Local:** `http://localhost:5173` (or the port Vite shows in the terminal)
   - **Production:** `https://yourdomain.com` (no trailing slash)
5. Save.

After saving, do a **hard refresh** (Ctrl+Shift+R / Cmd+Shift+R) so the browser picks up the new CORS headers.

## 2. Confirm buckets are public

- **Storage** → select bucket (e.g. **websiteblog images**, **website videos**).
- Ensure the bucket is **Public** so files can be read without auth.
- If you use RLS, ensure there is a policy that allows public **SELECT** on the objects you serve (or the bucket is set to public).

## 3. Check file types (optional)

ORB can also be triggered if the server sends a generic or wrong **Content-Type**. Supabase usually sets this from the file extension. If issues persist, re-upload a failing file and confirm in the Network tab that the response has a proper type (e.g. `video/mp4`, `image/webp`).

---

**Buckets used by this app**

- **websiteblog images** → folder `capabilites` (capability images, `.webp`).
- **website videos** → product carousel videos (`.mp4`).

After updating CORS and making buckets public, media from these buckets should load without `ERR_BLOCKED_BY_ORB`.
