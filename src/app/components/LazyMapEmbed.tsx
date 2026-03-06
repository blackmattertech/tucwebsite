import { useEffect, useRef, useState } from 'react';

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31094.52455313618!2d77.5460981347656!3d13.047408599999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d62de87f213%3A0xc7e1898b5896eb34!2sTAG%20UNLIMITED!5e0!3m2!1sen!2sin!4v1772317833150!5m2!1sen!2sin';

/**
 * Lazy-loads the Google Maps embed when it enters the viewport.
 * Defers the map network request until the user scrolls to it.
 */
export function LazyMapEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { rootMargin: '100px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="aspect-video bg-gray-200 rounded-sm overflow-hidden shadow-md">
      {inView ? (
        <iframe
          src={MAP_EMBED_SRC}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="TAG UNLIMITED Factory Location"
        />
      ) : (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center text-gray-400 text-sm">
          Map
        </div>
      )}
    </div>
  );
}
