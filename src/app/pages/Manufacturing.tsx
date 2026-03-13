import { PageHero } from '../components/PageHero';
import { CTASection } from '../components/CTASection';
import { Factory, Cog, Users, TrendingUp } from 'lucide-react';

export function Manufacturing() {
  const departments = [
    { name: 'Cutting Department', capacity: '10,000 pcs/day', machines: '5 cutting tables' },
    { name: 'Stitching Department', capacity: '8,000 pcs/day', machines: '200+ sewing machines' },
    { name: 'Finishing Department', capacity: '12,000 pcs/day', machines: 'Steam pressing, ironing' },
    { name: 'Quality Control', capacity: '100% inspection', machines: 'Testing equipment' }
  ];

  const workflow = [
    'Order Confirmation & Planning',
    'Fabric Procurement & Inspection',
    'Pattern Making & Cutting',
    'Stitching & Assembly',
    'Quality Inspection',
    'Finishing & Pressing',
    'Packaging & Dispatch'
  ];

  return (
    <>
      <PageHero
        title="Bulk Apparel Manufacturing Facility in Bangalore"
        subtitle="High-capacity garment production with modern machinery and experienced workforce"
        backgroundImage="https://images.unsplash.com/photo-1768746350424-ee28a364dcf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      />

      {/* Production Capacity */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Production Capacity
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-8 bg-gray-50">
              <Factory className="w-12 h-12 mx-auto mb-4 text-gray-900" />
              <div className="text-gray-900 mb-2" style={{ fontSize: '36px', fontWeight: 700 }}>250K+</div>
              <div className="text-gray-600" style={{ fontSize: '16px', fontWeight: 500 }}>Pieces per Month</div>
            </div>
            <div className="text-center p-8 bg-gray-50">
              <Cog className="w-12 h-12 mx-auto mb-4 text-gray-900" />
              <div className="text-gray-900 mb-2" style={{ fontSize: '36px', fontWeight: 700 }}>200+</div>
              <div className="text-gray-600" style={{ fontSize: '16px', fontWeight: 500 }}>Sewing Machines</div>
            </div>
            <div className="text-center p-8 bg-gray-50">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-900" />
              <div className="text-gray-900 mb-2" style={{ fontSize: '36px', fontWeight: 700 }}>250+</div>
              <div className="text-gray-600" style={{ fontSize: '16px', fontWeight: 500 }}>Skilled Workers</div>
            </div>
            <div className="text-center p-8 bg-gray-50">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-900" />
              <div className="text-gray-900 mb-2" style={{ fontSize: '36px', fontWeight: 700 }}>24/7</div>
              <div className="text-gray-600" style={{ fontSize: '16px', fontWeight: 500 }}>Production Hours</div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600" style={{ fontSize: '18px', lineHeight: 1.8 }}>
              Our manufacturing facility operates with multiple production lines running simultaneously, ensuring we meet even the most demanding deadlines while maintaining consistent quality standards.
            </p>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-white text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Manufacturing Departments
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm p-8 border border-white/10">
                <h3 className="text-white mb-4" style={{ fontSize: '24px', fontWeight: 600 }}>
                  {dept.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70" style={{ fontSize: '15px' }}>Daily Capacity:</span>
                    <span className="text-white" style={{ fontSize: '15px', fontWeight: 600 }}>{dept.capacity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70" style={{ fontSize: '15px' }}>Equipment:</span>
                    <span className="text-white" style={{ fontSize: '15px', fontWeight: 600 }}>{dept.machines}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Manufacturing Workflow
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {workflow.map((step, index) => (
                <div key={index} className="flex items-center gap-6 p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center" style={{ fontSize: '20px', fontWeight: 600 }}>
                    {index + 1}
                  </div>
                  <div className="text-gray-900" style={{ fontSize: '18px', fontWeight: 500 }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Factory Images */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Manufacturing Facility
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1771315938116-cd51af9489fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1758271141001-e4ff47f2b1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1771098206750-6be5aef4f503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1684259499086-93cb3e555803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1716191299945-4c5b89703971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              'https://images.unsplash.com/photo-1451933254166-deefa72af747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
            ].map((img, index) => (
              <div key={index} className="aspect-[4/3] overflow-hidden">
                <img
                  src={img}
                  alt={`Manufacturing ${index + 1}`}
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
        title="Need Bulk Manufacturing Services?"
        description="Contact us to discuss your production requirements and capacity needs"
        buttonText="Contact Us"
        openContactModal
      />
    </>
  );
}
