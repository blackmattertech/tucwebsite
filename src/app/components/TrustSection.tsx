import { Award, CheckCircle, Shield } from 'lucide-react';

export function TrustSection() {
  const certifications = [
    { icon: Award, label: 'ISO Certified' },
    { icon: CheckCircle, label: 'Quality Assured' },
    { icon: Shield, label: 'Export Ready' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
          Trusted Clothing Manufacturer for Growing Brands
        </h2>

        {/* Certifications */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                  <Icon className="text-white" size={32} />
                </div>
                <div className="text-gray-900" style={{ fontSize: '18px', fontWeight: 600 }}>
                  {cert.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Client Logos Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 items-center justify-items-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-32 h-16 bg-gray-100 flex items-center justify-center border border-gray-200">
              <span className="text-gray-400" style={{ fontSize: '14px', fontWeight: 500 }}>Client {i}</span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <svg className="w-12 h-12 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
          </div>
          <p className="text-gray-700 mb-6" style={{ fontSize: '20px', lineHeight: 1.8, fontWeight: 400, fontStyle: 'italic' }}>
            Professional manufacturing partner with reliable delivery timelines and consistent quality standards.
          </p>
          <div className="text-gray-900" style={{ fontSize: '16px', fontWeight: 600 }}>
            — Leading Fashion Brand
          </div>
        </div>
      </div>
    </section>
  );
}
