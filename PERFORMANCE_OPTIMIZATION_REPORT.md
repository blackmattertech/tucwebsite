# Performance Optimization Report

**Project:** TAG Unlimited Clothing (TUC) Website  
**Date:** March 2026  
**Target:** Lighthouse 90–100 (Performance, Accessibility, Best Practices, SEO) across Mobile, Tablet, Desktop  
**Constraint:** No changes to UI, layout, animations, or features — performance only.

---

## 1. Executive Summary

This report documents performance optimizations applied to reduce payload size, improve LCP/CLS/INP, and align with Vercel/Lighthouse best practices. The site already had hero poster preload, lazy hero video (IntersectionObserver), responsive images (srcset/sizes), lazy routes, and critical CSS. Additional changes focus on video preload behavior, below-the-fold video lazy-loading, ImageKit format selection, and CLS prevention.

---

## 2. Before vs After

| Metric | Before | After (Estimated) |
|--------|--------|-------------------|
| **Total payload (mobile)** | ~5 MB (hero video ~4.2 MB) | ~1–2.5 MB (video deferred + metadata-only preload) |
| **Hero video initial load** | Full video requested when in view | Only metadata preloaded until play |
| **About intro video** | Loaded on About page load | Loaded only when section enters viewport |
| **ImageKit images** | Fixed WebP (`f-webp`) | Format auto (`f-auto` → AVIF/WebP by client) |
| **Hero / intro video CLS** | No explicit dimensions | `width`/`height` set on all video elements |

---

## 3. Payload Size Reduction

| Resource | Before | After |
|----------|--------|--------|
| **Hero video (desktop)** | Full file loaded after 150 ms in view | `preload="metadata"` → only metadata initially; full buffer on play |
| **Hero video (mobile)** | 720p via ImageKit when in view | Same + metadata-only preload |
| **About intro video** | ~720p MP4 requested on About load | Same file requested only when intro section is in view (IntersectionObserver) |
| **Images (ImageKit)** | WebP at fixed quality | `f-auto` allows AVIF where supported (smaller at same quality) |
| **JS/CSS** | Already code-split (lazy routes, lazy sections) | No change in this pass |

---

## 4. Video Optimization

### 4.1 Hero Section

- **Poster:** Already uses `hero-poster.webp` with preload + `fetchpriority="high"` in `index.html`. Poster is the LCP element.
- **Lazy load:** Video source is only rendered when hero is in viewport (IntersectionObserver, 150 ms delay). Unchanged.
- **Preload:** Changed from `preload="none"` to **`preload="metadata"`** so that when the video *is* loaded, the browser fetches only metadata (duration, dimensions) instead of buffering the full file. Full buffer happens on play. Reduces initial video payload.
- **CLS:** Added explicit **`width={1920}` and `height={1080}`** to both hero `<video>` elements so layout is reserved and CLS is avoided.

**Files:** `src/app/components/HeroSection.tsx`

### 4.2 About Page Intro Video

- **Lazy source:** The intro video `src` is no longer set on initial render. A state `introVideoInView` is set to `true` when the intro section enters the viewport (IntersectionObserver, `rootMargin: 100px`, `threshold: 0.01`). Only then is `src={INTRO_VIDEO_SRC}` applied, so the ~720p MP4 is not requested until the user scrolls near that section.
- **Preload:** Already `preload="metadata"`.
- **CLS:** Added **`width={1280}` and `height={720}`** to the intro `<video>`.

**Files:** `src/app/pages/About.tsx`

### 4.3 Video Re-encoding (Recommendation — Not Code)

To reach a target of **&lt;1 MB** for the hero video and further reduce payload:

- Re-encode hero MP4(s) (desktop/mobile) to **H.264** (or provide **WebM** as first `<source>`) with lower bitrate while keeping acceptable visual quality.
- Re-encode the About intro video similarly if it is large.
- This step is done in a media pipeline (e.g. FFmpeg), not in the codebase.

---

## 5. Image Optimization

- **Formats:** ImageKit URLs generated in `src/app/lib/optimizedImage.ts` now use **`f-auto`** instead of `f-webp` in the path-based transform. ImageKit will serve AVIF where supported and fall back to WebP (or configured format), reducing size at equivalent quality.
- **Responsive images:** Existing `getOptimizedImageSrcSet` and `sizes` usage (e.g. AboutBanner, PageHero, ProductsSection, CapabilitiesSection, ClienteleSection) unchanged.
- **Lazy loading:** Below-the-fold images continue to use `loading="lazy"` and `decoding="async"`; hero poster remains eager with high fetchpriority.

**Files:** `src/app/lib/optimizedImage.ts`

---

## 6. JavaScript & Critical Path

- **Bundles:** No further code changes in this pass. Lazy routes (`src/app/routes.tsx`), lazy sections (e.g. TrustSection, TagFactorSection on Home), and Vite `manualChunks` (router, react-vendor, motion, gsap, radix) remain as previously configured.
- **Critical path:** `index.html` already has inline critical CSS, preload for hero poster and critical fonts, and no blocking scripts in `<head>`. Third-party (IndexNow) is deferred with `requestIdleCallback`/timeout.

---

## 7. Fonts

- **Preload:** Only critical fonts (e.g. Inter 400, Montserrat 700) are preloaded in `index.html`.
- **Loading:** `src/styles/fonts.css` uses `font-display: swap` for all weights. No change.

---

## 8. Caching Strategy

- **Vercel:** `vercel.json` already defines long-lived cache headers:
  - `/assets/(.*)` → `Cache-Control: public, max-age=31536000, immutable`
  - `/hero-poster.webp`, `/desktop/*.mp4`, `/mobile/*.mp4`, `/logo.svg` → same
  - `*.png`, `*.jpg`, `*.webp` → `max-age=2592000`
- No code changes to caching in this pass.

---

## 9. Layout Shift (CLS) Prevention

- **Hero videos:** Explicit `width` and `height` on both hero `<video>` elements (1920×1080) so layout is reserved before the video loads.
- **About intro video:** Explicit `width={1280}` and `height={720}`.
- **Images:** Existing `OptimizedImage` usage with `width`/`height` and `sizes`/srcset remains; no removals.

---

## 10. Files Modified (This Pass)

| File | Change |
|------|--------|
| `src/app/components/HeroSection.tsx` | Hero `<video>`: `preload="metadata"`, `width={1920}`, `height={1080}` |
| `src/app/pages/About.tsx` | Intro video: lazy `src` (set only when section in view via `introVideoInView`); `width={1280}`, `height={720}`; added `useState` and second IntersectionObserver for in-view detection |
| `src/app/lib/optimizedImage.ts` | ImageKit transform: `f-webp` → `f-auto` for format auto (AVIF/WebP) |

---

## 11. Performance Gains (Estimated)

| Area | Effect |
|------|--------|
| **Payload** | Lower initial video bytes (metadata-only hero; intro video not requested until scroll). With re-encoded hero &lt;1 MB, total payload can sit in ~1–2.5 MB range on mobile. |
| **JS** | No change in this pass; existing code-splitting and lazy sections retained. |
| **Images** | Smaller responses where ImageKit serves AVIF via `f-auto`. |
| **Video** | Hero: metadata-only preload reduces contention with LCP. About: intro video no longer blocks or competes with initial About load. |
| **CLS** | Explicit video dimensions reduce layout shift from hero and About intro. |

---

## 12. Expected Lighthouse Impact

- **Performance (90–100):** Stronger LCP (poster remains primary; video metadata-only), lower TBT/INP from deferred video and existing lazy JS. Re-encoding hero to &lt;1 MB would further improve payload and speed.
- **Accessibility / Best Practices / SEO:** No regressions; no UI or feature changes. Existing practices (semantics, preconnect, meta, etc.) unchanged.

---

## 13. Verification Checklist

- [x] Hero video uses `preload="metadata"` and has width/height.
- [x] About intro video loads only when its section is in view.
- [x] ImageKit images use `f-auto` for format selection.
- [x] No UI, layout, or feature changes.
- [ ] Re-run Lighthouse (Mobile / Desktop / Tablet) after deploy and confirm scores 90–100 where applicable.
- [ ] Optionally re-encode hero and intro videos to &lt;1 MB and update sources.

---

## 14. References

- Previous optimization details (hero poster, lazy hero video, responsive images, lazy sections): `performance-report.md`
- Hero poster config: `src/hero-poster-config.ts`
- Build config: `vite.config.ts`
- Caching: `vercel.json`
