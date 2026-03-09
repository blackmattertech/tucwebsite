import { Mail, Phone, Briefcase } from 'lucide-react';
import { ContactCircleButton } from './ContactCircleButton';
import './ContactCTASection.css';

const SECTION_BG = '#ffffff';

export function ContactCTASection() {
  return (
    <section className="contact-cta-section" id="contact" style={{ backgroundColor: SECTION_BG }}>
      <div className="contact-cta-inner">
        <div className="contact-cta-heading-block">
          <h2 className="contact-cta-heading" style={{ fontFamily: 'var(--font-heading)' }}>
            Ready&nbsp;for
            <br />
            Commitment?
          </h2>
          <p className="contact-cta-subtext" style={{ fontFamily: 'var(--font-family)' }}>
            We're not selling services, we're building relationships. Whether you're testing the waters or ready to go all-in, we've got the right setup to meet you where you are.
          </p>
        </div>
        <div className="contact-cta-button-wrap">
          <ContactCircleButton variant="cta" />
        </div>

        <div className="contact-cta-details grid grid-cols-3 gap-3 sm:gap-4 md:gap-8 max-w-4xl mx-auto pt-4 md:pt-6 border-t border-gray-300/60">
          <div className="contact-cta-detail text-center">
            <div className="contact-cta-detail-icon-wrap w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
              <Mail className="text-gray-800 contact-cta-detail-icon" size={18} />
            </div>
            <div className="text-gray-500 mb-1" style={{ fontSize: 'clamp(0.7rem, 1vw, 0.875rem)', fontWeight: 500 }}>
              Email
            </div>
            <a
              href="mailto:care@tagunlimitedclothing.com"
              className="text-gray-900 hover:text-gray-700 transition-colors break-all"
              style={{ fontSize: 'clamp(0.75rem, 1vw, 1rem)', fontWeight: 500 }}
            >
              care@tagunlimitedclothing.com
            </a>
          </div>

          <div className="contact-cta-detail text-center">
            <div className="contact-cta-detail-icon-wrap w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
              <Phone className="text-gray-800 contact-cta-detail-icon" size={18} />
            </div>
            <div className="text-gray-500 mb-1" style={{ fontSize: 'clamp(0.7rem, 1vw, 0.875rem)', fontWeight: 500 }}>
              Phone
            </div>
            <a
              href="tel:+918095212121"
              className="text-gray-900 hover:text-gray-700 transition-colors"
              style={{ fontSize: 'clamp(0.75rem, 1vw, 1rem)', fontWeight: 500 }}
            >
              +91 8095212121
            </a>
          </div>

          <div className="contact-cta-detail text-center">
            <div className="contact-cta-detail-icon-wrap w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
              <Briefcase className="text-gray-800 contact-cta-detail-icon" size={18} />
            </div>
            <div className="text-gray-500 mb-1" style={{ fontSize: 'clamp(0.7rem, 1vw, 0.875rem)', fontWeight: 500 }}>
              Bulk and Corporate Orders
            </div>
            <a
              href="tel:+919036788845"
              className="text-gray-900 hover:text-gray-700 transition-colors block"
              style={{ fontSize: 'clamp(0.75rem, 1vw, 1rem)', fontWeight: 500 }}
            >
              +91 9036788845
            </a>
            <a
              href="tel:+919535956724"
              className="text-gray-900 hover:text-gray-700 transition-colors block"
              style={{ fontSize: 'clamp(0.75rem, 1vw, 1rem)', fontWeight: 500 }}
            >
              +91 9535956724
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
