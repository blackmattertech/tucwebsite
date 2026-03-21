import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { APP_BASE_URL, getRouteMeta } from '../data/routeMeta';
import { buildSiteStructureSchemaGraph } from '../data/siteNavigationForSeo';

const SITE_STRUCTURE_SCRIPT_ID = 'ld-json-site-structure';

/**
 * Updates document title, meta description, and canonical URL per route.
 * Injects WebSite + main navigation ItemList JSON-LD so search engines can label sitelinks
 * with your real page names (About, Products, Social, Contact, etc.).
 * Call once in Layout so every navigation gets correct SEO meta.
 */
export function PageMeta() {
  const location = useLocation();
  const pathname = location.pathname;
  const meta = getRouteMeta(pathname);
  const canonical = pathname === '/' ? APP_BASE_URL + '/' : `${APP_BASE_URL}${pathname}`;

  /** One-time / base-URL: sitelink hints for Google (pairs URLs with labels). */
  useEffect(() => {
    let script = document.getElementById(SITE_STRUCTURE_SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = SITE_STRUCTURE_SCRIPT_ID;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': buildSiteStructureSchemaGraph(APP_BASE_URL),
    });
  }, []);

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
