/**
 * CDN image component — uses media_assets table (ImageKit URLs).
 * Path format: "folder/filename" e.g. "products/hoodie.webp" or "client-logos/logo.svg".
 */

import React from 'react';
import { useMediaAssets } from '../../lib/useMediaAssets';

export interface CDNImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Path relative to media: "folder/filename" e.g. "products/hoodie.webp" */
  path: string;
}

/**
 * Renders an img with src from media_assets table (fallback to ImageKit URL if not in table).
 */
export function CDNImage({ path, ...imgProps }: CDNImageProps) {
  const { getUrl } = useMediaAssets();
  const normalized = path.replace(/^\/+/, '').trim();
  const lastSlash = normalized.lastIndexOf('/');
  const folder = lastSlash >= 0 ? normalized.slice(0, lastSlash) : '';
  const file_name = lastSlash >= 0 ? normalized.slice(lastSlash + 1) : normalized;
  const src = folder ? getUrl(folder, file_name) : getUrl('', file_name);
  return <img src={src} {...imgProps} />;
}
