import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const SECTION_IDS = [
  'hero',
  'about',
  'principles',
  'trust',
  'capabilities',
  'value-added-services',
  'product-carousel',
  'tag-factor',
  'reviews',
  'blog',
  'social',
  'contact',
] as const;

const LOGO_YELLOW = '#fecc00';

export function SectionScrollIndicators() {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          const i = SECTION_IDS.indexOf(id as (typeof SECTION_IDS)[number]);
          if (i !== -1) setActiveIndex(i);
        }
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (location.pathname !== '/') return null;

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3"
      aria-label="Page sections"
    >
      {SECTION_IDS.map((id, i) => (
        <button
          key={id}
          type="button"
          onClick={() => scrollToSection(id)}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
          aria-label={`Go to section ${i + 1}`}
          aria-current={activeIndex === i ? 'true' : undefined}
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: `2px solid ${activeIndex === i ? LOGO_YELLOW : '#d1d5db'}`,
            background: activeIndex === i ? LOGO_YELLOW : 'transparent',
            padding: 0,
            cursor: 'pointer',
            transition: 'background 0.2s, border-color 0.2s',
          }}
        />
      ))}
    </div>
  );
}
