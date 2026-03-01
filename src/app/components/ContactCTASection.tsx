import { Mail, MapPin, Phone } from 'lucide-react';

export function ContactCTASection() {
  return (
    <section className="py-24 bg-gray-900" id="contact">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-white mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            Looking for a Reliable Apparel Manufacturer in Bangalore?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8" style={{ fontSize: '18px', lineHeight: 1.6 }}>
            Get in touch with our team to discuss your manufacturing requirements and receive a detailed production quote.
          </p>
          <a
            href="/contact-apparel-manufacturer-bangalore"
            className="inline-block bg-white text-gray-900 px-10 py-4 hover:bg-gray-100 transition-colors"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            Get Production Quote
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-white" size={20} />
            </div>
            <div className="text-white/60 mb-1" style={{ fontSize: '14px', fontWeight: 500 }}>
              Phone Number
            </div>
            <a href="tel:+919876543210" className="text-white hover:text-white/80 transition-colors" style={{ fontSize: '16px', fontWeight: 500 }}>
              +91 98765 43210
            </a>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-white" size={20} />
            </div>
            <div className="text-white/60 mb-1" style={{ fontSize: '14px', fontWeight: 500 }}>
              Email Address
            </div>
            <a href="mailto:contact@apparelmfg.com" className="text-white hover:text-white/80 transition-colors" style={{ fontSize: '16px', fontWeight: 500 }}>
              contact@apparelmfg.com
            </a>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-white" size={20} />
            </div>
            <div className="text-white/60 mb-1" style={{ fontSize: '14px', fontWeight: 500 }}>
              Location
            </div>
            <div className="text-white" style={{ fontSize: '16px', fontWeight: 500 }}>
              Bangalore, Karnataka, India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
