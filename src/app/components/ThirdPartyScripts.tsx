/**
 * Third-party scripts with optimized loading.
 *
 * AUDIT (Mar 2025): No analytics or third-party scripts found.
 * - index.html: Only app entry script (no external scripts)
 * - Google Maps: LazyMapEmbed loads iframe when in view (already deferred)
 * - react-slick: Bundled dependency, lazy-loaded with GoogleReviewsSection
 *
 * When adding analytics (GA4, GTM, etc.), import Script and add here:
 *
 *   import { Script } from './Script';
 *   <Script src="https://..." strategy="lazyOnload" />
 *
 * Strategies:
 * - lazyOnload: Analytics, chat widgets (loads after window load / idle)
 * - afterInteractive: Necessary scripts (loads after hydration)
 */
export function ThirdPartyScripts() {
  return null;
}
