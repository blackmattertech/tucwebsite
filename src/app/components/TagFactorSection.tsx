import React from 'react';
import { tagFactorMediaUrl } from '../lib/supabaseStorage';
import './TagFactorSection.css';

const TAG_FACTOR_IMAGE = 'apparel manufacturer in bangalore.png';

const MARQUEE_LINES = [
  { text: 'Well-diversified products.', color: '#FECC00' },
  { text: 'Adhering to high-standard of EHS compliance.', color: '#FFFFFF' },
  { text: 'Globally recognised for complex value-added garments.', color: '#FECC00' },
  { text: 'Professionally managed and focused on sustainable business processes.', color: '#FFFFFF' },
] as const;

/** Left side: image from Supabase (website videos / tagfactor). Marquee scrolls behind it. */
export function TagFactorSection() {
  return (
    <section
      id="tag-factor"
      className="tag-factor-section"
      aria-label="The TAG Factor"
    >
      {/* Dot background – right side from centre only */}
      <div className="tag-factor-dots" aria-hidden />

      {/* TAG Factor + marquee: full width; text scrolls right-to-left (behind the image) */}
      <div className="tag-factor-marquees-wrap">
        <h2 className="tag-factor-heading">
          <span className="tag-factor-heading-line">The </span>
          <span className="tag-factor-heading-line tag-factor-heading-main">TAG </span>
          <span className="tag-factor-heading-line">Factor</span>
        </h2>
        <div className="tag-factor-marquees">
            {MARQUEE_LINES.map(({ text, color }, index) => (
              <div key={index} className="tag-factor-marquee-track">
                <div className="tag-factor-marquee-inner">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className="tag-factor-marquee-text"
                      style={{
                        color: 'transparent',
                        WebkitTextStroke: `2px ${color}`,
                      }}
                      aria-hidden
                    >
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Image on left, on top – marquee text passes behind */}
      <img
        src={tagFactorMediaUrl(TAG_FACTOR_IMAGE)}
        alt="Apparel manufacturer in Bangalore"
        className="tag-factor-gif"
        loading="lazy"
      />
    </section>
  );
}
