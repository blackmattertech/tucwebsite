import { useEffect, useRef, useState } from 'react';
import { PRODUCT_CAROUSEL_ITEMS } from '../data/productCarouselItems';
import { useMediaAssets } from '../lib/useMediaAssets';
import './ProductCarouselSection.css';

function useProductItems() {
  const { getUrl } = useMediaAssets();
  return PRODUCT_CAROUSEL_ITEMS.map((item) => ({
    ...item,
    videoSrc: getUrl('products', item.file),
  }));
}

type ProductItem = { id: string; label: string; file: string; mediaAlt: string; videoSrc: string };

/** Only load and play video when the panel is in or near the viewport (performance). */
function LazyCarouselVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (cancelled) return;
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { rootMargin: '120px', threshold: 0.01 }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  const showPlaceholder = !inView || errored;

  return (
    <div ref={ref} className="product-carousel-lazy-wrap">
      {showPlaceholder ? (
        <div className="product-carousel-media product-carousel-media-placeholder" aria-hidden>
          <span className="product-carousel-placeholder-text">{errored ? 'Video unavailable' : 'Video'}</span>
        </div>
      ) : (
        <video
          src={src}
          className="product-carousel-media-el"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={label}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}

/**
 * Media slot for each panel. Uses video when videoSrc is set; otherwise placeholder.
 * Grayscale → color on hover is applied via CSS to .product-carousel-media-el.
 */
function ProductPanelMedia({ item }: { item: ProductItem }) {
  if (item.videoSrc) {
    return <LazyCarouselVideo src={item.videoSrc} label={item.label} />;
  }
  return (
    <div className="product-carousel-media product-carousel-media-placeholder" aria-hidden>
      <span className="product-carousel-placeholder-text">Video</span>
    </div>
  );
}

function ProductPanel({ item, index }: { item: ProductItem; index: number }) {
  return (
    <article
      className="product-carousel-panel"
      style={{ '--panel-index': index } as React.CSSProperties}
      aria-label={item.label}
    >
      <div className="product-carousel-panel-media-wrap">
        <ProductPanelMedia item={item} />
      </div>
      <div className="product-carousel-panel-label" aria-hidden>
        {item.label}
      </div>
    </article>
  );
}

export function ProductCarouselSection() {
  const productItems = useProductItems();
  const duplicated = [...productItems, ...productItems];

  return (
    <section
      id="product-carousel"
      className="product-carousel-section"
      aria-label="Product categories"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: 'radial-gradient(circle at center, #AAAAEE 0, #AAAAEE 1px, transparent 1px)',
        backgroundSize: '12px 12px',
      }}
    >
      <h2 className="product-carousel-heading" style={{ fontFamily: 'var(--font-heading)' }}>
        APPAREL WE MANUFACTURE
      </h2>
      <div className="product-carousel-track">
        <div className="product-carousel-inner">
          {duplicated.map((item, index) => (
            <ProductPanel key={`${item.id}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
