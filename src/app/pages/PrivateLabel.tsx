import { PageHero } from '../components/PageHero';
import { CTASection } from '../components/CTASection';
import { Palette, Shirt, Package, Tags } from 'lucide-react';

export function PrivateLabel() {
  const services = [
    {
      icon: Palette,
      title: 'Branding Services',
      description: 'Complete branding solutions including logo placement, custom labels, and brand identity integration on all garments.',
      features: ['Logo printing/embroidery', 'Custom woven labels', 'Hang tags design', 'Brand packaging']
    },
    {
      icon: Shirt,
      title: 'Sampling',
      description: 'Detailed sampling process to perfect your design before bulk production, with multiple revisions until approved.',
      features: ['Initial design mockup', 'Physical samples', 'Fit testing', 'Material selection']
    },
    {
      icon: Package,
      title: 'Bulk Production',
      description: 'High-capacity manufacturing with strict quality control and consistent output for your private label requirements.',
      features: ['MOQ: 500 pieces', 'Quality assurance', 'On-time delivery', 'Bulk pricing']
    },
    {
      icon: Tags,
      title: 'Packaging',
      description: 'Custom packaging solutions tailored to your brand requirements, from polybags to premium boxes.',
      features: ['Poly bag packaging', 'Custom boxes', 'Tissue paper wrapping', 'Shipping labels']
    }
  ];

  return (
    <>
      <PageHero
        title="Private Label Clothing Manufacturer in Bangalore"
        subtitle="Complete private label manufacturing services from design to delivery with custom branding and packaging"
        backgroundImage="https://images.unsplash.com/photo-1724155090003-fd4e48ab8c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      />

      {/* Introduction */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
              Private Label Manufacturing Services
            </h2>
            <p className="text-gray-600" style={{ fontSize: '18px', lineHeight: 1.8 }}>
              Launch your clothing brand with our comprehensive private label manufacturing services. We handle everything from initial design consultation to final packaging, allowing you to focus on building your brand while we take care of production.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-gray-50 p-8">
                  <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-gray-900 mb-4" style={{ fontSize: '24px', fontWeight: 600 }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6" style={{ fontSize: '16px', lineHeight: 1.6 }}>
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-700 flex items-center gap-2" style={{ fontSize: '15px' }}>
                        <span className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-white text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Private Label Process
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Consultation', 'Design & Sampling', 'Production', 'Delivery'].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 border-2 border-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white" style={{ fontSize: '24px', fontWeight: 700 }}>{index + 1}</span>
                </div>
                <h3 className="text-white mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                  {step}
                </h3>
                <p className="text-white/70" style={{ fontSize: '14px' }}>
                  {index === 0 && 'Discuss requirements and brand vision'}
                  {index === 1 && 'Create samples and refine design'}
                  {index === 2 && 'Manufacture with quality control'}
                  {index === 3 && 'Package and ship to your location'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
                Why Choose Our Private Label Services
              </h2>
              <div className="space-y-4">
                {[
                  'Low minimum order quantities (MOQ 500 pieces)',
                  'Complete customization options',
                  'Professional design assistance',
                  'High-quality materials and craftsmanship',
                  'Competitive bulk pricing',
                  'Fast turnaround times',
                  'Dedicated account manager',
                  'Transparent communication'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700" style={{ fontSize: '17px', lineHeight: 1.6 }}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1724155090003-fd4e48ab8c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Private Label Manufacturing"
                className="w-full h-full object-cover"
                width={1080}
                height={720}
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Launch Your Private Label Brand?"
        description="Get started with our private label manufacturing services today"
        buttonText="Get Started"
        openContactModal
      />
    </>
  );
}
