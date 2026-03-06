/**
 * Supabase storage URLs — same project for all buckets.
 */
const SUPABASE_PROJECT_URL = 'https://vwpseddaghxktpjtriaj.supabase.co';

/** Capability images: bucket "websiteblog images", folder "capabilites". */
export const CAPABILITIES_IMAGES_BASE = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/websiteblog%20images/capabilites/`;

/** Product carousel videos: bucket "website videos", folder "products". */
export const WEBSITE_VIDEOS_BASE = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/website%20videos/products/`;

/** Client logos: bucket "website images", folder "client-logos". */
export const CLIENT_LOGOS_BASE = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/website%20images/client-logos/`;

/** Build full Supabase URL for a capability image (filename, e.g. "Deep Design Proficiency.webp"). */
export function capabilityImageUrl(filename: string): string {
  return `${CAPABILITIES_IMAGES_BASE}${encodeURIComponent(filename)}`;
}

/** Build full Supabase URL for a product carousel video (filename, e.g. "hoodies manufacturers in bangalore.mp4"). */
export function productVideoUrl(filename: string): string {
  return `${WEBSITE_VIDEOS_BASE}${encodeURIComponent(filename)}`;
}

/** Build full Supabase URL for a client logo (filename, e.g. "kfc_logo.svg"). */
export function clientLogoUrl(filename: string): string {
  return `${CLIENT_LOGOS_BASE}${encodeURIComponent(filename)}`;
}
