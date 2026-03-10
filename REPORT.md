# Web Performance, SEO & Codebase Audit Report

**Project:** Premium Website Design (TAG Unlimited Clothing)  
**Audit Date:** March 2025  
**Scope:** Full codebase analysis for responsiveness, performance, SEO, accessibility, security, and production readiness.

---

## Executive Summary

The codebase is a **React 18 + Vite 6** SPA with React Router, Tailwind CSS, Radix UI, Motion (Framer Motion), GSAP, and Supabase/ImageKit integration. It already has **good foundations**: code-split routes, lazy-loaded pages, hero preload, sitemap, robots.txt, Organization/LocalBusiness/FAQ schema, and non-blocking CSS. Several improvements will make it **fully responsive**, **Lighthouse-optimized**, **SEO- and accessibility-ready**, and **production-grade**.

**Key findings:**
- **Unused code:** 6+ components, 1 page (Quote), duplicate `cn()` utility, unused imagekitStorage helpers, and legacy `src/components/` files.
- **SEO:** Single static meta in `index.html`; no per-route titles/descriptions or canonical URLs.
- **Performance:** Manual chunks and lazy routes in place; some heavy UI libraries; images mostly use `loading="lazy"` but a few hero/above-fold images should be verified.
- **Responsiveness:** Many media queries (375px–1600px); a few fixed widths may need review on very small/ultra-wide viewports.
- **Accessibility:** Empty `alt=""` on decorative images; aria usage present but not uniform.
- **Discovery:** `robots.txt`, `sitemap.xml`, and structured data exist; `manifest.json` and optional PWA metadata missing; OG image referenced may need to exist in `public/`.

---

## 1. Codebase Issues

### 1.1 Unused Files

| File | Notes |
|------|--------|
| `src/app/components/BlogSection.tsx` | Not imported; Blog page does not use it. |
| `src/app/components/LazyMapEmbed.tsx` | Not imported; MapSection/MapFaqSection use raw iframe. |
| `src/app/components/Script.tsx` | Not imported; only referenced in comment in ThirdPartyScripts. |
| `src/app/components/SocialMediaSection.tsx` | Not imported; Social page does not use it. |
| `src/app/components/RotatingText.tsx` | Not imported anywhere. |
| `src/app/components/TextType.tsx` | Not imported anywhere. |
| `src/app/pages/Quote.tsx` | No route in `routes.tsx`; page is dead. |
| `src/lib/utils.ts` | Exports `cn()`; app uses `src/app/components/ui/utils.ts` instead. |
| `src/data/client-logos.json` | Not imported; `src/data/client-logos.ts` is used. |
| `src/components/FlowingMenu.jsx` | Not imported. |
| `src/components/LogoLoop.jsx` | Used via import from app (e.g. Home/ClienteleSection); verify single source. |
| `src/components/CurvedLoop.jsx` | Not imported. |

**Suggested solution:** Remove or archive unused components and `Quote.tsx`; delete `src/lib/utils.ts` and `src/data/client-logos.json` if confirmed redundant. Consolidate logo usage to one source (e.g. `client-logos.ts` + media assets).

### 1.2 Unused Imports

Unused imports should be removed file-by-file to reduce bundle noise and avoid misleading code. Examples to audit (not exhaustive):

- **`src/app/pages/Home.tsx`:** `import { lazy } from 'react'` — confirm if `lazy` is used inside Home or only in routes.
- Any file importing `useEffect`/`useState`/etc. where the hook is never used.

**Suggested solution:** Run ESLint with `react-hooks/exhaustive-deps` and an unused-import rule (e.g. `@typescript-eslint/no-unused-vars`), then fix reported files.

### 1.3 Duplicate Logic

| Item | Location | Recommendation |
|------|----------|----------------|
| **`cn()`** | `src/lib/utils.ts` and `src/app/components/ui/utils.ts` | Remove `src/lib/utils.ts`; use only `app/components/ui/utils.ts` everywhere. |
| **ImageKit URL helpers** | `src/app/lib/imagekitStorage.ts` | Only `clientLogoUrl` is imported (About). `capabilityImageUrl`, `productVideoUrl`, `tagFactorMediaUrl`, `heroVideoUrl`, `principleImageUrl` are unused. Either use them where appropriate or remove to avoid dead code. |

### 1.4 Component Architecture

- **Large components:** `About.tsx`, `CapabilitiesSection.tsx`, and some pages are sizeable; consider splitting into subcomponents or feature folders for maintainability.
- **Prop drilling:** Layout → Header/Footer/ContactModal is reasonable; no deep prop drilling reported.
- **Re-renders:** Some list/carousel components could benefit from `React.memo` or stable callbacks where profiling shows unnecessary re-renders (e.g. logo marquees, card lists). `AboutSection`, `StatsCards`, and `PrinciplesSection` already use `React.memo`; extend pattern where needed.

---

## 2. Responsiveness Audit

### 2.1 Current State

- **Breakpoints in use:** 375px, 480px, 640px, 768px, 900px, 1023px, 1024px, 1200px, 1280px, 1400px, 1440px, 1536px, 1600px (CSS and Tailwind).
- **Container widths:** Many sections use `max-width` (e.g. 720px, 900px, 1200px, 1400px) and scale with breakpoints — good.
- **Fixed widths:** Some fixed pixel widths (e.g. icons 36px, 40px; circular text 200px; contact button 132px/100px/82px) are used for controls and are acceptable if they don’t break layout on small screens.

### 2.2 Issues & Recommendations

| Area | Problem | File(s) | Recommendation |
|------|---------|--------|----------------|
| **Mobile** | Ensure no horizontal overflow from fixed widths or long words | Global | Use `overflow-x: hidden` on body/root where already applied; add `overflow-wrap: break-word` on long headings (already present in some About section headings). |
| **Tablet** | Breakpoints at 768px and 1024px are used consistently | — | Verify 768–1024px for Infrastructure (mobile vs desktop blocks) and Technology section; no change if already tested. |
| **Desktop** | Max-widths up to 1560px in ProductsSection | `ProductsSection.css` | Good; ensure ultra-wide (e.g. 1920px+) has a sensible max container so content doesn’t over-stretch. |
| **Typography** | Mix of `clamp()` and fixed breakpoint font sizes | Various CSS | Prefer `clamp()` for key headings/body where possible for smoother scaling. |
| **Images** | Responsive images via ImageKit/`OptimizedImage` | — | Confirm `srcset`/sizes where applicable for different viewport widths. |

### 2.3 CSS Media Queries Summary

- **Tailwind:** Used in JSX (e.g. `lg:hidden`, `md:top-24`); ensure Tailwind config or build includes the same breakpoints as custom CSS (e.g. 1024px for `lg`).
- **Custom CSS:** Many components have their own media queries; consider documenting a single breakpoint scale (e.g. 640 / 768 / 1024 / 1280) to avoid drift.

---

## 3. Performance Audit (Lighthouse-Level)

### 3.1 Bundles & Code Splitting

- **Current:** Routes are lazy-loaded; `manualChunks` in `vite.config.ts` split `react-vendor`, `router`, `motion`, `gsap`, `radix`.
- **Heavy dependencies:** MUI (`@mui/material`, `@mui/icons-material`), Radix (many primitives), Recharts, GSAP, Motion, Embla Carousel. If a page doesn’t use MUI/Recharts, consider lazy-loading that page or the component that imports them so they’re not in the initial bundle.

**Suggestions:**
- Use dynamic `import()` for any screen that only uses MUI or Recharts (e.g. a dashboard or admin view).
- Confirm tree-shaking for `lucide-react` (import specific icons) and MUI (use path imports if applicable).

### 3.2 React Performance

- **Memoization:** `React.memo` used in `AboutSection`, `StatsCards`, `PrinciplesSection`; `useCallback`/`useMemo` in GoogleReviewsSection, Header, Footer, CapabilitiesSection, PrinciplesSection, etc.
- **Suggestions:** Profile expensive list/carousel components (e.g. client logos, product cards); add `React.memo` to list item components and ensure parent callbacks are wrapped in `useCallback` where they’re passed as props.

### 3.3 Image Optimization

- **Lazy loading:** Many `<img>` tags use `loading="lazy"` (About, CapabilitiesSection, ProductsSection, AboutSection, TagFactorSection, MapFaqSection, ClienteleSection, etc.). Good.
- **LCP:** `index.html` preloads `/hero-poster.webp` with `fetchpriority="high"` — good for LCP.
- **Formats:** Prefer WebP/AVIF where supported; ImageKit can serve optimized formats via URL params.
- **Suggestions:** Ensure above-the-fold hero images do not use `loading="lazy"`. Add `decoding="async"` where appropriate. Use `OptimizedImage` or ImageKit responsive URLs with `srcset`/sizes for key images.

### 3.4 Video

- **Hero/sections:** If video is used in hero or critical path, ensure `preload="metadata"` or `preload="none"` and a poster image to avoid blocking LCP. Not fully audited in this pass; verify in implementation.

### 3.5 Animation

- **Libraries:** Motion (Framer Motion) and GSAP. Prefer `transform` and `opacity` for animations to avoid layout thrashing.
- **Reduced motion:** `index.html` includes `@media (prefers-reduced-motion: reduce)` for the hero placeholder; ensure interactive components respect `prefers-reduced-motion` where applicable.

### 3.6 JavaScript Blocking

- **Critical path:** Single entry `main.tsx`; non-blocking CSS plugin in Vite defers non-critical CSS. Good.
- **Hydration:** React 18; ensure no large synchronous work during first paint. Lazy routes help.

---

## 4. SEO Audit

### 4.1 Meta Tags

- **Current:** `index.html` has a single set of meta tags: title, description, theme-color, robots, googlebot, canonical, OG (type, title, description, url, site_name, image, image:alt, locale, image dimensions), Twitter card.
- **Gap:** All routes share the same title/description/canonical. Per-route meta is missing.

**Suggested solution:** Introduce per-route meta (e.g. React Helmet or a small document-title/description updater in Layout/Outlet context) so each route sets:
- `document.title`
- `meta name="description"`
- `link rel="canonical" href={currentUrl}`
- Optional: route-specific OG/Twitter tags for key pages (About, Products, Blog).

### 4.2 Structured Data

- **Current:** Organization, LocalBusiness, and FAQPage schema in `index.html`.
- **Suggestions:** Add Article schema for blog posts (BlogPost page). Consider BreadcrumbList for product/capability sub-pages. Keep Organization/LocalBusiness as-is unless business details change.

### 4.3 Sitemap & Robots

- **Sitemap:** `public/sitemap.xml` exists and lists main URLs (home, about, capabilities, products, blog, social, contact). The contact URL (`/contact-apparel-manufacturer-bangalore`) is in the sitemap but there is no matching route in `routes.tsx` (contact may be modal-only); remove from sitemap if the page does not exist or add a route. Blog paths use `blog/...`; ensure they match route paths.
- **Robots:** `public/robots.txt` allows all and points to sitemap. Good.
- **Crawlability:** No `noindex` on key pages in this audit; SPA is crawlable if pre-rendered or if crawlers execute JS (e.g. Google).

### 4.4 URL Structure

- **Current:** SEO-friendly paths (e.g. `/about-apparel-manufacturer-bangalore`, `/products/t-shirt-manufacturer-bangalore`). Good.
- **Internal linking:** Ensure key pages (Home, About, Capabilities, Products, Blog) link to each other via Header/Footer; add contextual in-content links where it helps users and SEO.

### 4.5 Image SEO

- **Alt text:** Two instances of empty `alt=""`: `PageHero.tsx` and `AboutBanner.tsx`. If images are decorative, use `alt=""` and ensure they are not critical for context; otherwise add descriptive, keyword-aware alt text.
- **File names:** ImageKit URLs use encoded filenames; ensure important images have descriptive alt text and, where relevant, descriptive filenames in the CMS/source.

---

## 5. Accessibility Audit

- **Alt text:** Empty `alt=""` in PageHero and AboutBanner — acceptable only if images are purely decorative; otherwise add short descriptions.
- **Contrast:** Not automatically tested; recommend running axe or Lighthouse accessibility audit and fixing any contrast issues (e.g. yellow on white, light gray text).
- **ARIA:** Various components use `aria-*` and `role=` (e.g. ContactModal, navigation, carousels). Ensure modals have `aria-modal="true"`, focus trap, and `aria-label` where needed; buttons/links have accessible names.
- **Headings:** Use a single `<h1>` per page and logical heading order (h1 → h2 → h3). Verify on About, Blog, and long pages that heading levels don’t skip (e.g. h2 → h4).
- **Focus:** Ensure visible focus styles on interactive elements (buttons, links, form controls) and that ContactCircleButton and FloatingContactButtons are reachable and usable via keyboard.

---

## 6. Security Audit

- **Environment variables:** Supabase URL and anon key, Contact API URL, and ImageKit URL are read from `import.meta.env` (Vite). These are build-time and exposed in the client bundle; ensure Supabase anon key is restricted (RLS/policies) and no secret keys are used in frontend.
- **.env.example:** Documents ImageKit only. Add placeholders for `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_CONTACT_API_URL` (with “public/client-safe” note) so new developers know what to set.
- **Unsafe patterns:** One use of `dangerouslySetInnerHTML` in `chart.tsx` (Recharts/tooltip). Ensure the content is sanitized or from a trusted source.
- **Dependencies:** Run `npm audit` / `pnpm audit` regularly and fix high/critical issues.

---

## 7. Production Readiness

- **Build:** `vite build` with hero-poster optimization, font preload injection, and list-client-logos scripts — good.
- **Environment:** Production uses `import.meta.env.PROD` and env vars; ensure staging/production envs set all required `VITE_*` and that `.env` is not committed.
- **Deployment:** SPA; ensure server or CDN serves `index.html` for all routes (e.g. Vercel/Netlify rewrites). Sitemap and robots are static in `public/`.
- **Recommendations:** Add a `manifest.json` (name, short_name, icons, theme_color) for PWA/discovery. Ensure `og-apparel-manufacturer.jpg` exists in `public/` or at the URL referenced in index.html.

---

## 8. SEO Discovery Files

| File | Status | Recommendation |
|------|--------|----------------|
| **robots.txt** | Present in `public/` | Keep; ensure Sitemap URL matches production domain. |
| **sitemap.xml** | Present in `public/` | Keep; add any new routes; consider lastmod if content changes often. |
| **manifest.json** | Not found | Add to `public/` with name, icons, theme_color for better discovery and optional PWA. |
| **Favicon** | Referenced in index.html (`/logo.svg`) | Ensure `/logo.svg` exists in `public/`. |
| **OG image** | Referenced as `og-apparel-manufacturer.jpg` | Ensure file exists in `public/` or update URL to existing asset. |

---

## 9. Code Quality

- **Folder structure:** `src/app/` contains components, pages, lib, context, data; `src/components/` has legacy or shared components. Consider moving all app-specific components under `app/` and reserving `src/components/` for truly shared/design-system code.
- **Naming:** Consistent use of PascalCase for components and camelCase for utilities; some CSS files use BEM-like prefixes (e.g. `about-infrastructure-*`). Good.
- **Consistency:** Mix of Tailwind and custom CSS; document when to use which (e.g. layout vs. complex component-specific CSS).
- **Readability:** Large files (About, CapabilitiesSection) would benefit from splitting or clear section comments.

---

## 10. Recommended Actions

### High Priority

1. **Remove unused code:** Delete or archive unused components (BlogSection, LazyMapEmbed, Script, SocialMediaSection, RotatingText, TextType), remove Quote.tsx or add a route, remove `src/lib/utils.ts`, and trim unused exports in `imagekitStorage.ts`.
2. **Per-route SEO:** Add document title, meta description, and canonical URL per route (e.g. via Layout/Outlet or a small hook/component).
3. **Image alt text:** Replace empty `alt=""` in PageHero and AboutBanner with descriptive text if images are not purely decorative.
4. **.env.example:** Document `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_CONTACT_API_URL`.

### Medium Priority

5. **Manifest:** Add `public/manifest.json` with app name, icons, and theme_color.
6. **OG image:** Ensure `public/og-apparel-manufacturer.jpg` exists or update meta tag to an existing image.
7. **Accessibility:** Run Lighthouse/axe and fix contrast and focus issues.
8. **Bundle:** Lazy-load or route-split any screen that imports MUI/Recharts if not on critical path.

### Lower Priority

9. **Article schema:** Add JSON-LD Article for blog posts.
10. **Responsive images:** Add srcset/sizes for key images (hero, product images) via ImageKit or OptimizedImage.
11. **Consolidate logos:** Use a single source (e.g. media assets + client-logos.ts) and remove duplicate or unused logo assets.

---

## Summary Table

| Category        | Status        | Action |
|----------------|---------------|--------|
| Unused files   | Issues found  | Remove or archive listed files |
| Unused imports | To audit      | ESLint + manual pass |
| Responsiveness | Good base     | Verify overflow and ultra-wide |
| Performance    | Good base     | Per-route chunks, image srcset |
| SEO            | Partial       | Per-route meta, Article schema |
| Accessibility  | Partial       | Alt text, contrast, focus |
| Security       | OK            | Document envs, audit deps |
| Discovery      | Good          | Add manifest, verify OG image |

This report should be used as a living checklist; re-run Lighthouse and automated accessibility/SEO checks after each major change to track progress.
