/**
 * Contact form submission: saves to the same database used by other company projects.
 * Configure via .env (see .env.example):
 * - Option A: VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY (table: contact_submissions)
 * - Option B: VITE_CONTACT_API_URL (POST JSON to your backend)
 */

export type ContactSubmissionPayload = {
  name: string;
  company_activity: string;
  referral: string;
  interest: string;
  email: string;
  phone: string;
  project_details: string;
  source?: string;
};

const SOURCE = 'website_contact_modal';

async function submitViaSupabase(payload: ContactSubmissionPayload): Promise<void> {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  if (!url || !key) return;

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(url, key);
  const { error } = await supabase.from('contact_submissions').insert({
    name: payload.name,
    company_activity: payload.company_activity,
    referral: payload.referral || null,
    interest: payload.interest,
    email: payload.email,
    phone: payload.phone,
    project_details: payload.project_details || null,
    source: payload.source ?? SOURCE,
  });
  if (error) throw error;
}

async function submitViaApi(payload: ContactSubmissionPayload): Promise<void> {
  const apiUrl = import.meta.env.VITE_CONTACT_API_URL as string | undefined;
  if (!apiUrl) return;

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, source: payload.source ?? SOURCE }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
}

export async function submitContactForm(payload: ContactSubmissionPayload): Promise<void> {
  const hasSupabase =
    typeof import.meta.env.VITE_SUPABASE_URL === 'string' &&
    typeof import.meta.env.VITE_SUPABASE_ANON_KEY === 'string';
  const hasApi = typeof import.meta.env.VITE_CONTACT_API_URL === 'string';

  if (hasSupabase) {
    await submitViaSupabase(payload);
    return;
  }
  if (hasApi) {
    await submitViaApi(payload);
    return;
  }

  throw new Error(
    'Contact form not configured: set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY, or VITE_CONTACT_API_URL in .env'
  );
}
