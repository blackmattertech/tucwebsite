-- Allow the frontend (anon key) to read media_assets so URLs load from the table.
-- Run this in Supabase SQL Editor if media exists in the table but does not show on the site.

-- Enable RLS on the table (if not already)
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- Policy: allow anyone (anon) to SELECT all rows so the app can fetch ImageKit URLs
DROP POLICY IF EXISTS "Allow public read media_assets" ON media_assets;
CREATE POLICY "Allow public read media_assets"
  ON media_assets
  FOR SELECT
  TO anon
  USING (true);
