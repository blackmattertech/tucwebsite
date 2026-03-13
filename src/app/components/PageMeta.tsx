import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { APP_BASE_URL, getRouteMeta } from '../data/routeMeta';

/**
 * Updates document title, meta description, and canonical URL per route.
 * Call once in Layout so every navigation gets correct SEO meta.
 */
export function PageMeta() {
  const location = useLocation();
  const pathname = location.pathname;
  const meta = getRouteMeta(pathname);
  const canonical = pathname === '/' ? APP_BASE_URL + '/' : `${APP_BASE_URL}${pathname}`;

  useEffect(() => {
    document.title = meta.title;

    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
      descEl = document.createElement('meta');
      descEl.setAttribute('name', 'description');
      document.head.appendChild(descEl);
    }
    descEl.setAttribute('content', meta.description);

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical);
  }, [pathname, meta.title, meta.description, canonical]);

  return null;
}
