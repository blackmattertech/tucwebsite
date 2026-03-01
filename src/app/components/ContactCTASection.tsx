import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactCircleButton } from './ContactCircleButton';

const SECTION_BG = '#F0EDEC';

export function ContactCTASection() {
  return (
    <section
      className="py-20 lg:py-28"
      id="contact"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <h2
            className="text-gray-900 mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2 }}
          >
            Looking for a Reliable Apparel Manufacturer in Bangalore?
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto mb-10"
            style={{ fontSize: '17px', lineHeight: 1.6 }}
          >
            Get in touch with our team to discuss your manufacturing requirements and receive a detailed production quote.
          </p>
          <div className="flex justify-center">
            <ContactCircleButton variant="cta" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-6 border-t border-gray-300/60">
          <div className="text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
            >
              <Phone className="text-gray-800" size={20} />
            </div>
            <div className="text-gray-500 mb-1" style={{ fontSize: '14px', fontWeight: 500 }}>
              Phone Number
            </div>
            <a
              href="tel:+918105751234"
              className="text-gray-900 hover:text-gray-700 transition-colors"
              style={{ fontSize: '16px', fontWeight: 500 }}
            >
              +91 81057 51234
            </a>
          </div>

          <div className="text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
            >
              <Mail className="text-gray-800" size={20} />
            </div>
            <div className="text-gray-500 mb-1" style={{ fontSize: '14px', fontWeight: 500 }}>
              Email Address
            </div>
            <a
              href="mailto:contact@tagunlimited.com"
              className="text-gray-900 hover:text-gray-700 transition-colors"
              style={{ fontSize: '16px', fontWeight: 500 }}
            >
              contact@tagunlimited.com
            </a>
          </div>

          <div className="text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
            >
              <MapPin className="text-gray-800" size={20} />
            </div>
            <div className="text-gray-500 mb-1" style={{ fontSize: '14px', fontWeight: 500 }}>
              Location
            </div>
            <div className="text-gray-900" style={{ fontSize: '16px', fontWeight: 500 }}>
              Bangalore, Karnataka, India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
