-- Contact form submissions (shared table for company projects).
-- Run this once in your database (e.g. Supabase SQL Editor or your backend migrations).

CREATE TABLE IF NOT EXISTS contact_submissions (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  company_activity text NOT NULL,
  referral   text,
  interest   text NOT NULL,
  email      text NOT NULL,
  phone      text NOT NULL,
  project_details text,
  source     text DEFAULT 'website_contact_modal',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Optional: index for listing by date
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions (created_at DESC);

-- Optional: RLS for Supabase (enable if using Supabase and you want RLS)
-- ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow anonymous insert" ON contact_submissions FOR INSERT TO anon WITH CHECK (true);
-- CREATE POLICY "Allow authenticated read" ON contact_submissions FOR SELECT TO authenticated USING (true);
