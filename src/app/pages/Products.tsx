import { Link } from 'react-router';
import { PageHero } from '../components/PageHero';
import { CTASection } from '../components/CTASection';

export function Products() {
  const products = [
    {
      title: 'T-Shirt Manufacturer Bangalore',
      description: 'High-quality t-shirt manufacturing with various fabric options and customization',
      image: 'https://images.unsplash.com/photo-1485920784995-d65789b1c3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '/products/t-shirt-manufacturer-bangalore',
      moq: '500 pieces'
    },
    {
      title: 'Hoodie Manufacturer India',
      description: 'Premium hoodies and sweatshirts with printing and embroidery options',
      image: 'https://images.unsplash.com/photo-1667586680656-6b8e381cddb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '/products/hoodie-manufacturer-india',
      moq: '300 pieces'
    },
    {
      title: 'Shirt Manufacturer Bangalore',
      description: 'Formal and casual shirts in cotton, linen, and blended fabrics',
      image: 'https://images.unsplash.com/photo-1765614766382-2ff118e9095d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '/products/shirt-manufacturer-bangalore',
      moq: '500 pieces'
    },
    {
      title: 'Jacket Manufacturing',
      description: 'Jackets and outerwear in various styles and materials',
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '#',
      moq: '300 pieces'
    },
    {
      title: 'Trackpants Manufacturing',
      description: 'Athletic and casual trackpants with custom branding options',
      image: 'https://images.unsplash.com/photo-1618355281911-84e6ec751d84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '#',
      moq: '500 pieces'
    },
    {
      title: 'Shorts Manufacturing',
      description: 'Sports shorts and casual shorts in various fabrics',
      image: 'https://images.unsplash.com/photo-1759476530978-07f0eb6906fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '#',
      moq: '500 pieces'
    }
  ];

  return (
    <>
      <PageHero
        title="Knitwear Products Manufacturing"
        subtitle="Comprehensive range of apparel products manufactured with precision and quality"
        backgroundImage="https://images.unsplash.com/photo-1485920784995-d65789b1c3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      />

      {/* Products Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
              Our Product Range
            </h2>
            <p className="text-gray-600" style={{ fontSize: '18px', lineHeight: 1.8 }}>
              We manufacture a wide range of knitwear products with complete customization options. All products are available for private label manufacturing with your branding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Link
                key={index}
                to={product.link}
                className="group bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: 600, lineHeight: 1.3 }}>
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500" style={{ fontSize: '14px' }}>
                      MOQ: {product.moq}
                    </span>
                    <span className="text-gray-900 group-hover:translate-x-1 transition-transform" style={{ fontSize: '14px', fontWeight: 600 }}>
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
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

      <CTASection
        title="Need Custom Product Manufacturing?"
        description="Contact us to discuss your specific product requirements and customization needs"
        buttonText="Contact Us"
        openContactModal
      />
    </>
  );
}
