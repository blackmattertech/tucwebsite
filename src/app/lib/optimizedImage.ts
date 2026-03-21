/**
 * Vercel Image Optimization API - builds URLs for /_vercel/image.
 * Only used in production (Vercel) - dev uses original URLs.
 * Supports responsive srcset for LCP and smaller payloads on mobile.
 */

const ALLOWED_SIZES = [256, 384, 400, 640, 750, 828, 1080, 1200, 1920, 2048];
const SRCSET_WIDTHS = [400, 640, 828, 1080, 1200];

function isImageKitUrl(src: string): boolean {
  return src.includes('ik.imagekit.io');
}

/**
 * Vercel optimizer is only available when explicitly enabled.
 * Keep this opt-in so non-Vercel hosts (Hostinger, Netlify, etc.) never generate /_vercel/image URLs.
 */
function shouldUseVercelOptimizer(): boolean {
  const env = (import.meta.env as { VITE_USE_VERCEL_IMAGE?: string }).VITE_USE_VERCEL_IMAGE;
  return import.meta.env.PROD && env === 'true';
}

function nearestSize(width: number): number {
  return ALLOWED_SIZES.reduce((prev, curr) =>
    Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev
  );
}

/**
 * Build optimized image URL for Vercel CDN.
 * In dev, returns original URL since /_vercel/image is only available on Vercel.
 */
export function getOptimizedImageUrl(
  src: string,
  width: number,
  quality: number = 75
): string {
  const w = nearestSize(width);
  const q = Math.min(100, Math.max(1, quality));

  if (isImageKitUrl(src)) {
    return appendImageKitTransform(src, w, q);
  }

  if (shouldUseVercelOptimizer()) {
    return `/_vercel/image?url=${encodeURIComponent(src)}&w=${w}&q=${q}`;
  }

  return src;
}

/** Widths for responsive srcset (mobile-first: 400–1200). */
/**
 * Build srcset string for responsive images (Vercel or raw URLs).
 * Use with sizes attribute for proper mobile payload reduction.
 */
export function getOptimizedImageSrcSet(
  src: string,
  quality: number = 70
): string {
  if (src.startsWith('data:') || src.endsWith('.svg')) return '';
  const q = Math.min(100, Math.max(1, quality));
  return SRCSET_WIDTHS.map((w) => {
    const url = isImageKitUrl(src)
      ? appendImageKitTransform(src, w, q)
      : shouldUseVercelOptimizer()
        ? `/_vercel/image?url=${encodeURIComponent(src)}&w=${w}&q=${q}`
        : src;
    return `${url} ${w}w`;
  }).join(', ');
}

/** Append ImageKit path-based transform (tr:w-*,q-*,f-auto) for responsive + format auto (AVIF/WebP). */
function appendImageKitTransform(url: string, width: number, quality: number): string {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/^\/+/, '').split('/');
    if (path.length < 2) return url;
    const [id, ...rest] = path;
    const tr = `tr:w-${width},q-${quality},f-auto`;
    u.pathname = [id, tr, ...rest].join('/');
    return u.toString();
  } catch {
    return url;
  }
}
