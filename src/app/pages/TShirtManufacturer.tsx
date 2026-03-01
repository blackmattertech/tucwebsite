import { PageHero } from '../components/PageHero';
import { CTASection } from '../components/CTASection';

export function TShirtManufacturer() {
  const fabricOptions = [
    { name: 'Cotton', description: '100% combed cotton for premium softness' },
    { name: 'Polyester', description: 'Moisture-wicking performance fabric' },
    { name: 'Cotton-Poly Blend', description: '60/40 blend for durability and comfort' },
    { name: 'Tri-Blend', description: 'Cotton, polyester, rayon blend for soft feel' }
  ];

  const gsmOptions = [
    { gsm: '160 GSM', use: 'Standard lightweight t-shirts' },
    { gsm: '180 GSM', use: 'Regular fit t-shirts' },
    { gsm: '200 GSM', use: 'Premium quality t-shirts' },
    { gsm: '220 GSM', use: 'Heavy-duty oversized fit' }
  ];

  const customization = [
    'Screen printing (up to 12 colors)',
    'Digital printing (full color)',
    'Embroidery (logo and text)',
    'Custom neck labels',
    'Hang tags and packaging',
    'Size customization'
  ];

  return (
    <>
      <PageHero
        title="T-Shirt Manufacturer in Bangalore"
        subtitle="Premium quality t-shirt manufacturing with complete customization options and bulk production capacity"
        backgroundImage="https://images.unsplash.com/photo-1485920784995-d65789b1c3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      />

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
                T-Shirt Manufacturing Overview
              </h2>
              <p className="text-gray-600 mb-4" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                We specialize in manufacturing high-quality t-shirts for brands, retailers, and businesses across India. Our facility can produce various styles including crew neck, V-neck, polo, and oversized fit t-shirts.
              </p>
              <p className="text-gray-600 mb-6" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                With a monthly production capacity of 25,000+ t-shirts, we serve both small businesses and large retailers with consistent quality and on-time delivery.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-gray-900 mb-1" style={{ fontSize: '32px', fontWeight: 700 }}>25K+</div>
                  <div className="text-gray-600" style={{ fontSize: '15px' }}>Monthly Capacity</div>
                </div>
                <div>
                  <div className="text-gray-900 mb-1" style={{ fontSize: '32px', fontWeight: 700 }}>500</div>
                  <div className="text-gray-600" style={{ fontSize: '15px' }}>Minimum Order</div>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1485920784995-d65789b1c3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="T-Shirt Manufacturing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fabric Options */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Fabric Options
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fabricOptions.map((fabric, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200">
                <h3 className="text-gray-900 mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                  {fabric.name}
                </h3>
                <p className="text-gray-600" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                  {fabric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GSM Options */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            GSM Options
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {gsmOptions.map((option, index) => (
              <div key={index} className="text-center p-6 bg-gray-50">
                <div className="text-gray-900 mb-2" style={{ fontSize: '28px', fontWeight: 700 }}>
                  {option.gsm}
                </div>
                <div className="text-gray-600" style={{ fontSize: '15px' }}>
                  {option.use}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-white text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Customization Options
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {customization.map((option, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm p-6 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white" style={{ fontSize: '16px', lineHeight: 1.6 }}>
                    {option}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOQ Information */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
              Minimum Order Quantity
            </h2>
            <p className="text-gray-600 mb-8" style={{ fontSize: '18px', lineHeight: 1.8 }}>
              Our minimum order quantity for t-shirt manufacturing is <strong>500 pieces per design</strong>. This can be split across different sizes to accommodate your requirements.
            </p>
            <div className="bg-gray-50 p-8 rounded-sm">
              <p className="text-gray-700 mb-4" style={{ fontSize: '16px', lineHeight: 1.6 }}>
                <strong>Example:</strong> Order 500 pieces in multiple sizes:
              </p>
              <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size, index) => (
                  <div key={index} className="text-center">
                    <div className="text-gray-900 mb-1" style={{ fontSize: '20px', fontWeight: 600 }}>{size}</div>
                    <div className="text-gray-600" style={{ fontSize: '14px' }}>{[50, 150, 200, 75, 25][index]} pcs</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Manufacture Your T-Shirts?"
        description="Get a detailed quote for your t-shirt manufacturing requirements"
        buttonText="Request Quote"
        buttonLink="/get-production-quote"
      />
    </>
  );
}
