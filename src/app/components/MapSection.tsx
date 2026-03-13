import { useEffect, useRef, useState } from 'react';
import { useViewport } from '../context/ViewportContext';
import './MapSection.css';

/**
 * Hero section: headline only; parallax on scroll (desktop only – skip on mobile to save JS/layout).
 */
export function MapSection() {
  const { isDesktop } = useViewport();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setIsInView(true);
      },
      { rootMargin: '0px', threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const mapSection = sectionRef.current;
    const heading = headingRef.current;
    if (!mapSection || !heading) return;

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = mapSection.getBoundingClientRect();
        const scrollProgress = rect.top / window.innerHeight;
        const headingMove = scrollProgress * -40;
        heading.style.transform = `translateY(${headingMove}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      className={`map-section${isInView ? ' is-in-view' : ''}`}
      aria-label="Stiching the world together"
    >
      <div className="map-section-inner">
        <div className="map-section-heading" ref={headingRef}>
          <h2 className="map-section-heading-line1" style={{ fontFamily: 'var(--font-heading)' }}>
            Stitching&nbsp;The
          </h2>
          <h4 className="map-section-heading-line2" style={{ fontFamily: 'var(--font-heading)' }}>
            World&nbsp;Together
          </h4>
        </div>
      </div>
    </section>
  );
}
