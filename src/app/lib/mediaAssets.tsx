/**
 * Single source of truth for media URLs: Supabase media_assets table.
 * All images and videos should be resolved via getUrl(folder, file_name).
 * Falls back to ImageKit URL if the table hasn't loaded or the row is missing.
 */

import React, { createContext, useEffect, useState, useMemo } from 'react';
import { getMediaUrl } from './media';

export type MediaAssetsContextValue = {
  /** Get URL for a media asset by folder and file_name. Uses table if loaded, else ImageKit fallback. */
  getUrl: (folder: string, file_name: string) => string;
  /** True once media_assets has been fetched (may be empty). */
  ready: boolean;
  /** File names for a given folder (e.g. client-logos). Empty until loaded. */
  getFileNamesByFolder: (folder: string) => string[];
};

export const MediaAssetsContext = createContext<MediaAssetsContextValue | null>(null);

/** Normalize so lookup matches table (folder and file_name must match media_assets exactly). */
function buildKey(folder: string, file_name: string): string {
  const f = (folder ?? '').trim();
  const n = (file_name ?? '').trim();
  return `${f}\0${n}`;
}

export function MediaAssetsProvider({ children }: { children: React.ReactNode }) {
  const [map, setMap] = useState<Map<string, string>>(new Map());
  const [byFolder, setByFolder] = useState<Map<string, string[]>>(new Map());

  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
    if (!url || !key) {
      setMap(new Map());
      setByFolder(new Map());
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(url, key);
        const { data, error } = await supabase
          .from('media_assets')
          .select('folder, file_name, url');
        if (cancelled || error) {
          if (error) console.warn('[media_assets]', error.message);
          return;
        }
        const next = new Map<string, string>();
        const folderToFiles = new Map<string, string[]>();
        for (const row of data ?? []) {
          const folder = String(row.folder ?? '').trim();
          const file_name = String(row.file_name ?? '').trim();
          if (folder && file_name && row.url) {
            next.set(buildKey(folder, file_name), String(row.url));
            const list = folderToFiles.get(folder) ?? [];
            list.push(file_name);
            folderToFiles.set(folder, list);
          }
        }
        if (!cancelled) {
          setMap(next);
          setByFolder(folderToFiles);
        }
      } catch (e) {
        if (!cancelled) console.warn('[media_assets]', e);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const value = useMemo<MediaAssetsContextValue>(() => ({
    ready: true,
    getUrl(folder: string, file_name: string) {
      const key = buildKey(folder, file_name);
      const url = map.get(key);
      if (url) return url;
      return getMediaUrl(`${folder}/${file_name}`);
    },
    getFileNamesByFolder(folder: string) {
      return byFolder.get((folder ?? '').trim()) ?? [];
    },
  }), [map, byFolder]);

  return (
    <MediaAssetsContext.Provider value={value}>
      {children}
    </MediaAssetsContext.Provider>
  );
}
