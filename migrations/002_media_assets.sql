-- Media assets table for ImageKit CDN migration.
-- Run once in Supabase SQL Editor (or your backend migrations).
-- Stores file_name, folder, type, and resolved ImageKit URL.

CREATE TABLE IF NOT EXISTS media_assets (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name  text NOT NULL,
  folder    text NOT NULL,
  type      text NOT NULL CHECK (type IN ('image', 'video')),
  url       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_media_assets_file_name ON media_assets (file_name);
CREATE INDEX IF NOT EXISTS idx_media_assets_folder ON media_assets (folder);

-- Optional: unique constraint so migration script is idempotent (upsert by folder + file_name)
CREATE UNIQUE INDEX IF NOT EXISTS idx_media_assets_folder_file
  ON media_assets (folder, file_name);

-- Allow public read so the app (anon key) can fetch URLs. Run if you use RLS.
-- ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public read media_assets" ON media_assets FOR SELECT TO anon USING (true);
