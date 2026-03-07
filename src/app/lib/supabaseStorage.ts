/**
 * Media URLs — now served from ImageKit CDN.
 * Same folder/file names as before; Supabase storage no longer used for media.
 */
import { getMediaUrl } from './media';

/** Capability / value-added / apparel icons: ImageKit folder "other images". */
export function capabilityImageUrl(filename: string): string {
  return getMediaUrl(`other images/${filename}`);
}

/** Product carousel videos: folder "products". */
export function productVideoUrl(filename: string): string {
  return getMediaUrl(`products/${filename}`);
}

/** Client logos: folder "client-logos". */
export function clientLogoUrl(filename: string): string {
  return getMediaUrl(`client-logos/${filename}`);
}

/** Tag Factor section media: folder "tagfactor". */
export function tagFactorMediaUrl(filename: string): string {
  return getMediaUrl(`tagfactor/${filename}`);
}
