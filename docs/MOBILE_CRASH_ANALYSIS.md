# Mobile crash analysis

Analysis of the codebase for causes of continuous crashes on mobile devices.

---

## 1. **Touch event crash (PrinciplesSection)** — HIGH

**Issue:** The site can throw a JavaScript error and crash when users touch/swipe the Principles carousel on mobile.

**Reason:** In `PrinciplesSection.tsx`, `handleTouchStart` and `handleTouchMove` use `e.touches[0].clientX` without checking that `e.touches` has at least one item. On some devices or edge cases (multi-touch, invalid events, or timing), `e.touches[0]` can be `undefined`, so accessing `.clientX` throws and can take down the app.

**Resolution:** Guard touch handlers: only read `e.touches[0]` when `e.touches?.length > 0`; otherwise return early or ignore the event.

---

## 2. **GSAP cursor animation not cleaned up (TextType)** — HIGH

**Issue:** The hero typing effect starts a GSAP tween with `repeat: -1` on the cursor. If the user navigates away or the Hero unmounts, the tween keeps running and can hold references to detached DOM and cause memory growth or unstable behavior on low-memory devices (common on mobile).

**Reason:** The `useEffect` in `TextType.tsx` that starts the cursor blink never returns a cleanup. GSAP does not auto-kill tweens when the target node is removed from the DOM.

**Resolution:** Return a cleanup function from that `useEffect` that calls `gsap.killTweensOf(cursorRef.current)` (and optionally `cursorRef.current`) so the tween is killed when the component unmounts.

---

## 3. **Post-unmount callback (PillNav)** — MEDIUM

**Issue:** After the nav unmounts, `layout()` can still run and touch refs/state, leading to React warnings or inconsistent state and contributing to instability on mobile.

**Reason:** `document.fonts.ready.then(layout).catch(...)` is fired inside a `useEffect` with no cancellation. If the component unmounts before the promise resolves, the callback runs later and calls `layout()` which uses refs and possibly state.

**Resolution:** Use a cancelled flag (e.g. `let cancelled = false`) set to `true` in the effect cleanup; inside the `.then()` callback, only call `layout()` if `!cancelled`.

---

## 4. **Scroll handler doing layout every frame (MapSection)** — MEDIUM

**Issue:** On mobile, scrolling can feel janky and, on very low-end devices, contribute to high CPU/memory and instability or perceived “freezes” that feel like a crash.

**Reason:** The scroll listener in `MapSection.tsx` runs on every scroll event, calls `getBoundingClientRect()` (layout), and then sets `heading.style.transform`. High scroll frequency on touch devices causes a lot of layout/paint work per second.

**Resolution:** Throttle the scroll handler (e.g. with `requestAnimationFrame` or a time-based throttle) so layout and style updates run at most once per frame or at a capped rate.

---

## 5. **Multiple infinite CSS animations** — MEDIUM (performance)

**Issue:** Many elements use infinite CSS animations (marquees, glows). On weak mobile GPUs, this can increase load and battery use and, in combination with other issues, contribute to freezes or crashes.

**Reason:** Files such as `BlankSection.css`, `ProductCarouselSection.css`, `TagFactorSection.css`, `ContactCircleButton.css`, and `ClienteleSection.tsx` (inline) use `animation: ... infinite`. Several also use `will-change: transform`, which can increase memory use on mobile.

**Resolution (implemented, no layout change):** Added `@media (prefers-reduced-motion: reduce)` to set `animation: none` for infinite marquees and glows in BlankSection, ProductCarouselSection, TagFactorSection, ContactCircleButton, and ClienteleSection. On mobile (max-width: 768px), `will-change: auto` on the product carousel inner to reduce GPU memory.

---

## 6. **Unbounded client logos list (ClienteleSection)** — LOW (if list stays small)

**Issue:** If the client-logos list from Supabase grows very large, the marquee would render many duplicated DOM nodes and images, increasing memory and layout cost on mobile.

**Reason:** `ClienteleSection` uses `getFileNamesByFolder('client-logos')` and then `[...logos, ...logos]` for the marquee with no cap. Currently the list is small (~16), so risk is low unless the folder grows a lot.

**Resolution (implemented, no layout change):** Cap applied: `logos.slice(0, 20)` for the marquee duplicate list so DOM/image count stays bounded if the folder grows.

---

## 7. **Contact modal context null** — LOW (layout-dependent)

**Issue:** If any component that calls `useContactModal()` is ever rendered outside `ContactModalProvider`, calling `modal.openModal` would throw.

**Reason:** `useContactModal()` returns `useContext(ContactModalContext)`, which can be `null`. `ContactCircleButton` and `PillNav` already guard with `modal?.openModal` before using it, so this is only a risk if the app tree changes and a consumer is rendered outside the provider.

**Resolution (implemented):** Consumers keep `modal?.openModal` checks. `useContactModal()` now logs a console error in development when used outside `ContactModalProvider` so misuse is caught early.

---

## Summary

| Priority | Item | File(s) | Fix type |
|----------|------|---------|----------|
| High | Touch event crash | `PrinciplesSection.tsx` | Guard `e.touches[0]` |
| High | GSAP no cleanup | `TextType.tsx` | Kill tween in useEffect cleanup |
| Medium | fonts.ready after unmount | `PillNav.tsx` | Cancelled flag in promise callback |
| Medium | Scroll layout thrash | `MapSection.tsx` | Throttle scroll handler |
| Medium | Many infinite animations | Multiple CSS/components | Reduce on mobile / prefers-reduced-motion |
| Low | Unbounded logos | `ClienteleSection.tsx` | Cap list if folder grows |
| Low | Modal null | Context + consumers | Already guarded; keep guards |

All items above have been addressed without changing layout. High/medium fixes (touch guard, GSAP cleanup, fonts.ready cancellation, scroll throttle, reduced-motion and will-change) plus logo cap and dev-only modal error are in place.

---

## Viewport-based loading (reduce mobile crashes)

To further reduce mobile load and crashes, the app now loads **only the JS/CSS needed for the current screen size**:

- **ViewportContext** (breakpoint 1024px): On load we detect `isDesktop` / `isMobile` and keep it in context.
- **Mobile (< 1024px)**:
  - **Header**: Renders **MobileNav** (lightweight nav with hamburger + menu). **PillNav** (GSAP, timelines) is **not loaded** – only the desktop chunk loads it.
  - **SectionScrollIndicators**: Not mounted and not loaded on mobile.
  - **HeroSection**: Shows static “Private Label Apparel” instead of **RotatingText**; RotatingText (Motion) is lazy-loaded only on desktop.
  - **ContactCircleButton**: Shows “Contact” text; **CircularText** (Motion) is lazy-loaded only on desktop.
  - **CapabilitiesSection**: Only the carousel is used; **CardSwap** (GSAP) is lazy-loaded via **CapabilitiesSectionDesktop** only on desktop.
  - **MapSection**: Parallax scroll effect is **disabled** on mobile (no scroll listener).
- **Desktop (≥ 1024px)**: Full PillNav, SectionScrollIndicators, RotatingText, CircularText, CardSwap, and MapSection parallax load as before.

Result: On mobile the browser does not download or run PillNav.css, PillNav.js, GSAP for nav, CardSwap, RotatingText, CircularText, or SectionScrollIndicators, reducing memory and CPU and helping prevent crashes.
