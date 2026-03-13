import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import './MapFaqSection.css';

const SECTION_BG = '#FFFFFF';

/** Tag Unlimited location – from Google Maps → Share → Embed a map */
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8155693420686!2d77.56412257664833!3d13.047408587274989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d62de87f213%3A0xc7e1898b5896eb34!2sTAG%20UNLIMITED!5e0!3m2!1sen!2sin!4v1773096879339!5m2!1sen!2sin';

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: 'What is the minimum order quantity (MOQ) for apparel manufacturing?',
    answer:
      'Our MOQ varies by product type. For t-shirts and basic knitwear we typically start at 100–500 pieces per style; for hoodies and complex garments it may be higher. We can discuss lower volumes for sampling or trial orders.',
  },
  {
    question: 'What is the typical lead time from order to delivery?',
    answer:
      'Lead times depend on order size, customization, and fabric availability. Standard production is usually 3–6 weeks after fabric and approvals are in place. Rush orders and larger runs can be quoted on request.',
  },
  {
    question: 'Do you offer private label and custom branding?',
    answer:
      'Yes. We offer full private label manufacturing: your designs, labels, tags, and packaging. We can source or use your approved materials and handle everything from sampling to bulk production.',
  },
  {
    question: 'What types of fabrics and materials do you work with?',
    answer:
      'We work with a wide range of fabrics including cotton, polyester, blends, fleece, and specialty knits. We can source as per your specs or suggest options for your product type and budget.',
  },
  {
    question: 'How does quality control work during production?',
    answer:
      'We have in-house QC at key stages: fabric inspection, in-line checks during cutting and sewing, and final inspection before packing. We can also arrange third-party inspections if required.',
  },
  {
    question: 'Can you help with design and sampling?',
    answer:
      'Yes. We offer sampling services based on your tech packs or ideas. Our team can advise on construction, fit, and materials. Sample lead times and costs depend on complexity.',
  },
];

export function MapFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="map-faq-section"
      id="map-faq"
      style={{ backgroundColor: SECTION_BG }}
      aria-label="Location and frequently asked questions"
    >
      <div className="map-faq-inner">
        <div className="map-faq-map-wrap">
          <iframe
            src={MAP_EMBED_SRC}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Company location map"
          />
        </div>
        <div className="map-faq-faq-wrap">
          <h2 className="map-faq-title" style={{ fontFamily: 'var(--font-heading)' }}>
            Got questions?
            <br />
            We've got answers
          </h2>
          <div className="map-faq-list">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="map-faq-item">
                  <button
                    type="button"
                    className="map-faq-question-btn"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`map-faq-answer-${index}`}
                    id={`map-faq-question-${index}`}
                  >
                    <span className="map-faq-question-text">{item.question}</span>
                    <span className="map-faq-icon" aria-hidden>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <div
                    id={`map-faq-answer-${index}`}
                    className="map-faq-answer-wrap"
                    role="region"
                    aria-labelledby={`map-faq-question-${index}`}
                    hidden={!isOpen}
                  >
                    <p className="map-faq-answer">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
