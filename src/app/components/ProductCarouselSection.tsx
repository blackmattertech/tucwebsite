import './ProductCarouselSection.css';

const HOODIES_VIDEO_SRC = '/products/hoodies%20manufacturers%20in%20bangalore.mp4';
const POLOS_VIDEO_SRC = '/products/polo%20manufacturers%20in%20bangalore.mp4';
const TSHIRTS_VIDEO_SRC = '/products/tshirt%20manufacturer%20in%20india-%20best%20thsirt%20manufacturer.mp4';
const CROP_TOP_VIDEO_SRC = '/products/premium%20private%20label%20manufacturer.mp4';
const CAPS_VIDEO_SRC =
  '/products/cap%20manufacturer%20in%20bangalore%20cap%20manufacturer%20in%20india%20private%20label%20cap%20manufacturing.mp4';
const JACKETS_VIDEO_SRC = '/products/jackets%20manufacturers%20in%20bangalore.mp4';
const DENIM_SHIRT_VIDEO_SRC = '/products/shirt%20manufacturers%20in%20india.mp4';
const FORMAL_SHIRT_VIDEO_SRC =
  '/products/shirt%20manufacturer%20in%20bangalore-%20best%20manufacturer%20for%20apparel%20in%20india.mp4';
const JOGGERS_VIDEO_SRC =
  '/products/trackpant%20manufacturers%20in%20india-%20joggers%20manufacturer%20in%20bangalore-%20sportswear%20manufacturer.mp4';
const SHORTS_VIDEO_SRC = '/products/sports%20apparel%20manufacturers%20in%20bangalore.mp4';

const PRODUCT_ITEMS = [
  {
    id: 'hoodies',
    label: 'Hoodies',
    videoSrc: HOODIES_VIDEO_SRC,
    mediaAlt:
      'Hoodies manufacturing in Bangalore - custom hoodies, bulk hoodie manufacturer, private label hoodies, fleece hoodies, pullover hoodies',
  },
  {
    id: 'polos',
    label: 'Polos',
    videoSrc: POLOS_VIDEO_SRC,
    mediaAlt:
      'Polo manufacturers in Bangalore - custom polo shirts, bulk polo t-shirts, private label polos, premium polo manufacturing',
  },
  {
    id: 'tshirts',
    label: 'T-Shirts',
    videoSrc: TSHIRTS_VIDEO_SRC,
    mediaAlt:
      'T-shirt manufacturers in India - custom t-shirts, bulk t-shirt manufacturing, private label t-shirts, wholesale t-shirts',
  },
  {
    id: 'crop-top',
    label: 'Crop Top',
    videoSrc: CROP_TOP_VIDEO_SRC,
    mediaAlt:
      'Premium private label manufacturer - crop top manufacturing, custom crop tops, bulk crop tops, private label apparel',
  },
  {
    id: 'caps',
    label: 'Caps',
    videoSrc: CAPS_VIDEO_SRC,
    mediaAlt:
      'Cap manufacturer in Bangalore, cap manufacturer in India - private label cap manufacturing, custom caps, bulk caps, baseball caps',
  },
  {
    id: 'shorts',
    label: 'Shorts',
    videoSrc: SHORTS_VIDEO_SRC,
    mediaAlt:
      'Sports apparel manufacturers in Bangalore - shorts manufacturing, custom shorts, bulk shorts, athletic shorts, sportswear manufacturer',
  },
  {
    id: 'joggers',
    label: 'Joggers',
    videoSrc: JOGGERS_VIDEO_SRC,
    mediaAlt:
      'Trackpant manufacturers in India, joggers manufacturer in Bangalore - sportswear manufacturer, custom joggers, bulk joggers',
  },
  {
    id: 'denim-shirt',
    label: 'Denim Shirt',
    videoSrc: DENIM_SHIRT_VIDEO_SRC,
    mediaAlt:
      'Shirt manufacturers in India - denim shirt manufacturing, custom denim shirts, bulk shirts, private label shirts, formal and casual shirts',
  },
  {
    id: 'formal-shirt',
    label: 'Formal Shirt',
    videoSrc: FORMAL_SHIRT_VIDEO_SRC,
    mediaAlt:
      'Shirt manufacturer in Bangalore, best manufacturer for apparel in India - formal shirt manufacturing, custom formal shirts, bulk shirts',
  },
  {
    id: 'jackets',
    label: 'Jackets',
    videoSrc: JACKETS_VIDEO_SRC,
    mediaAlt:
      'Jackets manufacturers in Bangalore - custom jackets, bulk jacket manufacturing, private label jackets, bomber jackets, denim jackets',
  },
];

type ProductItem = (typeof PRODUCT_ITEMS)[0];

/**
 * Media slot for each panel. Uses video when videoSrc is set; otherwise placeholder.
 * Grayscale → color on hover is applied via CSS to .product-carousel-media-el.
 */
function ProductPanelMedia({ item }: { item: ProductItem }) {
  if (item.videoSrc) {
    return (
      <video
        src={item.videoSrc}
        className="product-carousel-media-el"
        autoPlay
        loop
        muted
        playsInline
        aria-label={item.label}
      />
    );
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
  const duplicated = [...PRODUCT_ITEMS, ...PRODUCT_ITEMS];

  return (
    <section
      id="product-carousel"
      className="product-carousel-section"
      aria-label="Product categories"
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
