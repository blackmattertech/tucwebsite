# Database migrations

Run these in your **shared company database** (the same one used by your other project). No need to change anything in that project.

## Contact form table

1. Open your database (e.g. **Supabase** → SQL Editor, or your PostgreSQL client).
2. Run the contents of `001_contact_submissions.sql`.

### Supabase

- In the same Supabase project your other app uses: **SQL Editor** → New query → paste `001_contact_submissions.sql` → Run.
- If you use Row Level Security (RLS), uncomment and run the policy lines at the bottom of the migration so the website can insert rows (anon key).

After that, set in this project’s `.env` (see root `.env.example`):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

All contact form submissions from this site will be stored in `contact_submissions` in the same database.

## Media assets (ImageKit CDN)

1. Run `002_media_assets.sql` in the same database (e.g. Supabase SQL Editor).
2. Ensure `.env` has `VITE_IMAGEKIT_URL=https://ik.imagekit.io/tagunlimited` (and optionally `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` for the migration script).
3. To populate `media_assets` with ImageKit URLs: `pnpm run migrate-media` (or `npx tsx scripts/migrate-media-to-imagekit.ts`). The script is idempotent.
4. If media exists in the table but does not show on the frontend, run `003_media_assets_rls.sql` in the SQL Editor so the app (anon key) can read from `media_assets`.
