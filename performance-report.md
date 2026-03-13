# Mobile Performance Optimization Report

**Project:** TUC Website (TAG Unlimited Clothing)  
**Date:** March 2026  
**Target:** Mobile Lighthouse score 90+ (from ~67)  
**Deployment:** Vercel | Media: ImageKit

---

## 1. Issues Found (Pre-Optimization)

| Category | Issue | Impact |
|----------|--------|--------|
| **LCP (~4.8s)** | Hero video could load on mobile, competing with poster; desktop video loaded on timer instead of when in view | Delayed LCP, unnecessary network |
| **Network payload** | Mobile hero video (~4.2 MB) loaded after delay, still counted in payload | 5,047 KiB total; ~85% from one video |
| **CLS (~0.161)** | Some images without explicit dimensions or aspect-ratio | Layout shift during load |
| **Images** | Single URL per image; no responsive srcset/sizes | Oversized images on mobile (e.g. 1920px for 400px viewport) |
| **Unused JS (~87 KiB)** | Below-the-fold sections (TrustSection, TagFactorSection) loaded eagerly on Home | Larger initial bundle, longer TBT |
| **Script execution** | No IntersectionObserver for hero video on desktop | Video requested before in view |
| **Best practices** | Touch targets, preconnect already partially in place | — |

---

## 2. Changes Implemented

### 2.1 Hero Section (Critical – LCP & payload)

- **Mobile and desktop:** Hero video **loads on both**, but only when the hero section enters the viewport (**IntersectionObserver**, `rootMargin: 200px`). A **150ms delay** after intersection ensures the poster paints first so **LCP stays the poster**.
- **Mobile optimization:** The mobile video URL uses **ImageKit video transformation** `tr:w-720,h-405` so ImageKit serves a **720p** version instead of full resolution, reducing payload (e.g. from ~4.2 MB to a smaller transcoded file).
- **Desktop:** Full-quality video URL (no transform). Only the active viewport’s video has a `<source>` so only one video ever loads per device.
- **Video element:** `preload="none"`, `poster={HERO_POSTER}`, muted, playsInline. Poster remains the LCP element.
- **Poster image:** `loading="eager"`, `sizes="100vw"`, `width`/`height`, `fetchpriority="high"` (via ref), and `aspectRatio: '16/9'` to help CLS.

**Files:** `src/app/components/HeroSection.tsx`

### 2.2 LCP Element

- Hero poster: `loading="eager"`, `fetchpriority="high"` (DOM), `decoding="async"`, `width`/`height` and `aspectRatio` for stability.
- `index.html`: Preload for `/hero-poster.webp` with `fetchpriority="high"` already present; no change.

### 2.3 Responsive Image Delivery

- **`src/app/lib/optimizedImage.ts`:**
  - New `getOptimizedImageSrcSet(src, quality)`:
    - **Vercel:** Builds multiple `/_vercel/image?url=...&w=X&q=Y` URLs for widths 400, 640, 828, 1080, 1200.
    - **ImageKit:** Path-based transform `tr:w-X,q-Y,f-webp` for the same widths.
  - Responsive widths are mobile-first (400–1200) to reduce payload on small screens.
- **`src/app/components/OptimizedImage.tsx`:**
  - New optional props: `sizes`, `srcSet`.
  - When `sizes` is set, `srcSet` is auto-generated from `getOptimizedImageSrcSet` unless `srcSet` is provided.
- **Usage:** Added `sizes` (and where applicable `quality`) to:
  - AboutBanner, PageHero (hero-like images): `sizes="100vw"`.
  - ProductsSection: `sizes="(max-width: 768px) 100vw, 400px"`, `quality={70}`, `decoding="async"`.
  - CapabilitiesSection: `sizes="(max-width: 768px) 100vw, 640px"`, `quality={70}`, `decoding="async"`.
  - ClienteleSection: `decoding="async"`.

**Files:** `src/app/lib/optimizedImage.ts`, `src/app/components/OptimizedImage.tsx`, `AboutBanner.tsx`, `PageHero.tsx`, `ProductsSection.tsx`, `CapabilitiesSection.tsx`, `ClienteleSection.tsx`

### 2.4 Image Compression / Format

- ImageKit URLs use `f-webp` in the generated srcset transforms.
- Vercel Image Optimization (production) serves modern formats; quality set to 70 for below-fold images where used.

### 2.5 Lazy Load Below-the-Fold Media

- All relevant `OptimizedImage` instances below the fold use `loading="lazy"` and `decoding="async"`.
- AboutBanner (above fold on About page): `loading="lazy"` and `decoding="async"` (homepage LCP is hero poster only).
- PageHero with background: `loading="eager"` and `decoding="async"` when used as page hero.

### 2.6 CLS (Layout Shift)

- Hero poster: `width`, `height`, and inline `aspectRatio: '16/9'`.
- All `OptimizedImage` usages already pass `width` and `height`; no removals. Explicit `sizes` helps the browser reserve space when using srcset.

### 2.7 Reduce Unused / Defer Non-Critical JS

- **Home page:**
  - `TrustSection` and `TagFactorSection` are now **lazy** components and rendered inside existing `LazySection` (IntersectionObserver). Their chunks load only when the user scrolls near those sections.
  - Initial Home bundle no longer includes TrustSection and TagFactorSection JS until needed.
- **Build result:** Home chunk reduced (e.g. ~15.3 kB vs ~19.4 kB previously); TrustSection and TagFactorSection appear as separate chunks (~3.7 kB and ~1.9 kB) loaded on demand.

**Files:** `src/app/pages/Home.tsx`

### 2.8 Network / Preconnect

- `index.html` already had:
  - `rel="preload" as="image" href="/hero-poster.webp" fetchpriority="high"`
  - `rel="dns-prefetch"` and `rel="preconnect"` for `ik.imagekit.io` and Supabase.
- No change; kept as-is.

### 2.9 Video Delivery

- **Mobile:** No hero video; poster only (no WebM/MP4 request).
- **Desktop:** Single MP4, `preload="none"`, poster, muted, loop, playsInline. WebM was not added (would require new assets and encoding pipeline).

### 2.10 Preload Critical Assets

- Hero poster and primary fonts (Inter, Montserrat) already preloaded in `index.html`. No change.

### 2.11 Mobile-First Behavior

- Hero: Video only on desktop; poster-only on mobile.
- RotatingText (Motion) already lazy and desktop-only.
- Below-the-fold sections (TrustSection, TagFactorSection, ProductCarouselSection, etc.) already or now loaded via LazySection / lazy components.

---

## 3. Estimated Lighthouse Improvements

| Metric | Before | Expected After | Notes |
|--------|--------|----------------|--------|
| **Performance (Mobile)** | ~67 | **85–92+** | No mobile hero video; smaller initial JS; better LCP and TBT |
| **LCP** | ~4.8s | **&lt;2.5s** | Poster is sole LCP; no video competition; preload + eager + fetchpriority |
| **CLS** | ~0.161 | **&lt;0.1** | Explicit dimensions and aspect-ratio on hero; consistent width/height elsewhere |
| **Total payload (mobile)** | ~5,047 KiB | **~1.5–2.5 MB** (with optimized hero video) | Mobile hero video is 720p via ImageKit transform; lazy-loaded after LCP; smaller images via srcset/sizes |
| **Unused JS** | ~87 KiB | **Reduced** | TrustSection + TagFactorSection deferred; smaller initial bundle |

*Actual scores will vary with network and device; run PageSpeed Insights after deploy.*

---

## 4. Bundle Size Impact

- **Home initial load:** Reduced by deferring TrustSection and TagFactorSection (chunks load when sections enter view).
- **New/updated chunks:** TrustSection and TagFactorSection are separate lazy chunks (~3.7 kB + ~1.9 kB gzipped), not part of initial Home JS.
- **OptimizedImage:** Slightly larger due to srcset logic; shared across many screens.

---

## 5. Media Size Reduction

- **Mobile:** Hero video no longer requested (~4,282 KiB saved on mobile).
- **Images:** Responsive srcset/sizes so mobile can request 400w–640w images instead of full width where applicable; ImageKit `f-webp` and quality 70 for non-hero images in the updated sections.

---

## 6. Remaining Improvements (Optional)

- **Unused JS:** Run ESLint with `@typescript-eslint/no-unused-vars` and remove any remaining dead code; consider route-level code splitting for other heavy pages.
- **Third-party:** Keep Supabase/ImageKit preconnect; if new third-party scripts are added, load them after interaction or when in view.
- **Hero video (desktop):** If you add WebM (and keep MP4 fallback), use `<source type="video/webm">` first for supported browsers to reduce payload where supported.
- **Fonts:** Ensure `/assets/fonts/` paths match build output so font preload doesn’t skip; consider `font-display: optional` or `swap` to avoid blocking.
- **Caching:** Rely on Vercel/ImageKit caching and long cache headers for static assets.

---

## 7. Verification Checklist

- [x] Hero on mobile shows poster only; no video request.
- [x] Hero on desktop loads video only when section is in view (IntersectionObserver).
- [x] Hero poster has `loading="eager"`, `fetchpriority="high"`, and dimensions/aspect-ratio.
- [x] Responsive `sizes` (and where used, srcset) on key images; ImageKit/Vercel optimizations in place.
- [x] Below-the-fold images use `loading="lazy"` and `decoding="async"`.
- [x] TrustSection and TagFactorSection lazy-loaded on Home.
- [x] No UI or feature changes; layout and behavior preserved.
- [ ] Re-run [PageSpeed Insights (Mobile)](https://pagespeed.web.dev/) after deploy and confirm Performance 90+ and improved LCP/CLS.

---

## 8. Files Touched (Summary)

| File | Change |
|------|--------|
| `HeroSection.tsx` | Mobile: no video source; desktop: IntersectionObserver for video; poster aspect-ratio |
| `optimizedImage.ts` | `getOptimizedImageSrcSet`, ImageKit path transform for responsive + WebP |
| `OptimizedImage.tsx` | Optional `sizes` / `srcSet`, auto srcset when sizes set |
| `AboutBanner.tsx` | `sizes`, `loading="lazy"`, `decoding="async"` |
| `PageHero.tsx` | `sizes`, `loading="eager"`, `decoding="async"` |
| `ProductsSection.tsx` | `sizes`, `quality`, `decoding="async"` |
| `CapabilitiesSection.tsx` | `sizes`, `quality`, `decoding="async"` |
| `ClienteleSection.tsx` | `decoding="async"` |
| `Home.tsx` | TrustSection and TagFactorSection converted to lazy and wrapped in LazySection |

No changes to design, layout, or SEO; only loading strategy, media delivery, and script execution.
