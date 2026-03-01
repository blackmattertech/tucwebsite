import { PageHero } from '../components/PageHero';
import { CTASection } from '../components/CTASection';
import { Scissors, Zap, Sparkles, Package as PackageIcon, Warehouse } from 'lucide-react';

export function Infrastructure() {
  const sections = [
    {
      icon: Scissors,
      title: 'Cutting Section',
      description: 'Modern cutting tables with CAD/CAM technology for precision fabric cutting and minimal wastage.',
      specs: ['5 cutting tables', 'Automated cutting machines', '10,000 pcs/day capacity', 'Pattern optimization']
    },
    {
      icon: Zap,
      title: 'Stitching Lines',
      description: 'Multiple production lines equipped with industrial sewing machines for various garment types.',
      specs: ['8 production lines', '200+ sewing machines', 'Specialized equipment', 'Skilled operators']
    },
    {
      icon: Sparkles,
      title: 'Finishing',
      description: 'Professional finishing department with steam pressing, ironing, and quality enhancement.',
      specs: ['Steam pressing stations', 'Industrial irons', 'Thread trimming', 'Final inspection']
    },
    {
      icon: PackageIcon,
      title: 'Packing',
      description: 'Systematic packaging department for poly bagging, labeling, and custom packaging solutions.',
      specs: ['Multiple packing lines', 'Labeling equipment', 'Carton sealing', 'Quality checking']
    },
    {
      icon: Warehouse,
      title: 'Warehouse',
      description: 'Climate-controlled warehouse for fabric and finished goods storage with inventory management.',
      specs: ['15,000 sq ft storage', 'Climate controlled', 'Inventory system', 'Loading dock']
    }
  ];

  return (
    <>
      <PageHero
        title="Modern Garment Factory Infrastructure"
        subtitle="State-of-the-art manufacturing facility with specialized departments and modern equipment"
        backgroundImage="https://images.unsplash.com/photo-1716191299945-4c5b89703971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      />

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
              Factory Infrastructure Overview
            </h2>
            <p className="text-gray-600" style={{ fontSize: '18px', lineHeight: 1.8 }}>
              Our 50,000 square foot manufacturing facility is designed for efficient garment production with dedicated sections for each stage of manufacturing. Every department is equipped with modern machinery and operated by trained professionals.
            </p>
          </div>

          {/* Facility Stats */}
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50">
              <div className="text-gray-900 mb-2" style={{ fontSize: '42px', fontWeight: 700 }}>50K</div>
              <div className="text-gray-600" style={{ fontSize: '16px', fontWeight: 500 }}>Square Feet</div>
            </div>
            <div className="text-center p-6 bg-gray-50">
              <div className="text-gray-900 mb-2" style={{ fontSize: '42px', fontWeight: 700 }}>8</div>
              <div className="text-gray-600" style={{ fontSize: '16px', fontWeight: 500 }}>Production Lines</div>
            </div>
            <div className="text-center p-6 bg-gray-50">
              <div className="text-gray-900 mb-2" style={{ fontSize: '42px', fontWeight: 700 }}>200+</div>
              <div className="text-gray-600" style={{ fontSize: '16px', fontWeight: 500 }}>Machines</div>
            </div>
            <div className="text-center p-6 bg-gray-50">
              <div className="text-gray-900 mb-2" style={{ fontSize: '42px', fontWeight: 700 }}>250+</div>
              <div className="text-gray-600" style={{ fontSize: '16px', fontWeight: 500 }}>Employees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Manufacturing Sections
          </h2>

          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-gray-900 mb-4" style={{ fontSize: '28px', fontWeight: 700 }}>
                      {section.title}
                    </h3>
                    <p className="text-gray-600 mb-6" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                      {section.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {section.specs.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-900 rounded-full" />
                          <span className="text-gray-700" style={{ fontSize: '15px' }}>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`aspect-[4/3] rounded-sm overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <img
                      src={[
                        'https://images.unsplash.com/photo-1771315938116-cd51af9489fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                        'https://images.unsplash.com/photo-1758271141001-e4ff47f2b1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                        'https://images.unsplash.com/photo-1771098206750-6be5aef4f503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                        'https://images.unsplash.com/photo-1724155090003-fd4e48ab8c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                        'https://images.unsplash.com/photo-1451933254166-deefa72af747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
                      ][index]}
                      alt={section.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Factory Images Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Facility Gallery
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1768746350424-ee28a364dcf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1684259499086-93cb3e555803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1771315938116-cd51af9489fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1758271141001-e4ff47f2b1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1716191299945-4c5b89703971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1771098206750-6be5aef4f503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
            ].map((img, index) => (
              <div key={index} className="aspect-[4/3] overflow-hidden rounded-sm">
                <img
                  src={img}
                  alt={`Facility ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Visit Our Manufacturing Facility"
        description="Schedule a factory visit to see our infrastructure and capabilities firsthand"
        buttonText="Contact Us"
        buttonLink="/contact-apparel-manufacturer-bangalore"
      />
    </>
  );
}
