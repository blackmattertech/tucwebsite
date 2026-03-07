/**
 * Hook to resolve media URLs from media_assets table (or ImageKit fallback).
 */
import { useContext } from 'react';
import { getMediaUrl } from './media';
import type { MediaAssetsContextValue } from './mediaAssets';
import { MediaAssetsContext } from './mediaAssets';

export function useMediaAssets(): MediaAssetsContextValue {
  const ctx = useContext(MediaAssetsContext);
  if (!ctx) {
    return {
      ready: false,
      getUrl(folder: string, file_name: string) {
        return getMediaUrl(`${folder}/${file_name}`);
      },
    };
  }
  return ctx;
}
