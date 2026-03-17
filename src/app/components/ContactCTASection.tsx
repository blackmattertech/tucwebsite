import { Mail, Phone, Briefcase } from 'lucide-react';
import { ContactCircleButton } from './ContactCircleButton';
import { ContactCard } from './ContactCard';
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
            Customisation?
          </h2>
          <p className="contact-cta-subtext" style={{ fontFamily: 'var(--font-family)' }}>
            We're not selling services, we're building relationships. Whether you're testing the waters or ready to go all-in, we've got the right setup to meet you where you are.
          </p>
        </div>
        <div className="contact-cta-button-wrap">
          <ContactCircleButton variant="cta" />
        </div>
      </div>

      {/* Contact info in Uiverse-style 3D cards */}
      <div className="contact-cta-details-strip">
        <div className="contact-cta-details-inner">
          <div className="contact-cta-cards-grid">
            <ContactCard
              icon={<Mail size={22} strokeWidth={2.25} aria-hidden />}
              title="Email"
              actionHref="mailto:care@tagunlimitedclothing.com"
              actionLabel="Email us"
            >
              <a href="mailto:care@tagunlimitedclothing.com" className="break-all">
                care@tagunlimitedclothing.com
              </a>
            </ContactCard>

            <ContactCard
              icon={<Phone size={22} strokeWidth={2.25} aria-hidden />}
              title="Phone"
              actionHref="tel:+918095212121"
              actionLabel="Call"
            >
              <a href="tel:+918095212121">+91 8095212121</a>
            </ContactCard>

            <ContactCard
              icon={<Briefcase size={22} strokeWidth={2.25} aria-hidden />}
              title="Bulk and Corporate Orders"
              actionHref="tel:+919036788845"
              actionLabel="Call"
            >
              <a href="tel:+919036788845">+91 9036788845</a>
              <span className="link-block">
                <a href="tel:+919535956724">+91 9535956724</a>
              </span>
            </ContactCard>
          </div>
        </div>
      </div>
    </section>
  );
}
