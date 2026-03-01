export function ManufacturingStrengthSection() {
  const strengths = [
    'Production Capacity',
    'Modern Machinery',
    'Structured Workflow'
  ];

  const images = [
    'https://images.unsplash.com/photo-1771315938116-cd51af9489fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1771098206750-6be5aef4f503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1451933254166-deefa72af747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <h2 className="text-white text-center mb-12" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
          High-Capacity Apparel Manufacturing Facility
        </h2>

        {/* Strengths */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 text-center">
          {strengths.map((strength, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm p-8 border border-white/10">
              <div className="text-white mb-2" style={{ fontSize: '48px', fontWeight: 700 }}>
                {index === 0 ? '50K+' : index === 1 ? '200+' : '24/7'}
              </div>
              <div className="text-white/80" style={{ fontSize: '18px', fontWeight: 500 }}>
                {strength}
              </div>
            </div>
          ))}
        </div>

        {/* Images Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="aspect-[4/3] overflow-hidden">
              <img
                src={image}
                alt={`Manufacturing facility ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
