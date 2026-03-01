import { Link } from 'react-router';

export function AboutSection() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image - Mobile First */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1684259499086-93cb3e555803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Apparel Manufacturing Facility in Bangalore"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
              Leading Apparel Manufacturer in Bangalore
            </h2>
            
            <p className="text-gray-600 mb-8" style={{ fontSize: '18px', lineHeight: 1.8, fontWeight: 400 }}>
              We are a Bangalore-based private label clothing manufacturer specializing in bulk knitwear production including T-shirts, hoodies and custom garments. Our structured manufacturing processes ensure consistent quality and reliable delivery.
            </p>

            <Link 
              to="/about-apparel-manufacturer-bangalore"
              className="inline-block bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-colors"
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              Learn More About Our Manufacturing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}