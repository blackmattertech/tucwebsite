import { PageHero } from '../components/PageHero';
import { CTASection } from '../components/CTASection';

export function ShirtManufacturer() {
  return (
    <>
      <PageHero
        title="Shirt Manufacturer in Bangalore"
        subtitle="Professional shirt manufacturing for formal and casual wear with premium fabrics and expert tailoring"
        backgroundImage="https://images.unsplash.com/photo-1765614766382-2ff118e9095d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      />

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
                Shirt Manufacturing Overview
              </h2>
              <p className="text-gray-600 mb-4" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                We specialize in manufacturing formal shirts, casual shirts, and custom-designed shirts for corporate uniforms, retail brands, and businesses. Our expert tailoring ensures perfect fit and finish.
              </p>
              <p className="text-gray-600" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                From classic oxford shirts to modern slim-fit designs, we produce shirts in various fabrics including cotton, linen, and blended materials with complete customization options.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1765614766382-2ff118e9095d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Shirt Manufacturing"
                className="w-full h-full object-cover"
                width={1080}
                height={720}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fabric Types */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Fabric Types
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Cotton Oxford', use: 'Formal business shirts' },
              { name: 'Linen', use: 'Summer casual shirts' },
              { name: 'Cotton Poplin', use: 'Dress shirts' },
              { name: 'Poly-Cotton', use: 'Easy-care shirts' }
            ].map((fabric, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 text-center">
                <h3 className="text-gray-900 mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                  {fabric.name}
                </h3>
                <p className="text-gray-600" style={{ fontSize: '15px' }}>
                  {fabric.use}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Customization Options
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Collar Styles',
                options: ['Classic collar', 'Button-down collar', 'Spread collar', 'Mandarin collar']
              },
              {
                title: 'Cuff Styles',
                options: ['Barrel cuff', 'French cuff', 'Convertible cuff', 'Button cuff']
              },
              {
                title: 'Custom Features',
                options: ['Embroidered logos', 'Monogramming', 'Contrast fabrics', 'Custom buttons']
              }
            ].map((category, index) => (
              <div key={index} className="bg-gray-50 p-6">
                <h3 className="text-gray-900 mb-4" style={{ fontSize: '22px', fontWeight: 600 }}>
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.options.map((option, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700" style={{ fontSize: '15px' }}>
                      <span className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Production */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-white mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
              Bulk Production Capacity
            </h2>
            <p className="text-white/90 mb-12" style={{ fontSize: '18px', lineHeight: 1.8 }}>
              Our shirt manufacturing facility can handle large bulk orders with consistent quality and timely delivery.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/10">
                <div className="text-white mb-2" style={{ fontSize: '40px', fontWeight: 700 }}>500</div>
                <div className="text-white/80" style={{ fontSize: '16px', fontWeight: 500 }}>Minimum Order Qty</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/10">
                <div className="text-white mb-2" style={{ fontSize: '40px', fontWeight: 700 }}>15K+</div>
                <div className="text-white/80" style={{ fontSize: '16px', fontWeight: 500 }}>Monthly Capacity</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/10">
                <div className="text-white mb-2" style={{ fontSize: '40px', fontWeight: 700 }}>20-25</div>
                <div className="text-white/80" style={{ fontSize: '16px', fontWeight: 500 }}>Days Lead Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need Custom Shirt Manufacturing?"
        description="Contact us for shirt manufacturing quotes and customization details"
        buttonText="Contact Us"
        openContactModal
      />
    </>
  );
}
