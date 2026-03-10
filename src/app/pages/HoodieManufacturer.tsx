import { PageHero } from '../components/PageHero';
import { CTASection } from '../components/CTASection';

export function HoodieManufacturer() {
  return (
    <>
      <PageHero
        title="Hoodie Manufacturer in India"
        subtitle="Premium hoodie and sweatshirt manufacturing with complete customization and branding options"
        backgroundImage="https://images.unsplash.com/photo-1667586680656-6b8e381cddb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      />

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
                Hoodie Manufacturing Overview
              </h2>
              <p className="text-gray-600 mb-4" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                We manufacture premium quality hoodies and sweatshirts for brands across India. Our facility produces pullover hoodies, zip-up hoodies, and crewneck sweatshirts in various fabric blends.
              </p>
              <p className="text-gray-600" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                With complete customization options including printing, embroidery, and custom packaging, we help you create unique hoodie collections for your brand.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1667586680656-6b8e381cddb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Hoodie Manufacturing"
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
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Cotton Fleece', weight: '280-320 GSM', desc: 'Soft and comfortable fleece fabric' },
              { name: 'Poly-Cotton Blend', weight: '300-340 GSM', desc: 'Durable blend with minimal shrinkage' },
              { name: 'Premium French Terry', weight: '260-300 GSM', desc: 'Luxury feel with excellent drape' }
            ].map((fabric, index) => (
              <div key={index} className="bg-white p-8 border border-gray-200">
                <h3 className="text-gray-900 mb-2" style={{ fontSize: '24px', fontWeight: 600 }}>
                  {fabric.name}
                </h3>
                <div className="text-gray-500 mb-3" style={{ fontSize: '14px', fontWeight: 600 }}>
                  {fabric.weight}
                </div>
                <p className="text-gray-600" style={{ fontSize: '16px', lineHeight: 1.6 }}>
                  {fabric.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Printing & Embroidery */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2 }}>
                Printing Options
              </h2>
              <ul className="space-y-3">
                {[
                  'Screen printing (up to 12 colors)',
                  'Direct-to-garment (DTG) printing',
                  'Vinyl heat transfer',
                  'Puff printing for 3D effect',
                  'Discharge printing on dark fabrics',
                  'All-over printing'
                ].map((option, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-gray-700" style={{ fontSize: '17px', lineHeight: 1.6 }}>{option}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2 }}>
                Embroidery Options
              </h2>
              <ul className="space-y-3">
                {[
                  'Logo embroidery (chest, sleeve, back)',
                  'Text embroidery with custom fonts',
                  'Puff embroidery for raised effect',
                  'Appliqué embroidery',
                  'Metallic thread embroidery',
                  'Multiple color embroidery'
                ].map((option, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-gray-700" style={{ fontSize: '17px', lineHeight: 1.6 }}>{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MOQ */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
              Minimum Order Quantity
            </h2>
            <p className="text-white/90 mb-8" style={{ fontSize: '18px', lineHeight: 1.8 }}>
              MOQ for hoodie manufacturing is <strong>300 pieces per design</strong>. Mix sizes as per your requirements.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                <div className="text-white mb-2" style={{ fontSize: '32px', fontWeight: 700 }}>300</div>
                <div className="text-white/80" style={{ fontSize: '16px' }}>Minimum Order</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                <div className="text-white mb-2" style={{ fontSize: '32px', fontWeight: 700 }}>15-20</div>
                <div className="text-white/80" style={{ fontSize: '16px' }}>Days Production</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                <div className="text-white mb-2" style={{ fontSize: '32px', fontWeight: 700 }}>100%</div>
                <div className="text-white/80" style={{ fontSize: '16px' }}>Quality Checked</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Start Your Hoodie Manufacturing Project"
        description="Get a customized quote for your hoodie production requirements"
        buttonText="Contact Us"
        openContactModal
      />
    </>
  );
}
