import { PageHero } from '../components/PageHero';
import { CTASection } from '../components/CTASection';
import { CheckCircle } from 'lucide-react';

export function About() {
  const reasons = [
    'Modern infrastructure with 200+ sewing machines',
    'Experienced team with 15+ years in manufacturing',
    'Strict quality control at every production stage',
    'On-time delivery with structured workflows',
    'Competitive pricing for bulk orders',
    'Complete transparency in production process'
  ];

  const industries = [
    { name: 'Fashion Brands', icon: '👔' },
    { name: 'Retail Chains', icon: '🏪' },
    { name: 'Corporate Uniforms', icon: '💼' },
    { name: 'Sports Teams', icon: '⚽' },
    { name: 'E-commerce Stores', icon: '🛒' },
    { name: 'Educational Institutions', icon: '🎓' }
  ];

  return (
    <>
      <PageHero
        title="Apparel Manufacturer in Bangalore"
        subtitle="Leading private label clothing and knitwear manufacturer with state-of-the-art facilities and experienced workforce"
        backgroundImage="https://images.unsplash.com/photo-1684259499086-93cb3e555803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      />

      {/* Company Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
                Company Overview
              </h2>
              <p className="text-gray-600 mb-4" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                We are a Bangalore-based apparel manufacturing company specializing in private label clothing and knitwear production. Established in 2008, we have grown to become one of the leading garment manufacturers in South India.
              </p>
              <p className="text-gray-600 mb-4" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                Our facility spans over 50,000 square feet and houses modern machinery operated by skilled professionals. We manufacture a wide range of products including t-shirts, hoodies, shirts, and custom garments for brands across India and internationally.
              </p>
              <p className="text-gray-600" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                With a production capacity of 50,000+ pieces per month, we serve both emerging brands and established retailers with consistent quality and reliable delivery timelines.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1768746350424-ee28a364dcf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Apparel Manufacturing Facility"
                className="w-full h-full object-cover"
                width={1080}
                height={720}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Experience */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Manufacturing Experience
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-gray-900 mb-2" style={{ fontSize: '48px', fontWeight: 700 }}>15+</div>
              <div className="text-gray-600" style={{ fontSize: '18px', fontWeight: 500 }}>Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-gray-900 mb-2" style={{ fontSize: '48px', fontWeight: 700 }}>50K+</div>
              <div className="text-gray-600" style={{ fontSize: '18px', fontWeight: 500 }}>Monthly Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-gray-900 mb-2" style={{ fontSize: '48px', fontWeight: 700 }}>200+</div>
              <div className="text-gray-600" style={{ fontSize: '18px', fontWeight: 500 }}>Skilled Workers</div>
            </div>
            <div className="text-center">
              <div className="text-gray-900 mb-2" style={{ fontSize: '48px', fontWeight: 700 }}>500+</div>
              <div className="text-gray-600" style={{ fontSize: '18px', fontWeight: 500 }}>Brands Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Why Choose Our Manufacturing Facility
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-3 p-6 bg-gray-50">
                <CheckCircle className="text-gray-900 flex-shrink-0 mt-1" size={20} />
                <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: 1.6 }}>
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-white text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Industries We Serve
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm p-6 text-center border border-white/10">
                <div className="text-4xl mb-3">{industry.icon}</div>
                <div className="text-white" style={{ fontSize: '16px', fontWeight: 500 }}>
                  {industry.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Images */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Our Manufacturing Facility
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1771315938116-cd51af9489fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1758271141001-e4ff47f2b1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1771098206750-6be5aef4f503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1451933254166-deefa72af747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1716191299945-4c5b89703971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1684259499086-93cb3e555803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
            ].map((img, index) => (
              <div key={index} className="aspect-[4/3] overflow-hidden">
                <img
                  src={img}
                  alt={`Factory view ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  width={800}
                  height={450}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Contact Apparel Manufacturer Bangalore"
        description="Get in touch with our team to discuss your manufacturing requirements"
        buttonText="Contact Us"
        buttonLink="/contact-apparel-manufacturer-bangalore"
      />
    </>
  );
}
