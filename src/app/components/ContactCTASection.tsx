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

      {/* Edge-to-edge yellowish strip: only this block has the highlight background */}
      <div className="contact-cta-details-strip">
        <div className="contact-cta-details-inner">
          <div className="contact-cta-details">
            <div className="contact-cta-detail">
              <div className="contact-cta-detail-icon-wrap">
                <Mail className="contact-cta-detail-icon" size={20} />
              </div>
              <span className="contact-cta-detail-label">Email</span>
              <a href="mailto:care@tagunlimitedclothing.com" className="contact-cta-link break-all">
                care@tagunlimitedclothing.com
              </a>
            </div>

            <div className="contact-cta-detail">
              <div className="contact-cta-detail-icon-wrap">
                <Phone className="contact-cta-detail-icon" size={20} />
              </div>
              <span className="contact-cta-detail-label">Phone</span>
              <a href="tel:+918095212121" className="contact-cta-link">
                +91 8095212121
              </a>
            </div>

            <div className="contact-cta-detail">
              <div className="contact-cta-detail-icon-wrap">
                <Briefcase className="contact-cta-detail-icon" size={20} />
              </div>
              <span className="contact-cta-detail-label">Bulk and Corporate Orders</span>
              <div className="contact-cta-detail-links">
                <a href="tel:+919036788845" className="contact-cta-link">
                  +91 9036788845
                </a>
                <a href="tel:+919535956724" className="contact-cta-link">
                  +91 9535956724
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
