import { Link } from 'react-router';
import { PageHero } from '../components/PageHero';
import { CTASection } from '../components/CTASection';
import { ArrowRight } from 'lucide-react';

export function Capabilities() {
  const capabilities = [
    {
      title: 'Apparel Manufacturing',
      description: 'Bulk production with modern machinery and experienced workforce. High-capacity manufacturing for all types of garments.',
      image: 'https://images.unsplash.com/photo-1758271141001-e4ff47f2b1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '/capabilities/apparel-manufacturing-bangalore',
      features: ['50K+ monthly capacity', 'Modern machinery', 'Quality control']
    },
    {
      title: 'Private Label Manufacturing',
      description: 'Complete private label services including branding, labeling, and custom packaging for your brand.',
      image: 'https://images.unsplash.com/photo-1724155090003-fd4e48ab8c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '/capabilities/private-label-clothing-manufacturer',
      features: ['Custom branding', 'Packaging design', 'Label printing']
    },
    {
      title: 'Factory Infrastructure',
      description: 'State-of-the-art manufacturing infrastructure with specialized departments for each production stage.',
      image: 'https://images.unsplash.com/photo-1716191299945-4c5b89703971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '/capabilities/garment-factory-infrastructure',
      features: ['50,000 sq ft facility', 'Multiple production lines', 'Climate controlled']
    }
  ];

  const qualitySystems = [
    'ISO 9001:2015 Certified',
    'Multi-stage quality inspection',
    'Fabric testing laboratory',
    'Final product audit',
    'Defect tracking system',
    'Quality assurance team'
  ];

  return (
    <>
      <PageHero
        title="Apparel Manufacturing Capabilities"
        subtitle="End-to-end manufacturing solutions for private label clothing and knitwear production"
        backgroundImage="https://images.unsplash.com/photo-1768746350424-ee28a364dcf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      />

      {/* Manufacturing Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
              Manufacturing Overview
            </h2>
            <p className="text-gray-600" style={{ fontSize: '18px', lineHeight: 1.8 }}>
              Our comprehensive manufacturing capabilities cover every aspect of garment production, from initial design consultation to final packaging and delivery. We combine traditional craftsmanship with modern technology to deliver exceptional quality at scale.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <Link
                key={index}
                to={capability.link}
                className="group bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={capability.image}
                    alt={capability.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-gray-900 mb-3 flex items-center justify-between" style={{ fontSize: '24px', fontWeight: 600 }}>
                    {capability.title}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </h3>
                  <p className="text-gray-600 mb-4" style={{ fontSize: '16px', lineHeight: 1.6 }}>
                    {capability.description}
                  </p>
                  <ul className="space-y-2">
                    {capability.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-500 flex items-center gap-2" style={{ fontSize: '14px' }}>
                        <span className="w-1 h-1 bg-gray-400 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Systems */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-gray-900 text-center mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
              Quality Systems
            </h2>
            <p className="text-gray-600 text-center mb-12" style={{ fontSize: '18px', lineHeight: 1.8 }}>
              We maintain strict quality standards throughout the manufacturing process with comprehensive testing and inspection protocols.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {qualitySystems.map((system, index) => (
                <div key={index} className="bg-white p-6 border border-gray-200">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
                    {index + 1}
                  </div>
                  <p className="text-gray-700" style={{ fontSize: '16px', fontWeight: 500 }}>
                    {system}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Start Your Manufacturing Project?"
        description="Contact our team to discuss your requirements and get a detailed quote"
        buttonText="Get Production Quote"
        buttonLink="/get-production-quote"
      />
    </>
  );
}
