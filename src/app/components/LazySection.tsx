import { useEffect, useRef, useState, Suspense, type ReactNode } from 'react';

/** Placeholder height to reduce CLS when section loads. */
const DEFAULT_MIN_HEIGHT = 'min-h-[40vh]';

type LazySectionProps = {
  /** Lazy-loaded component (e.g. from React.lazy). */
  children: ReactNode;
  /** Optional min-height class for placeholder and fallback (default min-h-[40vh]). */
  minHeightClass?: string;
};

/**
 * Renders a placeholder until it enters the viewport, then renders children inside Suspense.
 * Used to defer loading of below-the-fold section chunks until the user scrolls near them.
 */
export function LazySection({ children, minHeightClass = DEFAULT_MIN_HEIGHT }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { rootMargin: '120px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!inView) {
    return <div ref={ref} className={minHeightClass} aria-hidden />;
  }

  return (
    <Suspense fallback={<div className={minHeightClass} aria-hidden />}>
      {children}
    </Suspense>
  );
}
