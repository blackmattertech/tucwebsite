import { useEffect, useRef, useState } from 'react';
import { useMediaAssets } from '../lib/useMediaAssets';
import './ProductCarouselSection.css';

const PRODUCT_VIDEOS: { id: string; label: string; file: string; mediaAlt: string }[] = [
  {
    id: 'hoodies',
    label: 'Hoodies',
    file: 'hoodies manufacturers in bangalore.mp4',
    mediaAlt:
      'Hoodies manufacturing in Bangalore - custom hoodies, bulk hoodie manufacturer, private label hoodies, fleece hoodies, pullover hoodies',
  },
  {
    id: 'polos',
    label: 'Polos',
    file: 'polo manufacturers in bangalore.mp4',
    mediaAlt:
      'Polo manufacturers in Bangalore - custom polo shirts, bulk polo t-shirts, private label polos, premium polo manufacturing',
  },
  {
    id: 'tshirts',
    label: 'T-Shirts',
    file: 'tshirt manufacturer in india- best thsirt manufacturer.mp4',
    mediaAlt:
      'T-shirt manufacturers in India - custom t-shirts, bulk t-shirt manufacturing, private label t-shirts, wholesale t-shirts',
  },
  {
    id: 'crop-top',
    label: 'Crop Top',
    file: 'premium private label manufacturer.mp4',
    mediaAlt:
      'Premium private label manufacturer - crop top manufacturing, custom crop tops, bulk crop tops, private label apparel',
  },
  {
    id: 'caps',
    label: 'Caps',
    file: 'cap manufacturer in bangalore cap manufacturer in india private label cap manufacturing.mp4',
    mediaAlt:
      'Cap manufacturer in Bangalore, cap manufacturer in India - private label cap manufacturing, custom caps, bulk caps, baseball caps',
  },
  {
    id: 'shorts',
    label: 'Shorts',
    file: 'sports apparel manufacturers in bangalore.mp4',
    mediaAlt:
      'Sports apparel manufacturers in Bangalore - shorts manufacturing, custom shorts, bulk shorts, athletic shorts, sportswear manufacturer',
  },
  {
    id: 'joggers',
    label: 'Joggers',
    file: 'trackpant manufacturers in india- joggers manufacturer in bangalore- sportswear manufacturer.mp4',
    mediaAlt:
      'Trackpant manufacturers in India, joggers manufacturer in Bangalore - sportswear manufacturer, custom joggers, bulk joggers',
  },
  {
    id: 'denim-shirt',
    label: 'Denim Shirt',
    file: 'shirt manufacturers in india.mp4',
    mediaAlt:
      'Shirt manufacturers in India - denim shirt manufacturing, custom denim shirts, bulk shirts, private label shirts, formal and casual shirts',
  },
  {
    id: 'formal-shirt',
    label: 'Formal Shirt',
    file: 'shirt manufacturer in bangalore- best manufacturer for apparel in india.mp4',
    mediaAlt:
      'Shirt manufacturer in Bangalore, best manufacturer for apparel in India - formal shirt manufacturing, custom formal shirts, bulk shirts',
  },
  {
    id: 'jackets',
    label: 'Jackets',
    file: 'jackets manufacturers in bangalore.mp4',
    mediaAlt:
      'Jackets manufacturers in Bangalore - custom jackets, bulk jacket manufacturing, private label jackets, bomber jackets, denim jackets',
  },
];

function useProductItems() {
  const { getUrl } = useMediaAssets();
  return PRODUCT_VIDEOS.map((item) => ({
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
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { rootMargin: '120px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
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
      <h2 className="product-carousel-heading">THE TAG UNLIMITED CLOSET</h2>
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
