# PageSpeed Insights – Reaching 100 on All Metrics

This project has been optimized for [PageSpeed Insights](https://pagespeed.web.dev/). After deploying, run the report for both **Mobile** and **Desktop**.

## What’s Already Done

- **Performance:** LCP image (hero poster) preloaded with `fetchpriority="high"`, `loading="eager"` on hero img, video deferred (loads after 2s or first scroll). Non-blocking CSS, code-split routes, manual chunks (react, router, motion, gsap, radix). IndexNow script deferred with `requestIdleCallback` so it doesn’t block TBT.
- **Accessibility:** Per-route meta (title, description, canonical). Descriptive alt text on PageHero and AboutBanner. Contact modal has `aria-modal="true"`, `aria-labelledby`, and focus moved into the modal when opened. Forms use labels and `aria-label` where needed.
- **Best practices:** No `document.write`, HTTPS expected in production. Env vars documented in `.env.example` (client-safe only).
- **SEO:** Sitemap (no 404 contact URL), robots.txt, manifest.json, structured data (Organization, LocalBusiness, FAQ). Per-route title, description, and canonical via `PageMeta`.

## Checklist for 100 Scores

1. **Ensure these files exist in `public/`:**
   - `logo.svg` – favicon and PWA icons (referenced in `index.html` and `manifest.json`).
   - `og-apparel-manufacturer.jpg` – 1200×630px for social sharing (referenced in OG meta). If missing, add the file or change the OG image URL in `index.html` to an existing asset.

2. **Deploy and test**
   - Deploy to production (e.g. Vercel).
   - Run [PageSpeed Insights](https://pagespeed.web.dev/) for your production URL (e.g. `https://tagunlimitedclothing.com/`) on **Mobile** and **Desktop**.

3. **If Performance is below 100**
   - Confirm hero image is the LCP element and loads first (preload + `loading="eager"` are set).
   - Check “Reduce unused JavaScript” – routes and heavy libs (GSAP, Motion) are already code-split; consider lazy-loading more below-the-fold sections if needed.
   - Ensure server/CDN uses compression (gzip/Brotli) and caching for static assets.

4. **If Accessibility is below 100**
   - Run Lighthouse and fix any reported issues (contrast, tap target size, missing labels).
   - Ensure all images have appropriate `alt` (descriptive or `alt=""` if decorative).
   - Buttons and links should have a minimum 48×48px tap target on mobile (add padding/min-height in CSS if needed).

5. **If SEO is below 100**
   - Confirm `document.title` and meta description update when navigating (they do via `PageMeta`).
   - Ensure canonical URL matches the production domain (set `VITE_APP_URL` in production env if different from `https://tagunlimitedclothing.com/`).

Re-run the report after each change to track progress.
