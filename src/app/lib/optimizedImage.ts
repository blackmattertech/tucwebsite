/**
 * Vercel Image Optimization API - builds URLs for /_vercel/image.
 * Only used in production (Vercel) - dev uses original URLs.
 */

const ALLOWED_SIZES = [256, 384, 400, 640, 750, 828, 1080, 1200, 1920, 2048];

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
  if (!import.meta.env.PROD) return src;
  const w = nearestSize(width);
  const q = Math.min(100, Math.max(1, quality));
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${w}&q=${q}`;
}
