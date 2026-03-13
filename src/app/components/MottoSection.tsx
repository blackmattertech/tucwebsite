import React from 'react';
import './MottoSection.css';

const LOGO_YELLOW = '#fecc00';

export function MottoSection() {
  return (
    <section className="motto-section bg-black py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="motto-section__inner max-w-[1440px] mx-auto text-center text-white">
        <p
          className="motto-section__subtitle uppercase mb-3 sm:mb-4 text-xs sm:text-sm"
          style={{ color: LOGO_YELLOW, fontWeight: 700 }}
        >
          OUR MOTTO REMAINS SIMPLE
        </p>
        <h2 className="motto-section__quote mb-0">
          “LOWEST MOQ WITH LIMITLESS{' '}
          <span className="motto-section__quote-big">CUSTOMIZATION</span>
          ”
        </h2>
      </div>
    </section>
  );
}

