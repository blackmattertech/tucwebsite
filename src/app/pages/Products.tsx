import { PageHero } from '../components/PageHero';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS_WE_MANUFACTURE } from '../data/productsWeManufacture';
import './Products.css';

export function Products() {
  return (
    <>
      <PageHero
        title="Knitwear Products Manufacturing"
        subtitle="Comprehensive range of apparel products manufactured with precision and quality"
        backgroundImage="https://ik.imagekit.io/tagunlimited/products-hero-section-best-apparel-manufacturer.webp"
        showOverlay={false}
        showText={false}
        sectionClassName="min-h-[65vh] lg:min-h-[80vh]"
        imageQuality={92}
        imageStartsBelowHeader
      />

      <section className="products-cards-section" aria-labelledby="products-we-manufacture-heading">
        <div className="products-cards-section-inner">
          <h2
            id="products-we-manufacture-heading"
            className="products-cards-heading"
          >
            Private Label Apparel Categories
          </h2>
          <div className="products-cards-grid">
            {PRODUCTS_WE_MANUFACTURE.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Product Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white" style={{ fontSize: '24px' }}>✓</span>
              </div>
              <h3 className="text-gray-900 mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                Premium Fabrics
              </h3>
              <p className="text-gray-600" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                High-quality cotton, polyester, and blended fabrics sourced from trusted suppliers
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white" style={{ fontSize: '24px' }}>✓</span>
              </div>
              <h3 className="text-gray-900 mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                Custom Branding
              </h3>
              <p className="text-gray-600" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                Complete customization with printing, embroidery, and labeling options
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white" style={{ fontSize: '24px' }}>✓</span>
              </div>
              <h3 className="text-gray-900 mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                Quality Assured
              </h3>
              <p className="text-gray-600" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                Strict quality control ensuring consistent standards across all products
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
