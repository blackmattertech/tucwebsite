/**
 * Third-party scripts with optimized loading.
 *
 * AUDIT (Mar 2025): No analytics or third-party scripts found.
 * - index.html: Only app entry script (no external scripts)
 * - Google Maps: Map section uses iframe when in view (deferred)
 * - react-slick: Bundled dependency, lazy-loaded with GoogleReviewsSection
 *
 * When adding analytics (GA4, GTM, etc.), add a script component with strategy
 * (e.g. lazyOnload or afterInteractive) here.
 *
 * Strategies:
 * - lazyOnload: Analytics, chat widgets (loads after window load / idle)
 * - afterInteractive: Necessary scripts (loads after hydration)
 */
export function ThirdPartyScripts() {
  return null;
}
