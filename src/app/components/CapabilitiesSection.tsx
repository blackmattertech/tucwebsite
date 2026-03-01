import { Link } from 'react-router';

export function CapabilitiesSection() {
  const capabilities = [
    {
      title: 'Manufacturing',
      description: 'Bulk apparel manufacturing with modern production lines and experienced operators.',
      image: 'https://images.unsplash.com/photo-1758271141001-e4ff47f2b1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '/capabilities/apparel-manufacturing-bangalore'
    },
    {
      title: 'Private Label',
      description: 'Complete private label clothing manufacturing including branding and packaging.',
      image: 'https://images.unsplash.com/photo-1724155090003-fd4e48ab8c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '/capabilities/private-label-clothing-manufacturer'
    },
    {
      title: 'Infrastructure',
      description: 'Modern garment factory infrastructure designed for scalable production.',
      image: 'https://images.unsplash.com/photo-1716191299945-4c5b89703971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '/capabilities/garment-factory-infrastructure'
    }
  ];

  return (
    <section className="py-24 bg-gray-50" id="capabilities">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
          End-to-End Apparel Manufacturing Capabilities
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {capabilities.map((capability, index) => (
            <Link
              key={index}
              to={capability.link}
              className="group bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={capability.image}
                  alt={capability.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-gray-900 mb-3" style={{ fontSize: '24px', fontWeight: 600 }}>
                  {capability.title}
                </h3>
                <p className="text-gray-600" style={{ fontSize: '16px', lineHeight: 1.6 }}>
                  {capability.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/capabilities"
            className="inline-block bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-colors"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            View All Capabilities
          </Link>
        </div>
      </div>
    </section>
  );
}