/**
 * ImageKit CDN media URLs.
 * Base URL: https://ik.imagekit.io/tagunlimited
 * Format: {endpoint}/{folder}/{filename}
 */

const IMAGEKIT_URL =
  (import.meta.env?.VITE_IMAGEKIT_URL as string | undefined) ||
  'https://ik.imagekit.io/tagunlimited';

/**
 * Build full ImageKit CDN URL from path (folder/filename or folder/folder/filename).
 * Path segments are encoded so spaces and special characters work.
 *
 * @example
 * getMediaUrl('products/hoodie.webp')  // https://ik.imagekit.io/tagunlimited/products/hoodie.webp
 * getMediaUrl('our principles/best_tshirt.png')  // .../our%20principles/best_tshirt.png
 */
export function getMediaUrl(path: string): string {
  const normalized = path.replace(/^\/+/, '').trim();
  if (!normalized) return IMAGEKIT_URL;
  const encoded = normalized
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `${IMAGEKIT_URL.replace(/\/$/, '')}/${encoded}`;
}
