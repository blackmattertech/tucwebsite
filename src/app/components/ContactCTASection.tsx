import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactCircleButton } from './ContactCircleButton';

const SECTION_BG = '#F0EDEC';

export function ContactCTASection() {
  return (
    <section
      className="py-14 md:py-20 lg:py-28"
      id="contact"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="text-gray-900 mb-3 md:mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2 }}
          >
            Looking for a Reliable Apparel Manufacturer in Bangalore?
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10"
            style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.0625rem)', lineHeight: 1.6 }}
          >
            Get in touch with our team to discuss your manufacturing requirements and receive a detailed production quote.
          </p>
          <div className="flex justify-center">
            <ContactCircleButton variant="cta" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto pt-4 md:pt-6 border-t border-gray-300/60">
          <div className="text-center">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
            >
              <Phone className="text-gray-800" size={20} />
            </div>
            <div className="text-gray-500 mb-1" style={{ fontSize: 'clamp(0.8rem, 1vw, 0.875rem)', fontWeight: 500 }}>
              Phone Number
            </div>
            <a
              href="tel:+918105751234"
              className="text-gray-900 hover:text-gray-700 transition-colors"
              style={{ fontSize: 'clamp(0.9rem, 1vw, 1rem)', fontWeight: 500 }}
            >
              +91 81057 51234
            </a>
          </div>

          <div className="text-center">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
            >
              <Mail className="text-gray-800" size={20} />
            </div>
            <div className="text-gray-500 mb-1" style={{ fontSize: 'clamp(0.8rem, 1vw, 0.875rem)', fontWeight: 500 }}>
              Email Address
            </div>
            <a
              href="mailto:contact@tagunlimited.com"
              className="text-gray-900 hover:text-gray-700 transition-colors"
              style={{ fontSize: 'clamp(0.9rem, 1vw, 1rem)', fontWeight: 500 }}
            >
              contact@tagunlimited.com
            </a>
          </div>

          <div className="text-center">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
            >
              <MapPin className="text-gray-800" size={20} />
            </div>
            <div className="text-gray-500 mb-1" style={{ fontSize: 'clamp(0.8rem, 1vw, 0.875rem)', fontWeight: 500 }}>
              Location
            </div>
            <div className="text-gray-900" style={{ fontSize: 'clamp(0.9rem, 1vw, 1rem)', fontWeight: 500 }}>
              Bangalore, Karnataka, India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
