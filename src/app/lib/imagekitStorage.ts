/**
 * ImageKit storage URLs — assets migrated from Supabase.
 * Set VITE_IMAGEKIT_URL in .env (e.g. https://ik.imagekit.io/your_imagekit_id/)
 *
 * ImageKit replaces spaces and some special chars with underscores in stored filenames.
 */
const base = (import.meta as unknown as { env?: { VITE_IMAGEKIT_URL?: string } }).env?.VITE_IMAGEKIT_URL ?? '';
const IMAGEKIT_BASE = base.endsWith('/') ? base : base ? `${base}/` : '';

/** Match ImageKit's fileName sanitization: spaces, ', (, ) → underscore */
function imagekitPath(filename: string): string {
  return filename.replace(/[\s'()]/g, '_');
}

/** Build full ImageKit URL for a capability image (filename, e.g. "Deep Design Proficiency.webp"). */
export function capabilityImageUrl(filename: string): string {
  return `${IMAGEKIT_BASE}capabilities/${imagekitPath(filename)}`;
}

/** Build full ImageKit URL for a product carousel video (filename, e.g. "hoodies manufacturers in bangalore.mp4"). */
export function productVideoUrl(filename: string): string {
  return `${IMAGEKIT_BASE}products/${imagekitPath(filename)}`;
}

/** Build full ImageKit URL for a client logo (filename, e.g. "kfc_logo.svg"). */
export function clientLogoUrl(filename: string): string {
  return `${IMAGEKIT_BASE}client-logos/${imagekitPath(filename)}`;
}

/** Build full ImageKit URL for Tag Factor media (filename, e.g. "apparel manufacturer in bangalore.png"). */
export function tagFactorMediaUrl(filename: string): string {
  return `${IMAGEKIT_BASE}tagfactor/${imagekitPath(filename)}`;
}

/** Build full ImageKit URL for hero section video (filename). */
export function heroVideoUrl(filename: string): string {
  return `${IMAGEKIT_BASE}herosection/${imagekitPath(filename)}`;
}

/** Build full ImageKit URL for principles section image (filename). */
export function principleImageUrl(filename: string): string {
  return `${IMAGEKIT_BASE}principles/${imagekitPath(filename)}`;
}
